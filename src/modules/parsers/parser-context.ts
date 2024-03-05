import type { ICradle } from 'src/infrastructure';
import type { IParser } from 'src/modules/parsers';

type ConstructorOptions = Pick<ICradle, 'colinsStrategy' | 'maviStrategy' | 'trendyolStrategy'>;

export class ParserContext implements IParser {
  public name = 'ParserContext';
  private parsers: Map<string, IParser>;

  public constructor({ colinsStrategy, maviStrategy, trendyolStrategy }: ConstructorOptions) {
    this.parsers = new Map();
    this.parsers.set(colinsStrategy.name, colinsStrategy);
    this.parsers.set(maviStrategy.name, maviStrategy);
    this.parsers.set(trendyolStrategy.name, trendyolStrategy);
  }

  getParser(url: string) {
    const { hostname } = new URL(url);

    const key = Array.from(this.parsers.keys()).find((name) => hostname.match(name));

    const parser = this.parsers.get(key!);

    if (!parser) {
      throw new Error(`Parser not found. URL: ${url}`);
    }

    return parser;
  }

  parseContent(url: string) {
    return this.getParser(url).parseContent(url);
  }

  parsePrice(url: string) {
    return this.getParser(url).parsePrice(url);
  }
}
