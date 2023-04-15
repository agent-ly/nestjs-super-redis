import {
  Emitter as RedisEmitter,
  EmitterOptions as RedisEmitterOptions,
} from "@socket.io/redis-emitter";
import {
  createAdapter as createRedisAdapter,
  type RedisAdapterOptions,
} from "@socket.io/redis-adapter";
import {
  createSocketIoAdapterProvider,
  createSocketIoEmitterProvider,
} from "nestjs-recipes/builders/connection";
import type { RedisClientType } from "redis";

import { MODULE_NAME } from "../core/module-definition.js";

export type { RedisAdapterOptions, RedisEmitterOptions };

export const createSocketIoRedisAdapterProvider = (
  connectionName?: string,
  adapterOptions?: RedisAdapterOptions
) =>
  createSocketIoAdapterProvider(
    MODULE_NAME,
    connectionName,
    async (client: RedisClientType) => {
      const pubClient = client.duplicate();
      const subClient = client.duplicate();
      await Promise.all([pubClient.connect(), subClient.connect()]);
      const adapterConstructor = createRedisAdapter(
        pubClient,
        subClient,
        adapterOptions
      );
      return adapterConstructor;
    }
  );

export const createSocketIoRedisEmitter = (
  nsp?: string,
  connectionName?: string,
  emitterOptions?: RedisEmitterOptions
) =>
  createSocketIoEmitterProvider(
    MODULE_NAME,
    connectionName,
    async (client: RedisClientType) => {
      const emitter = new RedisEmitter(client, emitterOptions, nsp);
      return emitter;
    }
  );
