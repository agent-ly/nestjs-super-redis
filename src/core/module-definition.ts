import { Logger } from "@nestjs/common";
import { createConfigurableConnectionModuleBuilder } from "nestjs-recipes/builders/connection";
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
  >(MODULE_NAME, async ({ url, connectionName }) => {
    const logger = new Logger(`RedisCoreModule(${connectionName})`);
    logger.log("Establishing connection to Redis server...");
    const client = createClient({ url });
    await client.connect();
    logger.log("Connection established.");
    return client;
  })
    .setClassMethodName("forRoot")
    .build();
