import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import booksRoutes from './book/book.router';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/books', booksRoutes);

export default app;
