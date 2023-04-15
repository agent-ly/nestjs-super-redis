import { Module, type DynamicModule } from "@nestjs/common";

import type {
  RegisterAdapterCtorOptions,
  RegisterEmitterOptions,
} from "./socket.io.interfaces.js";
import {
  createSocketIoRedisAdapterCtorProvider,
  createSocketIoRedisEmitter,
} from "./socket.io.providers.js";

@Module({})
export class SocketIoRedisModule {
  static registerAdapterCtor({
    connectionName,
    options,
  }: RegisterAdapterCtorOptions = {}): DynamicModule {
    const adapterCtorProvider = createSocketIoRedisAdapterCtorProvider(
      connectionName,
      options
    );
    return {
      module: SocketIoRedisModule,
      providers: [adapterCtorProvider],
      exports: [adapterCtorProvider],
    };
  }

  static registerEmitter({
    isGlobal,
    nsp,
    connectionName,
    options,
  }: RegisterEmitterOptions = {}): DynamicModule {
    const emitterProvider = createSocketIoRedisEmitter(
      nsp,
      connectionName,
      options
    );
    return {
      global: isGlobal,
      module: SocketIoRedisModule,
      providers: [emitterProvider],
      exports: [emitterProvider],
    };
  }
}
