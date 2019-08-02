import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";

import auth from "./routes/auth";
import { port, originURL, clientSecret } from "./utils/config";

const app = express();

app.use(
  cors({
    origin: originURL,
    credentials: true
  })
);

app.use(cookieParser());

app.use(
  session({
    secret: clientSecret,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60
    },
    resave: false,
    saveUninitialized: true
  })
);

app.use(bodyParser.json());

app.use("/api", auth);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
