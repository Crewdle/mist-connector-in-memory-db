import type { IDatabaseLayout, IKeyValueDatabaseConnector, IKeyValueDatabaseTableConnector, IValueType } from '@crewdle/web-sdk-types';
/**
 * The in-memory database connector.
 * @category Connector
 */
export declare class InMemoryDatabaseConnector implements IKeyValueDatabaseConnector {
    private readonly dbKey;
    private readonly layout;
    /**
     * The tables.
     * @ignore
     */
    private tables?;
    /**
     * The constructor.
     * @param dbKey The database key.
     * @param layout The database layout.
     */
    constructor(dbKey: string, layout: IDatabaseLayout);
    /**
     * Open the database.
     * @param migration The migration function.
     * @returns A promise that resolves when the database is open.
     */
    open(): Promise<void>;
    /**
     * Close the database.
     */
    close(): void;
    /**
     * Check if the database has a table.
     * @param tableName The table name.
     * @returns True if the database has the table.
     */
    hasTable(tableName: string): boolean;
    /**
     * Create a table.
     * @param tableName The table name.
     */
    createTable(tableName: string): void;
    /**
     * Get a table connector.
     * @param tableName The table name.
     * @returns The table connector.
     */
    getTableConnector<T extends IValueType>(tableName: string): IKeyValueDatabaseTableConnector<T>;
}
