import {NextFunction, Request, Response} from 'express';
import {InMemoryUserRepository} from '../../../implementations/InMemory/In-MemoryUserRepository.repository';
import {createUser} from './createUser.controller';
import {getUsers} from './getUsers.controller';

const inMemoryRepository = new InMemoryUserRepository();

export const create = (req: Request, res: Response, next: NextFunction) =>
  createUser(inMemoryRepository)(req, res, next);

export const getAll = (req: Request, res: Response, next: NextFunction) =>
  getUsers(inMemoryRepository)(req, res, next);
