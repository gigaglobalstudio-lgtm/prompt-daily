import { useState } from 'react'

// 뉴스 데이터 (한글)
const NEWS = [
  {
    "id": 1,
    "title": "The AI Doc is an overwrought hype piece for doomers and accelerationists alike",
    "summary": "",
    "category": "AI 일반",
    "date": "09 3월 2026",
    "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
    "content": "The AI Doc is an overwrought hype piece for doomers and accelerationists alike\n\n\n\n이 기사는 Prompt Daily가 자동으로 수집한 AI 관련 최신 뉴스입니다."
  },
  {
    "id": 2,
    "title": "Will the Pentagon’s Anthropic controversy scare startups away from defense work?",
    "summary": "On the latest episode of TechCrunch’s Equity podcast, we discussed what the controversy means for other startups seeking to work with the federal gove...",
    "category": "LLM",
    "date": "09 3월 2026",
    "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600",
    "content": "Will the Pentagon’s Anthropic controversy scare startups away from defense work?\n\nOn the latest episode of TechCrunch’s Equity podcast, we discussed what the controversy means for other startups seeking to work with the federal government.\n\n이 기사는 Prompt Daily가 자동으로 수집한 AI 관련 최신 뉴스입니다."
  },
  {
    "id": 3,
    "title": "Owner of ICE detention facility sees big opportunity in AI man camps",
    "summary": "AI data center developers are increasingly relying on a style of camp popularized as housing for men working in remote oil fields.",
    "category": "AI 일반",
    "date": "09 3월 2026",
    "image": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600",
    "content": "Owner of ICE detention facility sees big opportunity in AI man camps\n\nAI data center developers are increasingly relying on a style of camp popularized as housing for men working in remote oil fields.\n\n이 기사는 Prompt Daily가 자동으로 수집한 AI 관련 최신 뉴스입니다."
  },
  {
    "id": 4,
    "title": "A roadmap for AI, if anyone will listen",
    "summary": "The Pro-Human Declaration was finalized before last week's Pentagon-Anthropic standoff, but the collision of the two events wasn’t lost on anyone invo...",
    "category": "AI 일반",
    "date": "08 3월 2026",
    "image": "https://images.unsplash.com/photo-1686191128892-3b37add4683e?w=600",
    "content": "A roadmap for AI, if anyone will listen\n\nThe Pro-Human Declaration was finalized before last week's Pentagon-Anthropic standoff, but the collision of the two events wasn’t lost on anyone involved.\n\n이 기사는 Prompt Daily가 자동으로 수집한 AI 관련 최신 뉴스입니다."
  },
  {
    "id": 5,
    "title": "Google just gave Sundar Pichai a $692M pay package",
    "summary": "Most of it is tied to performance, including new stock incentives linked to Waymo and Wing, its drone delivery venture.",
    "category": "LLM",
    "date": "08 3월 2026",
    "image": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600",
    "content": "Google just gave Sundar Pichai a $692M pay package\n\nMost of it is tied to performance, including new stock incentives linked to Waymo and Wing, its drone delivery venture.\n\n이 기사는 Prompt Daily가 자동으로 수집한 AI 관련 최신 뉴스입니다."
  }
]

function App() {
  const [selectedNews, setSelectedNews] = useState(null)
  const [showSubscribe, setShowSubscribe] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  // 구독 처리
  function handleSubscribe(e) {
    e.preventDefault()
    if (email) {
      const list = JSON.parse(localStorage.getItem('subscribers') || '[]')
      if (!list.includes(email)) {
        list.push(email)
        localStorage.setItem('subscribers', JSON.stringify(list))
        setMessage('구독 완료!')
      } else {
        setMessage('이미 구독 중입니다.')
      }
      setTimeout(() => {
        setShowSubscribe(false)
        setMessage('')
        setEmail('')
      }, 1500)
    }
  }

  // 기사 상세 페이지
  if (selectedNews) {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <button onClick={() => setSelectedNews(null)} className="text-[#10436b] font-bold text-xl">
              Prompt Daily
            </button>
            <button onClick={() => setSelectedNews(null)} className="text-[#10436b] hover:underline text-sm">
              ← 목록으로
            </button>
          </div>
        </header>

        <article className="max-w-3xl mx-auto px-4 py-8">
          <span className="text-sm text-[#10436b] font-medium">{selectedNews.category}</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4 leading-tight">
            {selectedNews.title}
          </h1>
          <p className="text-gray-500 text-sm mb-6">{selectedNews.date}</p>
          <img src={selectedNews.image} alt="" className="w-full rounded-lg mb-8" />
          <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
            {selectedNews.content}
          </div>
        </article>

        <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-400">
          © 2026 Prompt Daily
        </footer>
      </div>
    )
  }

  // 메인 페이지
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-[#10436b] font-bold text-2xl">Prompt Daily</h1>
            <nav className="hidden md:flex gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-[#10436b]">전체기사</a>
              <a href="#" className="text-gray-600 hover:text-[#10436b]">소개</a>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <button className="text-gray-600 hover:text-[#10436b]">로그인</button>
            <button
              onClick={() => setShowSubscribe(true)}
              className="bg-[#10436b] text-white px-4 py-2 rounded hover:bg-[#0d3555]"
            >
              구독하기
            </button>
          </div>
        </div>
      </header>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Featured</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NEWS.map((news) => (
            <article
              key={news.id}
              onClick={() => setSelectedNews(news)}
              className="cursor-pointer group"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4 bg-gray-100">
                <img
                  src={news.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xs font-medium text-[#10436b]">{news.category}</span>
              <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2 group-hover:text-[#10436b] transition-colors leading-snug">
                {news.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2">{news.summary}</p>
              <span className="text-xs text-gray-400 mt-3 block">{news.date}</span>
            </article>
          ))}
        </div>
      </section>

      {/* 푸터 */}
      <footer className="border-t border-gray-200 mt-8">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h3 className="text-[#10436b] font-bold text-lg">Prompt Daily</h3>
              <p className="text-gray-500 text-sm mt-1">매일 가장 중요한 AI 뉴스를 전합니다.</p>
            </div>
            <div className="text-sm text-gray-500">
              <p>서울특별시 강남구</p>
              <p>contact@promptdaily.kr</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-400">
            © 2026 Prompt Daily. All rights reserved.
          </div>
        </div>
      </footer>

      {/* 구독 모달 */}
      {showSubscribe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowSubscribe(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-900 mb-2">뉴스레터 구독</h3>
            <p className="text-gray-500 text-sm mb-4">매일 아침 AI 뉴스를 이메일로 받아보세요.</p>
            {message ? (
              <p className="text-center py-4 text-[#10436b] font-medium">{message}</p>
            ) : (
              <form onSubmit={handleSubscribe}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded mb-3 focus:outline-none focus:border-[#10436b]"
                />
                <button type="submit" className="w-full py-3 bg-[#10436b] text-white font-medium rounded hover:bg-[#0d3555]">
                  구독하기
                </button>
              </form>
            )}
            <button onClick={() => setShowSubscribe(false)} className="w-full mt-3 py-2 text-gray-500 text-sm">
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
