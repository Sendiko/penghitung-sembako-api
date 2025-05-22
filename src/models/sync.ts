import Grocery from "./grocery";
import History from "./history";
import User from "./user";

const syncModels = async () => {
  try {
    User.sync();

    Grocery.belongsTo(User, {
      foreignKey: "id",
    });
    Grocery.sync();

    History.hasOne(User, {
      foreignKey: "id",
    });
    History.hasOne(Grocery, {
      foreignKey: "id",
    });
    History.sync();
  } catch (error: any) {
    console.error("Error syncing models:", error);
  }
};

export default syncModels;
