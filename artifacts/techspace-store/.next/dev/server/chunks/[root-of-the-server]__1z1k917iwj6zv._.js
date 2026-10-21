module.exports = [
(()=>{"use strict";return[
"[project]/artifacts/techspace-store/app/api/stripe/webhook/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$stripe$2d$sync$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/artifacts/techspace-store/lib/stripe-sync.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$stripe$2d$sync$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$stripe$2d$sync$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function POST(request) {
    const signature = request.headers.get("stripe-signature");
    if (!signature) return Response.json({
        error: "Missing signature"
    }, {
        status: 400
    });
    try {
        const sync = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$stripe$2d$sync$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["initializeStripeSync"])();
        await sync.processWebhook(Buffer.from(await request.arrayBuffer()), signature);
        return Response.json({
            received: true
        });
    } catch  {
        return Response.json({
            error: "Webhook processing failed"
        }, {
            status: 400
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/artifacts/techspace-store/lib/stripe-sync.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "initializeStripeSync",
    ()=>initializeStripeSync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/stripe@23.0.0_@types+node@25.9.6/node_modules/stripe/esm/stripe.esm.node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$2d$replit$2d$sync$40$1$2e$0$2e$0_stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_$2f$node_modules$2f$stripe$2d$replit$2d$sync$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/stripe-replit-sync@1.0.0_stripe@23.0.0_@types+node@25.9.6_/node_modules/stripe-replit-sync/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/artifacts/techspace-store/lib/stripe.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$2d$replit$2d$sync$40$1$2e$0$2e$0_stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_$2f$node_modules$2f$stripe$2d$replit$2d$sync$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$2d$replit$2d$sync$40$1$2e$0$2e$0_stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_$2f$node_modules$2f$stripe$2d$replit$2d$sync$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
let initialization;
function initializeStripeSync() {
    if (!initialization) {
        initialization = (async ()=>{
            const databaseUrl = process.env.DATABASE_URL;
            const key = process.env.STRIPE_SECRET_KEY?.trim();
            if (!databaseUrl || !key) throw new Error("Stripe sync configuration missing");
            // Do not synchronize a different account from the connected Checkout account.
            const [direct, connected] = await Promise.all([
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](key).accounts.retrieve(null),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stripeRequest"])("account")
            ]);
            if (direct.id !== connected.id) throw new Error("Stripe accounts do not match");
            const [directBalance, connectedBalance] = await Promise.all([
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](key).balance.retrieve(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stripeRequest"])("balance")
            ]);
            if (directBalance.livemode !== connectedBalance.livemode) throw new Error("Stripe test/live modes do not match");
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$2d$replit$2d$sync$40$1$2e$0$2e$0_stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_$2f$node_modules$2f$stripe$2d$replit$2d$sync$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runMigrations"])({
                databaseUrl
            });
            const sync = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$2d$replit$2d$sync$40$1$2e$0$2e$0_stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_$2f$node_modules$2f$stripe$2d$replit$2d$sync$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StripeSync"]({
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
"[project]/artifacts/techspace-store/lib/stripe.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stripeRequest",
    ()=>stripeRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$replit$2b$connectors$2d$sdk$40$0$2e$4$2e$3$2f$node_modules$2f40$replit$2f$connectors$2d$sdk$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@replit+connectors-sdk@0.4.3/node_modules/@replit/connectors-sdk/index.js [app-route] (ecmascript)");
;
const connectors = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$replit$2b$connectors$2d$sdk$40$0$2e$4$2e$3$2f$node_modules$2f40$replit$2f$connectors$2d$sdk$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReplitConnectors"]();
async function stripeRequest(path, params, idempotencyKey) {
    const response = await connectors.proxy("stripe", `/v1/${path}`, {
        method: params ? "POST" : "GET",
        headers: params ? {
            "Content-Type": "application/x-www-form-urlencoded",
            ...idempotencyKey ? {
                "Idempotency-Key": idempotencyKey
            } : {}
        } : undefined,
        body: params?.toString()
    });
    if (!response.ok) throw new Error("Stripe request failed");
    return response.json();
}
}),
]})(),
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
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:child_process [external] (node:child_process, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:child_process", () => require("node:child_process"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/node:timers/promises [external] (node:timers/promises, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:timers/promises", () => require("node:timers/promises"));

module.exports = mod;
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:util", () => require("node:util"));

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
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1z1k917iwj6zv._.js.map