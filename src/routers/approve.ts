import { Wallet } from "ethers";
import { Router } from "express";
import {
  TronHelper,
  TronParams,
  Web3Helper,
  Web3Params,
} from "xp.network";
import { Singleton } from "../singletons";

const approveRouter = async (deps: Singleton) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const fromNonce = parseInt(req.body.fromNonce);
    switch (fromNonce) {
      case 9: {
        const signer = req.body.privateKey;
        const fromChain = await deps.chainFactory.inner<TronHelper, TronParams>(9);
        const result = await fromChain.approveForMinter(req.body.address, signer);
        res.json({ "status": result })
        break;
      }
      case 2: {
        res.json({ "message": "approval not required for elrond." })
        break;
      }
      default: {
        const signer = new Wallet(req.body.privateKey);
        const fromChain = await deps.chainFactory.inner<Web3Helper, Web3Params>(fromNonce);
        const result = await fromChain.approveForMinter(req.body.address, signer);
        res.json({ "status": result })
        break;
      }
    }
  });

  return router;
};

export default approveRouter;
