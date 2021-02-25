import fs from 'fs'
import path from 'path'

import remark from 'remark'
import html from 'remark-html'

import { Dataset } from 'frictionless.js'
import toArray from 'stream-to-array'


export async function getDataset(directory) {
  function getContent(name) {
    const fullPath = path.join(directory, name)
    const contents = fs.readFileSync(fullPath, 'utf8')
    return contents
  }

  // get the readme and rendered version
  const readme = getContent('README.md')
  const processed = await remark()
    .use(html)
    .process(readme)
  
  const readmeHtml = processed.toString()

  // get dataset descriptor and resources
  const f11sDataset = await Dataset.load(directory)
  const descriptor = f11sDataset.descriptor

  const resources = await Promise.all(f11sDataset.resources.map(async (resource) => {
    let _tmp = resource.descriptor
    let rowStream = await resource.rows({ keyed: true })
    _tmp.sample = await toArray(rowStream)
    _tmp.size = resource.size
    return _tmp
  }))


  const dataset = {
    readme: readme,
    readmeHtml: readmeHtml,
    descriptor: descriptor,
    resources: resources
  }
  return dataset
}
