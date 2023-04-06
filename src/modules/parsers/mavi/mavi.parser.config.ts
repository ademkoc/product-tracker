import { amountTransformer, currencyTransformer } from '../common';
import type { ParserConfigs } from '../parser.types';

export const maviConfig: ParserConfigs = {
  content: {
    selector: '.product__wrapper',
    schema: {
      title: '.product__title',
      amount: {
        selector: '.price',
        transform: amountTransformer,
      },
      currency: {
        selector: '.price',
        transform: currencyTransformer,
      },
      images: {
        selector: '#swiper-wrapper img | array',
        attr: 'src',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        transform: (image: any) => image.replace('//', 'https://'),
      },
    },
  },
  price: {
    selector: '.product__product-pricing',
    schema: {
      amount: {
        selector: '.price',
        transform: amountTransformer,
      },
      currency: {
        selector: '.price',
        transform: currencyTransformer,
      },
    },
  },
};
