import {NextFunction, Request, Response} from 'express';
import {UserCreatorUseCase} from './application/useCases/UserCreator/UserCreator.usecase';
import {UserGetterUseCase} from './application/useCases/UserGetter/UserGetter.usecase';
import {UserRepository} from './domain/repositories/user.repository';
UserCreatorUseCase;

export const userController = (repository: UserRepository) => {
  const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const userGetter = new UserGetterUseCase(repository);
      const users = await userGetter.run();
      res.send(users);
    } catch (error) {
      next(error);
    }
  };

  const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userCreator = new UserCreatorUseCase(repository);
      const user = await userCreator.run(req?.body);

      res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  };

  return {
    getUsers,
    createUser,
  };
};
