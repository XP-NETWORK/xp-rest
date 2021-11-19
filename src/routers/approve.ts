import { Wallet } from "ethers";
import { Router } from "express";
import { TronHelper, TronParams, Web3Helper, Web3Params } from "xp.network";
import type { Singleton } from "../singletons";
import { body, validationResult } from "express-validator";
import { checkApproveBody, validate } from "./validation";
import { createApproveService } from "../service/approve";

const approveRouter = async (deps: Singleton) => {
  const router = Router();
  const approveService = createApproveService(deps);

  router.post(
    "/transfer",
    ...checkApproveBody(),
    validate,
    async (req, res) => {
      const { nft, privateKey } = req.body;
      const nonce = parseInt(req.body.nonce);

      try {
        const result = approveService.approve(nonce, nft, privateKey);
        return res.json({ result });
      } catch (e: any) {
        return res.status(400).json({ error: e });
      }
    },
  );

  return router;
};

export default approveRouter;
