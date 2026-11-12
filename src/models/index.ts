import { Sequelize } from "sequelize";
import config from "../config/config";

const database = new Sequelize(config.DBNAME, config.DBUSER, config.DBPASS, {
  dialect: config.DBDIALECT as "mysql",
  host: config.DBHOST,
  port: parseInt(config.DBPORT, 10),
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
