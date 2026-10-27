import Grocery from "./grocery";
import Store from "./store";
import User from "./user";
import Stock from "./stock";
import Transaction from "./transaction";

const syncModels = async () => {
  User.hasMany(Store, { foreignKey: "userId" });
  Store.belongsTo(User, { foreignKey: "userId" });
  Store.hasMany(Transaction, { foreignKey: "storeId", onDelete: "CASCADE", onUpdate: "CASCADE" });
  Store.hasMany(Grocery, { foreignKey: "storeId", onDelete: "CASCADE", onUpdate: "CASCADE" });
  Grocery.belongsTo(Store, {
    foreignKey: "storeId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Grocery.hasMany(Transaction, { foreignKey: "groceryId" });
  Grocery.hasOne(Stock, { foreignKey: "groceryId", as: "stock" });
  Stock.belongsTo(Grocery, { foreignKey: "groceryId", as: "grocery" });
  Stock.belongsTo(Store, { foreignKey: "storeId" });
  Transaction.belongsTo(Store, { foreignKey: "storeId" });
  Transaction.belongsTo(Grocery, { foreignKey: "groceryId" });

  await User.sync();
  await Store.sync();
  await Grocery.sync();
  await Stock.sync();
  await Transaction.sync();
};

export default syncModels;
