import { Test } from "@nestjs/testing";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { RedisModule, getRedisConnectionToken } from "../dist/main/mod.js";

describe("RedisModule", () => {
  /** @type {import('@nestjs/testing').TestingModule} */
  let module;
  /** @type {import('redis').RedisClientType} */
  let redis;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [RedisModule.forRoot()],
    }).compile();
    await module.init();
    redis = module.get(getRedisConnectionToken());
  });
  afterAll(() => module && module.close());
  it("should be defined", () => expect(redis).toBeDefined());
  it("should be ready", () => expect(redis.isReady).toBe(true));
  it("should ping", () => expect(redis.ping()).resolves.toBe("PONG"));
});
