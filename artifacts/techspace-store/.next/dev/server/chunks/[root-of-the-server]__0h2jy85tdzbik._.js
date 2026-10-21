module.exports = [
(()=>{"use strict";return[
"[externals]/pg [external] (pg, esm_import, [project]/node_modules/.pnpm/pg@8.23.0/node_modules/pg)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
var mod = await __turbopack_context__.y("pg-71df57fbe79e18ab");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/create.js [instrumentation] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.runSchemaQuery = exports.runCreateQuery = exports.createDb = void 0;
const pg = __turbopack_context__.r("[externals]/pg [external] (pg, cjs, [project]/node_modules/.pnpm/pg@8.23.0/node_modules/pg)");
const with_connection_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/with-connection.js [instrumentation] (ecmascript)");
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
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/file-name-parser.js [instrumentation] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/files-loader.js [instrumentation] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadMigrationFiles = void 0;
const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const util_1 = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
const migration_file_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/migration-file.js [instrumentation] (ecmascript)");
const validation_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/validation.js [instrumentation] (ecmascript)");
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
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/index.js [instrumentation] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MigrationError = exports.loadMigrationFiles = exports.migrate = exports.createDb = void 0;
var create_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/create.js [instrumentation] (ecmascript)");
Object.defineProperty(exports, "createDb", {
    enumerable: true,
    get: function() {
        return create_1.createDb;
    }
});
var migrate_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/migrate.js [instrumentation] (ecmascript)");
Object.defineProperty(exports, "migrate", {
    enumerable: true,
    get: function() {
        return migrate_1.migrate;
    }
});
var files_loader_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/files-loader.js [instrumentation] (ecmascript)");
Object.defineProperty(exports, "loadMigrationFiles", {
    enumerable: true,
    get: function() {
        return files_loader_1.loadMigrationFiles;
    }
});
var types_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/types.js [instrumentation] (ecmascript)");
Object.defineProperty(exports, "MigrationError", {
    enumerable: true,
    get: function() {
        return types_1.MigrationError;
    }
});
}),
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/load-sql-from-js.js [instrumentation] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/migrate.js [instrumentation] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.migrate = void 0;
const pg = __turbopack_context__.r("[externals]/pg [external] (pg, cjs, [project]/node_modules/.pnpm/pg@8.23.0/node_modules/pg)");
const sql_template_strings_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/sql-template-strings@2.2.2/node_modules/sql-template-strings/index.js [instrumentation] (ecmascript)");
const create_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/create.js [instrumentation] (ecmascript)");
const files_loader_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/files-loader.js [instrumentation] (ecmascript)");
const run_migration_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/run-migration.js [instrumentation] (ecmascript)");
const validation_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/validation.js [instrumentation] (ecmascript)");
const with_connection_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/with-connection.js [instrumentation] (ecmascript)");
const with_lock_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/with-lock.js [instrumentation] (ecmascript)");
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
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/migration-file.js [instrumentation] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadMigrationFile = void 0;
const util_1 = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
const load_sql_from_js_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/load-sql-from-js.js [instrumentation] (ecmascript)");
const file_name_parser_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/file-name-parser.js [instrumentation] (ecmascript)");
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
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/run-migration.js [instrumentation] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.runMigration = void 0;
const sql_template_strings_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/sql-template-strings@2.2.2/node_modules/sql-template-strings/index.js [instrumentation] (ecmascript)");
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
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/types.js [instrumentation] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MigrationError = void 0;
class MigrationError extends Error {
}
exports.MigrationError = MigrationError;
}),
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/validation.js [instrumentation] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/with-connection.js [instrumentation] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/with-lock.js [instrumentation] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/node_modules/.pnpm/sql-template-strings@2.2.2/node_modules/sql-template-strings/index.js [instrumentation] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/node_modules/.pnpm/stripe-replit-sync@1.0.0_stripe@23.0.0_@types+node@25.9.6_/node_modules/stripe-replit-sync/dist/index.js [instrumentation] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/stripe@23.0.0_@types+node@25.9.6/node_modules/stripe/esm/stripe.esm.node.js [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yesql$40$7$2e$0$2e$0$2f$node_modules$2f$yesql$2f$yesql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/yesql@7.0.0/node_modules/yesql/yesql.js [instrumentation] (ecmascript)");
// src/database/postgres.ts
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pg$40$8$2e$23$2e$0$2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/.pnpm/pg@8.23.0/node_modules/pg)");
// src/utils/hashApiKey.ts
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pg$2d$node$2d$migrations$40$0$2e$0$2e$8$2f$node_modules$2f$pg$2d$node$2d$migrations$2f$dist$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pg-node-migrations@0.0.8/node_modules/pg-node-migrations/dist/index.js [instrumentation] (ecmascript)");
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
        const prepared = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yesql$40$7$2e$0$2e$0$2f$node_modules$2f$yesql$2f$yesql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pg"])(`
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
                    const prepared = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yesql$40$7$2e$0$2e$0$2f$node_modules$2f$yesql$2f$yesql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pg"])(upsertSql, {
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
        const prepared = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yesql$40$7$2e$0$2e$0$2f$node_modules$2f$yesql$2f$yesql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pg"])(`
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
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].errors.StripeRateLimitError) {
        return true;
    }
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].errors.StripeAPIError) {
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
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].errors.StripeConnectionError) {
        return true;
    }
    return false;
}
function getRetryAfterMs(error) {
    if (!(error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].errors.StripeRateLimitError)) {
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
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].errors.StripeRateLimitError) {
        return "rate_limit";
    }
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].errors.StripeAPIError) {
        return `api_error_${error.statusCode}`;
    }
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].errors.StripeConnectionError) {
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
        const baseStripe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"](config.stripeSecretKey, {
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
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].errors.StripeAPIError && err.code === "resource_missing") {
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
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].errors.StripeAPIError && err.code === "resource_missing") {
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
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$23$2e$0$2e$0_$40$types$2b$node$40$25$2e$9$2e$6$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].errors.StripeAPIError && err.code === "resource_missing") {
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
        const prepared = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yesql$40$7$2e$0$2e$0$2f$node_modules$2f$yesql$2f$yesql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pg"])(`select id from "stripe"."customers" WHERE COALESCE(deleted, false) <> true;`)([]);
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
        let prepared = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yesql$40$7$2e$0$2e$0$2f$node_modules$2f$yesql$2f$yesql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pg"])(`
    select id from "stripe"."subscription_items"
    where subscription = :subscriptionId and COALESCE(deleted, false) = false;
    `)({
            subscriptionId
        });
        const { rows } = await this.postgresClient.query(prepared.text, prepared.values);
        const deletedIds = rows.filter(({ id })=>currentSubItemIds.includes(id) === false);
        if (deletedIds.length > 0) {
            const ids = deletedIds.map(({ id })=>id);
            prepared = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yesql$40$7$2e$0$2e$0$2f$node_modules$2f$yesql$2f$yesql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pg"])(`
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
        const prepared = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$yesql$40$7$2e$0$2e$0$2f$node_modules$2f$yesql$2f$yesql$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["pg"])(`
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
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pg$2d$node$2d$migrations$40$0$2e$0$2e$8$2f$node_modules$2f$pg$2d$node$2d$migrations$2f$dist$2f$index$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["migrate"])({
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
"[externals]/pg [external] (pg, cjs, [project]/node_modules/.pnpm/pg@8.23.0/node_modules/pg)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("pg-71df57fbe79e18ab", () => require("pg-71df57fbe79e18ab"));

module.exports = mod;
}),
"[project]/node_modules/.pnpm/yesql@7.0.0/node_modules/yesql/yesql.js [instrumentation] (ecmascript)", ((__turbopack_context__, module, exports) => {

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

//# sourceMappingURL=%5Broot-of-the-server%5D__0h2jy85tdzbik._.js.map