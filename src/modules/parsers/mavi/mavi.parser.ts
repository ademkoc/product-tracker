import { maviConfig } from "./mavi.parser.config";
import { AbstractParser } from "../abstract-parser";

export class MaviParser extends AbstractParser {
  public static NAME = "mavi";

  public constructor() {
    super();

    this.setConfig(maviConfig);
  }
}
