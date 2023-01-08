import {Router} from 'express';
import {validateCreate} from '../../../domain/services/validator';
import * as userController from './controllers/user.controller';

const router: Router = Router();

router.get('/', userController.getAll);
router.post('/', validateCreate, userController.create);

export default router;
