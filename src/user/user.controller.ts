import {NextFunction, Request, Response} from 'express';

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
      const userId = req?.params?.id;
      const user = await userUseCases.getUserById(repository, userId);

      if (!user) {
        res.status(404).send({message: 'User not found'});
      }

      res.send(user);
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
      const userdata = req?.body;
      const user = await userUseCases.createUser(repository, userdata);

      res.status(201).send(user);
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
      const userId = req?.params?.id;
      const userdata = req?.body;

      const updatedUser = await userUseCases.updateUser(
        repository,
        userId,
        userdata,
      );

      if (!updatedUser) {
        res.status(404).send({message: 'User not found'});
      }

      res.send(updatedUser);
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
      const userId = req?.params?.id;
      const response = await userUseCases.deleteUser(repository, userId);

      if (!response) {
        res.status(404).send({message: 'User not found'});
      }

      res.send(`User id: ${userId} deleted.`);
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
