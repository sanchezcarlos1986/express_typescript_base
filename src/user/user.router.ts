import {Router} from 'express';
import {userController} from './user.controller';
import {userMiddleware} from './user.middleware';
import {UserRepository} from './user.repository';

const router: Router = Router();
const userRepository = new UserRepository();
const controller = userController(userRepository);

router
  .use(userMiddleware)
  .get('/:id', controller.getUserById)
  .get('/', controller.getUsers)
  .post('/', controller.createUser)
  .put('/:id', controller.updateUser)
  .delete('/:id', controller.deleteUser);

export default router;
