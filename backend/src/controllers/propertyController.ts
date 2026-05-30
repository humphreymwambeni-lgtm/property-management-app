import { Response } from 'express';
import Property from '../models/Property';
import { AuthRequest, authorize } from '../middleware/auth';
import { UserRole } from '../models/User';

export const createProperty = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== UserRole.OWNER) {
      return res.status(403).json({ message: 'Only owners can create properties' });
    }

    const { title, description, propertyType, price, location, images } = req.body;

    const property = await Property.create({
      ownerId: req.user.id,
      title,
      description,
      propertyType,
      price,
      location,
      images: images || [],
      availability: true,
    });

    res.status(201).json({
      message: 'Property created successfully',
      property,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create property', error });
  }
};

export const getProperties = async (req: AuthRequest, res: Response) => {
  try {
    const { propertyType, location, minPrice, maxPrice, availability } = req.query;

    const where: any = {};

    if (propertyType) where.propertyType = propertyType;
    if (location) where.location = { [require('sequelize').Op.like]: `%${location}%` };
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[require('sequelize').Op.gte] = minPrice;
      if (maxPrice) where.price[require('sequelize').Op.lte] = maxPrice;
    }
    if (availability !== undefined) where.availability = availability === 'true';

    const properties = await Property.findAll({ where });

    res.json({ properties });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch properties', error });
  }
};

export const getPropertyById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json({ property });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch property', error });
  }
};

export const updateProperty = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'You can only update your own properties' });
    }

    await property.update(req.body);

    res.json({
      message: 'Property updated successfully',
      property,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update property', error });
  }
};

export const deleteProperty = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own properties' });
    }

    await property.destroy();

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete property', error });
  }
};
