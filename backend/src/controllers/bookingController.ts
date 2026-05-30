import { Response } from 'express';
import Booking, { BookingStatus } from '../models/Booking';
import Property from '../models/Property';
import { AuthRequest } from '../middleware/auth';

const calculatePrice = (checkIn: Date, checkOut: Date, pricePerNight: number): number => {
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  return nights * pricePerNight;
};

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { propertyId, checkIn, checkOut } = req.body;

    const property = await Property.findByPk(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (!property.availability) {
      return res.status(400).json({ message: 'Property is not available' });
    }

    const totalPrice = calculatePrice(
      new Date(checkIn),
      new Date(checkOut),
      parseFloat(property.price.toString())
    );

    const booking = await Booking.create({
      propertyId,
      customerId: req.user.id,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      status: BookingStatus.PENDING,
      totalPrice,
    });

    res.status(201).json({
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking', error });
  }
};

export const getBookings = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { status } = req.query;

    const where: any = {
      customerId: req.user.id,
    };

    if (status) where.status = status;

    const bookings = await Booking.findAll({
      where,
      include: [{ model: Property, as: 'property' }],
    });

    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error });
  }
};

export const getBookingById = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;

    const booking = await Booking.findByPk(id, {
      include: [{ model: Property, as: 'property' }],
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.customerId !== req.user.id) {
      return res.status(403).json({ message: 'You can only view your own bookings' });
    }

    res.json({ booking });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch booking', error });
  }
};

export const cancelBooking = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;

    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.customerId !== req.user.id) {
      return res.status(403).json({ message: 'You can only cancel your own bookings' });
    }

    if (booking.status === BookingStatus.COMPLETED || booking.status === BookingStatus.CANCELLED) {
      return res.status(400).json({ message: 'Cannot cancel this booking' });
    }

    await booking.update({ status: BookingStatus.CANCELLED });

    res.json({
      message: 'Booking cancelled successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel booking', error });
  }
};
