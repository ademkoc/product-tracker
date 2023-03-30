import { Schema } from "muninn";

export type ParserConfig = {
  selector: string | Schema;
  schema: Schema;
};

export type ProductDTO = {
  title: string;
  price: number;
  curreny: string;
  details: Record<string, unknown>;
  images: string[];
};

export type Price = {
  price: number;
  curreny: string;
};
