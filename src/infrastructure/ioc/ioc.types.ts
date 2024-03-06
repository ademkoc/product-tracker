import type { PrismaClient } from '@prisma/client';
import type { FastifyInstance, FastifyBaseLogger } from 'fastify';
import type { PushNotificationService } from 'src/modules/notification/push/push-notification.service';
import type { IParser } from 'src/modules/parsers';

import type { CheckProductPriceJob, ProductService } from '../../modules/product';
import type { IConfig } from '../config/config.type';

export interface ICradle {
  logger: FastifyBaseLogger;
  config: IConfig;
  prismaService: PrismaClient;
  productService: ProductService;
  parser: IParser;
  colinsStrategy: IParser;
  maviStrategy: IParser;
  trendyolStrategy: IParser;
  amazonStrategy: IParser;
  checkProductPriceJob: CheckProductPriceJob;
  pushNotificationService: PushNotificationService;
}

export type ExternalDependencies = {
  app?: FastifyInstance;
  logger?: FastifyBaseLogger;
};

declare module '@fastify/awilix' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Cradle extends ICradle {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface RequestCradle extends ICradle {}
}
