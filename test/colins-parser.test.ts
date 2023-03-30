import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { Curreny } from "../src/constants/currencies";
import { ColinsParser } from "../src/modules/parsers/colins.parser";
import { LocalTestContext, setup, setupProductMock, teardown } from "./_setup";

beforeEach<LocalTestContext>(setup);
afterEach<LocalTestContext>(teardown);

describe("ColinsParser", () => {
  describe("parseContent()", () => {
    it<LocalTestContext>("should read product details", async (context) => {
      const url =
        "https://www.colins.com.tr/p/regular-fit-dugmeli-cepli-bej-erkek-mont-39024";
      await setupProductMock(context);

      const parser = new ColinsParser();
      const result = await parser.parseContent(url);

      expect(result).toMatchObject({
        title: expect.stringMatching(/(\w+)/),
        amount: expect.any(Number),
        currency: expect.stringContaining(Curreny.TL),
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
      await setupProductMock(context);

      const parser = new ColinsParser();
      const result = await parser.parsePrice(url);

      expect(result).toMatchObject({
        amount: expect.any(Number),
        currency: expect.stringContaining(Curreny.TL),
      });
    });
  });
});
