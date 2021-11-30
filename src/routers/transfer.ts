import { Request, Router } from "express";
import { EthNftInfo, NftInfo } from "xp.network";
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
    async (req: Request<{}, {}, TransferRequest>, res, next) => {
      const { fromNonce, toNonce, nft, receiver, chain } = req.body;

      if (chain !== "web3") {
        return next(new Error("Only web3 chain is supported right now"));
      }
      try {
        const tx = await svc.transfer(
          parseInt(fromNonce.toString()),
          parseInt(toNonce.toString()),

          nft as NftInfo<EthNftInfo>,
          receiver,
        );
        return res.json(tx);
      } catch (e) {
        next(e);
        return res.status(500).json({ message: "Something went wrong." });
      }
    },
  );
  return router;
};

export default transferRouter;
