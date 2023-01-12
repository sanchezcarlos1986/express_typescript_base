import {User} from '../../../../domain/entities/user.entity';
import {UserRepository} from '../../../../domain/repositories/user.repository';

export class InMemoryUserRepository implements UserRepository {
  private userData: User[] = [];

  async getAll(): Promise<User[]> {
    return this.userData;
  }

  async save(user: User): Promise<User> {
    this.userData.push(user);

    return user;
  }

  async getByUserName(username: string): Promise<User | null> {
    const userFound = this.userData.find(user => user.username === username);

    if (!userFound) return null;

    return userFound;
  }

  async update(user: User): Promise<User> {
    const userFound = this.getById(user.id);

    const currentUserIndex = this.userData.findIndex(
      item => item.id === user.id,
    );
    const updatedUser = {
      ...userFound,
      ...user,
    };
    this.userData[currentUserIndex] = updatedUser;

    return user;
  }

  async delete(id: string): Promise<void> {
    const filteredUsers = this.userData.filter((user: User) => user.id !== id);

    this.userData = filteredUsers;
  }

  async getById(id: string): Promise<User | null> {
    const userFound = this.userData.find((user: User) => user.id === id);

    if (!userFound) return null;

    return userFound;
  }
}
