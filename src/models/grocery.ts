import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class Grocery extends Model {
  public id!: number;
  public userId!: number;
  public name!: string;
  public unit!: string;
  public price!: number;
  public imageUrl!: string;
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
      references: {
        model: "users", // name of Target model
        key: "id", // key in Target model that we're referencing
      },
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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: sequelize, // passing the `sequelize` instance is required
    modelName: "Grocery", // We need to choose the model name
    tableName: "groceries", // We need to choose the table name
  }
);

export default Grocery;
