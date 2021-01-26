import axios from 'axios'
import cheerio from 'cheerio'
import { Element } from 'domhandler'

async function fetchHTML(url) {
  const { data } = await axios.get(url)
  return cheerio.load(data)
}

const DATA_KEY = 'window.data = '

function findDataScript($: any, scripts: Element[]): string {
  /** It's better start from the end, SSR data comes at one of the latest scripts */
  const reversedScripts = scripts.reverse()

  let foundScript: string

  for (const script of reversedScripts) {
    const text = $(script).toString()
    if (text.includes(DATA_KEY)) {
      foundScript = text
      break
    }
  }

  return foundScript
}

async function main() {
  const $ = await fetchHTML('https://platzi.com/p/dantecalderon/')

  const scripts = $('body > script').toArray()

  const rawScript = findDataScript($, scripts)

  if (rawScript) {
    const start = rawScript.indexOf(DATA_KEY) + DATA_KEY.length
    const end = rawScript.indexOf('};', start)

    const data = rawScript.substring(start, end) + '}'
    // tslint:disable-next-line: no-eval
    const dataObject = eval('(' + data + ')')
    console.log('🤫 Dante ➤ dataObject', dataObject)
  }
}

main()
