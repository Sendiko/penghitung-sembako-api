import { Client } from "minio";
import config from "../config/config";

const minioClient = new Client({
  endPoint: config.MINIO_ENDPOINT,
  port: parseInt(config.MINIO_PORT, 10),
  useSSL: config.MINIO_USE_SSL === "true",
  accessKey: config.MINIO_ACCESS_KEY,
  secretKey: config.MINIO_SECRET_KEY,
});

const presignedClient = new Client({
  endPoint: config.MINIO_PRESIGNED_ENDPOINT || config.MINIO_ENDPOINT,
  port: parseInt(config.MINIO_PRESIGNED_PORT || config.MINIO_PORT, 10),
  useSSL: config.MINIO_PRESIGNED_USE_SSL === "true" || config.MINIO_USE_SSL === "true",
  accessKey: config.MINIO_ACCESS_KEY,
  secretKey: config.MINIO_SECRET_KEY,
});

const bucketName = config.MINIO_BUCKET;

async function ensureBucketExists() {
  const exists = await minioClient.bucketExists(bucketName);
  if (!exists) {
    await minioClient.makeBucket(bucketName, "us-east-1");
  }
}

function getPublicUrl(objectName: string) {
  return `${config.MINIO_URL}/${bucketName}/${objectName}`;
}

async function createPresignedUploadUrl(objectName: string, contentType: string) {
  await ensureBucketExists();
  return presignedClient.presignedPutObject(bucketName, objectName, 24 * 60 * 60);
}

async function uploadObject(objectName: string, buffer: Buffer, contentType: string) {
  await ensureBucketExists();
  await minioClient.putObject(bucketName, objectName, buffer, buffer.length, {
    "Content-Type": contentType,
  });
  return getPublicUrl(objectName);
}

export default {
  uploadObject,
  createPresignedUploadUrl,
  getPublicUrl,
};
