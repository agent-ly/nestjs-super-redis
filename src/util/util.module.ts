import { Module } from "@nestjs/common";
import { DEFAULT_CONNECTION_NAME } from "nestjs-recipes/builders/connection";

import { CONNECTION_NAME_INJECTION_TOKEN } from "./util.constants.js";
import { RedisUtilService } from "./util.service.js";

@Module({
  providers: [RedisUtilService],
  exports: [RedisUtilService],
})
export class RedisUtilModule {
  static register(connectionName = DEFAULT_CONNECTION_NAME) {
    return {
      module: RedisUtilModule,
      providers: [
        {
          provide: CONNECTION_NAME_INJECTION_TOKEN,
          useValue: connectionName,
        },
      ],
    };
  }
}
