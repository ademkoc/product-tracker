import { amountTransformer, currencyTransformer } from '../common';
import type { ParserConfigs } from '../parser.types';

export const colinsConfig: ParserConfigs = {
  content: {
    selector: 'div.product-details-page',
    schema: {
      title: '.product-detail-product-name',
      amount: {
        selector: '.product-detail-price',
        transform: amountTransformer,
      },
      currency: {
        selector: '.product-detail-price',
        transform: currencyTransformer,
      },
      images: {
        selector: '.product-detail-left img | array',
        attr: 'src',
      },
    },
  },
  price: {
    selector: 'div.product-detail-product-prices-container',
    schema: {
      amount: {
        selector: '.product-detail-price',
        transform: amountTransformer,
      },
      currency: {
        selector: '.product-detail-price',
        transform: currencyTransformer,
      },
    },
  },
};
