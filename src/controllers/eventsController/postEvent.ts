import Category from '../../models/categoryModel';
import getToken from '../../helpers/getToken';
import Event from '../../models/eventModel/index';
import { Request, Response } from 'express';

const postEvent = async (req: Request, res: Response) => {
  try {
    const { title, category, date, description, image, place } = req.body;

    const checkCategory = await Category.findOne({ name: category });

    if (checkCategory) {
      const newEvent = new Event({
        title,
        category: checkCategory._id,
        date,
        description,
        image,
        place,
      });
      const savedEvent = await newEvent.save();

      await Category.findByIdAndUpdate(
        savedEvent.category,
        {
          $push: {events: savedEvent._id},
        },
        { new: true }
      );

      res.status(200).json(savedEvent);
    } else {
      res.status(400).json({ error: 'Böyle bir kategori bulunmamaktadır.' });
    }
  } catch (error: any) {
    res.status(503).json({ error: error.message });
  }
};

export default postEvent;
