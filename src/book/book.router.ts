import {Router} from 'express';

import * as bookController from './book.controllers';
import {bookMiddleware} from './book.middleware';

const router: Router = Router();

router.use(bookMiddleware);

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

export default router;
