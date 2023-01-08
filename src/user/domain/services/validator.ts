import {check} from 'express-validator';
import {NextFunction, Request, Response} from 'express';
import {validateResult} from './validator.helper';

export const validateCreate = [
  check('id').exists().isString().not().isEmpty(),
  check('name').exists().isString().not().isEmpty(),
  check('username').exists().isString().not().isEmpty(),
  check('age').exists().isNumeric(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
