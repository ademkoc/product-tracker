import { DateTime } from "luxon";
import { PrismaClient, Product } from "@prisma/client";

import { ColinsParser } from "../../parsers";
import { PushNotificationService } from "src/modules/notification/push/push-notification.service";
import { NotifyOptions } from "src/modules/notification/push/push-notification.types";

export class CheckProductPriceJob {
  private readonly parser: ColinsParser;
  private readonly prismaService: PrismaClient;
  private readonly notificationService: PushNotificationService;

  public constructor(opts: any) {
    this.prismaService = opts.prismaService;
    this.parser = opts.parser;
    this.notificationService = opts.notificationService;
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
      console.info("Nothing to check.");
      return;
    }

    console.info(`Checking %s product...`, products.length);

    await Promise.all(
      products.map((product) => this.checkCurrentPrice(product)),
    );

    console.info(`Finito.`);
  }

  async checkCurrentPrice(product: Product) {
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
        title: unescape(encodeURIComponent("Fiyat Düştü!")),
        message:
          `${product.title} ürününün fiyatı ${currentPrice.amount} olarak güncellendi.`,
        tags: ["zap", "tada"],
        priority: "default",
      } as NotifyOptions;

      this.notificationService.notify(notificationOptions);
    }

    await this.prismaService.product.update({
      where: { id: product.id },
      data: { lastCheckedAt: new Date() },
    });
  }
}
