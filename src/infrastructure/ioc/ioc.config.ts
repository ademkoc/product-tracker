import { diContainer } from '@fastify/awilix';
import { PrismaClient } from '@prisma/client';
import { Lifetime, asClass, asFunction } from 'awilix';

import { PushNotificationService } from '../../modules/notification/push/push-notification.service';
import { ColinsParser, MaviParser, ParserFacade, TrendyolParser } from '../../modules/parsers';
import { CheckProductPriceJob, ProductService } from '../../modules/product';

export const SINGLETON_CONFIG = { lifetime: Lifetime.SINGLETON };

export function buildContainer() {
  diContainer.register({
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
