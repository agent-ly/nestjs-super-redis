import { Test } from "@nestjs/testing";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { RedisModule } from "../dist/main/mod.js";
import {
  SocketIoRedisModule,
  getRedisAdapterCtorToken,
  getRedisEmitterToken,
} from "../dist/socket.io/mod.js";

describe("SocketIoRedisModule", () => {
  /** @type {import('@nestjs/testing').TestingModule} */
  let module;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        RedisModule.forRoot(),
        SocketIoRedisModule.forAdapter(),
        SocketIoRedisModule.forEmitter(),
      ],
    }).compile();
    await module.init();
  });
  afterAll(() => module.close());
  it("adapter constructor should resolve", () =>
    expect(module.get(getRedisAdapterCtorToken())).toBeDefined());
  it("emitter should be defined", () =>
    expect(module.get(getRedisEmitterToken())).toBeDefined());
});
