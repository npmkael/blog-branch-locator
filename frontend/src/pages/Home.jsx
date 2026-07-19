import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Article, Tree } from '@phosphor-icons/react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import client from '../api/client'
import PostCard from '../components/PostCard'
import Loading from '../components/Loading'

function Home() {
  useDocumentTitle('bloggy')
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          client.get('/posts'),
          client.get('/categories'),
        ])
        setPosts(postsRes.data.data.slice(0, 6))
        setCategories(categoriesRes.data.data)
      } catch (err) {
        setError('Failed to load content. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (error)
    return (
      <div className="text-center py-12 font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] text-red-500 dark:text-red-400">
        {error}
      </div>
    )

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 px-8 sm:px-12 py-14 sm:py-16 text-center">
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
          <p className="font-['Geist_Mono'] text-[11px] uppercase tracking-[0.1em] text-zinc-400 dark:text-zinc-600 mb-5 animate-fade-up">
            01 — welcome
          </p>
          <h1
            className="font-['Geist_Pixel'] text-4xl sm:text-5xl lowercase text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 animate-fade-up"
            style={{ animationDelay: '70ms' }}
          >
            bloggy
          </h1>
          <p
            className="font-['Geist'] text-[17px] text-zinc-500 dark:text-zinc-400 leading-[1.75] max-w-xl mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: '130ms' }}
          >
            Insights, tutorials, and stories from our team. Explore our latest
            articles or find a branch near you.
          </p>
          <div
            className="flex items-center justify-center gap-2 flex-wrap animate-fade-up"
            style={{ animationDelay: '190ms' }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 px-5 py-2.5 rounded-[6px] text-[13px] font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-all duration-200"
            >
              <Article size={16} weight="regular" />
              Read the blog
            </Link>
            <Link
              to="/branches"
              className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 px-3 py-2.5 rounded-[6px] text-[13px] font-['Geist_Mono'] hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200"
            >
              <Tree size={16} weight="regular" />
              find a branch
              <span className="text-[11px] opacity-60">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <div className="flex flex-col items-baseline gap-3">
            <span className="font-['Geist_Mono'] text-[11px] uppercase tracking-[0.1em] text-zinc-400 dark:text-zinc-600">
              02 — posts
            </span>
            <h2 className="font-['Geist'] text-xl font-semibold tracking-[-0.02em] text-zinc-900 dark:text-zinc-100">
              latest posts
            </h2>
          </div>
          <Link
            to="/blog"
            className="font-['Geist_Mono'] text-[11px] uppercase tracking-[0.06em] text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 flex items-center gap-1"
          >
            view all
            <span className="text-[10px]">↗</span>
          </Link>
        </div>
        {loading ? (
          <Loading label="Loading posts..." />
        ) : posts.length === 0 ? (
          <p className="text-zinc-400 dark:text-zinc-600 font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] text-center py-12">
            no posts published yet
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section>
        <div className="flex flex-col items-baseline gap-3 mb-6">
          <span className="font-['Geist_Mono'] text-[11px] uppercase tracking-[0.1em] text-zinc-400 dark:text-zinc-600">
            03 — categories
          </span>
          <h2 className="font-['Geist'] text-xl font-semibold tracking-[-0.02em] text-zinc-900 dark:text-zinc-100">
            browse by topic
          </h2>
        </div>
        {categories.length === 0 ? (
          <p className="text-zinc-400 dark:text-zinc-600 font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] text-center py-12">
            no categories available
          </p>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="inline-flex items-center gap-2 border border-zinc-300 dark:border-zinc-700 rounded-full px-3.5 py-1.5 font-['Geist_Mono'] text-[10px] uppercase tracking-[0.07em] text-zinc-500 dark:text-zinc-400 hover:border-zinc-900 dark:hover:border-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200"
              >
                {category.name}
                {category.posts_count != null && (
                  <span className="opacity-50">({category.posts_count})</span>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Branch CTA */}
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-900/50 px-8 py-12 text-center">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #0a0a0a 1px, transparent 1px)',
            backgroundSize: '9px 9px',
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <p className="font-['Geist_Mono'] text-[11px] uppercase tracking-[0.1em] text-zinc-400 dark:text-zinc-600 mb-4">
            04 — locations
          </p>
          <h2 className="font-['Geist_Pixel'] text-2xl lowercase text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
            find a branch
          </h2>
          <p className="font-['Source_Serif_4'] text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm mx-auto mb-6">
            Locate our branches on an interactive map.
          </p>
          <Link
            to="/branches"
            className="inline-flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 px-5 py-2.5 rounded-[6px] text-[13px] font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-all duration-200"
          >
            <Tree size={16} weight="regular" />
            open branch locator
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
