import {Request, Response} from 'express';
import {errorHandler} from '../errorHandlers';

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

export const getAllBooks = async (_: any, res: Response): Promise<void> => {
  try {
    res.send(books);
  } catch (err) {
    errorHandler(err, res);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const book = books.find(book => String(book.id) === req.params.id);

    if (!book) {
      res.status(404).json({message: 'Book not found'});
    }

    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
};
