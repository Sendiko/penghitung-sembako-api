import Grocery from "./grocery";
import History from "./history";
import Store from "./store";
import User from "./user";

const syncModels = async () => {
  try {
    User.hasMany(History, { foreignKey: "userId" });
    User.hasMany(Store, { foreignKey: "userId" });
    await User.sync();

    Store.belongsTo(User, { foreignKey: "userId" });
    await Store.sync();

    Grocery.belongsTo(Store, {
      foreignKey: "storeId",
    });
    Grocery.hasMany(History, { foreignKey: "groceryId" });
    await Grocery.sync();

    History.belongsTo(User, {
      foreignKey: "userId",
    });
    History.belongsTo(Grocery, {
      foreignKey: "groceryId",
    });
    await History.sync();
  } catch (error: any) {
    console.error("Error syncing models:", error);
  }
};

export default syncModels;
