import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import client from '../api/client'
import Loading from '../components/Loading'

function BlogDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPost() {
      setLoading(true)
      setNotFound(false)
      setError(null)
      try {
        const res = await client.get(`/posts/${slug}`)
        setPost(res.data.data)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setNotFound(true)
        } else {
          setError('Failed to load the post. Please try again later.')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [slug])

  if (loading) return <Loading label="Loading post..." />
  if (notFound)
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-3">Post Not Found</h1>
        <p className="text-neutral-600 mb-6">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/blog" className="text-blue-600 hover:underline">
          ← Back to Blog
        </Link>
      </div>
    )
  if (error)
    return <div className="text-center py-12 text-red-600">{error}</div>

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        to="/blog"
        className="text-blue-600 hover:underline text-sm mb-6 inline-block"
      >
        ← Back to Blog
      </Link>

      {post.category && (
        <Link
          to={`/category/${post.category.slug}`}
          className="text-sm text-blue-600 hover:underline"
        >
          {post.category.name}
        </Link>
      )}

      <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">{post.title}</h1>

      <div className="flex items-center gap-3 text-sm text-neutral-500 mb-8">
        {post.author && <span>By {post.author.name}</span>}
        {post.published_date && <span>• {post.published_date}</span>}
      </div>

      {post.featured_image && (
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full rounded-lg mb-8 object-cover max-h-96"
        />
      )}

      <div
        className="prose max-w-none prose-p:my-4 prose-headings:my-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-12 pt-6 border-t border-neutral-200">
        <Link to="/blog" className="text-blue-600 hover:underline">
          ← Back to Blog
        </Link>
      </div>
    </article>
  )
}

export default BlogDetail
