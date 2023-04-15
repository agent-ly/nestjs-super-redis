import {
  getAdapterCtorToken,
  getEmitterToken,
} from "nestjs-recipes/builders/connection";

import { MODULE_NAME } from "../../core/module-definition.js";

export const getRedisAdapterCtorToken = (connectionName?: string) =>
  getAdapterCtorToken(MODULE_NAME, connectionName);

export const getRedisEmitterToken = (connectionName?: string) =>
  getEmitterToken(MODULE_NAME, connectionName);
