import {connect} from 'mongoose';

export const startConnection = async (): Promise<void> => {
  try {
    await connect('mongodb://localhost/mevn-database');
    console.log(`✅ MongoDB running ✅`);
  } catch (err) {
    console.error(err);
  }
};
