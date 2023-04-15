import { Module, type DynamicModule } from "@nestjs/common";

import {
  createSocketIoRedisAdapterProvider,
  createSocketIoRedisEmitter,
  type RedisAdapterOptions,
  type RedisEmitterOptions,
} from "./providers.js";

export interface ForAdapterOptions {
  connectionName?: string;
  adapterOptions?: RedisAdapterOptions;
}

export interface ForEmitterOptions {
  isGlobal?: boolean;
  nsp?: string;
  connectionName?: string;
  emitterOptions?: RedisEmitterOptions;
}

@Module({})
export class SocketIoRedisModule {
  static forAdapter({
    connectionName,
    adapterOptions,
  }: ForAdapterOptions = {}): DynamicModule {
    const adapterProvider = createSocketIoRedisAdapterProvider(
      connectionName,
      adapterOptions
    );
    return {
      module: SocketIoRedisModule,
      providers: [adapterProvider],
      exports: [adapterProvider],
    };
  }

  static forEmitter({
    isGlobal,
    nsp,
    connectionName,
    emitterOptions,
  }: ForEmitterOptions = {}): DynamicModule {
    const emitterProvider = createSocketIoRedisEmitter(
      nsp,
      connectionName,
      emitterOptions
    );
    return {
      global: isGlobal,
      module: SocketIoRedisModule,
      providers: [emitterProvider],
      exports: [emitterProvider],
    };
  }
}
