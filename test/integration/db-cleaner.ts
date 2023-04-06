import type { PrismaClient } from '@prisma/client';

export enum DB_MODEL {
  Product = 'product',
  ProductImage = 'productImage',
  PriceHistory = 'priceHistory',
}

export async function cleanTables(prisma: PrismaClient, modelNames: readonly DB_MODEL[]) {
  const delegates = modelNames.map<{ deleteMany: () => Promise<unknown> }>(
    (modelName) => prisma[modelName],
  );

  for (const delegate of delegates) {
    await delegate.deleteMany();
  }
}
