import path from "node:path";
import { Prisma } from "@prisma/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { Currency } from "../../src/constants/currencies";
import { ColinsParser } from "../../src/modules/parsers/colins/colins.parser";
import { createTestContext, type LocalTestContext } from "./_setup";

const testContext = createTestContext(
  "https://www.colins.com.tr",
  path.join(__dirname, "mock-data", "colins_product.html"),
);

describe("ColinsParser", () => {
  let sut: ColinsParser;

  beforeEach<LocalTestContext>(testContext.setup);
  afterEach<LocalTestContext>(testContext.teardown);

  beforeEach<LocalTestContext>(() => {
    sut = new ColinsParser();
  });

  it("is defined", () => {
    expect(sut).is.toBeDefined();
  });

  describe("parseContent()", () => {
    it<LocalTestContext>("should read product details", async (context) => {
      const url =
        "https://www.colins.com.tr/p/regular-fit-dugmeli-cepli-bej-erkek-mont-39024";
      await testContext.setupProductMock(context);

      const result = await sut.parseContent(url);

      expect(result).toMatchObject({
        title: expect.stringMatching(/(\w+)/),
        amount: expect.any(Prisma.Decimal),
        currency: expect.stringContaining(Currency.TL),
        images: expect.arrayContaining([
          expect.stringContaining("https://"),
          expect.stringContaining(".jpeg"),
        ]),
      });
    });
  });

  describe("parsePrice()", () => {
    it<LocalTestContext>("should read only product price", async (context) => {
      const url =
        "https://www.colins.com.tr/p/regular-fit-dugmeli-cepli-bej-erkek-mont-39024";
      await testContext.setupProductMock(context);

      const result = await sut.parsePrice(url);

      expect(result).toMatchObject({
        amount: expect.any(Prisma.Decimal),
        currency: expect.stringContaining(Currency.TL),
      });
    });
  });
});
