export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initializeStripeSync } = await import("./lib/stripe-sync");
    initializeStripeSync().then(
      () => console.info("Stripe sync initialized"),
      () => console.error("Stripe sync initialization failed; verify Stripe connection and secret belong to the same account."),
    );
  }
}
