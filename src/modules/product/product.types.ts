import { Product, ProductImage } from '@prisma/client';

export type ProductWithImages = Product & { images: ProductImage[] };
