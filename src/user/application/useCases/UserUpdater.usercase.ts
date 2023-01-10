import {User} from '../../domain/entities/user.entity';
import {UserRepository} from '../../domain/repositories/user.repository';

export class UserUpdaterUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async run(user: User): Promise<User> {
    const updatedUser: User = await this.userRepository.update(user);

    return updatedUser;
  }
}
