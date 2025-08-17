import Grocery from "./grocery";
import Store from "./store";
import User from "./user";
import Stock from "./stock";
import Transaction from "./transaction";

const syncModels = async () => {
  try {
    User.hasMany(Store, { foreignKey: "userId" });
    await User.sync();

    Store.hasMany(Transaction, { foreignKey: "storeId" });
    Store.belongsTo(User, { foreignKey: "userId" });
    await Store.sync();

    Grocery.belongsTo(Store, {
      foreignKey: "storeId",
    });
    Grocery.hasMany(Transaction, { foreignKey: "groceryId" });
    Grocery.hasOne(Stock, { foreignKey: "groceryId", as: "stock" });
    await Grocery.sync();

    Stock.belongsTo(Grocery, { foreignKey: "groceryId", as: "grocery" });
    Stock.belongsTo(Store, { foreignKey: "storeId" });
    await Stock.sync();

    Transaction.belongsTo(Store, { foreignKey: "storeId" });
    Transaction.belongsTo(Grocery, { foreignKey: "groceryId" });
    await Transaction.sync();

  } catch (error: any) {
    console.error("Error syncing models:", error);
  }
};

export default syncModels;
