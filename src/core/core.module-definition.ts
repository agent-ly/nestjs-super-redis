import { Logger } from "@nestjs/common";
import { createConfigurableConnectionModuleBuilder } from "nestjs-recipes/builders/connection";
import { createClient } from "redis";

import type {
  RedisCoreModuleOptions,
  RedisCoreModuleExtraOptions,
} from "./core.interfaces.js";

export const MODULE_NAME = "redis_core_module";
export const { OPTIONS_TYPE, ASYNC_OPTIONS_TYPE, ConfigurableModuleClass } =
  createConfigurableConnectionModuleBuilder<
    RedisCoreModuleOptions,
    RedisCoreModuleExtraOptions
  >(MODULE_NAME, async ({ connectionName, ...options }) => {
    const logger = new Logger(`RedisCoreModule(${connectionName})`);
    const client = createClient(options);
    logger.log("Connecting ...");
    await client.connect();
    logger.log("Connected.");
    return client;
  })
    .setClassMethodName("forRoot")
    .build();
