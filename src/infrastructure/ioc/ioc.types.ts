import type { PrismaClient } from '@prisma/client';
import type { PushNotificationService } from 'src/modules/notification/push/push-notification.service';
import type { IParser } from 'src/modules/parsers';

import type { CheckProductPriceJob, ProductService } from '../../modules/product';

export interface ICradle {
  prismaService: PrismaClient;
  productService: ProductService;
  parser: IParser;
  colinsParser: IParser;
  maviParser: IParser;
  trendyolParser: IParser;
  checkProductPriceJob: CheckProductPriceJob;
  pushNotificationService: PushNotificationService;
}

declare module '@fastify/awilix' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Cradle extends ICradle {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface RequestCradle extends ICradle {}
}
