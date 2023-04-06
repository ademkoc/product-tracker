import { AbstractParser } from '../abstract-parser';

import { maviConfig } from './mavi.parser.config';

export class MaviParser extends AbstractParser {
  public static NAME = 'mavi';

  public constructor() {
    super();

    this.setConfig(maviConfig);
  }
}
