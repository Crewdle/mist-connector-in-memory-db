import type { IDatabaseTableQuery, IValueType } from '@crewdle/web-sdk-types';
export declare function orderValues<T extends IValueType>(values: T[], query?: IDatabaseTableQuery): void;
export declare function isMatchingQuery<T extends IValueType>(value: T, query?: IDatabaseTableQuery): boolean;
