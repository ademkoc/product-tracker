import { type Static, Type } from '@sinclair/typebox';

import { Currency } from '../constants';

export const ProductSchema = Type.Object({
  url: Type.String({ format: 'uri' }),
  title: Type.String(),
  amount: Type.Number(),
  currency: Type.Enum(Currency),
  images: Type.Array(Type.String({ format: 'uri' })),
});

export const CreateProductSchema = Type.Object({
  url: Type.String({ format: 'uri' }),
});

export const IdParamSchema = Type.Object({
  id: Type.Number(),
});

export type ProductSchemaType = Static<typeof ProductSchema>;
export type CreateProductSchemaType = Static<typeof CreateProductSchema>;
export type IdParamSchemaType = Static<typeof IdParamSchema>;
