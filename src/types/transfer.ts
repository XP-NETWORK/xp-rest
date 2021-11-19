import { EsdtNftInfo, EthNftInfo, NftInfo } from "xp.network";

export interface TransferRequest {
  fromNonce: number;
  toNonce: number;
  privateKey: string;
  receiver: string;
  nft: NftInfo<EthNftInfo | EsdtNftInfo>;
}
