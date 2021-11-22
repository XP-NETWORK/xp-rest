import { ChainFactory, ChainFactoryConfigs, ChainParams } from "xp.network";
import Config from "../config";
export interface Singleton {
  chainFactory: ChainFactory;
}

export async function singletons(
  config: Partial<ChainParams>,
): Promise<Singleton> {
  return {
    chainFactory: ChainFactory(Config.appConfig, config),
  };
}
