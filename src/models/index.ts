import { Sequelize } from "sequelize";
import config from "../config/config";

const database = new Sequelize(config.DBNAME, config.DBUSER, config.DBPASS, {
  dialect: "mysql",
});

database
  .authenticate()
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error: any) => {
    console.error(error);
  });

export default database;
