import { fromDomain, toDomain } from '../domain/UserMapper';
import { Left, Right, type Either } from '../exceptions/Either';
import { StatusError } from '../exceptions/StatusError';
import type { UserInput } from '../interfaces/UserInput';
import type { UserOutput } from '../interfaces/UserOutput';
import type { UserRepository } from '../interfaces/UserRepositoryPort';

class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(userInput: UserInput): Promise<Either<StatusError, UserOutput>> {
    const id = Math.random().toString(32).substring(2, 10);
    const user = toDomain(userInput);
    user.setId(id);

    try {
      const createdUser = await this.userRepository.create(user).then(fromDomain);
      return Right.create(createdUser);
    } catch (err) {
      const statusError = new StatusError((err as Error).message, 500);
      return Left.create(statusError);
    }
  }
}

export default CreateUser;
