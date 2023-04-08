import path from 'node:path';
import { Prisma } from '@prisma/client';
import { beforeEach, describe, expect, it } from 'vitest';

import { Currency } from 'src/constants';
import { LocalTestContext, createTestContext } from './_setup';
import { ColinsParser, MaviParser, ParserFacade, TrendyolParser } from 'src/modules/parsers';

const testContextMavi = createTestContext(
  'https://www.mavi.com',
  path.join(__dirname, 'mock-data', 'mavi_product.html'),
);

const testContextColins = createTestContext(
  'https://www.colins.com.tr',
  path.join(__dirname, 'mock-data', 'colins_product.html'),
);

const testContextTrendyol = createTestContext(
  'https://www.trendyol.com',
  path.join(__dirname, 'mock-data', 'trendyol_product.html'),
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

  describe('parseContent()', () => {
    it<LocalTestContext>('should parse Mavi link', async (context) => {
      testContextMavi.setup(context);

      const url = 'https://www.mavi.com/madrid-acik-mavi-90s-street-jean-pantolon/p/000152-84116';
      await testContextMavi.setupProductMock(context);

      const result = await sut.parseContent(url);

      await testContextColins.teardown(context);

      expect(result).toMatchObject({
        title: expect.stringMatching(/(\w+)/),
        amount: expect.any(Prisma.Decimal),
        currency: expect.stringContaining(Currency.TL),
        images: expect.arrayContaining([
          expect.stringContaining('https://'),
          expect.stringContaining('mavi.com'),
        ]),
      });
    });

    it<LocalTestContext>('should parse Colins link', async (context) => {
      testContextColins.setup(context);

      const url = 'https://www.colins.com.tr/p/regular-fit-dugmeli-cepli-bej-erkek-mont-39024';
      await testContextColins.setupProductMock(context);

      const result = await sut.parseContent(url);

      await testContextColins.teardown(context);

      expect(result).toMatchObject({
        title: expect.stringMatching(/(\w+)/),
        amount: expect.any(Prisma.Decimal),
        currency: expect.stringContaining(Currency.TL),
        images: expect.arrayContaining([expect.stringContaining('https://')]),
      });
    });

    it<LocalTestContext>('should parse TY link', async (context) => {
      testContextTrendyol.setup(context);

      const url =
        'https://www.trendyol.com/apple/iphone-11-128-gb-beyaz-cep-telefonu-aksesuarsiz-kutu-apple-turkiye-garantili-p-64074794';
      await testContextTrendyol.setupProductMock(context);

      const result = await sut.parseContent(url);

      await testContextTrendyol.teardown(context);

      expect(result).toMatchObject({
        title: expect.stringMatching(/(\w+)/),
        amount: expect.any(Prisma.Decimal),
        currency: expect.stringContaining(Currency.TL),
        images: expect.arrayContaining([expect.stringContaining('https://')]),
      });
    });
  });
});
