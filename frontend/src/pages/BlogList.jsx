import { useEffect, useState } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CaretLeft,
  CaretRight,
  List,
  SquaresFour,
} from '@phosphor-icons/react'
import client from '../api/client'
import PostCard from '../components/PostCard'
import PostListItem from '../components/PostListItem'
import Loading from '../components/Loading'

function BlogList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [view, setView] = useState(() => {
    if (typeof window === 'undefined') return 'list'
    return localStorage.getItem('blog-view') || 'list'
  })

  function switchView(next) {
    setView(next)
    localStorage.setItem('blog-view', next)
  }

  async function loadPosts(page = 1) {
    try {
      setLoading(true)
      const res = await client.get(`/posts?page=${page}`)
      setPosts(res.data.data)

      const meta = res.data.meta
      setCurrentPage(meta.current_page)
      setLastPage(meta.last_page)
    } catch (err) {
      setError('Failed to load posts. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts(1, false)
  }, [])

  if (loading) return <Loading label="Loading posts..." />
  if (error)
    return <div className="text-center py-12 text-red-600">{error}</div>

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
      {/* Page Header */}
      <header className="mb-10 flex items-start justify-between gap-4">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="font-['Geist_Pixel'] text-4xl lowercase text-zinc-900 dark:text-zinc-100 tracking-tight mb-3 animate-fade-up">
              list of blogs.
            </h1>
            <p
              className="font-['Geist'] text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed animate-fade-up"
              style={{ animationDelay: '70ms' }}
            >
              Thoughts, tutorials, and notes on AI, engineering, and building
              things.
            </p>
          </div>
        </div>

        {posts.length > 0 && (
          <div className="inline-flex shrink-0 items-center gap-0.5 rounded-lg border border-gray-200 p-0.5">
            <button
              onClick={() => switchView('list')}
              aria-label="List view"
              aria-pressed={view === 'list'}
              className={`p-1.5 rounded-[4px] transition-colors duration-200 ${
                view === 'list'
                  ? 'bg-gray-100 text-ink'
                  : 'text-gray-400 hover:text-ink'
              }`}
            >
              <List size={16} weight="regular" />
            </button>
            <button
              onClick={() => switchView('grid')}
              aria-label="Grid view"
              aria-pressed={view === 'grid'}
              className={`p-1.5 rounded-[4px] transition-colors duration-200 ${
                view === 'grid'
                  ? 'bg-gray-100 text-ink'
                  : 'text-gray-400 hover:text-ink'
              }`}
            >
              <SquaresFour size={16} weight="regular" />
            </button>
          </div>
        )}
      </header>

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
        <div key={view} className="animate-fade-in">
          {view === 'list' ? (
            <div id="postsContainer" className="view-list">
              {posts.map((post) => (
                <PostListItem key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div id="postsContainer" className="view-grid">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-8">
            <button
              onClick={() => loadPosts(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1.5 font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] px-3 py-2 rounded-[6px] border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-900 dark:hover:border-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeftIcon size={14} weight="regular" />
              prev.
            </button>

            <span className="font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] text-zinc-400 dark:text-zinc-500 min-w-[3rem] text-center">
              {currentPage} / {lastPage}
            </span>

            <button
              onClick={() => loadPosts(currentPage + 1)}
              disabled={currentPage === lastPage}
              className="flex items-center gap-1.5 font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] px-3 py-2 rounded-[6px] border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-900 dark:hover:border-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
            >
              next.
              <ArrowRightIcon size={14} weight="regular" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogList
