import { IParser } from "./abstract-parser";
import { ColinsParser, MaviParser } from ".";
import { ProductSchemaType } from "src/schemas";

export class ParserFacade {
  private parsers: Map<string, IParser>;

  public constructor() {
    this.parsers = new Map();
    this.parsers.set(ColinsParser.NAME, new ColinsParser());
    this.parsers.set(MaviParser.NAME, new MaviParser());
  }

  async parse(url: string): Promise<ProductSchemaType> {
    const { hostname } = new URL(url);

    const key = [
      ColinsParser.NAME,
      MaviParser.NAME,
    ].find((name) => hostname.match(name));

    const parser = this.parsers.get(key!);

    if (!parser) {
      throw new Error(`Parser not found. URL: ${url}`);
    }

    return parser.parseContent(url);
  }
}
