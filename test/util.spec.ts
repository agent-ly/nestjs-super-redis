import { Test } from "@nestjs/testing";
import { describe, it } from "vitest";

import { RedisModule } from "../src/main/mod.js";
import { RedisUtilModule } from "../src/util/mod.js";

describe("RedisUtilModule", () => {
  it("should compile with the default client", async () => {
    await Test.createTestingModule({
      imports: [RedisModule.forRoot(), RedisUtilModule.register()],
    }).compile();
  });
  it("Should compile with a named client", async () => {
    await Test.createTestingModule({
      imports: [
        RedisModule.forRoot({ connectionName: "test" }),
        RedisUtilModule.register("test"),
      ],
    }).compile();
  });
});
