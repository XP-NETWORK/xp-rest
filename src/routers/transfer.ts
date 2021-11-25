import { Request, Router } from "express";
import { createTransferService } from "../service/transfer";

import { Singleton } from "../singletons";
import { TransferRequest } from "../types/transfer";
import { checkTransfer, validate } from "./validation";

const transferRouter = async (deps: Singleton) => {
  const router = Router();

  const svc = createTransferService(deps);

  router.post(
    "/transfer",
    ...checkTransfer(),
    validate,
    async (req: Request<{}, {}, TransferRequest>, res) => {
      const { fromNonce, toNonce, privateKey, nft, receiver } = req.body;

      try {
        const txHash = await svc.transfer(
          parseInt(fromNonce.toString()),
          parseInt(toNonce.toString()),
          privateKey,
          nft,
          receiver,
        );
        return res.json({ txHash });
      } catch (e) {
        console.error(e);
        return res.status(400).json({ message: "Something went wrong." });
      }
    },
  );
  return router;
};

export default transferRouter;
