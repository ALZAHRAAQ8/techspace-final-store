export function apiError(
  code: string,
  message: string,
  status: number,
): Response {
  return Response.json(
    { code, message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function readJsonBody(request: Request): Promise<unknown | null> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  );
}

export function serverErrorResponse(
  error: unknown,
  fallbackMessage: string,
): Response {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 8000
  ) {
    return apiError(
      "DATABASE_AUTHENTICATION_FAILED",
      "رفض MongoDB Atlas بيانات الدخول. حدّث MONGODB_URI في Secrets ببيانات مستخدم قاعدة بيانات صالحة.",
      503,
    );
  }

  if (error instanceof Error && error.message.startsWith("Missing MONGODB_URI")) {
    return apiError(
      "MISSING_MONGODB_URI",
      "أضف MONGODB_URI إلى Secrets في Replit.",
      503,
    );
  }

  if (error instanceof Error && error.message.startsWith("Missing JWT_SECRET")) {
    return apiError(
      "MISSING_JWT_SECRET",
      "أضف JWT_SECRET إلى Secrets في Replit.",
      503,
    );
  }

  if (
    error instanceof Error &&
    error.name === "MongooseServerSelectionError"
  ) {
    return apiError(
      "DATABASE_UNAVAILABLE",
      "تعذر الاتصال بقاعدة البيانات. تحقّق من MONGODB_URI وصلاحيات Atlas.",
      503,
    );
  }

  return apiError("SERVER_ERROR", fallbackMessage, 500);
}
