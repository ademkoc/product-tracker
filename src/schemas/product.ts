import { z } from "zod";

export const CREATE_PRODUCT_SCHEMA = z.object({
  url: z.string().url(),
  title: z.string(),
  amount: z.number(),
  currency: z.string(),
  images: z.array(z.string().url()),
});

export type CreateProductDTO = z.infer<typeof CREATE_PRODUCT_SCHEMA>;
