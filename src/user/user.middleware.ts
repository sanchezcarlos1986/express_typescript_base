import {NextFunction, Request, Response} from 'express';

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers['token']) {
    res.status(403).json({message: 'Unauthorized request. Token is required.'});
  } else {
    next();
  }
};
