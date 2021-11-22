import { UserSigner } from "@elrondnetwork/erdjs/out";
import { Wallet } from "ethers";
import {
  ElrondHelper,
  ElrondParams,
  NftMintArgs,
  TronHelper,
  TronParams,
  Web3Helper,
  Web3Params,
} from "xp.network";
import { Chain } from "xp.network/dist/consts";
import { Singleton } from "../singletons";

export interface MinterService {
  mint: (
    chain: string,
    nonce: number,
    privateKey: string,
    nft: NftMintArgs,
  ) => Promise<string>;
}

export const createMinterService = (deps: Singleton): MinterService => {
  return {
    async mint(chain, nonce, privateKey, nft): Promise<string> {
      const signer = await deps.chainFactory.pkeyToSigner(nonce, privateKey);
      switch (chain.toLowerCase()) {
        case "web3": {
          const chain = await deps.chainFactory.inner<Web3Helper, Web3Params>(
            nonce,
          );

          const mint = await deps.chainFactory.mint(
            chain,
            signer as Wallet,
            nft,
          );
          return mint;
        }
        case "elrond": {
          const chain = await deps.chainFactory.inner<
            ElrondHelper,
            ElrondParams
          >(Chain.ELROND);
          const mint = await deps.chainFactory.mint(
            chain,
            signer as UserSigner,
            nft,
          );
          return mint;
        }
        case "tron": {
          const chain = await deps.chainFactory.inner<TronHelper, TronParams>(
            Chain.TRON,
          );
          const mint = await deps.chainFactory.mint(
            chain,
            signer as string,
            nft,
          );
          return mint;
        }
        default: {
          throw new Error("Chain not supported");
        }
      }
    },
  };
};
