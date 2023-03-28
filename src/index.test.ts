import { readFileSync } from "fs";
import { MockAgent, setGlobalDispatcher } from "undici";
import { beforeAll, describe, expect, it } from "vitest";

import { decodeSource, readProductSource } from "./index";

function setup() {
  const mockAgent = new MockAgent();
  mockAgent.disableNetConnect();
  setGlobalDispatcher(mockAgent);

  const mockPool = mockAgent.get("https://www.colins.com.tr");
  const mockResponse = readFileSync("./src/mock-data/product.html");

  mockPool.intercept({
    path: new RegExp("/p/(.*?)"),
    method: "GET",
  }).reply(200, mockResponse.toString());
}

beforeAll(() => setup());

describe("index.ts", () => {
  it("should read product detail", async () => {
    const url =
      "https://www.colins.com.tr/p/regular-fit-dugmeli-cepli-bej-erkek-mont-39024";
    const html = await readProductSource(url);

    const result = await decodeSource(html);

    expect(result).toMatchObject({
      title: "Regular Fit Düğmeli Cepli Bej Erkek Mont",
      price: "1199,95 TL",
    });
  });
});
