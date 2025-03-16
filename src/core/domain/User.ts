class User {
  private _id: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;

  constructor(id: string, firstName: string, lastName: string, email: string) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
  }

  getId(): string {
    return this._id;
  }

  setId(id: string) {
    this._id = id;
  }

  getFirstName(): string {
    return this._firstName;
  }

  setFirstName(firstName: string) {
    this._firstName = firstName;
  }

  getLastName(): string {
    return this._lastName;
  }

  setLastName(lastName: string) {
    this._lastName = lastName;
  }

  getEmail(): string {
    return this._email;
  }

  setEmail(email: string) {
    this._email = email;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}

export default User;
