import {UserRepository} from '../repositories/user.repository';

export class ExistUserByUserName {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async run(username: string): Promise<boolean> {
    const user = await this.userRepository.getByUserName(username);

    return Boolean(user);
  }
}
