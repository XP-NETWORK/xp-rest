import { UserSigner } from "@elrondnetwork/erdjs/out";
import { Wallet } from "ethers";
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

const mintRouter = async (deps: Singleton) => {
  const router = Router();

  router.post("/:chain", async (req, res) => {
    const chainName = req.params.chain;
    switch (chainName.toLowerCase()) {
      case "web3": {
        const chain = await deps.chainFactory.inner<Web3Helper, Web3Params>(
          req.body.nonce,
        );
        const wallet = new Wallet(req.body.privateKey);
        const mint = await deps.chainFactory.mint(chain, wallet, {
          name: req.body.name,
          uris: [req.body.uri],
          contract: req.body.contract,
          attrs: req.body.attrs,
        });
        res.json({ response: mint });
        break;
      }
      case "elrond": {
        const chain = await deps.chainFactory.inner<ElrondHelper, ElrondParams>(
          2,
        );
        const wallet = UserSigner.fromPem(req.body.privateKey);
        const mint = await deps.chainFactory.mint(chain, wallet, {
          name: req.body.name,
          uris: [req.body.uri],
          attrs: req.body.attrs,
          identifier: req.body.identifier,
        });
        res.json({ response: mint });
        break;
      }
      case "tron": {
        const chain = await deps.chainFactory.inner<TronHelper, TronParams>(9);
        const { privateKey } = req.body;
        const mint = await deps.chainFactory.mint(chain, privateKey, {
          name: req.body.name,
          uris: [req.body.uri],
          attrs: req.body.attrs,
          contract: req.body.contract,
        });
        res.json({ response: mint });
        break;
      }
      default: {
        res.status(400).json({ error: "Invalid chain" });
      }
    }
  });
  return router;
};

export default mintRouter;
