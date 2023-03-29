import { Schema } from "muninn";

export type ParserConfig = {
  schema: Schema;
};

export type ColinsProduct = {
  title: string;
  price: number;
  curreny: string;
  details: Record<string, unknown>;
  images: string[];
};
