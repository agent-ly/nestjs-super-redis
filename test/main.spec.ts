import { Test, type TestingModule } from "@nestjs/testing";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { RedisModule, getRedisConnectionToken } from "../dist/main/mod.js";

describe("RedisModule", () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [RedisModule.forRoot()],
    }).compile();
    await module.init();
  });
  afterAll(() => module && module.close());
  it("should resolve", () =>
    expect(module.get(getRedisConnectionToken())).toBeDefined());
});
