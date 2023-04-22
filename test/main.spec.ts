import { Test, type TestingModule } from "@nestjs/testing";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { RedisModule, getRedisConnectionToken } from "../src/main/mod.js";

describe("RedisModule", () => {
  let moduleRef: TestingModule;
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        RedisModule.forRoot(),
        RedisModule.forRoot({ connectionName: "test" }),
      ],
    }).compile();
    await moduleRef.init();
  });
  afterAll(() => moduleRef && moduleRef.close());
  it("should resolve default connection", () =>
    expect(moduleRef.get(getRedisConnectionToken())).not.toBeNull());
  it("should resolve named connection", () =>
    expect(moduleRef.get(getRedisConnectionToken("test"))).not.toBeNull());
});
