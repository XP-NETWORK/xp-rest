import express from "express";
import cors from "cors";
import Config from "./config";
import { singletons, testnetSingletons } from "./singletons";
import { approve, lister, minter, transfer } from "./routers";
import { ChainFactoryConfigs } from "xp.network";
import winston from "winston";
import expresswinston from "express-winston";

(async () => {
  const app = express();
  console.warn("Using Permissive CORS!");

  app.use(express.json());
  app.use(cors());

  app.use(
    expresswinston.logger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.cli(),
          ),
        }),
        new winston.transports.File({
          filename: "error.log",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
            winston.format.prettyPrint(),
            winston.format.label(),
          ),
        }),
      ],
      meta: true, // optional: control whether you want to log the meta data about the request (default to true)
      msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
      expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
      colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
      ignoreRoute: function (req, res) {
        return false;
      }, // optional: allows to skip some log messages based on request and/or response
    }),
  );

  const mainNetDeps = await singletons(ChainFactoryConfigs.MainNet());
  const testNetDeps = await testnetSingletons(ChainFactoryConfigs.TestNet());

  // Mainnet Routes
  app.use("/minter", await minter(mainNetDeps));

  app.use("/lister", await lister(mainNetDeps));

  app.use("/transfer", await transfer(mainNetDeps));

  app.use("/approve", await approve(mainNetDeps));

  // Testnet Routes
  app.use("/testnet/minter", await minter(testNetDeps));

  app.use("/testnet/lister", await lister(testNetDeps));

  app.use("/testnet/transfer", await transfer(testNetDeps));

  app.use("/testnet/approve", await approve(testNetDeps));

  app.get("/service/heartbeat", async (_req, res) => {
    res.json({
      status: "Up and Running Just Fine.",
    });
  });

  app.use(
    expresswinston.errorLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.cli(),
          ),
        }),
        new winston.transports.File({
          filename: "error.log",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
            winston.format.prettyPrint(),
            winston.format.label(),
          ),
        }),
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
      ),
    }),
  );

  app.listen(Config.port, () => {
    console.log(`Express Server Listening @${Config.port}`);
  });
})();
