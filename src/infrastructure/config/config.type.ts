export enum Environment {
  test = 'test',
  production = 'production',
  development = 'development',
}

export type EnvValue<T> = Record<Environment, T>;

export interface IConfig {
  serviceName: string;
  port: number;
  environment: Environment;
  notificationTopic: string;
  notificationServiceURL: string;
  checkProductPriceInMins: number;
  productLastCheckInMins: number;
}
