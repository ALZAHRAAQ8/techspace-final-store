module.exports = [
(()=>{"use strict";return[
"[project]/artifacts/techspace-store/app/api/orders/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/.pnpm/mongoose@9.11.1/node_modules/mongoose)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z .array>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z .number>");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/artifacts/techspace-store/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/artifacts/techspace-store/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/artifacts/techspace-store/lib/http.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$serializers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/artifacts/techspace-store/lib/serializers.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$models$2f$Order$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/artifacts/techspace-store/models/Order.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$models$2f$Product$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/artifacts/techspace-store/models/Product.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
const dynamic = "force-dynamic";
const placeOrderSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    items: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
        productId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(1),
        quantity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number().int().min(1).max(20)
    }).strict()).min(1).max(30)
}).strict();
async function GET() {
    try {
        const userId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionUserId"])();
        if (!userId || !__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__["default"].isValidObjectId(userId)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiError"])("UNAUTHENTICATED", "سجّل الدخول لعرض طلباتك.", 401);
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDatabase"])();
        const orders = await __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$models$2f$Order$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Order"].find({
            user: userId
        }).sort({
            createdAt: -1
        }).limit(100);
        return Response.json(orders.map(__TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$serializers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeOrder"]), {
            headers: {
                "Cache-Control": "no-store"
            }
        });
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverErrorResponse"])(error, "تعذر تحميل طلباتك.");
    }
}
async function POST(request) {
    const userId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionUserId"])();
    if (!userId || !__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__["default"].isValidObjectId(userId)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiError"])("UNAUTHENTICATED", "سجّل الدخول لإتمام الطلب.", 401);
    }
    const parsedBody = placeOrderSchema.safeParse(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readJsonBody"])(request));
    if (!parsedBody.success) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiError"])("INVALID_ORDER", "تحقق من المنتجات والكميات.", 400);
    }
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDatabase"])();
        const requestedItems = parsedBody.data.items;
        const productIds = [
            ...new Set(requestedItems.map((item)=>item.productId))
        ];
        if (!productIds.every((productId)=>__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__["default"].isValidObjectId(productId))) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiError"])("INVALID_ORDER", "يوجد منتج غير صالح.", 400);
        }
        const products = await __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$models$2f$Product$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Product"].find({
            _id: {
                $in: productIds
            }
        });
        const productsById = new Map(products.map((product)=>[
                product._id.toString(),
                product
            ]));
        if (productsById.size !== productIds.length) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiError"])("PRODUCT_NOT_FOUND", "أحد المنتجات لم يعد متوفراً.", 404);
        }
        const items = requestedItems.map((item)=>{
            const product = productsById.get(item.productId);
            return {
                product: product._id,
                productId: product._id.toString(),
                name: product.name,
                nameAr: product.nameAr,
                quantity: item.quantity,
                price: Number(product.price)
            };
        });
        const total = Math.round(items.reduce((sum, item)=>sum + item.price * item.quantity, 0) * 1000) / 1000;
        const order = await __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$models$2f$Order$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Order"].create({
            user: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__["default"].Types.ObjectId(userId),
            items,
            total,
            currency: "KWD",
            status: "pending"
        });
        return Response.json((0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$serializers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeOrder"])(order), {
            status: 201,
            headers: {
                "Cache-Control": "no-store"
            }
        });
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverErrorResponse"])(error, "تعذر حفظ الطلب. حاول مرة أخرى.");
    }
}
}),
"[project]/artifacts/techspace-store/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSessionUserId",
    ()=>getSessionUserId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.4.0_@types+node@25.9.6_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/artifacts/techspace-store/lib/session.ts [app-route] (ecmascript)");
;
;
async function getSessionUserId() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get(__TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SESSION_COOKIE_NAME"])?.value;
    if (!token) {
        return null;
    }
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$techspace$2d$store$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifySessionToken"])(token);
    } catch (error) {
        if (error instanceof Error && error.message.startsWith("Missing JWT_SECRET")) {
            throw error;
        }
        return null;
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
"[project]/artifacts/techspace-store/models/Order.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Order",
    ()=>Order
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/.pnpm/mongoose@9.11.1/node_modules/mongoose)");
;
const OrderItemSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__["default"].Schema({
    product: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__["default"].Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    nameAr: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    _id: false
});
const OrderSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__["default"].Schema({
    user: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__["default"].Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    items: {
        type: [
            OrderItemSchema
        ],
        required: true
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        enum: [
            "KWD"
        ],
        default: "KWD",
        required: true
    },
    status: {
        type: String,
        enum: [
            "pending",
            "paid"
        ],
        default: "pending",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});
const Order = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__["default"].models.Order ?? __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__["default"].model("Order", OrderSchema);
}),
"[project]/artifacts/techspace-store/models/Product.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Product",
    ()=>Product
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/.pnpm/mongoose@9.11.1/node_modules/mongoose)");
;
const ProductSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__["default"].Schema({
    handle: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    nameAr: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    tag: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});
const Product = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__["default"].models.Product ?? __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mongoose$40$9$2e$11$2e$1$2f$node_modules$2f$mongoose$29$__["default"].model("Product", ProductSchema);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__06muncmk3r6sr._.js.map