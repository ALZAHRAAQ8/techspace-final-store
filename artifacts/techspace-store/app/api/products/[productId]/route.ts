import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { apiError, serverErrorResponse } from "@/lib/http";
import { serializeProduct } from "@/lib/serializers";
import { Product } from "@/models/Product";

export const dynamic = "force-dynamic";

type ProductRouteContext = {
  params: Promise<{
    productId: string;
  }>;
};

export async function GET(
  _request: Request,
  context: ProductRouteContext,
): Promise<Response> {
  const { productId } = await context.params;

  if (!mongoose.isValidObjectId(productId)) {
    return apiError("PRODUCT_NOT_FOUND", "المنتج غير موجود.", 404);
  }

  try {
    await connectToDatabase();

    const product = await Product.findById(productId);

    if (!product) {
      return apiError("PRODUCT_NOT_FOUND", "المنتج غير موجود.", 404);
    }

    return Response.json(serializeProduct(product), {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return serverErrorResponse(
      error,
      "تعذر تحميل المنتج. حاول مرة أخرى.",
    );
  }
}
