import { fromDomain, toDomain } from '../domain/UserMapper';
import { Left, Right, type Either } from '../exceptions/Either';
import { UserConflictError } from '../exceptions/UserConflictError';
import { UserNotFoundError } from '../exceptions/UserNotFoundError';
import type { UserInput } from '../interfaces/UserInput';
import type { UserOutput } from '../interfaces/UserOutput';
import type { UserRepository } from '../interfaces/UserRepositoryPort';

class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, userInput: UserInput): Promise<Either<UserNotFoundError | UserConflictError, UserOutput>> {
    try {
      const existingUser = await this.userRepository.findById(id);
      if (existingUser === null) {
        const userError = new UserNotFoundError(id);
        return Left.create(userError);
      }

      const user = toDomain(userInput);
      user.setId(id);
      const updatedUser = await this.userRepository.update(user).then(fromDomain);
      return Right.create(updatedUser);
    } catch (err) {
      const userError = new UserConflictError(id);
      return Left.create(userError);
    }
  }
}

export default UpdateUser;
