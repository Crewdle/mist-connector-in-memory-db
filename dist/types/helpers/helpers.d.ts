import type { IDatabaseTableQuery, IValueType } from '@crewdle/web-sdk-types';
/**
 * Orders the values based on the query
 * @param values The values to order
 * @param query The query
 * @ignore
 */
export declare function orderValues<T extends IValueType>(values: T[], query?: IDatabaseTableQuery): void;
/**
 * Checks if the value matches the query
 * @param value The value to check
 * @param query The query
 * @returns True if the value matches the query
 * @ignore
 */
export declare function isMatchingQuery<T extends IValueType>(value: T, query?: IDatabaseTableQuery): boolean;
