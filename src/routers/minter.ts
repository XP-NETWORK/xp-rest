import { Request, Router } from "express";

import { createMinterService } from "../service/mint";
import { Singleton } from "../singletons";
import { MintRequest } from "../types/mint";
import { checkMint } from "./validation";

const mintRouter = async (deps: Singleton) => {
  const router = Router();
  const svc = createMinterService(deps);
  router.post(
    "/mint",
    ...checkMint(),
    // validate,
    async (req: Request<{}, {}, MintRequest>, res, next) => {
      const { nonce, sender, nft } = req.body;

      try {
        const response = await svc.mint(
          parseInt(nonce.toString()),
          sender,
          nft,
        );
        return res.json({ txn: response });
      } catch (e) {
        next(e);
        return res.status(500).json({ message: "Something went wrong." });
      }
    },
  );
  return router;
};

export default mintRouter;
