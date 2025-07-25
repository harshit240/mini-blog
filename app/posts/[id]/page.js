'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getPost, getUser, getComments } from '@/lib/api'
import Loader from '@/components/Loader'
import Link from 'next/link'

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [author, setAuthor] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const postData = await getPost(id)
        const authorData = await getUser(postData.userId)
        const commentsData = await getComments(id)
        setPost(postData)
        setAuthor(authorData)
        setComments(commentsData)
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchDetails()
  }, [id])

  if (loading || !post || !author) return <Loader />

  return (
    <div className="py-8">
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/posts" className="hover:text-blue-600 transition-colors">Posts</Link>
          <span>/</span>
          <span className="text-slate-700">Article</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto">
        <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-blue-100 to-emerald-100 text-slate-700 text-sm px-4 py-2 rounded-full font-medium mb-4">
                Featured Article
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-6">
                {post.title}
              </h1>
            </div>

            <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-slate-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {author.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-slate-800">{author.name}</p>
                <p className="text-slate-500 text-sm">{author.email}</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed text-lg">
                {post.body}
              </p>
            </div>
          </div>
        </article>

        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center space-x-3 mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Comments</h2>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
                {comments.length}
              </span>
            </div>
            
            {comments.length > 0 ? (
              <div className="space-y-6">
                {comments.map(comment => (
                  <div key={comment.id} className="bg-slate-50 rounded-xl p-6 hover:bg-slate-100 transition-colors duration-200">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">
                          {comment.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-slate-800">{comment.name}</h3>
                          <span className="text-slate-400">•</span>
                          <span className="text-sm text-slate-500">{comment.email}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{comment.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-slate-500">No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/posts" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  )
}