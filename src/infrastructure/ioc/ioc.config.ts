import { PrismaClient } from '@prisma/client';
import type { AwilixContainer } from 'awilix';
import { Lifetime, asClass, asFunction } from 'awilix';
import { pino } from 'pino';

import { PushNotificationService } from '../../modules/notification/push/push-notification.service';
import { ColinsParser, MaviParser, ParserFacade, TrendyolParser } from '../../modules/parsers';
import { CheckProductPriceJob, ProductService } from '../../modules/product';

import type { ExternalDependencies } from './ioc.types';

export const SINGLETON_CONFIG = { lifetime: Lifetime.SINGLETON };

export function registerDependencies(
  diContainer: AwilixContainer,
  dependencies: ExternalDependencies = {},
) {
  diContainer.register({
    logger: asFunction(() => dependencies.logger ?? pino(), SINGLETON_CONFIG),

    // database
    prismaService: asFunction(() => new PrismaClient(), {
      ...SINGLETON_CONFIG,
      dispose: (prisma) => {
        return prisma.$disconnect();
      },
    }),

    // parser module
    parser: asClass(ParserFacade, SINGLETON_CONFIG),
    colinsParser: asClass(ColinsParser, SINGLETON_CONFIG),
    maviParser: asClass(MaviParser, SINGLETON_CONFIG),
    trendyolParser: asClass(TrendyolParser, SINGLETON_CONFIG),

    // product module
    productService: asClass(ProductService),
    checkProductPriceJob: asClass(CheckProductPriceJob),
    pushNotificationService: asClass(PushNotificationService),
  });
}
