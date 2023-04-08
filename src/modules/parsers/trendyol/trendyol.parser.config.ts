import { amountTransformer, currencyTransformer } from '../common';
import type { ParserConfigs } from '../parser.types';

export const trendyolConfig: ParserConfigs = {
  content: {
    selector: '.product-container',
    schema: {
      title: '.pr-new-br',
      amount: {
        selector: '.product-price-container span.prc-dsc',
        transform: amountTransformer,
      },
      currency: {
        selector: '.product-price-container span.prc-dsc',
        transform: currencyTransformer,
      },
      images: {
        selector: '.gallery-modal-content img | array',
        attr: 'src',
      },
    },
  },
  price: {
    selector: '.product-price-container',
    schema: {
      amount: {
        selector: '.product-price-container span.prc-dsc',
        transform: amountTransformer,
      },
      currency: {
        selector: '.product-price-container span.prc-dsc',
        transform: currencyTransformer,
      },
    },
  },
};
