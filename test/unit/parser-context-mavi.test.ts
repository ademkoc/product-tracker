import path from 'node:path';
import { Prisma } from '@prisma/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { Currency } from 'src/constants';
import { LocalTestContext, createTestContext } from './_setup';
import { ColinsStrategy, MaviStrategy, ParserContext, TrendyolStrategy } from 'src/modules/parsers';

const testContextMavi = createTestContext(
  'https://www.mavi.com',
  path.join(__dirname, 'mock-data', 'mavi_product.html'),
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

  beforeEach(testContextMavi.setup);
  afterEach(testContextMavi.teardown);

  describe('parseContent()', () => {
    it<LocalTestContext>('should parse Mavi link', async (context) => {
      const url = 'https://www.mavi.com/madrid-acik-mavi-90s-street-jean-pantolon/p/000152-84116';
      await testContextMavi.setupProductMock(context);

      const result = await sut.parseContent(url);

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
  });

  describe('#readSource()', () => {
    it<LocalTestContext>('should throw an error when product link is redirected', async (context) => {
      const url = new URL(
        'https://www.mavi.com/madrid-acik-mavi-90s-street-jean-pantolon/p/000152-84116',
      );

      context
        .intercept({
          path: '/some-redirection-page',
          method: 'GET',
        })
        .reply(200);

      context
        .intercept({
          path: url.pathname,
          method: 'GET',
        })
        .reply(301, 'Moved Permanently', { headers: { location: '/some-redirection-page' } });

      await expect(() => sut.parseContent(url.toString())).rejects.toThrowError(
        'FETCH_RESPONSE_IS_REDIRECTED',
      );
    });

    it<LocalTestContext>('should throw an error when product fetch is failed', async (context) => {
      const url = new URL(
        'https://www.mavi.com/madrid-acik-mavi-90s-street-jean-pantolon/p/000152-84116',
      );

      context
        .intercept({
          path: url.pathname,
          method: 'GET',
        })
        .reply(502);

      await expect(() => sut.parseContent(url.toString())).rejects.toThrowError(
        'FETCH_RESPONSE_NOT_OK',
      );
    });
  });

  describe('#decodeSource()', () => {
    it<LocalTestContext>('should throw an error when product fetch is failed', async (context) => {
      const url = new URL(
        'https://www.mavi.com/madrid-acik-mavi-90s-street-jean-pantolon/p/000152-84116',
      );

      context
        .intercept({
          path: url.pathname,
          method: 'GET',
        })
        .reply(200, '<html></html>');

      await expect(() => sut.parseContent(url.toString())).rejects.toThrowError(
        'CONFIG_NOT_MATCHED',
      );
    });
  });
});
