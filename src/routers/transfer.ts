import { Router } from "express";
import { createTransferService } from "../service/transfer";

import { Singleton } from "../singletons";
import { checkTransfer, validate } from "./validation";

const transferRouter = async (deps: Singleton) => {
  const router = Router();

  const svc = createTransferService(deps);

  router.post("/transfer", ...checkTransfer(), validate, async (req, res) => {
    const { fromNonce, toNonce, privateKey, nft, receiver } = req.body;

    try {
      const txHash = await svc.transfer(
        fromNonce,
        toNonce,
        privateKey,
        nft,
        receiver,
      );
      return res.json({ txHash });
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });
  return router;
};

export default transferRouter;
