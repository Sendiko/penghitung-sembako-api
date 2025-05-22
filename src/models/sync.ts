import Grocery from "./grocery";
import History from "./history";
import User from "./user";

const syncModels = async () => {
  try {
    User.hasMany(Grocery, {
      foreignKey: "userId",
    });
    User.sync();

    Grocery.belongsTo(User, {
      foreignKey: "userId",
    });
    Grocery.sync();

    History.hasOne(User, {
      foreignKey: "userId",
    });
    History.hasOne(Grocery, {
      foreignKey: "groceryId",
    });
    History.sync();
  } catch (error: any) {
    console.error("Error syncing models:", error);
  }
};

export default syncModels;
