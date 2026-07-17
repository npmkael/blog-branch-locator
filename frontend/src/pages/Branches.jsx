import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router'
import client from '../api/client'
import MapView from '../components/MapView'
import Loading from '../components/Loading'

function Branches() {
  const [branches, setBranches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [provinceFilter, setProvinceFilter] = useState('')
  const [selectedBranch, setSelectedBranch] = useState(null)

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
    return branches.filter((branch) => {
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
  }, [branches, searchQuery, cityFilter, provinceFilter])

  function handleResetFilters() {
    setSearchQuery('')
    setCityFilter('')
    setProvinceFilter('')
    setSelectedBranch(null)
  }

  if (loading) return <Loading label="Loading branches..." />
  if (error)
    return <div className="text-center py-12 text-red-600">{error}</div>

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Branch Locator</h1>
        <p className="text-neutral-600 mt-2">
          Find our branches on the map below.
        </p>
      </header>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by name, code, address, city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border border-neutral-300 rounded px-4 py-2 focus:outline-none focus:border-blue-600"
        />
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="border border-neutral-300 rounded px-4 py-2 focus:outline-none focus:border-blue-600"
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
          className="border border-neutral-300 rounded px-4 py-2 focus:outline-none focus:border-blue-600"
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
            className="border border-neutral-300 rounded px-4 py-2 text-sm hover:bg-neutral-100"
          >
            Clear
          </button>
        )}
      </div>

      {/* Map */}
      {filteredBranches.length > 0 ? (
        <MapView
          branches={filteredBranches}
          selectedBranch={selectedBranch}
          onMarkerClick={setSelectedBranch}
        />
      ) : (
        <div className="border border-neutral-200 rounded-lg bg-neutral-50 py-12 text-center text-neutral-500">
          No branches match your search.
        </div>
      )}

      {/* Branch List */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          Branches ({filteredBranches.length})
        </h2>
        {filteredBranches.length === 0 ? (
          <p className="text-neutral-500 text-center py-8">
            No branches found. Try adjusting your search or filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBranches.map((branch) => (
              <div
                key={branch.id}
                onClick={() => setSelectedBranch(branch)}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedBranch?.id === branch.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <h3 className="font-semibold text-lg">{branch.branch_name}</h3>
                {branch.branch_code && (
                  <p className="text-sm text-neutral-500">
                    {branch.branch_code}
                  </p>
                )}
                <p className="text-sm text-neutral-600 mt-1">
                  {branch.address}
                </p>
                <p className="text-sm text-neutral-600">
                  {branch.city}, {branch.province}
                </p>
                {branch.contact_number && (
                  <p className="text-sm text-neutral-600 mt-1">
                    {branch.contact_number}
                  </p>
                )}
                {branch.business_hours && (
                  <p className="text-sm text-neutral-600">
                    {branch.business_hours}
                  </p>
                )}
                <Link
                  to={`/branches/${branch.slug}`}
                  className="text-blue-600 text-sm hover:underline mt-2 inline-block"
                  onClick={(e) => e.stopPropagation()}
                >
                  View details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Branches
