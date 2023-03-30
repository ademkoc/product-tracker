import { Either } from "src/utils";
import { CreateProductDTO, PrismaClient, ProductWithImages } from "src/types";

export class ProductService {
  private readonly prismaService: PrismaClient;

  public constructor(opts: any) {
    this.prismaService = opts.prismaService;
  }

  async createProduct(productDTO: CreateProductDTO) {
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
        this.prismaService.productImage.create({ data: productImg })
      ),
    );

    return product;
  }

  async getProduct(
    id: number,
  ): Promise<Either<"NOT_FOUND", ProductWithImages>> {
    const product = await this.prismaService.product.findFirst({
      where: { id },
      include: { images: true },
    });

    if (!product) {
      return { error: "NOT_FOUND" };
    }

    return { result: product };
  }
}
