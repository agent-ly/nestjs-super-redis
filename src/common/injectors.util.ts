import { Inject } from "@nestjs/common";

import { getRedisConnectionToken } from "./tokens.util.js";

export const InjectRedisConnection = (connectionName?: string) =>
  Inject(getRedisConnectionToken(connectionName));
