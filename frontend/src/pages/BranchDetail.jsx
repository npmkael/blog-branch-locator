import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Envelope,
  MapPin,
  Phone,
} from '@phosphor-icons/react'
import client from '../api/client'
import Loading from '../components/Loading'
import MapView from '../components/MapView'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function BranchDetail() {
  const { slug } = useParams()
  const [branch, setBranch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState(null)

  useDocumentTitle(branch?.branch_name)

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
      <div className="max-w-2xl mx-auto text-center py-20">
        <p className="font-['Geist_Mono'] text-[11px] uppercase tracking-[0.1em] text-gray-400 dark:text-gray-600 mb-4">
          404 — not found
        </p>
        <h1 className="font-['Geist_Pixel'] text-3xl lowercase text-ink tracking-tight mb-4">
          branch not found
        </h1>
        <p className="font-['Source_Serif_4'] text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
          The branch you're looking for doesn't exist or is no longer active.
        </p>
        <Link
          to="/branches"
          className="inline-flex items-center gap-1.5 font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] text-gray-500 hover:text-ink transition-colors duration-200"
        >
          <ArrowLeft size={14} weight="regular" />
          back to branches
        </Link>
      </div>
    )
  if (error)
    return (
      <div className="text-center py-12 font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] text-red-500 dark:text-red-400">
        {error}
      </div>
    )

  // OpenStreetMap directions link (opens OSM with a marker at this location)
  const directionsUrl = `https://www.openstreetmap.org/?mlat=${branch.latitude}&mlon=${branch.longitude}#map=16/${branch.latitude}/${branch.longitude}`

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <Link
        to="/branches"
        className="inline-flex items-center gap-1.5 font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] text-gray-400 hover:text-ink transition-colors duration-200"
      >
        <ArrowLeft size={14} weight="regular" />
        back to branches
      </Link>

      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 px-8 sm:px-12 py-12 text-center">
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.15]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #0a0a0a 1px, transparent 1px)',
            backgroundSize: '9px 9px',
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <p className="font-['Geist_Mono'] text-[11px] uppercase tracking-[0.1em] text-gray-400 dark:text-gray-600 mb-4 animate-fade-up">
            01 — branch
          </p>
          <h1
            className="font-['Geist_Pixel'] text-4xl lowercase text-ink tracking-tight mb-4 animate-fade-up"
            style={{ animationDelay: '70ms' }}
          >
            {branch.branch_name}
          </h1>
          {branch.branch_code && (
            <p
              className="font-['Geist_Mono'] text-[10px] uppercase tracking-[0.06em] text-gray-500 animate-fade-up"
              style={{ animationDelay: '130ms' }}
            >
              {branch.branch_code}
            </p>
          )}
        </div>
      </section>

      {/* Featured image */}
      {branch.featured_image && (
        <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <img
            src={branch.featured_image}
            alt={branch.branch_name}
            loading="lazy"
            className="w-full max-h-80 object-cover"
          />
        </div>
      )}

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-8">
          <section className="space-y-2">
            <h2 className="font-['Geist_Mono'] text-[10px] uppercase tracking-[0.08em] text-gray-400">
              Address
            </h2>
            <p className="font-['Geist'] text-[15px] text-ink">
              {branch.address}
            </p>
            <p className="font-['Geist'] text-[13px] text-gray-500">
              <MapPin
                size={12}
                weight="regular"
                className="inline mr-1.5 text-gray-400"
              />
              {branch.city}, {branch.province}
              {branch.postal_code && ` ${branch.postal_code}`}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-['Geist_Mono'] text-[10px] uppercase tracking-[0.08em] text-gray-400">
              Contact
            </h2>
            {branch.contact_number && (
              <p className="font-['Geist'] text-[15px] text-ink flex items-center gap-2">
                <Phone size={14} weight="regular" className="text-gray-400" />
                {branch.contact_number}
              </p>
            )}
            {branch.email_address && (
              <a
                href={`mailto:${branch.email_address}`}
                className="inline-flex items-center gap-2 font-['Geist'] text-[15px] text-ink hover:text-gray-500 transition-colors duration-200 underline underline-offset-4 decoration-gray-200 hover:decoration-ink"
              >
                <Envelope
                  size={14}
                  weight="regular"
                  className="text-gray-400"
                />
                {branch.email_address}
              </a>
            )}
          </section>

          <section className="space-y-2">
            <h2 className="font-['Geist_Mono'] text-[10px] uppercase tracking-[0.08em] text-gray-400">
              Business Hours
            </h2>
            <p className="font-['Geist'] text-[15px] text-ink flex items-center gap-2">
              <Clock size={14} weight="regular" className="text-gray-400" />
              {branch.business_hours || 'Not available'}
            </p>
          </section>

          {branch.description && (
            <section className="space-y-2">
              <h2 className="font-['Geist_Mono'] text-[10px] uppercase tracking-[0.08em] text-gray-400">
                Description
              </h2>
              <p className="font-['Geist'] text-[15px] text-gray-600 leading-relaxed">
                {branch.description}
              </p>
            </section>
          )}
        </div>

        {/* Map + directions */}
        <div className="space-y-4">
          <section className="space-y-2">
            <h2 className="font-['Geist_Mono'] text-[10px] uppercase tracking-[0.08em] text-gray-400">
              Location
            </h2>
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <MapView
                branches={[branch]}
                selectedBranch={null}
                onMarkerClick={null}
              />
            </div>
          </section>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Geist'] inline-flex items-center gap-2 bg-ink text-bg px-5 py-2.5 rounded-[6px] text-[13px] font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            get directions
            <ArrowUpRight size={14} weight="regular" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default BranchDetail
