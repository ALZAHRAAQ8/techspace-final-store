import mongoose from "mongoose";
import { getSessionUserId } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { apiError, serverErrorResponse } from "@/lib/http";
import { Order } from "@/models/Order";
import { stripeRequest, type CheckoutSession } from "@/lib/stripe";
import { initializeStripeSync } from "@/lib/stripe-sync";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return apiError("UNAUTHENTICATED", "سجّل الدخول للدفع.", 401);
    const origin = request.headers.get("origin");
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
    if (!origin || new URL(origin).host !== host)
      return apiError("INVALID_ORIGIN", "طلب غير صالح.", 403);
    const body = await request.json().catch(() => null);
    if (!mongoose.isValidObjectId(body?.orderId))
      return apiError("INVALID_ORDER", "الطلب غير صالح.", 400);
    await connectToDatabase();
    const order = await Order.findOne({ _id: body.orderId, user: userId });
    if (!order) return apiError("NOT_FOUND", "الطلب غير موجود.", 404);
    if (order.status === "paid") return apiError("ALREADY_PAID", "تم دفع هذا الطلب.", 409);
    await initializeStripeSync();
    if (order.checkoutSessionId) {
      const session = await stripeRequest<CheckoutSession>(`checkout/sessions/${order.checkoutSessionId}`);
      if (session.status === "open" && session.url) return Response.json({ url: session.url });
      return apiError("SESSION_CLOSED", "انتهت جلسة الدفع. راجع طلباتك أو أنشئ طلباً جديداً.", 409);
    }
    // Derive prices exclusively from the server-created immutable order snapshot.
    const params = new URLSearchParams({
      mode: "payment",
      "payment_method_types[0]": "card",
      client_reference_id: String(order._id),
      "metadata[userId]": userId,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?checkout=cancelled`,
    });
    for (const [index, item] of order.items.entries()) {
      const amount = Math.round(item.price * 1000); // KWD uses three decimal places.
      if (!Number.isSafeInteger(amount) || amount <= 0) return apiError("INVALID_PRICE", "السعر غير صالح.", 400);
      const product = await stripeRequest<{ id: string }>("products", new URLSearchParams({
        name: item.nameAr || item.name,
        "metadata[storeProductId]": item.productId,
      }), `techspace-product-${item.productId}`);
      const price = await stripeRequest<{ id: string }>("prices", new URLSearchParams({
        product: product.id, currency: "kwd", unit_amount: String(amount),
      }), `techspace-price-${item.productId}-${amount}`);
      params.set(`line_items[${index}][price]`, price.id);
      params.set(`line_items[${index}][quantity]`, String(item.quantity));
    }
    const session = await stripeRequest<CheckoutSession>("checkout/sessions", params, `techspace-checkout-${order._id}`);
    if (!session.url) throw new Error("Missing checkout URL");
    order.checkoutSessionId = session.id;
    await order.save();
    return Response.json({ url: session.url });
  } catch (error) {
    return serverErrorResponse(error, "تعذر بدء الدفع. حاول مرة أخرى.");
  }
}

export async function GET(request: Request) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return apiError("UNAUTHENTICATED", "سجّل الدخول للتحقق من الدفع.", 401);
    const id = new URL(request.url).searchParams.get("session_id");
    if (!id || !/^cs_[a-zA-Z0-9_]+$/.test(id)) return apiError("INVALID_SESSION", "جلسة غير صالحة.", 400);
    await connectToDatabase();
    const order = await Order.findOne({ checkoutSessionId: id, user: userId });
    if (!order) return apiError("NOT_FOUND", "الطلب غير موجود.", 404);
    const session = await stripeRequest<CheckoutSession>(`checkout/sessions/${id}`);
    if (session.client_reference_id !== String(order._id) || session.metadata.userId !== userId ||
        session.currency !== "kwd" || session.amount_total !== Math.round(order.total * 1000))
      return apiError("PAYMENT_MISMATCH", "تعذر مطابقة الدفع بالطلب.", 409);
    if (session.payment_status === "paid") {
      await Order.updateOne({ _id: order._id, user: userId }, { $set: { status: "paid" } });
    }
    return Response.json({ orderId: String(order._id), paid: session.payment_status === "paid" }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return serverErrorResponse(error, "تعذر التحقق من الدفع.");
  }
}
