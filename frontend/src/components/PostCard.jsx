import { Link } from 'react-router'

function PostCard({ post }) {
  return (
    <article className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white">
      {post.featured_image && (
        <Link to={`/blog/${post.slug}`}>
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
        </Link>
      )}
      <div className="p-4">
        {post.category && (
          <Link
            to={`/category/${post.category.slug}`}
            className="text-sm text-blue-600 hover:underline"
          >
            {post.category.name}
          </Link>
        )}
        <h3 className="text-lg font-semibold mt-1 mb-2">
          <Link to={`/blog/${post.slug}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h3>
        <p className="text-neutral-600 text-sm line-clamp-2">{post.excerpt}</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-neutral-500">
          {post.author && <span>By {post.author.name}</span>}
          {post.published_date && <span>• {post.published_date}</span>}
        </div>
      </div>
    </article>
  )
}

export default PostCard
