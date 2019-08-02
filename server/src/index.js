import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { port, originURL } from "./utils/config";

const app = express();

app.use(
  cors({
    origin: originURL,
    credentials: true
  })
);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
