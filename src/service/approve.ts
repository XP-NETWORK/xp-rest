import BigNumber from "bignumber.js";
import { PopulatedTransaction } from "ethers";
import {
  ElrondRawUnsignedTxn,
  EsdtNftInfo,
  EthNftInfo,
  NftInfo,
  TronRawTxn,
} from "xp.network";

import { Singleton } from "../singletons";

export interface ApproveService {
  approve: (
    nonce: number,
    nft: NftInfo<EthNftInfo | EsdtNftInfo>,
    sender: string,
    txFees: string,
  ) => Promise<
    PopulatedTransaction | ElrondRawUnsignedTxn | TronRawTxn | undefined
  >;
}

export const createApproveService = (deps: Singleton): ApproveService => {
  return {
    async approve(nonce, nft, sender, txFees) {
      let fee = new BigNumber(txFees);
      let chain = await deps.chainFactory.inner(nonce);
      let txn = await deps.chainFactory.generatePreTransferTxn(
        //@ts-ignore
        chain,
        sender,
        nft,
        fee,
      );
      return txn;
    },
  };
};
