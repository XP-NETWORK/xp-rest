import express from "express";
import cors from "cors";
import Config from "./config";
import { singletons } from "./singletons";
import { approve, lister, minter, transfer } from "./routers";
import { ChainFactoryConfigs } from "xp.network";

(async () => {
  const app = express();
  console.warn("Using Permissive CORS!");

  app.use(express.json());
  app.use(cors());

  const mainNetDeps = await singletons(ChainFactoryConfigs.MainNet());
  const testNetDeps = await singletons(ChainFactoryConfigs.TestNet());

  // Mainnet Routes
  app.use("/minter", await minter(mainNetDeps));

  app.use("/lister", await lister(mainNetDeps));

  app.use("/transfer", await transfer(mainNetDeps));

  app.use("/approve", await approve(mainNetDeps));

  // Testnet Routes
  app.use("testnet/minter", await minter(testNetDeps));

  app.use("testnet/lister", await lister(testNetDeps));

  app.use("testnet/transfer", await transfer(testNetDeps));

  app.use("testnet/approve", await approve(testNetDeps));

  app.get("/service/heartbeat", async (_req, res) => {
    res.json({
      status: "Up and Running Just Fine.",
    });
  });

  app.listen(Config.port, () => {
    console.log(`Express Server Listening @${Config.port}`);
  });
})();
