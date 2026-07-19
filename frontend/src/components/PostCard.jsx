import { Link } from 'react-router'
import { User, CalendarBlank } from '@phosphor-icons/react'
import { formatDate } from '../utils/formatDate'

function PostCard({ post }) {
  return (
    <article className="group border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-900/50 shadow-[2px_4px_12px_rgba(0,0,0,0.06)] dark:shadow-[2px_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[4px_8px_24px_rgba(0,0,0,0.12)] dark:hover:shadow-[4px_8px_24px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-all duration-300">
      {post.featured_image && (
        <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
          <img
            src={post.featured_image}
            alt={post.title}
            loading="lazy"
            className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>
      )}
      <div className="p-5">
        {post.category && (
          <Link
            to={`/category/${post.category.slug}`}
            className="inline-block font-['Geist_Mono'] text-[10px] uppercase tracking-[0.08em] text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 mb-3"
          >
            {post.category.name}
          </Link>
        )}
        <h3 className="font-['Geist'] text-[18px] font-semibold tracking-[-0.02em] text-zinc-900 dark:text-zinc-100 mb-2 leading-snug">
          <Link
            to={`/blog/${post.slug}`}
            className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h3>
        <p className="font-['Geist'] text-[15px] text-gray-500 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {post.author && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200 dark:border-zinc-700">
                {post.author.profile_image ? (
                  <img
                    src={post.author.profile_image}
                    alt={post.author.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User
                      size={16}
                      weight="regular"
                      className="text-zinc-400"
                    />
                  </div>
                )}
              </div>
            )}
            <div className="flex flex-col gap-0.5">
              {post.author && (
                <span className="font-['Geist_Mono'] text-[10px] uppercase tracking-[0.06em] text-ink">
                  {post.author.name}
                </span>
              )}
              {post.published_date && (
                <span className="flex items-center gap-1.5 font-['Geist_Mono'] text-[10px] uppercase tracking-[0.06em] text-zinc-600">
                  {formatDate(post.published_date)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostCard
