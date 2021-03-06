import { EsdtNftInfo, EthNftInfo, NftInfo } from "xp.network";

export interface TransferRequest {
  fromNonce: number;
  toNonce: number;
  sender: string;
  receiver: string;
  nft: NftInfo<EthNftInfo | EsdtNftInfo>;
  chain: string;
}
