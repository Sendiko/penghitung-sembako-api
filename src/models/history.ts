import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class History extends Model {
  public id!: number;
  public groceryId!: number;
  public userId!: number;
  public quantity!: number;
  public totalPrice!: number;
}

History.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    groceryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "groceries", // name of Target model
        key: "id", // key in Target model that we're referencing
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // name of Target model
        key: "id", // key in Target model that we're referencing
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize, // passing the `sequelize` instance is required
    modelName: "History", // We need to choose the model name
    tableName: "histories", // We need to choose the table name
  }
);

export default History;
