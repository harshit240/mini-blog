import Link from 'next/link'

export default function PostCard({ post, author }) {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-slate-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className="inline-block bg-gradient-to-r from-blue-100 to-emerald-100 text-slate-700 text-xs px-3 py-1 rounded-full font-medium">
            Article
          </span>
          <div className="w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <h2 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-slate-900 transition-colors duration-200 line-clamp-2">
          {post.title}
        </h2>
        
        <p className="text-slate-600 mb-4 text-sm leading-relaxed line-clamp-3">
          {post.body.slice(0, 120)}...
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {author.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-medium text-slate-700">{author}</span>
          </div>
          
          <Link 
            href={`/posts/${post.id}`} 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm group-hover:translate-x-1 transition-all duration-200"
          >
            Read More
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}