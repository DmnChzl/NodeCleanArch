import type User from '@/core/domain/User';
import UserBuilder from '@/core/domain/UserBuilder';

export interface UserEntity {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export const toEntity = (user: User): [string, string, string, string] => [
  user.getId(),
  user.getFirstName(),
  user.getLastName(),
  user.getEmail()
];

export const fromEntity = (user: UserEntity): User => {
  return new UserBuilder()
    .withId(user.id)
    .withFirstName(user['first_name'])
    .withLastName(user['last_name'])
    .withEmail(user.email)
    .build();
};
