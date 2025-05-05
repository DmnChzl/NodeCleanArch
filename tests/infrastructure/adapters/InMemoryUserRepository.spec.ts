import type User from '@/core/domain/User';
import UserBuilder from '@/core/domain/UserBuilder';
import InMemoryUserRepository from '@/infrastructure/adapters/InMemoryUserRepository';
import { beforeEach, describe, expect, it } from 'vitest';

describe('InMemoryUserRepository', () => {
  let repository: InMemoryUserRepository;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
  });

  it('should find all users', async () => {
    const users = await repository.findAll();
    expect(users).toHaveLength(1);
  });

  it('should find user by id', async () => {
    const user = await repository.findById('82p47nrr');
    expect((user as User).email).toEqual('john.doe@pm.me');
  });

  it('should returns null', async () => {
    const user = await repository.findById('28b74urr');
    expect(user).toBe(null);
  });

  it('should create new user', async () => {
    const user = new UserBuilder()
      .withId('28b74urr')
      .withFirstName('Jane')
      .withLastName('Doe')
      .withEmail('jane.doe@pm.me')
      .build();

    const createdUser = await repository.create(user);
    expect(createdUser.toString()).toEqual(user.toString());
  });

  it('should update existing user', async () => {
    const user = new UserBuilder()
      .withId('82p47nrr')
      .withFirstName('Jane')
      .withLastName('Doe')
      .withEmail('jane.doe@pm.me')
      .build();

    const updatedUser = await repository.update(user);
    expect(updatedUser.toString()).toEqual(user.toString());
  });

  it('should delete existing user', async () => {
    const changes = await repository.delete('82p47nrr');
    expect(changes).toEqual(1);
  });
});
