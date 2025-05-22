import Grocery from "./grocery";
import History from "./history";
import User from "./user";

const syncModels = async () => {
  try {
    User.hasMany(History, { foreignKey: "userId" });
    User.sync();

    Grocery.belongsTo(User, {
      foreignKey: "userId",
    });
    Grocery.hasMany(History, { foreignKey: "groceryId" });
    Grocery.sync();

    History.belongsTo(User, {
      foreignKey: "userId",
    });
    History.belongsTo(Grocery, {
      foreignKey: "groceryId",
    });
    History.sync();
  } catch (error: any) {
    console.error("Error syncing models:", error);
  }
};

export default syncModels;
