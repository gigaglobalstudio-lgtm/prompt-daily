import { useState, useEffect } from 'react'

// 정적 뉴스 데이터 (GitHub Actions가 매일 자동 업데이트)
const NEWS_DATA = [
  {
    "id": 1,
    "title": "Will the Pentagon’s Anthropic controversy scare startups away from defense work?",
    "summary": "On the latest episode of TechCrunch’s Equity podcast, we discussed what the controversy means for other startups seeking to work with the federal gove",
    "category": "기업 AI",
    "date": "2026-03-08"
  },
  {
    "id": 2,
    "title": "Owner of ICE detention facility sees big opportunity in AI man camps",
    "summary": "AI data center developers are increasingly relying on a style of camp popularized as housing for men working in remote oil fields.",
    "category": "기업 AI",
    "date": "2026-03-08"
  },
  {
    "id": 3,
    "title": "A roadmap for AI, if anyone will listen",
    "summary": "The Pro-Human Declaration was finalized before last week's Pentagon-Anthropic standoff, but the collision of the two events wasn’t lost on anyone invo",
    "category": "기업 AI",
    "date": "2026-03-08"
  }
]

function App() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribers, setSubscribers] = useState([])

  useEffect(() => {
    // localStorage에서 구독 상태 확인
    const savedEmail = localStorage.getItem('subscribedEmail')
    if (savedEmail) {
      setSubscribed(true)
      setEmail(savedEmail)
    }
    // 구독자 목록 로드
    const savedList = JSON.parse(localStorage.getItem('subscribers') || '[]')
    setSubscribers(savedList)
  }, [])

  function handleSubscribe(e) {
    e.preventDefault()
    if (!email) return

    // 중복 체크
    if (subscribers.includes(email)) {
      setMessage('이미 구독 중인 이메일입니다.')
      return
    }

    // 저장
    const newList = [...subscribers, email]
    localStorage.setItem('subscribers', JSON.stringify(newList))
    localStorage.setItem('subscribedEmail', email)
    setSubscribers(newList)
    setSubscribed(true)
    setMessage('구독 완료! 매일 AI 뉴스를 받아보세요.')
  }

  function handleUnsubscribe() {
    const newList = subscribers.filter(e => e !== email)
    localStorage.setItem('subscribers', JSON.stringify(newList))
    localStorage.removeItem('subscribedEmail')
    setSubscribers(newList)
    setSubscribed(false)
    setEmail('')
    setMessage('구독이 취소되었습니다.')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="border-b">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-black text-center">
            <span className="text-violet-600">Prompt</span> Daily
          </h1>
          <p className="text-center text-gray-500 mt-1">매일 5개의 AI 뉴스</p>
        </div>
      </header>

      {/* 뉴스 목록 */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {NEWS_DATA.map((news, i) => (
            <article key={news.id} className="border-b pb-8 last:border-0">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-lg">
                  {i + 1}
                </div>
                <div>
                  <span className="text-xs font-medium text-violet-600 uppercase">
                    {news.category}
                  </span>
                  <h2 className="text-xl font-bold text-gray-900 mt-1 leading-tight">
                    {news.title}
                  </h2>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    {news.summary}
                  </p>
                  <span className="text-sm text-gray-400 mt-2 block">
                    {news.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 구독 섹션 */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-center mb-2">
            뉴스레터 구독
          </h3>
          <p className="text-center text-gray-500 mb-6">
            매일 아침 7시, AI 뉴스 5개를 이메일로 받아보세요.
          </p>

          {subscribed ? (
            <div className="text-center">
              <p className="text-green-600 font-medium mb-4">
                {email}로 구독 중입니다.
              </p>
              <button
                onClick={handleUnsubscribe}
                className="text-sm text-gray-500 underline"
              >
                구독 취소
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소"
                required
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700"
              >
                구독
              </button>
            </form>
          )}

          {message && (
            <p className="text-center text-sm text-violet-600 mt-4">{message}</p>
          )}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t py-8 text-center text-sm text-gray-400">
        <p>&copy; 2026 Prompt Daily</p>
      </footer>
    </div>
  )
}

export default App
