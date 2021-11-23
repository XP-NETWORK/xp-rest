import { Wallet } from "ethers";
import {
  EthNftInfo,
  NftInfo,
  TronHelper,
  TronParams,
  Web3Helper,
  Web3Params,
} from "xp.network";
import { Singleton } from "../singletons";

export interface ApproveService {
  approve: (
    nonce: number,
    address: NftInfo<EthNftInfo>,
    privateKey: string,
  ) => Promise<boolean>;
}

export const createApproveService = (deps: Singleton): ApproveService => {
  return {
    async approve(nonce, address, privateKey): Promise<boolean> {
      switch (nonce) {
        case 9: {
          const fromChain = await deps.chainFactory.inner<
            TronHelper,
            TronParams
          >(9);
          return await fromChain.approveForMinter(address, privateKey);
        }
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 11:
        case 12:
        case 14: {
          const fromChain = await deps.chainFactory.inner<
            Web3Helper,
            Web3Params
          >(nonce);
          const signer = fromChain.createWallet(privateKey);
          return await fromChain.approveForMinter(address, signer);
        }
        default: {
          return Promise.reject(new Error("no such chain found"));
        }
      }
    },
  };
};
