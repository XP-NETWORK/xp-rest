import { Router } from "express";
import type { Singleton } from "../singletons";
import { checkApproveBody, validate } from "./validation";
import { createApproveService } from "../service/approve";

const approveRouter = async (deps: Singleton) => {
  const router = Router();
  const svc = createApproveService(deps);

  router.post(
    "/transfer",
    ...checkApproveBody(),
    validate,
    async (req, res) => {
      const { nft, privateKey } = req.body;
      const nonce = parseInt(req.body.nonce);

      try {
        const result = svc.approve(nonce, nft, privateKey);
        return res.json({ result });
      } catch (e: any) {
        return res.status(400).json({ error: e });
      }
    },
  );

  return router;
};

export default approveRouter;
