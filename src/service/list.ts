import {
  ElrondHelper,
  ElrondParams,
  EsdtNftInfo,
  EthNftInfo,
  NftInfo,
  TronHelper,
  TronParams,
  Web3Helper,
  Web3Params,
} from "xp.network";
import { Singleton } from "../singletons";

export interface ListService {
  listNfts: (
    chain: string,
    nonce: number,
    address: string,
  ) => Promise<NftInfo<EthNftInfo | EsdtNftInfo>[]>;
}

export const createListService = (deps: Singleton): ListService => {
  return {
    async listNfts(chain, nonce, address) {
      switch (chain.toLowerCase()) {
        case "web3": {
          const fromChain = await deps.chainFactory.inner<
            Web3Helper,
            Web3Params
          >(nonce);
          const nfts = await deps.chainFactory.nftList(fromChain, address);
          return nfts;
        }
        case "elrond": {
          const elrond = await deps.chainFactory.inner<
            ElrondHelper,
            ElrondParams
          >(2);
          const nfts = await deps.chainFactory.nftList(elrond, address);
          return nfts;
        }
        case "tron": {
          const tron = await deps.chainFactory.inner<TronHelper, TronParams>(9);
          const nfts = await deps.chainFactory.nftList(tron, address);
          return nfts;
        }
        default: {
          throw new Error("no such chain found");
        }
      }
    },
  };
};
