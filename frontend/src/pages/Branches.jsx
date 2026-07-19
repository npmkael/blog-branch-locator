import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router'
import {
  ArrowRight,
  Clock,
  Crosshair,
  MagnifyingGlass,
  MapPin,
  Phone,
  X,
} from '@phosphor-icons/react'
import client from '../api/client'
import MapView from '../components/MapView'
import Loading from '../components/Loading'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function Branches() {
  useDocumentTitle('branches')
  const [branches, setBranches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [provinceFilter, setProvinceFilter] = useState('')
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [locating, setLocating] = useState(false)
  const [geoError, setGeoError] = useState(null)

  // Haversine distance (km) between two coordinates
  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  function handleFindNearMe() {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.')
      return
    }
    setLocating(true)
    setGeoError(null)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude
        const userLng = position.coords.longitude
        setUserLocation({ lat: userLat, lng: userLng })

        // Auto-select the nearest branch so the map flies to it
        if (branches.length > 0) {
          let nearest = null
          let nearestDist = Infinity
          for (const b of branches) {
            const d = calculateDistance(userLat, userLng, b.latitude, b.longitude)
            if (d < nearestDist) {
              nearestDist = d
              nearest = b
            }
          }
          setSelectedBranch(nearest)
        }
        setLocating(false)
      },
      (err) => {
        setGeoError(
          err.code === 1
            ? 'Location access denied. Please enable permissions.'
            : 'Could not determine your location.'
        )
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  // Fetch all active branches once on mount
  useEffect(() => {
    async function fetchBranches() {
      try {
        const res = await client.get('/branches')
        setBranches(res.data.data)
      } catch (err) {
        setError('Failed to load branches. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchBranches()
  }, [])

  // Derive unique cities and provinces for filter dropdowns
  const uniqueCities = useMemo(() => {
    return [...new Set(branches.map((b) => b.city))].sort()
  }, [branches])

  const uniqueProvinces = useMemo(() => {
    return [...new Set(branches.map((b) => b.province))].sort()
  }, [branches])

  // Client-side filtering (fast, no refetch)
  const filteredBranches = useMemo(() => {
    const filtered = branches.filter((branch) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !q ||
        branch.branch_name?.toLowerCase().includes(q) ||
        branch.branch_code?.toLowerCase().includes(q) ||
        branch.address?.toLowerCase().includes(q) ||
        branch.city?.toLowerCase().includes(q) ||
        branch.province?.toLowerCase().includes(q)

      const matchesCity = !cityFilter || branch.city === cityFilter
      const matchesProvince =
        !provinceFilter || branch.province === provinceFilter

      return matchesSearch && matchesCity && matchesProvince
    })

    // Sort by distance if user location is available
    if (userLocation) {
      return filtered
        .map((branch) => ({
          ...branch,
          _distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            branch.latitude,
            branch.longitude
          ),
        }))
        .sort((a, b) => a._distance - b._distance)
    }

    return filtered
  }, [branches, searchQuery, cityFilter, provinceFilter, userLocation])

  function handleResetFilters() {
    setSearchQuery('')
    setCityFilter('')
    setProvinceFilter('')
    setSelectedBranch(null)
  }

  function handleClearLocation() {
    setUserLocation(null)
    setGeoError(null)
  }

  if (loading) return <Loading label="Loading branches..." />
  if (error)
    return (
      <div className="text-center py-12 font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] text-red-500 dark:text-red-400">
        {error}
      </div>
    )

  return (
    <div className="space-y-10">
      {/* Page Header */}
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
            01 — locations
          </p>
          <h1
            className="font-['Geist_Pixel'] text-4xl lowercase text-ink tracking-tight mb-4 animate-fade-up"
            style={{ animationDelay: '70ms' }}
          >
            branch locator
          </h1>
          <p
            className="font-['Source_Serif_4'] text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed animate-fade-up"
            style={{ animationDelay: '130ms' }}
          >
            Find our branches on the map below.
          </p>
        </div>
      </section>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MagnifyingGlass
            size={14}
            weight="regular"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name, code, address, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-[6px] pl-9 pr-4 py-2.5 text-[13px] font-['Geist_Mono'] text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors duration-200"
          />
        </div>
        <button
          onClick={handleFindNearMe}
          disabled={locating}
          className="inline-flex items-center gap-1.5 font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] px-4 py-2.5 rounded-[6px] border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200 disabled:opacity-60"
        >
          <Crosshair size={14} weight="regular" className={locating ? 'animate-spin' : ''} />
          {locating ? 'locating...' : 'near me'}
        </button>
        {userLocation && (
          <button
            onClick={handleClearLocation}
            className="inline-flex items-center gap-1.5 font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] px-4 py-2.5 rounded-[6px] border border-gray-200 text-gray-500 hover:border-ink hover:text-ink transition-all duration-200"
          >
            <X size={14} weight="regular" />
            location
          </button>
        )}
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-2.5 text-[13px] font-['Geist_Mono'] text-ink focus:outline-none focus:border-ink transition-colors duration-200"
        >
          <option value="">All Cities</option>
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <select
          value={provinceFilter}
          onChange={(e) => setProvinceFilter(e.target.value)}
          className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-2.5 text-[13px] font-['Geist_Mono'] text-ink focus:outline-none focus:border-ink transition-colors duration-200"
        >
          <option value="">All Provinces</option>
          {uniqueProvinces.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
        {(searchQuery || cityFilter || provinceFilter) && (
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] px-4 py-2.5 rounded-[6px] border border-gray-200 text-gray-500 hover:border-ink hover:text-ink transition-all duration-200"
          >
            <X size={14} weight="regular" />
            clear
          </button>
        )}
      </div>

      {/* Geolocation error */}
      {geoError && (
        <div className="font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] text-red-500 text-center">
          {geoError}
        </div>
      )}

      {/* Map */}
      {filteredBranches.length > 0 ? (
        <MapView
          branches={filteredBranches}
          selectedBranch={selectedBranch}
          onMarkerClick={setSelectedBranch}
          userLocation={userLocation}
        />
      ) : (
        <div className="border border-dashed border-gray-200 bg-gray-50 rounded-2xl py-12 text-center">
          <p className="font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-600 mb-2">
            no matches
          </p>
          <p className="font-['Source_Serif_4'] text-[15px] text-gray-400 dark:text-gray-500">
            No branches match your search.
          </p>
        </div>
      )}

      {/* Branch List */}
      <section>
        <div className="flex items-baseline gap-3 mb-6">
          <span className="font-['Geist_Mono'] text-[11px] uppercase tracking-[0.1em] text-gray-400 dark:text-gray-600">
            02 — results
          </span>
          <h2 className="font-['Geist'] text-xl font-semibold tracking-[-0.02em] text-ink">
            branches ({filteredBranches.length})
          </h2>
        </div>

        {filteredBranches.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-600 font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] text-center py-12">
            No branches found. Try adjusting your search or filters.
          </p>
        ) : (
          <div className="font-['Geist'] grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBranches.map((branch) => (
              <div
                key={branch.id}
                onClick={() => setSelectedBranch(branch)}
                className={`group border rounded-xl p-5 cursor-pointer transition-all duration-200 ${
                  selectedBranch?.id === branch.id
                    ? 'border-ink bg-ink text-bg shadow-[4px_8px_24px_rgba(0,0,0,0.12)]'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-[2px_4px_12px_rgba(0,0,0,0.06)]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3
                      className={`font-['Geist'] text-[17px] font-semibold tracking-[-0.02em] mb-1 ${
                        selectedBranch?.id === branch.id
                          ? 'text-bg'
                          : 'text-ink'
                      }`}
                    >
                      {branch.branch_name}
                    </h3>
                    {branch.branch_code && (
                      <p
                        className={`font-['Geist_Mono'] text-[10px] uppercase tracking-[0.06em] ${
                          selectedBranch?.id === branch.id
                            ? 'text-gray-300'
                            : 'text-gray-500'
                        }`}
                      >
                        {branch.branch_code}
                      </p>
                    )}
                  </div>
                  <MapPin
                    size={18}
                    weight="regular"
                    className={
                      selectedBranch?.id === branch.id
                        ? 'text-bg shrink-0'
                        : 'text-gray-400 shrink-0'
                    }
                  />
                </div>

                {branch._distance != null && (
                  <p
                    className={`text-[11px] mt-1.5 font-['Geist_Mono'] uppercase tracking-[0.06em] ${
                      selectedBranch?.id === branch.id
                        ? 'text-blue-300'
                        : 'text-blue-500'
                    }`}
                  >
                    {branch._distance < 1
                      ? `${Math.round(branch._distance * 1000)} m away`
                      : `${branch._distance.toFixed(1)} km away`}
                  </p>
                )}

                <p
                  className={`text-[13px] mt-3 leading-relaxed ${
                    selectedBranch?.id === branch.id
                      ? 'text-gray-200'
                      : 'text-gray-600'
                  }`}
                >
                  {branch.address}
                </p>
                <p
                  className={`text-[13px] ${
                    selectedBranch?.id === branch.id
                      ? 'text-gray-300'
                      : 'text-gray-500'
                  }`}
                >
                  {branch.city}, {branch.province}
                </p>

                {(branch.contact_number || branch.business_hours) && (
                  <div className="mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-700/50 space-y-1.5">
                    {branch.contact_number && (
                      <p
                        className={`flex items-center gap-1.5 text-[11px] ${
                          selectedBranch?.id === branch.id
                            ? 'text-gray-300'
                            : 'text-gray-500'
                        }`}
                      >
                        <Phone size={12} weight="regular" />
                        {branch.contact_number}
                      </p>
                    )}
                    {branch.business_hours && (
                      <p
                        className={`flex items-center gap-1.5 text-[11px] ${
                          selectedBranch?.id === branch.id
                            ? 'text-gray-300'
                            : 'text-gray-500'
                        }`}
                      >
                        <Clock size={12} weight="regular" />
                        {branch.business_hours}
                      </p>
                    )}
                  </div>
                )}

                <Link
                  to={`/branches/${branch.slug}`}
                  className={`inline-flex items-center gap-1 font-['Geist_Mono'] text-[10px] uppercase tracking-[0.08em] mt-4 transition-colors duration-200 ${
                    selectedBranch?.id === branch.id
                      ? 'text-bg hover:text-gray-200'
                      : 'text-gray-400 hover:text-ink'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  view details
                  <ArrowRight size={12} weight="regular" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Branches
