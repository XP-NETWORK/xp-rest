
import { UserSigner } from "@elrondnetwork/erdjs/out"
import { Wallet } from "ethers"
import { Router } from "express"
import { ElrondHelper, ElrondParams, TronHelper, TronParams, Web3Helper, Web3Params } from "xp.network"
import { Singleton } from "../singletons"


const mintRouter = async (deps: Singleton) => {
  const router = Router()

  router.post("/web3/:nonce", async (req, res) => {
    const nonce = parseInt(req.params.nonce);
    const chain = await deps.chainFactory.inner<Web3Helper, Web3Params>(nonce)
    const wallet = new Wallet(req.body.privateKey);
    const mint = await deps.chainFactory.mint(chain, wallet, {
      name: req.body.name,
      uris: [req.body.uri],
      contract: req.body.contract,
      attrs: req.body.attrs,
    })
    return res.json({ response: mint });
  })

  router.post("/elrond/:identifier", async (req, res) => {
    const { identifier } = req.params;
    const chain = await deps.chainFactory.inner<ElrondHelper, ElrondParams>(2)
    const wallet = UserSigner.fromPem(req.body.privateKey);
    const mint = await deps.chainFactory.mint(chain, wallet, {
      name: req.body.name,
      uris: [req.body.uri],
      attrs: req.body.attrs,
      identifier,
    })
    return res.json({ response: mint });
  })

  router.post("/mint/tron", async (req, res) => {
    const chain = await deps.chainFactory.inner<TronHelper, TronParams>(2)
    const { privateKey } = req.body;
    const mint = await deps.chainFactory.mint(chain, privateKey, {
      name: req.body.name,
      uris: [req.body.uri],
      attrs: req.body.attrs,
      contract: req.body.contract,
    })
    return res.json({ response: mint });
  })
  return router
}

export default mintRouter