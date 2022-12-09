import {Router} from 'express';
import * as userController from './user.controllers';
import {userMiddleware} from './user.middleware';

const router: Router = Router();

router
  .use(userMiddleware)
  .get('/', userController.getAllUsers)
  .get('/:id', userController.getUserById);

export default router;
