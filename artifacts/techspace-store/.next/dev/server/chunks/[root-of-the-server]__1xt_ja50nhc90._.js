module.exports = [
(()=>{"use strict";return[
"[externals]/pg [external] (pg, esm_import, [project]/node_modules/.pnpm/pg@8.23.0/node_modules/pg)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
var mod = await __turbopack_context__.y("pg-71df57fbe79e18ab");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/node_modules/.pnpm/@replit+connectors-sdk@0.4.3/node_modules/@replit/connectors-sdk/client.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReplitConnectors = void 0;
const identity_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@replit+connectors-sdk@0.4.3/node_modules/@replit/connectors-sdk/identity.js [app-route] (ecmascript)");
function resolveProxyTarget(url, proxyBase) {
    if (url.startsWith(proxyBase)) {
        return url;
    }
    if (url.startsWith('http://') || url.startsWith('https://')) {
        const parsed = new URL(url);
        return `${proxyBase}${parsed.pathname}${parsed.search}`;
    }
    return `${proxyBase}${url.startsWith('/') ? '' : '/'}${url}`;
}
function flattenHeaders(headers) {
    if (!headers) {
        return {};
    }
    const result = {};
    if (headers instanceof Headers) {
        headers.forEach((value, key)=>{
            result[key] = value;
        });
    } else if (Array.isArray(headers)) {
        for (const pair of headers){
            result[pair[0]] = pair[1];
        }
    } else {
        Object.assign(result, headers);
    }
    return result;
}
/**
 * Per-connector strategies for shaping the `host` + `token` pair returned by
 * `getCliConfig()`. Different partner CLIs require different layouts:
 *
 *   - `dbx-compound-token`: the Databricks Go SDK (and CLIs built on it)
 *     strip the path from `*_HOST`, so routing data has to ride along
 *     inside the token. Used by `databricks` (U2M) and `databricks-m2m`.
 *
 *   - `path-route`: the CLI preserves the full URL path of `*_API_URL`,
 *     so the connector name + connection id can be encoded directly in
 *     the URL. Used by `microsoft-fabric` for the Rayfin CLI.
 *
 * Adding a new connector? Pick whichever strategy matches the partner
 * CLI's behavior — never invent a third format unless the CLI literally
 * cannot consume either of the two above.
 */ const dbxCompoundTokenStrategy = ({ baseUrl, connectorName, connectionId, rawIdentityToken })=>({
        host: baseUrl,
        token: `${rawIdentityToken} dbx:${connectionId}`,
        connectorName
    });
const pathRouteStrategy = ({ baseUrl, connectorName, connectionId, rawIdentityToken })=>({
        host: `${baseUrl}/api/v2/cli-proxy/${connectorName}/${connectionId}`,
        token: rawIdentityToken,
        connectorName
    });
const CLI_CONFIG_STRATEGIES = {
    databricks: dbxCompoundTokenStrategy,
    'databricks-m2m': dbxCompoundTokenStrategy,
    'microsoft-fabric': pathRouteStrategy,
    datadog: pathRouteStrategy
};
class ReplitConnectors {
    constructor(options){
        this.baseUrl = options?.baseUrl ?? (0, identity_1.resolveBaseUrl)();
    }
    async proxy(connectorName, path, options) {
        const method = options?.method ?? 'GET';
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        const url = `${this.getProxyUrl()}${normalizedPath}`;
        const headers = {
            ...await (0, identity_1.buildHeaders)(),
            'Connector-Name': connectorName,
            ...options?.headers ?? {}
        };
        const init = {
            method,
            headers
        };
        if (options?.body !== undefined && options.body !== null) {
            if (typeof options.body === 'string' || typeof Buffer !== 'undefined' && options.body instanceof Buffer || options.body instanceof ArrayBuffer || options.body instanceof FormData || options.body instanceof URLSearchParams || options.body instanceof Blob || options.body instanceof ReadableStream) {
                init.body = options.body;
            } else {
                init.body = JSON.stringify(options.body);
                if (!headers['Content-Type']) {
                    headers['Content-Type'] = 'application/json';
                }
            }
        }
        const response = await fetch(url, init);
        if (response.status === 401) {
            const freshAuth = await (0, identity_1.buildHeaders)();
            const retryResponse = await fetch(url, {
                ...init,
                headers: {
                    ...headers,
                    ...freshAuth
                }
            });
            return retryResponse;
        }
        return response;
    }
    async listConnections(options) {
        const params = new URLSearchParams();
        if (options?.connector_names) {
            params.set('connector_names', options.connector_names);
        }
        for (const val of options?.expand ?? [
            'connector'
        ]){
            params.append('expand', val);
        }
        params.set('refresh_policy', options?.refresh_policy ?? 'none');
        const qs = params.toString();
        const url = `${this.baseUrl}/api/v2/connection${qs ? `?${qs}` : ''}`;
        const headers = await (0, identity_1.buildHeaders)();
        const response = await fetch(url, {
            method: 'GET',
            headers
        });
        if (response.status === 401) {
            const freshHeaders = await (0, identity_1.buildHeaders)();
            const retryResponse = await fetch(url, {
                method: 'GET',
                headers: freshHeaders
            });
            if (!retryResponse.ok) {
                throw new Error(`Failed to list connections: ${retryResponse.status} ${retryResponse.statusText}`);
            }
            const data = await retryResponse.json();
            return data.items ?? [];
        }
        if (!response.ok) {
            throw new Error(`Failed to list connections: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data.items ?? [];
    }
    getProxyUrl() {
        return `${this.baseUrl}/api/v2/proxy`;
    }
    async getProxyHeaders(connectorName) {
        const headers = await (0, identity_1.buildHeaders)();
        return {
            ...headers,
            'Connector-Name': connectorName
        };
    }
    async getCliConfig(connectorName) {
        const strategy = CLI_CONFIG_STRATEGIES[connectorName];
        if (!strategy) {
            const supported = Object.keys(CLI_CONFIG_STRATEGIES).join(', ');
            throw new Error(`getCliConfig() is only supported for ${supported}, got: ${connectorName}`);
        }
        const connections = await this.listConnections({
            connector_names: connectorName
        });
        const connection = connections[0];
        if (!connection) {
            throw new Error(`No ${connectorName} connection found`);
        }
        const headers = await (0, identity_1.buildHeaders)();
        const identityToken = headers['X-Replit-Token'] ?? headers['Replit-Authentication'];
        if (!identityToken) {
            throw new Error('Replit identity token not found');
        }
        const rawToken = identityToken.replace(/^Bearer\s+/i, '');
        return strategy({
            baseUrl: this.baseUrl,
            connectorName,
            connectionId: connection.id,
            rawIdentityToken: rawToken
        });
    }
    createProxyFetch(connectorName) {
        const proxyBase = this.getProxyUrl();
        return async (input, init)=>{
            const rawUrl = input instanceof Request ? input.url : String(input);
            const targetUrl = resolveProxyTarget(rawUrl, proxyBase);
            const authHeaders = await (0, identity_1.buildHeaders)();
            const userHeaders = flattenHeaders(init?.headers ?? (input instanceof Request ? input.headers : undefined));
            const headers = {
                ...authHeaders,
                'Connector-Name': connectorName,
                ...userHeaders
            };
            const requestDefaults = input instanceof Request ? {
                method: input.method,
                body: input.body,
                cache: input.cache,
                credentials: input.credentials,
                integrity: input.integrity,
                keepalive: input.keepalive,
                mode: input.mode,
                redirect: input.redirect,
                referrer: input.referrer,
                referrerPolicy: input.referrerPolicy,
                signal: input.signal,
                // @ts-expect-error duplex is required for streaming bodies but missing from RequestInit
                duplex: input.body ? 'half' : undefined
            } : {};
            const fetchInit = {
                ...requestDefaults,
                ...init,
                headers
            };
            const response = await fetch(targetUrl, fetchInit);
            if (response.status === 401) {
                const freshAuth = await (0, identity_1.buildHeaders)();
                return fetch(targetUrl, {
                    ...fetchInit,
                    headers: {
                        ...freshAuth,
                        'Connector-Name': connectorName,
                        ...userHeaders
                    }
                });
            }
            return response;
        };
    }
}
exports.ReplitConnectors = ReplitConnectors;
}),
"[project]/node_modules/.pnpm/@replit+connectors-sdk@0.4.3/node_modules/@replit/connectors-sdk/identity.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveAudience = resolveAudience;
exports.createIdentityToken = createIdentityToken;
exports.resolveIdentityToken = resolveIdentityToken;
exports.resolveBaseUrl = resolveBaseUrl;
exports.buildHeaders = buildHeaders;
const node_child_process_1 = __turbopack_context__.r("[externals]/node:child_process [external] (node:child_process, cjs)");
const promises_1 = __turbopack_context__.r("[externals]/node:timers/promises [external] (node:timers/promises, cjs)");
const node_util_1 = __turbopack_context__.r("[externals]/node:util [external] (node:util, cjs)");
const execFileAsync = (0, node_util_1.promisify)(node_child_process_1.execFile);
const DEFAULT_CONNECTORS_HOST = 'connectors.replit.com';
const DEPLOYMENT_IDENTITY_ENDPOINT = 'http://127.0.0.1:1105/getIdentityToken';
const IDENTITY_MINT_TIMEOUT_MS = 5000;
const IDENTITY_MINT_RETRY_DELAY_MS = 250;
class TransientLocalIdentityError extends Error {
}
function isDeploymentEnvironment() {
    // Conrun exposes the same deployment markers, but is being retired and is
    // deliberately outside this migration. Preserve its existing Repl identity
    // path until the remaining callers move to replvisor.
    if (process.env['REPLIT_CONRUN']) return false;
    return [
        'REPLIT_DEPLOYMENT_ID',
        'REPLIT_DEPLOYMENT_ENVIRONMENT',
        'WEB_REPL_RENEWAL'
    ].some((name)=>Boolean(process.env[name]));
}
function resolveAudience() {
    const audience = process.env['REPLIT_CONNECTORS_AUDIENCE'];
    if (audience) {
        if (audience.startsWith('http://') || audience.startsWith('https://')) {
            return audience;
        }
        return `https://${audience}`;
    }
    return `https://${DEFAULT_CONNECTORS_HOST}`;
}
async function createIdentityToken() {
    const replitBinary = process.env['REPLIT_CLI'] || 'replit';
    const audience = resolveAudience();
    const { stdout } = await execFileAsync(replitBinary, [
        'identity',
        'create',
        '--audience',
        audience
    ], {
        encoding: 'utf8',
        timeout: IDENTITY_MINT_TIMEOUT_MS,
        windowsHide: true
    });
    const token = stdout.trim();
    if (!token) {
        throw new Error(`replit identity create returned an empty token (audience: ${audience})`);
    }
    return token;
}
async function createIdentityTokenFromLocalEndpoint(timeoutMs) {
    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort(), timeoutMs);
    try {
        let response;
        try {
            response = await fetch(DEPLOYMENT_IDENTITY_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    audience: resolveAudience()
                }),
                signal: controller.signal
            });
        } catch (cause) {
            if (cause instanceof TypeError) {
                throw new TransientLocalIdentityError('local identity endpoint is not accepting connections');
            }
            throw cause;
        }
        if (!response.ok) {
            const message = `local identity endpoint returned HTTP ${response.status}`;
            if (response.status >= 500) {
                throw new TransientLocalIdentityError(message);
            }
            throw new Error(message);
        }
        const payload = await response.json();
        if (typeof payload.identityToken !== 'string') {
            throw new Error('local identity endpoint returned an invalid response');
        }
        const token = payload.identityToken.trim();
        if (!token) {
            throw new Error('local identity endpoint returned an empty token');
        }
        return token;
    } finally{
        clearTimeout(timeout);
    }
}
async function createDeploymentIdentityToken() {
    const deadline = Date.now() + IDENTITY_MINT_TIMEOUT_MS;
    try {
        return await createIdentityToken();
    } catch  {
    // hostingpid1 also exposes the same audience-scoped mint over loopback.
    }
    // hostingpid1 starts the application and identity renewal concurrently. Its
    // loopback endpoint can therefore be listening briefly before the first
    // signing key is installed. Retry only that local startup seam, under the
    // same bounded mint deadline, and continue to fail closed.
    do {
        const remainingMs = Math.max(1, deadline - Date.now());
        try {
            return await createIdentityTokenFromLocalEndpoint(remainingMs);
        } catch (cause) {
            if (!(cause instanceof TransientLocalIdentityError)) break;
        }
        const retryBudgetMs = deadline - Date.now();
        if (retryBudgetMs <= 0) break;
        await (0, promises_1.setTimeout)(Math.min(IDENTITY_MINT_RETRY_DELAY_MS, retryBudgetMs));
    }while (Date.now() < deadline)
    throw new Error('Could not mint an audience-scoped deployment identity. ' + 'Neither `replit identity create` nor the local hostingpid1 identity ' + 'endpoint is available. Raw WEB_REPL_RENEWAL credentials are not accepted.');
}
async function resolveIdentityToken() {
    if (isDeploymentEnvironment()) {
        return `depl ${await createDeploymentIdentityToken()}`;
    }
    try {
        const token = await createIdentityToken();
        return token;
    } catch  {
    // CLI not available — fall through to env var strategies
    }
    const replIdentity = process.env['REPL_IDENTITY'];
    if (replIdentity) {
        return `repl ${replIdentity}`;
    }
    throw new Error('Replit identity token not found. ' + 'Could not run `replit identity create` and ' + 'REPL_IDENTITY is not set in the environment. ' + 'Are you running this inside a Repl?');
}
function resolveBaseUrl() {
    const hostname = process.env['REPLIT_CONNECTORS_HOSTNAME'];
    if (hostname) {
        if (hostname.startsWith('http://') || hostname.startsWith('https://')) {
            return hostname;
        }
        return `https://${hostname}`;
    }
    return `https://${DEFAULT_CONNECTORS_HOST}`;
}
async function buildHeaders() {
    const token = await resolveIdentityToken();
    const headers = {
        Accept: 'application/json'
    };
    if (token.startsWith('repl ') || token.startsWith('depl ')) {
        headers['X-Replit-Token'] = token;
    } else {
        headers['Replit-Authentication'] = `Bearer ${token}`;
    }
    return headers;
}
}),
"[project]/node_modules/.pnpm/@replit+connectors-sdk@0.4.3/node_modules/@replit/connectors-sdk/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReplitConnectors = void 0;
var client_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@replit+connectors-sdk@0.4.3/node_modules/@replit/connectors-sdk/client.js [app-route] (ecmascript)");
Object.defineProperty(exports, "ReplitConnectors", {
    enumerable: true,
    get: function() {
        return client_1.ReplitConnectors;
    }
});
}),
"[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/jwt/sign.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SignJWT",
    ()=>SignJWT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$jws_sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/jws_sign.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/util/errors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$jwt_claims_set$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/jwt_claims_set.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/validate.js [app-route] (ecmascript)");
;
;
;
;
const SignJWT_base = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$jwt_claims_set$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWTClaimsBuilder"];
class SignJWT extends SignJWT_base {
    #protectedHeader;
    setProtectedHeader(protectedHeader) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["assertNotSet"])(this.#protectedHeader, "setProtectedHeader"), this.#protectedHeader = protectedHeader, this;
    }
    async sign(key, options) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$jws_sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createCompactSignature"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$jwt_claims_set$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtData"])(this), this.#protectedHeader, options?.crit, key, ()=>{
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWTInvalid"]("JWTs MUST NOT use unencoded payload");
        });
    }
}
;
}),
"[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/jwt/verify.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "jwtVerify",
    ()=>jwtVerify
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$jws_verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/jws_verify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$jwt_claims_set$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/jwt_claims_set.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/util/errors.js [app-route] (ecmascript)");
;
;
;
async function jwtVerify(jwt, key, options) {
    const [verified, b64] = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$jws_verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyCompact"])(jwt, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$jws_verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prepareVerify"])(options), key);
    if (!b64) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWTInvalid"]("JWTs MUST NOT use unencoded payload");
    const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$jwt_claims_set$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateClaimsSet"])(verified.protectedHeader, verified.payload, options);
    return {
        ...verified,
        payload
    };
}
;
}),
"[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/buffer_utils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "concat",
    ()=>concat,
    "decodeBase64",
    ()=>decodeBase64,
    "decoder",
    ()=>decoder,
    "digest",
    ()=>digest,
    "encode",
    ()=>encode,
    "encodeBase64",
    ()=>encodeBase64,
    "encoder",
    ()=>encoder,
    "strictDecoder",
    ()=>strictDecoder,
    "uint32be",
    ()=>uint32be,
    "uint64be",
    ()=>uint64be
]);
const encoder = new TextEncoder(), decoder = new TextDecoder(), strictDecoder = new TextDecoder("utf-8", {
    fatal: !0
}), MAX_INT32 = 2 ** 32;
function concat(...buffers) {
    const size = buffers.reduce((acc, { length })=>acc + length, 0), buf = new Uint8Array(size);
    let i = 0;
    for (const buffer of buffers)buf.set(buffer, i), i += buffer.length;
    return buf;
}
function writeUInt32BE(buf, value, offset) {
    if (value < 0 || value >= MAX_INT32) throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
    buf.set([
        value >>> 24,
        value >>> 16,
        value >>> 8,
        value & 255
    ], offset);
}
function uint64be(value) {
    const high = Math.floor(value / MAX_INT32), low = value % MAX_INT32, buf = new Uint8Array(8);
    return writeUInt32BE(buf, high, 0), writeUInt32BE(buf, low, 4), buf;
}
function uint32be(value) {
    const buf = new Uint8Array(4);
    return writeUInt32BE(buf, value), buf;
}
const NON_ASCII = /[^\x00-\x7f]/;
function encode(string) {
    if (typeof string == "string" && string.length >= 128) {
        if (NON_ASCII.test(string)) throw new TypeError("non-ASCII string encountered in encode()");
        return encoder.encode(string);
    }
    const bytes = new Uint8Array(string.length);
    for(let i = 0; i < string.length; i++){
        const code = string.charCodeAt(i);
        if (code > 127) throw new TypeError("non-ASCII string encountered in encode()");
        bytes[i] = code;
    }
    return bytes;
}
function encodeBase64(input, url = !1) {
    if (Uint8Array.prototype.toBase64) return input.toBase64({
        alphabet: url ? "base64url" : "base64",
        omitPadding: url
    });
    const CHUNK_SIZE = 32768, arr = [];
    for(let i = 0; i < input.length; i += CHUNK_SIZE)arr.push(String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE)));
    const encoded = btoa(arr.join(""));
    return url ? encoded.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_") : encoded;
}
function decodeBase64(encoded, url = !1) {
    if (Uint8Array.fromBase64) return Uint8Array.fromBase64(encoded, {
        alphabet: url ? "base64url" : "base64"
    });
    if (url) {
        if (encoded.includes("+") || encoded.includes("/")) throw new TypeError("Invalid base64url");
        encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
    }
    const binary = atob(encoded), bytes = new Uint8Array(binary.length);
    for(let i = 0; i < binary.length; i++)bytes[i] = binary.charCodeAt(i);
    return bytes;
}
async function digest(algorithm, data) {
    const subtleDigest = `SHA-${algorithm.slice(-3)}`;
    return new Uint8Array(await crypto.subtle.digest(subtleDigest, data));
}
;
}),
"[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/jws_algorithms.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JWS",
    ()=>JWS,
    "jwsAlgorithm",
    ()=>jwsAlgorithm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/util/errors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$key_descriptor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/key_descriptor.js [app-route] (ecmascript)");
