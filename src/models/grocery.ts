import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class Grocery extends Model {
  public id!: number;
  public userId!: number;
  public name!: string;
  public unit!: string;
  public price!: number;
}

Grocery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize, // passing the `sequelize` instance is required
    modelName: "Grocery", // We need to choose the model name
  }
);

export default Grocery;
