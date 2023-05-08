import User from '../models/userModel/index.js';
import { NextFunction, Request, Response } from 'express';
import getToken, { IGetTokenPayload } from '../helpers/getToken.js';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, role } = (await getToken(req, res)) as IGetTokenPayload;

    if (role === 'admin') {
      req.user = await User.findById(id);
      next();
    } else {
      res.status(401).json({ error: 'Bu işlem için yetkin yok!' });
    }
  } catch (error: any) {
    res.status(401).json({
      error: error.message,
    });
  }
};

export default authMiddleware;
