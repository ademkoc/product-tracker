import { AbstractParser } from "../abstract-parser";
import { colinsConfig } from "./colins.parser.config";

export class ColinsParser extends AbstractParser {
  public static NAME = "colins";

  public constructor() {
    super();

    this.setConfig(colinsConfig);
  }
}
