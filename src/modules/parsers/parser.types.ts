import type { Prisma } from '@prisma/client';
import type { Schema } from 'muninn';

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
