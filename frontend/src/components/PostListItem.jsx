import { Link } from 'react-router'

function formatDate(value) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function PostListItem({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="post-card group">
      {post.featured_image && (
        <div className="post-thumb">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div className="post-body">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <time className="font-['Geist_Mono'] text-[11.5px] text-gray-400">
            {formatDate(post.published_date)}
          </time>
          {post.category && (
            <>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <span className="font-['Geist_Mono'] text-[10px] uppercase tracking-[0.08em] text-zinc-400 dark:text-zinc-600">
                {post.category.name}
              </span>
            </>
          )}
        </div>

        <h2 className="font-['Geist'] tmt-1text-[18px] font-semibold leading-snug text-ink transition-colors group-hover:text-gray-500">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="font-['Geist'] post-excerpt mt-1.5 line-clamp-2 text-[14px] leading-relaxed text-gray-500">
            {post.excerpt}
          </p>
        )}

        <div className="mt-2.5 flex items-center gap-2 font-['Geist_Mono'] text-[11px] text-gray-400">
          <div className="">
            <span className="group-hover:text-ink">Read</span>
          </div>
          <span className="font-['Geist_Mono'] text-[10px] uppercase tracking-[0.06em] text-zinc-400 dark:text-zinc-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">
            →
          </span>
        </div>
      </div>
    </Link>
  )
}

export default PostListItem
