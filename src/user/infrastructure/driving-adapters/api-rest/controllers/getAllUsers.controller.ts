import {NextFunction, Request, Response} from 'express';
import {UserGetterUseCase} from '../../../../application/useCases/UserGetter.usecase';

import {UserRepository} from '../../../../domain/repositories/user.repository';

export const getAllUsers =
  (repository: UserRepository) =>
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const userGetter = new UserGetterUseCase(repository);
      const users = await userGetter.run();
      res.send(users);
    } catch (error) {
      next(error);
    }
  };
