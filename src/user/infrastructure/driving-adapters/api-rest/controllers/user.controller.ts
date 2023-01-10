import {NextFunction, Request, Response} from 'express';
import {InMemoryUserRepository} from '../../../driven-adapters/implementations/InMemory/In-MemoryUserRepository.repository';
import {getAllUsers} from './getAllUsers.controller';
import {saveUser} from './saveUser.controller';
import {updateUser} from './updateUser.controller';
import {deleteUser} from './deleteUser.controller';

const inMemoryRepository = new InMemoryUserRepository();

export const getAll = (req: Request, res: Response, next: NextFunction) =>
  getAllUsers(inMemoryRepository)(req, res, next);

export const save = (req: Request, res: Response, next: NextFunction) =>
  saveUser(inMemoryRepository)(req, res, next);

export const update = (req: Request, res: Response, next: NextFunction) =>
  updateUser(inMemoryRepository)(req, res, next);

export const deleteCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => deleteUser(inMemoryRepository)(req, res, next);
