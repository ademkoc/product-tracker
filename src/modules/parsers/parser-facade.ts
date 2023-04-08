import type { IParser } from 'src/modules/parsers';

export class ParserFacade {
  private parsers: Map<string, IParser>;

  public constructor(parsers: IParser[]) {
    this.parsers = new Map();

    parsers.forEach((parser) => this.parsers.set(parser.name, parser));
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
