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

  console.log(jsonRows)
  return jsonRows
}

export async function getDataset(){

  const dataset =  await data.Dataset.load('./datasets/')
  const parsedResources = JSON.parse(JSON.stringify(dataset))

  await Promise.all(parsedResources._resources.map(async resource =>{ 
    const resourceData = await getFile(`${resource._basePath}/${resource._descriptor.path}`)
    Object.assign(resource, {
      _data : resourceData
    })
    return resource
  }))

  return JSON.parse(JSON.stringify(dataset))
  }