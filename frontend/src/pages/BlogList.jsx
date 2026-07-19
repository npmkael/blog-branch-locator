import { useEffect, useState } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  List,
  MagnifyingGlass,
  SquaresFour,
  X,
} from '@phosphor-icons/react'
import client from '../api/client'
import PostCard from '../components/PostCard'
import PostListItem from '../components/PostListItem'
import Loading from '../components/Loading'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function BlogList() {
  useDocumentTitle('blog')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [view, setView] = useState(() => {
    if (typeof window === 'undefined') return 'list'
    return localStorage.getItem('blog-view') || 'list'
  })

  function switchView(next) {
    setView(next)
    localStorage.setItem('blog-view', next)
  }

  async function loadPosts(page = 1, search = '') {
    try {
      setLoading(true)
      const params = new URLSearchParams({ page: String(page) })
      if (search) params.append('search', search)
      const res = await client.get(`/posts?${params.toString()}`)
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

  // Debounce search input -> search query (400ms)
  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput), 400)
    return () => clearTimeout(timer)
  }, [searchInput])

  // Reload posts whenever the debounced search query changes
  // (this also fires on mount with empty search → initial load)
  useEffect(() => {
    loadPosts(1, searchQuery)
  }, [searchQuery])

  function clearSearch() {
    setSearchInput('')
    setSearchQuery('')
  }

  if (error)
    return (
      <div className="text-center py-12 font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] text-red-500 dark:text-red-400">
        {error}
      </div>
    )

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
      {/* Page Header */}
      <header className="mb-8 flex items-start justify-between gap-4">
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

      {/* Search */}
      <div className="mb-8 flex items-center gap-3">
        <div className="relative w-full max-w-md">
          <MagnifyingGlass
            size={14}
            weight="regular"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="search posts..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-[6px] pl-9 pr-9 py-2.5 text-[13px] font-['Geist_Mono'] text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink transition-colors duration-200"
          />
          {searchInput && (
            <button
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-ink transition-colors duration-200 p-1"
            >
              <X size={14} weight="regular" />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <Loading label="Loading posts..." />
      ) : posts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <p className="font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] text-zinc-400 dark:text-zinc-600 mb-2">
            {searchQuery ? `no results for "${searchQuery}"` : 'no posts yet'}
          </p>
          <p className="font-['Source_Serif_4'] text-[15px] text-zinc-400 dark:text-zinc-500">
            {searchQuery
              ? 'Try a different search term.'
              : 'Check back soon — new articles are on the way.'}
          </p>
        </div>
      ) : (
        <div key={view + searchQuery} className="animate-fade-in">
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
              onClick={() => loadPosts(currentPage - 1, searchQuery)}
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
              onClick={() => loadPosts(currentPage + 1, searchQuery)}
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
