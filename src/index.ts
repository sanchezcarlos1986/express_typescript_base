import app from './app';
import {swaggerDocs} from './docs/swagger';
import {PORT_TYPE} from './shared/types';
// import {startConnection} from './database';

// startConnection();

const PORT: PORT_TYPE = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  process.env.NODE_ENV !== 'test' &&
    console.log(`🔥 Server running on http://localhost:${PORT} 🔥`),
    swaggerDocs(app, PORT);
});

export {server};
