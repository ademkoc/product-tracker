import { Prisma } from "@prisma/client";

import { BaseParser } from "./base-parser";
import { ParserConfig, Price } from "./parser.types";
import { CreateProductDTO } from "src/schemas/product";

export class ColinsParser extends BaseParser<CreateProductDTO, Price> {
  public constructor() {
    super();

    const contentConfig: ParserConfig = {
      selector: "div.product-details-page",
      schema: {
        title: ".product-detail-product-name",
        amount: {
          selector: ".product-detail-price",
          transform: this.#amountTransformer,
        },
        currency: {
          selector: ".product-detail-price",
          transform: this.#currencyTransformer,
        },
        images: {
          "selector": ".product-detail-left img | array",
          "attr": "src",
        },
      },
    };

    const priceConfig: ParserConfig = {
      selector: "div.product-detail-product-prices-container",
      schema: {
        amount: {
          selector: ".product-detail-price",
          transform: this.#amountTransformer,
        },
        currency: {
          selector: ".product-detail-price",
          transform: this.#currencyTransformer,
        },
      },
    };

    this.setConfig({ contentConfig, priceConfig });
  }

  #amountTransformer(priceStr: any) {
    const amount = parseFloat(priceStr.slice(0, -3).replace(",", "."));
    return new Prisma.Decimal(amount);
  }

  #currencyTransformer(priceStr: any) {
    const currency = priceStr.slice(-2);
    return currency;
  }
}
