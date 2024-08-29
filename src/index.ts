import express, { Request, Response, Application } from "express";
import { PORT } from "./lib/config";

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to thotbit');
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

