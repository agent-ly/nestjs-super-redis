import { Logger } from "@nestjs/common";
import {
  autoRetryConnect,
  createConfigurableConnectionModuleBuilder,
} from "nestjs-recipes/builders/connection";
import { createClient } from "redis";

import type {
  RedisCoreModuleOptions,
  RedisCoreModuleExtraOptions,
} from "./interfaces.js";

export const MODULE_NAME = "redis_core_module";
export const { OPTIONS_TYPE, ASYNC_OPTIONS_TYPE, ConfigurableModuleClass } =
  createConfigurableConnectionModuleBuilder<
    RedisCoreModuleOptions,
    RedisCoreModuleExtraOptions
  >(
    MODULE_NAME,
    async ({ url, connectionName, retryAttempts = 6, retryDelay = 6e3 }) => {
      const logger = new Logger(`RedisCoreModule(${connectionName})`);
      logger.log("Connecting to server ...");
      return autoRetryConnect(retryAttempts, retryDelay, logger, async () => {
        const client = createClient({ url });
        await client.connect();
        logger.log("Connection established.");
        return client;
      });
    }
  )
    .setClassMethodName("forRoot")
    .build();
