import { PopulatedTransaction } from "ethers";
import {
  ElrondRawUnsignedTxn,
  EsdtNftInfo,
  EthNftInfo,
  NftInfo,
  TronRawTxn,
  Web3Helper,
  Web3Params,
} from "xp.network";
import { Singleton } from "../singletons";

export interface TransferService {
  transfer: <RawNftF>(
    fromNonce: number,
    toNonce: number,
    sender: string,
    nft: NftInfo<RawNftF>,
    receiver: string,
  ) => Promise<PopulatedTransaction | ElrondRawUnsignedTxn | TronRawTxn>;
}

export const createTransferService = (deps: Singleton): TransferService => {
  return {
    async transfer(
      fromNonce,
      toNonce,
      sender,
      nft,
      receiver,
    ): Promise<PopulatedTransaction | ElrondRawUnsignedTxn | TronRawTxn> {
      const { chainFactory } = deps;
      let fromChainNonce = chainFactory.nonceToChainNonce(fromNonce);
      let toChainNonce = chainFactory.nonceToChainNonce(toNonce);
      const fromInner = await chainFactory.inner(fromChainNonce);
      const toInner = await chainFactory.inner(toChainNonce);

      const fee = await chainFactory.estimateFees(
        //@ts-ignore
        fromInner,
        toInner,
        nft,
        receiver,
      );
      const txn = await chainFactory.generateNftTxn(
        //@ts-ignore
        fromInner,
        toChainNonce,
        sender,
        receiver,
        nft,
        fee,
      );
      return txn;
    },
  };
};
