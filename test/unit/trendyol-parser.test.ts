import path from 'node:path';
import { Prisma } from '@prisma/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { TrendyolParser } from '../../src/modules/parsers';
import { createTestContext, type LocalTestContext } from './_setup';
import { Currency } from '../../src/constants';

const testContext = createTestContext(
  'https://www.trendyol.com',
  path.join(__dirname, 'mock-data', 'trendyol_product.html'),
);

describe('TrendyolParser', () => {
  let sut: TrendyolParser;

  beforeEach<LocalTestContext>(testContext.setup);
  afterEach<LocalTestContext>(testContext.teardown);

  beforeEach<LocalTestContext>(() => {
    sut = new TrendyolParser();
  });

  it('is defined', () => {
    expect(sut).is.toBeDefined();
  });

  describe('parseContent', () => {
    it<LocalTestContext>('should read product details', async (context) => {
      const url =
        'https://www.trendyol.com/adidas/unisex-beyaz-breaknet-spor-ayakkabi-fx8725-p-77796149';
      await testContext.setupProductMock(context);

      const result = await sut.parseContent(url);

      expect(result).toMatchObject({
        title: expect.stringMatching(/(\w+)/),
        amount: expect.any(Prisma.Decimal),
        currency: expect.stringContaining(Currency.TL),
        images: expect.arrayContaining([
          expect.stringContaining('https://'),
          expect.stringContaining('dsmcdn.com'),
        ]),
      });
    });
  });

  describe('parsePrice()', () => {
    it<LocalTestContext>('should read only product price', async (context) => {
      const url =
        'https://www.trendyol.com/adidas/unisex-beyaz-breaknet-spor-ayakkabi-fx8725-p-77796149';
      await testContext.setupProductMock(context);

      const result = await sut.parsePrice(url);

      expect(result).toMatchObject({
        amount: expect.any(Prisma.Decimal),
        currency: expect.stringContaining(Currency.TL),
      });
    });
  });
});
