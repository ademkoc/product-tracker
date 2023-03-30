import camelcase from "camelcase";

import { ColinsProduct, ParserConfig, Price } from "./types";
import { BaseParser } from "./base-parser";
import { convertTurkishChars as en } from "../../utils";

export class ColinsParser extends BaseParser<ColinsProduct, Price> {
  public constructor() {
    super();

    const contentConfig: ParserConfig = {
      selector: "div.product-details-page",
      schema: {
        title: ".product-detail-product-name",
        price: {
          selector: ".product-detail-price",
          transform: this.priceTransformer,
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
        price: {
          selector: ".product-detail-price",
          transform: this.priceTransformer,
        },
      },
    };

    this.setConfig({ contentConfig, priceConfig });
  }

  recordTransformser(value: any) {
    return camelcase(en(value.slice(0, -2)));
  }

  priceTransformer(priceStr: any) {
    const currency = priceStr.slice(-2);
    const amount = parseFloat(priceStr.slice(0, -3).replace(",", "."));
    return { currency, amount };
  }
}
