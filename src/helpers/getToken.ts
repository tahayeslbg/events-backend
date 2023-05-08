import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Types } from 'mongoose';
dotenv.config({ path: './.env' });

const secretKey = `${process.env.JWT_SECRET}`;

export interface IGetTokenPayload extends JwtPayload {
  id: Types.ObjectId;
  role: string;
}

const getToken = async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const token: string | null | undefined =
    authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      succeeded: false,
      error: 'Invalid token',
    });
  }

  const { id, role } = jwt.verify(token, secretKey) as IGetTokenPayload;

  return { id, role };
};

export default getToken;
