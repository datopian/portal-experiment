import fs from 'fs'
import * as data from 'frictionless.js'
import csv from 'csvtojson'


export async function getFile(path){
  const file = data.open(path, { format: 'csv'})
  const resource = await file.buffer
    .then(Buffer.From)
  const resourceString = resource.toString()
  const jsonRows = await csv({ noheader: false , output: 'csv'})
  .fromString(resourceString)

  return jsonRows
}

export async function getDataset(){

  const dataset =  await data.Dataset.load('./datasets/')
  const parsedDataset = JSON.parse(JSON.stringify(dataset))
  const resourceList = await Promise.all(parsedDataset._resources.map(async resource =>{ 
    const resourceData = await getFile(`${resource._basePath}/${resource._descriptor.path}`)
    Object.assign(resource, {
      _data : resourceData
    })
    return resource
  }))
  
  parsedDataset._resources = resourceList

  return parsedDataset
  }