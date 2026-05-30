import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connection';
import bcrypt from 'bcryptjs';

export enum UserRole {
  OWNER = 'owner',
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public phone!: string;
  public role!: UserRole;
  public createdAt!: Date;
  public updatedAt!: Date;

  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      defaultValue: UserRole.CUSTOMER,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

export default User;
