import UserBuilder from '@/core/domain/UserBuilder';
import type { Left, Right } from '@/core/exceptions/Either';
import { UserNotFoundError } from '@/core/exceptions/UserNotFoundError';
import type { UserOutput } from '@/core/interfaces/UserOutput';
import type { UserRepository } from '@/core/interfaces/UserRepositoryPort';
import UpdateUser from '@/core/use-cases/UpdateUser';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('UpdateUser', () => {
  let repository: UserRepository;
  let useCase: UpdateUser;

  beforeEach(() => {
    repository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    };
    useCase = new UpdateUser(repository);
  });

  it('should returns left error', async () => {
    const userInput = { firstName: 'John', lastName: 'Doe', email: 'john.doe@pm.me' };

    repository.findById = vi.fn().mockResolvedValue(null);
    const result = await useCase.execute('82p47nrr', userInput);

    expect(result.isLeft()).toBe(true);
    expect((result as Left<Error>).error).toBeInstanceOf(UserNotFoundError);
  });

  it('should returns right value', async () => {
    const userInput = { firstName: 'John', lastName: 'Doe', email: 'john.doe@pm.me' };
    const user = new UserBuilder()
      .withId('82p47nrr')
      .withFirstName('John')
      .withLastName('Doe')
      .withEmail('john.doe@pm.me')
      .build();
    const userOutput = { id: '82p47nrr', fullName: 'John Doe', email: 'john.doe@pm.me' };

    repository.findById = vi.fn().mockResolvedValue(user);
    repository.update = vi.fn().mockResolvedValue(user);
    const result = await useCase.execute('82p47nrr', userInput);

    expect(result.isRight()).toBe(true);
    expect((result as Right<UserOutput>).value).toEqual(userOutput);
  });
});
