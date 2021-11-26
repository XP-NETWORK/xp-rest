import { EsdtNftInfo, EthNftInfo, NftInfo } from "xp.network";

export interface EstimateRequest {
  fromNonce: number;
  toNonce: number;
  receiver: string;
  nft: NftInfo<EthNftInfo | EsdtNftInfo>;
}
