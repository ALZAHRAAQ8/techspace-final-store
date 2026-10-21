module.exports = [
"[project]/artifacts/techspace-store/instrumentation.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "register",
    ()=>register
]);
async function register() {
    if ("TURBOPACK compile-time truthy", 1) {
        const { initializeStripeSync } = await __turbopack_context__.A("[project]/artifacts/techspace-store/lib/stripe-sync.ts [instrumentation] (ecmascript, async loader)");
        initializeStripeSync().then(()=>console.info("Stripe sync initialized"), ()=>console.error("Stripe sync initialization failed; verify Stripe connection and secret belong to the same account."));
    }
}
}),
];

//# sourceMappingURL=artifacts_techspace-store_instrumentation_ts_0ul03a-7v93je._.js.map