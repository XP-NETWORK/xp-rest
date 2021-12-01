import { EthNftInfo, NftInfo } from "xp.network";

export interface ApproveRequest {
  nft: NftInfo<EthNftInfo>;
  sender: string;
  nonce: number;
  txFees: string;
}
