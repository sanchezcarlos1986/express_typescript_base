import {UserCreatorUseCase} from '../../../application/useCases/UserCreator/UserCreator.usecase';
import {InMemoryUserRepository} from '../../implementations/inMemory/inMemoryUserRepository.repository';

(async () => {
  const userCreatorUseCase = new UserCreatorUseCase(
    new InMemoryUserRepository(),
  );

  userCreatorUseCase.run({
    name: 'Rafaela',
    age: 7,
    username: 'rafela_2015',
    id: 'hola',
  });
})();
