import { PrismaClient } from '@prisma/client';
import type { AwilixContainer } from 'awilix';
import { asValue, Lifetime, asClass, asFunction } from 'awilix';
import { pino } from 'pino';

import { PushNotificationService } from '../../modules/notification/push/push-notification.service';
import {
  ColinsStrategy,
  MaviStrategy,
  ParserContext,
  TrendyolStrategy,
} from '../../modules/parsers';
import { CheckProductPriceJob, ProductService } from '../../modules/product';
import { getConfig } from '../config';

import type { ExternalDependencies } from './ioc.types';

export const SINGLETON_CONFIG = { lifetime: Lifetime.SINGLETON };

export function registerDependencies(
  diContainer: AwilixContainer,
  dependencies: ExternalDependencies = {},
) {
  diContainer.register({
    config: asValue(getConfig()),
    logger: asFunction(() => dependencies.logger ?? pino(), SINGLETON_CONFIG),

    // database
    prismaService: asFunction(() => new PrismaClient(), {
      ...SINGLETON_CONFIG,
      dispose: (prisma) => {
        return prisma.$disconnect();
      },
    }),

    // parser module
    parser: asClass(ParserContext, SINGLETON_CONFIG),
    colinsStrategy: asClass(ColinsStrategy, SINGLETON_CONFIG),
    maviStrategy: asClass(MaviStrategy, SINGLETON_CONFIG),
    trendyolStrategy: asClass(TrendyolStrategy, SINGLETON_CONFIG),

    // product module
    productService: asClass(ProductService),
    checkProductPriceJob: asClass(CheckProductPriceJob),
    pushNotificationService: asClass(PushNotificationService),
  });
}
