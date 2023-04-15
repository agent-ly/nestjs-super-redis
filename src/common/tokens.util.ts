import { getConnectionToken } from "nestjs-recipes/builders/connection";

import { MODULE_NAME } from "../core/core.module-definition.js";

export const getRedisConnectionToken = (connectionName?: string) =>
  getConnectionToken(MODULE_NAME, connectionName);
