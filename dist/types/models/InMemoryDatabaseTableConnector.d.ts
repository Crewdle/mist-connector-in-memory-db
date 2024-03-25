import { IDatabaseTableQuery, IKeyValueDatabaseTableConnector, IValueType, ValueTypeOmitId } from '@crewdle/web-sdk-types';
/**
 * The in-memory database table connector.
 * @category Connector
 */
export declare class InMemoryDatabaseTableConnector<T extends IValueType> implements IKeyValueDatabaseTableConnector<T> {
    /**
     * The store.
     * @ignore
     */
    private store;
    /**
     * Get a value.
     * @param key The key.
     * @returns A promise that resolves with the value or undefined if the value does not exist.
     */
    get(key: string): Promise<T | undefined>;
    /**
     * Set a value.
     * @param key The key.
     * @param value The value.
     * @returns A promise that resolves with the value.
     */
    set(key: string, value: ValueTypeOmitId<T>): Promise<T>;
    /**
     * Add a value. The value will be assigned a new key.
     * @param value The value.
     * @returns A promise that resolves with the value.
     */
    add(value: ValueTypeOmitId<T>): Promise<T>;
    /**
     * Delete a value.
     * @param key The key.
     * @returns A promise that resolves when the value is deleted.
     */
    delete(key: string): Promise<void>;
    /**
     * Clear all values.
     * @returns A promise that resolves when all values are cleared.
     */
    clear(): Promise<void>;
    /**
     * List values.
     * @param query The query.
     * @returns A promise that resolves with the values.
     */
    list(query?: IDatabaseTableQuery | undefined): Promise<T[]>;
    /**
     * Count values.
     * @param query The query.
     * @returns A promise that resolves with the count.
     */
    count(query?: IDatabaseTableQuery | undefined): Promise<number>;
    /**
     * Calculate the size of all values.
     * @returns A promise that resolves with the size.
     */
    calculateSize(): Promise<number>;
}
