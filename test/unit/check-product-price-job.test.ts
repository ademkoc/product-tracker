import { Prisma, PrismaClient } from "@prisma/client";
import { mock, mockClear, mockDeep } from "vitest-mock-extended";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { ColinsParser } from "../../src/modules/parsers";
import { CheckProductPriceJob } from "../../src/modules/product/jobs/check-product-price.job";
import { PushNotificationService } from "../../src/modules/notification/push/push-notification.service";

const mockedParser = mockDeep<ColinsParser>();
const mockedPrismaService = mockDeep<PrismaClient>();
const mockedPushNotificationService = mock<PushNotificationService>();

describe("CheckProductPriceJob", () => {
  let sut: CheckProductPriceJob;

  beforeEach(() => {
    sut = new CheckProductPriceJob({
      parser: mockedParser,
      prismaService: mockedPrismaService,
      notificationService: mockedPushNotificationService,
    });
  });

  afterAll(() => {
    mockClear(mockedParser);
    mockClear(mockedPrismaService);
    mockClear(mockedPushNotificationService);
  });

  it("should notify when the price drops", async () => {
    const mockProduct = {
      id: 1,
      url:
        "https://www.colins.com.tr/p/regular-fit-dugmeli-cepli-bej-erkek-mont-39024",
      title: "Regular Fit Düğmeli Cepli Bej Erkek Mont",
      amount: new Prisma.Decimal(100),
      currency: "TL",
      lastCheckedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockedPrismaService.product.findMany.mockResolvedValue([mockProduct]);
    mockedParser.parsePrice.mockResolvedValue({
      amount: new Prisma.Decimal(99.9),
      currency: "TL",
    });

    await sut.process();

    expect(mockedPushNotificationService.notify).toBeCalledTimes(1);
  });
});
