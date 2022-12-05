import {NextFunction, Request, Response} from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(err?.status ?? 500).send({
    name: 'ServiceErrorHandler',
    status: err?.status ?? 500,
    error: err?.code ?? 'INTERNAL_SERVER_ERROR',
  });
};
