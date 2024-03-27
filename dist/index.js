(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  InMemoryDatabaseConnector: () => (/* reexport */ InMemoryDatabaseConnector),
  InMemoryDatabaseTableConnector: () => (/* reexport */ InMemoryDatabaseTableConnector)
});

;// CONCATENATED MODULE: external "crypto"
const external_crypto_namespaceObject = require("crypto");
var external_crypto_default = /*#__PURE__*/__webpack_require__.n(external_crypto_namespaceObject);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-node/native.js

/* harmony default export */ const esm_node_native = ({
  randomUUID: (external_crypto_default()).randomUUID
});
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-node/rng.js

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    external_crypto_default().randomFillSync(rnds8Pool);
    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-node/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const esm_node_stringify = ((/* unused pure expression or super */ null && (stringify)));
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-node/v4.js




function v4(options, buf, offset) {
  if (esm_node_native.randomUUID && !buf && !options) {
    return esm_node_native.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

/* harmony default export */ const esm_node_v4 = (v4);
;// CONCATENATED MODULE: ./src/helpers/helpers.ts
/**
 * Orders the values based on the query
 * @param values The values to order
 * @param query The query
 * @ignore
 */
function orderValues(values, query) {
    if (query?.orderBy) {
        values.sort((a, b) => {
            if (a[query.orderBy.key] < b[query.orderBy.key] && query.orderBy.direction === 'desc' ||
                a[query.orderBy.key] > b[query.orderBy.key] && query.orderBy.direction === 'asc') {
                return -1;
            }
            else if (a[query.orderBy.key] > b[query.orderBy.key] && query.orderBy.direction === 'desc' ||
                a[query.orderBy.key] < b[query.orderBy.key] && query.orderBy.direction === 'asc') {
                return 1;
            }
            else {
                return 0;
            }
        });
    }
}
/**
 * Checks if the value matches the query
 * @param value The value to check
 * @param query The query
 * @returns True if the value matches the query
 * @ignore
 */
function isMatchingQuery(value, query) {
    if (query?.where) {
        const anyValue = value;
        switch (query.where.operator) {
            case '==':
                if (anyValue[query.where.key] === query.where.value) {
                    return true;
                }
                break;
            case '!=':
                if (anyValue[query.where.key] !== query.where.value) {
                    return true;
                }
                break;
            case '<':
                if (anyValue[query.where.key] < query.where.value) {
                    return true;
                }
                break;
            case '<=':
                if (anyValue[query.where.key] <= query.where.value) {
                    return true;
                }
                break;
            case '>':
                if (anyValue[query.where.key] > query.where.value) {
                    return true;
                }
                break;
            case '>=':
                if (anyValue[query.where.key] >= query.where.value) {
                    return true;
                }
                break;
            case 'between':
                if (anyValue[query.where.key] >= query.where.value[0] && anyValue[query.where.key] <= query.where.value[1]) {
                    return true;
                }
                break;
            case 'in':
                if (query.where.value.includes(anyValue[query.where.key])) {
                    return true;
                }
                break;
            case 'not-in':
                if (!query.where.value.includes(anyValue[query.where.key])) {
                    return true;
                }
                break;
        }
        return false;
    }
    return true;
}

;// CONCATENATED MODULE: ./src/models/InMemoryDatabaseTableConnector.ts


/**
 * The in-memory database table connector.
 */
class InMemoryDatabaseTableConnector {
    /**
     * The store.
     * @ignore
     */
    store = new Map();
    /**
     * Get a value.
     * @param key The key.
     * @returns A promise that resolves with the value or undefined if the value does not exist.
     */
    async get(key) {
        return this.store.get(key);
    }
    /**
     * Set a value.
     * @param key The key.
     * @param value The value.
     * @returns A promise that resolves with the value.
     */
    async set(key, value) {
        const valueWithId = {
            ...value,
            id: key,
        };
        this.store.set(key, valueWithId);
        return valueWithId;
    }
    /**
     * Add a value. The value will be assigned a new key.
     * @param value The value.
     * @returns A promise that resolves with the value.
     */
    async add(value) {
        const key = esm_node_v4();
        const valueWithId = {
            ...value,
            id: key,
        };
        this.store.set(key, valueWithId);
        return valueWithId;
    }
    /**
     * Delete a value.
     * @param key The key.
     * @returns A promise that resolves when the value is deleted.
     */
    async delete(key) {
        this.store.delete(key);
    }
    /**
     * Clear all values.
     * @returns A promise that resolves when all values are cleared.
     */
    async clear() {
        this.store.clear();
    }
    /**
     * List values.
     * @param query The query.
     * @returns A promise that resolves with the values.
     */
    async list(query) {
        const values = Array.from(this.store.values());
        if (!query) {
            return values;
        }
        orderValues(values, query);
        const result = [];
        for (const value of Array.from(this.store.values())) {
            if (isMatchingQuery(value, query)) {
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
    }
    /**
     * Count values.
     * @param query The query.
     * @returns A promise that resolves with the count.
     */
    async count(query) {
        if (!query) {
            return this.store.size;
        }
        let count = 0;
        for (const value of Array.from(this.store.values())) {
            if (isMatchingQuery(value, query)) {
                count += 1;
            }
        }
        return count;
    }
    /**
     * Calculate the size of all values.
     * @returns A promise that resolves with the size.
     */
    async calculateSize() {
        let size = 0;
        for (const value of Array.from(this.store.values())) {
            const objectSize = new Blob([JSON.stringify(value)]).size;
            size += objectSize;
        }
        return size;
    }
}

;// CONCATENATED MODULE: ./src/models/InMemoryDatabaseConnector.ts

/**
 * The in-memory database connector.
 */
class InMemoryDatabaseConnector {
    dbKey;
    layout;
    /**
     * The tables.
     * @ignore
     */
    tables;
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
    async open() {
        this.tables = new Map();
        for (const tableName of Object.keys(this.layout)) {
            this.tables.set(tableName, new InMemoryDatabaseTableConnector());
        }
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
        return this.tables?.has(tableName) ?? false;
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
        this.tables.set(tableName, new InMemoryDatabaseTableConnector());
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
            this.tables.set(tableName, new InMemoryDatabaseTableConnector());
        }
        const table = this.tables.get(tableName);
        if (!table) {
            throw new Error('Table not found');
        }
        return table;
    }
}

;// CONCATENATED MODULE: ./src/index.ts



/******/ 	return __webpack_exports__;
/******/ })()
;
});