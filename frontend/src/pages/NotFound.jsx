import { useDocumentTitle } from '../hooks/useDocumentTitle'

function NotFound() {
  useDocumentTitle('not found')
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-neutral-900 mb-4">404</h1>
      <p className="text-xl text-neutral-600 mb-8">Page Not Found</p>
      <a href="/" className="text-blue-600 hover:underline">
        Go back home
      </a>
    </div>
  )
}
export default NotFound
