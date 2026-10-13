import { connectToDatabase } from "@/lib/db";
import { apiError } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  try {
    await connectToDatabase();

    return Response.json(
      { status: "ok" },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch {
    return apiError(
      "DATABASE_UNAVAILABLE",
      "تعذر الاتصال بقاعدة البيانات.",
      503,
    );
  }
}
