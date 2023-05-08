import Category from '../../models/categoryModel';
import { Request, Response } from 'express';
import moment from 'moment';

const getCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const { place, date, search } = req.query;

    const category = await Category.findById(categoryId).populate({
      path: 'events',
      populate: [
        {
          path: 'category',
          model: Category,
        },
      ],
    });

    if (place && category) {
      const placeEvents = category.events.filter((event) =>
        event.place
          .toLowerCase()
          .replace(' ', '-')
          .includes(place.toString().toLowerCase().replace(' ', '-'))
      );
      return res.status(200).json(placeEvents);
    }
    if (search && category) {
      const searchEvents = category.events.filter((event) =>
        event.title
          .toLowerCase()
          .replace(' ', '-')
          .includes(search.toString().toLowerCase().replace(' ', '-'))
      );
      return res.status(200).json(searchEvents);
    }

    if (date && category) {
      if (date.toString() === 'guncel') {
        const dateEvents = category.events.filter((event) => {
          const eventDate = new Date(Number(event.date) * 1000);

          const now = new Date();
          return moment(eventDate) >= moment(now);
        });

        return res.status(200).json(dateEvents);
      } else if (date.toString() === 'eski') {
        const now = new Date();

        const dateEvents = category.events.filter((event) => {
          const eventDate = new Date(Number(event.date) * 1000);

          return moment(eventDate) < moment(now);
        });
        return res.status(200).json(dateEvents);
      }
    }

    res.status(200).json(category);
  } catch (error: any) {
    res.status(503).json({ error: error.message });
  }
};

export default getCategory;
