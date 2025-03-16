import type { DatabaseSync, SupportedValueType } from 'node:sqlite';

class SqlManager {
  private database;

  constructor(database: DatabaseSync) {
    this.database = database;
  }

  execute(sql: string) {
    this.database.exec(sql);
  }

  query<T>(sql: string) {
    const statement = this.database.prepare(sql);
    return (...params: SupportedValueType[]): T => statement.get(...params) as T;
  }

  queryAll<T>(sql: string) {
    const statement = this.database.prepare(sql);
    return (...params: SupportedValueType[]): Array<T> => statement.all(...params) as Array<T>;
  }

  mutate(sql: string) {
    const statement = this.database.prepare(sql);
    return (...params: SupportedValueType[]): { changes: number } => {
      const result = statement.run(...params);
      return { changes: Number(result.changes) };
    };
  }
}

export default SqlManager;
