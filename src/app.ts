import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import usersRoutes from './user/infrastructure/driving-adapters/api-rest/user.router';
import {errorHandler} from './errorHandlers';
import {APP} from './shared/types';

const app: APP = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', usersRoutes);

// Error Handler
app.use(errorHandler);

export default app;
