import { useState } from 'react'

// 뉴스 데이터 (한글) - 2026-03-11 자동 업데이트
const NEWS = [
  {
    "id": 1,
    "title": "OpenAI·구글 직원 30명, Anthropic 편에서 펜타곤 소송 지원... AI 업계 연대",
    "summary": "OpenAI와 구글 딥마인드 직원 30명 이상이 Anthropic을 지지하는 법정 의견서를 제출했다. 구글 수석 과학자 제프 딘도 서명에 참여했으며, 펜타곤의 Anthropic 블랙리스트가 미국 AI 산업 전체를 위협한다고 경고했다.",
    "category": "기업 AI",
    "date": "11 3월 2026",
    "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
    "content": "OpenAI와 구글 딥마인드 직원 30명 이상이 Anthropic을 지지하는 법정 의견서(amicus brief)를 제출하며 AI 업계의 이례적인 연대가 이뤄졌다.\n\n구글 수석 과학자 제프 딘(Jeff Dean)을 포함한 주요 AI 연구자들이 서명에 참여했으며, 펜타곤의 Anthropic 블랙리스트 조치가 미국 AI 산업 전체의 경쟁력을 위협한다고 경고했다.\n\nAnthropic은 지난달 국방부가 자사를 ‘국가 안보 공급망 리스크’로 지정한 것에 대해 소송을 제기했다. 이는 Anthropic이 대량 감시와 자율 무기에 AI 사용을 거부한 데 따른 조치였다.\n\n이번 연대는 평소 치열하게 경쟁하는 AI 기업들이 윤리적 AI 개발이라는 공동의 가치 아래 뭉쳤다는 점에서 큰 의미가 있다. 업계 전문가들은 이 사건이 AI 기업과 정부 간 관계의 새로운 전환점이 될 것으로 전망한다."
  },
  {
    "id": 2,
    "title": "구글, Gemini Workspace 대규모 업데이트... Docs·Sheets·Slides AI 기능 강화",
    "summary": "구글이 Workspace에 Gemini AI 신기능을 추가한다. 문서, 스프레드시트, 슬라이드, 드라이브에서 AI 활용이 더욱 편리해지며, Google AI Ultra/Pro 구독자에게 베타로 우선 제공된다.",
    "category": "LLM",
    "date": "11 3월 2026",
    "image": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600",
    "content": "구글이 Google Workspace에 Gemini AI의 새로운 기능들을 대규모로 추가한다고 발표했다.\n\n이번 업데이트로 Google Docs, Sheets, Slides, Drive에서 AI 활용이 크게 개선된다. 문서에서는 자동 요약과 초안 작성이 강화되고, 스프레드시트에서는 복잡한 데이터 분석을 자연어로 요청할 수 있다.\n\n슬라이드에서는 텍스트 입력만으로 전체 프레젠테이션을 자동 생성하는 기능이 추가됐다. 드라이브에서는 여러 파일을 한번에 분석하고 인사이트를 추출하는 것이 가능해졌다.\n\n새 기능들은 오늘부터 베타로 롤아웃되며, Google AI Ultra와 Pro 구독자에게 먼저 제공된다. 일반 Workspace 사용자들에게는 향후 몇 주 내 순차적으로 적용될 예정이다.\n\n이번 업데이트는 Microsoft의 Copilot과의 기업 생산성 AI 경쟁에서 구글이 공세를 강화하는 신호로 해석된다."
  },
  {
    "id": 3,
    "title": "AWS, 헬스케어 전용 AI 에이전트 5종 출시... HIPAA 준수 의료 자동화",
    "summary": "AWS가 Amazon Connect Health를 출시했다. 환자 확인, 예약 관리, 환자 인사이트, 진료 기록, 의료 코딩 등 5개 AI 에이전트가 HIPAA 준수 의료 자동화를 지원한다.",
    "category": "기업 AI",
    "date": "11 3월 2026",
    "image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600",
    "content": "AWS가 헬스케어 산업을 위한 전용 AI 솔루션 ‘Amazon Connect Health’를 출시했다.\n\n이 솔루션은 5개의 목적별 AI 에이전트로 구성된다: 환자 신원 확인(Patient Verification), 예약 관리(Appointment Management), 환자 인사이트(Patient Insights), 환경 문서화(Ambient Documentation), 의료 코딩(Medical Coding).\n\n모든 에이전트는 HIPAA(미국 의료정보보호법) 준수 환경에서 운영되어 민감한 의료 데이터를 안전하게 처리한다. 병원과 클리닉은 기존 Amazon Connect 콜센터 시스템에 이 에이전트들을 즉시 통합할 수 있다.\n\n특히 Ambient Documentation 에이전트는 의사와 환자 간 대화를 실시간으로 분석해 진료 기록을 자동 작성한다. 이는 의료진의 행정 업무 부담을 크게 줄여줄 것으로 기대된다.\n\nAWS는 이번 출시로 의료 AI 시장에서 Microsoft Azure 및 Google Cloud와의 경쟁에서 우위를 점하려 하고 있다."
  },
  {
    "id": 4,
    "title": "오라클 실적 발표, AI·클라우드 성장으로 예상치 상회... 주가 급등",
    "summary": "오라클이 2026 회계연도 3분기 실적을 발표했다. EPS 1.79달러(예상 1.70달러), 매출 172억 달러(예상 169억 달러)를 기록하며 AI와 IaaS 성장에 힘입어 예상치를 상회했다.",
    "category": "기업 AI",
    "date": "11 3월 2026",
    "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600",
    "content": "오라클(Oracle)이 2026 회계연도 3분기(2026년 3월 11일 발표) 실적에서 시장 예상치를 상회하며 주가가 급등했다.\n\n주당순이익(EPS)은 1.79달러로 예상치 1.70달러를 웃돌았고, 매출은 172억 달러로 예상치 169.2억 달러를 초과했다. 특히 클라우드 인프라(IaaS) 부문이 45% 성장하며 실적을 견인했다.\n\n래리 엘리슨 회장은 실적 발표에서 \"AI 워크로드를 위한 GPU 클라우드 수요가 폭발적으로 증가하고 있다\"며 \"오라클 클라우드 인프라(OCI)가 엔터프라이즈 AI의 핵심 플랫폼으로 자리잡고 있다\"고 밝혔다.\n\n오라클은 Microsoft, Google, NVIDIA와의 파트너십을 통해 AI 인프라 사업을 빠르게 확장하고 있다. 특히 의료, 금융 등 규제 산업에서 강점을 보이고 있다.\n\n애널리스트들은 오라클의 AI 전환이 예상보다 빠르게 진행되고 있다며 목표주가를 상향 조정하고 있다."
  },
  {
    "id": 5,
    "title": "구글, 펜타곤 AI 협력 강화... GenAI.mil 포털에 맞춤형 AI 에이전트 기능 추가",
    "summary": "구글이 미 국방부와의 AI 협력을 확대한다. 펜타곤 AI 포털 GenAI.mil에 민간·군인이 직접 AI 에이전트를 구축할 수 있는 기능을 도입했다.",
    "category": "기업 AI",
    "date": "11 3월 2026",
    "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600",
    "content": "구글이 미국 국방부와의 AI 협력 관계를 대폭 강화하고 있다.\n\n구글은 펜타곤의 엔터프라이즈 AI 포털 ‘GenAI.mil’에 새로운 기능을 도입했다. 이제 민간 직원과 군인들이 비분류(unclassified) 업무용 맞춤형 AI 에이전트를 직접 구축할 수 있다.\n\n이는 Anthropic이 국방부로부터 블랙리스트 처분을 받은 이후 펜타곤 AI 시장의 판도가 재편되는 과정에서 나온 조치다. 최근까지 Anthropic이 펜타곤 기밀 클라우드에서 유일한 AI 제공업체였으나, OpenAI와 xAI도 기밀 네트워크 접근권을 확보했다.\n\n구글의 Gemini 모델은 국방 관료들의 문서 분석, 브리핑 자료 작성, 데이터 처리 등에 활용될 예정이다. 구글 클라우드의 보안 인프라가 군사용 요구사항을 충족하면서 신뢰를 얻고 있다.\n\n이번 움직임은 AI 윤리 논쟁 속에서도 빅테크 기업들의 국방 AI 시장 진출이 가속화되고 있음을 보여준다."
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
