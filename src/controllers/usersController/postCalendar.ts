import User from '../../models/userModel';
import Event from '../../models/eventModel';
import getToken, { IGetTokenPayload } from '../../helpers/getToken';
import { Request, Response } from 'express';

const postCalendar = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { id } = (await getToken(req, res)) as IGetTokenPayload;

    const event = await Event.findById(eventId);
    const addEventToCalendar = await User.findByIdAndUpdate(
      id,
      { $push: { calendar: event?._id } },
      { new: true }
    );

    res.status(200).json(addEventToCalendar);
  } catch (error: any) {
    res.status(503).json(error.message);
  }
};

export default postCalendar;
