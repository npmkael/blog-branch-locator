export function formatDate(dateString, options = {}) {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (isNaN(date)) return ''

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  })
}

// Optional: uppercase month version (e.g., "JUL 11, 2026")
export function formatDateUpper(dateString) {
  return formatDate(dateString).toUpperCase()
}
