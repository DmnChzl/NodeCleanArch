export class UserNotFoundError extends Error {
  constructor(userId: string) {
    super(`User With ID '${userId}' Not Found`);
  }
}
