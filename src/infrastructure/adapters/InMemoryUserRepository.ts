import User from '@/core/domain/User';
import UserBuilder from '@/core/domain/UserBuilder';
import type { UserRepository } from '@/core/interfaces/UserRepositoryPort';

class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  constructor() {
    this.setup();
  }

  private setup() {
    const user = new UserBuilder()
      .withId('82p47nrr')
      .withFirstName('John')
      .withLastName('Doe')
      .withEmail('john.doe@pm.me')
      .build();
    this.users = [...this.users, user];
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.getId() === id) ?? null;
  }

  async create(user: User): Promise<User> {
    this.users = [...this.users, user];
    return user;
  }

  async update(user: User): Promise<User> {
    this.users = this.users.map(u => {
      return u.getId() === user.getId() ? user : u;
    });
    return user;
  }

  async delete(id: string): Promise<number> {
    const prevLength = this.users.length;
    this.users = this.users.filter(u => u.getId() !== id);
    const nextLength = this.users.length;
    return prevLength - nextLength;
  }
}

export default InMemoryUserRepository;
