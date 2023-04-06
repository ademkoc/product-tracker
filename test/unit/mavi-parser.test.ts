import path from 'node:path';
import { Prisma } from '@prisma/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { MaviParser } from '../../src/modules/parsers/mavi/mavi.parser';
import { createTestContext, type LocalTestContext } from './_setup';
import { Currency } from '../../src/constants';

const testContext = createTestContext(
  'https://www.mavi.com',
  path.join(__dirname, 'mock-data', 'mavi_product.html'),
);

describe('MaviParser', () => {
  let sut: MaviParser;

  beforeEach<LocalTestContext>(testContext.setup);
  afterEach<LocalTestContext>(testContext.teardown);

  beforeEach<LocalTestContext>(() => {
    sut = new MaviParser();
  });

  it('is defined', () => {
    expect(sut).is.toBeDefined();
  });

  describe('parseContent', () => {
    it<LocalTestContext>('should read product details', async (context) => {
      const url = 'https://www.mavi.com/madrid-acik-mavi-90s-street-jean-pantolon/p/000152-84116';
      await testContext.setupProductMock(context);

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
});
