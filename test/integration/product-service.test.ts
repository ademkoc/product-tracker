import { PrismaClient } from '@prisma/client';
import { JSONSchemaFaker as jsf } from 'json-schema-faker';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';

import { ProductSchema, ProductSchemaType } from '../../src/schemas';
import { cleanTables, DB_MODEL } from './db-cleaner';
import { ProductService } from '../../src/modules/product';

const prismaService = new PrismaClient();

describe('ProductService', () => {
  let sut: ProductService;

  beforeEach(async () => {
    await cleanTables(prismaService, [DB_MODEL.Product, DB_MODEL.ProductImage]);
    sut = new ProductService({ prismaService });
  });

  afterAll(async () => {
    await cleanTables(prismaService, [DB_MODEL.Product, DB_MODEL.ProductImage]);
    prismaService.$disconnect();
  });

  it('is defined', () => {
    expect(sut).toBeDefined();
  });

  describe('createProduct()', () => {
    it('should create product', async () => {
      const createProductDTO = jsf.generate(ProductSchema);
      const product = await sut.createProduct(createProductDTO as ProductSchemaType);

      expect(product).toMatchObject({ id: expect.any(Number) });
    });
  });

  describe('getProduct()', () => {
    it('should show product with images', async () => {
      const createProductDTO = jsf.generate(ProductSchema);
      const createdProduct = await sut.createProduct(createProductDTO as ProductSchemaType);

      const { result } = await sut.getProduct(createdProduct.id);

      expect(result).toMatchObject({
        id: expect.any(Number),
        images: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            productId: expect.any(Number),
            url: expect.stringContaining('http'),
          }),
        ]),
      });
    });
  });
});
