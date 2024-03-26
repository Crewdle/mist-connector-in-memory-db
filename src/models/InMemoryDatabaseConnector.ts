import type { IDatabaseLayout, IKeyValueDatabaseConnector, IKeyValueDatabaseTableConnector, IValueType } from '@crewdle/web-sdk-types';
import { InMemoryDatabaseTableConnector } from './InMemoryDatabaseTableConnector';

/**
 * The in-memory database connector.
 */
export class InMemoryDatabaseConnector implements IKeyValueDatabaseConnector {
  /**
   * The tables.
   * @ignore
   */
  private tables?: Map<string, InMemoryDatabaseTableConnector<any>>;

  /**
   * The constructor.
   * @param dbKey The database key.
   * @param layout The database layout.
   */
  constructor(
    private readonly dbKey: string,
    private readonly layout: IDatabaseLayout
  ) {}

  /**
   * Open the database.
   * @param migration The migration function.
   * @returns A promise that resolves when the database is open.
   */
  async open(): Promise<void> {
    this.tables = new Map();
    for (const tableName of Object.keys(this.layout)) {
      this.tables.set(tableName, new InMemoryDatabaseTableConnector());
    }
  }

  /**
   * Close the database.
   */
  close(): void {
    this.tables = undefined;
  }

  /**
   * Check if the database has a table.
   * @param tableName The table name.
   * @returns True if the database has the table.
   */
  hasTable(tableName: string): boolean {
    return this.tables?.has(tableName) ?? false;
  }

  /**
   * Create a table.
   * @param tableName The table name.
   */
  createTable(tableName: string): void {
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
  getTableConnector<T extends IValueType>(tableName: string): IKeyValueDatabaseTableConnector<T> {
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
