"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDatabaseConnector = void 0;
const InMemoryDatabaseTableConnector_1 = require("./InMemoryDatabaseTableConnector");
/**
 * The in-memory database connector.
 */
class InMemoryDatabaseConnector {
    /**
     * The constructor.
     * @param dbKey The database key.
     * @param layout The database layout.
     */
    constructor(dbKey, layout) {
        this.dbKey = dbKey;
        this.layout = layout;
    }
    /**
     * Open the database.
     * @param migration The migration function.
     * @returns A promise that resolves when the database is open.
     */
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            this.tables = new Map();
            for (const tableName of Object.keys(this.layout)) {
                this.tables.set(tableName, new InMemoryDatabaseTableConnector_1.InMemoryDatabaseTableConnector());
            }
        });
    }
    /**
     * Close the database.
     */
    close() {
        this.tables = undefined;
    }
    /**
     * Check if the database has a table.
     * @param tableName The table name.
     * @returns True if the database has the table.
     */
    hasTable(tableName) {
        var _a, _b;
        return (_b = (_a = this.tables) === null || _a === void 0 ? void 0 : _a.has(tableName)) !== null && _b !== void 0 ? _b : false;
    }
    /**
     * Create a table.
     * @param tableName The table name.
     */
    createTable(tableName) {
        if (!this.tables) {
            throw new Error('Database not open');
        }
        if (this.tables.has(tableName)) {
            throw new Error('Table already exists');
        }
        this.tables.set(tableName, new InMemoryDatabaseTableConnector_1.InMemoryDatabaseTableConnector());
    }
    /**
     * Get a table connector.
     * @param tableName The table name.
     * @returns The table connector.
     */
    getTableConnector(tableName) {
        if (!this.tables) {
            throw new Error('Database not open');
        }
        if (!this.tables.has(tableName)) {
            this.tables.set(tableName, new InMemoryDatabaseTableConnector_1.InMemoryDatabaseTableConnector());
        }
        const table = this.tables.get(tableName);
        if (!table) {
            throw new Error('Table not found');
        }
        return table;
    }
}
exports.InMemoryDatabaseConnector = InMemoryDatabaseConnector;
