import moment from 'moment';
import Event from '../../models/eventModel/index';
import { Request, Response } from 'express';
const getEvents = async (req: Request, res: Response) => {
  try {
    const { place, date, search } = req.query;

    const events = await Event.find().populate('category', 'name');

    if (place) {
      const placeEvents = events.filter((event) =>
        event.place
          .toLowerCase()
          .replace(' ', '-')
          .includes(place.toString().toLowerCase().replace(' ', '-'))
      );
      return res.status(200).json(placeEvents);
    }
    if (search) {
      const searchEvents = events.filter((event) =>
        event.title
          .toLowerCase()
          .replace(' ', '-')
          .includes(search.toString().toLowerCase().replace(' ', '-'))
      );
      return res.status(200).json(searchEvents);
    }

    if (date) {
      if (date.toString() === 'guncel') {
        const dateEvents = events.filter((event) => {
          const eventDate = new Date(Number(event.date) * 1000);

          const now = new Date();
          return moment(eventDate) >= moment(now)
        });

        return res.status(200).json(dateEvents);
      } else if (date.toString() === 'eski') {
        const now = new Date();

        const dateEvents = events.filter((event) => {
          const eventDate = new Date(Number(event.date) * 1000);

          return moment(eventDate) < moment(now);
        });
        return res.status(200).json(dateEvents);
      }
    }

    res.status(200).json(events);
  } catch (error: any) {
    res.status(503).json({ error: error.message });
  }
};

export default getEvents;
