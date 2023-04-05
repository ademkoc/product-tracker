import { PrismaClient } from "@prisma/client";
import { JSONSchemaFaker } from "json-schema-faker";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { ProductSchema } from "../../src/schemas";
import { cleanTables, DB_MODEL } from "./db-cleaner";
import { ProductService } from "../../src/modules/product";

const prismaService = new PrismaClient();

describe("ProductService", () => {
  let sut: ProductService;

  beforeEach(async () => {
    await cleanTables(prismaService, [DB_MODEL.Product, DB_MODEL.ProductImage]);
    sut = new ProductService({ prismaService });
  });

  afterAll(async () => {
    await cleanTables(prismaService, [DB_MODEL.Product, DB_MODEL.ProductImage]);
    prismaService.$disconnect();
  });

  it("is defined", () => {
    expect(sut).toBeDefined();
  });

  describe("createProduct()", () => {
    it("should create product", async () => {
      const createProductDTO = JSONSchemaFaker.generate(ProductSchema);

      const product = await sut.createProduct(createProductDTO);

      expect(product).toMatchObject({ id: expect.any(Number) });
    });
  });

  describe("getProduct()", () => {
    it("should show product with images", async () => {
      const createProductDTO = JSONSchemaFaker.generate(ProductSchema);
      const createdProduct = await sut.createProduct(createProductDTO);

      const { result } = await sut.getProduct(createdProduct.id);

      expect(result).toMatchObject({
        id: expect.any(Number),
        images: expect.arrayContaining([
          {
            id: expect.any(Number),
            productId: expect.any(Number),
            url: expect.stringContaining("http"),
          },
        ]),
      });
    });
  });
});
