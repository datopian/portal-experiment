import path from 'path'
import Head from 'next/head'
import Table from '../components/Table'
import filesize from 'filesize'
import { getDataset } from '../lib/dataset'
const datasetsDirectory = path.join(process.cwd(), 'datasets')

export default function Home({ dataset }) {
  const descriptor = dataset.descriptor
  const resources = dataset.resources

  const datasetSize = resources.length == 1 ?
    resources[0].size :
    resources.reduce((accumulator, currentValue) => {
      return accumulator.size + currentValue.size
    })

  return (
    <div className="container">
      <Head>
        <title>Dataset</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap" rel="stylesheet" />
      </Head>


      <section className="m-8" name="key-info">
        <h1 className="text-3xl font-bold mb-8">
          {descriptor.title}
        </h1>
        <h1 className="text-2xl font-bold mb-4">Key info</h1>
        <div class="grid grid-cols-7 gap-4">
          <div>
            <h3 className="text-1xl font-bold mb-2">Files</h3>
          </div>
          <div>
            <h3 className="text-1xl font-bold mb-2">Size</h3>
          </div>
          <div>
            <h3 className="text-1xl font-bold mb-2">Format</h3>
          </div>
          <div>
            <h3 className="text-1xl font-bold mb-2">Created</h3>
          </div>
          <div>
            <h3 className="text-1xl font-bold mb-2">Updated</h3>
          </div>
          <div>
            <h3 className="text-1xl font-bold mb-2">Licence</h3>
          </div>
          <div>
            <h3 className="text-1xl font-bold mb-2">Source</h3>
          </div>
        </div>
        <div class="grid grid-cols-7 gap-4">
          <div>
            <h3 className="text-1xl">{resources.length}</h3>
          </div>
          <div>
            <h3 className="text-1xl">{filesize(datasetSize, { bits: true })}</h3>
          </div>
          <div>
            <h3 className="text-1xl">{resources[0].format} zip</h3>
          </div>
          <div>
            <h3 className="text-1xl">{descriptor.created}</h3>
          </div>
          <div>
            <h3 className="text-1xl">{descriptor.updated}</h3>
          </div>
          <div>
            <h3 className="text-1xl">{descriptor.license}</h3>
          </div>
          <div>
            <h3 className="text-1xl">
              <a className="text-yellow-600"
                href={descriptor.sources[0].web}>
                {descriptor.sources[0].title}
              </a>
            </h3>
          </div>
        </div>
      </section>

      <section className="m-8" name="file-list">
        <h1 className="text-2xl font-bold mb-4">Data Files</h1>
        <div class="grid grid-cols-7 gap-4">
          <div>
            <h3 className="text-1xl font-bold mb-2">File</h3>
          </div>
          <div>
            <h3 className="text-1xl font-bold mb-2">Description</h3>
          </div>
          <div>
            <h3 className="text-1xl font-bold mb-2">Size</h3>
          </div>
          <div>
            <h3 className="text-1xl font-bold mb-2">Last Changed</h3>
          </div>
          <div>
            <h3 className="text-1xl font-bold mb-2">Download</h3>
          </div>
        </div>

        {resources.map((resource) => {
          return (
            <div class="grid grid-cols-7 gap-4">
              <div>
                <h3 className="text-1xl">{resource.name}</h3>
              </div>
              <div>
                <h3 className="text-1xl">{resource.description || "No description"}</h3>
              </div>
              <div>
                <h3 className="text-1xl">{filesize(resource.size, { bits: true })}</h3>
              </div>
              <div>
                <h3 className="text-1xl">{resource.updated}</h3>
              </div>
              <div>
                <h3 className="text-1xl">
                  <a className="text-yellow-600" href={resource.path}>
                    {resource.format} ({filesize(resource.size, { bits: true })})
                    </a>
                </h3>
              </div>
            </div>
          )
        })}
      </section>

      <section className="m-8" name="graph">
        <h1 className="text-2xl font-bold mb-4">Graph</h1>
      </section>

      <section className="m-8" name="sample-table">
        <h1 className="text-2xl font-bold mb-4">Data Preview</h1>
        <h2 className="text-1xl">{descriptor.title}</h2>
        {resources[0].sample ? (
          <Table data={resources[0].sample} schema={resources[0].schema} />
        ) : (
            'No preview is available for this dataset'
          )}
      </section>

      <section className="m-8" name="sample-table">
        <h1 className="text-2xl font-bold mb-4">README</h1>
        <div className="prose">
          <div dangerouslySetInnerHTML={{ __html: dataset.readmeHtml }} />
        </div>
      </section>

    </div>
  )
}


export async function getStaticProps() {
  const dataset = await getDataset(datasetsDirectory)
  return {
    props: {
      dataset
    }
  }
}
