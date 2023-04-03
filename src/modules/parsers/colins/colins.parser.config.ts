import { ParserConfig } from "../parser.types";
import { amountTransformer, currencyTransformer } from "./colins.helpers";

export const contentConfig: ParserConfig = {
  selector: "div.product-details-page",
  schema: {
    title: ".product-detail-product-name",
    amount: {
      selector: ".product-detail-price",
      transform: amountTransformer,
    },
    currency: {
      selector: ".product-detail-price",
      transform: currencyTransformer,
    },
    images: {
      "selector": ".product-detail-left img | array",
      "attr": "src",
    },
  },
};

export const priceConfig: ParserConfig = {
  selector: "div.product-detail-product-prices-container",
  schema: {
    amount: {
      selector: ".product-detail-price",
      transform: amountTransformer,
    },
    currency: {
      selector: ".product-detail-price",
      transform: currencyTransformer,
    },
  },
};
