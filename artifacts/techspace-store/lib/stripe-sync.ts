import { StripeSync, runMigrations } from "stripe-replit-sync";
import { getStripeSecretKey } from "./stripe";

let initialization: Promise<StripeSync> | undefined;

export function initializeStripeSync(): Promise<StripeSync> {
  if (!initialization) {
    initialization = (async () => {
      const databaseUrl = process.env.DATABASE_URL;
      const key = getStripeSecretKey();
      if (!databaseUrl || !key) throw new Error("Stripe sync configuration missing");
      // Checkout and synchronization share the exact same credential source.
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
