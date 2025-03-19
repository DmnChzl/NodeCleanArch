import { GenericUserError } from '../exceptions/GenericUserError';

const REG_EXP = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/;

class EmailAddress {
  constructor(readonly value: string) {
    if (!this.isValid(value)) throw new GenericUserError('Invalid Email Address');
  }

  private isValid(value: string): boolean {
    return REG_EXP.test(value);
  }
}

export default EmailAddress;
