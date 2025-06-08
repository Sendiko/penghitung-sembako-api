import express, { Application, Request, Response } from "express";
// import router from "./router/route";
import syncModels from "./models/sync";
import cors from "cors";
import config from "./config/config";
import path from "path";
import router from "./route/route";

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

app.use(router);

syncModels();

app.listen(PORT, IP, () => {
  console.log(`Hello World ${IP}:${PORT}`);
});
