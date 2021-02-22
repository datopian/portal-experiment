import fs from 'fs'
import path from 'path'

import remark from 'remark'
import html from 'remark-html'


export async function getDataset(directory) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(directory)
  function getContent(name) {
    const fullPath = path.join(directory, name)
    const contents = fs.readFileSync(fullPath, 'utf8')
    return contents
  }
  const readme = getContent('README.md')
  const descriptor = JSON.parse(getContent('datapackage.json'))

  const processed = await remark()
    .use(html)
    .process(readme)
  
  const readmeHtml = processed.toString()

  const dataset = {
    readme: readme,
    readmeHtml: readmeHtml,
    descriptor: descriptor
  }
  return dataset
}
