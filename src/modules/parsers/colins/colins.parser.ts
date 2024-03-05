import type { IParser } from 'src/modules/parsers';

import { AbstractParser } from '../abstract-parser';

import { colinsConfig } from './colins.parser.config';

export class ColinsStrategy extends AbstractParser implements IParser {
  public readonly name = 'colins';

  public constructor() {
    super();

    this.setConfig(colinsConfig);
  }
}
