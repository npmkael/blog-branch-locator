import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import client from '../api/client'
import PostCard from '../components/PostCard'
import Loading from '../components/Loading'

function Category() {
  const { slug } = useParams()
  const [category, setCategory] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCategory() {
      setLoading(true)
      setNotFound(false)
      setError(null)
      try {
        const [categoriesRes, postsRes] = await Promise.all([
          client.get('/categories'),
          client.get(`/categories/${slug}/posts`),
        ])

        const found = categoriesRes.data.data.find((c) => c.slug === slug)
        if (!found) {
          setNotFound(true)
          return
        }
        setCategory(found)
        setPosts(postsRes.data.data)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setNotFound(true)
        } else {
          setError('Failed to load the category. Please try again later.')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchCategory()
  }, [slug])

  if (loading) return <Loading label="Loading category..." />
  if (notFound)
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-3">Category Not Found</h1>
        <p className="text-neutral-600 mb-6">
          The category you're looking for doesn't exist.
        </p>
        <Link to="/blog" className="text-blue-600 hover:underline">
          ← Back to Blog
        </Link>
      </div>
    )
  if (error)
    return <div className="text-center py-12 text-red-600">{error}</div>

  return (
    <div className="space-y-8">
      <header className="mb-6">
        <Link
          to="/blog"
          className="text-blue-600 hover:underline text-sm mb-3 inline-block"
        >
          ← Back to Blog
        </Link>
        <h1 className="text-3xl font-bold">{category.name}</h1>
        {category.description && (
          <p className="text-neutral-600 mt-2 max-w-2xl">
            {category.description}
          </p>
        )}
      </header>

      {posts.length === 0 ? (
        <p className="text-neutral-500 text-center py-12">
          No posts in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Category
