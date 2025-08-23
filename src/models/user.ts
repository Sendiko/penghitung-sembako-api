import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class User extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public profileUrl!: string;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: sequelize, // passing the `sequelize` instance is required
    modelName: "User", // We need to choose the model name
    tableName: "users", // We need to choose the table name
  }
);

export default User;
