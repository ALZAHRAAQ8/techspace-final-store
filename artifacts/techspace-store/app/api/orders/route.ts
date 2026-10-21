import mongoose from "mongoose";
import { z } from "zod";
import { getSessionUserId } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import {
  apiError,
  readJsonBody,
  serverErrorResponse,
} from "@/lib/http";
import { serializeOrder } from "@/lib/serializers";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

export const dynamic = "force-dynamic";

const placeOrderSchema = z
  .object({
    items: z
      .array(
        z
          .object({
            productId: z.string().min(1),
            quantity: z.number().int().min(1).max(20),
          })
          .strict(),
      )
      .min(1)
      .max(30),
  })
  .strict();

export async function GET(): Promise<Response> {
  try {
    const userId = await getSessionUserId();

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return apiError("UNAUTHENTICATED", "سجّل الدخول لعرض طلباتك.", 401);
    }

    await connectToDatabase();

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(100);

    return Response.json(orders.map(serializeOrder), {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return serverErrorResponse(error, "تعذر تحميل طلباتك.");
  }
}

export async function POST(request: Request): Promise<Response> {
  const userId = await getSessionUserId();

  if (!userId || !mongoose.isValidObjectId(userId)) {
    return apiError("UNAUTHENTICATED", "سجّل الدخول لإتمام الطلب.", 401);
  }

  const parsedBody = placeOrderSchema.safeParse(await readJsonBody(request));

  if (!parsedBody.success) {
    return apiError("INVALID_ORDER", "تحقق من المنتجات والكميات.", 400);
  }

  try {
    await connectToDatabase();

    const requestedItems = parsedBody.data.items;
    const productIds = [
      ...new Set(requestedItems.map((item) => item.productId)),
    ];

    if (!productIds.every((productId) => mongoose.isValidObjectId(productId))) {
      return apiError("INVALID_ORDER", "يوجد منتج غير صالح.", 400);
    }

    const products = await Product.find({
      _id: {
        $in: productIds,
      },
    });
    const productsById = new Map(
      products.map((product) => [product._id.toString(), product]),
    );

    if (productsById.size !== productIds.length) {
      return apiError(
        "PRODUCT_NOT_FOUND",
        "أحد المنتجات لم يعد متوفراً.",
        404,
      );
    }

    const items = requestedItems.map((item) => {
      const product = productsById.get(item.productId)!;

      return {
        product: product._id,
        productId: product._id.toString(),
        name: product.name,
        nameAr: product.nameAr,
        quantity: item.quantity,
        price: Number(product.price),
      };
    });
    const total =
      Math.round(
        items.reduce((sum, item) => sum + item.price * item.quantity, 0) *
          100,
      ) / 100;
    const order = await Order.create({
      user: new mongoose.Types.ObjectId(userId),
      items,
      total,
      currency: "USD",
      status: "pending",
    });

    return Response.json(serializeOrder(order), {
      status: 201,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return serverErrorResponse(
      error,
      "تعذر حفظ الطلب. حاول مرة أخرى.",
    );
  }
}
