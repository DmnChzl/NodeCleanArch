import type { UserEntity } from '@/infrastructure/persistence/UserEntity';
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

/*
type ToTuple<T> = { [K in keyof T]: T[K] } extends { [K in keyof T]: infer U } ? U[] : unknown[];

export const toEntity = (user: User): ToTuple<UserEntity> => [
  user.getId(),
  user.getFirstName(),
  user.getLastName(),
  user.getEmail()
];
*/

export const toEntity = (user: User): string[] => [
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
