import { Left, Right, type Either } from '../exceptions/Either';
import { StatusError } from '../exceptions/StatusError';
import type { UserRepository } from '../interfaces/UserRepositoryPort';

class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<Either<StatusError, number>> {
    const existingUser = await this.userRepository.findById(id);
    if (existingUser === null) {
      const statusError = new StatusError('User Not Found', 404);
      return Left.create(statusError);
    }

    const changes = await this.userRepository.delete(id);
    return Right.create(changes);
  }
}

export default DeleteUser;
