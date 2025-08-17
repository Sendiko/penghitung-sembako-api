import { DataTypes, Model } from "sequelize";
import sequelize from './index';

class Transaction extends Model {
  public id!: number;
  public storeId!: number;
  public groceryId!: number;
  public amount!: number;
  public totalPrice!: number;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "stores", 
        key: "id", 
      },
    },
    groceryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "groceries",
        key: "id"
      },
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  },
  {
    sequelize: sequelize,
    modelName: "Transaction",
    tableName: "transactions"
  }
);

export default Transaction;