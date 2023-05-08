import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
const db_connection = `${process.env.DB_CONNECTION}`;

const dbConnection = async () => {
  try {
    await mongoose.connect(db_connection);
    console.log('connected db');
  } catch (error: any) {
    console.log(error.message);
  }
};

export default dbConnection;
