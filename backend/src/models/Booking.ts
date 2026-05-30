import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connection';
import User from './User';
import Property from './Property';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

class Booking extends Model {
  public id!: number;
  public propertyId!: number;
  public customerId!: number;
  public checkIn!: Date;
  public checkOut!: Date;
  public status!: BookingStatus;
  public totalPrice!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Property,
        key: 'id',
      },
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    checkIn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOut: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(BookingStatus)),
      defaultValue: BookingStatus.PENDING,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'bookings',
    timestamps: true,
  }
);

Booking.belongsTo(Property, { foreignKey: 'propertyId', as: 'property' });
Booking.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });

export default Booking;
