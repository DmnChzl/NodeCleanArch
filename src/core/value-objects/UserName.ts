import { GenericUserError } from '../exceptions/GenericUserError';

class UserName {
  constructor(readonly value: string) {
    if (!this.isValid(value)) throw new GenericUserError('Invalid Name');
  }

  private isValid(value: string): boolean {
    return value.length >= 2 && value.length <= 32;
  }
}

export default UserName;
