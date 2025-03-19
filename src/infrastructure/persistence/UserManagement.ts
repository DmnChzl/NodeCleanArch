import type { DatabaseSync } from 'node:sqlite';
import SqlManager from '../providers/SqlManager';
import type { UserEntity } from './UserEntity';
import {
  CREATE_TABLE_USERS,
  CREATE_USER,
  DELETE_USER,
  SELECT_ALL_USERS,
  SELECT_USER,
  UPDATE_USER
} from './UserQueries';

class UserManagement extends SqlManager {
  constructor(database: DatabaseSync) {
    super(database);
    this.createTable();
  }

  createTable() {
    this.execute(CREATE_TABLE_USERS);
  }

  createUser(id: string, firstName: string, lastName: string, email: string) {
    const statement = this.mutate(CREATE_USER);
    const { changes } = statement(id, firstName, lastName, email);
    console.log('createUser::changes', changes);
  }

  selectAllUsers() {
    const statement = this.queryAll<UserEntity>(SELECT_ALL_USERS);
    return statement();
  }

  selectUserById(id: string) {
    const statement = this.query<UserEntity>(SELECT_USER);
    return statement(id);
  }

  updateUserById(id: string, firstName: string, lastName: string, email: string) {
    const statement = this.mutate(UPDATE_USER);
    const { changes } = statement(firstName, lastName, email, id);
    console.log('updateUserById::changes', changes);
  }

  deleteUserById(id: string): number {
    const statement = this.mutate(DELETE_USER);
    const { changes } = statement(id);
    return changes;
  }
}

export default UserManagement;
