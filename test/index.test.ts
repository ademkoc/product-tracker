import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  TestContext,
} from "vitest";
import { decodeSource, readProductSource } from "../src/index";
import { LocalTestContext, setup, setupProductMock, teardown } from "./_setup";

beforeEach<LocalTestContext>(setup);
afterEach<LocalTestContext>(teardown);

describe("index.ts", () => {
  it<LocalTestContext>("should read product detail", async (context) => {
    const url =
      "https://www.colins.com.tr/p/regular-fit-dugmeli-cepli-bej-erkek-mont-39024";
    await setupProductMock(context);

    const html = await readProductSource(url);

    const result = await decodeSource(html);

    expect(result).toMatchObject({
      title: expect.stringMatching(/(\w+)/),
      price: expect.stringMatching(/(\d+) TL/),
      images: expect.arrayContaining([
        expect.stringContaining("https://"),
        expect.stringContaining(".jpeg"),
      ]),
      details: expect.arrayContaining([
        {
          "key": "urunKodu",
          "value": expect.stringMatching(/(\w+)/),
        },
      ]),
    });
  });
});
