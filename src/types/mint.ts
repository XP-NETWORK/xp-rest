import { NftMintArgs } from "xp.network";

export interface MintRequest {
  nonce: number;
  sender: string;
  nft: NftMintArgs;
}
