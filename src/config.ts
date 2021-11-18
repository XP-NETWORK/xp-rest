import { config } from "dotenv";
import { AppConfig } from "xp.network"

config();

export default {
  port: parseInt(process.env.PORT!),
  appConfig: {
    exchangeRateUri: process.env.EXCHANGE_RATE_URI!,
    heartbeatUri: process.env.HEARTBEAT_URI!,
    moralisAppId: process.env.MORALIS_APP_ID!,
    moralisServer: process.env.MORALIS_SERVER!,
    tronScanUri: process.env.TRONSCAN_URI!,
  } as AppConfig
}