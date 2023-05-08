import User from '../../models/userModel';
import Event from '../../models/eventModel';
import getToken, { IGetTokenPayload } from '../../helpers/getToken';
import { Request, Response } from 'express';

const postTicket = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { id } = (await getToken(req, res)) as IGetTokenPayload;

    const event = await Event.findById(eventId);
    const addEventToTicket = await User.findByIdAndUpdate(
      id,
      { $push: { tickets: event?._id } },
      { new: true }
    );

    res.status(200).json(addEventToTicket);
  } catch (error: any) {
    res.status(503).json(error.message);
  }
};

export default postTicket;
