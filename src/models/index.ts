// src/models/index.ts
import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require(__dirname + "/../config/config.json")[env];
const db: any = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  const dbUrl = process.env[config.use_env_variable];
  if (!dbUrl) {
    throw new Error(
      `Environment variable ${config.use_env_variable} is not set.`
    );
  }
  sequelize = new Sequelize(dbUrl, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      (file.slice(-3) === ".ts" || file.slice(-3) === ".js") && // Allow both .ts and .js for models
      file.indexOf(".test.ts") === -1 &&
      file.indexOf(".map") === -1 // Exclude map files
    );
  })
  .forEach((file) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