;
;
const sig = [
    [
        "verify"
    ],
    [
        "sign"
    ]
];
function hmac(bits) {
    const subtle = {
        name: "HMAC",
        hash: `SHA-${bits}`
    };
    return {
        kty: [
            "oct"
        ],
        secret: !0,
        subtle,
        signing: subtle,
        usages: sig
    };
}
function rsa(bits, saltLength) {
    const subtle = {
        name: saltLength ? "RSA-PSS" : "RSASSA-PKCS1-v1_5",
        hash: `SHA-${bits}`
    };
    return {
        kty: [
            "RSA"
        ],
        subtle,
        signing: saltLength ? {
            ...subtle,
            saltLength
        } : subtle,
        usages: sig,
        minRsaBits: 2048
    };
}
function ecdsa(crv, bits) {
    return {
        kty: [
            "EC"
        ],
        crv,
        subtle: {
            name: "ECDSA",
            namedCurve: crv
        },
        signing: {
            name: "ECDSA",
            hash: `SHA-${bits}`
        },
        usages: sig
    };
}
function eddsa() {
    const subtle = {
        name: "Ed25519"
    };
    return {
        kty: [
            "OKP"
        ],
        crv: "Ed25519",
        subtle,
        signing: subtle,
        usages: sig
    };
}
function mldsa(bits) {
    const subtle = {
        name: `ML-DSA-${bits}`
    };
    return {
        kty: [
            "AKP"
        ],
        subtle,
        signing: subtle,
        usages: sig
    };
}
const JWS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$key_descriptor$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["table"])({
    HS256: hmac(256),
    HS384: hmac(384),
    HS512: hmac(512),
    RS256: rsa(256),
    RS384: rsa(384),
    RS512: rsa(512),
    PS256: rsa(256, 32),
    PS384: rsa(384, 48),
    PS512: rsa(512, 64),
    ES256: ecdsa("P-256", 256),
    ES384: ecdsa("P-384", 384),
    ES512: ecdsa("P-521", 512),
    EdDSA: eddsa(),
    Ed25519: eddsa(),
    "ML-DSA-44": mldsa(44),
    "ML-DSA-65": mldsa(65),
    "ML-DSA-87": mldsa(87)
});
function jwsAlgorithm(alg) {
    const entry = typeof alg == "string" ? JWS[alg] : void 0;
    if (!entry) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JOSENotSupported"](`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    return entry;
}
;
}),
"[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/jws_sign.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCompactSignature",
    ()=>createCompactSignature,
    "createSignature",
    ()=>createSignature
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$base64url$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/util/base64url.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$jws_algorithms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/jws_algorithms.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/validate.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/util/errors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/buffer_utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$key$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/key.js [app-route] (ecmascript)");
;
;
;
;
;
;
async function createSignature(input, key, rejectUnencoded) {
    let [payload, protectedHeader, unprotectedHeader, crit] = input, protectedHeaderString = "";
    if (protectedHeader !== void 0) {
        const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeJoseHeader"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"], protectedHeader);
        protectedHeader = normalized[0], protectedHeaderString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$base64url$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"])(normalized[1]);
    }
    if (unprotectedHeader !== void 0 && (unprotectedHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeJoseHeader"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"], unprotectedHeader)[0]), !protectedHeader && !unprotectedHeader) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDisjoint"])(protectedHeader, unprotectedHeader)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
    const joseHeader = {
        ...protectedHeader,
        ...unprotectedHeader
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateCritDuplicates"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"], protectedHeader);
    const b64 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateB64"])(protectedHeader, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateCrit"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWS_RECOGNIZED"], crit, protectedHeader, joseHeader));
    b64 || rejectUnencoded?.();
    const { alg } = joseHeader;
    if (typeof alg != "string" || !alg) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    const entry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$jws_algorithms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwsAlgorithm"])(alg);
    let payloadS = "", payloadB = payload, data;
    if (b64) {
        const encoded = input[4];
        encoded ? (payloadS = encoded[0] ??= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$base64url$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"])(payload), payloadB = encoded[1] ??= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"])(payloadS)) : (payloadS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$base64url$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"])(payload), data = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encoder"].encode(`${protectedHeaderString}.${payloadS}`));
    }
    data ??= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["concat"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"])(protectedHeaderString), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"])("."), payloadB);
    const k = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$key$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rawKey"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$key$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prepareKey"])(entry, key, "sign"), entry.subtle, "sign");
    entry.minRsaBits && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$key$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkModulusLength"])(entry.alg, k);
    const jws = {
        signature: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$base64url$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"])(new Uint8Array(await crypto.subtle.sign(entry.signing, k, data))),
        payload: payloadS
    };
    return protectedHeader && (jws.protected = protectedHeaderString), unprotectedHeader && (jws.header = unprotectedHeader), [
        jws,
        b64
    ];
}
async function createCompactSignature(payload, protectedHeader, crit, key, rejectUnencoded) {
    const [jws] = await createSignature([
        payload,
        protectedHeader,
        void 0,
        crit
    ], key, rejectUnencoded);
    return `${jws.protected}.${jws.payload}.${jws.signature}`;
}
;
}),
"[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/jws_verify.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "encodeJsonUnencodedPayload",
    ()=>encodeJsonUnencodedPayload,
    "parseProtectedHeader",
    ()=>parseProtectedHeader,
    "prepareVerify",
    ()=>prepareVerify,
    "snapshotJws",
    ()=>snapshotJws,
    "verifyCompact",
    ()=>verifyCompact,
    "verifySignature",
    ()=>verifySignature
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$jws_algorithms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/jws_algorithms.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/util/errors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/buffer_utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/validate.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$key$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/key.js [app-route] (ecmascript)");
;
;
;
;
;
function snapshotJws(jws, sharedPayload) {
    const encodedProtected = jws.protected, inputHeader = jws.header, header = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObject"])(inputHeader) ? {
        ...inputHeader
    } : inputHeader;
    let payload = sharedPayload ? sharedPayload[0] : jws.payload;
    !sharedPayload && payload instanceof Uint8Array && (payload = new Uint8Array(payload));
    const signature = jws.signature, snapshot = {
        payload,
        signature
    };
    if (encodedProtected !== void 0 && (snapshot.protected = encodedProtected), inputHeader !== void 0 && (snapshot.header = header), encodedProtected === void 0 && header === void 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]('Flattened JWS must have either of the "protected" or "header" members');
    if (encodedProtected !== void 0 && typeof encodedProtected != "string") throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]("JWS Protected Header incorrect type");
    if (payload === void 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]("JWS Payload missing");
    if (typeof signature != "string") throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]("JWS Signature missing or incorrect type");
    if (header !== void 0 && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObject"])(header)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]("JWS Unprotected Header incorrect type");
    return snapshot;
}
function prepareVerify(options) {
    return [
        options && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAlgorithms"])("algorithms", options.algorithms),
        options?.crit
    ];
}
function parseProtectedHeader(encodedProtected) {
    return encodedProtected === void 0 ? {} : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseJoseHeader"])(encodedProtected, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"], "JWS Protected Header is invalid");
}
function encodeJsonUnencodedPayload(payload) {
    const invalid = /[\p{Cs}\p{Cn}]/u.exec(payload)?.[0];
    if (invalid !== void 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"](/\p{Cs}/u.test(invalid) ? "JWS Payload must be a well-formed Unicode string" : "JWS Payload must not contain unassigned Unicode code points");
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encoder"].encode(payload);
}
function encodeCompactUnencodedPayload(payload) {
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"])(payload);
    } catch  {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]("JWS Compact Serialization payload must use only ASCII characters");
    }
}
async function verifySignature(jws, shared, key, encodeUnencodedPayload, parsedProtected) {
    const { protected: encodedProtected, header, payload: inputPayload } = jws, parsedProt = parsedProtected ?? parseProtectedHeader(encodedProtected);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDisjoint"])(parsedProt, header)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
    const joseHeader = {
        ...parsedProt,
        ...header
    }, b64 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateB64"])(parsedProt, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateCrit"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWS_RECOGNIZED"], shared[1], parsedProt, joseHeader)), { alg } = joseHeader;
    if (typeof alg != "string" || !alg) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    if (shared[0] && !shared[0].has(alg)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JOSEAlgNotAllowed"]('"alg" (Algorithm) Header Parameter value not allowed');
    if (b64) {
        if (typeof inputPayload != "string") throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]("JWS Payload must be a string");
    } else if (typeof inputPayload != "string" && !(inputPayload instanceof Uint8Array)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]("JWS Payload must be a string or an Uint8Array instance");
    const signingPayload = b64 || typeof inputPayload != "string" ? inputPayload : encodeUnencodedPayload(inputPayload);
    let resolvedKey = !1;
    typeof key == "function" && (key = await key(parsedProt, jws), resolvedKey = !0);
    const entry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$jws_algorithms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwsAlgorithm"])(alg), data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["concat"])(encodedProtected !== void 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"])(encodedProtected) : new Uint8Array(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"])("."), typeof signingPayload == "string" ? shared[2] ??= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeBase64url"])(signingPayload, "payload", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]) : signingPayload), signature = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeBase64url"])(jws.signature, "signature", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]), k = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$key$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prepareKey"])(entry, key, "verify"), cryptoKey = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$key$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rawKey"])(k, entry.subtle, "verify");
    entry.minRsaBits && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$key$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkModulusLength"])(entry.alg, cryptoKey);
    let verified = !1;
    try {
        verified = await crypto.subtle.verify(entry.signing, cryptoKey, signature, data);
    } catch  {}
    if (!verified) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSSignatureVerificationFailed"]();
    const result = {
        payload: typeof signingPayload == "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeBase64url"])(signingPayload, "payload", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]) : signingPayload
    };
    return encodedProtected !== void 0 && (result.protectedHeader = parsedProt), header !== void 0 && (result.unprotectedHeader = header), resolvedKey ? [
        {
            ...result,
            key: k
        },
        b64
    ] : [
        result,
        b64
    ];
}
async function verifyCompact(jws, shared, key) {
    if (jws instanceof Uint8Array && (jws = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decoder"].decode(jws)), typeof jws != "string") throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]("Compact JWS must be a string or Uint8Array");
    const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
    if (length !== 3) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]("Invalid Compact JWS");
    return verifySignature({
        payload,
        protected: protectedHeader,
        signature
    }, shared, key, encodeCompactUnencodedPayload);
}
;
}),
"[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/jwt_claims_set.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JWTClaimsBuilder",
    ()=>JWTClaimsBuilder,
    "jwtClaim",
    ()=>jwtClaim,
    "jwtData",
    ()=>jwtData,
    "secs",
    ()=>secs,
    "validateClaimsSet",
    ()=>validateClaimsSet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/util/errors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/buffer_utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/validate.js [app-route] (ecmascript)");
;
;
;
const epoch = (date)=>Math.floor(date.getTime() / 1e3), multipliers = {
    s: 1,
    m: 60,
    h: 3600,
    d: 86400,
    w: 604800,
    y: 31557600
}, REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, checkFailed = "check_failed";
function invalidDuration() {
    throw new TypeError("Invalid time period format");
}
function secs(str) {
    typeof str != "string" && invalidDuration();
    const matched = REGEX.exec(str);
    (!matched || matched[4] && matched[1]) && invalidDuration();
    const value = parseFloat(matched[2]), numericDate2 = Math.round(value * multipliers[matched[3][0].toLowerCase()]);
    return Number.isFinite(numericDate2) || invalidDuration(), matched[1] === "-" || matched[4] === "ago" ? -numericDate2 : numericDate2;
}
function validateInput(label, input) {
    if (!Number.isFinite(input)) throw new TypeError(`Invalid ${label} input`);
    return input;
}
function validateStringClaim(claim, value) {
    if (typeof value != "string") throw new TypeError(`"${claim}" claim must be a string`);
}
function validateAudienceClaim(value) {
    if (typeof value != "string" && (!Array.isArray(value) || Array.from(value).some((member)=>typeof member != "string"))) throw new TypeError('"aud" claim must be a string or an array of strings');
}
function numericDate(value, label) {
    return typeof value == "number" ? validateInput(label, value) : value instanceof Date ? validateInput(label, epoch(value)) : epoch(/* @__PURE__ */ new Date()) + secs(value);
}
const normalizeTyp = (value)=>{
    const normalized = value.toLowerCase();
    return value.includes("/") ? normalized : `application/${normalized}`;
}, checkAudiencePresence = (audPayload, audOption)=>typeof audPayload == "string" ? audOption.includes(audPayload) : Array.isArray(audPayload) ? audOption.some((aud)=>audPayload.includes(aud)) : !1;
function validateNumericDate(payload, claim, required = !1) {
    const value = payload[claim];
    if (!(value === void 0 && !required)) {
        if (typeof value != "number") throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"](`"${claim}" claim must be a number`, payload, claim, "invalid");
        return value;
    }
}
function unexpectedClaim(payload, claim) {
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"](`unexpected "${claim}" claim value`, payload, claim, checkFailed);
}
function validateClaimsSet(protectedHeader, encodedPayload, options = {}) {
    let payload;
    try {
        payload = JSON.parse(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strictDecoder"].decode(encodedPayload));
    } catch  {}
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObject"])(payload)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWTInvalid"]("JWT Claims Set must be a top-level JSON object");
    const { typ } = options;
    if (typ !== void 0 && (typeof protectedHeader.typ != "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"]('unexpected "typ" JWT header value', payload, "typ", checkFailed);
    const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options, presenceCheck = [
        ...requiredClaims
    ];
    maxTokenAge !== void 0 && presenceCheck.push("iat"), audience !== void 0 && presenceCheck.push("aud"), subject !== void 0 && presenceCheck.push("sub"), issuer !== void 0 && presenceCheck.push("iss");
    for (const claim of new Set(presenceCheck.reverse()))if (!Object.hasOwn(payload, claim)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"](`missing required "${claim}" claim`, payload, claim, "missing");
    issuer !== void 0 && !(Array.isArray(issuer) ? issuer : [
        issuer
    ]).includes(payload.iss) && unexpectedClaim(payload, "iss"), subject !== void 0 && payload.sub !== subject && unexpectedClaim(payload, "sub"), audience !== void 0 && !checkAudiencePresence(payload.aud, typeof audience == "string" ? [
        audience
    ] : audience) && unexpectedClaim(payload, "aud");
    const { clockTolerance } = options;
    let tolerance = 0;
    if (typeof clockTolerance == "string") tolerance = secs(clockTolerance);
    else if (clockTolerance !== void 0) {
        if (typeof clockTolerance != "number") throw new TypeError("Invalid clockTolerance option type");
        tolerance = clockTolerance;
    }
    validateInput("clockTolerance option", tolerance);
    const { currentDate } = options, now = validateInput("currentDate option", epoch(currentDate === void 0 ? /* @__PURE__ */ new Date() : currentDate)), iat = validateNumericDate(payload, "iat", maxTokenAge !== void 0), nbf = validateNumericDate(payload, "nbf");
    if (nbf !== void 0 && nbf > now + tolerance) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"]('"nbf" claim timestamp check failed', payload, "nbf", checkFailed);
    const exp = validateNumericDate(payload, "exp");
    if (exp !== void 0 && exp <= now - tolerance) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWTExpired"]('"exp" claim timestamp check failed', payload, "exp", checkFailed);
    if (maxTokenAge !== void 0) {
        const age = now - iat, max = validateInput("maxTokenAge option", typeof maxTokenAge == "number" ? maxTokenAge : secs(maxTokenAge));
        if (age - tolerance > max) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWTExpired"]('"iat" claim timestamp check failed (too far in the past)', payload, "iat", checkFailed);
        if (age < -tolerance) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"]('"iat" claim timestamp check failed (it should be in the past)', payload, "iat", checkFailed);
    }
    return payload;
}
let producerPayloads;
function producerPayload(producer) {
    return producerPayloads.get(producer);
}
function jwtData(producer) {
    const payload = producerPayload(producer);
    for (const claim of [
        "iat",
        "nbf",
        "exp"
    ]){
        const value = payload[claim];
        if (typeof value == "number" && !Number.isFinite(value)) throw new TypeError(`"${claim}" claim must be a finite number`);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encoder"].encode(JSON.stringify(payload));
}
function jwtClaim(producer, claim) {
    return producerPayload(producer)[claim];
}
class JWTClaimsBuilder {
    constructor(payload = {}){
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObject"])(payload)) throw new TypeError("JWT Claims Set MUST be an object");
        (producerPayloads ||= /* @__PURE__ */ new WeakMap()).set(this, structuredClone(payload));
    }
    setIssuer(value) {
        return validateStringClaim("iss", value), producerPayload(this).iss = value, this;
    }
    setSubject(value) {
        return validateStringClaim("sub", value), producerPayload(this).sub = value, this;
    }
    setAudience(value) {
        return validateAudienceClaim(value), producerPayload(this).aud = value, this;
    }
    setJti(value) {
        return validateStringClaim("jti", value), producerPayload(this).jti = value, this;
    }
    setNotBefore(value) {
        return producerPayload(this).nbf = numericDate(value, "setNotBefore"), this;
    }
    setExpirationTime(value) {
        return producerPayload(this).exp = numericDate(value, "setExpirationTime"), this;
    }
    setIssuedAt(value) {
        const payload = producerPayload(this);
        return value === void 0 ? payload.iat = epoch(/* @__PURE__ */ new Date()) : typeof value == "string" ? payload.iat = validateInput("setIssuedAt", epoch(/* @__PURE__ */ new Date()) + secs(value)) : payload.iat = numericDate(value, "setIssuedAt"), this;
    }
}
;
}),
"[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/key.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assertCryptoKey",
    ()=>assertCryptoKey,
    "checkCryptoKey",
    ()=>checkCryptoKey,
    "checkModulusLength",
    ()=>checkModulusLength,
    "checkUsage",
    ()=>checkUsage,
    "invalidKeyInput",
    ()=>invalidKeyInput,
    "isCryptoKey",
    ()=>isCryptoKey,
    "isKeyLike",
    ()=>isKeyLike,
    "isKeyObject",
    ()=>isKeyObject,
    "jwkToKey",
    ()=>jwkToKey,
    "normalizeJwk",
    ()=>normalizeJwk,
    "prepareKey",
    ()=>prepareKey,
    "rawKey",
    ()=>rawKey,
    "snapshotJwk",
    ()=>snapshotJwk,
    "validateExtractableOption",
    ()=>validateExtractableOption
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/validate.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$base64url$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/util/base64url.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/util/errors.js [app-route] (ecmascript)");
;
;
;
const tag = (key)=>key[Symbol.toStringTag], jwkMatchesOp = (entry, key, usage)=>{
    const { alg } = entry;
    if (key.use !== void 0) {
        const expected = usage === "sign" || usage === "verify" ? "sig" : "enc";
        if (key.use !== expected) throw new TypeError(`Invalid key for this operation, its "use" must be "${expected}" when present`);
    }
    if (key.alg !== void 0 && key.alg !== alg) throw new TypeError(`Invalid key for this operation, its "alg" must be "${alg}" when present`);
    if (Array.isArray(key.key_ops)) {
        const expectedKeyOp = usage === "encrypt" || usage === "decrypt" ? entry.ops?.[usage === "encrypt" ? 0 : 1] : usage;
        if (expectedKeyOp && !key.key_ops.includes(expectedKeyOp)) throw new TypeError(`Invalid key for this operation, its "key_ops" must include "${expectedKeyOp}" when present`);
    }
};
async function prepareKey(entry, key, usage) {
    const { alg, secret } = entry, privateKey = usage === "decrypt" || usage === "sign";
    if (secret && key instanceof Uint8Array) return key;
    let normalized, keyObject;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObject"])(key)) {
        if (normalized = normalizeJwk(key), typeof normalized.kty != "string") throw invalidKeyType(alg, key, secret);
        if (!(secret ? normalized.kty === "oct" && typeof normalized.k == "string" : normalized.kty !== "oct" && (privateKey ? normalized.kty === "AKP" && typeof normalized.priv == "string" || typeof normalized.d == "string" : normalized.d === void 0 && normalized.priv === void 0))) throw new TypeError(secret ? 'JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present' : `JSON Web Key for this operation must be a ${privateKey ? "private" : "public"} JWK`);
        if (jwkMatchesOp(entry, normalized, usage), normalized.kty === "oct") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$base64url$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decode"])(normalized.k);
        if (!Object.isFrozen(key)) {
            const { key_ops } = key;
            Array.isArray(key_ops) && Object.freeze(key_ops), Object.freeze(key);
        }
    } else {
        if (!isKeyLike(key)) throw invalidKeyType(alg, key, secret);
        const expectedType = secret ? "secret" : privateKey ? "private" : "public";
        if (key.type !== expectedType && (secret || [
            "secret",
            "public",
            "private"
        ].includes(key.type))) throw new TypeError(`${tag(key)} instances must be of type "${expectedType}" for the ${alg} algorithm`);
        if (isCryptoKey(key)) return key;
        if (keyObject = key, keyObject.type === "secret") return keyObject.export();
    }
    cache ||= /* @__PURE__ */ new WeakMap();
    const cacheKey = key;
    let cached = cache.get(cacheKey);
    if (cached?.[alg]) return cached[alg];
    if (cached || cache.set(cacheKey, cached = {}), keyObject && typeof keyObject.toCryptoKey == "function") {
        const isPublic = keyObject.type === "public", crv = nist[keyObject.asymmetricKeyDetails?.namedCurve], params = entry.resolve?.({
            crv,
            asymmetricKeyType: keyObject.asymmetricKeyType
        }) ?? entry.subtle;
        return cached[alg] = keyObject.toCryptoKey(params, isPublic, entry.usages[isPublic ? 0 : 1]);
    }
    return normalized ??= keyObject.export({
        format: "jwk"
    }), normalized.alg = alg, cached[alg] = await jwkToKey(entry, normalized);
}
let cache;
const nist = {
    __proto__: null,
    prime256v1: "P-256",
    secp384r1: "P-384",
    secp521r1: "P-521"
};
function assertCryptoKey(key) {
    if (!isCryptoKey(key)) throw new Error("CryptoKey instance expected");
}
const isCryptoKey = (key)=>{
    if (key?.[Symbol.toStringTag] === "CryptoKey") return !0;
    try {
        return key instanceof CryptoKey;
    } catch  {
        return !1;
    }
}, isKeyObject = (key)=>key?.[Symbol.toStringTag] === "KeyObject", isKeyLike = (key)=>isCryptoKey(key) || isKeyObject(key);
function message(msg, actual, ...types) {
    if (types.length > 2) {
        const last = types.pop();
        msg += `one of type ${types.join(", ")}, or ${last}.`;
    } else types.length === 2 ? msg += `one of type ${types[0]} or ${types[1]}.` : msg += `of type ${types[0]}.`;
    return actual == null ? msg += ` Received ${actual}` : typeof actual == "function" && actual.name ? msg += ` Received function ${actual.name}` : typeof actual == "object" && actual != null && actual.constructor?.name && (msg += ` Received an instance of ${actual.constructor.name}`), msg;
}
const invalidKeyInput = (actual, ...types)=>message("Key must be ", actual, ...types);
function invalidKeyType(alg, actual, secret) {
    const types = [
        "CryptoKey",
        "KeyObject",
        "JSON Web Key"
    ];
    return secret && types.push("Uint8Array"), new TypeError(message(`Key for the ${alg} algorithm must be `, actual, ...types));
}
const unusable = (name, prop = "algorithm.name")=>new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
function checkUsage(key, usage) {
    if (usage && !key.usages.includes(usage)) throw new TypeError(`CryptoKey does not support this operation, its usages must include ${usage}.`);
}
function checkModulusLength(alg, key) {
    const { modulusLength } = key.algorithm;
    if (typeof modulusLength != "number" || modulusLength < 2048) throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
}
function checkCryptoKey(key, expected, usage) {
    const algorithm = key.algorithm;
    if (algorithm.name !== expected.name) throw unusable(expected.name);
    if (expected.hash && algorithm.hash?.name !== expected.hash) throw unusable(expected.hash, "algorithm.hash");
    if (expected.namedCurve && algorithm.namedCurve !== expected.namedCurve) throw unusable(expected.namedCurve, "algorithm.namedCurve");
    if (expected.length !== void 0 && algorithm.length !== expected.length) throw unusable(expected.length, "algorithm.length");
    checkUsage(key, usage);
}
function snapshotJwk(jwk) {
    return {
        __proto__: null,
        ...jwk
    };
}
function normalizeJwk(jwk) {
    const normalized = snapshotJwk(jwk);
    if (normalized.ext !== void 0 && typeof normalized.ext != "boolean") throw new TypeError('"ext" (Extractable) Parameter must be a boolean');
    if (normalized.key_ops !== void 0) {
        const value = normalized.key_ops, keyOps = Array.isArray(value) ? [
            ...value
        ] : void 0;
        if (!keyOps || keyOps.some((operation)=>typeof operation != "string") || new Set(keyOps).size !== keyOps.length) throw new TypeError('"key_ops" (Key Operations) Parameter must be an array of unique strings');
        normalized.key_ops = keyOps;
    }
    return normalized;
}
function validateExtractableOption(extractable) {
    if (extractable !== void 0 && typeof extractable != "boolean") throw new TypeError('"extractable" option must be a boolean');
    return extractable;
}
async function jwkToKey(entry, jwk, extractable) {
    if (!entry.kty.includes(jwk.kty)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JOSENotSupported"]('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    const algorithm = entry.resolve?.({
        kty: jwk.kty,
        crv: jwk.crv
    }) ?? entry.subtle, isPrivate = !!(jwk.d || jwk.priv), keyData = {
        ...jwk,
        ext: extractable ?? jwk.ext
    };
    return keyData.kty !== "AKP" && delete keyData.alg, delete keyData.use, crypto.subtle.importKey("jwk", keyData, algorithm, keyData.ext ?? !isPrivate, jwk.key_ops ?? entry.usages[isPrivate ? 1 : 0]);
}
async function rawKey(key, expected, usage, extractable = !1) {
    return key instanceof Uint8Array && (key = await crypto.subtle.importKey("raw", key, expected, extractable, [
        usage
    ])), checkCryptoKey(key, expected, usage), key;
}
;
}),
"[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/key_descriptor.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "table",
    ()=>table
]);
function table(entries) {
    const out = {
        __proto__: null
    };
    for(const alg in entries)out[alg] = {
        ...entries[alg],
        alg
    };
    return out;
}
;
}),
"[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/validate.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JWE_RECOGNIZED",
    ()=>JWE_RECOGNIZED,
    "JWS_RECOGNIZED",
    ()=>JWS_RECOGNIZED,
    "assertNotSet",
    ()=>assertNotSet,
    "assertUint8Array",
    ()=>assertUint8Array,
    "decodeBase64url",
    ()=>decodeBase64url,
    "encodeBase64url",
    ()=>encodeBase64url,
    "isDisjoint",
    ()=>isDisjoint,
    "isJwkSet",
    ()=>isJwkSet,
    "isObject",
    ()=>isObject,
    "parseJoseHeader",
    ()=>parseJoseHeader,
    "serializeJoseHeader",
    ()=>serializeJoseHeader,
    "validateAlgorithms",
    ()=>validateAlgorithms,
    "validateB64",
    ()=>validateB64,
    "validateCrit",
    ()=>validateCrit,
    "validateCritDuplicates",
    ()=>validateCritDuplicates
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/util/errors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$base64url$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/util/base64url.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/buffer_utils.js [app-route] (ecmascript)");
;
;
;
function assertUint8Array(input, label) {
    if (!(input instanceof Uint8Array)) throw new TypeError(`${label} must be an instance of Uint8Array`);
}
function isObject(input) {
    if (typeof input != "object" || input === null || Object.prototype.toString.call(input) !== "[object Object]") return !1;
    const prototype = Object.getPrototypeOf(input);
    return prototype === null || Object.getPrototypeOf(prototype) === null;
}
function isJwkSet(input) {
    return isObject(input) && Array.isArray(input.keys) && Array.from(input.keys).every(isObject);
}
function isDisjoint(...headers) {
    const parameters = /* @__PURE__ */ new Set();
    for (const header of headers)if (header) for (const parameter of Object.keys(header)){
        if (parameters.has(parameter)) return !1;
        parameters.add(parameter);
    }
    return !0;
}
function assertNotSet(value, name) {
    if (value !== void 0) throw new TypeError(`${name} can only be called once`);
}
function decodeBase64url(value, label, ErrorClass) {
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$base64url$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decode"])(value);
    } catch  {
        throw new ErrorClass(`Failed to base64url decode the ${label}`);
    }
}
function encodeBase64url(value, label, ErrorClass) {
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"])(value);
    } catch  {
        throw new ErrorClass(`The ${label} is not a valid base64url string`);
    }
}
function parseJoseHeader(b64, ErrorClass, message) {
    let parsed;
    try {
        parsed = JSON.parse(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strictDecoder"].decode((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$base64url$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decode"])(b64)));
    } catch  {
        throw new ErrorClass(message);
    }
    if (!isObject(parsed)) throw new ErrorClass(message);
    return parsed;
}
const JWS_RECOGNIZED = {
    __proto__: null,
    b64: !0
}, JWE_RECOGNIZED = {
    __proto__: null
};
function validateAlgorithms(option, algorithms) {
    if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s)=>typeof s != "string"))) throw new TypeError(`"${option}" option must be an array of strings`);
    return algorithms === void 0 ? void 0 : new Set(algorithms);
}
function validateCritDuplicates(Err, protectedHeader) {
    const { crit } = protectedHeader ?? {};
    if (Array.isArray(crit) && new Set(crit).size !== crit.length) throw new Err('"crit" (Critical) Header Parameter MUST NOT contain duplicate values');
}
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
    if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0) throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
    if (!protectedHeader || protectedHeader.crit === void 0) return [];
    if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input)=>typeof input != "string" || input.length === 0)) throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
    const recognized = recognizedOption === void 0 ? recognizedDefault : {
        __proto__: null,
        ...recognizedOption,
        ...recognizedDefault
    };
    for (const parameter of protectedHeader.crit){
        if (!(parameter in recognized)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JOSENotSupported"](`Extension Header Parameter "${parameter}" is not recognized`);
        if (!Object.hasOwn(joseHeader, parameter) || joseHeader[parameter] === void 0) throw new Err(`Extension Header Parameter "${parameter}" is missing`);
        if (recognized[parameter] && (!Object.hasOwn(protectedHeader, parameter) || protectedHeader[parameter] === void 0)) throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
    }
    return protectedHeader.crit;
}
function validateB64(protectedHeader, extensions) {
    if (extensions.includes("b64")) {
        const b64 = protectedHeader.b64;
        if (typeof b64 != "boolean") throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JWSInvalid"]('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        return b64;
    }
    return !0;
}
function serializeJoseHeader(Err, header) {
    let serialized, parsed;
    try {
        serialized = JSON.stringify(header), parsed = JSON.parse(serialized);
    } catch (cause) {
        throw new Err("JOSE Header is not valid JSON", {
            cause
        });
    }
    if (!isObject(parsed)) throw new Err("JOSE Header is not a JSON object");
    return [
        parsed,
        serialized
    ];
}
;
}),
"[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/util/base64url.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decode",
    ()=>decode,
    "encode",
    ()=>encode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/lib/buffer_utils.js [app-route] (ecmascript)");
