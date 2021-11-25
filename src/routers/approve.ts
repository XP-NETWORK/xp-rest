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
    async (req: Request<{}, {}, ApproveRequest>, res, next) => {
      const { nft, privateKey, nonce } = req.body;
      try {
        const result = await svc.approve(nonce, nft, privateKey);
        return res.json({ result });
      } catch (e: any) {
        next(e);
        return res.status(500).json({ message: "Something went wrong." });
      }
    },
  );

  return router;
};

export default approveRouter;
