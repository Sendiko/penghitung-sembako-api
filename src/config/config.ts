import dotenv from "dotenv";

dotenv.config();

const defaultMinioUrl = process.env.MINIO_URL || `http://${process.env.MINIO_ENDPOINT || "127.0.0.1"}:${process.env.MINIO_PORT || "9002"}`;

function parseUrl(url: string) {
  try {
    const parsed = new URL(url);
    return {
      host: parsed.hostname,
      port: parsed.port || (parsed.protocol === "https:" ? "443" : "80"),
      useSSL: parsed.protocol === "https:",
    };
  } catch {
    return {
      host: process.env.MINIO_ENDPOINT || "127.0.0.1",
      port: process.env.MINIO_PORT || "9002",
      useSSL: process.env.MINIO_USE_SSL === "true",
    };
  }
}

const presignedMinioUrl = process.env.MINIO_PRESIGNED_URL || defaultMinioUrl;
const presignedMinioConfig = parseUrl(presignedMinioUrl);

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
  MINIO_URL: defaultMinioUrl,
  MINIO_PRESIGNED_URL: presignedMinioUrl,
  MINIO_PRESIGNED_ENDPOINT: process.env.MINIO_PRESIGNED_ENDPOINT || presignedMinioConfig.host,
  MINIO_PRESIGNED_PORT: process.env.MINIO_PRESIGNED_PORT || presignedMinioConfig.port,
  MINIO_PRESIGNED_USE_SSL: process.env.MINIO_PRESIGNED_USE_SSL || (presignedMinioConfig.useSSL ? "true" : "false"),
};

export default config;
