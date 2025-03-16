import { fromDomain } from '../domain/UserMapper';
import { Left, Right, type Either } from '../exceptions/Either';
import { StatusError } from '../exceptions/StatusError';
import type { UserOutput } from '../interfaces/UserOutput';
import type { UserRepository } from '../interfaces/UserRepositoryPort';

class GetOneUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<Either<StatusError, UserOutput>> {
    const user = await this.userRepository.findById(id);
    if (user === null) {
      const statusError = new StatusError('User Not Found', 404);
      return Left.create(statusError);
    }
    return Right.create(fromDomain(user));
  }
}

export default GetOneUser;
