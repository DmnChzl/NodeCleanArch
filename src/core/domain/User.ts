import type EmailAddress from '../value-objects/EmailAddress';
import type UserName from '../value-objects/UserName';

class User {
  private _id: string;
  private _firstName: UserName;
  private _lastName: UserName;
  private _email: EmailAddress;

  constructor(id: string, firstName: UserName, lastName: UserName, email: EmailAddress) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
  }

  getId(): string {
    return this._id;
  }

  getFirstName(): string {
    return this._firstName.value;
  }

  getLastName(): string {
    return this._lastName.value;
  }

  getEmail(): string {
    return this._email.value;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}

export default User;
