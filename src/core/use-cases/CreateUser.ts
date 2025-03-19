import { fromDomain, toDomain } from '../domain/UserMapper';
import { Left, Right, type Either } from '../exceptions/Either';
import { GenericUserError } from '../exceptions/GenericUserError';
import { UserConflictError } from '../exceptions/UserConflictError';
import type { UserInput } from '../interfaces/UserInput';
import type { UserOutput } from '../interfaces/UserOutput';
import type { UserRepository } from '../interfaces/UserRepositoryPort';

class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(userInput: UserInput): Promise<Either<UserConflictError, UserOutput>> {
    const id = Math.random().toString(32).substring(2, 10);

    try {
      const user = toDomain({ ...userInput, id });
      const createdUser = await this.userRepository.create(user).then(fromDomain);
      return Right.create(createdUser);
    } catch (err) {
      if (err instanceof GenericUserError) {
        return Left.create(err);
      }

      const userError = new UserConflictError(id);
      return Left.create(userError);
    }
  }
}

export default CreateUser;
