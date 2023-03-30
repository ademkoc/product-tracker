import { DateTime } from "luxon";
import { PrismaClient, Product } from "@prisma/client";

import { ColinsParser } from "../../parsers";

export class CheckProductPriceJob {
  private readonly parser: ColinsParser;
  private readonly prismaService: PrismaClient;

  public constructor(opts: any) {
    this.prismaService = opts.prismaService;
    this.parser = opts.parser;
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
      return;
    }

    console.info(`Checking %s product...`, products.length);

    await Promise.all(
      products.map((product) => this.checkProductPriceState(product)),
    );

    console.info(`Finito.`);
  }

  async checkProductPriceState(product: Product) {
    const newPriceState = await this.parser.parsePrice(product.url);

    if (product.amount.equals(newPriceState.amount) === false) {
      await this.prismaService.priceHistory.create({
        data: {
          productId: product.id,
          amount: newPriceState.amount,
          currency: newPriceState.currency,
        },
      });
    }

    await this.prismaService.product.update({
      where: { id: product.id },
      data: { lastCheckedAt: new Date() },
    });

    if (product.amount.greaterThan(newPriceState.amount)) {
      throw new Error("Price drop");
    }
  }
}
