import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { Element } from 'domhandler';
import { DataScriptNotFound } from '../errors/data-script-not-found.error';

@Injectable()
export class SsrDataExtractor {
  private readonly dataKey = 'window.data = ';

  extractData<T>(html: any): T {
    const $ = cheerio.load(html);
    const scripts = $('body > script').toArray();

    const rawScript = this.findDataScript($, scripts);
    if (!rawScript) {
      throw new DataScriptNotFound();
    }

    const start = rawScript.indexOf(this.dataKey) + this.dataKey.length;
    const end = rawScript.indexOf('};', start);

    const data = rawScript.substring(start, end) + '}';
    const dataObject = eval('(' + data + ')');

    return dataObject;
  }

  private findDataScript($: any, scripts: Element[]): string {
    /** It's better start from the end, SSR data scripts comes as latest */
    const reversedScripts = scripts.reverse();

    let foundScript: string;

    for (const script of reversedScripts) {
      const text = $(script).toString();
      if (text.includes(this.dataKey)) {
        foundScript = text;
        break;
      }
    }

    return foundScript;
  }
}
