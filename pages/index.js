import Head from 'next/head'
import { getDataset } from '../lib/dataset'
import { useTable } from 'react-table'

export default function Home({dataset}) {
  console.log(dataset.data)
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
       <section>
          {dataset._resources.map(resource => (
            <section key={resource._descriptor.name}>
              file : {resource._descriptor.name}
            </section>
          ))}
        </section>
        <section>key info</section>
        <section>Files with a list of files</section>
        <section>Graphs</section>
        <section>
          Data table for first resource goes here (we only do first for now).
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
