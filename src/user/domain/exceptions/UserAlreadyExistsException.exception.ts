import {NOT_ACCEPTABLE} from 'http-status';

export class UserAlreadyExistsException extends Error {
  readonly code: string;
  readonly status: number;

  constructor() {
    super('User already exists');

    this.code = 'User already exists';
    this.status = NOT_ACCEPTABLE;
  }
}
