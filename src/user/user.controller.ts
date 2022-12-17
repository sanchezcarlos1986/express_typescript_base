import {NextFunction, Request, Response} from 'express';
import {UserDTO} from './user.dto';

import type {Repository, User} from './user.types.d';
import * as userUseCases from './user.usecases';

export const userController = (repository: Repository) => {
  const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userUseCases.getUsers(repository);

      res.send(users);
    } catch (error) {
      next(error);
    }
  };

  const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: User[] = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      )
        .then(res => res.json())
        .then(data => {
          return data.map((user: User) => new UserDTO(user));
        });

      const user: User | undefined = result.find(
        u => String(u.id) === req.params.id,
      );

      if (!user) {
        res.status(404).json({message: 'User not found'});
      } else {
        res.send(user);
      }
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
      const userdata = req?.body?.user;
      const user = await userUseCases.createUser(repository, userdata);

      res.send(user);
    } catch (error) {
      next(error);
    }
  };

  const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res.send('updateUser');
    } catch (error) {
      next(error);
    }
  };

  const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res.send('deleteUser');
    } catch (error) {
      next(error);
    }
  };

  return {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
};
