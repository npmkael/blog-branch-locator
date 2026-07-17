import { useEffect, useState } from 'react'
import client from '../api/client'
import PostCard from '../components/PostCard'
import Loading from '../components/Loading'

function BlogList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [nextPage, setNextPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  async function loadPosts(page = 1, append = false) {
    try {
      if (append) setLoadingMore(true)
      const res = await client.get(`/posts?page=${page}`)
      const newPosts = res.data.data
      setPosts((prev) => (append ? [...prev, ...newPosts] : newPosts))

      // Laravel pagination meta: current_page, last_page, next_page_url
      const meta = res.data.meta
      setNextPage(meta.current_page + 1)
      setHasMore(meta.current_page < meta.last_page)
    } catch (err) {
      setError('Failed to load posts. Please try again later.')
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    loadPosts(1, false)
  }, [])

  if (loading) return <Loading label="Loading posts..." />
  if (error)
    return <div className="text-center py-12 text-red-600">{error}</div>

  return (
    <div className="space-y-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="text-neutral-600 mt-2">All published posts</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-neutral-500 text-center py-12">
          No posts published yet. Check back soon!
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center pt-4">
              <button
                onClick={() => loadPosts(nextPage, true)}
                disabled={loadingMore}
                className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
              >
                {loadingMore ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default BlogList
