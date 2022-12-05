import {NextFunction, Request, Response} from 'express';

const books = [
  {
    id: 1,
    title: 'learn clean architecture',
    price: 10_000,
  },
  {
    id: 2,
    title: 'learn CSS',
    price: 10_000,
  },
];

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.send(books);
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const book = books.find(book => String(book.id) === req.params.id);

    if (!book) {
      res.sendStatus(404).json({message: 'Book not found'});
    }

    res.send(book);
  } catch (error) {
    next(error);
  }
};
