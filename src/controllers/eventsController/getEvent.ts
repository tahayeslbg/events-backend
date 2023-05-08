import Event from '../../models/eventModel/index';
import { Request, Response } from 'express';

const getEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    res.status(200).json(event);
  } catch (error: any) {
    res.status(503).json({ error: error.message });
  }
};

export default getEvent
