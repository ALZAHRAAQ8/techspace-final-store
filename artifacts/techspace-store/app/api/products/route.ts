import { connectToDatabase } from "@/lib/db";
import { serverErrorResponse } from "@/lib/http";
import { serializeProduct } from "@/lib/serializers";
import { Product } from "@/models/Product";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  try {
    await connectToDatabase();

    const products = await Product.find().sort({ createdAt: -1 });

    return Response.json(products.map(serializeProduct), {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return serverErrorResponse(
      error,
      "تعذر تحميل المنتجات. حاول مرة أخرى.",
    );
  }
}
