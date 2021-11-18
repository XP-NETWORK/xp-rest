
import { UserSigner } from "@elrondnetwork/erdjs/out"
import { Wallet } from "ethers"
import { Router } from "express"
import { ElrondHelper, ElrondParams, TronHelper, TronParams, Web3Helper, Web3Params } from "xp.network"
import { Singleton } from "../singletons"


const transferRouter = async (deps: Singleton) => {
  const router = Router()

  router.post("/transfer", async (req, res) => {
    const fromNonce = parseInt(req.body.fromNonce);
    const toNonce = parseInt(req.body.toNonce);
    let signer;
    const fromChain = await deps.chainFactory.inner(fromNonce) as any
    const toChain = await deps.chainFactory.inner(toNonce) as any
    switch (toNonce) {
      case 9: {
        signer = req.body.privateKey
        break;
      }
      case 2: {
        signer = UserSigner.fromPem(req.body.privateKey)
        break;
      }
      default: {
        signer = new Wallet(req.body.privateKey)
        break;
      }
    }
    const txHash = await deps.chainFactory.transferNft(
      fromChain, toChain, req.body.nft, signer, req.body.receiver
    )
    return res.json({ txHash });
  })

  return router
}

export default transferRouter