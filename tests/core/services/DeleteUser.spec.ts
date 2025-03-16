import UserBuilder from '@/core/domain/UserBuilder';
import type { Left, Right } from '@/core/exceptions/Either';
import type { StatusError } from '@/core/exceptions/StatusError';
import type { UserRepository } from '@/core/interfaces/UserRepositoryPort';
import DeleteUser from '@/core/services/DeleteUser';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('DeleteUser', () => {
  let repository: UserRepository;
  let useCase: DeleteUser;

  beforeEach(() => {
    repository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    };
    useCase = new DeleteUser(repository);
  });

  it('should returns left error', async () => {
    repository.findById = vi.fn().mockResolvedValue(null);
    const result = await useCase.execute('82p47nrr');

    expect(result.isLeft()).toBe(true);
    expect((result as Left<StatusError>).error.statusCode).toEqual(404);
  });

  it('should returns right value', async () => {
    const user = new UserBuilder()
      .withId('82p47nrr')
      .withFirstName('John')
      .withLastName('Doe')
      .withEmail('john.doe@pm.me')
      .build();

    repository.findById = vi.fn().mockResolvedValue(user);
    repository.delete = vi.fn().mockResolvedValue(1);
    const result = await useCase.execute('82p47nrr');

    expect(result.isRight()).toBe(true);
    expect((result as Right<number>).value).toEqual(1);
  });
});
