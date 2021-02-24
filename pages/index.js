import Head from 'next/head'
import { getDataset } from '../lib/dataset'
import Table from '../components/Table'
import React from 'react'


export default function Home({dataset}) {
  const descriptor = dataset._descriptor
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Dataset</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap" rel="stylesheet" />
      </Head>

      <main className="prose prose-red max-w-3xl font-mono flex flex-col items-center justify-center flex-1 px-20">
        <h1 className="text-6xl font-bold text-center">
          { descriptor.title }
        </h1>
        <section>key info</section>
        <section>Files with a list of files</section>
       <section>
          {dataset._resources.map(resource => (
            <section key={resource._descriptor.name}>
              <i>
                {resource._descriptor.name}
              </i>
            </section>
          ))}
        </section>
        <section>Graphs</section>
        <section>
          Data table for first resource goes here (we only do first for now).
          {dataset._resources.map(resource => {
           
            const columns = React.useMemo(
              ()=> [
                {
                  Header: resource._descriptor.name,
                  columns: resource._descriptor.schema.fields.map(item => ({
                    Header: item.name,
                    accessor: item.name
                  }))
                } 
              ])
            const data = React.useMemo(()=> resource._data, [])
            return (<Table  columns={columns} data={data}/>)
          })}
        </section>
        <section>
          <h1>README</h1>
          <div dangerouslySetInnerHTML={{ __html: descriptor.readme }} />
        </section>
      </main>
    </div>
  )
}


export async function getStaticProps() {
  const dataset = await getDataset()
  return {
    props: {
      dataset
    }
  }
}
