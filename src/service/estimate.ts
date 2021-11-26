import { BigNumber } from "bignumber.js";
import { NftInfo } from "xp.network";
import { Singleton } from "../singletons";

export interface EstimateService {
  estimate: <RawNftF>(
    fromNonce: number,
    toNonce: number,
    nft: NftInfo<RawNftF>,
    receiver: string,
  ) => Promise<BigNumber>;
}

export const createEstimateService = (deps: Singleton): EstimateService => {
  return {
    async estimate(fromNonce, toNonce, nft, receiver): Promise<BigNumber> {
      const { chainFactory } = deps;
      let fromChainNonce = chainFactory.nonceToChainNonce(fromNonce);
      let toChainNonce = chainFactory.nonceToChainNonce(toNonce);
      const fromInner = await chainFactory.inner(fromChainNonce);
      const toInner = await chainFactory.inner(toChainNonce);
      const fees = await chainFactory.estimateFees(
        //@ts-ignore
        fromInner,
        toInner,
        nft,
        receiver,
      );
      return fees;
    },
  };
};
