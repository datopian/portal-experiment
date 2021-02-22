import Head from 'next/head'
import path from 'path'

export default function Home({dataset}) {
  const descriptor = dataset.descriptor
  const readme = dataset.readme
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Dataset</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-mono flex flex-col items-center justify-center flex-1 px-20">
        <h1 className="text-6xl font-bold text-center">
          { descriptor.title }
        </h1>
       <section>
          {descriptor.resources.map((resource) => (
            <section key={resource.name}>
              {resource.name}
            </section>
          ))}
        </section>
        <section>
          {readme}
        </section>
      </main>
    </div>
  )
}

const datasetsDirectory = path.join(process.cwd(), 'datasets')

import { getDataset } from '../lib/dataset'

export async function getStaticProps() {
  const dataset = getDataset(datasetsDirectory)
  return {
    props: {
      dataset
    }
  }
}
