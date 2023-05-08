import { Request, Response } from 'express';
import getToken, { IGetTokenPayload } from '../../helpers/getToken';
import User from '../../models/userModel';

const getCalendar = async (req: Request, res: Response) => {
  try {
    const { id } = (await getToken(req, res)) as IGetTokenPayload;
    const meCalendar = await User.findById(id).populate('calendar');
    if (meCalendar) {
      res.status(200).json(meCalendar.calendar);
    }
  } catch (error: any) {
    res.status(503).json({error: error.message})
  }
};
export default getCalendar