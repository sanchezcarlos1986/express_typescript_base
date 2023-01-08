export class UserAlreadyExistsException extends Error {
  readonly code: string;

  constructor() {
    super('User already exists');

    this.code = 'User already exists';
  }
}
