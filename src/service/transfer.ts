import { NftInfo } from "xp.network";
import { Singleton } from "../singletons";

export interface TransferService {
  transfer: <RawNftF>(
    fromNonce: number,
    toNonce: number,
    privateKey: string,
    nft: NftInfo<RawNftF>,
    receiver: string,
  ) => Promise<string>;
}

export const createTransferService = (deps: Singleton): TransferService => {
  return {
    async transfer(
      fromNonce,
      toNonce,
      privateKey,
      nft,
      receiver,
    ): Promise<string> {
      const { chainFactory } = deps;
      let fromChainNonce = chainFactory.nonceToChainNonce(fromNonce);
      let toChainNonce = chainFactory.nonceToChainNonce(toNonce);
      const fromInner = await chainFactory.inner(fromChainNonce);
      const toInner = await chainFactory.inner(toChainNonce);
      const signer = chainFactory.pkeyToSigner(fromChainNonce, privateKey);

      const txHash = await chainFactory.transferNft(
        //@ts-ignore
        fromInner,
        toInner,
        nft,
        signer,
        receiver,
      );
      return txHash;
    },
  };
};
