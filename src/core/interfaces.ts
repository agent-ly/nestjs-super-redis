export interface RedisCoreModuleOptions {
  url?: string;
  retryAttempts?: number;
  retryDelay?: number;
}

export interface RedisCoreModuleExtraOptions {
  connectionName?: string;
}
