import fs from 'fs'
import path from 'path'

export function getDataset(directory) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(directory)
  function getContent(name) {
    const fullPath = path.join(directory, name)
    const contents = fs.readFileSync(fullPath, 'utf8')
    return contents
  }
  const readme = getContent('README.md')
  const descriptor = JSON.parse(getContent('datapackage.json'))
  const dataset = {
    readme: readme,
    descriptor: descriptor
  }
  return dataset
}
