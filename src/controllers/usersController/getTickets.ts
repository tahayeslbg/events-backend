import { Request, Response } from 'express';
import getToken, { IGetTokenPayload } from '../../helpers/getToken';
import User from '../../models/userModel';

const getTickets = async (req: Request, res: Response) => {
  try {
    const { id } = (await getToken(req, res)) as IGetTokenPayload;
    const meTickets = await User.findById(id).populate('tickets');
    if (meTickets) {
      res.status(200).json(meTickets.tickets);
    }
  } catch (error: any) {
    res.status(503).json({error: error.message})
  }
};
export default getTickets