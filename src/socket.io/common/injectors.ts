import { Inject } from "@nestjs/common";

import { getRedisAdapterCtorToken, getRedisEmitterToken } from "./tokens.js";

export const InjectRedisAdapterCtor = (connectionName?: string) =>
  Inject(getRedisAdapterCtorToken(connectionName));

export const InjectRedisEmitter = (connectionName?: string) =>
  Inject(getRedisEmitterToken(connectionName));
