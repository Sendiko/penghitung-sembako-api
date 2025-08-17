import { DataTypes, Model } from "sequelize";
import sequelize from './index';

class Stock extends Model {
  public groceryId!: number;
  public storeId!: number;
  public quantity!: number;
}

Stock.init({
  groceryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "groceries",
      key: "id"
    }
  },
  storeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "stores",
      key: "id"
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize: sequelize,
  modelName: "Stock",
  tableName: "stocks"
});

export default Stock;