import { Schema } from "muninn";

export type ParserConfig = {
  selector: string | Schema;
  schema: Schema;
};

export type Price = {
  price: number;
  currency: string;
};
