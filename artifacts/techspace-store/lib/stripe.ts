import { ReplitConnectors } from "@replit/connectors-sdk";

const connectors = new ReplitConnectors();

export async function stripeRequest<T>(
  path: string,
  params?: URLSearchParams,
  idempotencyKey?: string,
): Promise<T> {
  const response = await connectors.proxy("stripe", `/v1/${path}`, {
    method: params ? "POST" : "GET",
    headers: params ? {
      "Content-Type": "application/x-www-form-urlencoded",
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    } : undefined,
    body: params?.toString(),
  });
  if (!response.ok) throw new Error("Stripe request failed");
  return response.json() as Promise<T>;
}

export type CheckoutSession = {
  id: string;
  url: string | null;
  status: string;
  payment_status: string;
  amount_total: number;
  currency: string;
  client_reference_id: string;
  metadata: { userId?: string };
};
