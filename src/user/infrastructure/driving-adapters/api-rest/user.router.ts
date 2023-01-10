import {Router} from 'express';
import {validateCreate} from '../../../domain/services/validateCreate';
import * as userController from './controllers/user.controller';
import {userMiddleware} from './user.middleware';

const router: Router = Router();

router.use(userMiddleware);
router.get('/', userController.getAll);
router.post('/', validateCreate, userController.save);
router.put('/:id', validateCreate, userController.update);
router.delete('/:id', userController.deleteCurrentUser);

export default router;
