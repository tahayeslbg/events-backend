import {
  getEvents,
  postEvent,
  putEvent,
  deleteEvent,
  getEvent,
} from '../../controllers/eventsController';
import { Router } from 'express';
import authMiddleware from '../../middlewares/authMiddleware';

const router: Router = Router();

router.get('/', getEvents);
router.get('/:eventId', getEvent);
router.post('/', authMiddleware, postEvent);
router.put('/:eventId', authMiddleware, putEvent);
router.delete('/:eventId', authMiddleware, deleteEvent);

export default router;
