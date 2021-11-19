import { Request, Router } from "express";
import type { Singleton } from "../singletons";
import { checkApproveBody, validate } from "./validation";
import { createApproveService } from "../service/approve";
import { ApproveRequest } from "../types/approve";

const approveRouter = async (deps: Singleton) => {
  const router = Router();
  const svc = createApproveService(deps);

  router.post(
    "/transfer",
    ...checkApproveBody(),
    validate,
    async (req: Request<{}, {}, ApproveRequest>, res) => {
      const { nft, privateKey, nonce } = req.body;
      try {
        const result = svc.approve(parseInt(nonce.toString()), nft, privateKey);
        return res.json({ result });
      } catch (e: any) {
        return res.status(400).json({ error: e });
      }
    },
  );

  return router;
};

export default approveRouter;
