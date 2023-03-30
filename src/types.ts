import { z } from "zod";
import { Schema } from "muninn";
import { Product, ProductImage } from "@prisma/client";

export type { PrismaClient } from "@prisma/client";

export type ParserConfig = {
  selector: string | Schema;
  schema: Schema;
};

export type Price = {
  price: number;
  curreny: string;
};

export const CREATE_PRODUCT_SCHEMA = z.object({
  url: z.string().url(),
  title: z.string(),
  amount: z.number(),
  currency: z.string(),
  images: z.array(z.string().url()),
});

export type CreateProductDTO = z.infer<typeof CREATE_PRODUCT_SCHEMA>;

export type ProductWithImages = Product & { images: ProductImage[] };
