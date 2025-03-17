import type { UserInput } from '../interfaces/UserInput';
import type { UserOutput } from '../interfaces/UserOutput';
import type User from './User';
import UserBuilder from './UserBuilder';

export const toDomain = (user: UserInput): User => {
  return new UserBuilder().withFirstName(user.firstName).withLastName(user.lastName).withEmail(user.email).build();
};

export const fromDomain = (user: User): UserOutput => {
  const fullName = `${user.getFirstName()} ${user.getLastName()}`;
  return { id: user.getId(), fullName, email: user.getEmail() };
};
