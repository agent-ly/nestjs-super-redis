import { Inject } from "@nestjs/common";

import { getRedisConnectionToken } from "./tokens.js";

export const InjectRedisConnection = (connectionName?: string) =>
  Inject(getRedisConnectionToken(connectionName));
