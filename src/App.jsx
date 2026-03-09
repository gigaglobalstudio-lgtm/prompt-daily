import { useState, useEffect } from 'react'

// News Data - 자동 업데이트됨
import newsData from './data/news.json'

// Icons
const BoltIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"/>
  </svg>
)

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const TrendingIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

// 시간 포맷팅
const formatTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = Math.floor((now - date) / 1000 / 60)

  if (diff < 60) return `${diff}분 전`
  if (diff < 1440) return `${Math.floor(diff / 60)}시간 전`
  return `${Math.floor(diff / 1440)}일 전`
}

// Navigation
const Navigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const categories = ['전체', 'LLM', '이미지 AI', '비디오 AI', '로보틱스', '기업 AI', '스타트업']

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-amber-400">
              <TrendingIcon />
              LIVE
            </span>
            <span className="text-gray-300">GPT-5 출시 임박 | Anthropic 시리즈 C 펀딩 | Tesla Optimus 2.0 공개</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-gray-400">
            <span>{new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center text-white">
              <BoltIcon />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Prompt Daily</h1>
              <p className="text-xs text-gray-500 -mt-1">AI News That Matters</p>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <SearchIcon />
            </button>
            <button className="hidden md:block px-4 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors">
              뉴스레터 구독
            </button>
          </div>
        </div>

        {/* Categories */}
        <nav className="flex items-center gap-1 pb-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                i === 0
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-4 shadow-lg">
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="AI 뉴스 검색..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  )
}

// Breaking News Banner
const BreakingNews = ({ news }) => {
  if (!news || news.length === 0) return null
  const breaking = news.find(n => n.breaking) || news[0]

  return (
    <section className="bg-gradient-to-r from-red-600 to-rose-600 text-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold animate-pulse">
            BREAKING
          </span>
          <p className="font-medium truncate">{breaking.title}</p>
        </div>
      </div>
    </section>
  )
}

// Hero News (Top Story)
const HeroNews = ({ news }) => {
  if (!news || news.length === 0) return null
  const hero = news[0]

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Story */}
        <div className="lg:col-span-2">
          <article className="group cursor-pointer">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-200 mb-4">
              <img
                src={hero.image || `https://picsum.photos/seed/${hero.id}/800/450`}
                alt={hero.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-violet-600 text-white text-sm font-medium rounded-full">
                  {hero.category}
                </span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-violet-600 transition-colors leading-tight">
              {hero.title}
            </h2>
            <p className="text-gray-600 text-lg mb-4 line-clamp-2">{hero.summary}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="font-medium text-gray-900">{hero.author}</span>
              <span className="flex items-center gap-1">
                <ClockIcon />
                {formatTime(hero.date)}
              </span>
              <span>{hero.readTime} 읽기</span>
            </div>
          </article>
        </div>

        {/* Side Stories */}
        <div className="space-y-4">
          {news.slice(1, 4).map((item) => (
            <article key={item.id} className="group flex gap-4 cursor-pointer">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                <img
                  src={item.image || `https://picsum.photos/seed/${item.id}/200/200`}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium text-violet-600">{item.category}</span>
                <h3 className="font-semibold text-gray-900 group-hover:text-violet-600 transition-colors line-clamp-2 mt-1">
                  {item.title}
                </h3>
                <span className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <ClockIcon />
                  {formatTime(item.date)}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// Latest News Section
const LatestNews = ({ news }) => {
  if (!news || news.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-1 h-6 bg-violet-600 rounded-full"></span>
          최신 뉴스
        </h2>
        <button className="text-violet-600 font-medium hover:underline">전체보기</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.slice(0, 6).map((item) => (
          <article key={item.id} className="group cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200 mb-3">
              <img
                src={item.image || `https://picsum.photos/seed/${item.id}/400/225`}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-xs font-medium text-violet-600">{item.category}</span>
            <h3 className="font-bold text-gray-900 group-hover:text-violet-600 transition-colors mt-1 line-clamp-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.summary}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
              <span className="font-medium text-gray-700">{item.author}</span>
              <span className="flex items-center gap-1">
                <ClockIcon />
                {formatTime(item.date)}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

// Trending Topics
const TrendingTopics = () => {
  const topics = [
    { tag: 'GPT-5', count: 1240 },
    { tag: 'Claude 4', count: 890 },
    { tag: 'Sora', count: 756 },
    { tag: 'AI Agents', count: 623 },
    { tag: 'Gemini 2.0', count: 512 },
  ]

  return (
    <aside className="bg-gray-50 rounded-2xl p-6">
      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <TrendingIcon />
        트렌딩 토픽
      </h3>
      <div className="space-y-3">
        {topics.map((topic, i) => (
          <div key={topic.tag} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="font-medium text-gray-900">#{topic.tag}</span>
            </div>
            <span className="text-sm text-gray-500">{topic.count.toLocaleString()}개 기사</span>
          </div>
        ))}
      </div>
    </aside>
  )
}

// Newsletter CTA
const NewsletterCTA = () => {
  const [email, setEmail] = useState('')

  return (
    <section className="bg-gradient-to-br from-violet-600 to-fuchsia-600 py-16">
      <div className="max-w-3xl mx-auto px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">매일 아침, AI 뉴스 브리핑</h2>
        <p className="text-violet-100 mb-8">
          매일 오전 7시, 가장 중요한 AI 뉴스 5개를 이메일로 받아보세요.<br/>
          10,000명 이상의 AI 전문가들이 구독 중입니다.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소"
            className="flex-1 px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="px-6 py-3 bg-white text-violet-600 font-bold rounded-xl hover:bg-violet-50 transition-colors">
            무료 구독
          </button>
        </form>
        <p className="text-sm text-violet-200 mt-4">스팸 없음 / 언제든 구독 취소 가능</p>
      </div>
    </section>
  )
}

// Footer
const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-12">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center text-white">
              <BoltIcon />
            </div>
            <span className="text-xl font-bold text-white">Prompt Daily</span>
          </div>
          <p className="text-sm">AI 뉴스의 새로운 기준.<br/>매일 가장 중요한 AI 소식을 전합니다.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">카테고리</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">LLM</a></li>
            <li><a href="#" className="hover:text-white transition-colors">이미지 AI</a></li>
            <li><a href="#" className="hover:text-white transition-colors">비디오 AI</a></li>
            <li><a href="#" className="hover:text-white transition-colors">로보틱스</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">회사</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">소개</a></li>
            <li><a href="#" className="hover:text-white transition-colors">채용</a></li>
            <li><a href="#" className="hover:text-white transition-colors">광고 문의</a></li>
            <li><a href="#" className="hover:text-white transition-colors">제보하기</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">팔로우</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">X (Twitter)</a></li>
            <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
            <li><a href="#" className="hover:text-white transition-colors">RSS Feed</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p>&copy; 2026 Prompt Daily. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">이용약관</a>
          <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
        </div>
      </div>
    </div>
  </footer>
)

// Main App
function App() {
  const [news, setNews] = useState([])

  useEffect(() => {
    // 뉴스 데이터 로드
    setNews(newsData.articles || [])
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <BreakingNews news={news} />
      <main>
        <HeroNews news={news} />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <LatestNews news={news.slice(4)} />
            </div>
            <div className="space-y-6">
              <TrendingTopics />
            </div>
          </div>
        </div>
        <NewsletterCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
