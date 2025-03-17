export class UserConflictError extends Error {
  constructor(userId: string) {
    super(`Conflict With User ID '${userId}'`);
  }
}
