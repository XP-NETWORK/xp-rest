import { config } from "dotenv";
import { AppConfig, MoralisNetwork } from "xp.network";

config();

export const getOrThrow = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env var ${key}`);
  }
  return value;
};

export const moralisSecrets = {
  moralisAppId: getOrThrow("MORALIS_APP_ID"),
  moralisServer: getOrThrow("MORALIS_SERVER"),
  moralisSecret: getOrThrow("MORALIS_SECRET"),
  moralisNetwork: "mainnet" as MoralisNetwork,
};

export const moralisTestNetSecrets = {
  moralisAppId: getOrThrow("MORALIS_TESTNET_APP_ID"),
  moralisServer: getOrThrow("MORALIS_TESTNET_SERVER"),
  moralisSecret: getOrThrow("MORALIS_TESTNET_SECRET"),
  moralisNetwork: "testnet" as MoralisNetwork,
};

export default {
  port: parseInt(process.env.PORT!),
  appConfig: {
    exchangeRateUri: getOrThrow("EXCHANGE_RATE_URI"),
    heartbeatUri: getOrThrow("HEART_BEAT_URI"),
    tronScanUri: getOrThrow("TRON_SCAN_URI"),
  } as AppConfig,
  moralisSecrets,
  moralisTestNetSecrets,
};
