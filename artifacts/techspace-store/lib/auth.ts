import { cookies } from "next/headers";
import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from "./session";

export async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifySessionToken(token);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.startsWith("Missing JWT_SECRET")
    ) {
      throw error;
    }

    return null;
  }
}
