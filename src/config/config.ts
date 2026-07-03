import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || "3000",
  HOST: process.env.DBHOST || "127.0.1.1",
  DBNAME: process.env.DBNAME || "",
  DBUSER: process.env.DBUSER || "",
  DBPASS: process.env.DBPASS || "",
  DBDIALECT: process.env.DBDIALECT || "mysql",
  MINIO_ENDPOINT: process.env.MINIO_ENDPOINT || "127.0.0.1",
  MINIO_PORT: process.env.MINIO_PORT || "9002",
  MINIO_USE_SSL: process.env.MINIO_USE_SSL || "false",
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY || "minioadmin",
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY || "minioadmin",
  MINIO_BUCKET: process.env.MINIO_BUCKET || "groceries",
  MINIO_URL: process.env.MINIO_URL || `http://${process.env.MINIO_ENDPOINT || "127.0.0.1"}:${process.env.MINIO_PORT || "9002"}`,
};

export default config;
