import { ChainFactory, ChainParams } from "xp.network";
import Config from "../config";
export interface Singleton {
  chainFactory: ChainFactory;
}

export async function singletons(
  config: Partial<ChainParams>,
): Promise<Singleton> {
  return {
    chainFactory: ChainFactory(
      {
        ...Config.appConfig,
        ...Config.moralisSecrets,
      },
      config,
    ),
  };
}

export async function testnetSingletons(
  config: Partial<ChainParams>,
): Promise<Singleton> {
  return {
    chainFactory: ChainFactory(
      {
        ...Config.appConfig,
        ...Config.moralisTestNetSecrets,
      },
      config,
    ),
  };
}
