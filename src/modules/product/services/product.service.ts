import { type PrismaClient } from '@prisma/client';

import { type ProductSchemaType } from '../../../schemas/product';
import { type Either } from '../../../utils';
import { type ProductWithImages } from '../product.types';

export class ProductService {
  private readonly prismaService: PrismaClient;

  public constructor(opts: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.prismaService = opts.prismaService;
  }

  async getProducts() {
    const products = await this.prismaService.product.findMany({
      include: { images: true, history: true },
    });

    return products;
  }

  async createProduct(productDTO: ProductSchemaType) {
    const product = await this.prismaService.product.create({
      data: {
        url: productDTO.url,
        title: productDTO.title,
        amount: productDTO.amount,
        currency: productDTO.currency,
        lastCheckedAt: new Date(),
      },
    });

    const productImages = productDTO.images.map((url) => ({
      productId: product.id,
      url,
    }));

    // PS: createMany is not supported for SQLite
    await Promise.all(
      productImages.map((productImg) =>
        this.prismaService.productImage.create({ data: productImg }),
      ),
    );

    return product;
  }

  async getProduct(id: number): Promise<Either<'NOT_FOUND', ProductWithImages>> {
    const product = await this.prismaService.product.findFirst({
      where: { id },
      include: { images: true, history: true },
    });

    if (!product) {
      return { error: 'NOT_FOUND' };
    }

    return { result: product };
  }
}
