import User from './User';

class UserBuilder {
  private _id: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;

  constructor() {
    this._id = '';
    this._firstName = '';
    this._lastName = '';
    this._email = '';
  }

  withId(id: string) {
    this._id = id;
    return this;
  }

  withFirstName(firstName: string) {
    this._firstName = firstName;
    return this;
  }

  withLastName(lastName: string) {
    this._lastName = lastName;
    return this;
  }

  withEmail(email: string) {
    this._email = email;
    return this;
  }

  build(): User {
    return new User(this._id, this._firstName, this._lastName, this._email);
  }
}

export default UserBuilder;
