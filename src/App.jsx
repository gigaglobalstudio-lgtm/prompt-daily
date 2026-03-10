import { useState } from 'react'

// 뉴스 데이터 (한글) - 2026년 3월 10일 업데이트
const NEWS = [
  {
    "id": 1,
    "title": "Anthropic, 펜타곤 블랙리스트 소송 제기... \"AI 윤리 원칙 지킨다\"",
    "summary": "Anthropic이 미 국방부의 공급망 리스크 지정에 맞서 소송을 제기했다. AI 기술의 군사적 활용에 대한 윤리적 논쟁이 가열되고 있다.",
    "category": "AI 정책",
    "date": "10 3월 2026",
    "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
    "content": "Anthropic이 미 국방부(펜타곤)가 자사를 국가안보 블랙리스트에 올리려는 시도를 저지하기 위해 소송을 제기했다.\n\n이번 분쟁은 Anthropic이 국방부에 자사 AI 기술을 미국인 대상 대규모 감시나 자율 무기 시스템에 사용하는 것을 거부하면서 시작됐다. 펜타곤은 이에 대응해 Anthropic을 '공급망 리스크' 기업으로 지정하려 했다.\n\nAnthropic 측은 \"우리는 AI 안전과 윤리적 사용에 대한 원칙을 타협할 수 없다\"며 \"이번 소송은 AI 기업이 기술의 사용처에 대해 발언권을 가져야 한다는 중요한 선례가 될 것\"이라고 밝혔다.\n\n업계에서는 이번 사태가 AI 기술의 군사적 활용 범위와 기업의 윤리적 책임 사이의 긴장을 보여주는 사례로 주목하고 있다. 특히 경쟁사인 OpenAI가 비슷한 시기에 국방부와 계약을 체결한 것과 대조를 이룬다.\n\n한편 마이크로소프트와 구글은 국방 프로젝트 외에서는 Anthropic과의 협력을 계속하겠다고 발표해, AI 업계 내 연대가 형성되는 모습을 보이고 있다."
  },
  {
    "id": 2,
    "title": "OpenAI·구글 직원 30명, Anthropic 지지 서한 발표",
    "summary": "경쟁사 직원들이 Anthropic의 입장을 지지하는 서한에 서명했다. 구글 DeepMind 수석 과학자 제프 딘도 서명자에 포함됐다.",
    "category": "AI 정책",
    "date": "10 3월 2026",
    "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600",
    "content": "OpenAI와 구글 DeepMind 소속 직원 30명 이상이 Anthropic의 국방부 소송을 지지하는 서한에 서명했다.\n\n서명자 중에는 구글 DeepMind의 수석 과학자 제프 딘(Jeff Dean)도 포함되어 있어 업계의 주목을 받고 있다. 이들은 서한에서 \"AI 기업이 자사 기술의 사용 방식에 대해 윤리적 기준을 설정할 권리가 있다\"고 밝혔다.\n\n이번 연대는 평소 치열하게 경쟁하는 AI 기업들 사이에서 이례적인 모습이다. 한 서명자는 \"이건 비즈니스가 아니라 원칙의 문제\"라며 \"오늘은 Anthropic이지만, 내일은 우리 회사가 될 수 있다\"고 말했다.\n\n업계 전문가들은 이번 사태가 AI 기술의 군사적 활용에 대한 업계 전반의 우려를 보여준다고 분석한다. 특히 자율 무기 시스템과 대규모 감시에 AI를 활용하는 것에 대한 경계심이 높아지고 있다.\n\n한편 OpenAI CEO 샘 알트만은 최근 자사의 국방부 계약 발표가 \"기회주의적이고 성급해 보였다\"며 내부적으로 \"서두르지 말았어야 했다\"고 인정한 것으로 알려졌다."
  },
  {
    "id": 3,
    "title": "OpenAI, GPT-5.4 출시... \"허위 정보 33% 감소\"",
    "summary": "OpenAI가 3월 5일 GPT-5.4를 공식 출시했다. 이전 버전 대비 사실 관계 오류가 33% 줄어든 것이 특징이다.",
    "category": "LLM",
    "date": "10 3월 2026",
    "image": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600",
    "content": "OpenAI가 차세대 대규모 언어 모델 GPT-5.4를 3월 5일 공식 출시했다.\n\n이번 버전의 가장 큰 특징은 '사실성(factuality)' 개선이다. OpenAI에 따르면 GPT-5.4는 개별 주장이 거짓일 확률이 GPT-5.2 대비 33% 낮아졌다. 이는 환각(hallucination) 문제를 해결하기 위한 노력의 결과물이다.\n\nOpenAI 관계자는 \"GPT-5.4는 우리가 출시한 모델 중 가장 사실에 충실한 모델\"이라며 \"기업용 애플리케이션에서 신뢰할 수 있는 AI 어시스턴트로 활용될 수 있을 것\"이라고 밝혔다.\n\n업계에서는 주요 AI 연구소들이 이제 2~3주 단위로 업데이트를 출시하면서 성능을 높이고 비용을 낮추는 추세에 주목하고 있다. LLM Stats에 따르면 2월에만 12개의 주요 모델 업데이트가 있었다.\n\n다만 일부 전문가들은 사실성 개선이 벤치마크에서의 수치일 뿐, 실제 사용 환경에서의 검증이 필요하다고 지적했다. 기업들의 실제 도입 사례에서 어떤 성과를 보일지 주목된다."
  },
  {
    "id": 4,
    "title": "Claude Sonnet 4.6 출시, 100만 토큰 컨텍스트 시대 개막",
    "summary": "Anthropic이 Claude Sonnet 4.6을 출시했다. 100만 토큰 컨텍스트 윈도우와 향상된 에이전트 기능이 특징이다.",
    "category": "LLM",
    "date": "10 3월 2026",
    "image": "https://images.unsplash.com/photo-1686191128892-3b37add4683e?w=600",
    "content": "Anthropic이 Claude Sonnet 4.6을 공식 출시하며 100만 토큰 컨텍스트 윈도우 시대를 열었다.\n\n새 모델은 컴퓨터 사용(computer use), 장문 컨텍스트 추론, 에이전트 계획 수립 능력이 크게 향상됐다. 특히 GDPval-AA Elo(전문가 수준 사무 작업 벤치마크)에서 1,633점을 기록해 Opus 4.6과 Gemini 3.1 Pro를 앞섰다.\n\nAnthropic 측은 \"Sonnet 4.6은 복잡한 워크플로우를 자율적으로 처리할 수 있는 진정한 AI 에이전트로의 첫 걸음\"이라고 밝혔다. 100만 토큰 컨텍스트는 베타 버전으로 제공되며, 수백 페이지의 문서를 한 번에 분석할 수 있다.\n\n업계 분석가들은 이번 출시가 기업용 AI 시장에 큰 영향을 미칠 것으로 전망한다. 특히 법률 문서 검토, 코드베이스 분석, 장기 프로젝트 관리 등 장문 컨텍스트가 필요한 분야에서 강점을 보일 것으로 예상된다.\n\n한편 Claude용 파워포인트 애드인도 함께 출시되어, 기업 생산성 도구와의 통합이 한층 강화됐다. MS Office와 구글 워크스페이스 양쪽에서 Claude를 활용할 수 있게 됐다."
  },
  {
    "id": 5,
    "title": "구글 Gemini 3.1 Pro 공개, ARC-AGI-2 벤치마크 77.1% 달성",
    "summary": "구글이 Gemini 3.1 Pro를 출시했다. ARC-AGI-2에서 77.1%, GPQA Diamond에서 94.3%를 기록해 '핵심 지능' 향상을 입증했다.",
    "category": "LLM",
    "date": "10 3월 2026",
    "image": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600",
    "content": "구글이 Gemini 3.1 Pro를 공식 출시하며 '핵심 지능(core intelligence)' 향상을 강조했다.\n\n새 모델은 복잡한 문제 해결 능력이 크게 개선됐다. ARC-AGI-2(일반 인공지능 벤치마크)에서 77.1%를 기록했으며, GPQA Diamond(전문가 수준 과학 지식 테스트)에서는 94.3%를 달성했다.\n\n구글은 \"Gemini 3.1 Pro는 소비자, 개발자, 기업 제품 전반에서 활용될 수 있도록 설계됐다\"며 \"특히 복잡한 추론과 문제 해결이 필요한 시나리오에서 뛰어난 성능을 보인다\"고 밝혔다.\n\n주목할 만한 소식으로, 애플이 1.2조 파라미터 규모의 Gemini 모델을 탑재한 새로운 Siri를 준비 중인 것으로 확인됐다. 프라이버시를 위해 Private Cloud Compute에서 운영될 예정이다.\n\n업계에서는 주요 AI 연구소들 간의 벤치마크 경쟁이 가열되면서, 실질적인 사용자 경험 개선으로 이어지고 있다고 평가한다. 2~3주마다 새 버전이 출시되는 빠른 개발 주기가 시장 표준으로 자리잡고 있다."
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
