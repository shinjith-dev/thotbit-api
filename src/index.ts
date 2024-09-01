import express, { Request, Response, Application } from "express";
import { PORT } from "./lib/config";
import logger from "./utils/logger";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import "express-async-errors";

const app: Application = express();

app.use(cors());
app.use(logger.api);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to thotbit");
});

app.use("/api/v1", routes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.server(`started on ${new Date().toLocaleString()}`);
});
