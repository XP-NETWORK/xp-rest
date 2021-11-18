import express from "express";
import cors from "cors";
import Config from "./config"
import { singletons } from "./singletons"
import { lister, minter, transfer } from "./routers";

(async () => {

  const app = express();
  console.warn("Using Permissive CORS!");

  app.use(express.json());
  app.use(cors());

  const deps = await singletons()

  app.use("/minter", await minter(deps))

  app.use("/lister", await lister(deps))

  app.use("/transfer", await transfer(deps))

  app.get("/service/heartbeat", async (req, res) => {
    res.json({
      status: "Up and Running Just Fine.",
    });
  });

  app.listen(Config.port, () => {
    console.log(`Express Server Listening @${Config.port}`);
  });
})()
