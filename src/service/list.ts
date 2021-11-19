import { Wallet } from "ethers";
import { type } from "os";
import { ElrondHelper, ElrondParams, EsdtNftInfo, EthNftInfo, NftInfo, TronHelper, TronParams, Web3Helper, Web3Params } from "xp.network";
import { Singleton } from "../singletons";


export interface ApproveService {
  listNfts: (chain: string, nonce: number, address: string,) => Promise<any[]>
}



export const createListService = (deps: Singleton): ApproveService => {
  return {
    async listNfts(chain, nonce, address): Promise<NftInfo<T>[]> {
      switch (chain.toLowerCase()) {
        case "web3": {
          const fromChain = await deps.chainFactory.inner<Web3Helper, Web3Params>(nonce);
          const nfts = await deps.chainFactory.nftList(fromChain, address);
          return nfts
        }
        case "elrond": {
          const elrond = await deps.chainFactory.inner<ElrondHelper, ElrondParams>(2);
          const nfts = await deps.chainFactory.nftList(elrond, address);
          return nfts
        }
        case "tron": {
          const tron = await deps.chainFactory.inner<TronHelper, TronParams>(9);
          const nfts = await deps.chainFactory.nftList(tron, address);
          return nfts
        }
        default: {
          throw new Error("no such chain found")
        }
      }
    }
  }
}