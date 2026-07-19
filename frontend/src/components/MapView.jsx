import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Link } from 'react-router'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix default marker icon (common Vite + react-leaflet issue)
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    'leaflet/dist/images/marker-icon-2x.png',
    import.meta.url,
  ).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url)
    .href,
})

// Child component that uses the map instance to fly to selected branch
function FocusController({ selectedBranch }) {
  const map = useMap()

  useEffect(() => {
    if (selectedBranch) {
      map.flyTo([selectedBranch.latitude, selectedBranch.longitude], 15, {
        duration: 1.5,
      })
    }
  }, [selectedBranch, map])

  return null
}

// Custom blue dot icon for user's location
const userLocationIcon = L.divIcon({
  className: 'user-location-marker',
  html: '<div style="width:16px;height:16px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 0 8px rgba(0,0,0,0.3);"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

function MapView({ branches, selectedBranch, onMarkerClick, userLocation }) {
  // Default center: Philippines. If branches exist, center on first one.
  const center =
    branches.length > 0
      ? [branches[0].latitude, branches[0].longitude]
      : [12.8797, 121.774]
  const zoom = branches.length > 0 ? 12 : 6

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '400px', width: '100%' }}
      className="rounded-lg overflow-hidden border border-neutral-200"
    >
      {/* OpenStreetMap tiles (free, with required attribution) */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* One marker per active branch (from API data) */}
      {branches.map((branch) => (
        <Marker
          key={branch.id}
          position={[branch.latitude, branch.longitude]}
          eventHandlers={{
            click: () => onMarkerClick && onMarkerClick(branch),
          }}
        >
          <Popup>
            <div className="text-sm">
              <strong>{branch.branch_name}</strong>
              <br />
              {branch.address}
              <br />
              {branch.contact_number && (
                <>
                  {branch.contact_number}
                  <br />
                </>
              )}
              {branch.business_hours && (
                <>
                  {branch.business_hours}
                  <br />
                </>
              )}
              <Link to={`/branches/${branch.slug}`} className="text-blue-600">
                View details →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* User's current location marker */}
      {userLocation && (
        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={userLocationIcon}
        >
          <Popup>
            <div className="text-sm">
              <strong>You are here</strong>
            </div>
          </Popup>
        </Marker>
      )}

      {/* Focus on selected branch when list item is clicked */}
      <FocusController selectedBranch={selectedBranch} />
    </MapContainer>
  )
}

export default MapView
