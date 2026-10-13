module.exports = [
(()=>{"use strict";return[
"[project]/artifacts/techspace-store/app/api/healthz/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/artifacts/techspace-store/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/artifacts/techspace-store/lib/http.ts [app-route] (ecmascript)");
;
;
const dynamic = "force-dynamic";
async function GET() {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDatabase"])();
        return Response.json({
            status: "ok"
        }, {
            headers: {
                "Cache-Control": "no-store"
            }
        });
    } catch  {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiError"])("DATABASE_UNAVAILABLE", "تعذر الاتصال بقاعدة البيانات.", 503);
    }
}
}),
"[project]/artifacts/techspace-store/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectToDatabase",
    ()=>connectToDatabase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/.pnpm/mongoose@9.11.1/node_modules/mongoose)");
;
const cached = globalThis.techspaceMongooseCache ?? {
    connection: null,
    promise: null
};
globalThis.techspaceMongooseCache = cached;
async function connectToDatabase() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("Missing MONGODB_URI in Replit Secrets.");
    }
    if (cached.connection) {
        return cached.connection;
    }
    if (!cached.promise) {
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__["default"].connect(uri, {
            serverSelectionTimeoutMS: 10000
        });
    }
    try {
        cached.connection = await cached.promise;
        return cached.connection;
    } catch (error) {
        cached.promise = null;
        throw error;
    }
}
}),
"[project]/artifacts/techspace-store/lib/http.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiError",
    ()=>apiError,
    "isDuplicateKeyError",
    ()=>isDuplicateKeyError,
    "readJsonBody",
    ()=>readJsonBody,
    "serverErrorResponse",
    ()=>serverErrorResponse
]);
function apiError(code, message, status) {
    return Response.json({
        code,
        message
    }, {
        status,
        headers: {
            "Cache-Control": "no-store"
        }
    });
}
async function readJsonBody(request) {
    try {
        return await request.json();
    } catch  {
        return null;
    }
}
function isDuplicateKeyError(error) {
    return typeof error === "object" && error !== null && "code" in error && error.code === 11000;
}
function serverErrorResponse(error, fallbackMessage) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === 8000) {
        return apiError("DATABASE_AUTHENTICATION_FAILED", "رفض MongoDB Atlas بيانات الدخول. حدّث MONGODB_URI في Secrets ببيانات مستخدم قاعدة بيانات صالحة.", 503);
    }
    if (error instanceof Error && error.message.startsWith("Missing MONGODB_URI")) {
        return apiError("MISSING_MONGODB_URI", "أضف MONGODB_URI إلى Secrets في Replit.", 503);
    }
    if (error instanceof Error && error.message.startsWith("Missing JWT_SECRET")) {
        return apiError("MISSING_JWT_SECRET", "أضف JWT_SECRET إلى Secrets في Replit.", 503);
    }
    if (error instanceof Error && error.name === "MongooseServerSelectionError") {
        return apiError("DATABASE_UNAVAILABLE", "تعذر الاتصال بقاعدة البيانات. تحقّق من MONGODB_URI وصلاحيات Atlas.", 503);
    }
    return apiError("SERVER_ERROR", fallbackMessage, 500);
}
}),
]})(),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

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
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1k-5q0bunimwj._.js.map