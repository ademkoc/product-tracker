import { Prisma, PrismaClient } from "@prisma/client";
import { mockClear, mockDeep } from "vitest-mock-extended";
import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";

import { ColinsParser } from "src/modules/parsers";
import { CheckProductPriceJob } from "src/modules/product/jobs/check-product-price.job";

const mockedParser = mockDeep<ColinsParser>();
const mockedPrismaService = mockDeep<PrismaClient>();

describe("CheckProductPriceJob", () => {
  let sut: CheckProductPriceJob;

  beforeEach(() => {
    sut = new CheckProductPriceJob({
      parser: mockedParser,
      prismaService: mockedPrismaService,
    });
  });

  afterAll(() => {
    mockClear(mockedParser);
    mockClear(mockedPrismaService);
  });

  it("should give an alarm when the price drops", async () => {
    const mockProduct = {
      id: 1,
      url: "",
      title: "",
      amount: new Prisma.Decimal(100),
      currency: "TL",
      lastCheckedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockedPrismaService.product.findMany.mockResolvedValue([mockProduct]);
    mockedParser.parsePrice.mockResolvedValue({ amount: 99.5, currency: "TL" });

    await expect(sut.process).rejects.toThrowError();
  });
});
