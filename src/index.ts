import express, { Application, Request, Response } from "express";
import syncModels from "./models/sync";
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

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../views/docs.html"));
})

app.get("/test", (req: Request, res: Response) => {
  res.send("You're connected to the Penghitung Sembako API.")
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
