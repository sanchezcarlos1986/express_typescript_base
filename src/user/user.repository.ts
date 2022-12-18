import {Repository, User} from './user.types';

export class UserRepository implements Repository {
  private users: User[] | any[];
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
  create(userData: User) {
    if (!userData) {
      throw new Error('Error on create');
    }
    try {
      const newUser = {
        ...userData,
        id: this.currentId,
      };

      this.users.push(newUser);
      this.currentId += 1;
      return newUser;
    } catch (error) {
      throw new Error('Error on create');
    }
  }
  update(userId: string, newUserData: User) {
    try {
      const id = Number(userId);
      const currentUserIndex = this.users.findIndex((x: User) => x.id === id);

      if (currentUserIndex < 0) {
        return null;
      }

      const currentUserData = this.users.find((x: User) => x.id === id);
      const updatedUser = {
        ...currentUserData,
        ...newUserData,
      };

      this.users[currentUserIndex] = updatedUser;
      return updatedUser;
    } catch {
      throw new Error('Error Occurred');
    }
  }
  delete(userId: string) {
    try {
      const id = Number(userId);
      const currentUser = this.users.find((x: User) => x.id === id);

      if (!currentUser) {
        return null;
      }

      const users = this.users.filter((x: User) => x.id !== id);
      this.users = users;
      return this.users;
    } catch {
      throw new Error('Error Occurred');
    }
  }
}
