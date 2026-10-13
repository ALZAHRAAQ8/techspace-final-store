import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE_NAME = "techspace_session";

const SESSION_ISSUER = "techspace-store";
const SESSION_AUDIENCE = "techspace-customer";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getJwtKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("Missing JWT_SECRET in Replit Secrets.");
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(userId: string): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuer(SESSION_ISSUER)
    .setAudience(SESSION_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getJwtKey());
}

export async function verifySessionToken(
  token: string,
): Promise<string | null> {
  const { payload } = await jwtVerify(token, getJwtKey(), {
    issuer: SESSION_ISSUER,
    audience: SESSION_AUDIENCE,
    algorithms: ["HS256"],
  });

  return typeof payload.sub === "string" ? payload.sub : null;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
