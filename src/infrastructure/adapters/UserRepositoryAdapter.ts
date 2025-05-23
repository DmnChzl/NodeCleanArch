import User from '@/core/domain/User';
import type { UserRepository } from '@/core/interfaces/UserRepositoryPort';
import { fromEntity, toEntity } from '../persistence/UserEntity';
import type UserManagement from '../persistence/UserManagement';

class UserRepositoryAdapter implements UserRepository {
  constructor(private userPersistance: UserManagement) {}

  async findAll(): Promise<User[]> {
    const results = this.userPersistance.selectAllUsers();
    return results.map(fromEntity);
  }

  async findById(id: string): Promise<User | null> {
    const result = this.userPersistance.selectUserById(id);
    return result ? fromEntity(result) : null;
  }

  async create(user: User): Promise<User> {
    this.userPersistance.createUser(...toEntity(user));
    return user;
  }

  async update(user: User): Promise<User> {
    this.userPersistance.updateUserById(...toEntity(user));
    return user;
  }

  async delete(id: string): Promise<number> {
    return this.userPersistance.deleteUserById(id);
  }
}

export default UserRepositoryAdapter;
