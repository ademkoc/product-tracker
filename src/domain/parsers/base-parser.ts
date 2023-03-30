import { fetch } from "undici";
import { parse } from "muninn";

export abstract class BaseParser<T, V> {
  private contentConfig = {};
  private priceConfig = {};

  setConfig(opts: any) {
    this.contentConfig = opts.contentConfig;
    this.priceConfig = opts.priceConfig;
  }

  async #readSource(url: string) {
    const response = await fetch(url);

    const html = await response.text();

    return html;
  }

  #decodeSource(html: string, config: any) {
    const result = parse(html, config);

    return result;
  }

  async parseContent(url: string): Promise<T> {
    const html = await this.#readSource(url);
    const result = this.#decodeSource(html, this.contentConfig);
    return { ...result, url } as T;
  }

  async parsePrice(url: string): Promise<V> {
    const html = await this.#readSource(url);
    const result = this.#decodeSource(html, this.priceConfig);
    return result as V;
  }
}
