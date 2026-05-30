import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connection';
import User from './User';

export enum PropertyType {
  HOUSE = 'House',
  APARTMENT = 'Apartment',
  LODGE = 'Lodge',
  HOTEL = 'Hotel',
  COMMERCIAL_SPACE = 'Commercial Space',
  OFFICE_SPACE = 'Office Space',
  WAREHOUSE = 'Warehouse',
}

class Property extends Model {
  public id!: number;
  public ownerId!: number;
  public title!: string;
  public description!: string;
  public propertyType!: PropertyType;
  public price!: number;
  public location!: string;
  public images!: string[];
  public availability!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Property.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    propertyType: {
      type: DataTypes.ENUM(...Object.values(PropertyType)),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    availability: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'properties',
    timestamps: true,
  }
);

Property.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

export default Property;
