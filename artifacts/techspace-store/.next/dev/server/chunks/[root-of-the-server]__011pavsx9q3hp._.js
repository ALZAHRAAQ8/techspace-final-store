module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/artifacts/techspace-store/lib/stripe-sync.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "initializeStripeSync",
    ()=>initializeStripeSync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$2d$replit$2d$sync$40$1$2e$0$2e$0_stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_$2f$node_modules$2f$stripe$2d$replit$2d$sync$2f$dist$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/stripe-replit-sync@1.0.0_stripe@23.0.0_@types+node@25.9.6_/node_modules/stripe-replit-sync/dist/index.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$stripe$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/artifacts/techspace-store/lib/stripe.ts [instrumentation] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$2d$replit$2d$sync$40$1$2e$0$2e$0_stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_$2f$node_modules$2f$stripe$2d$replit$2d$sync$2f$dist$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$2d$replit$2d$sync$40$1$2e$0$2e$0_stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_$2f$node_modules$2f$stripe$2d$replit$2d$sync$2f$dist$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
let initialization;
function initializeStripeSync() {
    if (!initialization) {
        initialization = (async ()=>{
            const databaseUrl = process.env.DATABASE_URL;
            const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$stripe$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["getStripeSecretKey"])();
            if (!databaseUrl || !key) throw new Error("Stripe sync configuration missing");
            // Checkout and synchronization share the exact same credential source.
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$2d$replit$2d$sync$40$1$2e$0$2e$0_stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_$2f$node_modules$2f$stripe$2d$replit$2d$sync$2f$dist$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["runMigrations"])({
                databaseUrl
            });
            const sync = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$2d$replit$2d$sync$40$1$2e$0$2e$0_stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_$2f$node_modules$2f$stripe$2d$replit$2d$sync$2f$dist$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["StripeSync"]({
                poolConfig: {
                    connectionString: databaseUrl
                },
                stripeSecretKey: key
            });
            const domain = process.env.REPLIT_DOMAINS?.split(",")[0];
            if (!domain) throw new Error("Stripe webhook domain missing");
            await sync.findOrCreateManagedWebhook(`https://${domain}/api/stripe/webhook`);
            await sync.syncBackfill({
                object: "all"
            });
            return sync;
        })().catch((error)=>{
            initialization = undefined;
            throw error;
        });
    }
    return initialization;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/artifacts/techspace-store/lib/stripe.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStripeClient",
    ()=>getStripeClient,
    "getStripeSecretKey",
    ()=>getStripeSecretKey,
    "stripeRequest",
    ()=>stripeRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/stripe@23.0.0_@types+node@25.9.6/node_modules/stripe/esm/stripe.esm.node.js [instrumentation] (ecmascript)");
;
function getStripeSecretKey() {
    const key = process.env.STRIPE_SECRET_KEY?.trim();
    if (!key) throw new Error("Stripe secret key missing");
    return key;
}
function getStripeClient() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"](getStripeSecretKey(), {
        timeout: 20000,
        maxNetworkRetries: 2
    });
}
async function stripeRequest(path, params, idempotencyKey) {
    return getStripeClient().rawRequest(params ? "POST" : "GET", `/v1/${path}`, params ? Object.fromEntries(params) : {}, idempotencyKey ? {
        idempotencyKey
    } : {});
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__011pavsx9q3hp._.js.map