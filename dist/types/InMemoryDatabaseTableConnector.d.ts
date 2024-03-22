import { IDatabaseTableQuery, IKeyValueDatabaseTableConnector, IValueType, ValueTypeOmitId } from '@crewdle/web-sdk';
export declare class InMemoryDatabaseTableConnector<T extends IValueType> implements IKeyValueDatabaseTableConnector<T> {
    private store;
    get(key: string): Promise<T | undefined>;
    set(key: string, value: ValueTypeOmitId<T>): Promise<T>;
    add(value: ValueTypeOmitId<T>): Promise<T>;
    delete(key: string): Promise<void>;
    clear(): Promise<void>;
    list(query?: IDatabaseTableQuery | undefined): Promise<T[]>;
    count(query?: IDatabaseTableQuery | undefined): Promise<number>;
    calculateSize(): Promise<number>;
}
