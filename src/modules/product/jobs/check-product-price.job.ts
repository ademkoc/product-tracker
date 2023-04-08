import type { PrismaClient, Product } from '@prisma/client';
import { DateTime } from 'luxon';
import type { ICradle } from 'src/infrastructure';
import type { PushNotificationService } from 'src/modules/notification/push/push-notification.service';
import type { NotifyOptions } from 'src/modules/notification/push/push-notification.types';
import type { IParser } from 'src/modules/parsers';

type ConstructorOptions = Pick<ICradle, 'parser' | 'prismaService' | 'pushNotificationService'>;

export class CheckProductPriceJob {
  private readonly parser: IParser;
  private readonly prismaService: PrismaClient;
  private readonly notificationService: PushNotificationService;

  public constructor(opts: ConstructorOptions) {
    this.parser = opts.parser;
    this.prismaService = opts.prismaService;
    this.notificationService = opts.pushNotificationService;
  }

  async process() {
    const products = await this.prismaService.product.findMany({
      where: {
        lastCheckedAt: {
          lte: DateTime.now().minus({ minutes: 15 }).toJSDate(),
        },
      },
    });

    if (products.length < 1) {
      console.info('Nothing to check.');
      return;
    }

    console.info(`Checking %s product...`, products.length);

    await Promise.all(products.map((product) => this.#checkCurrentPrice(product)));

    console.info(`Finito.`);
  }

  async #checkCurrentPrice(product: Product) {
    const currentPrice = await this.parser.parsePrice(product.url);

    if (product.amount.equals(currentPrice.amount) === false) {
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
        message: `${
          product.title
        } ürününün fiyatı ${currentPrice.amount.toString()} olarak güncellendi.`,
        tags: ['zap', 'tada'],
        priority: 'default',
        actionLink: product.url,
      } as NotifyOptions;

      await this.notificationService.notify(notificationOptions);
    }

    await this.prismaService.product.update({
      where: { id: product.id },
      data: { lastCheckedAt: new Date() },
    });
  }
}
