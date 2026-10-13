module.exports = [
(()=>{"use strict";return[
"[project]/artifacts/techspace-store/app/api/auth/signup/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/bcryptjs@3.0.3/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.4.0_@types+node@25.9.6_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/artifacts/techspace-store/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/artifacts/techspace-store/lib/http.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$serializers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/artifacts/techspace-store/lib/serializers.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/artifacts/techspace-store/lib/session.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/artifacts/techspace-store/models/User.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
const dynamic = "force-dynamic";
const signUpSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(1).max(100),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().email().max(254),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(8).max(128)
}).strict();
async function POST(request) {
    const parsedBody = signUpSchema.safeParse(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readJsonBody"])(request));
    if (!parsedBody.success) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiError"])("VALIDATION_ERROR", "أدخل اسماً وبريداً إلكترونياً صحيحاً وكلمة مرور من 8 أحرف على الأقل.", 400);
    }
    const name = parsedBody.data.name.trim();
    const email = parsedBody.data.email.trim().toLowerCase();
    if (!name) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiError"])("VALIDATION_ERROR", "أدخل الاسم.", 400);
    }
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDatabase"])();
        const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["User"].findOne({
            email
        }).select("_id").lean();
        if (existingUser) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiError"])("EMAIL_ALREADY_REGISTERED", "هذا البريد الإلكتروني مسجل مسبقاً.", 409);
        }
        const passwordHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hash"])(parsedBody.data.password, 12);
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["User"].create({
            name,
            email,
            passwordHash
        });
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSessionToken"])(user._id.toString());
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            user: (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$serializers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeUser"])(user)
        }, {
            status: 201,
            headers: {
                "Cache-Control": "no-store"
            }
        });
        response.cookies.set(__TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SESSION_COOKIE_NAME"], token, (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sessionCookieOptions"])());
        return response;
    } catch (error) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDuplicateKeyError"])(error)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiError"])("EMAIL_ALREADY_REGISTERED", "هذا البريد الإلكتروني مسجل مسبقاً.", 409);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverErrorResponse"])(error, "تعذر إنشاء الحساب. حاول مرة أخرى.");
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
"[project]/artifacts/techspace-store/lib/serializers.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "serializeOrder",
    ()=>serializeOrder,
    "serializeProduct",
    ()=>serializeProduct,
    "serializeUser",
    ()=>serializeUser
]);
function serializeUser(user) {
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt.toISOString()
    };
}
function serializeProduct(product) {
    return {
        id: product._id.toString(),
        name: product.name,
        nameAr: product.nameAr,
        description: product.description,
        category: product.category,
        price: Number(product.price),
        image: product.image,
        tag: product.tag ?? null,
        createdAt: product.createdAt.toISOString()
    };
}
function serializeOrder(order) {
    const items = order.items.map((item)=>({
            productId: item.productId,
            name: item.name,
            nameAr: item.nameAr,
            quantity: item.quantity,
            price: Number(item.price)
        }));
    return {
        id: order._id.toString(),
        items,
        total: Number(order.total),
        currency: order.currency,
        status: order.status,
        createdAt: order.createdAt.toISOString()
    };
}
}),
"[project]/artifacts/techspace-store/lib/session.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SESSION_COOKIE_NAME",
    ()=>SESSION_COOKIE_NAME,
    "createSessionToken",
    ()=>createSessionToken,
    "sessionCookieOptions",
    ()=>sessionCookieOptions,
    "verifySessionToken",
    ()=>verifySessionToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/jwt/sign.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/jwt/verify.js [app-route] (ecmascript)");
;
const SESSION_COOKIE_NAME = "techspace_session";
const SESSION_ISSUER = "techspace-store";
const SESSION_AUDIENCE = "techspace-customer";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
function getJwtKey() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("Missing JWT_SECRET in Replit Secrets.");
    }
    return new TextEncoder().encode(secret);
}
async function createSessionToken(userId) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SignJWT"]({}).setProtectedHeader({
        alg: "HS256"
    }).setSubject(userId).setIssuer(SESSION_ISSUER).setAudience(SESSION_AUDIENCE).setIssuedAt().setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`).sign(getJwtKey());
}
async function verifySessionToken(token) {
    const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtVerify"])(token, getJwtKey(), {
        issuer: SESSION_ISSUER,
        audience: SESSION_AUDIENCE,
        algorithms: [
            "HS256"
        ]
    });
    return typeof payload.sub === "string" ? payload.sub : null;
}
function sessionCookieOptions() {
    return {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_MAX_AGE_SECONDS
    };
}
}),
"[project]/artifacts/techspace-store/models/User.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "User",
    ()=>User
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/.pnpm/mongoose@9.11.1/node_modules/mongoose)");
;
const UserSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__["default"].Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    passwordHash: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});
const User = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__["default"].models.User ?? __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__["default"].model("User", UserSchema);
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
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

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

//# sourceMappingURL=%5Broot-of-the-server%5D__17ic7m24ljk0j._.js.map