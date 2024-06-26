import type { IDatabaseTableQuery, IValueType } from '@crewdle/web-sdk-types';

/**
 * Orders the values based on the query
 * @param values The values to order
 * @param query The query
 * @ignore
 */
export function orderValues<T extends IValueType>(values: T[], query?: IDatabaseTableQuery): void {
  if (query?.orderBy) {
    values.sort((a: any, b: any) => {
      if (
        a[query.orderBy!.key] < b[query.orderBy!.key] && query.orderBy!.direction === 'desc' ||
        a[query.orderBy!.key] > b[query.orderBy!.key] && query.orderBy!.direction === 'asc'
      ) {
        return -1;
      } else if (
        a[query.orderBy!.key] > b[query.orderBy!.key] && query.orderBy!.direction === 'desc' ||
        a[query.orderBy!.key] < b[query.orderBy!.key] && query.orderBy!.direction === 'asc'
      ) {
        return 1;
      } else {
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
export function isMatchingQuery<T extends IValueType>(value: T, query?: IDatabaseTableQuery): boolean {
  if (query?.where) {
    const anyValue = value as any;
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
