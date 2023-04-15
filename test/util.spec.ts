import { Test, type TestingModule } from "@nestjs/testing";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { RedisModule } from "../dist/main/mod.js";
import { RedisUtilModule, RedisUtilService } from "../dist/util/mod.js";

describe("RedisModule", () => {
  let module: TestingModule;
  let utilService: RedisUtilService;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [RedisModule.forRoot(), RedisUtilModule.register()],
    }).compile();
    await module.init();
    utilService = module.get(RedisUtilService);
  });
  afterAll(() => module && module.close());
  it("should be defined", () => expect(utilService).toBeDefined());
});
