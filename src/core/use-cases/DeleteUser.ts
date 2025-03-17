import { Left, Right, type Either } from '../exceptions/Either';
import { UserNotFoundError } from '../exceptions/UserNotFoundError';
import type { UserRepository } from '../interfaces/UserRepositoryPort';

class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<Either<UserNotFoundError, number>> {
    const existingUser = await this.userRepository.findById(id);
    if (existingUser === null) {
      const userError = new UserNotFoundError(id);
      return Left.create(userError);
    }

    const changes = await this.userRepository.delete(id);
    return Right.create(changes);
  }
}

export default DeleteUser;