;
const invalid = "The input to be decoded is not correctly encoded.";
function decode(input) {
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeBase64"])(typeof input == "string" ? input : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decoder"].decode(input), !0);
    } catch (cause) {
        throw new TypeError(invalid, {
            cause
        });
    }
}
function encode(input) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeBase64"])(typeof input == "string" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$12$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$lib$2f$buffer_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encoder"].encode(input) : input, !0);
}
;
}),
"[project]/node_modules/.pnpm/jose@6.2.12/node_modules/jose/dist/webapi/util/errors.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JOSEAlgNotAllowed",
    ()=>JOSEAlgNotAllowed,
    "JOSEError",
    ()=>JOSEError,
    "JOSENotSupported",
    ()=>JOSENotSupported,
    "JWEDecryptionFailed",
    ()=>JWEDecryptionFailed,
    "JWEInvalid",
    ()=>JWEInvalid,
    "JWKInvalid",
    ()=>JWKInvalid,
    "JWKSInvalid",
    ()=>JWKSInvalid,
    "JWKSMultipleMatchingKeys",
    ()=>JWKSMultipleMatchingKeys,
    "JWKSNoMatchingKey",
    ()=>JWKSNoMatchingKey,
    "JWKSTimeout",
    ()=>JWKSTimeout,
    "JWSInvalid",
    ()=>JWSInvalid,
    "JWSSignatureVerificationFailed",
    ()=>JWSSignatureVerificationFailed,
    "JWTClaimValidationFailed",
    ()=>JWTClaimValidationFailed,
    "JWTExpired",
    ()=>JWTExpired,
    "JWTInvalid",
    ()=>JWTInvalid
]);
class JOSEError extends Error {
    static code = "ERR_JOSE_GENERIC";
    code = "ERR_JOSE_GENERIC";
    constructor(message, options){
        super(message, options), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
    }
}
class JWTClaimValidationFailed extends JOSEError {
    static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
    code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
    claim;
    reason;
    payload;
    constructor(message, payload, claim = "unspecified", reason = "unspecified"){
        super(message, {
            cause: {
                claim,
                reason,
                payload
            }
        }), this.claim = claim, this.reason = reason, this.payload = payload;
    }
}
class JWTExpired extends JOSEError {
    static code = "ERR_JWT_EXPIRED";
    code = "ERR_JWT_EXPIRED";
    claim;
    reason;
    payload;
    constructor(message, payload, claim = "unspecified", reason = "unspecified"){
        super(message, {
            cause: {
                claim,
                reason,
                payload
            }
        }), this.claim = claim, this.reason = reason, this.payload = payload;
    }
}
class JOSEAlgNotAllowed extends JOSEError {
    static code = "ERR_JOSE_ALG_NOT_ALLOWED";
    code = "ERR_JOSE_ALG_NOT_ALLOWED";
}
class JOSENotSupported extends JOSEError {
    static code = "ERR_JOSE_NOT_SUPPORTED";
    code = "ERR_JOSE_NOT_SUPPORTED";
}
class JWEDecryptionFailed extends JOSEError {
    static code = "ERR_JWE_DECRYPTION_FAILED";
    code = "ERR_JWE_DECRYPTION_FAILED";
    constructor(message = "decryption operation failed", options){
        super(message, options);
    }
}
class JWEInvalid extends JOSEError {
    static code = "ERR_JWE_INVALID";
    code = "ERR_JWE_INVALID";
}
class JWSInvalid extends JOSEError {
    static code = "ERR_JWS_INVALID";
    code = "ERR_JWS_INVALID";
}
class JWTInvalid extends JOSEError {
    static code = "ERR_JWT_INVALID";
    code = "ERR_JWT_INVALID";
}
class JWKInvalid extends JOSEError {
    static code = "ERR_JWK_INVALID";
    code = "ERR_JWK_INVALID";
}
class JWKSInvalid extends JOSEError {
    static code = "ERR_JWKS_INVALID";
    code = "ERR_JWKS_INVALID";
}
class JWKSNoMatchingKey extends JOSEError {
    static code = "ERR_JWKS_NO_MATCHING_KEY";
    code = "ERR_JWKS_NO_MATCHING_KEY";
    constructor(message = "no applicable key found in the JSON Web Key Set", options){
        super(message, options);
    }
}
class JWKSMultipleMatchingKeys extends JOSEError {
    [Symbol.asyncIterator] = async function*() {};
    static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
    code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
    constructor(message = "multiple matching keys found in the JSON Web Key Set", options){
        super(message, options);
    }
}
class JWKSTimeout extends JOSEError {
    static code = "ERR_JWKS_TIMEOUT";
    code = "ERR_JWKS_TIMEOUT";
    constructor(message = "request timed out", options){
        super(message, options);
    }
}
class JWSSignatureVerificationFailed extends JOSEError {
    static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
    code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
    constructor(message = "signature verification failed", options){
        super(message, options);
    }
}
;
}),
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/create.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.runSchemaQuery = exports.runCreateQuery = exports.createDb = void 0;
const pg = __turbopack_context__.r("[externals]/pg [external] (pg, cjs, [project]/node_modules/.pnpm/pg@8.23.0/node_modules/pg)");
const with_connection_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/with-connection.js [app-route] (ecmascript)");
const DUPLICATE_DATABASE = "42P04";
/**
 * @deprecated Use `migrate` instead with `ensureDatabaseExists: true`.
 */ async function createDb(dbName, dbConfig, config = {}) {
    if (typeof dbName !== "string") {
        throw new Error("Must pass database name as a string");
    }
    const log = config.logger != null ? config.logger : ()=>{
    //
    };
    if (dbConfig == null) {
        throw new Error("No config object");
    }
    if ("client" in dbConfig) {
        return runCreateQuery(dbName, log)(dbConfig.client);
    }
    if (typeof dbConfig.user !== "string" || typeof dbConfig.password !== "string" || typeof dbConfig.host !== "string" || typeof dbConfig.port !== "number") {
        throw new Error("Database config problem");
    }
    const { user, password, host, port } = dbConfig;
    const client = new pg.Client({
        database: dbConfig.defaultDatabase != null ? dbConfig.defaultDatabase : "postgres",
        user,
        password,
        host,
        port
    });
    client.on("error", (err)=>{
        log(`pg client emitted an error: ${err.message}`);
    });
    const runWith = with_connection_1.withConnection(log, runCreateQuery(dbName, log));
    return runWith(client);
}
exports.createDb = createDb;
function runCreateQuery(dbName, log) {
    return async (client)=>{
        await client.query(`CREATE DATABASE "${dbName.replace(/\"/g, '""')}"`).catch((e)=>{
            switch(e.code){
                case DUPLICATE_DATABASE:
                    {
                        log(`'${dbName}' database already exists`);
                        return;
                    }
                default:
                    {
                        log(e);
                        throw new Error(`Error creating database. Caused by: '${e.name}: ${e.message}'`);
                    }
            }
        });
    };
}
exports.runCreateQuery = runCreateQuery;
function runSchemaQuery(schemaName, log) {
    return async (client)=>{
        await client.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`).catch((e)=>{
            log(`'${schemaName}' scheme already exists`);
        });
    };
}
exports.runSchemaQuery = runSchemaQuery;
}),
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/file-name-parser.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseFileName = void 0;
const parseId = (id)=>{
    const parsed = parseInt(id, 10);
    if (isNaN(parsed)) {
        throw new Error(`Migration file name should begin with an integer ID.'`);
    }
    return parsed;
};
const parseFileName = (fileName)=>{
    const result = /^(-?\d+)[-_]?(.*).(sql|js)$/gi.exec(fileName);
    if (!result) {
        throw new Error(`Invalid file name: '${fileName}'.`);
    }
    const [, id, name, type] = result;
    const lowerType = type.toLowerCase();
    if (lowerType !== "js" && lowerType !== "sql") {
        throw new Error("Not a JS or SQL file");
    }
    return {
        id: parseId(id),
        name: name == null || name === "" ? fileName : name,
        type: lowerType
    };
};
exports.parseFileName = parseFileName;
}),
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/files-loader.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadMigrationFiles = void 0;
const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const util_1 = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
const migration_file_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/migration-file.js [app-route] (ecmascript)");
const validation_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/validation.js [app-route] (ecmascript)");
const readDir = util_1.promisify(fs.readdir);
const isValidFile = (fileName)=>/\.(sql|js)$/gi.test(fileName);
/**
 * Load the migration files and assert they are reasonably valid.
 *
 * 'Reasonably valid' in this case means obeying the file name and
 * consecutive ordering rules.
 *
 * No assertions are made about the validity of the SQL.
 */ const loadMigrationFiles = async (directory, // tslint:disable-next-line no-empty
log = ()=>{})=>{
    log(`Loading migrations from: ${directory}`);
    const fileNames = await readDir(directory);
    log(`Found migration files: ${fileNames}`);
    if (fileNames == null) {
        return [];
    }
    const migrationFiles = [
        ...fileNames.map((fileName)=>path.resolve(directory, fileName))
    ].filter(isValidFile);
    const unorderedMigrations = await Promise.all(migrationFiles.map(migration_file_1.loadMigrationFile));
    // Arrange in ID order
    const orderedMigrations = unorderedMigrations.sort((a, b)=>a.id - b.id);
    validation_1.validateMigrationOrdering(orderedMigrations);
    return orderedMigrations;
};
exports.loadMigrationFiles = loadMigrationFiles;
}),
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MigrationError = exports.loadMigrationFiles = exports.migrate = exports.createDb = void 0;
var create_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/create.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createDb", {
    enumerable: true,
    get: function() {
        return create_1.createDb;
    }
});
var migrate_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/migrate.js [app-route] (ecmascript)");
Object.defineProperty(exports, "migrate", {
    enumerable: true,
    get: function() {
        return migrate_1.migrate;
    }
});
var files_loader_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/files-loader.js [app-route] (ecmascript)");
Object.defineProperty(exports, "loadMigrationFiles", {
    enumerable: true,
    get: function() {
        return files_loader_1.loadMigrationFiles;
    }
});
var types_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/types.js [app-route] (ecmascript)");
Object.defineProperty(exports, "MigrationError", {
    enumerable: true,
    get: function() {
        return types_1.MigrationError;
    }
});
}),
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/load-sql-from-js.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadSqlFromJs = void 0;
const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const loadSqlFromJs = (filePath)=>{
    const migrationModule = (()=>{
        const e = new Error("Cannot find module as expression is too dynamic");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    })();
    if (!migrationModule.generateSql) {
        throw new Error(`Invalid javascript migration file: '${path.basename(filePath)}'.
It must to export a 'generateSql' function.`);
    }
    const generatedValue = migrationModule.generateSql();
    if (typeof generatedValue !== "string") {
        throw new Error(`Invalid javascript migration file: '${path.basename(filePath)}'.
'generateSql' function must return a string literal.`);
    }
    return generatedValue;
};
exports.loadSqlFromJs = loadSqlFromJs;
}),
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/migrate.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.migrate = void 0;
const pg = __turbopack_context__.r("[externals]/pg [external] (pg, cjs, [project]/node_modules/.pnpm/pg@8.23.0/node_modules/pg)");
const sql_template_strings_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/sql-template-strings@2.2.2/node_modules/sql-template-strings/index.js [app-route] (ecmascript)");
const create_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/create.js [app-route] (ecmascript)");
const files_loader_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/files-loader.js [app-route] (ecmascript)");
const run_migration_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/run-migration.js [app-route] (ecmascript)");
const validation_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/validation.js [app-route] (ecmascript)");
const with_connection_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/with-connection.js [app-route] (ecmascript)");
const with_lock_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/with-lock.js [app-route] (ecmascript)");
/**
 * Run the migrations.
 *
 * If `dbConfig.ensureDatabaseExists` is true then `dbConfig.database` will be created if it
 * does not exist.
 *
 * @param dbConfig Details about how to connect to the database
 * @param migrationsDirectory Directory containing the SQL migration files
 * @param config Extra configuration
 * @returns Details about the migrations which were run
 */ async function migrate(dbConfig, migrationsDirectory, config = {}) {
    const log = config.logger != null ? config.logger : ()=>{
    //
    };
    const options = {
        tableName: "tableName" in config && config.tableName !== undefined ? config.tableName : 'migrations',
        schemaName: "schemaName" in config && config.schemaName !== undefined ? config.schemaName : 'public'
    };
    if (dbConfig == null) {
        throw new Error("No config object");
    }
    if (typeof migrationsDirectory !== "string") {
        throw new Error("Must pass migrations directory as a string");
    }
    const intendedMigrations = await files_loader_1.loadMigrationFiles(migrationsDirectory, log);
    if ("client" in dbConfig) {
        // we have been given a client to use, it should already be connected
        return with_lock_1.withAdvisoryLock(log, runMigrations(intendedMigrations, log, options))(dbConfig.client);
    }
    if (typeof dbConfig.database !== "string" || typeof dbConfig.user !== "string" || typeof dbConfig.password !== "string" || typeof dbConfig.host !== "string" || typeof dbConfig.port !== "number") {
        throw new Error("Database config problem");
    }
    if (dbConfig.ensureDatabaseExists === true) {
        // Check whether database exists
        const { user, password, host, port } = dbConfig;
        const client = new pg.Client({
            database: dbConfig.defaultDatabase != null ? dbConfig.defaultDatabase : "postgres",
            user,
            password,
            host,
            port
        });
        const runWith = with_connection_1.withConnection(log, async (connectedClient)=>{
            const result = await connectedClient.query({
                text: "SELECT 1 FROM pg_database WHERE datname=$1",
                values: [
                    dbConfig.database
                ]
            });
            if (result.rowCount !== 1) {
                await create_1.runCreateQuery(dbConfig.database, log)(connectedClient);
            }
        });
        await runWith(client);
        // ---
        const runWith1 = with_connection_1.withConnection(log, async (connectedClient)=>{
            await create_1.runSchemaQuery(options.schemaName, log)(connectedClient);
        });
        await runWith1(client);
    }
    {
        const client = new pg.Client(dbConfig);
        client.on("error", (err)=>{
            log(`pg client emitted an error: ${err.message}`);
        });
        const runWith = with_connection_1.withConnection(log, with_lock_1.withAdvisoryLock(log, runMigrations(intendedMigrations, log, options)));
        return runWith(client);
    }
}
exports.migrate = migrate;
function runMigrations(intendedMigrations, log, options) {
    return async (client)=>{
        try {
            log(`Starting migrations against schema ${options.schemaName}`);
            const appliedMigrations = await fetchAppliedMigrationFromDB(options.tableName, options.schemaName, client, log);
            validation_1.validateMigrationHashes(intendedMigrations, appliedMigrations);
            const migrationsToRun = filterMigrations(intendedMigrations, appliedMigrations);
            const completedMigrations = [];
            for (const migration of migrationsToRun){
                log(`Starting migration: ${migration.id} ${migration.name}`);
                const result = await run_migration_1.runMigration(options.tableName, options.schemaName, client, log)(migration);
                log(`Finished migration: ${migration.id} ${migration.name}`);
                completedMigrations.push(result);
            }
            logResult(completedMigrations, log);
            log("Finished migrations");
            return completedMigrations;
        } catch (e) {
            const error = new Error(`Migration failed. Reason: ${e.message}`);
            error.cause = e.message;
            throw error;
        }
    };
}
/** Queries the database for migrations table and retrieve it rows if exists */ async function fetchAppliedMigrationFromDB(migrationTableName, migrationSchemaName, client, log) {
    let appliedMigrations = [];
    if (await doesTableExist(client, migrationTableName, migrationSchemaName)) {
        log(`Migrations table with name '${migrationSchemaName}.${migrationTableName}' exists, filtering not applied migrations.`);
        const { rows } = await client.query(`SELECT * FROM ${migrationSchemaName}.${migrationTableName} ORDER BY id`);
        appliedMigrations = rows;
    } else {
        await client.query(`
        CREATE TABLE IF NOT EXISTS ${migrationSchemaName}.${migrationTableName} (
          id integer PRIMARY KEY,
          name varchar(100) UNIQUE NOT NULL,
          hash varchar(40) NOT NULL, -- sha1 hex encoded hash of the file name and contents, to ensure it hasn't been altered since applying the migration
          executed_at timestamp DEFAULT current_timestamp
        );
    `);
        log(`Migrations table with name '${migrationSchemaName}.${migrationTableName}' has been created!`);
    }
    return appliedMigrations;
}
/** Work out which migrations to apply */ function filterMigrations(migrations, appliedMigrations) {
    const notAppliedMigration = (migration)=>!appliedMigrations[migration.id];
    return migrations.filter(notAppliedMigration);
}
/** Logs the result */ function logResult(completedMigrations, log) {
    if (completedMigrations.length === 0) {
        log("No migrations applied");
    } else {
        log(`Successfully applied migrations: ${completedMigrations.map(({ name })=>name)}`);
    }
}
/** Check whether table exists in postgres - http://stackoverflow.com/a/24089729 */ async function doesTableExist(client, tableName, schemaName) {
    const result = await client.query(sql_template_strings_1.default`SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = ${schemaName}
    AND table_name = ${tableName}
  );`);
    return result.rows.length > 0 && result.rows[0].exists;
}
}),
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/migration-file.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadMigrationFile = void 0;
const util_1 = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
const load_sql_from_js_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/load-sql-from-js.js [app-route] (ecmascript)");
const file_name_parser_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/file-name-parser.js [app-route] (ecmascript)");
const readFile = util_1.promisify(fs.readFile);
const getFileName = (filePath)=>path.basename(filePath);
const getFileContents = async (filePath)=>readFile(filePath, "utf8");
const hashString = (s)=>crypto.createHash("sha1").update(s, "utf8").digest("hex");
const getSqlStringLiteral = (filePath, contents, type)=>{
    switch(type){
        case "sql":
            return contents;
        case "js":
            return load_sql_from_js_1.loadSqlFromJs(filePath);
        default:
            {
                const exhaustiveCheck = type;
                return exhaustiveCheck;
            }
    }
};
const loadMigrationFile = async (filePath)=>{
    const fileName = getFileName(filePath);
    try {
        const { id, name, type } = file_name_parser_1.parseFileName(fileName);
        const contents = await getFileContents(filePath);
        const sql = getSqlStringLiteral(filePath, contents, type);
        const hash = hashString(fileName + sql);
        return {
            id,
            name,
            contents,
            fileName,
            hash,
            sql
        };
    } catch (err) {
        throw new Error(`${err.message} - Offending file: '${fileName}'.`);
    }
};
exports.loadMigrationFile = loadMigrationFile;
}),
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/run-migration.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.runMigration = void 0;
const sql_template_strings_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/sql-template-strings@2.2.2/node_modules/sql-template-strings/index.js [app-route] (ecmascript)");
const noop = ()=>{
//
};
const insertMigration = async (migrationTableName = 'migrations', migrationSchemaName = 'public', client, migration, log)=>{
    log(`Saving migration to '${migrationSchemaName}.${migrationTableName}': ${migration.id} | ${migration.name} | ${migration.hash}`);
    const sql = sql_template_strings_1.default`INSERT INTO `.append(`${migrationSchemaName}.${migrationTableName}`).append(sql_template_strings_1.default` ("id", "name", "hash") VALUES (${migration.id},${migration.name},${migration.hash})`);
    return client.query(sql);
};
const runMigration = (migrationTableName = 'migrations', migrationSchemaName = 'public', client, log = noop)=>async (migration)=>{
        const inTransaction = migration.sql.includes("-- postgres-migrations disable-transaction") === false;
        log(`Running migration in transaction: ${inTransaction}`);
        const begin = inTransaction ? ()=>client.query("START TRANSACTION") : noop;
        const end = inTransaction ? ()=>client.query("COMMIT") : noop;
        const cleanup = inTransaction ? ()=>client.query("ROLLBACK") : noop;
        try {
            await begin();
            await client.query(migration.sql);
            await insertMigration(migrationTableName, migrationSchemaName, client, migration, log);
            await end();
            return migration;
        } catch (err) {
            try {
                await cleanup();
            } catch (_a) {
            //
            }
            throw new Error(`An error occurred running '${migration.name}'. Rolled back this migration. No further migrations were run. Reason: ${err.message}`);
        }
    };
