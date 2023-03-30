import { Schema } from "muninn";

export type ParserConfig = {
  selector: string | Schema;
  schema: Schema;
};

export type Price = {
  amount: number;
  currency: string;
};
