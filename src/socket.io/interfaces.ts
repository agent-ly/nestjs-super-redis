import type { RedisAdapterOptions } from "@socket.io/redis-adapter";
import type { EmitterOptions as RedisEmitterOptions } from "@socket.io/redis-emitter";

export interface RegisterAdapterOptions {
  connectionName?: string;
  adapterOptions?: RedisAdapterOptions;
}

export interface RegisterEmitterOptions {
  isGlobal?: boolean;
  nsp?: string;
  connectionName?: string;
  emitterOptions?: RedisEmitterOptions;
}
