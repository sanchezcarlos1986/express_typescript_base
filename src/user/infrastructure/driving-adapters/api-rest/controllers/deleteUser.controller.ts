import {NextFunction, Request, Response} from 'express';
import {OK} from 'http-status';
import {UserDeleter} from '../../../../application/useCases/UserDeleter.usercase';
import {UserRepository} from '../../../../domain/repositories/user.repository';

export const deleteUser =
  (repository: UserRepository) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req?.params?.id);
      const userDeleter = new UserDeleter(repository);
      await userDeleter.run(userId);

      res
        .status(OK)
        .send({message: `User id: ${userId} was deleted successfully`});
    } catch (error) {
      next(error);
    }
  };
