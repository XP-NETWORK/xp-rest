import { config } from "dotenv";
import { AppConfig, MoralisNetwork } from "xp.network";

config();

export const moralisSecrets = {
  moralisAppId: process.env.MORALIS_APP_ID!,
  moralisServer: process.env.MORALIS_SERVER!,
  moralisSecret: process.env.MORALIS_SECRET!,
  moralisNetwork: "mainnet" as MoralisNetwork,
};

export const moralisTestNetSecrets = {
  moralisAppId: process.env.MORALIS_TESTNET_APP_ID!,
  moralisServer: process.env.MORALIS_TESTNET_SERVER!,
  moralisSecret: process.env.MORALIS_TESTNET_SECRET!,
  moralisNetwork: "testnet" as MoralisNetwork,
};

export default {
  port: parseInt(process.env.PORT!),
  appConfig: {
    exchangeRateUri: process.env.EXCHANGE_RATE_URI!,
    heartbeatUri: process.env.HEART_BEAT_URI!,
    tronScanUri: process.env.TRONSCAN_URI!,
  } as AppConfig,
  moralisSecrets,
  moralisTestNetSecrets,
};
