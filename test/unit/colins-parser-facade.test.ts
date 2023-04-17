import path from 'node:path';
import { Prisma } from '@prisma/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { Currency } from 'src/constants';
import { LocalTestContext, createTestContext } from './_setup';
import { ColinsParser, MaviParser, ParserFacade, TrendyolParser } from 'src/modules/parsers';

const testContextColins = createTestContext(
  'https://www.colins.com.tr',
  path.join(__dirname, 'mock-data', 'colins_product.html'),
);

describe('ParserFacade', () => {
  let sut: ParserFacade;

  beforeEach(() => {
    sut = new ParserFacade({
      colinsParser: new ColinsParser(),
      maviParser: new MaviParser(),
      trendyolParser: new TrendyolParser(),
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
