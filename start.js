/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;
const config = require("./config");
if (
  config.credentials.client_id == null ||
  config.credentials.client_secret == null
) {
  console.error(
    "Missing FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env. variables."
  );
  return;
}

let app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api/forge/oauth", require("./routes/oauth"));
app.use("/api/forge/oss", require("./routes/oss"));
app.use("/api/forge/modelderivative", require("./routes/modelderivative"));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode).json(err);
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
