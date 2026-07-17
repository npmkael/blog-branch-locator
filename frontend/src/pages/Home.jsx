import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import client from '../api/client'
import PostCard from '../components/PostCard'
import Loading from '../components/Loading'

function Home() {
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

  if (loading) return <Loading label="Loading home page..." />
  if (error)
    return <div className="text-center py-12 text-red-600">{error}</div>

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="bg-neutral-900 text-white rounded-lg p-8 sm:p-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Welcome to MyBlog
        </h1>
        <p className="text-neutral-300 max-w-2xl mx-auto mb-6">
          Insights, tutorials, and stories from our team. Explore our latest
          articles or find a branch near you.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            to="/blog"
            className="bg-white text-neutral-900 px-5 py-2 rounded font-medium hover:bg-neutral-200 transition-colors"
          >
            Read the Blog
          </Link>
          <Link
            to="/branches"
            className="border border-white text-white px-5 py-2 rounded font-medium hover:bg-white hover:text-neutral-900 transition-colors"
          >
            Find a Branch
          </Link>
        </div>
      </section>

      {/* Latest Posts */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Posts</h2>
          <Link to="/blog" className="text-blue-600 hover:underline text-sm">
            View all →
          </Link>
        </div>
        {posts.length === 0 ? (
          <p className="text-neutral-500 text-center py-8">
            No posts published yet.
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
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        {categories.length === 0 ? (
          <p className="text-neutral-500 text-center py-8">
            No categories available.
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="border border-neutral-300 rounded-full px-4 py-2 text-sm hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                {category.name}
                {category.posts_count != null && (
                  <span className="text-neutral-400 ml-1">
                    ({category.posts_count})
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Branch CTA */}
      <section className="bg-blue-50 border border-blue-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Find a Branch Near You</h2>
        <p className="text-neutral-600 mb-4">
          Locate our branches on an interactive map.
        </p>
        <Link
          to="/branches"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Open Branch Locator
        </Link>
      </section>
    </div>
  )
}

export default Home
