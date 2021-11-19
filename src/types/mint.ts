import { NftMintArgs } from "xp.network";

export interface MintRequest {
  chain: string;
  nonce: number;
  privateKey: string;
  nft: NftMintArgs;
}
