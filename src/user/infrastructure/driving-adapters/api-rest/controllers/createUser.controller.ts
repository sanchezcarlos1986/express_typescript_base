import {NextFunction, Request, Response} from 'express';
import {CREATED} from 'http-status';
import {UserCreatorUseCase} from '../../../../application/useCases/UserCreator/UserCreator.usecase';
import {UserRepository} from '../../../../domain/repositories/user.repository';

export const createUser =
  (repository: UserRepository) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userCreator = new UserCreatorUseCase(repository);
      const user = await userCreator.run(req?.body);

      res.status(CREATED).send(user);
    } catch (error) {
      next(error);
    }
  };
