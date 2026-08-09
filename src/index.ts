import express, { Application, Request, Response } from "express";
import syncModels from "./models/sync";
import database from "./models/index";
import { Client } from "minio";
import cors from "cors";
import config from "./config/config";
import path from "path";

const PORT: number = parseInt(config.PORT);
const IP: string = "localhost";

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "../public")));

const minioClient = new Client({
  endPoint: config.MINIO_ENDPOINT,
  port: parseInt(config.MINIO_PORT, 10),
  useSSL: config.MINIO_USE_SSL === "true",
  accessKey: config.MINIO_ACCESS_KEY,
  secretKey: config.MINIO_SECRET_KEY,
});

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const parts = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(" ");
}

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../views/docs.html"));
});

app.get("/test", async (req: Request, res: Response) => {
  const wantsJson = req.query.format === "json" || 
    (req.headers.accept && req.headers.accept.includes("application/json") && !req.headers.accept.includes("text/html"));

  let dbStatus = "UP";
  let dbLatency = 0;
  let dbError: string | null = null;
  const dbStart = Date.now();
  try {
    await database.authenticate();
    dbLatency = Date.now() - dbStart;
  } catch (err: any) {
    dbStatus = "DOWN";
    dbError = err.message;
  }

  let storageStatus = "UP";
  let storageError: string | null = null;
  try {
    await minioClient.bucketExists(config.MINIO_BUCKET);
  } catch (err: any) {
    storageStatus = "DOWN";
    storageError = err.message;
  }

  const overallStatus = (dbStatus === "UP" && storageStatus === "UP") 
    ? "healthy" 
    : (dbStatus === "UP" || storageStatus === "UP") 
      ? "degraded" 
      : "unhealthy";

  const memory = process.memoryUsage();
  const healthData = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    uptime: formatUptime(process.uptime()),
    services: {
      server: { status: "UP" },
      database: { status: dbStatus, latencyMs: dbLatency, error: dbError },
      storage: { status: storageStatus, bucket: config.MINIO_BUCKET, error: storageError }
    },
    system: {
      nodeVersion: process.version,
      memoryUsage: {
        rss: `${Math.round(memory.rss / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memory.heapUsed / 1024 / 1024)} MB`
      }
    }
  };

  if (wantsJson) {
    return res.status(overallStatus === "unhealthy" ? 503 : 200).json(healthData);
  }

  return res.sendFile(path.join(__dirname, "../views/test.html"));
});

(async () => {
  try {
    await syncModels();

    const router = (await import("./route/route")).default;
    app.use(router);

    app.listen(PORT, IP, () => {
      console.log(`Hello World ${IP}:${PORT}`);
    });
  } catch (error: any) {
    console.error("Failed to sync models and start server:", error);
    process.exit(1);
  }
})();
