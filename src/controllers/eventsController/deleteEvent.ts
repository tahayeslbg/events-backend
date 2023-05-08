import Event from '../../models/eventModel/index';
import { Request, Response } from 'express';
import Category from '../../models/categoryModel';

const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(eventId, { new: true });

    await Category.findByIdAndUpdate(deletedEvent?.category, {
      $pull: { events: deletedEvent?._id },
    });

    res.status(200).json(deletedEvent);
  } catch (error: any) {
    res.status(503).json({ error: error.message });
  }
};

export default deleteEvent;
