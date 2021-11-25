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
      const { chain, nonce, privateKey, nft } = req.body;

      try {
        const response = await svc.mint(
          chain,
          parseInt(nonce.toString()),
          privateKey,
          nft,
        );
        return res.json({ hash: response });
      } catch (e) {
        next(e);
        return res.status(500).json({ message: "Something went wrong." });
      }
    },
  );
  return router;
};

export default mintRouter;
