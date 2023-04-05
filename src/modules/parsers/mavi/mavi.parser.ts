import { Price } from "../parser.types";
import { maviConfig } from "./mavi.parser.config";
import { AbstractParser } from "../abstract-parser";
import { CreateProductDTO } from "src/schemas/product";

export class MaviParser extends AbstractParser<CreateProductDTO, Price> {
  public constructor() {
    super();

    this.setConfig(maviConfig);
  }
}
