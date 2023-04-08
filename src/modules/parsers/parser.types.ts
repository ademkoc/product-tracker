import type { Prisma } from '@prisma/client';
import type { Schema } from 'muninn';
import type { ProductSchemaType } from 'src/schemas';

export type ParserConfig = {
  selector: string | Schema;
  schema: Schema;
};

export type Price = {
  amount: Prisma.Decimal;
  currency: string;
};

export type ParserConfigs = {
  content: ParserConfig;
  price: ParserConfig;
};

export interface IParser {
  name: string;
  parseContent: (url: string) => Promise<ProductSchemaType>;
  parsePrice: (url: string) => Promise<Price>;
}
