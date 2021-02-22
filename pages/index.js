import Head from 'next/head'

export default function Home({dataset}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Dataset</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          { dataset.title }
        </h1>
       <section>
          {dataset.resources.map(({ id, date, title }) => (
            <section key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </section>
          ))}
        </section>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      dataset: {
        title: 'My cool dataset',
        resources: [
          {
            "id": "aaa",
            "name": "xyz",
            "date": "2012",
            "sample": [
              { "a": 1, "b": 2 },
              { "a": 3, "b": 4 }
            ]
          }
        ]
      }
    }
  }
}
