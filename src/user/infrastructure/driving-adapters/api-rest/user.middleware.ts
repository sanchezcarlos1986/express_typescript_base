import {NextFunction, Request, Response} from 'express';
import {UNAUTHORIZED} from 'http-status';

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['authorization'];

  if (!token) {
    res
      .status(UNAUTHORIZED)
      .json({message: 'Unauthorized request. "authorization" is required.'});
  } else {
    next();
  }
};
