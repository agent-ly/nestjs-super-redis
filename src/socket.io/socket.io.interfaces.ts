import type {
  RedisAdapter,
  RedisAdapterOptions,
} from "@socket.io/redis-adapter";
import type {
  Emitter as RedisEmitter,
  EmitterOptions as RedisEmitterOptions,
} from "@socket.io/redis-emitter";
import type { SocketIoAdapterCtor } from "nestjs-recipes/builders/connection";

export type RedisAdapterCtor = SocketIoAdapterCtor<RedisAdapter>;

export interface RegisterAdapterCtorOptions {
  connectionName?: string;
  options?: Partial<RedisAdapterOptions>;
}

export interface RegisterEmitterOptions {
  isGlobal?: boolean;
  nsp?: string;
  connectionName?: string;
  options?: RedisEmitterOptions;
}

export type { RedisAdapter, RedisEmitter };
