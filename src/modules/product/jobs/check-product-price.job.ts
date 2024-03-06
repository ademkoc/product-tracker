import type { PrismaClient, Product } from '@prisma/client';
import type { FastifyBaseLogger } from 'fastify';
import { DateTime } from 'luxon';
import type { ICradle } from 'src/infrastructure';
import type { IConfig } from 'src/infrastructure/config/config.type';
import type { PushNotificationService } from 'src/modules/notification/push/push-notification.service';
import type { NotifyOptions } from 'src/modules/notification/push/push-notification.types';
import type { IParser } from 'src/modules/parsers';

type ConstructorOptions = Pick<
  ICradle,
  'parser' | 'prismaService' | 'pushNotificationService' | 'logger' | 'config'
>;

export class CheckProductPriceJob {
  private readonly config: IConfig;
  private readonly logger: FastifyBaseLogger;
  private readonly parser: IParser;
  private readonly prismaService: PrismaClient;
  private readonly notificationService: PushNotificationService;

  public constructor(opts: ConstructorOptions) {
    this.config = opts.config;
    this.logger = opts.logger;
    this.parser = opts.parser;
    this.prismaService = opts.prismaService;
    this.notificationService = opts.pushNotificationService;
  }

  async process() {
    const products = await this.prismaService.product.findMany({
      where: {
        lastCheckedAt: {
          lte: DateTime.now()
            .minus({ minutes: this.config.productSinceLastCheckInMins })
            .toJSDate(),
        },
      },
    });

    if (products.length < 1) {
      this.logger.info('Nothing to check.');
      return;
    }

    this.logger.info('Checking %s product...', products.length);

    await Promise.all(products.map((product) => this.#checkCurrentPrice(product)));

    this.logger.info('CheckProductPriceJob end.');
  }

  async #checkCurrentPrice(product: Product) {
    this.logger.info('Checking product #%s ...', product.id);

    let currentPrice;
    try {
      currentPrice = await this.parser.parsePrice(product.url);
    } catch (error) {
      this.logger.error(error);
      this.logger.error('Checking product #%s is failed!', product.id);
      return;
    }

    if (product.amount.equals(currentPrice.amount) === false) {
      this.logger.info(
        'Product #%s price value is changed. Old price %s %s new price %s %s',
        product.id,
        product.amount,
        product.currency,
        currentPrice.amount,
        currentPrice.currency,
      );

      await this.prismaService.priceHistory.create({
        data: {
          productId: product.id,
          amount: currentPrice.amount,
          currency: currentPrice.currency,
        },
      });
    }

    if (currentPrice.amount.lessThan(product.amount)) {
      const notificationOptions = {
        title: unescape(encodeURIComponent('Fiyat Düştü!')),
        message: `${product.title} ürününün fiyatı ${currentPrice.amount
          .toNumber()
          .toLocaleString('tr-TR')} ${currentPrice.currency} olarak güncellendi.`,
        tags: ['zap', 'tada'],
        priority: 'default',
        actionLink: product.url,
      } as NotifyOptions;

      await this.notificationService.notify(notificationOptions);
    }

    await this.prismaService.product.update({
      where: { id: product.id },
      data: {
        amount: currentPrice.amount,
        currency: currentPrice.currency,
        lastCheckedAt: new Date(),
      },
    });

    this.logger.info('Checking product #%s is over.', product.id);
  }
}
