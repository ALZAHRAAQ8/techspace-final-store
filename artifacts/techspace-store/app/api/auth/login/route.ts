import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import {
  apiError,
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

const logInSchema = z
  .object({
    email: z.string().trim().email().max(254),
    password: z.string().min(1).max(128),
  })
  .strict();

export async function POST(request: Request): Promise<Response> {
  const parsedBody = logInSchema.safeParse(await readJsonBody(request));

  if (!parsedBody.success) {
    return apiError(
      "VALIDATION_ERROR",
      "أدخل بريداً إلكترونياً وكلمة مرور صحيحين.",
      400,
    );
  }

  try {
    await connectToDatabase();

    const email = parsedBody.data.email.trim().toLowerCase();
    const user = await User.findOne({ email }).select("+passwordHash");

    if (
      !user ||
      !(await compare(parsedBody.data.password, user.passwordHash))
    ) {
      return apiError(
        "INVALID_CREDENTIALS",
        "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
        401,
      );
    }

    const token = await createSessionToken(user._id.toString());
    const response = NextResponse.json(
      {
        user: serializeUser(user),
      },
      {
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
    return serverErrorResponse(
      error,
      "تعذر تسجيل الدخول. حاول مرة أخرى.",
    );
  }
}
