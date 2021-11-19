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
          return fromChain.approveForMinter(address, privateKey);
        }
        case 3 || 4 || 5 || 6 || 7 || 8 || 11 || 12 || 14: {
          const signer = new Wallet(privateKey);
          const fromChain = await deps.chainFactory.inner<
            Web3Helper,
            Web3Params
          >(nonce);
          return fromChain.approveForMinter(address, signer);
        }
        default: {
          return Promise.reject(new Error("no such chain found"));
        }
      }
    },
  };
};
