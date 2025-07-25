'use client'
import { useEffect, useState, useRef } from 'react'
import { getPosts, getUsers } from '@/lib/api'
import PostCard from '@/components/PostCard'
import Loader from '@/components/Loader'

export default function PostsPage() {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [filteredPosts, setFilteredPosts] = useState([])
  const [visibleCount, setVisibleCount] = useState(20)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const loaderRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getPosts()
        const usersData = await getUsers()
        setPosts(postsData)
        setUsers(usersData)
        setFilteredPosts(postsData)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    let filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'author') {
      filtered.sort((a, b) => {
        const authorA = getAuthorName(a.userId)
        const authorB = getAuthorName(b.userId)
        return authorA.localeCompare(authorB)
      })
    }

    setFilteredPosts(filtered)
    setVisibleCount(20)
  }, [searchTerm, sortBy, posts, users])

  const getAuthorName = (userId) => users.find(user => user.id === userId)?.name || 'Unknown'

  const clearSearch = () => {
    setSearchTerm('')
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (entry.isIntersecting && !isLoadingMore && visibleCount < filteredPosts.length) {
          loadMore()
        }
      },
      { threshold: 1 }
    )

    if (loaderRef.current) observer.observe(loaderRef.current)

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [filteredPosts, visibleCount, isLoadingMore])

  const loadMore = () => {
    setIsLoadingMore(true)
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 20, filteredPosts.length))
      setIsLoadingMore(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-emerald-600/5"></div>
        <div className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-40`}></div>

        <div className="relative py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full text-sm font-medium text-slate-700 mb-6 shadow-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
              Latest Articles
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-slate-900 via-blue-700 to-emerald-700 bg-clip-text text-transparent leading-tight">
              Discover Stories
            </h1>

            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto mb-6 rounded-full shadow-lg"></div>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Dive deep into our curated collection of insightful articles, tutorials, and thought-provoking content
              from industry experts and passionate creators worldwide.
            </p>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                  <div className="relative flex-1 w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search articles, topics, or authors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 shadow-sm"
                    />
                    {searchTerm && (
                      <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-slate-200 rounded-xl px-6 py-4 pr-12 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 shadow-sm cursor-pointer"
                    >
                      <option value="latest">Latest First</option>
                      <option value="title">Title A-Z</option>
                      <option value="author">By Author</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Post List Section */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {loading ? (
          <div className="py-20">
            <Loader />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPosts.slice(0, visibleCount).map((post, index) => (
                <div
                  key={post.id}
                  className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <PostCard post={post} author={getAuthorName(post.userId)} />
                </div>
              ))}
            </div>

            {/* Loader for infinite scroll */}
            {visibleCount < filteredPosts.length && (
              <div ref={loaderRef} className="mt-10 flex justify-center">
                <Loader />
              </div>
            )}

            {/* All posts loaded */}
            {filteredPosts.length > 0 && visibleCount >= filteredPosts.length && (
              <div className="text-center mt-16">
                <div className="inline-flex items-center text-slate-500 text-sm">
                  <div className="w-12 h-px bg-slate-300 mr-4"></div>
                  <span>Showing all {filteredPosts.length} articles</span>
                  <div className="w-12 h-px bg-slate-300 ml-4"></div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
