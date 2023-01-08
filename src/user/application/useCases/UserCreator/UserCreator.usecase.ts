import {User} from '../../../domain/entities/user.entity';
import {UserAlreadyExistsException} from '../../../domain/exceptions/UserAlreadyExistsException.exception';
import {UserRepository} from '../../../domain/repositories/user.repository';
import {ExistUserByUserName} from '../../../domain/services/ExistUserByUserName.service';

export class UserCreatorUseCase {
  private readonly userRepository: UserRepository;
  private readonly existUserByUserName: ExistUserByUserName;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.existUserByUserName = new ExistUserByUserName(userRepository);
  }

  async run(body: User): Promise<User> {
    const existUser: boolean = await this.existUserByUserName.run(
      body.username,
    );

    if (existUser) throw new UserAlreadyExistsException();

    const userCreated: User = await this.userRepository.save(body);

    return userCreated;
  }
}
