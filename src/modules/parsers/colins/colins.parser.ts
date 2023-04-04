import { Price } from "../parser.types";
import { AbstractParser } from "../abstract-parser";
import { CreateProductDTO } from "src/schemas/product";
import { contentConfig, priceConfig } from "./colins.parser.config";

export class ColinsParser extends AbstractParser<CreateProductDTO, Price> {
  public constructor() {
    super();

    this.setConfig({ contentConfig, priceConfig });
  }
}
