import { Router } from "express";

import { createListService } from "../service/list";
import { Singleton } from "../singletons";
import { checkChain, validate } from "./validation";

const listerRouter = async (deps: Singleton) => {
  const router = Router();

  const svc = createListService(deps);

  router.post("/listNfts", ...checkChain(), validate, async (req, res) => {
    const {
      chain,
      nonce,
      address,
    }: { chain: string; nonce: number; address: string } = req.body;

    try {
      const nfts = await svc.listNfts(chain, nonce, address);
      return res.json(nfts);
    } catch (e) {
      return res.status(422).json({ error: e });
    }
  });

  return router;
};

export default listerRouter;
