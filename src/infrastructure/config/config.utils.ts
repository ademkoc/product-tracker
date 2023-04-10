import type { Maybe } from 'src/utils';

import type { Environment, EnvValue } from './config.type';

export function resolveEnvValue<T>(environment: Environment, envValue: EnvValue<T>): T {
  return envValue[environment];
}

export function getEnv<T extends string>(key: string): Maybe<T> {
  return process.env[key] as T;
}

export function getMandatoryEnv(key: string): string {
  const value = getEnv(key);
  if (typeof value === 'undefined') {
    throw new Error(`Unable to find env var with key: '${key}'`);
  }
  return value;
}
