import {UserRepository} from '../../domain/repositories/user.repository';

export class UserDeleter {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async run(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
