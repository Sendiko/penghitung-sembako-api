import express, { Application } from "express";
// import router from "./router/route";
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

syncModels();

app.listen(PORT, IP, () => {
  console.log(`Hello World ${IP}:${PORT}`);
});