exports.runMigration = runMigration;
}),
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/types.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MigrationError = void 0;
class MigrationError extends Error {
}
exports.MigrationError = MigrationError;
}),
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/validation.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateMigrationHashes = exports.validateMigrationOrdering = void 0;
const indexNotMatch = (migration, index)=>migration.id !== index;
/** Assert migration IDs are consecutive integers */ function validateMigrationOrdering(migrations) {
    const notMatchingId = migrations.find(indexNotMatch);
    if (notMatchingId) {
        throw new Error(`Found a non-consecutive migration ID on file: '${notMatchingId.fileName}'`);
    }
}
exports.validateMigrationOrdering = validateMigrationOrdering;
/** Assert hashes match */ function validateMigrationHashes(migrations, appliedMigrations) {
    const invalidHash = (migration)=>{
        const appliedMigration = appliedMigrations[migration.id];
        return appliedMigration != null && appliedMigration.hash !== migration.hash;
    };
    // Assert migration hashes are still same
    const invalidHashes = migrations.filter(invalidHash);
    if (invalidHashes.length > 0) {
        // Someone has altered one or more migrations which has already run - gasp!
        const invalidFiles = invalidHashes.map(({ fileName })=>fileName);
        throw new Error(`Hashes don't match for migrations '${invalidFiles}'.
This means that the scripts have changed since it was applied.`);
    }
}
exports.validateMigrationHashes = validateMigrationHashes;
}),
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/with-connection.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.withConnection = void 0;
function withConnection(log, f) {
    return async (client)=>{
        try {
            try {
                log("Connecting to database...");
                await client.connect();
                log("... connected to database");
            } catch (e) {
                log(`Error connecting to database: ${e.message}`);
                throw e;
            }
            const result = await f(client);
            return result;
        } catch (e) {
            log(`Error using connection: ${e.message}`);
            throw e;
        } finally{
            // always try to close the connection
            try {
                log("Closing connection...");
                await client.end();
                log("... connection closed");
            } catch (e) {
                log(`Error closing the connection: ${e.message}`);
            }
        }
    };
}
exports.withConnection = withConnection;
}),
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/with-lock.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.withAdvisoryLock = void 0;
function withAdvisoryLock(log, f) {
    return async (client)=>{
        try {
            try {
                log("Acquiring advisory lock...");
                let acquired = false;
                while(!acquired){
                    const lockResult = await client.query("SELECT pg_try_advisory_lock(-8525285245963000605);");
                    if (lockResult.rows[0].pg_try_advisory_lock === true) {
                        acquired = true;
                    } else {
                        await new Promise((res)=>setTimeout(res, 1000));
                    }
                }
                log("... acquired advisory lock");
            } catch (e) {
                log(`Error acquiring advisory lock: ${e.message}`);
                throw e;
            }
            const result = await f(client);
            return result;
        } catch (e) {
            log(`Error while using lock: ${e.message}`);
            throw e;
        } finally{
            try {
                log("Releasing advisory lock...");
                await client.query("SELECT pg_advisory_unlock(-8525285245963000605);");
                log("... released advisory lock");
            } catch (e) {
                log(`Error releasing advisory lock: ${e.message}`);
            }
        }
    };
}
exports.withAdvisoryLock = withAdvisoryLock;
}),
"[project]/node_modules/.pnpm/sql-template-strings@2.2.2/node_modules/sql-template-strings/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

