import {User} from '../../../domain/entities/user.entity';
import {UserRepository} from '../../../domain/repositories/user.repository';

export class InMemoryUserRepository implements UserRepository {
  private readonly userData: User[] = [];

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
    return user;
  }

  async delete(user: User): Promise<void> {
    //
  }

  async getById(id: string): Promise<User | null> {
    return null;
  }
}
