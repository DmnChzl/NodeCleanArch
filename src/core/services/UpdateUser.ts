import { fromDomain, toDomain } from '../domain/UserMapper';
import { Left, Right, type Either } from '../exceptions/Either';
import { StatusError } from '../exceptions/StatusError';
import type { UserInput } from '../interfaces/UserInput';
import type { UserOutput } from '../interfaces/UserOutput';
import type { UserRepository } from '../interfaces/UserRepositoryPort';

class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, userInput: UserInput): Promise<Either<StatusError, UserOutput>> {
    try {
      const existingUser = await this.userRepository.findById(id);
      if (existingUser === null) {
        const statusError = new StatusError('User Not Found', 404);
        return Left.create(statusError);
      }

      const user = toDomain(userInput);
      user.setId(id);
      const updatedUser = await this.userRepository.update(user).then(fromDomain);
      return Right.create(updatedUser);
    } catch (err) {
      const statusError = new StatusError((err as Error).message, 500);
      return Left.create(statusError);
    }
  }
}

export default UpdateUser;
