import { Module, type DynamicModule } from "@nestjs/common";

import type {
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} from "../core/core.module-definition.js";
import { RedisCoreModule } from "../core/core.module.js";

@Module({})
export class RedisModule {
  static forRoot(url?: string): DynamicModule;
  static forRoot(options?: typeof OPTIONS_TYPE): DynamicModule;
  static forRoot(optionsOrUrl?: string | typeof OPTIONS_TYPE): DynamicModule {
    const options =
      typeof optionsOrUrl === "string"
        ? { url: optionsOrUrl }
        : optionsOrUrl ?? {};
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRoot(options)],
    };
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRootAsync(options)],
    };
  }
}
