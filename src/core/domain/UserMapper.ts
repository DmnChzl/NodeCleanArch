import type { UserInput } from '../interfaces/UserInput';
import type { UserOutput } from '../interfaces/UserOutput';
import type User from './User';
import UserBuilder from './UserBuilder';

type UserInputWithId = UserInput & { id: string };

export const toDomain = (user: UserInputWithId): User => {
  return new UserBuilder()
    .withId(user.id)
    .withFirstName(user.firstName)
    .withLastName(user.lastName)
    .withEmail(user.email)
    .build();
};

export const fromDomain = (user: User): UserOutput => {
  const fullName = `${user.firstName} ${user.lastName}`;
  return { id: user.id, fullName, email: user.email };
};
