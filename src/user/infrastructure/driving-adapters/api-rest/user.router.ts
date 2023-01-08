import {Router} from 'express';
import {validateCreate} from '../../../domain/services/validator';
import * as userController from './controllers/user.controller';
import {userMiddleware} from './user.middleware';

const router: Router = Router();

router.use(userMiddleware);
router.get('/', userController.getAll);
router.post('/', validateCreate, userController.create);

export default router;
