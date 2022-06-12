import {connect} from 'mongoose';
import {config} from 'dotenv';

config({
  path: 'variables.env',
});

export const startConnection = async (): Promise<void> => {
  try {
    const connectionString: string = process.env.DB_MONGO || '';

    await connect(connectionString);
    process.env.NODE_ENV !== 'test' && console.log(`✅ MongoDB running ✅`);
  } catch (err) {
    console.error(`Error trying to connect to mongodb: ${err}`);
  }
};
