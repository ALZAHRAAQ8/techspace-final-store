import mongoose from "mongoose";
import { getSessionUserId } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { apiError, serverErrorResponse } from "@/lib/http";
import { serializeUser } from "@/lib/serializers";
import { User } from "@/models/User";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  try {
    const userId = await getSessionUserId();

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return apiError("UNAUTHENTICATED", "سجّل الدخول للمتابعة.", 401);
    }

    await connectToDatabase();

    const user = await User.findById(userId).select(
      "_id name email createdAt",
    );

    if (!user) {
      return apiError("UNAUTHENTICATED", "سجّل الدخول للمتابعة.", 401);
    }

    return Response.json(serializeUser(user), {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return serverErrorResponse(
      error,
      "تعذر التحقق من تسجيل الدخول.",
    );
  }
}
