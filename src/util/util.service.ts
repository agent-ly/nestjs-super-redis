import { Inject } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import type { RedisClientType } from "redis";

import { getRedisConnectionToken } from "../common/tokens.util.js";
import { CONNECTION_NAME_TOKEN } from "./util.constants.js";

export class RedisUtilService {
  private client!: RedisClientType;

  constructor(
    @Inject(ModuleRef) private readonly moduleRef: ModuleRef,
    @Inject(CONNECTION_NAME_TOKEN) private readonly connectionName: string
  ) {}

  onModuleInit() {
    this.client = this.moduleRef.get(
      getRedisConnectionToken(this.connectionName),
      { strict: false }
    );
  }

  getClient() {
    return this.client;
  }

  /** @returns value or null if value does not exist */
  async getAndDelete(key: string) {
    const value = await this.client.get(key);
    if (value === null) return null;
    await this.client.del(key);
    return value;
  }

  /** @returns value or defaultValue if value is null */
  async getOrDefault<T>(key: string, defaultValue: T) {
    const value = await this.client.get(key);
    return value === null && defaultValue !== undefined ? defaultValue : value;
  }

  /** @returns parsed value or defaultValue if value is null */
  async getParsed<T>(
    key: string,
    parse: (value: string) => T,
    defaultValue?: T
  ) {
    const value = await this.getOrDefault(key, defaultValue);
    if (typeof value === "string" && defaultValue === undefined)
      return parse(value);
    return value;
  }

  /** @returns true if lock exists, false otherwise */
  async isLocked(key: string) {
    const exists = await this.client.exists(key);
    return exists === 1;
  }

  /** @returns ttl in milliseconds or null if lock does not exist */
  async getLockTtl(key: string) {
    const value = await this.client.ttl(key);
    return value === -1 ? null : value;
  }

  /**
   * @param ttl in milliseconds
   * @returns true if lock was acquired, false otherwise
   */
  async acquireLock(key: string, ttl: number) {
    const value = Date.now() + ttl;
    const result = await this.client.set(key, value, { PX: ttl, NX: true });
    return result === "OK";
  }

  /**
   * @param ttl in milliseconds
   * @returns true if lock was refreshed, false otherwise
   */
  async refreshLock(key: string, ttl: number) {
    const value = Date.now() + ttl;
    const result = await this.client.set(key, value, { PX: ttl, XX: true });
    return result === "OK";
  }

  /** @returns true if lock was released, false otherwise */
  async releaseLock(key: string) {
    const result = await this.client.del(key);
    return result === 1;
  }

  /**
   * @param ttl in milliseconds
   * @returns value returned by callback or false if lock could not be acquired
   */
  async withLock<T>(key: string, ttl: number, callback: () => Promise<T>) {
    if (await this.acquireLock(key, ttl)) {
      try {
        return await callback();
      } finally {
        await this.releaseLock(key);
      }
    }
    return false;
  }
}
