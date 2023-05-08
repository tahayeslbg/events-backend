import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Types } from 'mongoose';
dotenv.config({ path: './.env' });

const secretKey = `${process.env.JWT_SECRET}`;
const createToken = (
  id: Types.ObjectId,
  role: string,
  expiresIn: string
): string => {
  return jwt.sign({ id, role }, secretKey, {
    expiresIn: expiresIn,
  });
};

export default createToken;
