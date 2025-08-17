import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class Store extends Model {
  public id!: number;
  public userId!: number;
  public name!: string;
  public address!: string;
  public phone!: string;
  public email!: string;
}

Store.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Store",
    tableName: "stores",
  }
);

export default Store;