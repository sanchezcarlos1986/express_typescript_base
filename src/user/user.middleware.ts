import {NextFunction, Request, Response} from 'express';

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['authorization'];

  if (!token) {
    res
      .status(403)
      .json({message: 'Unauthorized request. "authorization" is required.'});
  } else {
    next();
  }
};
