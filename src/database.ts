import {connect} from 'mongoose';

export const startConnection = async (): Promise<void> => {
  try {
    const connectionString =
      process.env.NODE_ENV === 'test'
        ? 'mongodb://localhost/mevn-database-test'
        : 'mongodb://localhost/mevn-database';

    await connect(connectionString);
    process.env.NODE_ENV !== 'test' && console.log(`✅ MongoDB running ✅`);
  } catch (err) {
    console.error(err);
  }
};
