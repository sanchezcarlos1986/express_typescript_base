import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import booksRoutes from './book/book.router';
import {errorHandler} from './errorHandlers';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/books', booksRoutes);

// Error Handler
app.use(errorHandler);

export default app;
