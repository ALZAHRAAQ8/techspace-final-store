import Stripe from "stripe";

// Server-only: the user selected this secret's account for all payment operations.
export function getStripeSecretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error("Stripe secret key missing");
  return key;
}

export function getStripeClient(): Stripe {
  return new Stripe(getStripeSecretKey(), { timeout: 20000, maxNetworkRetries: 2 });
}

export async function stripeRequest<T>(
  path: string,
  params?: URLSearchParams,
  idempotencyKey?: string,
): Promise<T> {
  return getStripeClient().rawRequest(
    params ? "POST" : "GET",
    `/v1/${path}`,
    params ? Object.fromEntries(params) : {},
    idempotencyKey ? { idempotencyKey } : {},
  ) as Promise<T>;
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
