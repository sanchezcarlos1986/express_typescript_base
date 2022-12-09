import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import usersRoutes from './user/user.router';
import {errorHandler} from './errorHandlers';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', usersRoutes);

// Error Handler
app.use(errorHandler);

export default app;
