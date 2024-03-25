import { v4 } from 'uuid';

import { IDatabaseTableQuery, IKeyValueDatabaseTableConnector, IValueType, ValueTypeOmitId } from '@crewdle/web-sdk-types';
import { isMatchingQuery, orderValues } from '../helpers/helpers';

/**
 * The in-memory database table connector.
 * @category Connector
 */
export class InMemoryDatabaseTableConnector<T extends IValueType> implements IKeyValueDatabaseTableConnector<T> {
  /**
   * The store.
   * @ignore
   */
  private store: Map<string, T> = new Map();

  /**
   * Get a value.
   * @param key The key.
   * @returns A promise that resolves with the value or undefined if the value does not exist.
   */
  async get(key: string): Promise<T | undefined> {
    return this.store.get(key);
  }

  /**
   * Set a value.
   * @param key The key.
   * @param value The value.
   * @returns A promise that resolves with the value.
   */
  async set(key: string, value: ValueTypeOmitId<T>): Promise<T> {
    const valueWithId = {
      ...value,
      id: key,
    } as T;

    this.store.set(key, valueWithId);
    return valueWithId;
  }

  /**
   * Add a value. The value will be assigned a new key.
   * @param value The value.
   * @returns A promise that resolves with the value.
   */
  async add(value: ValueTypeOmitId<T>): Promise<T> {
    const key = v4();
    const valueWithId = {
      ...value,
      id: key,
    } as T;

    this.store.set(key, valueWithId);
    return valueWithId;
  }

  /**
   * Delete a value.
   * @param key The key.
   * @returns A promise that resolves when the value is deleted.
   */
  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  /**
   * Clear all values.
   * @returns A promise that resolves when all values are cleared.
   */
  async clear(): Promise<void> {
    this.store.clear();
  }

  /**
   * List values.
   * @param query The query.
   * @returns A promise that resolves with the values.
   */
  async list(query?: IDatabaseTableQuery | undefined): Promise<T[]> {
    const values = Array.from(this.store.values());

    if (!query) {
      return values;
    }

    orderValues(values, query);

    const result: T[] = [];
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
  async count(query?: IDatabaseTableQuery | undefined): Promise<number> {
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
  async calculateSize(): Promise<number> {
    let size = 0;
    for (const value of Array.from(this.store.values())) {
      const objectSize = new Blob([JSON.stringify(value)]).size;
      size += objectSize;
    }
    return size;
  }
}
