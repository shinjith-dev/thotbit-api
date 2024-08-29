import express, { Request, Response, Application } from "express";
import { PORT } from "./lib/config";
import logger from "./utils/logger";
import cors from 'cors'

const app: Application = express();

app.use(cors())
app.use(logger.api)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to thotbit');
});

app.listen(PORT, () => {
  logger.server(`started at http://localhost:${PORT}`)
});

