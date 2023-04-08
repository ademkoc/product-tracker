import type { ICradle } from 'src/infrastructure';
import type { IParser } from 'src/modules/parsers';

type ConstructorOptions = Pick<ICradle, 'colinsParser' | 'maviParser' | 'trendyolParser'>;

export class ParserFacade implements IParser {
  public name = 'ParserFacade';
  private parsers: Map<string, IParser>;

  public constructor({ colinsParser, maviParser, trendyolParser }: ConstructorOptions) {
    this.parsers = new Map();
    this.parsers.set(colinsParser.name, colinsParser);
    this.parsers.set(maviParser.name, maviParser);
    this.parsers.set(trendyolParser.name, trendyolParser);
  }

  #getParser(url: string) {
    const { hostname } = new URL(url);

    const key = Array.from(this.parsers.keys()).find((name) => hostname.match(name));

    const parser = this.parsers.get(key!);

    if (!parser) {
      throw new Error(`Parser not found. URL: ${url}`);
    }

    return parser;
  }

  parseContent(url: string) {
    return this.#getParser(url).parseContent(url);
  }

  parsePrice(url: string) {
    return this.#getParser(url).parsePrice(url);
  }
}
