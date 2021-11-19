import { Request, Router } from "express";

import { createMinterService } from "../service/mint";
import { Singleton } from "../singletons";
import { MintRequest } from "../types/mint";
import { checkMint, validate } from "./validation";

const mintRouter = async (deps: Singleton) => {
  const router = Router();
  const svc = createMinterService(deps);

  router.post(
    "/mint",
    ...checkMint(),
    validate,
    async (req: Request<{}, {}, MintRequest>, res) => {
      const { chain, nonce, privateKey, nft } = req.body;

      try {
        const response = await svc.mint(
          chain,
          parseInt(nonce.toString()),
          privateKey,
          nft,
        );
        return res.json({ txHash: response });
      } catch (e) {
        return res.status(400).json({
          error: e,
        });
      }
    },
  );
  return router;
};

export default mintRouter;
