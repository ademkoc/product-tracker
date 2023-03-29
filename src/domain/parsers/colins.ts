import camelcase from "camelcase";

import { BaseParser } from "./base-parser";
import { convertTurkishChars as en } from "../../utils";

export class ColinsParser extends BaseParser {
  public constructor() {
    super();

    const config = {
      schema: {
        title: ".product-detail-product-name",
        price: ".product-detail-price",
        details: {
          selector: "div#tabitem1 table tbody tr | array",
          schema: {
            key: {
              selector: "th:nth-child(1)",
              transform: (value: any) => camelcase(en(value.slice(0, -2))),
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
}
