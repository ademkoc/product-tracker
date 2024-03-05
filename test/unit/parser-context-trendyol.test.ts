import path from 'node:path';
import { Prisma } from '@prisma/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { Currency } from '../../src/constants';
import { LocalTestContext, createTestContext } from './_setup';
import { ColinsStrategy, MaviStrategy, ParserContext, TrendyolStrategy } from '../../src/modules/parsers';

const testContextTrendyol = createTestContext(
  'https://www.trendyol.com',
  path.join(__dirname, 'mock-data', 'trendyol_product.html'),
);

describe('ParserContext', () => {
  let sut: ParserContext;

  beforeEach(() => {
    sut = new ParserContext({
      colinsStrategy: new ColinsStrategy(),
      maviStrategy: new MaviStrategy(),
      trendyolStrategy: new TrendyolStrategy(),
    });
  });

  it('is defined', () => {
    expect(sut).toBeDefined();
  });

  beforeEach(testContextTrendyol.setup);
  afterEach(testContextTrendyol.teardown);

  describe('parseContent()', () => {
    it<LocalTestContext>('should parse TY link', async (context) => {
      const url =
        'https://www.trendyol.com/apple/iphone-11-128-gb-beyaz-cep-telefonu-aksesuarsiz-kutu-apple-turkiye-garantili-p-64074794';
      await testContextTrendyol.setupProductMock(context);

      const result = await sut.parseContent(url);

      expect(result).toMatchObject({
        title: expect.stringMatching(/(\w+)/),
        amount: expect.any(Prisma.Decimal),
        currency: expect.stringContaining(Currency.TL),
        images: expect.arrayContaining([expect.stringContaining('https://')]),
      });
    });
  });
});
