import { fetch } from "undici";
import { parse } from "muninn";

export abstract class BaseParser {
  private config = {};

  setConfig(config: any) {
    this.config = config;
  }

  async #readSource(url: string) {
    const response = await fetch(url);

    const html = await response.text();

    return html;
  }

  #decodeSource(html: string) {
    const result = parse(html, this.config);

    return result;
  }

  async parse(url: string) {
    const html = await this.#readSource(url);
    const result = this.#decodeSource(html);
    return result;
  }
}
