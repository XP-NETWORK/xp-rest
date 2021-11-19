import { UserSigner } from "@elrondnetwork/erdjs/out";
import { Wallet } from "ethers";
import { ElrondHelper, ElrondParams, EthNftInfo, NftInfo, NftMintArgs, TronHelper, TronParams, Web3Helper, Web3Params } from "xp.network";
import { Singleton } from "../singletons";


export interface MinterService {
  mint: (chain: string, nonce: number, privateKey: string, nft: NftMintArgs) => Promise<any>
}

export const createMinterService = (deps: Singleton): MinterService => {
  return {
    async mint(chain, nonce, privateKey, nft): Promise<any> {
      switch (chain.toLowerCase()) {
        case "web3": {
          const chain = await deps.chainFactory.inner<Web3Helper, Web3Params>(
            nonce,
          );
          const wallet = new Wallet(privateKey);
          const mint = await deps.chainFactory.mint(chain, wallet, nft);
          return mint;
        }
        case "elrond": {
          const chain = await deps.chainFactory.inner<ElrondHelper, ElrondParams>(
            2,
          );
          const wallet = UserSigner.fromPem(privateKey);
          const mint = await deps.chainFactory.mint(chain, wallet, nft);
          return mint
        }
        case "tron": {
          const chain = await deps.chainFactory.inner<TronHelper, TronParams>(9);
          const mint = await deps.chainFactory.mint(chain, privateKey, nft);
          return mint
        }
        default: {
          throw new Error("Chain not supported");
        }
      }
    }
  }
}