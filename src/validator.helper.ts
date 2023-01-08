import {validationResult} from 'express-validator';
import {NextFunction, Request, Response} from 'express';

type ValidationError = {
  value: string;
  msg: string;
  param: string;
  location: number;
};

export const validateResult = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    const errors = err?.errors.map((error: ValidationError) => ({
      [error?.param]: error?.msg,
    }));
    res.status(403).send(errors);
  }
};
