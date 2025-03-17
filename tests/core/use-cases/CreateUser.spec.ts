import UserBuilder from '@/core/domain/UserBuilder';
import type { Left, Right } from '@/core/exceptions/Either';
import { UserConflictError } from '@/core/exceptions/UserConflictError';
import type { UserOutput } from '@/core/interfaces/UserOutput';
import type { UserRepository } from '@/core/interfaces/UserRepositoryPort';
import CreateUser from '@/core/use-cases/CreateUser';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('CreateUser', () => {
  let repository: UserRepository;
  let useCase: CreateUser;

  beforeEach(() => {
    repository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    };
    useCase = new CreateUser(repository);
  });

  it('should returns left error', async () => {
    const errorMessage = 'Internal Server Error';
    const userInput = { firstName: 'John', lastName: 'Doe', email: 'john.doe@pm.me' };

    repository.create = vi.fn().mockRejectedValue(new Error(errorMessage));
    const result = await useCase.execute(userInput);

    expect(result.isLeft()).toBe(true);
    expect((result as Left<Error>).error).toBeInstanceOf(UserConflictError);
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

    repository.create = vi.fn().mockResolvedValue(user);
    const result = await useCase.execute(userInput);

    expect(result.isRight()).toBe(true);
    expect((result as Right<UserOutput>).value).toEqual(userOutput);
  });
});
