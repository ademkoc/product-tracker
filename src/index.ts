import { PrismaClient } from "@prisma/client";
import { ColinsParser } from "./domain";
import { ProductService } from "./domain/services/product.service";

const prisma = new PrismaClient();

async function main() {
  const productURL =
    "https://www.colins.com.tr/p/792-mila-orta-bel-duz-paca-regular-fit-mavi-kadin-jean-pantolon-28094";

  const parser = new ColinsParser();
  const productDTO = await parser.parseContent(productURL);

  const service = new ProductService({ prismaService: prisma });

  await service.createProduct(productDTO);

  await prisma.$disconnect();
}

main();
