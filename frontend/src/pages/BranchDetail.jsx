import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import client from '../api/client'
import Loading from '../components/Loading'
import MapView from '../components/MapView'

function BranchDetail() {
  const { slug } = useParams()
  const [branch, setBranch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBranch() {
      setLoading(true)
      setNotFound(false)
      setError(null)
      try {
        const res = await client.get(`/branches/${slug}`)
        setBranch(res.data.data)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setNotFound(true)
        } else {
          setError('Failed to load the branch. Please try again later.')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchBranch()
  }, [slug])

  if (loading) return <Loading label="Loading branch..." />
  if (notFound)
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-3">Branch Not Found</h1>
        <p className="text-neutral-600 mb-6">
          The branch you're looking for doesn't exist or is no longer active.
        </p>
        <Link to="/branches" className="text-blue-600 hover:underline">
          ← Back to Branches
        </Link>
      </div>
    )
  if (error)
    return <div className="text-center py-12 text-red-600">{error}</div>

  // OpenStreetMap directions link (opens OSM with a marker at this location)
  const directionsUrl = `https://www.openstreetmap.org/?mlat=${branch.latitude}&mlon=${branch.longitude}#map=16/${branch.latitude}/${branch.longitude}`

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to="/branches"
        className="text-blue-600 hover:underline text-sm inline-block"
      >
        ← Back to Branches
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{branch.branch_name}</h1>
        {branch.branch_code && (
          <p className="text-neutral-500 text-sm mt-1">{branch.branch_code}</p>
        )}
      </div>

      {/* Featured image */}
      {branch.featured_image && (
        <img
          src={branch.featured_image}
          alt={branch.branch_name}
          className="w-full rounded-lg max-h-80 object-cover"
        />
      )}

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-3">
          <section>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">
              Address
            </h2>
            <p className="text-neutral-900">{branch.address}</p>
            <p className="text-neutral-600">
              {branch.city}, {branch.province}
              {branch.postal_code && ` ${branch.postal_code}`}
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">
              Contact
            </h2>
            {branch.contact_number && (
              <p className="text-neutral-900">{branch.contact_number}</p>
            )}
            {branch.email_address && (
              <p className="text-blue-600 hover:underline">
                <a href={`mailto:${branch.email_address}`}>
                  {branch.email_address}
                </a>
              </p>
            )}
          </section>

          <section>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">
              Business Hours
            </h2>
            <p className="text-neutral-900">
              {branch.business_hours || 'Not available'}
            </p>
          </section>

          {branch.description && (
            <section>
              <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">
                Description
              </h2>
              <p className="text-neutral-700">{branch.description}</p>
            </section>
          )}
        </div>

        {/* Map + directions */}
        <div className="space-y-3">
          <section>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">
              Location
            </h2>
            <MapView
              branches={[branch]}
              selectedBranch={null}
              onMarkerClick={null}
            />
          </section>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            Get Directions →
          </a>
        </div>
      </div>
    </div>
  )
}

export default BranchDetail
