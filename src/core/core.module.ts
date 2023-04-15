import { Global, Inject, Module, type OnModuleDestroy } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import {
  getConnectionToken,
  getConnectionNameToken,
} from "nestjs-recipes/builders/connection";
import type { RedisClientType } from "redis";

import {
  MODULE_NAME,
  ConfigurableModuleClass,
} from "./core.module-definition.js";

@Global()
@Module({})
export class RedisCoreModule
  extends ConfigurableModuleClass
  implements OnModuleDestroy
{
  constructor(
    private readonly moduleRef: ModuleRef,
    @Inject(getConnectionNameToken(MODULE_NAME))
    private readonly connectionName: string
  ) {
    super();
  }

  async onModuleDestroy() {
    const connection = this.moduleRef.get<RedisClientType>(
      getConnectionToken(MODULE_NAME, this.connectionName)
    );
    await connection.quit();
  }
}
