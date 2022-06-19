import {connect} from 'mongoose';
import {config} from 'dotenv';

config({
  path: 'variables.env',
});

export const startConnection = async (): Promise<void> => {
  try {
    const connectionString: string =
      process.env.NODE_ENV === 'test'
        ? String(process.env.DB_MONGO_TEST)
        : String(process.env.DB_MONGO) || '';

    await connect(connectionString);

    console.log(`✅ MongoDB running on: ${connectionString} ✅`);
  } catch (err) {
    console.error(`Error trying to connect to mongodb: ${err}`);
  }
};
