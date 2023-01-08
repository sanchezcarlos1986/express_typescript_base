import {Router} from 'express';
import {validateCreate} from '../validator';
import {InMemoryUserRepository} from './infrastructure/implementations/inMemory/inMemoryUserRepository.repository';
import {userController} from './user.controller';

const router: Router = Router();
const inMemoryUserRepository = new InMemoryUserRepository();
const controller = userController(inMemoryUserRepository);

router
  .get('/', controller.getUsers)
  .post('/', validateCreate, controller.createUser);

export default router;
