import {
  registerUser,
  loginUser,
  postTicket,
  deleteTicket,
  getTickets,
  getCalendar,
  postCalendar,
  deleteCalendar,
  getMe,
} from '../../controllers/usersController';
import { Router } from 'express';

const router: Router = Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

router.get("/me", getMe)

router.get('/me/tickets', getTickets);
router.post('/me/tickets/:eventId', postTicket);
router.delete('/me/tickets/:eventId', deleteTicket);

router.get("/me/calendar", getCalendar);
router.post("/me/calendar/:eventId", postCalendar);
router.delete("/me/calendar/:eventId", deleteCalendar);

export default router;
