import Link from 'next/link'
import useAdmin from '@hooks/use-admin'

export default function Home() {
  const { studies, isLoading, isError } = useAdmin()

  if (isLoading) return <h1>Loading...</h1> // TODO: add Spinner
  else
    return (
      <div>
        <h1>Studies</h1>
        {studies?.map((study) => (
          <div
            // onClick={() => handleSelectStudy(study._id)}
            key={study._id}
            style={{ border: '1px solid black' }}
          >
            <h3>
              <Link
                href={{
                  pathname: '/study/[id]',
                  query: { id: study._id },
                }}
              >
                {study.title}
              </Link>
            </h3>
          </div>
        ))}
        {studies?.length === 0 && <p>No studies found.</p>}

        {isError && <h1 style={{ color: 'red' }}>Something went wrong!!</h1>}

        <br />
        <br />
        <br />
      </div>
    )
}
