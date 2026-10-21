import { initializeStripeSync } from "@/lib/stripe-sync";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) return Response.json({ error: "Missing signature" }, { status: 400 });
  try {
    const sync = await initializeStripeSync();
    await sync.processWebhook(Buffer.from(await request.arrayBuffer()), signature);
    return Response.json({ received: true });
  } catch {
    return Response.json({ error: "Webhook processing failed" }, { status: 400 });
  }
}
