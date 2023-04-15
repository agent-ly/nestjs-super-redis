import { Test, type TestingModule } from "@nestjs/testing";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { RedisModule } from "../dist/main/mod.js";
import {
  SocketIoRedisModule,
  getRedisAdapterCtorToken,
  getRedisEmitterToken,
} from "../dist/socket.io/mod.js";

describe("SocketIoRedisModule", () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        RedisModule.forRoot(),
        SocketIoRedisModule.registerAdapterCtor(),
        SocketIoRedisModule.registerEmitter(),
      ],
    }).compile();
    await module.init();
  });
  afterAll(() => module && module.close());
  it("adapter constructor should resolve", () =>
    expect(module.get(getRedisAdapterCtorToken())).toBeDefined());
  it("emitter should resolve", () =>
    expect(module.get(getRedisEmitterToken())).toBeDefined());
});
