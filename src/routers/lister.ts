import { Request, Router } from "express";

import { createListService } from "../service/list";
import { Singleton } from "../singletons";
import { ListRequest } from "../types/list";
import { checkList, validate } from "./validation";

const listerRouter = async (deps: Singleton) => {
  const router = Router();

  const svc = createListService(deps);

  router.post(
    "/listNfts",
    ...checkList(),
    validate,
    async (req: Request<{}, {}, ListRequest>, res) => {
      const { chain, nonce, address } = req.body;
      try {
        const nfts = await svc.listNfts(
          chain,
          parseInt(nonce.toString()),
          address,
        );
        return res.json(nfts);
      } catch (e) {
        console.error(e);
        return res.status(422).json({ message: "Something went wrong." });
      }
    },
  );

  return router;
};

export default listerRouter;
