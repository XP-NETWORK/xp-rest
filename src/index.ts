import express from "express";
import cors from "cors";
import Config from "./config"
import { singletons } from "./singletons"
import { Web3Helper, Web3Params } from "xp.network";
import mintRouter from "./routers/minter";

(async () => {

  const app = express();
  console.warn("Using Permissive CORS!");

  app.use(express.json());
  app.use(cors());

  const deps = await singletons()

  app.use("/minter", await mintRouter(deps))

  app.get("/service/heartbeat", async (req, res) => {
    res.json({
      status: "Up and Running Just Fine.",
    });
  });

  app.listen(Config.port, () => {
    console.log(`Express Server Listening @${Config.port}`);
  });
})()
