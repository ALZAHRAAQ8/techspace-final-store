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

Classify MongoDB connection failures before requesting another credential update.
**Why:** URI parsing and pre-authentication TLS failures were conflated, resulting in repeated credential requests that could not address the network failure.
**How to apply:** Inspect sanitized nested driver error classes/codes, not just ServerSelectionError. A TLS handshake failure is not evidence of a bad password. Never print connection strings or disable certificate verification to work around it.
