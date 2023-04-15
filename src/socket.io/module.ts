import { Module, type DynamicModule } from "@nestjs/common";

import type {
  RegisterAdapterOptions,
  RegisterEmitterOptions,
} from "./interfaces.js";
import {
  createSocketIoRedisAdapterProvider,
  createSocketIoRedisEmitter,
} from "./providers.js";

@Module({})
export class SocketIoRedisModule {
  static registerAdapter({
    connectionName,
    adapterOptions,
  }: RegisterAdapterOptions = {}): DynamicModule {
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

  static registerEmitter({
    isGlobal,
    nsp,
    connectionName,
    emitterOptions,
  }: RegisterEmitterOptions = {}): DynamicModule {
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
