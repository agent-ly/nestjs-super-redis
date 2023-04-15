import type { RedisClientOptions } from "redis";

export type RedisCoreModuleOptions = RedisClientOptions;

export interface RedisCoreModuleExtraOptions {
  connectionName?: string;
}
