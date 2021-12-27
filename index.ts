import app from './app';
import {startConnection} from './database';

startConnection();

const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  () =>
    process.env.NODE_ENV !== 'test' &&
    console.log(`🔥 Server running on http://localhost:${PORT} 🔥`),
);

export {server};
