import { fromDomain } from '../domain/UserMapper';
import { Left, Right, type Either } from '../exceptions/Either';
import { UserNotFoundError } from '../exceptions/UserNotFoundError';
import type { UserOutput } from '../interfaces/UserOutput';
import type { UserRepository } from '../interfaces/UserRepositoryPort';

class GetOneUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<Either<UserNotFoundError, UserOutput>> {
    const user = await this.userRepository.findById(id);
    if (user === null) {
      const userError = new UserNotFoundError(id);
      return Left.create(userError);
    }
    return Right.create(fromDomain(user));
  }
}

export default GetOneUser;
