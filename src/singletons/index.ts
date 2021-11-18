import { ChainFactory, ChainFactoryConfigs } from "xp.network";
import Config from "../config";
export interface Singleton {
  chainFactory: ChainFactory;
}

export async function singletons(): Promise<Singleton> {
  const config = ChainFactoryConfigs.MainNet();
  return {
    chainFactory: ChainFactory(Config.appConfig, config),
  };
}
