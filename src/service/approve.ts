import { UserSigner } from "@elrondnetwork/erdjs/out";
import BigNumber from "bignumber.js";
import { Wallet } from "ethers";
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
import { Chain } from "xp.network/dist/consts";
import { Singleton } from "../singletons";

export interface ApproveService {
  approve: (
    nonce: number,
    nft: NftInfo<EthNftInfo | EsdtNftInfo>,
    privateKey: string,
    txFees: string,
  ) => Promise<string | undefined>;
}

export const createApproveService = (deps: Singleton): ApproveService => {
  return {
    async approve(nonce, nft, privateKey, txFees) {
      let fee = new BigNumber(txFees);
      const signer = await deps.chainFactory.pkeyToSigner(nonce, privateKey);
      switch (nonce) {
        case 2: {
          if (!txFees) {
            throw new Error("txFees is required for approval in elrond.");
          }
          const elrond = await deps.chainFactory.inner<
            ElrondHelper,
            ElrondParams
          >(Chain.ELROND);
          return await elrond.preTransfer(
            signer as UserSigner,
            nft as NftInfo<EsdtNftInfo>,
            fee,
          );
        }
        case 9: {
          const fromChain = await deps.chainFactory.inner<
            TronHelper,
            TronParams
          >(9);
          return await fromChain.preTransfer(
            privateKey,
            nft as NftInfo<EthNftInfo>,
            fee,
          );
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

          return await fromChain.preTransfer(
            signer as Wallet,
            nft as NftInfo<EthNftInfo>,
            fee,
          );
        }
        default: {
          return Promise.reject(new Error("no such chain found"));
        }
      }
    },
  };
};
