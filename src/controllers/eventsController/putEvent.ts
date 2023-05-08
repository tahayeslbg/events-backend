import Event from '../../models/eventModel/index';
import Category from '../../models/categoryModel';
import { Request, Response } from 'express';

const putEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { title, category, date, description, image, place } = req.body;

    const checkCategory = await Category.findOne({ name: category });

    if (checkCategory) {
      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        {
          title,
          category: checkCategory,
          date,
          description,
          image,
          place,
        },
        { new: true }
      );

      res.status(200).json(updatedEvent);
    } else {
      res.status(400).json({ error: 'Böyle bir kategori bulunmamaktadır.' });
    }
  } catch (error: any) {
    res.status(503).json({ error: error.message });
  }
};

export default putEvent;
