import getToken, { IGetTokenPayload } from '../../helpers/getToken';
import { Request, Response } from 'express';
import User from '../../models/userModel';
import Event from '../../models/eventModel';

const deleteCalendar = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { id } = (await getToken(req, res)) as IGetTokenPayload;

    const event = await Event.findById(eventId);
    const deleteEventToCalendar = await User.findByIdAndUpdate(
      id,
      { $pull: { calendar: event?._id } },
      { new: true }
    );

    res.status(200).json(deleteEventToCalendar);
  } catch (error: any) {
    res.status(503).json({ error: error.message });
  }
};

export default deleteCalendar;