import {NextFunction, Request, Response} from 'express';
import {OK} from 'http-status';
import {UserUpdaterUseCase} from '../../../../application/useCases/UserUpdater.usercase';
import {UserRepository} from '../../../../domain/repositories/user.repository';

export const updateUser =
  (repository: UserRepository) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userUpdater = new UserUpdaterUseCase(repository);

      const user = await userUpdater.run(req?.body);

      res.status(OK).send(user);
    } catch (error) {
      next(error);
    }
  };
