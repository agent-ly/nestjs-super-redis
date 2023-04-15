import {
  Emitter as RedisEmitter,
  EmitterOptions as RedisEmitterOptions,
} from "@socket.io/redis-emitter";
import {
  createAdapter as createRedisAdapter,
  type RedisAdapterOptions,
} from "@socket.io/redis-adapter";
import {
  createSocketIoAdapterCtorProvider,
  createSocketIoEmitterProvider,
} from "nestjs-recipes/builders/connection";
import type { RedisClientType } from "redis";

import { MODULE_NAME } from "../core/core.module-definition.js";

export const createSocketIoRedisAdapterCtorProvider = (
  connectionName?: string,
  options?: Partial<RedisAdapterOptions>
) =>
  createSocketIoAdapterCtorProvider(
    MODULE_NAME,
    connectionName,
    async (client: RedisClientType) => {
      const pubClient = client.duplicate();
      const subClient = client.duplicate();
      await Promise.all([pubClient.connect(), subClient.connect()]);
      const adapterConstructor = createRedisAdapter(
        pubClient,
        subClient,
        options
      );
      return adapterConstructor;
    }
  );

export const createSocketIoRedisEmitter = (
  nsp?: string,
  connectionName?: string,
  options?: RedisEmitterOptions
) =>
  createSocketIoEmitterProvider(
    MODULE_NAME,
    connectionName,
    async (client: RedisClientType) => {
      const emitter = new RedisEmitter(client, options, nsp);
      return emitter;
    }
  );
