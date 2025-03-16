import { fromDomain } from '../domain/UserMapper';
import type { UserOutput } from '../interfaces/UserOutput';
import type { UserRepository } from '../interfaces/UserRepositoryPort';

class GetAllUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<UserOutput[]> {
    return this.userRepository.findAll().then(users => users.map(fromDomain));
  }
}

export default GetAllUsers;
