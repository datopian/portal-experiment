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


  // deep copy
  let resources = {...descriptor.resources}
  resources[0].sample = [
    {
      col1: 'Hello',
      col2: 'World',
    },
    {
      col1: 'react-table',
      col2: 'rocks',
    }
  ]
  resources[0].schema = { fields: [
    {
      title: 'Column 1',
      name: 'col1', // accessor is the "key" in the data
    },
    {
      title: 'Column 2',
      name: 'col2',
    },
  ]}
  const dataset = {
    readme: readme,
    readmeHtml: readmeHtml,
    descriptor: descriptor,
    resources: resources
  }
  return dataset
}
