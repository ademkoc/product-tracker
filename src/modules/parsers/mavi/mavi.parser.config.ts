import { ParserConfigs } from '../parser.types';
import { amountTransformer, currencyTransformer } from '../common';

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
