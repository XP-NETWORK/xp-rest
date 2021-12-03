import { PopulatedTransaction } from "ethers";
import { ElrondRawUnsignedTxn, NftMintArgs, TronRawTxn } from "xp.network";
import { Singleton } from "../singletons";

export interface MinterService {
  mint: (
    nonce: number,
    privateKey: string,
    args: NftMintArgs,
  ) => Promise<PopulatedTransaction | ElrondRawUnsignedTxn | TronRawTxn>;
}

export const createMinterService = (deps: Singleton): MinterService => {
  return {
    async mint(nonce, sender, args) {
      const { chainFactory } = deps;
      const chain = await chainFactory.inner(nonce);
      return chainFactory.generateMintTxn(
        //@ts-ignore
        chain,
        sender,
        args,
      );
    },
  };
};
