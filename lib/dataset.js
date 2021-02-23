import { Dataset } from 'frictionless.js'

async function getDataset(){

  const dataset =  await Dataset.load('./datasets/')

  return JSON.parse(JSON.stringify(dataset))
} 

module.exports = { getDataset }