class SQLStatement {
    /**
   * @param {string[]} strings
   * @param {any[]} values
   */ constructor(strings, values){
        this.strings = strings;
        this.values = values;
    }
    /** Returns the SQL Statement for Sequelize */ get query() {
        return this.bind ? this.text : this.sql;
    }
    /** Returns the SQL Statement for node-postgres */ get text() {
        return this.strings.reduce((prev, curr, i)=>prev + '$' + i + curr);
    }
    /**
   * @param {SQLStatement|string} statement
   * @returns {this}
   */ append(statement) {
        if (statement instanceof SQLStatement) {
            this.strings[this.strings.length - 1] += statement.strings[0];
            this.strings.push.apply(this.strings, statement.strings.slice(1));
            (this.values || this.bind).push.apply(this.values, statement.values);
        } else {
            this.strings[this.strings.length - 1] += statement;
        }
        return this;
    }
    /**
   * Use a prepared statement with Sequelize.
   * Makes `query` return a query with `$n` syntax instead of `?`  and switches the `values` key name to `bind`
   * @param {boolean} [value=true] value If omitted, defaults to `true`
   * @returns this
   */ useBind(value) {
        if (value === undefined) {
            value = true;
        }
        if (value && !this.bind) {
            this.bind = this.values;
            delete this.values;
        } else if (!value && this.bind) {
            this.values = this.bind;
            delete this.bind;
        }
        return this;
    }
    /**
   * @param {string} name
   * @returns {this}
   */ setName(name) {
        this.name = name;
        return this;
    }
}
/** Returns the SQL Statement for mysql */ Object.defineProperty(SQLStatement.prototype, 'sql', {
    enumerable: true,
    get () {
        return this.strings.join('?');
    }
});
/**
 * @param {string[]} strings
 * @param {...any} values
 * @returns {SQLStatement}
 */ function SQL(strings) {
    return new SQLStatement(strings.slice(0), Array.from(arguments).slice(1));
}
module.exports = SQL;
module.exports.SQL = SQL;
module.exports.default = SQL;
module.exports.SQLStatement = SQLStatement;
}),
"[project]/node_modules/.pnpm/stripe-replit-sync@1.0.0_stripe@23.0.0_@types+node@25.9.6_/node_modules/stripe-replit-sync/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "PostgresClient",
    ()=>PostgresClient,
    "StripeSync",
    ()=>StripeSync,
    "hashApiKey",
    ()=>hashApiKey,
    "runMigrations",
    ()=>runMigrations
]);
// src/stripeSync.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/stripe@23.0.0_@types+node@25.9.6/node_modules/stripe/esm/stripe.esm.node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yesql$40$7$2e$0$2e$0$2f$node_modules$2f$yesql$2f$yesql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/yesql@7.0.0/node_modules/yesql/yesql.js [app-route] (ecmascript)");
// src/database/postgres.ts
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pg$40$8$2e$23$2e$0$2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/.pnpm/pg@8.23.0/node_modules/pg)");
// src/utils/hashApiKey.ts
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pg$2d$node$2d$migrations$40$0$2e$0$2e$8$2f$node_modules$2f$pg$2d$node$2d$migrations$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$url__$5b$external$5d$__$28$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/url [external] (url, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pg$40$8$2e$23$2e$0$2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pg$40$8$2e$23$2e$0$2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
var __TURBOPACK__import$2e$meta__ = {
    get url () {
        return __turbopack_context__.F("node_modules/.pnpm/stripe-replit-sync@1.0.0_stripe@23.0.0_@types+node@25.9.6_/node_modules/stripe-replit-sync/dist/index.js");
    },
    env: {
        DEV: true,
        PROD: false,
        MODE: "development",
        BASE_URL: "/",
        SSR: true
    },
    get turbopackHot () {
        return __turbopack_context__.m.hot;
    }
};
;
;
;
;
var ORDERED_STRIPE_TABLES = [
    "subscription_items",
    "subscriptions",
    "subscription_schedules",
    "checkout_session_line_items",
    "checkout_sessions",
    "tax_ids",
    "charges",
    "refunds",
    "credit_notes",
    "disputes",
    "early_fraud_warnings",
    "invoices",
    "payment_intents",
    "payment_methods",
    "setup_intents",
    "prices",
    "plans",
    "products",
    "features",
    "active_entitlements",
    "reviews",
    "_managed_webhooks",
    "customers",
    "_sync_status"
];
var PostgresClient = class {
    constructor(config){
        this.config = config;
        this.pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pg$40$8$2e$23$2e$0$2f$node_modules$2f$pg$29$__["default"].Pool(config.poolConfig);
    }
    pool;
    async delete(table, id) {
        const prepared = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yesql$40$7$2e$0$2e$0$2f$node_modules$2f$yesql$2f$yesql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pg"])(`
    delete from "${this.config.schema}"."${table}"
    where id = :id
    returning id;
    `)({
            id
        });
        const { rows } = await this.query(prepared.text, prepared.values);
        return rows.length > 0;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async query(text, params) {
        return this.pool.query(text, params);
    }
    async upsertMany(entries, table) {
        if (!entries.length) return [];
        const chunkSize = 5;
        const results = [];
        for(let i = 0; i < entries.length; i += chunkSize){
            const chunk = entries.slice(i, i + chunkSize);
            const queries = [];
            chunk.forEach((entry)=>{
                const rawData = JSON.stringify(entry);
                const upsertSql = `
          INSERT INTO "${this.config.schema}"."${table}" ("_raw_data")
          VALUES ($1::jsonb)
          ON CONFLICT (id)
          DO UPDATE SET
            "_raw_data" = EXCLUDED."_raw_data"
          RETURNING *
        `;
                queries.push(this.pool.query(upsertSql, [
                    rawData
                ]));
            });
            results.push(...await Promise.all(queries));
        }
        return results.flatMap((it)=>it.rows);
    }
    async upsertManyWithTimestampProtection(entries, table, accountId, syncTimestamp) {
        const timestamp = syncTimestamp || /* @__PURE__ */ new Date().toISOString();
        if (!entries.length) return [];
        const chunkSize = 5;
        const results = [];
        for(let i = 0; i < entries.length; i += chunkSize){
            const chunk = entries.slice(i, i + chunkSize);
            const queries = [];
            chunk.forEach((entry)=>{
                if (table.startsWith("_")) {
                    const columns = Object.keys(entry).filter((k)=>k !== "last_synced_at" && k !== "account_id");
                    const upsertSql = `
            INSERT INTO "${this.config.schema}"."${table}" (
              ${columns.map((c)=>`"${c}"`).join(", ")}, "last_synced_at", "account_id"
            )
            VALUES (
              ${columns.map((c)=>`:${c}`).join(", ")}, :last_synced_at, :account_id
            )
            ON CONFLICT ("id")
            DO UPDATE SET
              ${columns.map((c)=>`"${c}" = EXCLUDED."${c}"`).join(", ")},
              "last_synced_at" = :last_synced_at,
              "account_id" = EXCLUDED."account_id"
            WHERE "${table}"."last_synced_at" IS NULL
               OR "${table}"."last_synced_at" < :last_synced_at
            RETURNING *
          `;
                    const cleansed = this.cleanseArrayField(entry);
                    cleansed.last_synced_at = timestamp;
                    cleansed.account_id = accountId;
                    const prepared = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yesql$40$7$2e$0$2e$0$2f$node_modules$2f$yesql$2f$yesql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pg"])(upsertSql, {
                        useNullForMissing: true
                    })(cleansed);
                    queries.push(this.pool.query(prepared.text, prepared.values));
                } else {
                    const rawData = JSON.stringify(entry);
                    const upsertSql = `
            INSERT INTO "${this.config.schema}"."${table}" ("_raw_data", "_last_synced_at", "_account_id")
            VALUES ($1::jsonb, $2, $3)
            ON CONFLICT (id)
            DO UPDATE SET
              "_raw_data" = EXCLUDED."_raw_data",
              "_last_synced_at" = $2,
              "_account_id" = EXCLUDED."_account_id"
            WHERE "${table}"."_last_synced_at" IS NULL
               OR "${table}"."_last_synced_at" < $2
            RETURNING *
          `;
                    queries.push(this.pool.query(upsertSql, [
                        rawData,
                        timestamp,
                        accountId
                    ]));
                }
            });
            results.push(...await Promise.all(queries));
        }
        return results.flatMap((it)=>it.rows);
    }
    cleanseArrayField(obj) {
        const cleansed = {
            ...obj
        };
        Object.keys(cleansed).map((k)=>{
            const data = cleansed[k];
            if (Array.isArray(data)) {
                cleansed[k] = JSON.stringify(data);
            }
        });
        return cleansed;
    }
    async findMissingEntries(table, ids) {
        if (!ids.length) return [];
        const prepared = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yesql$40$7$2e$0$2e$0$2f$node_modules$2f$yesql$2f$yesql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pg"])(`
    select id from "${this.config.schema}"."${table}"
    where id=any(:ids::text[]);
    `)({
            ids
        });
        const { rows } = await this.query(prepared.text, prepared.values);
        const existingIds = rows.map((it)=>it.id);
        const missingIds = ids.filter((it)=>!existingIds.includes(it));
        return missingIds;
    }
    // Sync status tracking methods for incremental backfill
    async getSyncCursor(resource, accountId) {
        const result = await this.query(`SELECT EXTRACT(EPOCH FROM last_incremental_cursor)::integer as cursor
       FROM "${this.config.schema}"."_sync_status"
       WHERE resource = $1 AND "account_id" = $2`, [
            resource,
            accountId
        ]);
        const cursor = result.rows[0]?.cursor ?? null;
        return cursor;
    }
    async updateSyncCursor(resource, accountId, cursor) {
        await this.query(`INSERT INTO "${this.config.schema}"."_sync_status" (resource, "account_id", last_incremental_cursor, status, last_synced_at)
       VALUES ($1, $2, to_timestamp($3), 'running', now())
       ON CONFLICT (resource, "account_id")
       DO UPDATE SET
         last_incremental_cursor = GREATEST(
           COALESCE("${this.config.schema}"."_sync_status".last_incremental_cursor, to_timestamp(0)),
           to_timestamp($3)
         ),
         last_synced_at = now(),
         updated_at = now()`, [
            resource,
            accountId,
            cursor.toString()
        ]);
    }
    async markSyncRunning(resource, accountId) {
        await this.query(`INSERT INTO "${this.config.schema}"."_sync_status" (resource, "account_id", status)
       VALUES ($1, $2, 'running')
       ON CONFLICT (resource, "account_id")
       DO UPDATE SET status = 'running', updated_at = now()`, [
            resource,
            accountId
        ]);
    }
    async markSyncComplete(resource, accountId) {
        await this.query(`UPDATE "${this.config.schema}"."_sync_status"
       SET status = 'complete', error_message = NULL, updated_at = now()
       WHERE resource = $1 AND "account_id" = $2`, [
            resource,
            accountId
        ]);
    }
    async markSyncError(resource, accountId, errorMessage) {
        await this.query(`UPDATE "${this.config.schema}"."_sync_status"
       SET status = 'error', error_message = $3, updated_at = now()
       WHERE resource = $1 AND "account_id" = $2`, [
            resource,
            accountId,
            errorMessage
        ]);
    }
    // Account management methods
    async upsertAccount(accountData, apiKeyHash) {
        const rawData = JSON.stringify(accountData.raw_data);
        await this.query(`INSERT INTO "${this.config.schema}"."accounts" ("_raw_data", "api_key_hashes", "first_synced_at", "_last_synced_at")
       VALUES ($1::jsonb, ARRAY[$2], now(), now())
       ON CONFLICT (id)
       DO UPDATE SET
         "_raw_data" = EXCLUDED."_raw_data",
         "api_key_hashes" = (
           SELECT ARRAY(
             SELECT DISTINCT unnest(
               COALESCE("${this.config.schema}"."accounts"."api_key_hashes", '{}') || ARRAY[$2]
             )
           )
         ),
         "_last_synced_at" = now(),
         "_updated_at" = now()`, [
            rawData,
            apiKeyHash
        ]);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getAllAccounts() {
        const result = await this.query(`SELECT _raw_data FROM "${this.config.schema}"."accounts"
       ORDER BY _last_synced_at DESC`);
        return result.rows.map((row)=>row._raw_data);
    }
    /**
   * Looks up an account ID by API key hash
   * Uses the GIN index on api_key_hashes for fast lookups
   * @param apiKeyHash - SHA-256 hash of the Stripe API key
   * @returns Account ID if found, null otherwise
   */ async getAccountIdByApiKeyHash(apiKeyHash) {
        const result = await this.query(`SELECT id FROM "${this.config.schema}"."accounts"
       WHERE $1 = ANY(api_key_hashes)
       LIMIT 1`, [
            apiKeyHash
        ]);
        return result.rows.length > 0 ? result.rows[0].id : null;
    }
    async getAccountRecordCounts(accountId) {
        const counts = {};
        for (const table of ORDERED_STRIPE_TABLES){
            const accountIdColumn = table.startsWith("_") ? "account_id" : "_account_id";
            const result = await this.query(`SELECT COUNT(*) as count FROM "${this.config.schema}"."${table}"
         WHERE "${accountIdColumn}" = $1`, [
                accountId
            ]);
            counts[table] = parseInt(result.rows[0].count);
        }
        return counts;
    }
    async deleteAccountWithCascade(accountId, useTransaction) {
        const deletionCounts = {};
        try {
            if (useTransaction) {
                await this.query("BEGIN");
            }
            for (const table of ORDERED_STRIPE_TABLES){
                const accountIdColumn = table.startsWith("_") ? "account_id" : "_account_id";
                const result = await this.query(`DELETE FROM "${this.config.schema}"."${table}"
           WHERE "${accountIdColumn}" = $1`, [
                    accountId
                ]);
                deletionCounts[table] = result.rowCount || 0;
            }
            const accountResult = await this.query(`DELETE FROM "${this.config.schema}"."accounts"
         WHERE "id" = $1`, [
                accountId
            ]);
            deletionCounts["accounts"] = accountResult.rowCount || 0;
            if (useTransaction) {
                await this.query("COMMIT");
            }
        } catch (error) {
            if (useTransaction) {
                await this.query("ROLLBACK");
            }
            throw error;
        }
        return deletionCounts;
    }
    /**
   * Hash a string to a 32-bit integer for use with PostgreSQL advisory locks.
   * Uses a simple hash algorithm that produces consistent results.
   */ hashToInt32(key) {
        let hash = 0;
        for(let i = 0; i < key.length; i++){
            const char = key.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash;
        }
        return hash;
    }
    /**
   * Acquire a PostgreSQL advisory lock for the given key.
   * This lock is automatically released when the connection is closed or explicitly released.
   * Advisory locks are session-level and will block until the lock is available.
   *
   * @param key - A string key to lock on (will be hashed to an integer)
   */ async acquireAdvisoryLock(key) {
        const lockId = this.hashToInt32(key);
        await this.query("SELECT pg_advisory_lock($1)", [
            lockId
        ]);
    }
    /**
   * Release a PostgreSQL advisory lock for the given key.
   *
   * @param key - The same string key used to acquire the lock
   */ async releaseAdvisoryLock(key) {
        const lockId = this.hashToInt32(key);
        await this.query("SELECT pg_advisory_unlock($1)", [
            lockId
        ]);
    }
    /**
   * Execute a function while holding an advisory lock.
   * The lock is automatically released after the function completes (success or error).
   *
   * IMPORTANT: This acquires a dedicated connection from the pool and holds it for the
   * duration of the function execution. PostgreSQL advisory locks are session-level,
   * so we must use the same connection for lock acquisition, operations, and release.
   *
   * @param key - A string key to lock on (will be hashed to an integer)
   * @param fn - The function to execute while holding the lock
   * @returns The result of the function
   */ async withAdvisoryLock(key, fn) {
        const lockId = this.hashToInt32(key);
        const client = await this.pool.connect();
        try {
            await client.query("SELECT pg_advisory_lock($1)", [
                lockId
            ]);
            return await fn();
        } finally{
            try {
                await client.query("SELECT pg_advisory_unlock($1)", [
                    lockId
                ]);
            } finally{
                client.release();
            }
        }
    }
};
// src/schemas/managed_webhook.ts
var managedWebhookSchema = {
    properties: [
        "id",
        "object",
        "url",
        "enabled_events",
        "description",
        "enabled",
        "livemode",
        "metadata",
        "secret",
        "status",
        "api_version",
        "created",
        "account_id"
    ]
};
;
var DEFAULT_RETRY_CONFIG = {
    maxRetries: 5,
    initialDelayMs: 1e3,
    // 1 second
    maxDelayMs: 6e4,
    // 60 seconds
    jitterMs: 500
};
function isRetryableError(error) {
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].errors.StripeRateLimitError) {
        return true;
    }
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].errors.StripeAPIError) {
        const statusCode = error.statusCode;
        if (statusCode && [
            500,
            502,
            503,
            504,
            424
        ].includes(statusCode)) {
            return true;
        }
    }
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].errors.StripeConnectionError) {
        return true;
    }
    return false;
}
function getRetryAfterMs(error) {
    if (!(error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].errors.StripeRateLimitError)) {
        return null;
    }
    const retryAfterHeader = error.headers?.["retry-after"];
    if (!retryAfterHeader) {
        return null;
    }
    const retryAfterSeconds = Number(retryAfterHeader);
    if (isNaN(retryAfterSeconds) || retryAfterSeconds <= 0) {
        return null;
    }
    return retryAfterSeconds * 1e3;
}
function calculateDelay(attempt, config, retryAfterMs) {
    if (retryAfterMs !== null && retryAfterMs !== void 0) {
        const jitter2 = Math.random() * config.jitterMs;
        return retryAfterMs + jitter2;
    }
    const exponentialDelay = Math.min(config.initialDelayMs * Math.pow(2, attempt), config.maxDelayMs);
    const jitter = Math.random() * config.jitterMs;
    return exponentialDelay + jitter;
}
function sleep(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
function getErrorType(error) {
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].errors.StripeRateLimitError) {
        return "rate_limit";
    }
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].errors.StripeAPIError) {
        return `api_error_${error.statusCode}`;
    }
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].errors.StripeConnectionError) {
        return "connection_error";
    }
    return "unknown";
}
async function withRetry(fn, config = {}, logger) {
    const retryConfig = {
        ...DEFAULT_RETRY_CONFIG,
        ...config
    };
    let lastError;
    for(let attempt = 0; attempt <= retryConfig.maxRetries; attempt++){
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (!isRetryableError(error)) {
                throw error;
            }
            if (attempt >= retryConfig.maxRetries) {
                logger?.error({
                    error: error instanceof Error ? error.message : String(error),
                    errorType: getErrorType(error),
                    attempt: attempt + 1,
                    maxRetries: retryConfig.maxRetries
                }, "Max retries exhausted for Stripe error");
                throw error;
            }
            const retryAfterMs = getRetryAfterMs(error);
            const delay = calculateDelay(attempt, retryConfig, retryAfterMs);
            logger?.warn({
                error: error instanceof Error ? error.message : String(error),
                errorType: getErrorType(error),
                attempt: attempt + 1,
                maxRetries: retryConfig.maxRetries,
                delayMs: Math.round(delay),
                retryAfterMs: retryAfterMs ?? void 0,
                nextAttempt: attempt + 2
            }, "Transient Stripe error, retrying after delay");
            await sleep(delay);
        }
    }
    throw lastError;
}
// src/utils/stripeClientWrapper.ts
function createRetryableStripeClient(stripe, retryConfig = {}, logger) {
    const isTest = ("TURBOPACK compile-time value", "development") === "test" || process.env.VITEST === "true" || process.env.JEST_WORKER_ID !== void 0;
    if (isTest) {
        return stripe;
    }
    return new Proxy(stripe, {
        get (target, prop, receiver) {
            const original = Reflect.get(target, prop, receiver);
            if (original && typeof original === "object" && !isPromise(original)) {
                return wrapResource(original, retryConfig, logger);
            }
            return original;
        }
    });
}
function wrapResource(resource, retryConfig, logger) {
    return new Proxy(resource, {
        get (target, prop, receiver) {
            const original = Reflect.get(target, prop, receiver);
            if (typeof original === "function") {
                return function(...args) {
                    const result = original.apply(target, args);
                    if (result && typeof result === "object" && Symbol.asyncIterator in result) {
                        return result;
                    }
                    if (isPromise(result)) {
                        return withRetry(()=>Promise.resolve(result), retryConfig, logger);
                    }
                    return result;
                };
            }
            if (original && typeof original === "object" && !isPromise(original)) {
                return wrapResource(original, retryConfig, logger);
            }
            return original;
        }
    });
}
function isPromise(value) {
    return value !== null && typeof value === "object" && typeof value.then === "function";
}
;
function hashApiKey(apiKey) {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])("sha256").update(apiKey).digest("hex");
}
// src/stripeSync.ts
function getUniqueIds(entries, key) {
    const set = new Set(entries.map((subscription)=>subscription?.[key]?.toString()).filter((it)=>Boolean(it)));
    return Array.from(set);
}
var StripeSync = class {
    constructor(config){
        this.config = config;
        const baseStripe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](config.stripeSecretKey, {
            // https://github.com/stripe/stripe-node#configuration
            // @ts-ignore
            apiVersion: config.stripeApiVersion,
            appInfo: {
                name: "Stripe Postgres Sync"
            }
        });
        this.stripe = createRetryableStripeClient(baseStripe, {}, config.logger);
        this.config.logger = config.logger ?? console;
        this.config.logger?.info({
            autoExpandLists: config.autoExpandLists,
            stripeApiVersion: config.stripeApiVersion
        }, "StripeSync initialized");
        const poolConfig = config.poolConfig ?? {};
        if (config.databaseUrl) {
            poolConfig.connectionString = config.databaseUrl;
        }
        if (config.maxPostgresConnections) {
            poolConfig.max = config.maxPostgresConnections;
        }
        if (poolConfig.max === void 0) {
            poolConfig.max = 10;
        }
        if (poolConfig.keepAlive === void 0) {
            poolConfig.keepAlive = true;
        }
        this.postgresClient = new PostgresClient({
            schema: "stripe",
            poolConfig
        });
    }
    stripe;
    postgresClient;
    cachedAccount = null;
    /**
   * Get the Stripe account ID. Uses database lookup by API key hash for fast lookups,
   * with fallback to Stripe API if not found (first-time setup or new API key).
   */ async getAccountId(objectAccountId) {
        if (this.cachedAccount?.id) {
            return this.cachedAccount.id;
        }
        const apiKeyHash = hashApiKey(this.config.stripeSecretKey);
        try {
            const accountId = await this.postgresClient.getAccountIdByApiKeyHash(apiKeyHash);
            if (accountId) {
                return accountId;
            }
        } catch (error) {
            this.config.logger?.warn(error, "Failed to lookup account by API key hash, falling back to API");
        }
        let account;
        try {
            const accountIdParam = objectAccountId || this.config.stripeAccountId;
            account = accountIdParam ? await this.stripe.accounts.retrieve(accountIdParam) : await this.stripe.accounts.retrieve();
        } catch (error) {
            this.config.logger?.error(error, "Failed to retrieve account from Stripe API");
            throw new Error("Failed to retrieve Stripe account. Please ensure API key is valid.");
        }
        this.cachedAccount = account;
        await this.upsertAccount(account, apiKeyHash);
        return account.id;
    }
    /**
   * Upsert Stripe account information to the database
   * @param account - Stripe account object
   * @param apiKeyHash - SHA-256 hash of API key to store for fast lookups
   */ async upsertAccount(account, apiKeyHash) {
        try {
            await this.postgresClient.upsertAccount({
                id: account.id,
                raw_data: account
            }, apiKeyHash);
        } catch (error) {
            this.config.logger?.error(error, "Failed to upsert account to database");
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            throw new Error(`Failed to upsert account to database: ${errorMessage}`);
        }
    }
    /**
   * Get the current account being synced
   */ async getCurrentAccount() {
        if (this.cachedAccount) {
            return this.cachedAccount;
        }
        await this.getAccountId();
        return this.cachedAccount;
    }
    /**
   * Get all accounts that have been synced to the database
   */ async getAllSyncedAccounts() {
        try {
            const accountsData = await this.postgresClient.getAllAccounts();
            return accountsData;
        } catch (error) {
            this.config.logger?.error(error, "Failed to retrieve accounts from database");
            throw new Error("Failed to retrieve synced accounts from database");
        }
    }
    /**
   * DANGEROUS: Delete an account and all associated data from the database
   * This operation cannot be undone!
   *
   * @param accountId - The Stripe account ID to delete
   * @param options - Options for deletion behavior
   * @param options.dryRun - If true, only count records without deleting (default: false)
   * @param options.useTransaction - If true, use transaction for atomic deletion (default: true)
   * @returns Deletion summary with counts and warnings
   */ async dangerouslyDeleteSyncedAccountData(accountId, options) {
        const dryRun = options?.dryRun ?? false;
        const useTransaction = options?.useTransaction ?? true;
        this.config.logger?.info(`${dryRun ? "Preview" : "Deleting"} account ${accountId} (transaction: ${useTransaction})`);
        try {
            const counts = await this.postgresClient.getAccountRecordCounts(accountId);
            const warnings = [];
            let totalRecords = 0;
            for (const [table, count] of Object.entries(counts)){
                if (count > 0) {
                    totalRecords += count;
                    warnings.push(`Will delete ${count} ${table} record${count !== 1 ? "s" : ""}`);
                }
            }
            if (totalRecords > 1e5) {
                warnings.push(`Large dataset detected (${totalRecords} total records). Consider using useTransaction: false for better performance.`);
            }
            if (this.cachedAccount?.id === accountId) {
                warnings.push("Warning: Deleting the current account. Cache will be cleared after deletion.");
            }
            if (dryRun) {
                this.config.logger?.info(`Dry-run complete: ${totalRecords} total records would be deleted`);
                return {
                    deletedAccountId: accountId,
                    deletedRecordCounts: counts,
                    warnings
                };
            }
            const deletionCounts = await this.postgresClient.deleteAccountWithCascade(accountId, useTransaction);
            if (this.cachedAccount?.id === accountId) {
                this.cachedAccount = null;
            }
            this.config.logger?.info(`Successfully deleted account ${accountId} with ${totalRecords} total records`);
            return {
                deletedAccountId: accountId,
                deletedRecordCounts: deletionCounts,
                warnings
            };
        } catch (error) {
            this.config.logger?.error(error, `Failed to delete account ${accountId}`);
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            throw new Error(`Failed to delete account ${accountId}: ${errorMessage}`);
        }
    }
    async processWebhook(payload, signature) {
        let webhookSecret = this.config.stripeWebhookSecret;
        if (!webhookSecret) {
            const accountId = await this.getAccountId();
            const result = await this.postgresClient.query(`SELECT secret FROM "stripe"."_managed_webhooks" WHERE account_id = $1 LIMIT 1`, [
                accountId
            ]);
            if (result.rows.length > 0) {
                webhookSecret = result.rows[0].secret;
            }
        }
        if (!webhookSecret) {
            throw new Error("No webhook secret provided. Either create a managed webhook or configure stripeWebhookSecret.");
        }
        const event = await this.stripe.webhooks.constructEventAsync(payload, signature, webhookSecret);
        return this.processEvent(event);
    }
    // Event handler registry - maps event types to handler functions
    // Note: Uses 'any' for event parameter to allow handlers with specific Stripe event types
    // (e.g., CustomerDeletedEvent, ProductDeletedEvent) which TypeScript won't accept
    // as contravariant parameters when using the base Stripe.Event type
    eventHandlers = {
        "charge.captured": this.handleChargeEvent.bind(this),
        "charge.expired": this.handleChargeEvent.bind(this),
        "charge.failed": this.handleChargeEvent.bind(this),
        "charge.pending": this.handleChargeEvent.bind(this),
        "charge.refunded": this.handleChargeEvent.bind(this),
        "charge.succeeded": this.handleChargeEvent.bind(this),
        "charge.updated": this.handleChargeEvent.bind(this),
        "customer.deleted": this.handleCustomerDeletedEvent.bind(this),
        "customer.created": this.handleCustomerEvent.bind(this),
        "customer.updated": this.handleCustomerEvent.bind(this),
        "checkout.session.async_payment_failed": this.handleCheckoutSessionEvent.bind(this),
        "checkout.session.async_payment_succeeded": this.handleCheckoutSessionEvent.bind(this),
        "checkout.session.completed": this.handleCheckoutSessionEvent.bind(this),
        "checkout.session.expired": this.handleCheckoutSessionEvent.bind(this),
        "customer.subscription.created": this.handleSubscriptionEvent.bind(this),
        "customer.subscription.deleted": this.handleSubscriptionEvent.bind(this),
        "customer.subscription.paused": this.handleSubscriptionEvent.bind(this),
        "customer.subscription.pending_update_applied": this.handleSubscriptionEvent.bind(this),
        "customer.subscription.pending_update_expired": this.handleSubscriptionEvent.bind(this),
        "customer.subscription.trial_will_end": this.handleSubscriptionEvent.bind(this),
        "customer.subscription.resumed": this.handleSubscriptionEvent.bind(this),
        "customer.subscription.updated": this.handleSubscriptionEvent.bind(this),
        "customer.tax_id.updated": this.handleTaxIdEvent.bind(this),
        "customer.tax_id.created": this.handleTaxIdEvent.bind(this),
        "customer.tax_id.deleted": this.handleTaxIdDeletedEvent.bind(this),
        "invoice.created": this.handleInvoiceEvent.bind(this),
        "invoice.deleted": this.handleInvoiceEvent.bind(this),
        "invoice.finalized": this.handleInvoiceEvent.bind(this),
        "invoice.finalization_failed": this.handleInvoiceEvent.bind(this),
        "invoice.paid": this.handleInvoiceEvent.bind(this),
        "invoice.payment_action_required": this.handleInvoiceEvent.bind(this),
        "invoice.payment_failed": this.handleInvoiceEvent.bind(this),
        "invoice.payment_succeeded": this.handleInvoiceEvent.bind(this),
        "invoice.upcoming": this.handleInvoiceEvent.bind(this),
        "invoice.sent": this.handleInvoiceEvent.bind(this),
        "invoice.voided": this.handleInvoiceEvent.bind(this),
        "invoice.marked_uncollectible": this.handleInvoiceEvent.bind(this),
        "invoice.updated": this.handleInvoiceEvent.bind(this),
        "product.created": this.handleProductEvent.bind(this),
        "product.updated": this.handleProductEvent.bind(this),
        "product.deleted": this.handleProductDeletedEvent.bind(this),
        "price.created": this.handlePriceEvent.bind(this),
        "price.updated": this.handlePriceEvent.bind(this),
        "price.deleted": this.handlePriceDeletedEvent.bind(this),
        "plan.created": this.handlePlanEvent.bind(this),
        "plan.updated": this.handlePlanEvent.bind(this),
        "plan.deleted": this.handlePlanDeletedEvent.bind(this),
        "setup_intent.canceled": this.handleSetupIntentEvent.bind(this),
        "setup_intent.created": this.handleSetupIntentEvent.bind(this),
        "setup_intent.requires_action": this.handleSetupIntentEvent.bind(this),
        "setup_intent.setup_failed": this.handleSetupIntentEvent.bind(this),
        "setup_intent.succeeded": this.handleSetupIntentEvent.bind(this),
        "subscription_schedule.aborted": this.handleSubscriptionScheduleEvent.bind(this),
        "subscription_schedule.canceled": this.handleSubscriptionScheduleEvent.bind(this),
        "subscription_schedule.completed": this.handleSubscriptionScheduleEvent.bind(this),
        "subscription_schedule.created": this.handleSubscriptionScheduleEvent.bind(this),
        "subscription_schedule.expiring": this.handleSubscriptionScheduleEvent.bind(this),
        "subscription_schedule.released": this.handleSubscriptionScheduleEvent.bind(this),
        "subscription_schedule.updated": this.handleSubscriptionScheduleEvent.bind(this),
        "payment_method.attached": this.handlePaymentMethodEvent.bind(this),
        "payment_method.automatically_updated": this.handlePaymentMethodEvent.bind(this),
        "payment_method.detached": this.handlePaymentMethodEvent.bind(this),
        "payment_method.updated": this.handlePaymentMethodEvent.bind(this),
        "charge.dispute.created": this.handleDisputeEvent.bind(this),
        "charge.dispute.funds_reinstated": this.handleDisputeEvent.bind(this),
        "charge.dispute.funds_withdrawn": this.handleDisputeEvent.bind(this),
        "charge.dispute.updated": this.handleDisputeEvent.bind(this),
        "charge.dispute.closed": this.handleDisputeEvent.bind(this),
        "payment_intent.amount_capturable_updated": this.handlePaymentIntentEvent.bind(this),
        "payment_intent.canceled": this.handlePaymentIntentEvent.bind(this),
        "payment_intent.created": this.handlePaymentIntentEvent.bind(this),
        "payment_intent.partially_funded": this.handlePaymentIntentEvent.bind(this),
        "payment_intent.payment_failed": this.handlePaymentIntentEvent.bind(this),
        "payment_intent.processing": this.handlePaymentIntentEvent.bind(this),
        "payment_intent.requires_action": this.handlePaymentIntentEvent.bind(this),
        "payment_intent.succeeded": this.handlePaymentIntentEvent.bind(this),
        "credit_note.created": this.handleCreditNoteEvent.bind(this),
        "credit_note.updated": this.handleCreditNoteEvent.bind(this),
        "credit_note.voided": this.handleCreditNoteEvent.bind(this),
        "radar.early_fraud_warning.created": this.handleEarlyFraudWarningEvent.bind(this),
        "radar.early_fraud_warning.updated": this.handleEarlyFraudWarningEvent.bind(this),
        "refund.created": this.handleRefundEvent.bind(this),
        "refund.failed": this.handleRefundEvent.bind(this),
        "refund.updated": this.handleRefundEvent.bind(this),
        "charge.refund.updated": this.handleRefundEvent.bind(this),
        "review.closed": this.handleReviewEvent.bind(this),
        "review.opened": this.handleReviewEvent.bind(this),
        "entitlements.active_entitlement_summary.updated": this.handleEntitlementSummaryEvent.bind(this)
    };
    async processEvent(event) {
        const objectAccountId = event.data?.object && typeof event.data.object === "object" && "account" in event.data.object ? event.data.object.account : void 0;
        const accountId = await this.getAccountId(objectAccountId);
        await this.getCurrentAccount();
        const handler = this.eventHandlers[event.type];
        if (handler) {
            const entityId = event.data?.object && typeof event.data.object === "object" && "id" in event.data.object ? event.data.object.id : "unknown";
            this.config.logger?.info(`Received webhook ${event.id}: ${event.type} for ${entityId}`);
            await handler(event, accountId);
        } else {
            this.config.logger?.warn(`Received unhandled webhook event: ${event.type} (${event.id}). Ignoring.`);
        }
    }
    /**
   * Returns an array of all webhook event types that this sync engine can handle.
   * Useful for configuring webhook endpoints with specific event subscriptions.
   */ getSupportedEventTypes() {
        return Object.keys(this.eventHandlers).sort();
    }
    // Event handler methods
    async handleChargeEvent(event, accountId) {
        const { entity: charge, refetched } = await this.fetchOrUseWebhookData(event.data.object, (id)=>this.stripe.charges.retrieve(id), (charge2)=>charge2.status === "failed" || charge2.status === "succeeded");
        await this.upsertCharges([
            charge
        ], accountId, false, this.getSyncTimestamp(event, refetched));
    }
    async handleCustomerDeletedEvent(event, accountId) {
        const customer = {
            id: event.data.object.id,
            object: "customer",
            deleted: true
        };
        await this.upsertCustomers([
            customer
        ], accountId, this.getSyncTimestamp(event, false));
    }
    async handleCustomerEvent(event, accountId) {
        const { entity: customer, refetched } = await this.fetchOrUseWebhookData(event.data.object, (id)=>this.stripe.customers.retrieve(id), (customer2)=>customer2.deleted === true);
        await this.upsertCustomers([
            customer
        ], accountId, this.getSyncTimestamp(event, refetched));
    }
    async handleCheckoutSessionEvent(event, accountId) {
        const { entity: checkoutSession, refetched } = await this.fetchOrUseWebhookData(event.data.object, (id)=>this.stripe.checkout.sessions.retrieve(id));
        await this.upsertCheckoutSessions([
            checkoutSession
        ], accountId, false, this.getSyncTimestamp(event, refetched));
    }
    async handleSubscriptionEvent(event, accountId) {
        const { entity: subscription, refetched } = await this.fetchOrUseWebhookData(event.data.object, (id)=>this.stripe.subscriptions.retrieve(id), (subscription2)=>subscription2.status === "canceled" || subscription2.status === "incomplete_expired");
        await this.upsertSubscriptions([
            subscription
        ], accountId, false, this.getSyncTimestamp(event, refetched));
    }
    async handleTaxIdEvent(event, accountId) {
        const { entity: taxId, refetched } = await this.fetchOrUseWebhookData(event.data.object, (id)=>this.stripe.taxIds.retrieve(id));
        await this.upsertTaxIds([
            taxId
        ], accountId, false, this.getSyncTimestamp(event, refetched));
    }
    async handleTaxIdDeletedEvent(event, _accountId) {
        const taxId = event.data.object;
        await this.deleteTaxId(taxId.id);
    }
    async handleInvoiceEvent(event, accountId) {
        const { entity: invoice, refetched } = await this.fetchOrUseWebhookData(event.data.object, (id)=>this.stripe.invoices.retrieve(id), (invoice2)=>invoice2.status === "void");
        await this.upsertInvoices([
            invoice
        ], accountId, false, this.getSyncTimestamp(event, refetched));
    }
    async handleProductEvent(event, accountId) {
        try {
            const { entity: product, refetched } = await this.fetchOrUseWebhookData(event.data.object, (id)=>this.stripe.products.retrieve(id));
            await this.upsertProducts([
                product
            ], accountId, this.getSyncTimestamp(event, refetched));
        } catch (err) {
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].errors.StripeAPIError && err.code === "resource_missing") {
                const product = event.data.object;
                await this.deleteProduct(product.id);
            } else {
                throw err;
            }
        }
    }
    async handleProductDeletedEvent(event, _accountId) {
        const product = event.data.object;
        await this.deleteProduct(product.id);
    }
    async handlePriceEvent(event, accountId) {
        try {
            const { entity: price, refetched } = await this.fetchOrUseWebhookData(event.data.object, (id)=>this.stripe.prices.retrieve(id));
            await this.upsertPrices([
                price
            ], accountId, false, this.getSyncTimestamp(event, refetched));
        } catch (err) {
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].errors.StripeAPIError && err.code === "resource_missing") {
                const price = event.data.object;
                await this.deletePrice(price.id);
            } else {
                throw err;
            }
        }
    }
    async handlePriceDeletedEvent(event, _accountId) {
        const price = event.data.object;
        await this.deletePrice(price.id);
    }
    async handlePlanEvent(event, accountId) {
        try {
            const { entity: plan, refetched } = await this.fetchOrUseWebhookData(event.data.object, (id)=>this.stripe.plans.retrieve(id));
            await this.upsertPlans([
                plan
            ], accountId, false, this.getSyncTimestamp(event, refetched));
        } catch (err) {
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].errors.StripeAPIError && err.code === "resource_missing") {
                const plan = event.data.object;
                await this.deletePlan(plan.id);
            } else {
                throw err;
            }
        }
    }
    async handlePlanDeletedEvent(event, _accountId) {
        const plan = event.data.object;
        await this.deletePlan(plan.id);
    }
    async handleSetupIntentEvent(event, accountId) {
        const { entity: setupIntent, refetched } = await this.fetchOrUseWebhookData(event.data.object, (id)=>this.stripe.setupIntents.retrieve(id), (setupIntent2)=>setupIntent2.status === "canceled" || setupIntent2.status === "succeeded");
        await this.upsertSetupIntents([
            setupIntent
        ], accountId, false, this.getSyncTimestamp(event, refetched));
    }
    async handleSubscriptionScheduleEvent(event, accountId) {
        const { entity: subscriptionSchedule, refetched } = await this.fetchOrUseWebhookData(event.data.object, (id)=>this.stripe.subscriptionSchedules.retrieve(id), (schedule)=>schedule.status === "canceled" || schedule.status === "completed");
        await this.upsertSubscriptionSchedules([
            subscriptionSchedule
        ], accountId, false, this.getSyncTimestamp(event, refetched));
    }
    async handlePaymentMethodEvent(event, accountId) {
        const { entity: paymentMethod, refetched } = await this.fetchOrUseWebhookData(event.data.object, (id)=>this.stripe.paymentMethods.retrieve(id));
        await this.upsertPaymentMethods([
            paymentMethod
        ], accountId, false, this.getSyncTimestamp(event, refetched));
    }
    async handleDisputeEvent(event, accountId) {
        const { entity: dispute, refetched } = await this.fetchOrUseWebhookData(event.data.object, (id)=>this.stripe.disputes.retrieve(id), (dispute2)=>dispute2.status === "won" || dispute2.status === "lost");
        await this.upsertDisputes([
            dispute
        ], accountId, false, this.getSyncTimestamp(event, refetched));
    }
    async handlePaymentIntentEvent(event, accountId) {
        const { entity: paymentIntent, refetched } = await this.fetchOrUseWebhookData(event.data.object, (id)=>this.stripe.paymentIntents.retrieve(id), // Final states - do not re-fetch from API
        (entity)=>entity.status === "canceled" || entity.status === "succeeded");
        await this.upsertPaymentIntents([
            paymentIntent
        ], accountId, false, this.getSyncTimestamp(event, refetched));
    }
    async handleCreditNoteEvent(event, accountId) {
        const { entity: creditNote, refetched } = await this.fetchOrUseWebhookData(event.data.object, (id)=>this.stripe.creditNotes.retrieve(id), (creditNote2)=>creditNote2.status === "void");
        await this.upsertCreditNotes([
            creditNote
        ], accountId, false, this.getSyncTimestamp(event, refetched));
    }
    async handleEarlyFraudWarningEvent(event, accountId) {
        const { entity: earlyFraudWarning, refetched } = await this.fetchOrUseWebhookData(event.data.object, (id)=>this.stripe.radar.earlyFraudWarnings.retrieve(id));
        await this.upsertEarlyFraudWarning([
            earlyFraudWarning
        ], accountId, false, this.getSyncTimestamp(event, refetched));
    }
    async handleRefundEvent(event, accountId) {
        const { entity: refund, refetched } = await this.fetchOrUseWebhookData(event.data.object, (id)=>this.stripe.refunds.retrieve(id));
        await this.upsertRefunds([
            refund
        ], accountId, false, this.getSyncTimestamp(event, refetched));
    }
    async handleReviewEvent(event, accountId) {
        const { entity: review, refetched } = await this.fetchOrUseWebhookData(event.data.object, (id)=>this.stripe.reviews.retrieve(id));
        await this.upsertReviews([
            review
        ], accountId, false, this.getSyncTimestamp(event, refetched));
    }
    async handleEntitlementSummaryEvent(event, accountId) {
        const activeEntitlementSummary = event.data.object;
        let entitlements = activeEntitlementSummary.entitlements;
        let refetched = false;
        if (this.config.revalidateObjectsViaStripeApi?.includes("entitlements")) {
            const { lastResponse, ...rest } = await this.stripe.entitlements.activeEntitlements.list({
                customer: activeEntitlementSummary.customer
            });
            entitlements = rest;
            refetched = true;
        }
        await this.deleteRemovedActiveEntitlements(activeEntitlementSummary.customer, entitlements.data.map((entitlement)=>entitlement.id));
        await this.upsertActiveEntitlements(activeEntitlementSummary.customer, entitlements.data, accountId, false, this.getSyncTimestamp(event, refetched));
    }
    getSyncTimestamp(event, refetched) {
        return refetched ? /* @__PURE__ */ new Date().toISOString() : new Date(event.created * 1e3).toISOString();
    }
    shouldRefetchEntity(entity) {
        return this.config.revalidateObjectsViaStripeApi?.includes(entity.object);
    }
    async fetchOrUseWebhookData(entity, fetchFn, entityInFinalState) {
        if (!entity.id) return {
            entity,
            refetched: false
        };
        if (entityInFinalState && entityInFinalState(entity)) return {
            entity,
            refetched: false
        };
        if (this.shouldRefetchEntity(entity)) {
            const fetchedEntity = await fetchFn(entity.id);
            return {
                entity: fetchedEntity,
                refetched: true
            };
        }
        return {
            entity,
            refetched: false
        };
    }
    async syncSingleEntity(stripeId) {
        const accountId = await this.getAccountId();
        if (stripeId.startsWith("cus_")) {
            return this.stripe.customers.retrieve(stripeId).then((it)=>{
                if (!it || it.deleted) return;
                return this.upsertCustomers([
                    it
                ], accountId);
            });
        } else if (stripeId.startsWith("in_")) {
            return this.stripe.invoices.retrieve(stripeId).then((it)=>this.upsertInvoices([
                    it
                ], accountId));
        } else if (stripeId.startsWith("price_")) {
            return this.stripe.prices.retrieve(stripeId).then((it)=>this.upsertPrices([
                    it
                ], accountId));
        } else if (stripeId.startsWith("prod_")) {
            return this.stripe.products.retrieve(stripeId).then((it)=>this.upsertProducts([
                    it
                ], accountId));
        } else if (stripeId.startsWith("sub_")) {
            return this.stripe.subscriptions.retrieve(stripeId).then((it)=>this.upsertSubscriptions([
                    it
                ], accountId));
        } else if (stripeId.startsWith("seti_")) {
            return this.stripe.setupIntents.retrieve(stripeId).then((it)=>this.upsertSetupIntents([
                    it
                ], accountId));
        } else if (stripeId.startsWith("pm_")) {
            return this.stripe.paymentMethods.retrieve(stripeId).then((it)=>this.upsertPaymentMethods([
                    it
                ], accountId));
        } else if (stripeId.startsWith("dp_") || stripeId.startsWith("du_")) {
            return this.stripe.disputes.retrieve(stripeId).then((it)=>this.upsertDisputes([
                    it
                ], accountId));
        } else if (stripeId.startsWith("ch_")) {
            return this.stripe.charges.retrieve(stripeId).then((it)=>this.upsertCharges([
                    it
                ], accountId, true));
        } else if (stripeId.startsWith("pi_")) {
            return this.stripe.paymentIntents.retrieve(stripeId).then((it)=>this.upsertPaymentIntents([
                    it
                ], accountId));
        } else if (stripeId.startsWith("txi_")) {
            return this.stripe.taxIds.retrieve(stripeId).then((it)=>this.upsertTaxIds([
                    it
                ], accountId));
        } else if (stripeId.startsWith("cn_")) {
            return this.stripe.creditNotes.retrieve(stripeId).then((it)=>this.upsertCreditNotes([
                    it
                ], accountId));
        } else if (stripeId.startsWith("issfr_")) {
            return this.stripe.radar.earlyFraudWarnings.retrieve(stripeId).then((it)=>this.upsertEarlyFraudWarning([
                    it
                ], accountId));
        } else if (stripeId.startsWith("prv_")) {
            return this.stripe.reviews.retrieve(stripeId).then((it)=>this.upsertReviews([
                    it
                ], accountId));
        } else if (stripeId.startsWith("re_")) {
            return this.stripe.refunds.retrieve(stripeId).then((it)=>this.upsertRefunds([
                    it
                ], accountId));
        } else if (stripeId.startsWith("feat_")) {
            return this.stripe.entitlements.features.retrieve(stripeId).then((it)=>this.upsertFeatures([
                    it
                ], accountId));
        } else if (stripeId.startsWith("cs_")) {
            return this.stripe.checkout.sessions.retrieve(stripeId).then((it)=>this.upsertCheckoutSessions([
                    it
                ], accountId));
        }
    }
    async syncBackfill(params) {
        const { object } = params ?? {
            object: this.getSupportedEventTypes
        };
        let products, prices, customers, checkoutSessions, subscriptions, subscriptionSchedules, invoices, setupIntents, paymentMethods, disputes, charges, paymentIntents, plans, taxIds, creditNotes, earlyFraudWarnings, refunds;
        await this.getCurrentAccount();
        switch(object){
            case "all":
                products = await this.syncProducts(params);
                prices = await this.syncPrices(params);
                plans = await this.syncPlans(params);
                customers = await this.syncCustomers(params);
                subscriptions = await this.syncSubscriptions(params);
                subscriptionSchedules = await this.syncSubscriptionSchedules(params);
                invoices = await this.syncInvoices(params);
                charges = await this.syncCharges(params);
                setupIntents = await this.syncSetupIntents(params);
                paymentMethods = await this.syncPaymentMethods(params);
                paymentIntents = await this.syncPaymentIntents(params);
                taxIds = await this.syncTaxIds(params);
                creditNotes = await this.syncCreditNotes(params);
                disputes = await this.syncDisputes(params);
                earlyFraudWarnings = await this.syncEarlyFraudWarnings(params);
                refunds = await this.syncRefunds(params);
                checkoutSessions = await this.syncCheckoutSessions(params);
                break;
            case "customer":
                customers = await this.syncCustomers(params);
                break;
            case "invoice":
                invoices = await this.syncInvoices(params);
                break;
            case "price":
                prices = await this.syncPrices(params);
                break;
            case "product":
                products = await this.syncProducts(params);
                break;
            case "subscription":
                subscriptions = await this.syncSubscriptions(params);
                break;
            case "subscription_schedules":
                subscriptionSchedules = await this.syncSubscriptionSchedules(params);
                break;
            case "setup_intent":
                setupIntents = await this.syncSetupIntents(params);
                break;
            case "payment_method":
                paymentMethods = await this.syncPaymentMethods(params);
                break;
            case "dispute":
                disputes = await this.syncDisputes(params);
                break;
            case "charge":
                charges = await this.syncCharges(params);
                break;
            case "payment_intent":
                paymentIntents = await this.syncPaymentIntents(params);
            case "plan":
                plans = await this.syncPlans(params);
                break;
            case "tax_id":
                taxIds = await this.syncTaxIds(params);
                break;
            case "credit_note":
                creditNotes = await this.syncCreditNotes(params);
                break;
            case "early_fraud_warning":
                earlyFraudWarnings = await this.syncEarlyFraudWarnings(params);
                break;
            case "refund":
                refunds = await this.syncRefunds(params);
                break;
            case "checkout_sessions":
                checkoutSessions = await this.syncCheckoutSessions(params);
                break;
            default:
                break;
        }
        return {
            products,
            prices,
            customers,
            checkoutSessions,
            subscriptions,
            subscriptionSchedules,
            invoices,
            setupIntents,
            paymentMethods,
            disputes,
            charges,
            paymentIntents,
            plans,
            taxIds,
            creditNotes,
            earlyFraudWarnings,
            refunds
        };
    }
    async syncProducts(syncParams) {
        this.config.logger?.info("Syncing products");
        const accountId = await this.getAccountId();
        const params = {
            limit: 100
        };
        if (syncParams?.created) {
            params.created = syncParams.created;
        } else {
            const cursor = await this.postgresClient.getSyncCursor("products", accountId);
            if (cursor) {
                params.created = {
                    gte: cursor
                };
                this.config.logger?.info(`Incremental sync from cursor: ${cursor}`);
            }
        }
        return this.fetchAndUpsert(()=>this.stripe.products.list(params), (products)=>this.upsertProducts(products, accountId), accountId, "products");
    }
    async syncPrices(syncParams) {
        this.config.logger?.info("Syncing prices");
        const accountId = await this.getAccountId();
        const params = {
            limit: 100
        };
        if (syncParams?.created) {
            params.created = syncParams.created;
        } else {
            const cursor = await this.postgresClient.getSyncCursor("prices", accountId);
            if (cursor) {
                params.created = {
                    gte: cursor
                };
                this.config.logger?.info(`Incremental sync from cursor: ${cursor}`);
            }
        }
        return this.fetchAndUpsert(()=>this.stripe.prices.list(params), (prices)=>this.upsertPrices(prices, accountId, syncParams?.backfillRelatedEntities), accountId, "prices");
    }
    async syncPlans(syncParams) {
        this.config.logger?.info("Syncing plans");
        const accountId = await this.getAccountId();
        const params = {
            limit: 100
        };
        if (syncParams?.created) {
            params.created = syncParams.created;
        } else {
            const cursor = await this.postgresClient.getSyncCursor("plans", accountId);
            if (cursor) {
                params.created = {
                    gte: cursor
                };
                this.config.logger?.info(`Incremental sync from cursor: ${cursor}`);
            }
        }
        return this.fetchAndUpsert(()=>this.stripe.plans.list(params), (plans)=>this.upsertPlans(plans, accountId, syncParams?.backfillRelatedEntities), accountId, "plans");
    }
    async syncCustomers(syncParams) {
        this.config.logger?.info("Syncing customers");
        const accountId = await this.getAccountId();
        const params = {
            limit: 100
        };
        if (syncParams?.created) {
            params.created = syncParams.created;
        } else {
            const cursor = await this.postgresClient.getSyncCursor("customers", accountId);
            if (cursor) {
                params.created = {
                    gte: cursor
                };
                this.config.logger?.info(`Incremental sync from cursor: ${cursor}`);
            }
        }
        return this.fetchAndUpsert(()=>this.stripe.customers.list(params), // @ts-expect-error
        (items)=>this.upsertCustomers(items, accountId), accountId, "customers");
    }
    async syncSubscriptions(syncParams) {
        this.config.logger?.info("Syncing subscriptions");
        const accountId = await this.getAccountId();
        const params = {
            status: "all",
            limit: 100
        };
        if (syncParams?.created) {
            params.created = syncParams.created;
        } else {
            const cursor = await this.postgresClient.getSyncCursor("subscriptions", accountId);
            if (cursor) {
                params.created = {
                    gte: cursor
                };
                this.config.logger?.info(`Incremental sync from cursor: ${cursor}`);
            }
        }
        return this.fetchAndUpsert(()=>this.stripe.subscriptions.list(params), (items)=>this.upsertSubscriptions(items, accountId, syncParams?.backfillRelatedEntities), accountId, "subscriptions");
    }
    async syncSubscriptionSchedules(syncParams) {
        this.config.logger?.info("Syncing subscription schedules");
        const accountId = await this.getAccountId();
        const params = {
            limit: 100
        };
        if (syncParams?.created) {
            params.created = syncParams.created;
        } else {
            const cursor = await this.postgresClient.getSyncCursor("subscription_schedules", accountId);
            if (cursor) {
                params.created = {
                    gte: cursor
                };
                this.config.logger?.info(`Incremental sync from cursor: ${cursor}`);
            }
        }
        return this.fetchAndUpsert(()=>this.stripe.subscriptionSchedules.list(params), (items)=>this.upsertSubscriptionSchedules(items, accountId, syncParams?.backfillRelatedEntities), accountId, "subscription_schedules");
    }
    async syncInvoices(syncParams) {
        this.config.logger?.info("Syncing invoices");
        const accountId = await this.getAccountId();
        const params = {
            limit: 100
        };
        if (syncParams?.created) {
            params.created = syncParams.created;
        } else {
            const cursor = await this.postgresClient.getSyncCursor("invoices", accountId);
            if (cursor) {
                params.created = {
                    gte: cursor
                };
                this.config.logger?.info(`Incremental sync from cursor: ${cursor}`);
            }
        }
        return this.fetchAndUpsert(()=>this.stripe.invoices.list(params), (items)=>this.upsertInvoices(items, accountId, syncParams?.backfillRelatedEntities), accountId, "invoices");
    }
    async syncCharges(syncParams) {
        this.config.logger?.info("Syncing charges");
        const accountId = await this.getAccountId();
        const params = {
            limit: 100
        };
        if (syncParams?.created) {
            params.created = syncParams.created;
        } else {
            const cursor = await this.postgresClient.getSyncCursor("charges", accountId);
            if (cursor) {
                params.created = {
                    gte: cursor
                };
                this.config.logger?.info(`Incremental sync from cursor: ${cursor}`);
            }
        }
        return this.fetchAndUpsert(()=>this.stripe.charges.list(params), (items)=>this.upsertCharges(items, accountId, syncParams?.backfillRelatedEntities), accountId, "charges");
    }
    async syncSetupIntents(syncParams) {
        this.config.logger?.info("Syncing setup_intents");
        const accountId = await this.getAccountId();
        const params = {
            limit: 100
        };
        if (syncParams?.created) {
            params.created = syncParams.created;
        } else {
            const cursor = await this.postgresClient.getSyncCursor("setup_intents", accountId);
            if (cursor) {
                params.created = {
                    gte: cursor
                };
                this.config.logger?.info(`Incremental sync from cursor: ${cursor}`);
            }
        }
        return this.fetchAndUpsert(()=>this.stripe.setupIntents.list(params), (items)=>this.upsertSetupIntents(items, accountId, syncParams?.backfillRelatedEntities), accountId, "setup_intents");
    }
    async syncPaymentIntents(syncParams) {
        this.config.logger?.info("Syncing payment_intents");
        const accountId = await this.getAccountId();
        const params = {
            limit: 100
        };
        if (syncParams?.created) {
            params.created = syncParams.created;
        } else {
            const cursor = await this.postgresClient.getSyncCursor("payment_intents", accountId);
            if (cursor) {
                params.created = {
                    gte: cursor
                };
                this.config.logger?.info(`Incremental sync from cursor: ${cursor}`);
            }
        }
        return this.fetchAndUpsert(()=>this.stripe.paymentIntents.list(params), (items)=>this.upsertPaymentIntents(items, accountId, syncParams?.backfillRelatedEntities), accountId, "payment_intents");
    }
    async syncTaxIds(syncParams) {
        this.config.logger?.info("Syncing tax_ids");
        const accountId = await this.getAccountId();
        const params = {
            limit: 100
        };
        return this.fetchAndUpsert(()=>this.stripe.taxIds.list(params), (items)=>this.upsertTaxIds(items, accountId, syncParams?.backfillRelatedEntities), accountId);
    }
    async syncPaymentMethods(syncParams) {
        this.config.logger?.info("Syncing payment method");
        const accountId = await this.getAccountId();
        const prepared = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yesql$40$7$2e$0$2e$0$2f$node_modules$2f$yesql$2f$yesql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pg"])(`select id from "stripe"."customers" WHERE COALESCE(deleted, false) <> true;`)([]);
        const customerIds = await this.postgresClient.query(prepared.text, prepared.values).then(({ rows })=>rows.map((it)=>it.id));
        this.config.logger?.info(`Getting payment methods for ${customerIds.length} customers`);
        let synced = 0;
        for (const customerIdChunk of chunkArray(customerIds, 10)){
            await Promise.all(customerIdChunk.map(async (customerId)=>{
                const syncResult = await this.fetchAndUpsert(()=>this.stripe.paymentMethods.list({
                        limit: 100,
                        customer: customerId
                    }), (items)=>this.upsertPaymentMethods(items, accountId, syncParams?.backfillRelatedEntities), accountId);
                synced += syncResult.synced;
            }));
        }
        return {
            synced
        };
    }
    async syncDisputes(syncParams) {
        this.config.logger?.info("Syncing disputes");
        const accountId = await this.getAccountId();
        const params = {
            limit: 100
        };
        if (syncParams?.created) {
            params.created = syncParams.created;
        } else {
            const cursor = await this.postgresClient.getSyncCursor("disputes", accountId);
            if (cursor) {
                params.created = {
                    gte: cursor
                };
                this.config.logger?.info(`Incremental sync from cursor: ${cursor}`);
            }
        }
        return this.fetchAndUpsert(()=>this.stripe.disputes.list(params), (items)=>this.upsertDisputes(items, accountId, syncParams?.backfillRelatedEntities), accountId, "disputes");
    }
    async syncEarlyFraudWarnings(syncParams) {
        this.config.logger?.info("Syncing early fraud warnings");
        const accountId = await this.getAccountId();
        const params = {
            limit: 100
        };
        if (syncParams?.created) {
            params.created = syncParams.created;
        } else {
            const cursor = await this.postgresClient.getSyncCursor("early_fraud_warnings", accountId);
            if (cursor) {
                params.created = {
                    gte: cursor
                };
                this.config.logger?.info(`Incremental sync from cursor: ${cursor}`);
            }
        }
        return this.fetchAndUpsert(()=>this.stripe.radar.earlyFraudWarnings.list(params), (items)=>this.upsertEarlyFraudWarning(items, accountId, syncParams?.backfillRelatedEntities), accountId, "early_fraud_warnings");
    }
    async syncRefunds(syncParams) {
        this.config.logger?.info("Syncing refunds");
        const accountId = await this.getAccountId();
        const params = {
            limit: 100
        };
        if (syncParams?.created) {
            params.created = syncParams.created;
        } else {
            const cursor = await this.postgresClient.getSyncCursor("refunds", accountId);
            if (cursor) {
                params.created = {
                    gte: cursor
                };
                this.config.logger?.info(`Incremental sync from cursor: ${cursor}`);
            }
        }
        return this.fetchAndUpsert(()=>this.stripe.refunds.list(params), (items)=>this.upsertRefunds(items, accountId, syncParams?.backfillRelatedEntities), accountId, "refunds");
    }
    async syncCreditNotes(syncParams) {
        this.config.logger?.info("Syncing credit notes");
        const accountId = await this.getAccountId();
        const params = {
            limit: 100
        };
        if (syncParams?.created) {
            params.created = syncParams.created;
        } else {
            const cursor = await this.postgresClient.getSyncCursor("credit_notes", accountId);
            if (cursor) {
                params.created = {
                    gte: cursor
                };
                this.config.logger?.info(`Incremental sync from cursor: ${cursor}`);
            }
        }
        return this.fetchAndUpsert(()=>this.stripe.creditNotes.list(params), (creditNotes)=>this.upsertCreditNotes(creditNotes, accountId), accountId, "credit_notes");
    }
    async syncFeatures(syncParams) {
        this.config.logger?.info("Syncing features");
        const accountId = await this.getAccountId();
        const params = {
            limit: 100,
            ...syncParams?.pagination
        };
        return this.fetchAndUpsert(()=>this.stripe.entitlements.features.list(params), (features)=>this.upsertFeatures(features, accountId), accountId);
    }
    async syncEntitlements(customerId, syncParams) {
        this.config.logger?.info("Syncing entitlements");
        const accountId = await this.getAccountId();
        const params = {
            customer: customerId,
            limit: 100,
            ...syncParams?.pagination
        };
        return this.fetchAndUpsert(()=>this.stripe.entitlements.activeEntitlements.list(params), (entitlements)=>this.upsertActiveEntitlements(customerId, entitlements, accountId), accountId);
    }
    async syncCheckoutSessions(syncParams) {
        this.config.logger?.info("Syncing checkout sessions");
        const accountId = await this.getAccountId();
        const params = {
            limit: 100
        };
        if (syncParams?.created) {
            params.created = syncParams.created;
        } else {
            const cursor = await this.postgresClient.getSyncCursor("checkout_sessions", accountId);
            if (cursor) {
                params.created = {
                    gte: cursor
                };
                this.config.logger?.info(`Incremental sync from cursor: ${cursor}`);
            }
        }
        return this.fetchAndUpsert(()=>this.stripe.checkout.sessions.list(params), (items)=>this.upsertCheckoutSessions(items, accountId, syncParams?.backfillRelatedEntities), accountId, "checkout_sessions");
    }
    async fetchAndUpsert(fetch, upsert, accountId, resourceName) {
        const CHECKPOINT_SIZE = 100;
        let totalSynced = 0;
        let currentBatch = [];
        if (resourceName) {
            await this.postgresClient.markSyncRunning(resourceName, accountId);
        }
        try {
            this.config.logger?.info("Fetching items to sync from Stripe");
            try {
                for await (const item of fetch()){
                    currentBatch.push(item);
                    if (currentBatch.length >= CHECKPOINT_SIZE) {
                        this.config.logger?.info(`Upserting batch of ${currentBatch.length} items`);
                        await upsert(currentBatch, accountId);
                        totalSynced += currentBatch.length;
                        if (resourceName) {
                            const maxCreated = Math.max(...currentBatch.map((i)=>i.created || 0));
                            if (maxCreated > 0) {
                                await this.postgresClient.updateSyncCursor(resourceName, accountId, maxCreated);
                                this.config.logger?.info(`Checkpoint: cursor updated to ${maxCreated}`);
                            }
                        }
                        currentBatch = [];
                    }
                }
                if (currentBatch.length > 0) {
                    this.config.logger?.info(`Upserting final batch of ${currentBatch.length} items`);
                    await upsert(currentBatch, accountId);
                    totalSynced += currentBatch.length;
                    if (resourceName) {
                        const maxCreated = Math.max(...currentBatch.map((i)=>i.created || 0));
                        if (maxCreated > 0) {
                            await this.postgresClient.updateSyncCursor(resourceName, accountId, maxCreated);
                        }
                    }
                }
            } catch (error) {
                if (currentBatch.length > 0) {
                    this.config.logger?.info(`Error occurred, saving partial progress: ${currentBatch.length} items`);
                    await upsert(currentBatch, accountId);
                    totalSynced += currentBatch.length;
                    if (resourceName) {
                        const maxCreated = Math.max(...currentBatch.map((i)=>i.created || 0));
                        if (maxCreated > 0) {
                            await this.postgresClient.updateSyncCursor(resourceName, accountId, maxCreated);
                        }
                    }
                }
                throw error;
            }
            if (resourceName) {
                await this.postgresClient.markSyncComplete(resourceName, accountId);
            }
            this.config.logger?.info(`Sync complete: ${totalSynced} items synced`);
            return {
                synced: totalSynced
            };
        } catch (error) {
            if (resourceName) {
                await this.postgresClient.markSyncError(resourceName, accountId, error instanceof Error ? error.message : "Unknown error");
            }
            throw error;
        }
    }
    async upsertCharges(charges, accountId, backfillRelatedEntities, syncTimestamp) {
        if (backfillRelatedEntities ?? this.config.backfillRelatedEntities) {
            await Promise.all([
                this.backfillCustomers(getUniqueIds(charges, "customer"), accountId),
                this.backfillInvoices(getUniqueIds(charges, "invoice"), accountId)
            ]);
        }
        await this.expandEntity(charges, "refunds", (id)=>this.stripe.refunds.list({
                charge: id,
                limit: 100
            }));
        return this.postgresClient.upsertManyWithTimestampProtection(charges, "charges", accountId, syncTimestamp);
    }
    async backfillCharges(chargeIds, accountId) {
        const missingChargeIds = await this.postgresClient.findMissingEntries("charges", chargeIds);
        await this.fetchMissingEntities(missingChargeIds, (id)=>this.stripe.charges.retrieve(id)).then((charges)=>this.upsertCharges(charges, accountId));
    }
    async backfillPaymentIntents(paymentIntentIds, accountId) {
        const missingIds = await this.postgresClient.findMissingEntries("payment_intents", paymentIntentIds);
        await this.fetchMissingEntities(missingIds, (id)=>this.stripe.paymentIntents.retrieve(id)).then((paymentIntents)=>this.upsertPaymentIntents(paymentIntents, accountId));
    }
    async upsertCreditNotes(creditNotes, accountId, backfillRelatedEntities, syncTimestamp) {
        if (backfillRelatedEntities ?? this.config.backfillRelatedEntities) {
            await Promise.all([
                this.backfillCustomers(getUniqueIds(creditNotes, "customer"), accountId),
                this.backfillInvoices(getUniqueIds(creditNotes, "invoice"), accountId)
            ]);
        }
        await this.expandEntity(creditNotes, "lines", (id)=>this.stripe.creditNotes.listLineItems(id, {
                limit: 100
            }));
        return this.postgresClient.upsertManyWithTimestampProtection(creditNotes, "credit_notes", accountId, syncTimestamp);
    }
    async upsertCheckoutSessions(checkoutSessions, accountId, backfillRelatedEntities, syncTimestamp) {
        if (backfillRelatedEntities ?? this.config.backfillRelatedEntities) {
            await Promise.all([
                this.backfillCustomers(getUniqueIds(checkoutSessions, "customer"), accountId),
                this.backfillSubscriptions(getUniqueIds(checkoutSessions, "subscription"), accountId),
                this.backfillPaymentIntents(getUniqueIds(checkoutSessions, "payment_intent"), accountId),
                this.backfillInvoices(getUniqueIds(checkoutSessions, "invoice"), accountId)
            ]);
        }
        const rows = await this.postgresClient.upsertManyWithTimestampProtection(checkoutSessions, "checkout_sessions", accountId, syncTimestamp);
        await this.fillCheckoutSessionsLineItems(checkoutSessions.map((cs)=>cs.id), accountId, syncTimestamp);
        return rows;
    }
    async upsertEarlyFraudWarning(earlyFraudWarnings, accountId, backfillRelatedEntities, syncTimestamp) {
        if (backfillRelatedEntities ?? this.config.backfillRelatedEntities) {
            await Promise.all([
                this.backfillPaymentIntents(getUniqueIds(earlyFraudWarnings, "payment_intent"), accountId),
                this.backfillCharges(getUniqueIds(earlyFraudWarnings, "charge"), accountId)
            ]);
        }
        return this.postgresClient.upsertManyWithTimestampProtection(earlyFraudWarnings, "early_fraud_warnings", accountId, syncTimestamp);
    }
    async upsertRefunds(refunds, accountId, backfillRelatedEntities, syncTimestamp) {
        if (backfillRelatedEntities ?? this.config.backfillRelatedEntities) {
            await Promise.all([
                this.backfillPaymentIntents(getUniqueIds(refunds, "payment_intent"), accountId),
                this.backfillCharges(getUniqueIds(refunds, "charge"), accountId)
            ]);
        }
        return this.postgresClient.upsertManyWithTimestampProtection(refunds, "refunds", accountId, syncTimestamp);
    }
    async upsertReviews(reviews, accountId, backfillRelatedEntities, syncTimestamp) {
        if (backfillRelatedEntities ?? this.config.backfillRelatedEntities) {
            await Promise.all([
                this.backfillPaymentIntents(getUniqueIds(reviews, "payment_intent"), accountId),
                this.backfillCharges(getUniqueIds(reviews, "charge"), accountId)
            ]);
        }
        return this.postgresClient.upsertManyWithTimestampProtection(reviews, "reviews", accountId, syncTimestamp);
    }
    async upsertCustomers(customers, accountId, syncTimestamp) {
        const deletedCustomers = customers.filter((customer)=>customer.deleted);
        const nonDeletedCustomers = customers.filter((customer)=>!customer.deleted);
        await this.postgresClient.upsertManyWithTimestampProtection(nonDeletedCustomers, "customers", accountId, syncTimestamp);
        await this.postgresClient.upsertManyWithTimestampProtection(deletedCustomers, "customers", accountId, syncTimestamp);
        return customers;
    }
    async backfillCustomers(customerIds, accountId) {
        const missingIds = await this.postgresClient.findMissingEntries("customers", customerIds);
        await this.fetchMissingEntities(missingIds, (id)=>this.stripe.customers.retrieve(id)).then((entries)=>this.upsertCustomers(entries, accountId)).catch((err)=>{
            this.config.logger?.error(err, "Failed to backfill");
            throw err;
        });
    }
    async upsertDisputes(disputes, accountId, backfillRelatedEntities, syncTimestamp) {
        if (backfillRelatedEntities ?? this.config.backfillRelatedEntities) {
            await this.backfillCharges(getUniqueIds(disputes, "charge"), accountId);
        }
        return this.postgresClient.upsertManyWithTimestampProtection(disputes, "disputes", accountId, syncTimestamp);
    }
    async upsertInvoices(invoices, accountId, backfillRelatedEntities, syncTimestamp) {
        if (backfillRelatedEntities ?? this.config.backfillRelatedEntities) {
            await Promise.all([
                this.backfillCustomers(getUniqueIds(invoices, "customer"), accountId),
                this.backfillSubscriptions(getUniqueIds(invoices, "subscription"), accountId)
            ]);
        }
        await this.expandEntity(invoices, "lines", (id)=>this.stripe.invoices.listLineItems(id, {
                limit: 100
            }));
        return this.postgresClient.upsertManyWithTimestampProtection(invoices, "invoices", accountId, syncTimestamp);
    }
    backfillInvoices = async (invoiceIds, accountId)=>{
        const missingIds = await this.postgresClient.findMissingEntries("invoices", invoiceIds);
        await this.fetchMissingEntities(missingIds, (id)=>this.stripe.invoices.retrieve(id)).then((entries)=>this.upsertInvoices(entries, accountId));
    };
    backfillPrices = async (priceIds, accountId)=>{
        const missingIds = await this.postgresClient.findMissingEntries("prices", priceIds);
        await this.fetchMissingEntities(missingIds, (id)=>this.stripe.prices.retrieve(id)).then((entries)=>this.upsertPrices(entries, accountId));
    };
    async upsertPlans(plans, accountId, backfillRelatedEntities, syncTimestamp) {
        if (backfillRelatedEntities ?? this.config.backfillRelatedEntities) {
            await this.backfillProducts(getUniqueIds(plans, "product"), accountId);
        }
        return this.postgresClient.upsertManyWithTimestampProtection(plans, "plans", accountId, syncTimestamp);
    }
    async deletePlan(id) {
        return this.postgresClient.delete("plans", id);
    }
    async upsertPrices(prices, accountId, backfillRelatedEntities, syncTimestamp) {
        if (backfillRelatedEntities ?? this.config.backfillRelatedEntities) {
            await this.backfillProducts(getUniqueIds(prices, "product"), accountId);
        }
        return this.postgresClient.upsertManyWithTimestampProtection(prices, "prices", accountId, syncTimestamp);
    }
    async deletePrice(id) {
        return this.postgresClient.delete("prices", id);
    }
    async upsertProducts(products, accountId, syncTimestamp) {
        return this.postgresClient.upsertManyWithTimestampProtection(products, "products", accountId, syncTimestamp);
    }
    async deleteProduct(id) {
        return this.postgresClient.delete("products", id);
    }
    async backfillProducts(productIds, accountId) {
        const missingProductIds = await this.postgresClient.findMissingEntries("products", productIds);
        await this.fetchMissingEntities(missingProductIds, (id)=>this.stripe.products.retrieve(id)).then((products)=>this.upsertProducts(products, accountId));
    }
    async upsertPaymentIntents(paymentIntents, accountId, backfillRelatedEntities, syncTimestamp) {
        if (backfillRelatedEntities ?? this.config.backfillRelatedEntities) {
            await Promise.all([
                this.backfillCustomers(getUniqueIds(paymentIntents, "customer"), accountId),
                this.backfillInvoices(getUniqueIds(paymentIntents, "invoice"), accountId)
            ]);
        }
        return this.postgresClient.upsertManyWithTimestampProtection(paymentIntents, "payment_intents", accountId, syncTimestamp);
    }
    async upsertPaymentMethods(paymentMethods, accountId, backfillRelatedEntities = false, syncTimestamp) {
        if (backfillRelatedEntities ?? this.config.backfillRelatedEntities) {
            await this.backfillCustomers(getUniqueIds(paymentMethods, "customer"), accountId);
        }
        return this.postgresClient.upsertManyWithTimestampProtection(paymentMethods, "payment_methods", accountId, syncTimestamp);
    }
    async upsertSetupIntents(setupIntents, accountId, backfillRelatedEntities, syncTimestamp) {
        if (backfillRelatedEntities ?? this.config.backfillRelatedEntities) {
            await this.backfillCustomers(getUniqueIds(setupIntents, "customer"), accountId);
        }
        return this.postgresClient.upsertManyWithTimestampProtection(setupIntents, "setup_intents", accountId, syncTimestamp);
    }
    async upsertTaxIds(taxIds, accountId, backfillRelatedEntities, syncTimestamp) {
        if (backfillRelatedEntities ?? this.config.backfillRelatedEntities) {
            await this.backfillCustomers(getUniqueIds(taxIds, "customer"), accountId);
        }
        return this.postgresClient.upsertManyWithTimestampProtection(taxIds, "tax_ids", accountId, syncTimestamp);
    }
    async deleteTaxId(id) {
        return this.postgresClient.delete("tax_ids", id);
    }
    async upsertSubscriptionItems(subscriptionItems, accountId, syncTimestamp) {
        const modifiedSubscriptionItems = subscriptionItems.map((subscriptionItem)=>{
            const priceId = subscriptionItem.price.id.toString();
            const deleted = subscriptionItem.deleted;
            const quantity = subscriptionItem.quantity;
            return {
                ...subscriptionItem,
                price: priceId,
                deleted: deleted ?? false,
                quantity: quantity ?? null
            };
        });
        await this.postgresClient.upsertManyWithTimestampProtection(modifiedSubscriptionItems, "subscription_items", accountId, syncTimestamp);
    }
    async fillCheckoutSessionsLineItems(checkoutSessionIds, accountId, syncTimestamp) {
        for (const checkoutSessionId of checkoutSessionIds){
            const lineItemResponses = [];
            for await (const lineItem of this.stripe.checkout.sessions.listLineItems(checkoutSessionId, {
                limit: 100
            })){
                lineItemResponses.push(lineItem);
            }
            await this.upsertCheckoutSessionLineItems(lineItemResponses, checkoutSessionId, accountId, syncTimestamp);
        }
    }
    async upsertCheckoutSessionLineItems(lineItems, checkoutSessionId, accountId, syncTimestamp) {
        await this.backfillPrices(lineItems.map((lineItem)=>lineItem.price?.id?.toString() ?? void 0).filter((id)=>id !== void 0), accountId);
        const modifiedLineItems = lineItems.map((lineItem)=>{
            const priceId = typeof lineItem.price === "object" && lineItem.price?.id ? lineItem.price.id.toString() : lineItem.price?.toString() || null;
            return {
                ...lineItem,
                price: priceId,
                checkout_session: checkoutSessionId
            };
        });
        await this.postgresClient.upsertManyWithTimestampProtection(modifiedLineItems, "checkout_session_line_items", accountId, syncTimestamp);
    }
    async markDeletedSubscriptionItems(subscriptionId, currentSubItemIds) {
        let prepared = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yesql$40$7$2e$0$2e$0$2f$node_modules$2f$yesql$2f$yesql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pg"])(`
    select id from "stripe"."subscription_items"
    where subscription = :subscriptionId and COALESCE(deleted, false) = false;
    `)({
            subscriptionId
        });
        const { rows } = await this.postgresClient.query(prepared.text, prepared.values);
        const deletedIds = rows.filter(({ id })=>currentSubItemIds.includes(id) === false);
        if (deletedIds.length > 0) {
            const ids = deletedIds.map(({ id })=>id);
            prepared = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yesql$40$7$2e$0$2e$0$2f$node_modules$2f$yesql$2f$yesql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pg"])(`
      update "stripe"."subscription_items"
      set _raw_data = jsonb_set(_raw_data, '{deleted}', 'true'::jsonb)
      where id=any(:ids::text[]);
      `)({
                ids
            });
            const { rowCount } = await this.postgresClient.query(prepared.text, prepared.values);
            return {
                rowCount: rowCount || 0
            };
        } else {
            return {
                rowCount: 0
            };
        }
    }
    async upsertSubscriptionSchedules(subscriptionSchedules, accountId, backfillRelatedEntities, syncTimestamp) {
        if (backfillRelatedEntities ?? this.config.backfillRelatedEntities) {
            const customerIds = getUniqueIds(subscriptionSchedules, "customer");
            await this.backfillCustomers(customerIds, accountId);
        }
        const rows = await this.postgresClient.upsertManyWithTimestampProtection(subscriptionSchedules, "subscription_schedules", accountId, syncTimestamp);
        return rows;
    }
    async upsertSubscriptions(subscriptions, accountId, backfillRelatedEntities, syncTimestamp) {
        if (backfillRelatedEntities ?? this.config.backfillRelatedEntities) {
            const customerIds = getUniqueIds(subscriptions, "customer");
            await this.backfillCustomers(customerIds, accountId);
        }
        await this.expandEntity(subscriptions, "items", (id)=>this.stripe.subscriptionItems.list({
                subscription: id,
                limit: 100
            }));
        const rows = await this.postgresClient.upsertManyWithTimestampProtection(subscriptions, "subscriptions", accountId, syncTimestamp);
        const allSubscriptionItems = subscriptions.flatMap((subscription)=>subscription.items.data);
        await this.upsertSubscriptionItems(allSubscriptionItems, accountId, syncTimestamp);
        const markSubscriptionItemsDeleted = [];
        for (const subscription of subscriptions){
            const subscriptionItems = subscription.items.data;
            const subItemIds = subscriptionItems.map((x)=>x.id);
            markSubscriptionItemsDeleted.push(this.markDeletedSubscriptionItems(subscription.id, subItemIds));
        }
        await Promise.all(markSubscriptionItemsDeleted);
        return rows;
    }
    async deleteRemovedActiveEntitlements(customerId, currentActiveEntitlementIds) {
        const prepared = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yesql$40$7$2e$0$2e$0$2f$node_modules$2f$yesql$2f$yesql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pg"])(`
      delete from "stripe"."active_entitlements"
      where customer = :customerId and id <> ALL(:currentActiveEntitlementIds::text[]);
      `)({
            customerId,
            currentActiveEntitlementIds
        });
        const { rowCount } = await this.postgresClient.query(prepared.text, prepared.values);
        return {
            rowCount: rowCount || 0
        };
    }
    async upsertFeatures(features, accountId, syncTimestamp) {
        return this.postgresClient.upsertManyWithTimestampProtection(features, "features", accountId, syncTimestamp);
    }
    async backfillFeatures(featureIds, accountId) {
        const missingFeatureIds = await this.postgresClient.findMissingEntries("features", featureIds);
        await this.fetchMissingEntities(missingFeatureIds, (id)=>this.stripe.entitlements.features.retrieve(id)).then((features)=>this.upsertFeatures(features, accountId)).catch((err)=>{
            this.config.logger?.error(err, "Failed to backfill features");
            throw err;
        });
    }
    async upsertActiveEntitlements(customerId, activeEntitlements, accountId, backfillRelatedEntities, syncTimestamp) {
        if (backfillRelatedEntities ?? this.config.backfillRelatedEntities) {
            await Promise.all([
                this.backfillCustomers(getUniqueIds(activeEntitlements, "customer"), accountId),
                this.backfillFeatures(getUniqueIds(activeEntitlements, "feature"), accountId)
            ]);
        }
        const entitlements = activeEntitlements.map((entitlement)=>({
                id: entitlement.id,
                object: entitlement.object,
                feature: typeof entitlement.feature === "string" ? entitlement.feature : entitlement.feature.id,
                customer: customerId,
                livemode: entitlement.livemode,
                lookup_key: entitlement.lookup_key
            }));
        return this.postgresClient.upsertManyWithTimestampProtection(entitlements, "active_entitlements", accountId, syncTimestamp);
    }
    async findOrCreateManagedWebhook(url, params) {
        const webhookParams = {
            enabled_events: this.getSupportedEventTypes(),
            ...params
        };
        const accountId = await this.getAccountId();
        const lockKey = `webhook:${accountId}:${url}`;
        return this.postgresClient.withAdvisoryLock(lockKey, async ()=>{
            const existingWebhook = await this.getManagedWebhookByUrl(url);
            if (existingWebhook) {
                try {
                    const stripeWebhook = await this.stripe.webhookEndpoints.retrieve(existingWebhook.id);
                    if (stripeWebhook.status === "enabled") {
                        return stripeWebhook;
                    }
                    this.config.logger?.info({
                        webhookId: existingWebhook.id
                    }, "Webhook is disabled, deleting and will recreate");
                    await this.stripe.webhookEndpoints.del(existingWebhook.id);
                    await this.postgresClient.delete("_managed_webhooks", existingWebhook.id);
                } catch (error) {
                    const stripeError = error;
                    if (stripeError?.statusCode === 404 || stripeError?.code === "resource_missing") {
                        this.config.logger?.warn({
                            error,
                            webhookId: existingWebhook.id
                        }, "Webhook not found in Stripe (404), removing from database");
                        await this.postgresClient.delete("_managed_webhooks", existingWebhook.id);
                    } else {
                        this.config.logger?.error({
                            error,
                            webhookId: existingWebhook.id
                        }, "Error retrieving webhook from Stripe, keeping in database");
                        throw error;
                    }
                }
            }
            const allDbWebhooks = await this.listManagedWebhooks();
            for (const dbWebhook of allDbWebhooks){
                if (dbWebhook.url !== url) {
                    this.config.logger?.info({
                        webhookId: dbWebhook.id,
                        oldUrl: dbWebhook.url,
                        newUrl: url
                    }, "Webhook URL mismatch, deleting");
                    try {
                        await this.stripe.webhookEndpoints.del(dbWebhook.id);
                    } catch (error) {
                        this.config.logger?.warn({
                            error,
                            webhookId: dbWebhook.id
                        }, "Failed to delete old webhook from Stripe");
                    }
                    await this.postgresClient.delete("_managed_webhooks", dbWebhook.id);
                }
            }
            try {
                const stripeWebhooks = await this.stripe.webhookEndpoints.list({
                    limit: 100
                });
                for (const stripeWebhook of stripeWebhooks.data){
                    const isManagedByMetadata = stripeWebhook.metadata?.managed_by?.toLowerCase().replace(/[\s\-]+/g, "") === "stripesync";
                    const normalizedDescription = stripeWebhook.description?.toLowerCase().replace(/[\s\-]+/g, "") || "";
                    const isManagedByDescription = normalizedDescription.includes("stripesync");
                    if (isManagedByMetadata || isManagedByDescription) {
                        const existsInDb = allDbWebhooks.some((dbWebhook)=>dbWebhook.id === stripeWebhook.id);
                        if (!existsInDb) {
                            this.config.logger?.warn({
                                webhookId: stripeWebhook.id,
                                url: stripeWebhook.url
                            }, "Found orphaned managed webhook in Stripe, deleting");
                            await this.stripe.webhookEndpoints.del(stripeWebhook.id);
                        }
                    }
                }
            } catch (error) {
                this.config.logger?.warn({
                    error
                }, "Failed to check for orphaned webhooks");
            }
            const webhook = await this.stripe.webhookEndpoints.create({
                ...webhookParams,
                url,
                // Always set metadata to identify managed webhooks
                metadata: {
                    ...webhookParams.metadata,
                    managed_by: "stripe-sync"
                }
            });
            const accountId2 = await this.getAccountId();
            await this.upsertManagedWebhooks([
                webhook
            ], accountId2);
            return webhook;
        });
    }
    async getManagedWebhook(id) {
        const accountId = await this.getAccountId();
        const result = await this.postgresClient.query(`SELECT * FROM "stripe"."_managed_webhooks" WHERE id = $1 AND "account_id" = $2`, [
            id,
            accountId
        ]);
        return result.rows.length > 0 ? result.rows[0] : null;
    }
    /**
   * Get a managed webhook by URL and account ID.
   * Used for race condition recovery: when createManagedWebhook hits a unique constraint
   * violation (another instance created the webhook), we need to fetch the existing webhook
   * by URL since we only know the URL, not the ID of the webhook that won the race.
   */ async getManagedWebhookByUrl(url) {
        const accountId = await this.getAccountId();
        const result = await this.postgresClient.query(`SELECT * FROM "stripe"."_managed_webhooks" WHERE url = $1 AND "account_id" = $2`, [
            url,
            accountId
        ]);
        return result.rows.length > 0 ? result.rows[0] : null;
    }
    async listManagedWebhooks() {
        const accountId = await this.getAccountId();
        const result = await this.postgresClient.query(`SELECT * FROM "stripe"."_managed_webhooks" WHERE "account_id" = $1 ORDER BY created DESC`, [
            accountId
        ]);
        return result.rows;
    }
    async updateManagedWebhook(id, params) {
        const webhook = await this.stripe.webhookEndpoints.update(id, params);
        const accountId = await this.getAccountId();
        await this.upsertManagedWebhooks([
            webhook
        ], accountId);
        return webhook;
    }
    async deleteManagedWebhook(id) {
        await this.stripe.webhookEndpoints.del(id);
        return this.postgresClient.delete("_managed_webhooks", id);
    }
    async upsertManagedWebhooks(webhooks, accountId, syncTimestamp) {
        const filteredWebhooks = webhooks.map((webhook)=>{
            const filtered = {};
            for (const prop of managedWebhookSchema.properties){
                if (prop in webhook) {
                    filtered[prop] = webhook[prop];
                }
            }
            return filtered;
        });
        return this.postgresClient.upsertManyWithTimestampProtection(filteredWebhooks, "_managed_webhooks", accountId, syncTimestamp);
    }
    async backfillSubscriptions(subscriptionIds, accountId) {
        const missingSubscriptionIds = await this.postgresClient.findMissingEntries("subscriptions", subscriptionIds);
        await this.fetchMissingEntities(missingSubscriptionIds, (id)=>this.stripe.subscriptions.retrieve(id)).then((subscriptions)=>this.upsertSubscriptions(subscriptions, accountId));
    }
    backfillSubscriptionSchedules = async (subscriptionIds, accountId)=>{
        const missingSubscriptionIds = await this.postgresClient.findMissingEntries("subscription_schedules", subscriptionIds);
        await this.fetchMissingEntities(missingSubscriptionIds, (id)=>this.stripe.subscriptionSchedules.retrieve(id)).then((subscriptionSchedules)=>this.upsertSubscriptionSchedules(subscriptionSchedules, accountId));
    };
    /**
   * Stripe only sends the first 10 entries by default, the option will actively fetch all entries.
   */ async expandEntity(entities, property, listFn) {
        if (!this.config.autoExpandLists) return;
        for (const entity of entities){
            if (entity[property]?.has_more) {
                const allData = [];
                for await (const fetchedEntity of listFn(entity.id)){
                    allData.push(fetchedEntity);
                }
                entity[property] = {
                    ...entity[property],
                    data: allData,
                    has_more: false
                };
            }
        }
    }
    async fetchMissingEntities(ids, fetch) {
        if (!ids.length) return [];
        const entities = [];
        for (const id of ids){
            const entity = await fetch(id);
            entities.push(entity);
        }
        return entities;
    }
};
function chunkArray(array, chunkSize) {
    const result = [];
    for(let i = 0; i < array.length; i += chunkSize){
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}
;
;
;
;
;
var __filename2 = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$url__$5b$external$5d$__$28$url$2c$__cjs$29$__["fileURLToPath"])(__TURBOPACK__import$2e$meta__.url);
var __dirname2 = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(__filename2);
async function doesTableExist(client, schema, tableName) {
    const result = await client.query(`SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = $1
      AND table_name = $2
    )`, [
        schema,
        tableName
    ]);
    return result.rows[0]?.exists || false;
}
async function renameMigrationsTableIfNeeded(client, schema = "stripe", logger) {
    const oldTableExists = await doesTableExist(client, schema, "migrations");
    const newTableExists = await doesTableExist(client, schema, "_migrations");
    if (oldTableExists && !newTableExists) {
        logger?.info("Renaming migrations table to _migrations");
        await client.query(`ALTER TABLE "${schema}"."migrations" RENAME TO "_migrations"`);
        logger?.info("Successfully renamed migrations table");
    }
}
async function cleanupSchema(client, schema, logger) {
    logger?.warn(`Migrations table is empty - dropping and recreating schema "${schema}"`);
    await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
    await client.query(`CREATE SCHEMA "${schema}"`);
    logger?.info(`Schema "${schema}" has been reset`);
}
async function connectAndMigrate(client, migrationsDirectory, config, logOnError = false) {
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(migrationsDirectory)) {
        config.logger?.info(`Migrations directory ${migrationsDirectory} not found, skipping`);
        return;
    }
    const optionalConfig = {
        schemaName: "stripe",
        tableName: "_migrations"
    };
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pg$2d$node$2d$migrations$40$0$2e$0$2e$8$2f$node_modules$2f$pg$2d$node$2d$migrations$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["migrate"])({
            client
        }, migrationsDirectory, optionalConfig);
    } catch (error) {
        if (logOnError && error instanceof Error) {
            config.logger?.error(error, "Migration error:");
        } else {
            throw error;
        }
    }
}
async function runMigrations(config) {
    const client = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pg$40$8$2e$23$2e$0$2f$node_modules$2f$pg$29$__["Client"]({
        connectionString: config.databaseUrl,
        ssl: config.ssl,
        connectionTimeoutMillis: 1e4
    });
    const schema = "stripe";
    try {
        await client.connect();
        await client.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
        await renameMigrationsTableIfNeeded(client, schema, config.logger);
        const tableExists = await doesTableExist(client, schema, "_migrations");
        if (tableExists) {
            const migrationCount = await client.query(`SELECT COUNT(*) as count FROM "${schema}"."_migrations"`);
            const isEmpty = migrationCount.rows[0]?.count === "0";
            if (isEmpty) {
                await cleanupSchema(client, schema, config.logger);
            }
        }
        config.logger?.info("Running migrations");
        await connectAndMigrate(client, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].resolve(__dirname2, "./migrations"), config);
    } catch (err) {
        config.logger?.error(err, "Error running migrations");
        throw err;
    } finally{
        await client.end();
        config.logger?.info("Finished migrations");
    }
}
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
]})(),
"[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/.pnpm/mongoose@9.11.1/node_modules/mongoose)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("mongoose-2764eb8cb99becc3", () => require("mongoose-2764eb8cb99becc3"));

module.exports = mod;
}),
"[externals]/pg [external] (pg, cjs, [project]/node_modules/.pnpm/pg@8.23.0/node_modules/pg)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("pg-71df57fbe79e18ab", () => require("pg-71df57fbe79e18ab"));

module.exports = mod;
}),
"[project]/node_modules/.pnpm/yesql@7.0.0/node_modules/yesql/yesql.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const matchQuoted = /('[^']*(\\.[^'\\]*)*')/;
const matchDoubleQuoted = /("[^"]*(\\.[^"\\]*)*")/;
const readSqlFiles = (dir, options = {})=>{
    return fs.readdirSync(dir).filter((file)=>{
        return file.endsWith('.sql');
    }).map((file)=>{
        return {
            name: file,
            content: fs.readFileSync(path.resolve(dir, file), 'utf8').replace(/\r\n/g, '\n')
        };
    }).reduce((acc, value)=>{
        acc[value.name] = value.content;
        value.content.split('\n\n').reduce((sqls, lines)=>{
            if (lines.trim().startsWith('--')) {
                sqls.push(lines);
            } else if (sqls.length) {
                sqls[sqls.length - 1] += '\n\n' + lines;
            }
            return sqls;
        }, []).forEach((sql)=>{
            if (sql.trim().startsWith('--')) {
                const sqlName = sql.split('\n')[0].trim().substring(2).trim();
                if (acc[sqlName]) {
                    throw new Error('Duplicate SQL query name "' + sqlName + '" found, please rename other one.');
                }
                acc[sqlName] = options.type ? module.exports[options.type](sql, options) : sql;
            }
        });
        return acc;
    }, {});
};
const pg = (query, options = {})=>{
    return (data = {})=>{
        const values = [];
        const text = query// remove -- comments
        .replace(/--.*$/gm, '')// remove /* */ comments
        .replace(/\/\*(\*(?!\/)|[^*])*\*\//g, '').split(matchQuoted).map((part)=>{
            if (!part || matchQuoted.test(part)) {
                return part;
            } else {
                return part.split(matchDoubleQuoted).map((part)=>{
                    if (!part || matchDoubleQuoted.test(part)) {
                        return part;
                    } else {
                        return part.replace(/(::?)([a-zA-Z0-9_]+)/g, (_, prefix, key)=>{
                            if (prefix !== ':') {
                                return prefix + key;
                            } else if (key in data) {
                                values.push(data[key]);
                                return '$' + values.length;
                            } else if (options.useNullForMissing) {
                                values.push(null);
                                return '$' + values.length;
                            } else {
                                return errorMissingValue(key, query, data);
                            }
                        });
                    }
                }).join('');
            }
        }).join('').trim();
        return {
            text,
            values
        };
    };
};
const mysql = (query, options = {})=>{
    return (data = {})=>{
        const values = [];
        const sql = query.split(matchQuoted).map((part)=>{
            if (!part || matchQuoted.test(part)) {
                return part;
            } else {
                return part.split(matchDoubleQuoted).map((part)=>{
                    if (!part || matchDoubleQuoted.test(part)) {
                        return part;
                    } else {
                        return part.replace(/(::?)([a-zA-Z0-9_]+)/g, (_, prefix, key)=>{
                            if (key in data) {
                                values.push(data[key]);
                                return prefix.replace(/:/g, '?');
                            } else if (options.useNullForMissing) {
                                values.push(null);
                                return prefix.replace(/:/g, '?');
                            } else {
                                return errorMissingValue(key, query, data);
                            }
                        });
                    }
                }).join('');
            }
        }).join('').trim();
        return {
            sql,
            values
        };
    };
};
const errorMissingValue = (key, query, data)=>{
    throw new Error('Missing value for statement.\n' + key + ' not provided for statement:\n' + query + '\nthis was provided:\n' + JSON.stringify(data));
};
module.exports = readSqlFiles;
module.exports.pg = pg;
module.exports.mysql = mysql;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1xt_ja50nhc90._.js.map