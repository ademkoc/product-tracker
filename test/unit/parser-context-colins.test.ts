import path from 'node:path';
import { Prisma } from '@prisma/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { Currency } from '../../src/constants';
import { LocalTestContext, createTestContext } from './_setup';
import {
  AmazonStrategy,
  ColinsStrategy,
  MaviStrategy,
  ParserContext,
  TrendyolStrategy,
} from '../../src/modules/parsers';

const testContextColins = createTestContext(
  'https://www.colins.com.tr',
  path.join(__dirname, 'mock-data', 'colins_product.html'),
);

describe('ParserContext', () => {
  let sut: ParserContext;

  beforeEach(() => {
    sut = new ParserContext({
      colinsStrategy: new ColinsStrategy(),
      maviStrategy: new MaviStrategy(),
      trendyolStrategy: new TrendyolStrategy(),
      amazonStrategy: new AmazonStrategy(),
    });
  });

  it('is defined', () => {
    expect(sut).toBeDefined();
  });

  beforeEach(testContextColins.setup);
  afterEach(testContextColins.teardown);

  describe('parseContent()', () => {
    it<LocalTestContext>('should parse Colins link', async (context) => {
      const url = 'https://www.colins.com.tr/p/regular-fit-dugmeli-cepli-bej-erkek-mont-39024';
      await testContextColins.setupProductMock(context);

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
