import {Repository, User} from './user.types';

export class UserRepository implements Repository {
  private users: User[];
  private currentId: number;
  constructor() {
    this.users = [];
    this.currentId = 1;
  }

  getAll() {
    return this.users;
  }
  getOneById(userId: string) {
    try {
      const id = Number(userId);
      const user = this.users.find((x: User) => x.id === id);
      return user;
    } catch {
      throw new Error('Error Occurred');
    }
  }
  create(user: User) {
    if (!user) {
      throw new Error('Error on create');
    }
    try {
      const newUser = {
        ...user,
        id: this.currentId,
      };

      this.users.push(newUser);
      this.currentId += 1;
      return newUser;
    } catch (error) {
      throw new Error('Error on create');
    }
  }
  update(userId: string) {
    //
  }
  delete(userId: string) {
    try {
      const id = Number(userId);
      const users = this.users.filter((x: User) => x.id !== id);
      this.users = users;
    } catch {
      throw new Error('Error Occurred');
    }
  }
}
