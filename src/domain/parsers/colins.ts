import camelcase from "camelcase";

import { BaseParser } from "./base-parser";
import { convertTurkishChars as en } from "../../utils";

export class ColinsParser extends BaseParser {
  public constructor() {
    super();

    const config = {
      schema: {
        title: ".product-detail-product-name",
        price: {
          selector: ".product-detail-price",
          transform: this.priceTransformer,
        },
        details: {
          selector: "div#tabitem1 table tbody tr | array",
          schema: {
            key: {
              selector: "th:nth-child(1)",
              transform: this.recordTransformser,
            },
            value: "td:nth-child(2)",
          },
        },
        images: {
          "selector": ".product-detail-left img | array",
          "attr": "src",
        },
      },
    };

    this.setConfig(config);
  }

  recordTransformser(value: string) {
    return camelcase(en(value.slice(0, -2)));
  }

  priceTransformer(priceStr: string) {
    const currency = priceStr.slice(-2);
    const amount = parseFloat(priceStr.slice(0, -3).replace(",", "."));
    return { currency, amount };
  }
}
