import { v4 } from 'uuid';

import { IDatabaseTableQuery, IKeyValueDatabaseTableConnector, IValueType, ValueTypeOmitId } from '@crewdle/web-sdk';
import { isMatchingQuery, orderValues } from './helpers';

export class InMemoryDatabaseTableConnector<T extends IValueType> implements IKeyValueDatabaseTableConnector<T> {
  private store: Map<string, T> = new Map();

  async get(key: string): Promise<T | undefined> {
    return this.store.get(key);
  }

  async set(key: string, value: ValueTypeOmitId<T>): Promise<T> {
    const valueWithId = {
      ...value,
      id: key,
    } as T;

    this.store.set(key, valueWithId);
    return valueWithId;
  }

  async add(value: ValueTypeOmitId<T>): Promise<T> {
    const key = v4();
    const valueWithId = {
      ...value,
      id: key,
    } as T;

    this.store.set(key, valueWithId);
    return valueWithId;
  }

 async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }

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

  async calculateSize(): Promise<number> {
    let size = 0;
    for (const value of Array.from(this.store.values())) {
      const objectSize = new Blob([JSON.stringify(value)]).size;
      size += objectSize;
    }
    return size;
  }
}
