import User from '../domain/User';

export interface UserRepository {
  findAll: () => Promise<User[]>;
  findById: (id: string) => Promise<User | null>;
  create: (user: User) => Promise<User>;
  update: (user: User) => Promise<User>;
  delete: (id: string) => Promise<number>;
}
