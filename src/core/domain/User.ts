import type EmailAddress from '../value-objects/EmailAddress';
import type UserName from '../value-objects/UserName';

class User {
  private _firstName: UserName;
  private _lastName: UserName;
  private _email: EmailAddress;

  constructor(
    readonly id: string,
    firstName: UserName,
    lastName: UserName,
    email: EmailAddress
  ) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
  }

  get firstName(): string {
    return this._firstName.value;
  }

  get lastName(): string {
    return this._lastName.value;
  }

  get email(): string {
    return this._email.value;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}

export default User;
