import { PopulatedTransaction } from "ethers";
import { EthNftInfo, NftInfo, Web3Helper, Web3Params } from "xp.network";
import { Singleton } from "../singletons";

export interface TransferService {
  transfer: <RawNftF>(
    fromNonce: number,
    toNonce: number,

    nft: NftInfo<EthNftInfo>,
    receiver: string,
  ) => Promise<PopulatedTransaction>;
}

export const createTransferService = (deps: Singleton): TransferService => {
  return {
    async transfer(
      fromNonce,
      toNonce,

      nft,
      receiver,
    ): Promise<PopulatedTransaction> {
      const { chainFactory } = deps;
      let fromChainNonce = chainFactory.nonceToChainNonce(fromNonce);
      let toChainNonce = chainFactory.nonceToChainNonce(toNonce);
      const fromInner = await chainFactory.inner<Web3Helper, Web3Params>(
        fromChainNonce,
      );
      const toInner = await chainFactory.inner(toChainNonce);

      const fee = await chainFactory.estimateFees(
        fromInner,
        //@ts-ignore
        toInner,
        nft,
        receiver,
      );
      //@ts-ignore
      if (fromInner.isWrappedNft(nft)) {
        const res = await fromInner.unfreezeWrappedNftTxn(receiver, nft, fee);
        return res;
      } else {
        const res = await fromInner.transferNftToForeignTxn(
          //@ts-ignore
          toInner.getNonce(),
          receiver,
          nft,
          fee,
        );
        return res;
      }
    },
  };
};
