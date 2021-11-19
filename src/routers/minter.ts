
import { Router } from "express";

import { createMinterService } from "../service/mint";
import { Singleton } from "../singletons";

const mintRouter = async (deps: Singleton) => {

  const router = Router();
  const minterService = createMinterService(deps)

  router.post("/mint", async (req, res) => {
    const { chain, nonce, privateKey, nft } = req.body;

    try {
      const response = await minterService.mint(chain, nonce, privateKey, nft);
      return res.json({ "result": response })
    } catch (e) {
      return res.status(400).json({
        error: e
      })
    }

  });
  return router;
};

export default mintRouter;
