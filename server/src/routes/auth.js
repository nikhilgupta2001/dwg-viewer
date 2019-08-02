import express from "express";
import cryptiles from "@hapi/cryptiles";
import forgeSDK from "forge-apis";

import {
  clientId,
  clientSecret,
  callbackURL,
  scopeInternal,
  authURL,
  scopePublic
} from "../utils/config";

const router = express.Router();

router.get("/user/logout", (req, res) => {
  req.session.destroy();

  res.end("/");
});

router.get("/forge/clientID", (req, res) => {
  res.json({
    ForgeClientId: clientId
  });
});

router.get("/user/token", (req, res) => {
  const { session } = req;

  const token = session.publicCredentials
    ? session.publicCredentials.access_token
    : "";
  const expires_in = session.publicCredentials
    ? session.publicCredentials.expires_in
    : "";

  res.json({ token, expires_in });
});

router.get("/user/auth", (req, res) => {
  req.session.csrf = cryptiles.randomString(24);

  // redirect the user to this page
  const url = `${authURL}
  &client_id=${clientId}
  &redirect_uri=${callbackURL}
  &state=${req.session.csrf}
  &scope=${scopeInternal.join(" ")}`;

  res.end(url);
});

router.get("/api/forge/callback/oauth", (req, res) => {
  const csrf = req.query.state;

  if (!csrf || csrf !== req.session.csrf) {
    res.status(401).end();
    return;
  }

  const { code } = req.query;
  if (!code) {
    res.redirect("/");
  }

  const { session } = req;

  // first get a full scope token for internal use (server-side)
  const request = new forgeSDK.AuthClientThreeLegged(
    clientId,
    clientSecret,
    callbackURL,
    scopeInternal
  );

  request
    .getToken(code)
    .then(internalCredentials => {
      session.internalCredentials = internalCredentials;
      session.internalOAuth = req;

      // then refresh and get a limited scope token that we can send to the client
      const req2 = new forgeSDK.AuthClientThreeLegged(
        clientId,
        clientSecret,
        callbackURL,
        scopePublic
      );
      req2
        .refreshToken(internalCredentials)
        .then(publicCredentials => {
          session.setPublicCredentials(publicCredentials);
          session.setPublicOAuth(req2);

          res.redirect("/");
        })
        .catch(error => {
          res.end(JSON.stringify(error));
        });
    })
    .catch(error => {
      res.end(JSON.stringify(error));
    });
});
