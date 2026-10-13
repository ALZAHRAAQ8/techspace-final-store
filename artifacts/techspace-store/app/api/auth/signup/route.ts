import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import {
  apiError,
  isDuplicateKeyError,
  readJsonBody,
  serverErrorResponse,
} from "@/lib/http";
import { serializeUser } from "@/lib/serializers";
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
} from "@/lib/session";
import { User } from "@/models/User";

export const dynamic = "force-dynamic";

const signUpSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().email().max(254),
    password: z.string().min(8).max(128),
  })
  .strict();

export async function POST(request: Request): Promise<Response> {
  const parsedBody = signUpSchema.safeParse(await readJsonBody(request));

  if (!parsedBody.success) {
    return apiError(
      "VALIDATION_ERROR",
      "أدخل اسماً وبريداً إلكترونياً صحيحاً وكلمة مرور من 8 أحرف على الأقل.",
      400,
    );
  }

  const name = parsedBody.data.name.trim();
  const email = parsedBody.data.email.trim().toLowerCase();

  if (!name) {
    return apiError("VALIDATION_ERROR", "أدخل الاسم.", 400);
  }

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email }).select("_id").lean();

    if (existingUser) {
      return apiError(
        "EMAIL_ALREADY_REGISTERED",
        "هذا البريد الإلكتروني مسجل مسبقاً.",
        409,
      );
    }

    const passwordHash = await hash(parsedBody.data.password, 12);
    const user = await User.create({
      name,
      email,
      passwordHash,
    });
    const token = await createSessionToken(user._id.toString());
    const response = NextResponse.json(
      {
        user: serializeUser(user),
      },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );

    response.cookies.set(
      SESSION_COOKIE_NAME,
      token,
      sessionCookieOptions(),
    );

    return response;
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return apiError(
        "EMAIL_ALREADY_REGISTERED",
        "هذا البريد الإلكتروني مسجل مسبقاً.",
        409,
      );
    }

    return serverErrorResponse(
      error,
      "تعذر إنشاء الحساب. حاول مرة أخرى.",
    );
  }
}
