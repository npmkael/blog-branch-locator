import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import client from '../api/client'
import Loading from '../components/Loading'
import { CaretLeftIcon } from '@phosphor-icons/react'
import { User } from '@phosphor-icons/react'

// utils
import { formatDate } from '../utils/formatDate'

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
    <article className="max-w-5xl mx-auto">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 font-['Geist_Mono'] text-[12px] text-gray-500 hover:text-ink"
      >
        <CaretLeftIcon />
        all posts.
      </Link>

      {/* {post.category && (
        <Link
          to={`/category/${post.category.slug}`}
          className="text-sm text-blue-600 hover:underline"
        >
          {post.category.name}
        </Link>
      )} */}

      {/* header */}
      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-['Geist_Mono'] text-[11px] uppercase tracking-wider text-gray-400">
          <time>{formatDate(post.published_date)}</time>
          <span className="text-gray-300">·</span>
          <Link
            to={`/category/${post.category.slug}`}
            className="hover:text-ink transition-colors duration-200"
          >
            {post.category.name}
          </Link>
        </div>

        <h1 className="font-['Geist'] mt-3 text-[28px] font-semibold leading-tight tracking-tight text-ink sm:text-[34px]">
          {post.title}
        </h1>

        <p className="font-['Geist'] mt-3 text-[16px] leading-relaxed text-gray-500">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center gap-2.5 border-t border-gray-200 pt-5">
          {post.author && (
            <>
              {post.author.profile_image ? (
                <img
                  src={post.author.profile_image}
                  alt={post.author.name}
                  className="h-8 w-8 shrink-0 rounded-full border border-gray-200 object-cover"
                />
              ) : (
                <div className="h-8 w-8 shrink-0 rounded-full border border-gray-200  flex items-center justify-center">
                  <User size={16} weight="regular" className="text-zinc-400" />
                </div>
              )}
            </>
          )}

          <div className="font-['Geist'] text-[13px] font-medium text-ink">
            {post.author?.name}
          </div>
        </div>
      </header>

      {/* featured image */}
      {post.featured_image && (
        <figure className="mt-8 overflow-hidden rounded-xl bg-gray-100">
          <img
            src={post.featured_image}
            alt={post.title}
            className="aspect-[2/1] w-full object-cover"
          />
        </figure>
      )}

      <div
        className="prose max-w-none prose-p:my-4 prose-headings:my-4 prose-headings:font-['Geist'] prose-p:font-['Source_Serif_4']"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <footer
        className="mt-12 flex items-center 
      justify-between border-t border-gray-200 pt-6"
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 font-['Geist_Mono'] text-[12px] text-gray-500 hover:text-ink"
        >
          <CaretLeftIcon />
          all posts.
        </Link>
      </footer>
    </article>
  )
}

export default BlogDetail
