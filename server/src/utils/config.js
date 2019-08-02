import dotenv from "dotenv";
import path from "path";

const root = path.join.bind(this, __dirname, "../../");
dotenv.config({ path: root(".env") });

export const url = process.env.URL;
export const port = process.env.PORT;
export const originURL = process.env.ORIGIN_URL;

export const clientId = process.env.CLIENT_ID;
export const clientSecret = process.env.CLIENT_SECRET;
export const callbackURL = process.env.CALLBACK_URL;
export const authURL = process.env.AUTH_URL;

export const scopeInternal = [
  "data:create",
  "data:write",
  "data:read",
  "bucket:read",
  "bucket:update",
  "bucket:create",
  "code:all"
];
export const scopePublic = ["viewables:read"];
