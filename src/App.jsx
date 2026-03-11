import { useState } from 'react'

// 뉴스 데이터 (한글) - 2026-03-11 자동 업데이트
const NEWS = [
  {
    "id": 1,
    "title": "OpenAI, GPT-5.4 Thinking 출시... 100만 토큰 컨텍스트 윈도우 지원",
    "summary": "OpenAI가 GPT-5.4 Thinking을 발표했다. 100만 토큰 컨텍스트 윈도우와 33% 향상된 정확도를 제공하며, API 비용은 100만 입력 토큰당 $2.50부터 시작한다.",
    "category": "LLM",
    "date": "11 3월 2026",
    "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
    "content": "OpenAI가 GPT-5.4 Thinking을 공식 출시하며 AI 업계에 새로운 기준을 제시했다. 이번 모델은 기존 GPT-5.2 Thinking을 대체하며, ChatGPT Plus, Team, Pro 사용자들에게 제공된다.\n\n가장 주목할 만한 개선점은 100만 토큰 컨텍스트 윈도우다. 이는 약 75만 단어 분량의 텍스트를 한 번에 처리할 수 있다는 의미로, 대규모 문서 분석이나 복잡한 코드베이스 이해에 획기적인 변화를 가져올 전망이다.\n\n정확도 면에서도 눈에 띄는 발전이 있었다. GPT-5.4는 GPT-5.2 대비 33% 적은 사실 오류를 보이며, 환각(hallucination) 문제 해결에 상당한 진전을 이뤘다.\n\nAPI 가격 정책도 경쟁력 있게 책정됐다. 100만 입력 토큰당 $2.50부터 시작하는 가격은 기업 고객들의 대규모 도입을 촉진할 것으로 예상된다.\n\n업계 전문가들은 이번 발표가 Anthropic의 Claude, Google의 Gemini와의 경쟁에서 OpenAI의 기술적 우위를 재확인시켜주는 계기가 될 것으로 분석하고 있다."
  },
  {
    "id": 2,
    "title": "Apple, Gemini 1.2조 파라미터 탑재한 AI Siri 발표... iOS 26.4와 함께 출시 예정",
    "summary": "Apple이 완전히 새로워진 AI 기반 Siri를 발표했다. Google의 1.2조 파라미터 Gemini 모델을 탑재하며, 문맥 인식과 화면 인지 기능을 제공한다.",
    "category": "AI 일반",
    "date": "11 3월 2026",
    "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600",
    "content": "Apple이 완전히 재설계된 AI 기반 Siri를 공개하며 음성 비서 시장의 판도를 바꿀 준비를 마쳤다. 이번 Siri는 Google의 1.2조 파라미터 Gemini 모델을 탑재해 전례 없는 지능형 상호작용을 제공한다.\n\n새로운 Siri의 핵심 기능은 문맥 인식(context-awareness)과 화면 인지(on-screen awareness)다. 사용자가 현재 보고 있는 화면의 내용을 이해하고, 이전 대화의 맥락을 유지하며 자연스러운 대화를 이어갈 수 있다.\n\nApple은 이번 발표에서 프라이버시 보호에도 특별히 신경 썼다고 강조했다. 온디바이스 처리와 Apple의 Private Cloud Compute를 결합해 사용자 데이터를 안전하게 보호한다.\n\n출시 일정은 2026년 3월로, iOS 26.4 업데이트와 함께 제공될 예정이다. iPhone 15 Pro 이상 모델에서 모든 기능을 사용할 수 있으며, 이전 모델에서는 일부 기능이 제한된다.\n\n이번 발표로 Apple은 AI 음성 비서 분야에서 Amazon Alexa, Google Assistant와의 경쟁에서 기술적 열위를 극복하고 선두 그룹에 합류할 것으로 기대된다."
  },
  {
    "id": 3,
    "title": "Lightricks, 오픈소스 비디오 AI ‘LTX 2.3’ 공개... 4K 50FPS 네이티브 지원",
    "summary": "Lightricks가 220억 파라미터의 오픈소스 비디오 생성 모델 LTX 2.3을 발표했다. 네이티브 4K 해상도와 50FPS를 지원하며, 오디오 동기화 기능도 탑재됐다.",
    "category": "생성형 AI",
    "date": "11 3월 2026",
    "image": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600",
    "content": "Lightricks가 오픈소스 비디오 생성 모델 LTX 2.3을 공개하며 AI 영상 제작 시장에 큰 파장을 일으키고 있다. 220억(22B) 파라미터 규모의 이 모델은 네이티브 4K 해상도와 50FPS를 지원한다.\n\n가장 혁신적인 기능은 동기화된 오디오 생성이다. 영상과 함께 자동으로 음향 효과와 배경음을 생성해 별도의 사운드 편집 작업을 대폭 줄여준다. 또한 세로 모드(portrait mode) 지원으로 모바일 콘텐츠 제작에도 최적화됐다.\n\n오픈소스로 공개된 만큼 기업과 개발자들은 자유롭게 이 모델을 활용하고 커스터마이징할 수 있다. 상업적 사용도 허용되어 스타트업과 크리에이터들의 관심이 집중되고 있다.\n\n한편, Helios라는 140억 파라미터 규모의 자동회귀 확산 모델도 함께 주목받고 있다. 단일 NVIDIA H100 GPU에서 19.5 FPS의 실시간 비디오 생성이 가능해 엣지 디바이스 배포 가능성을 열었다.\n\n전문가들은 이러한 오픈소스 모델들의 등장이 Sora, Runway 등 폐쇄형 서비스들의 시장 지배력에 도전장을 던질 것으로 전망하고 있다."
  },
  {
    "id": 4,
    "title": "2026년 3월 첫째 주, AI 모델 12개 이상 동시 발표... ‘모델 쏟아지는 시대’",
    "summary": "2026년 3월 첫째 주에만 12개 이상의 주요 AI 모델이 발표됐다. LLM부터 비디오 생성, 3D 인코더, 최적화 에이전트까지 전 분야에서 혁신이 이어지고 있다.",
    "category": "AI 일반",
    "date": "11 3월 2026",
    "image": "https://images.unsplash.com/photo-1686191128892-3b37add4683e?w=600",
    "content": "2026년 3월 첫째 주가 AI 역사상 가장 바쁜 한 주로 기록될 전망이다. 단 7일 만에 12개 이상의 주요 AI 모델과 도구가 발표되며 업계를 놀라게 했다.\n\n발표된 AI 기술들은 대형 언어 모델(LLM), 비디오 생성 엔진, 이미지 편집기, 3D 인코더, 최적화 에이전트 등 전 분야를 아우른다. 이는 AI 기술 발전 속도가 기하급수적으로 빨라지고 있음을 보여준다.\n\n업계 관계자들은 이러한 ‘모델 쏟아지는 시대(Model Avalanche)’가 기업들의 AI 도입 전략에 큰 변화를 가져올 것으로 예상한다. 특정 벤더에 종속되기보다 다양한 모델을 조합해 최적의 솔루션을 구축하는 ‘멀티모델 전략’이 부상할 것이라는 분석이다.\n\n또한 모델 평가와 선택을 위한 LLMOps 플랫폼의 중요성도 커지고 있다. Gartner는 2028년까지 60% 기업이 LLMOps 플랫폼을 도입할 것으로 전망했다.\n\n한편, 이러한 급격한 발전 속도가 AI 안전성과 규제에 대한 우려도 함께 높이고 있어, 기술 발전과 책임 있는 AI 사이의 균형이 중요한 화두로 떠오르고 있다."
  },
  {
    "id": 5,
    "title": "OpenAI, ‘ChatGPT for Excel’ 베타 출시... 엑셀에서 직접 AI 분석 가능",
    "summary": "OpenAI가 Excel용 ChatGPT 애드인 베타를 발표했다. 엑셀 내에서 직접 모델을 구축하고 데이터를 분석할 수 있으며, 미국, 캐나다, 호주의 비즈니스 플랜 사용자부터 순차 제공된다.",
    "category": "생산성",
    "date": "11 3월 2026",
    "image": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600",
    "content": "OpenAI가 Microsoft Excel용 ChatGPT 애드인 베타를 발표하며 사무 자동화의 새 장을 열었다. 이 애드인을 통해 사용자들은 엑셀 스프레드시트 내에서 직접 AI 기반 모델을 구축하고 데이터를 분석할 수 있다.\n\n핵심 기능으로는 자연어 기반 데이터 분석, 복잡한 수식 자동 생성, 예측 모델 구축, 차트 및 시각화 자동 생성 등이 포함된다. 사용자가 \"지난 3개월 매출 트렌드를 분석해줘\"라고 입력하면 자동으로 관련 분석을 수행한다.\n\n롤아웃은 미국, 캐나다, 호주의 비즈니스 플랜 사용자를 대상으로 시작되며, 향후 더 많은 지역과 플랜으로 확대될 예정이다. Microsoft 365 비즈니스 스탠다드 이상 구독자가 이용할 수 있다.\n\n이번 발표는 OpenAI와 Microsoft의 파트너십이 더욱 깊어지고 있음을 보여준다. 기존 Microsoft Copilot과의 시너지 효과로 기업용 AI 생산성 도구 시장에서 압도적 우위를 점할 것으로 예상된다.\n\n경쟁사인 Google도 Sheets와 Gemini의 통합을 강화하고 있어, 스프레드시트 AI 시장의 경쟁이 더욱 치열해질 전망이다."
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
