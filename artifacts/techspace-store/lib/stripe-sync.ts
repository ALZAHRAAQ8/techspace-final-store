import Stripe from "stripe";
import { StripeSync, runMigrations } from "stripe-replit-sync";
import { stripeRequest } from "./stripe";

let initialization: Promise<StripeSync> | undefined;

export function initializeStripeSync(): Promise<StripeSync> {
  if (!initialization) {
    initialization = (async () => {
      const databaseUrl = process.env.DATABASE_URL;
      const key = process.env.STRIPE_SECRET_KEY?.trim();
      if (!databaseUrl || !key) throw new Error("Stripe sync configuration missing");
      // Do not synchronize a different account from the connected Checkout account.
      const [direct, connected] = await Promise.all([
        new Stripe(key).accounts.retrieve(null),
        stripeRequest<{ id: string }>("account"),
      ]);
      if (direct.id !== connected.id) throw new Error("Stripe accounts do not match");
      const [directBalance, connectedBalance] = await Promise.all([
        new Stripe(key).balance.retrieve(),
        stripeRequest<{ livemode: boolean }>("balance"),
      ]);
      if (directBalance.livemode !== connectedBalance.livemode)
        throw new Error("Stripe test/live modes do not match");
      await runMigrations({ databaseUrl });
      const sync = new StripeSync({
        poolConfig: { connectionString: databaseUrl },
        stripeSecretKey: key,
      });
      const domain = process.env.REPLIT_DOMAINS?.split(",")[0];
      if (!domain) throw new Error("Stripe webhook domain missing");
      await sync.findOrCreateManagedWebhook(`https://${domain}/api/stripe/webhook`);
      await sync.syncBackfill({ object: "all" });
      return sync;
    })().catch(error => {
      initialization = undefined;
      throw error;
    });
  }
  return initialization;
}
