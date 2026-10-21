---
name: Store persistence and payments
description: Coursework persistence requirement and payment account consistency.
---
Keep the store's products, accounts, and orders in MongoDB Atlas.
**Why:** The user explicitly requires MongoDB for the coursework; adding Stripe is not permission to migrate that data to PostgreSQL.
**How to apply:** Use PostgreSQL only for Stripe-managed synchronization when needed.

Require the Stripe connection and any separate Stripe sync key to belong to the same account.
**Why:** These two credential sources can legitimately point at different accounts; mixing them silently misroutes payment synchronization.
**How to apply:** Compare account identities internally without logging credentials, and fail closed on mismatch.
