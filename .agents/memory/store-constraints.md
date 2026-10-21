---
name: Store persistence and payments
description: Coursework persistence requirement and payment account consistency.
---
Keep the store's products, accounts, and orders in MongoDB Atlas.
**Why:** The user explicitly requires MongoDB for the coursework; adding Stripe is not permission to migrate that data to PostgreSQL.
**How to apply:** Use PostgreSQL only for Stripe-managed synchronization when needed.

Use the account that owns the saved STRIPE_SECRET_KEY for all Stripe operations, not the separately connected Stripe account.
**Why:** The user explicitly selected the saved key's account after the connection and key authenticated as different accounts.
**How to apply:** Checkout, verification, and synchronization must share this server-only credential source. Do not switch back to the connector without the user's approval.
