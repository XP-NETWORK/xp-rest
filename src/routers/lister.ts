import { Router } from "express";
import {
  ElrondHelper,
  ElrondParams,
  TronHelper,
  TronParams,
  Web3Helper,
  Web3Params,
} from "xp.network";
import { Singleton } from "../singletons";

const listerRouter = async (deps: Singleton) => {
  const router = Router();

  router.post("/:chain", async (req, res) => {
    const fromNonce = parseInt(req.body.nonce);
    const { chain } = req.params;
    switch (chain.toLowerCase()) {
      case "web3": {
        const fromChain = await deps.chainFactory.inner<Web3Helper, Web3Params>(
          fromNonce,
        );
        const nfts = await deps.chainFactory.nftList(
          fromChain,
          req.body.address,
        );
        res.json(nfts);
        break;
      }
      case "elrond": {
        const elrond = await deps.chainFactory.inner<
          ElrondHelper,
          ElrondParams
        >(2);
        const nfts = await deps.chainFactory.nftList(elrond, req.body.address);
        res.json(nfts);
        break;
      }
      case "tron": {
        const tron = await deps.chainFactory.inner<TronHelper, TronParams>(9);
        const nfts = await deps.chainFactory.nftList(tron, req.body.address);
        res.json(nfts);
        break;
      }
      default: {
        res.status(400).json({ chain: "no such chain found" });
      }
    }
  });

  return router;
};

export default listerRouter;
