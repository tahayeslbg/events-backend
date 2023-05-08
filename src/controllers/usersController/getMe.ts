import User from '../../models/userModel';
import Event from '../../models/eventModel';
import getToken, { IGetTokenPayload } from '../../helpers/getToken';
import { Request, Response } from 'express';

const getMe = async (req: Request, res: Response) => {
  try {
    const { id } = (await getToken(req, res)) as IGetTokenPayload;

    const me = await User.findById(id);

    res.status(200).json(me);
  } catch (error: any) {
    res.status(503).json(error.message);
  }
};

export default getMe;
