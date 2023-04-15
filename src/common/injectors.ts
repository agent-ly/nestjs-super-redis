import { Inject } from "@nestjs/common";

import { getRedisConnectionToken } from "./utils.js";

export const InjectRedisConnection = (connectionName?: string) =>
  Inject(getRedisConnectionToken(connectionName));
