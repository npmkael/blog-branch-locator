import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import { ArrowLeft } from '@phosphor-icons/react'
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
      <div className="max-w-2xl mx-auto text-center py-20">
        <p className="font-['Geist_Mono'] text-[11px] uppercase tracking-[0.1em] text-zinc-400 dark:text-zinc-600 mb-4">
          404 — not found
        </p>
        <h1 className="font-['Geist_Pixel'] text-3xl lowercase text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
          category not found
        </h1>
        <p className="font-['Source_Serif_4'] text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
          The category you're looking for doesn't exist.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
        >
          <ArrowLeft size={14} weight="regular" />
          back to blog
        </Link>
      </div>
    )
  if (error)
    return (
      <div className="text-center py-12 font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] text-red-500 dark:text-red-400">
        {error}
      </div>
    )

  return (
    <div className="space-y-10">
      {/* Category Header */}
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 px-8 sm:px-12 py-10 text-center">
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
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 font-['Geist_Mono'] text-[10px] uppercase tracking-[0.08em] text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 mb-6"
          >
            <ArrowLeft size={12} weight="regular" />
            all posts
          </Link>
          <p className="font-['Geist_Mono'] text-[11px] uppercase tracking-[0.1em] text-gray-500 mb-3">
            category
          </p>
          <h1 className="font-['Geist_Pixel'] text-4xl lowercase text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="font-['Geist'] text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto">
              {category.description}
            </p>
          )}
          {posts.length > 0 && (
            <p className="mt-4 font-['Geist_Mono'] text-[10px] uppercase text-ink">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </p>
          )}
        </div>
      </section>

      {posts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <p className="font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] text-zinc-400 dark:text-zinc-600 mb-2">
            no posts yet
          </p>
          <p className="font-['Source_Serif_4'] text-[15px] text-zinc-400 dark:text-zinc-500">
            Check back soon — new articles are on the way.
          </p>
        </div>
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
