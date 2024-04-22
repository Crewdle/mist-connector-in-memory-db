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
exports.InMemoryDatabaseTableConnector = void 0;
const uuid_1 = require("uuid");
const helpers_1 = require("../helpers");
/**
 * The in-memory database table connector.
 */
class InMemoryDatabaseTableConnector {
    constructor() {
        /**
         * The store.
         * @ignore
         */
        this.store = new Map();
    }
    /**
     * Get a value.
     * @param key The key.
     * @returns A promise that resolves with the value or undefined if the value does not exist.
     */
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.store.get(key);
        });
    }
    /**
     * Set a value.
     * @param key The key.
     * @param value The value.
     * @returns A promise that resolves with the value.
     */
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const valueWithId = Object.assign(Object.assign({}, value), { id: key });
            this.store.set(key, valueWithId);
            return valueWithId;
        });
    }
    /**
     * Add a value. The value will be assigned a new key.
     * @param value The value.
     * @returns A promise that resolves with the value.
     */
    add(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = (0, uuid_1.v4)();
            const valueWithId = Object.assign(Object.assign({}, value), { id: key });
            this.store.set(key, valueWithId);
            return valueWithId;
        });
    }
    /**
     * Delete a value.
     * @param key The key.
     * @returns A promise that resolves when the value is deleted.
     */
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            this.store.delete(key);
        });
    }
    /**
     * Clear all values.
     * @returns A promise that resolves when all values are cleared.
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            this.store.clear();
        });
    }
    /**
     * List values.
     * @param query The query.
     * @returns A promise that resolves with the values.
     */
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = Array.from(this.store.values());
            if (!query) {
                return values;
            }
            (0, helpers_1.orderValues)(values, query);
            const result = [];
            for (const value of Array.from(this.store.values())) {
                if ((0, helpers_1.isMatchingQuery)(value, query)) {
                    if (query.offset && result.length < query.offset) {
                        continue;
                    }
                    result.push(value);
                }
                if (query.limit && result.length >= query.limit) {
                    break;
                }
            }
            return result;
        });
    }
    /**
     * Count values.
     * @param query The query.
     * @returns A promise that resolves with the count.
     */
    count(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!query) {
                return this.store.size;
            }
            let count = 0;
            for (const value of Array.from(this.store.values())) {
                if ((0, helpers_1.isMatchingQuery)(value, query)) {
                    count += 1;
                }
            }
            return count;
        });
    }
    /**
     * Calculate the size of all values.
     * @returns A promise that resolves with the size.
     */
    calculateSize() {
        return __awaiter(this, void 0, void 0, function* () {
            let size = 0;
            for (const value of Array.from(this.store.values())) {
                const objectSize = new Blob([JSON.stringify(value)]).size;
                size += objectSize;
            }
            return size;
        });
    }
}
exports.InMemoryDatabaseTableConnector = InMemoryDatabaseTableConnector;
