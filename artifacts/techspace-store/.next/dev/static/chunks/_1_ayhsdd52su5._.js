(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/artifacts/techspace-store/components/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.4.0_@types+node@25.9.6_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.4.0_@types+node@25.9.6_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$102$2e$8$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+query-core@5.102.8/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.102.8_react@19.1.0/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Providers({ children }) {
    _s();
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Providers.useState": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$102$2e$8$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]({
                defaultOptions: {
                    queries: {
                        retry: 1,
                        refetchOnWindowFocus: false
                    }
                }
            })
    }["Providers.useState"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClient,
        children: children
    }, void 0, false, {
        fileName: "[project]/artifacts/techspace-store/components/providers.tsx",
        lineNumber: 16,
        columnNumber: 10
    }, this);
}
_s(Providers, "gz3IUlnp+6p9GRAG9PCYpi3B7xc=");
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/artifacts/techspace-store/components/site-header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteFooter",
    ()=>SiteFooter,
    "SiteHeader",
    ()=>SiteHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.4.0_@types+node@25.9.6_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/api-client-react/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$generated$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client-react/src/generated/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.102.8_react@19.1.0/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.4.0_@types+node@25.9.6_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.4.0_@types+node@25.9.6_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/user-round.js [app-client] (ecmascript) <export default as UserRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.4.0_@types+node@25.9.6_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function SiteHeader() {
    _s();
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const userQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$generated$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetCurrentUser"])();
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$generated$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLogOut"])();
    const user = userQuery.data;
    function handleLogout() {
        logout.mutate(undefined, {
            onSuccess: ()=>{
                queryClient.setQueryData((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$generated$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGetCurrentUserQueryKey"])(), undefined);
                router.push('/');
            }
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-40 border-b border-[#d8e5e7] bg-[#f7fbfb]/95 backdrop-blur-xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container-shop flex h-[76px] items-center justify-between gap-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex shrink-0 items-center gap-3 no-underline",
                        "data-testid": "link-home",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "grid size-11 place-items-center rounded-2xl bg-[#10263e] text-[#32e0c4]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl font-bold tracking-[-0.08em]",
                                    children: "TS"
                                }, void 0, false, {
                                    fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "leading-tight",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block text-[17px] font-bold tracking-[-0.04em] text-[#10263e]",
                                        children: "TechSpace"
                                    }, void 0, false, {
                                        fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                                        lineNumber: 35,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block text-[10px] font-semibold tracking-[0.2em] text-[#71828d]",
                                        children: "KUWAIT · TECH FOR TRAVEL"
                                    }, void 0, false, {
                                        fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                                        lineNumber: 36,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "hidden items-center gap-8 md:flex",
                        "aria-label": "التنقل الرئيسي",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "text-sm font-semibold text-[#536574] transition hover:text-[#008f84]",
                                "data-testid": "link-nav-home",
                                children: "الرئيسية"
                            }, void 0, false, {
                                fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/products",
                                className: "text-sm font-semibold text-[#536574] transition hover:text-[#008f84]",
                                "data-testid": "link-nav-products",
                                children: "المنتجات"
                            }, void 0, false, {
                                fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/orders",
                                className: "text-sm font-semibold text-[#536574] transition hover:text-[#008f84]",
                                "data-testid": "link-nav-orders",
                                children: "طلباتي"
                            }, void 0, false, {
                                fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden items-center gap-2 md:flex",
                        children: [
                            user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "max-w-28 truncate text-sm font-semibold text-[#30485c]",
                                        "data-testid": "text-username",
                                        children: user.name
                                    }, void 0, false, {
                                        fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                                        lineNumber: 47,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleLogout,
                                        disabled: logout.isPending,
                                        className: "rounded-full p-2 text-[#536574] transition hover:bg-[#e8f2f2] hover:text-[#c14784]",
                                        "aria-label": "تسجيل الخروج",
                                        "data-testid": "button-logout",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                                            lineNumber: 49,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                                        lineNumber: 48,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/login",
                                className: "rounded-full px-4 py-2 text-sm font-bold text-[#354e61] transition hover:bg-[#eaf3f3]",
                                "data-testid": "link-login",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__["UserRound"], {
                                        className: "ml-2 inline",
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                                        lineNumber: 53,
                                        columnNumber: 156
                                    }, this),
                                    "دخول"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/cart",
                                className: "group flex items-center gap-2 rounded-full bg-[#0e8d83] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#08776f]",
                                "data-testid": "link-cart",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                        size: 17
                                    }, void 0, false, {
                                        fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                                        lineNumber: 56,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "السلة"
                                    }, void 0, false, {
                                        fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                                        lineNumber: 57,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "transition group-hover:-translate-x-1",
                                        size: 15
                                    }, void 0, false, {
                                        fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                                        lineNumber: 58,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setMenuOpen((current)=>!current),
                        className: "grid size-11 place-items-center rounded-full bg-[#e7f2f1] text-[#18344a] md:hidden",
                        "aria-label": menuOpen ? 'إغلاق القائمة' : 'فتح القائمة',
                        "aria-expanded": menuOpen,
                        "data-testid": "button-mobile-menu",
                        children: menuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 21
                        }, void 0, false, {
                            fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                            lineNumber: 62,
                            columnNumber: 23
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                            size: 21
                        }, void 0, false, {
                            fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                            lineNumber: 62,
                            columnNumber: 41
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-[#d8e5e7] bg-[#f7fbfb] px-5 py-5 md:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "container-shop flex flex-col gap-1",
                    "aria-label": "التنقل",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onClick: ()=>setMenuOpen(false),
                            href: "/",
                            className: "rounded-xl px-3 py-3 font-semibold text-[#344c60]",
                            "data-testid": "link-mobile-home",
                            children: "الرئيسية"
                        }, void 0, false, {
                            fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onClick: ()=>setMenuOpen(false),
                            href: "/products",
                            className: "rounded-xl px-3 py-3 font-semibold text-[#344c60]",
                            "data-testid": "link-mobile-products",
                            children: "كل المنتجات"
                        }, void 0, false, {
                            fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onClick: ()=>setMenuOpen(false),
                            href: "/orders",
                            className: "rounded-xl px-3 py-3 font-semibold text-[#344c60]",
                            "data-testid": "link-mobile-orders",
                            children: "طلباتي"
                        }, void 0, false, {
                            fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onClick: ()=>setMenuOpen(false),
                            href: "/cart",
                            className: "rounded-xl px-3 py-3 font-semibold text-[#087f76]",
                            "data-testid": "link-mobile-cart",
                            children: "سلة المشتريات"
                        }, void 0, false, {
                            fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                            lineNumber: 71,
                            columnNumber: 13
                        }, this),
                        user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleLogout,
                            className: "rounded-xl px-3 py-3 text-right font-semibold text-[#a4386e]",
                            "data-testid": "button-mobile-logout",
                            children: "تسجيل الخروج"
                        }, void 0, false, {
                            fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                            lineNumber: 73,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onClick: ()=>setMenuOpen(false),
                            href: "/login",
                            className: "rounded-xl px-3 py-3 font-semibold text-[#344c60]",
                            "data-testid": "link-mobile-login",
                            children: "تسجيل الدخول"
                        }, void 0, false, {
                            fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                            lineNumber: 75,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                    lineNumber: 67,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(SiteHeader, "6gb/keqnvDia5PN6KlLRo8aw3Fs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$generated$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetCurrentUser"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$generated$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLogOut"]
    ];
});
_c = SiteHeader;
function SiteFooter() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "mt-20 bg-[#10263e] text-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container-shop flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg font-bold tracking-[-0.04em]",
                            children: "TechSpace"
                        }, void 0, false, {
                            fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 max-w-sm text-sm leading-7 text-[#aec0ca]",
                            children: "تقنية ذكية لرحلات أكثر راحة. مختارة بعناية للمسافرين في الكويت."
                        }, void 0, false, {
                            fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$4$2e$0_$40$types$2b$node$40$25$2e$9$2e$6_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs tracking-wide text-[#92a8b4]",
                    children: "© TechSpace Kuwait · الأسعار بالدينار الكويتي"
                }, void 0, false, {
                    fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
            lineNumber: 87,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/artifacts/techspace-store/components/site-header.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_c1 = SiteFooter;
var _c, _c1;
__turbopack_context__.k.register(_c, "SiteHeader");
__turbopack_context__.k.register(_c1, "SiteFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api-client-react/src/custom-fetch.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "ResponseParseError",
    ()=>ResponseParseError,
    "customFetch",
    ()=>customFetch,
    "setAuthTokenGetter",
    ()=>setAuthTokenGetter,
    "setBaseUrl",
    ()=>setBaseUrl
]);
const NO_BODY_STATUS = new Set([
    204,
    205,
    304
]);
const DEFAULT_JSON_ACCEPT = "application/json, application/problem+json";
// ---------------------------------------------------------------------------
// Module-level configuration
// ---------------------------------------------------------------------------
let _baseUrl = null;
let _authTokenGetter = null;
function setBaseUrl(url) {
    _baseUrl = url ? url.replace(/\/+$/, "") : null;
}
function setAuthTokenGetter(getter) {
    _authTokenGetter = getter;
}
function isRequest(input) {
    return typeof Request !== "undefined" && input instanceof Request;
}
function resolveMethod(input, explicitMethod) {
    if (explicitMethod) return explicitMethod.toUpperCase();
    if (isRequest(input)) return input.method.toUpperCase();
    return "GET";
}
// Use loose check for URL — some runtimes (e.g. React Native) polyfill URL
// differently, so `instanceof URL` can fail.
function isUrl(input) {
    return typeof URL !== "undefined" && input instanceof URL;
}
function applyBaseUrl(input) {
    if (!_baseUrl) return input;
    const url = resolveUrl(input);
    // Only prepend to relative paths (starting with /)
    if (!url.startsWith("/")) return input;
    const absolute = `${_baseUrl}${url}`;
    if (typeof input === "string") return absolute;
    if (isUrl(input)) return new URL(absolute);
    return new Request(absolute, input);
}
function resolveUrl(input) {
    if (typeof input === "string") return input;
    if (isUrl(input)) return input.toString();
    return input.url;
}
function mergeHeaders(...sources) {
    const headers = new Headers();
    for (const source of sources){
        if (!source) continue;
        new Headers(source).forEach((value, key)=>{
            headers.set(key, value);
        });
    }
    return headers;
}
function getMediaType(headers) {
    const value = headers.get("content-type");
    return value ? value.split(";", 1)[0].trim().toLowerCase() : null;
}
function isJsonMediaType(mediaType) {
    return mediaType === "application/json" || Boolean(mediaType?.endsWith("+json"));
}
function isTextMediaType(mediaType) {
    return Boolean(mediaType && (mediaType.startsWith("text/") || mediaType === "application/xml" || mediaType === "text/xml" || mediaType.endsWith("+xml") || mediaType === "application/x-www-form-urlencoded"));
}
// Use strict equality: in browsers, `response.body` is `null` when the
// response genuinely has no content.  In React Native, `response.body` is
// always `undefined` because the ReadableStream API is not implemented —
// even when the response carries a full payload readable via `.text()` or
// `.json()`.  Loose equality (`== null`) matches both `null` and `undefined`,
// which causes every React Native response to be treated as empty.
function hasNoBody(response, method) {
    if (method === "HEAD") return true;
    if (NO_BODY_STATUS.has(response.status)) return true;
    if (response.headers.get("content-length") === "0") return true;
    if (response.body === null) return true;
    return false;
}
function stripBom(text) {
    return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}
function looksLikeJson(text) {
    const trimmed = text.trimStart();
    return trimmed.startsWith("{") || trimmed.startsWith("[");
}
function getStringField(value, key) {
    if (!value || typeof value !== "object") return undefined;
    const candidate = value[key];
    if (typeof candidate !== "string") return undefined;
    const trimmed = candidate.trim();
    return trimmed === "" ? undefined : trimmed;
}
function truncate(text, maxLength = 300) {
    return text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text;
}
function buildErrorMessage(response, data) {
    const prefix = `HTTP ${response.status} ${response.statusText}`;
    if (typeof data === "string") {
        const text = data.trim();
        return text ? `${prefix}: ${truncate(text)}` : prefix;
    }
    const title = getStringField(data, "title");
    const detail = getStringField(data, "detail");
    const message = getStringField(data, "message") ?? getStringField(data, "error_description") ?? getStringField(data, "error");
    if (title && detail) return `${prefix}: ${title} — ${detail}`;
    if (detail) return `${prefix}: ${detail}`;
    if (message) return `${prefix}: ${message}`;
    if (title) return `${prefix}: ${title}`;
    return prefix;
}
class ApiError extends Error {
    name = "ApiError";
    status;
    statusText;
    data;
    headers;
    response;
    method;
    url;
    constructor(response, data, requestInfo){
        super(buildErrorMessage(response, data));
        Object.setPrototypeOf(this, new.target.prototype);
        this.status = response.status;
        this.statusText = response.statusText;
        this.data = data;
        this.headers = response.headers;
        this.response = response;
        this.method = requestInfo.method;
        this.url = response.url || requestInfo.url;
    }
}
class ResponseParseError extends Error {
    name = "ResponseParseError";
    status;
    statusText;
    headers;
    response;
    method;
    url;
    rawBody;
    cause;
    constructor(response, rawBody, cause, requestInfo){
        super(`Failed to parse response from ${requestInfo.method} ${response.url || requestInfo.url} ` + `(${response.status} ${response.statusText}) as JSON`);
        Object.setPrototypeOf(this, new.target.prototype);
        this.status = response.status;
        this.statusText = response.statusText;
        this.headers = response.headers;
        this.response = response;
        this.method = requestInfo.method;
        this.url = response.url || requestInfo.url;
        this.rawBody = rawBody;
        this.cause = cause;
    }
}
async function parseJsonBody(response, requestInfo) {
    const raw = await response.text();
    const normalized = stripBom(raw);
    if (normalized.trim() === "") {
        return null;
    }
    try {
        return JSON.parse(normalized);
    } catch (cause) {
        throw new ResponseParseError(response, raw, cause, requestInfo);
    }
}
async function parseErrorBody(response, method) {
    if (hasNoBody(response, method)) {
        return null;
    }
    const mediaType = getMediaType(response.headers);
    // Fall back to text when blob() is unavailable (e.g. some React Native builds).
    if (mediaType && !isJsonMediaType(mediaType) && !isTextMediaType(mediaType)) {
        return typeof response.blob === "function" ? response.blob() : response.text();
    }
    const raw = await response.text();
    const normalized = stripBom(raw);
    const trimmed = normalized.trim();
    if (trimmed === "") {
        return null;
    }
    if (isJsonMediaType(mediaType) || looksLikeJson(normalized)) {
        try {
            return JSON.parse(normalized);
        } catch  {
            return raw;
        }
    }
    return raw;
}
function inferResponseType(response) {
    const mediaType = getMediaType(response.headers);
    if (isJsonMediaType(mediaType)) return "json";
    if (isTextMediaType(mediaType) || mediaType == null) return "text";
    return "blob";
}
async function parseSuccessBody(response, responseType, requestInfo) {
    if (hasNoBody(response, requestInfo.method)) {
        return null;
    }
    const effectiveType = responseType === "auto" ? inferResponseType(response) : responseType;
    switch(effectiveType){
        case "json":
            return parseJsonBody(response, requestInfo);
        case "text":
            {
                const text = await response.text();
                return text === "" ? null : text;
            }
        case "blob":
            if (typeof response.blob !== "function") {
                throw new TypeError("Blob responses are not supported in this runtime. " + "Use responseType \"json\" or \"text\" instead.");
            }
            return response.blob();
    }
}
async function customFetch(input, options = {}) {
    input = applyBaseUrl(input);
    const { responseType = "auto", headers: headersInit, ...init } = options;
    const method = resolveMethod(input, init.method);
    if (init.body != null && (method === "GET" || method === "HEAD")) {
        throw new TypeError(`customFetch: ${method} requests cannot have a body.`);
    }
    const headers = mergeHeaders(isRequest(input) ? input.headers : undefined, headersInit);
    if (typeof init.body === "string" && !headers.has("content-type") && looksLikeJson(init.body)) {
        headers.set("content-type", "application/json");
    }
    if (responseType === "json" && !headers.has("accept")) {
        headers.set("accept", DEFAULT_JSON_ACCEPT);
    }
    // Attach bearer token when an auth getter is configured and no
    // Authorization header has been explicitly provided.
    if (_authTokenGetter && !headers.has("authorization")) {
        const token = await _authTokenGetter();
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
    }
    const requestInfo = {
        method,
        url: resolveUrl(input)
    };
    const response = await fetch(input, {
        ...init,
        method,
        headers
    });
    if (!response.ok) {
        const errorData = await parseErrorBody(response, method);
        throw new ApiError(response, errorData, requestInfo);
    }
    return await parseSuccessBody(response, responseType, requestInfo);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api-client-react/src/generated/api.schemas.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Generated by orval 🍺
 * Do not edit manually.
 * Api
 * TechSpace storefront, local accounts, and private orders
 * OpenAPI spec version: 0.1.0
 */ __turbopack_context__.s([
    "OrderCurrency",
    ()=>OrderCurrency,
    "OrderStatus",
    ()=>OrderStatus
]);
const OrderCurrency = {
    KWD: 'KWD'
};
const OrderStatus = {
    pending: 'pending',
    paid: 'paid'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api-client-react/src/generated/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createOrder",
    ()=>createOrder,
    "getCreateOrderMutationKey",
    ()=>getCreateOrderMutationKey,
    "getCreateOrderMutationOptions",
    ()=>getCreateOrderMutationOptions,
    "getCreateOrderUrl",
    ()=>getCreateOrderUrl,
    "getCurrentUser",
    ()=>getCurrentUser,
    "getGetCurrentUserQueryKey",
    ()=>getGetCurrentUserQueryKey,
    "getGetCurrentUserQueryOptions",
    ()=>getGetCurrentUserQueryOptions,
    "getGetCurrentUserUrl",
    ()=>getGetCurrentUserUrl,
    "getGetProductQueryKey",
    ()=>getGetProductQueryKey,
    "getGetProductQueryOptions",
    ()=>getGetProductQueryOptions,
    "getGetProductUrl",
    ()=>getGetProductUrl,
    "getHealthCheckQueryKey",
    ()=>getHealthCheckQueryKey,
    "getHealthCheckQueryOptions",
    ()=>getHealthCheckQueryOptions,
    "getHealthCheckUrl",
    ()=>getHealthCheckUrl,
    "getListMyOrdersQueryKey",
    ()=>getListMyOrdersQueryKey,
    "getListMyOrdersQueryOptions",
    ()=>getListMyOrdersQueryOptions,
    "getListMyOrdersUrl",
    ()=>getListMyOrdersUrl,
    "getListProductsQueryKey",
    ()=>getListProductsQueryKey,
    "getListProductsQueryOptions",
    ()=>getListProductsQueryOptions,
    "getListProductsUrl",
    ()=>getListProductsUrl,
    "getLogInMutationKey",
    ()=>getLogInMutationKey,
    "getLogInMutationOptions",
    ()=>getLogInMutationOptions,
    "getLogInUrl",
    ()=>getLogInUrl,
    "getLogOutMutationKey",
    ()=>getLogOutMutationKey,
    "getLogOutMutationOptions",
    ()=>getLogOutMutationOptions,
    "getLogOutUrl",
    ()=>getLogOutUrl,
    "getProduct",
    ()=>getProduct,
    "getSignUpMutationKey",
    ()=>getSignUpMutationKey,
    "getSignUpMutationOptions",
    ()=>getSignUpMutationOptions,
    "getSignUpUrl",
    ()=>getSignUpUrl,
    "healthCheck",
    ()=>healthCheck,
    "listMyOrders",
    ()=>listMyOrders,
    "listProducts",
    ()=>listProducts,
    "logIn",
    ()=>logIn,
    "logOut",
    ()=>logOut,
    "signUp",
    ()=>signUp,
    "useCreateOrder",
    ()=>useCreateOrder,
    "useGetCurrentUser",
    ()=>useGetCurrentUser,
    "useGetProduct",
    ()=>useGetProduct,
    "useHealthCheck",
    ()=>useHealthCheck,
    "useListMyOrders",
    ()=>useListMyOrders,
    "useListProducts",
    ()=>useListProducts,
    "useLogIn",
    ()=>useLogIn,
    "useLogOut",
    ()=>useLogOut,
    "useSignUp",
    ()=>useSignUp
]);
/**
 * Generated by orval 🍺
 * Do not edit manually.
 * Api
 * TechSpace storefront, local accounts, and private orders
 * OpenAPI spec version: 0.1.0
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.102.8_react@19.1.0/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.102.8_react@19.1.0/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$custom$2d$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client-react/src/custom-fetch.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature();
;
;
const withQueryKey = (query, queryKey)=>{
    const result = {
        queryKey
    };
    for (const key of Object.keys(query)){
        // The explicit queryKey always wins, matching the previous
        // `{ ...query, queryKey }` spread where it was set last.
        if (key === 'queryKey') continue;
        Object.defineProperty(result, key, {
            enumerable: true,
            configurable: true,
            get: ()=>query[key]
        });
    }
    return result;
};
const getHealthCheckUrl = ()=>{
    return `/api/healthz`;
};
const healthCheck = async (options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$custom$2d$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customFetch"])(getHealthCheckUrl(), {
        ...options,
        method: 'GET'
    });
};
const getHealthCheckQueryKey = ()=>{
    return [
        `/api/healthz`
    ];
};
const getHealthCheckQueryOptions = (options)=>{
    const { query: queryOptions, request: requestOptions } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getHealthCheckQueryKey();
    const queryFn = ({ signal })=>healthCheck({
            signal,
            ...requestOptions
        });
    return {
        queryKey,
        queryFn,
        ...queryOptions
    };
};
function useHealthCheck(options) {
    _s();
    const queryOptions = getHealthCheckQueryOptions(options);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(queryOptions);
    return withQueryKey(query, queryOptions.queryKey);
}
_s(useHealthCheck, "c7fxJWDO4uMGjIdKMJSj1aiS9wg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const getListProductsUrl = ()=>{
    return `/api/products`;
};
const listProducts = async (options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$custom$2d$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customFetch"])(getListProductsUrl(), {
        ...options,
        method: 'GET'
    });
};
const getListProductsQueryKey = ()=>{
    return [
        `/api/products`
    ];
};
const getListProductsQueryOptions = (options)=>{
    const { query: queryOptions, request: requestOptions } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getListProductsQueryKey();
    const queryFn = ({ signal })=>listProducts({
            signal,
            ...requestOptions
        });
    return {
        queryKey,
        queryFn,
        ...queryOptions
    };
};
function useListProducts(options) {
    _s1();
    const queryOptions = getListProductsQueryOptions(options);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(queryOptions);
    return withQueryKey(query, queryOptions.queryKey);
}
_s1(useListProducts, "c7fxJWDO4uMGjIdKMJSj1aiS9wg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const getGetProductUrl = (productId)=>{
    return `/api/products/${productId}`;
};
const getProduct = async (productId, options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$custom$2d$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customFetch"])(getGetProductUrl(productId), {
        ...options,
        method: 'GET'
    });
};
const getGetProductQueryKey = (productId)=>{
    return [
        `/api/products/${productId}`
    ];
};
const getGetProductQueryOptions = (productId, options)=>{
    const { query: queryOptions, request: requestOptions } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getGetProductQueryKey(productId);
    const queryFn = ({ signal })=>getProduct(productId, {
            signal,
            ...requestOptions
        });
    return {
        queryKey,
        queryFn,
        enabled: productId !== null && productId !== undefined,
        ...queryOptions
    };
};
function useGetProduct(productId, options) {
    _s2();
    const queryOptions = getGetProductQueryOptions(productId, options);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(queryOptions);
    return withQueryKey(query, queryOptions.queryKey);
}
_s2(useGetProduct, "c7fxJWDO4uMGjIdKMJSj1aiS9wg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const getSignUpUrl = ()=>{
    return `/api/auth/signup`;
};
const signUp = async (signUpInput, options)=>{
    const getHeaders = (h)=>{
        if (!h) return {};
        if (h instanceof Headers) return Object.fromEntries(h.entries());
        if (Symbol.iterator in h) {
            return Object.fromEntries(Array.from(h, (entry)=>Array.from(entry)));
        }
        const headers = {};
        for (const [name, value] of Object.entries(h)){
            if (value !== undefined) headers[name] = value;
        }
        return headers;
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$custom$2d$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customFetch"])(getSignUpUrl(), {
        ...options,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getHeaders(options?.headers)
        },
        body: JSON.stringify(signUpInput)
    });
};
const getSignUpMutationKey = ()=>[
        'signUp'
    ];
const getSignUpMutationOptions = (options)=>{
    const mutationKey = getSignUpMutationKey();
    const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ? options : {
        ...options,
        mutation: {
            ...options.mutation,
            mutationKey
        }
    } : {
        mutation: {
            mutationKey
        },
        request: undefined
    };
    const mutationFn = (props)=>{
        const { data } = props ?? {};
        return signUp(data, requestOptions);
    };
    return {
        mutationFn,
        ...mutationOptions
    };
};
const useSignUp = (options)=>{
    _s3();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(getSignUpMutationOptions(options));
};
_s3(useSignUp, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const getLogInUrl = ()=>{
    return `/api/auth/login`;
};
const logIn = async (logInInput, options)=>{
    const getHeaders = (h)=>{
        if (!h) return {};
        if (h instanceof Headers) return Object.fromEntries(h.entries());
        if (Symbol.iterator in h) {
            return Object.fromEntries(Array.from(h, (entry)=>Array.from(entry)));
        }
        const headers = {};
        for (const [name, value] of Object.entries(h)){
            if (value !== undefined) headers[name] = value;
        }
        return headers;
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$custom$2d$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customFetch"])(getLogInUrl(), {
        ...options,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getHeaders(options?.headers)
        },
        body: JSON.stringify(logInInput)
    });
};
const getLogInMutationKey = ()=>[
        'logIn'
    ];
const getLogInMutationOptions = (options)=>{
    const mutationKey = getLogInMutationKey();
    const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ? options : {
        ...options,
        mutation: {
            ...options.mutation,
            mutationKey
        }
    } : {
        mutation: {
            mutationKey
        },
        request: undefined
    };
    const mutationFn = (props)=>{
        const { data } = props ?? {};
        return logIn(data, requestOptions);
    };
    return {
        mutationFn,
        ...mutationOptions
    };
};
const useLogIn = (options)=>{
    _s4();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(getLogInMutationOptions(options));
};
_s4(useLogIn, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const getGetCurrentUserUrl = ()=>{
    return `/api/auth/me`;
};
const getCurrentUser = async (options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$custom$2d$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customFetch"])(getGetCurrentUserUrl(), {
        ...options,
        method: 'GET'
    });
};
const getGetCurrentUserQueryKey = ()=>{
    return [
        `/api/auth/me`
    ];
};
const getGetCurrentUserQueryOptions = (options)=>{
    const { query: queryOptions, request: requestOptions } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getGetCurrentUserQueryKey();
    const queryFn = ({ signal })=>getCurrentUser({
            signal,
            ...requestOptions
        });
    return {
        queryKey,
        queryFn,
        ...queryOptions
    };
};
function useGetCurrentUser(options) {
    _s5();
    const queryOptions = getGetCurrentUserQueryOptions(options);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(queryOptions);
    return withQueryKey(query, queryOptions.queryKey);
}
_s5(useGetCurrentUser, "c7fxJWDO4uMGjIdKMJSj1aiS9wg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const getLogOutUrl = ()=>{
    return `/api/auth/logout`;
};
const logOut = async (options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$custom$2d$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customFetch"])(getLogOutUrl(), {
        ...options,
        method: 'POST'
    });
};
const getLogOutMutationKey = ()=>[
        'logOut'
    ];
const getLogOutMutationOptions = (options)=>{
    const mutationKey = getLogOutMutationKey();
    const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ? options : {
        ...options,
        mutation: {
            ...options.mutation,
            mutationKey
        }
    } : {
        mutation: {
            mutationKey
        },
        request: undefined
    };
    const mutationFn = ()=>{
        return logOut(requestOptions);
    };
    return {
        mutationFn,
        ...mutationOptions
    };
};
const useLogOut = (options)=>{
    _s6();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(getLogOutMutationOptions(options));
};
_s6(useLogOut, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const getListMyOrdersUrl = ()=>{
    return `/api/orders`;
};
const listMyOrders = async (options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$custom$2d$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customFetch"])(getListMyOrdersUrl(), {
        ...options,
        method: 'GET'
    });
};
const getListMyOrdersQueryKey = ()=>{
    return [
        `/api/orders`
    ];
};
const getListMyOrdersQueryOptions = (options)=>{
    const { query: queryOptions, request: requestOptions } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getListMyOrdersQueryKey();
    const queryFn = ({ signal })=>listMyOrders({
            signal,
            ...requestOptions
        });
    return {
        queryKey,
        queryFn,
        ...queryOptions
    };
};
function useListMyOrders(options) {
    _s7();
    const queryOptions = getListMyOrdersQueryOptions(options);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(queryOptions);
    return withQueryKey(query, queryOptions.queryKey);
}
_s7(useListMyOrders, "c7fxJWDO4uMGjIdKMJSj1aiS9wg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const getCreateOrderUrl = ()=>{
    return `/api/orders`;
};
const createOrder = async (placeOrderInput, options)=>{
    const getHeaders = (h)=>{
        if (!h) return {};
        if (h instanceof Headers) return Object.fromEntries(h.entries());
        if (Symbol.iterator in h) {
            return Object.fromEntries(Array.from(h, (entry)=>Array.from(entry)));
        }
        const headers = {};
        for (const [name, value] of Object.entries(h)){
            if (value !== undefined) headers[name] = value;
        }
        return headers;
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$custom$2d$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["customFetch"])(getCreateOrderUrl(), {
        ...options,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getHeaders(options?.headers)
        },
        body: JSON.stringify(placeOrderInput)
    });
};
const getCreateOrderMutationKey = ()=>[
        'createOrder'
    ];
const getCreateOrderMutationOptions = (options)=>{
    const mutationKey = getCreateOrderMutationKey();
    const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ? options : {
        ...options,
        mutation: {
            ...options.mutation,
            mutationKey
        }
    } : {
        mutation: {
            mutationKey
        },
        request: undefined
    };
    const mutationFn = (props)=>{
        const { data } = props ?? {};
        return createOrder(data, requestOptions);
    };
    return {
        mutationFn,
        ...mutationOptions
    };
};
const useCreateOrder = (options)=>{
    _s8();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(getCreateOrderMutationOptions(options));
};
_s8(useCreateOrder, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$102$2e$8_react$40$19$2e$1$2e$0$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api-client-react/src/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$generated$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client-react/src/generated/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$generated$2f$api$2e$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client-react/src/generated/api.schemas.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2d$react$2f$src$2f$custom$2d$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client-react/src/custom-fetch.ts [app-client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=_1_ayhsdd52su5._.js.map