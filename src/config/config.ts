import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || "3000",
  HOST: process.env.DBHOST || "127.0.1.1",
  DBNAME: process.env.DBNAME || "",
  DBUSER: process.env.DBUSER || "",
  DBPASS: process.env.DBPASS || "",
  DBDIALECT: process.env.DBDIALECT || "mysql",
};

export default config;
