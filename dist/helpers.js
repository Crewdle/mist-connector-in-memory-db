"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMatchingQuery = exports.orderValues = void 0;
/**
 * Orders the values based on the query
 * @param values The values to order
 * @param query The query
 * @ignore
 */
function orderValues(values, query) {
    if (query === null || query === void 0 ? void 0 : query.orderBy) {
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
exports.orderValues = orderValues;
/**
 * Checks if the value matches the query
 * @param value The value to check
 * @param query The query
 * @returns True if the value matches the query
 * @ignore
 */
function isMatchingQuery(value, query) {
    if (query === null || query === void 0 ? void 0 : query.where) {
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
exports.isMatchingQuery = isMatchingQuery;
