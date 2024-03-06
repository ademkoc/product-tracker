import { amountTransformer, currencyTransformer } from '../common';
import type { ParserConfigs } from '../parser.types';

export const amazonConfig: ParserConfigs = {
  content: {
    selector: '#ppd',
    schema: {
      title: '#titleSection #productTitle',
      amount: {
        selector: '#corePrice_feature_div .a-offscreen',
        transform: amountTransformer,
      },
      currency: {
        selector: '#corePrice_feature_div .a-price-symbol',
        transform: currencyTransformer,
      },
      images: {
        selector: 'img#landingImage | array',
        attr: 'src',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
        transform: (image: any) => image,
      },
    },
  },
  price: {
    selector: '#corePrice_feature_div',
    schema: {
      amount: {
        selector: '.a-offscreen',
        transform: amountTransformer,
      },
      currency: {
        selector: '.a-price-symbol',
        transform: currencyTransformer,
      },
    },
  },
};
