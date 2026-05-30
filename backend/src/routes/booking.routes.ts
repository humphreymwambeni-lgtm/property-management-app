import { Router } from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  cancelBooking,
} from '../controllers/bookingController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, createBooking);
router.get('/', authenticate, getBookings);
router.get('/:id', authenticate, getBookingById);
router.put('/:id/cancel', authenticate, cancelBooking);

export default router;
