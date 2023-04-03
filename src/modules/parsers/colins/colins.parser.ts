import { Price } from "../parser.types";
import { BaseParser } from "../base-parser";
import { CreateProductDTO } from "src/schemas/product";
import { contentConfig, priceConfig } from "./colins.parser.config";

export class ColinsParser extends BaseParser<CreateProductDTO, Price> {
  public constructor() {
    super();

    this.setConfig({ contentConfig, priceConfig });
  }
}
