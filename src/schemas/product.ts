import { Static, Type } from "@sinclair/typebox";
import { Currency } from "src/constants";

export const CREATE_PRODUCT_SCHEMA = Type.Object({
  url: Type.String({ format: "uri" }),
  title: Type.String(),
  amount: Type.Number(),
  currency: Type.Enum(Currency),
  images: Type.Array(Type.String({ format: "uri" })),
});

export type CreateProductDTO = Static<typeof CREATE_PRODUCT_SCHEMA>;
