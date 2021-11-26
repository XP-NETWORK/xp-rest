import { Request, Router } from "express";
import { createEstimateService } from "../service/estimate";

import { Singleton } from "../singletons";
import { EstimateRequest } from "../types/estimate";
import { checkEstimate, validate } from "./validation";

const estimateRouter = async (deps: Singleton) => {
  const router = Router();

  const svc = createEstimateService(deps);

  router.post(
    "/estimate",
    ...checkEstimate(),
    validate,
    async (req: Request<{}, {}, EstimateRequest>, res, next) => {
      const { fromNonce, toNonce, nft, receiver } = req.body;

      try {
        const fees = await svc.estimate(
          parseInt(fromNonce.toString()),
          parseInt(toNonce.toString()),
          nft,
          receiver,
        );
        return res.json({ fees });
      } catch (e) {
        next(e);
        return res.status(500).json({ message: "Something went wrong." });
      }
    },
  );
  return router;
};

export default estimateRouter;
