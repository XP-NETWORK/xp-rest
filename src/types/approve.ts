import { EthNftInfo, NftInfo } from "xp.network";

export interface ApproveRequest {
  nft: NftInfo<EthNftInfo>;
  privateKey: string;
  nonce: number;
  txFees: string | undefined;
}
