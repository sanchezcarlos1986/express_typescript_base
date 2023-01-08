import {User} from '../../../domain/entities/user.entity';
import {UserRepository} from '../../../domain/repositories/user.repository';

export class UserGetterUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async run(): Promise<User[]> {
    const users: User[] = await this.userRepository.getAll();

    return users;
  }
}
