import { Test, type TestingModule } from "@nestjs/testing";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { RedisModule } from "../src/main/mod.js";
import {
  SocketIoRedisModule,
  getRedisAdapterCtorToken,
  getRedisEmitterToken,
} from "../src/socket.io/mod.js";

describe("SocketIoRedisModule", () => {
  let moduleRef: TestingModule;
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        RedisModule.forRoot(),
        SocketIoRedisModule.registerAdapterCtor(),
        SocketIoRedisModule.registerEmitter(),
      ],
    }).compile();
    await moduleRef.init();
  });
  afterAll(() => moduleRef && moduleRef.close());
  it("should resolve adapter ctor", () =>
    expect(moduleRef.get(getRedisAdapterCtorToken())).not.toBeNull());
  it("should resolve emitter", () =>
    expect(moduleRef.get(getRedisEmitterToken())).not.toBeNull());
});
