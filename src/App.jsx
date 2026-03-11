import { useState, useEffect } from 'react'

// ============================================
// 설정 상수
// ============================================
const SITE_URL = 'https://gigaglobalstudio-lgtm.github.io/prompt-daily/'
const SITE_NAME = 'GIGA AI News'

// ============================================
// 쿠키 유틸리티
// ============================================
const Cookies = {
  set: (name, value, days = 7) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
  },
  get: (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift())
    return null
  },
  remove: (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  }
}

// ============================================
// 공유 버튼 컴포넌트
// ============================================
function ShareButtons({ title }) {
  const [copied, setCopied] = useState(false)

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(SITE_URL)}`, 'share', 'width=550,height=450')
  }
  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`, 'share', 'width=550,height=450')
  }
  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`, 'share', 'width=550,height=450')
  }
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(title + '\n' + SITE_URL)
    } catch {
      const input = document.createElement('input')
      input.value = SITE_URL
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <p className="text-sm text-gray-500 mb-4">이 기사 공유하기</p>
      <div className="flex flex-wrap gap-3">
        <button onClick={shareTwitter} className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">X</button>
        <button onClick={shareLinkedIn} className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm hover:bg-blue-800">LinkedIn</button>
        <button onClick={shareFacebook} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Facebook</button>
        <button onClick={copyLink} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300">
          {copied ? '복사됨!' : '링크 복사'}
        </button>
      </div>
    </div>
  )
}

// ============================================
// 소셜 로그인 아이콘
// ============================================
const KakaoIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.648 1.758 4.973 4.394 6.322-.143.52-.52 1.883-.596 2.175-.094.36.132.356.277.259.114-.077 1.816-1.234 2.554-1.734.454.067.923.101 1.371.101 5.523 0 10-3.463 10-7.691S17.523 3 12 3z"/>
  </svg>
)

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

// ============================================
// 뉴스 데이터
// ============================================
const NEWS = [
  {
    id: 1,
    title: "OpenAI·구글 직원 30명, Anthropic 편에서 펜타곤 소송 지원... AI 업계 이례적 연대",
    summary: "OpenAI와 구글 딥마인드 직원 30명 이상이 Anthropic을 지지하는 법정 의견서를 제출했다.",
    category: "기업 AI",
    date: "11 3월 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
    content: `OpenAI와 구글 딥마인드 직원 30명 이상이 Anthropic을 지지하는 법정 의견서(amicus brief)를 제출하며 AI 업계의 이례적인 연대가 이뤄졌다.

## 주요 서명자와 그 의미

구글 수석 과학자 제프 딘(Jeff Dean)을 포함한 AI 분야 최고 연구자들이 서명에 참여했다. 제프 딘은 구글 브레인의 공동 창립자이자 현재 구글 AI 연구를 총괄하는 인물이다.

## Anthropic 블랙리스트 사건의 전말

Anthropic은 지난달 28일 미 국방부로부터 '국가 안보 공급망 리스크'로 지정되는 충격적인 조치를 받았다. 이는 Anthropic이 2억 달러 규모의 펜타곤 계약을 거부하면서 시작됐다.

## 법정 의견서의 핵심 주장

제출된 법정 의견서는 세 가지 핵심 주장을 담고 있다:

첫째, 펜타곤의 조치가 미국 헌법의 적법 절차 조항을 위반했다는 것이다.

둘째, 이러한 선례가 미국 AI 산업 전체를 위축시킬 수 있다는 우려다.

셋째, 국제 경쟁력 측면에서의 우려다.`
  },
  {
    id: 2,
    title: "구글, Gemini Workspace 대규모 업데이트 발표... Docs·Sheets·Slides에 AI 혁신",
    summary: "구글이 Workspace에 Gemini AI 신기능을 추가한다.",
    category: "LLM",
    date: "11 3월 2026",
    image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600",
    content: `구글이 Google Workspace에 Gemini AI의 새로운 기능들을 대규모로 추가한다고 발표했다.

## Google Docs의 새로운 AI 기능

Google Docs에서는 '스마트 작성(Smart Compose)' 기능이 대폭 강화된다. 기존에는 문장 단위 자동완성만 지원했지만, 이제는 전체 문단이나 섹션을 AI가 작성해준다.

## Google Sheets의 데이터 분석 혁신

스프레드시트에서는 자연어 데이터 분석이 핵심이다. "지난 분기 매출이 가장 높은 지역 상위 5개를 보여줘"라고 입력하면 자동으로 피벗 테이블과 차트가 생성된다.

## 출시 일정과 가격 정책

새 기능들은 오늘부터 베타로 롤아웃되며, Google AI Ultra(월 $25) 및 Pro(월 $20) 구독자에게 먼저 제공된다.`
  },
  {
    id: 3,
    title: "AWS, 헬스케어 전용 AI 에이전트 5종 출시... HIPAA 준수 의료 자동화 시대 개막",
    summary: "AWS가 Amazon Connect Health를 출시했다.",
    category: "기업 AI",
    date: "11 3월 2026",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600",
    content: `AWS가 헬스케어 산업을 위한 전용 AI 솔루션 'Amazon Connect Health'를 출시하며 의료 AI 시장에 본격 진출했다.

## 5가지 전문 AI 에이전트 소개

### 1. 환자 신원 확인 에이전트
전화나 온라인으로 접수되는 환자의 신원을 자동으로 확인한다.

### 2. 예약 관리 에이전트
24시간 자동 예약 시스템을 제공한다.

### 3. 환자 인사이트 에이전트
환자의 과거 진료 기록, 검사 결과, 처방 이력 등을 분석한다.

## HIPAA 준수와 보안

모든 에이전트는 HIPAA 준수 환경에서 운영된다.`
  },
  {
    id: 4,
    title: "오라클 실적 발표, AI·클라우드 폭발 성장... 월가 예상치 대폭 상회",
    summary: "오라클이 2026 회계연도 3분기 실적에서 월가 예상치를 대폭 상회했다.",
    category: "기업 AI",
    date: "11 3월 2026",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600",
    content: `오라클(Oracle)이 2026 회계연도 3분기 실적에서 월가 예상치를 대폭 상회하며 AI 전환의 성공을 입증했다.

## 핵심 실적 요약

- **주당순이익(EPS)**: $1.79 (예상 $1.70, +5.3%)
- **매출**: $172억 (예상 $169.2억, +1.7%)
- **클라우드 매출**: $58억 (+32% YoY)
- **IaaS 매출**: $24억 (+45% YoY)

## AI 인프라 수요 폭증

래리 엘리슨 회장은 AI 인프라 수요에 대해 "현재 수주잔고가 $120억을 넘어섰으며, 이 중 대부분이 AI 워크로드"라고 밝혔다.`
  },
  {
    id: 5,
    title: "구글, 펜타곤 AI 협력 대폭 강화... GenAI.mil 포털에 맞춤형 AI 에이전트 기능 도입",
    summary: "구글이 미 국방부와의 AI 협력을 확대한다.",
    category: "기업 AI",
    date: "11 3월 2026",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600",
    content: `구글이 미국 국방부와의 AI 협력 관계를 대폭 강화하며 방산 AI 시장에서의 입지를 확대하고 있다.

## GenAI.mil 새 기능 소개

펜타곤은 GenAI.mil 포털에 새로운 기능을 추가했다. 이제 국방부 민간인과 군인들이 직접 맞춤형 AI 에이전트를 구축할 수 있다.

## 구글의 확대된 역할

구글 클라우드는 이번 업데이트의 핵심 기술 파트너로 참여했다. Vertex AI 플랫폼이 GenAI.mil의 백엔드를 담당하며, Gemini Pro 모델이 기본 언어 모델로 채택됐다.

## 시장 영향

국방 AI 시장은 빠르게 성장하고 있으며, 구글은 3년 내 점유율을 25%까지 끌어올리겠다는 목표를 세웠다.`
  }
]

// ============================================
// 메인 App 컴포넌트
// ============================================
function App() {
  // 상태 관리
  const [selectedNews, setSelectedNews] = useState(null)
  const [user, setUser] = useState(null)
  const [showSubscribePopup, setShowSubscribePopup] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [pendingUser, setPendingUser] = useState(null)
  const [toast, setToast] = useState(null)
  const [email, setEmail] = useState('')

  // 동의 상태
  const [consents, setConsents] = useState({
    terms: false,
    privacy: false,
    marketing: true
  })

  // ============================================
  // 초기화: 세션 체크 + 구독 팝업 로직
  // ============================================
  useEffect(() => {
    // 1. 저장된 사용자 세션 복원
    const savedUser = localStorage.getItem('giga_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        localStorage.removeItem('giga_user')
      }
    }

    // 2. 비로그인 사용자에게 구독 팝업 표시
    const shouldShowPopup = () => {
      // 이미 로그인됨
      if (localStorage.getItem('giga_user')) return false
      // 팝업 이미 봤음 (7일)
      if (Cookies.get('giga_popup_shown')) return false
      // 구독 거부함 (30일)
      if (Cookies.get('giga_no_subscribe')) return false
      return true
    }

    if (shouldShowPopup()) {
      const timer = setTimeout(() => {
        setShowSubscribePopup(true)
        Cookies.set('giga_popup_shown', 'true', 7)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  // ============================================
  // 토스트 메시지
  // ============================================
  const showToast = (message, type = 'info') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // ============================================
  // 소셜 로그인 처리
  // ============================================
  const handleSocialLogin = (provider) => {
    setShowSubscribePopup(false)
    setShowAuthModal(false)

    // 실제 OAuth 플로우 시뮬레이션
    const mockEmail = provider === 'kakao'
      ? prompt('카카오 계정 이메일을 입력하세요:')
      : prompt('Google 계정 이메일을 입력하세요:')

    if (!mockEmail || !mockEmail.includes('@')) {
      showToast('올바른 이메일을 입력해주세요.', 'error')
      return
    }

    // 기존 회원 확인
    const users = JSON.parse(localStorage.getItem('giga_users') || '{}')

    if (users[mockEmail]) {
      // 기존 회원 - 바로 로그인
      const userData = {
        email: mockEmail,
        name: users[mockEmail].name || mockEmail.split('@')[0],
        provider,
        isSubscribed: users[mockEmail].isSubscribed || false,
        createdAt: users[mockEmail].createdAt
      }
      localStorage.setItem('giga_user', JSON.stringify(userData))
      setUser(userData)
      showToast(`${userData.name}님, 환영합니다!`, 'success')
    } else {
      // 신규 회원 - 동의 필요
      setPendingUser({
        email: mockEmail,
        name: mockEmail.split('@')[0],
        provider
      })
      setShowConsentModal(true)
    }
  }

  // ============================================
  // 회원가입 완료 (동의 후)
  // ============================================
  const completeRegistration = () => {
    if (!consents.terms || !consents.privacy) {
      showToast('필수 약관에 동의해주세요.', 'error')
      return
    }

    // 사용자 저장
    const users = JSON.parse(localStorage.getItem('giga_users') || '{}')
    users[pendingUser.email] = {
      name: pendingUser.name,
      provider: pendingUser.provider,
      isSubscribed: consents.marketing,
      createdAt: new Date().toISOString(),
      consents: {
        terms: { agreed: true, at: new Date().toISOString() },
        privacy: { agreed: true, at: new Date().toISOString() },
        marketing: { agreed: consents.marketing, at: new Date().toISOString() }
      }
    }
    localStorage.setItem('giga_users', JSON.stringify(users))

    // 구독자 목록 업데이트
    if (consents.marketing) {
      const subscribers = JSON.parse(localStorage.getItem('giga_subscribers') || '[]')
      if (!subscribers.includes(pendingUser.email)) {
        subscribers.push(pendingUser.email)
        localStorage.setItem('giga_subscribers', JSON.stringify(subscribers))
      }
    }

    // 로그인 처리
    const userData = {
      email: pendingUser.email,
      name: pendingUser.name,
      provider: pendingUser.provider,
      isSubscribed: consents.marketing,
      createdAt: new Date().toISOString()
    }
    localStorage.setItem('giga_user', JSON.stringify(userData))
    setUser(userData)

    // 모달 닫기
    setShowConsentModal(false)
    setPendingUser(null)
    setConsents({ terms: false, privacy: false, marketing: true })

    // 환영 메시지
    if (consents.marketing) {
      showToast(`${userData.name}님, 가입과 구독이 완료되었습니다! 환영 이메일을 확인해주세요.`, 'success')
    } else {
      showToast(`${userData.name}님, 가입이 완료되었습니다!`, 'success')
    }
  }

  // ============================================
  // 로그아웃
  // ============================================
  const handleLogout = () => {
    localStorage.removeItem('giga_user')
    setUser(null)
    showToast('로그아웃 되었습니다.', 'info')
  }

  // ============================================
  // 뉴스레터 구독 (비로그인)
  // ============================================
  const handleQuickSubscribe = (e) => {
    e.preventDefault()
    if (!email.includes('@')) {
      showToast('올바른 이메일을 입력해주세요.', 'error')
      return
    }

    const subscribers = JSON.parse(localStorage.getItem('giga_subscribers') || '[]')
    if (subscribers.includes(email)) {
      showToast('이미 구독 중인 이메일입니다.', 'info')
    } else {
      subscribers.push(email)
      localStorage.setItem('giga_subscribers', JSON.stringify(subscribers))
      showToast('구독 완료! 매일 AI 뉴스를 받아보세요.', 'success')
    }

    setEmail('')
    setShowSubscribePopup(false)
  }

  // ============================================
  // 구독 해지
  // ============================================
  const handleUnsubscribe = () => {
    if (!user) return

    const users = JSON.parse(localStorage.getItem('giga_users') || '{}')
    if (users[user.email]) {
      users[user.email].isSubscribed = false
      users[user.email].consents.marketing = { agreed: false, revokedAt: new Date().toISOString() }
      localStorage.setItem('giga_users', JSON.stringify(users))
    }

    const subscribers = JSON.parse(localStorage.getItem('giga_subscribers') || '[]')
    const idx = subscribers.indexOf(user.email)
    if (idx > -1) {
      subscribers.splice(idx, 1)
      localStorage.setItem('giga_subscribers', JSON.stringify(subscribers))
    }

    setUser({ ...user, isSubscribed: false })
    localStorage.setItem('giga_user', JSON.stringify({ ...user, isSubscribed: false }))
    showToast('구독이 해지되었습니다. 언제든 다시 구독하실 수 있습니다.', 'info')
  }

  // ============================================
  // 구독 재신청
  // ============================================
  const handleResubscribe = () => {
    if (!user) return

    const users = JSON.parse(localStorage.getItem('giga_users') || '{}')
    if (users[user.email]) {
      users[user.email].isSubscribed = true
      users[user.email].consents.marketing = { agreed: true, at: new Date().toISOString() }
      localStorage.setItem('giga_users', JSON.stringify(users))
    }

    const subscribers = JSON.parse(localStorage.getItem('giga_subscribers') || '[]')
    if (!subscribers.includes(user.email)) {
      subscribers.push(user.email)
      localStorage.setItem('giga_subscribers', JSON.stringify(subscribers))
    }

    setUser({ ...user, isSubscribed: true })
    localStorage.setItem('giga_user', JSON.stringify({ ...user, isSubscribed: true }))
    showToast('다시 구독해주셔서 감사합니다!', 'success')
  }

  // ============================================
  // 기사 상세 페이지
  // ============================================
  if (selectedNews) {
    return (
      <div className="min-h-screen bg-white">
        {/* 헤더 */}
        <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <button onClick={() => setSelectedNews(null)} className="text-[#10436b] font-bold text-xl">
              {SITE_NAME}
            </button>
            <button onClick={() => setSelectedNews(null)} className="text-[#10436b] hover:underline text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              목록으로
            </button>
          </div>
        </header>

        {/* 기사 본문 */}
        <article className="max-w-3xl mx-auto px-4 py-8">
          <span className="inline-block px-3 py-1 text-sm text-white bg-[#10436b] rounded-full mb-4">
            {selectedNews.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {selectedNews.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-500 text-sm mb-8">
            <span>{selectedNews.date}</span>
            <span>·</span>
            <span>5분 읽기</span>
          </div>
          <img src={selectedNews.image} alt="" className="w-full rounded-xl mb-8 shadow-lg" />
          <div className="prose prose-lg max-w-none">
            {selectedNews.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={idx} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>
              } else if (paragraph.startsWith('### ')) {
                return <h3 key={idx} className="text-xl font-bold text-gray-800 mt-6 mb-3">{paragraph.replace('### ', '')}</h3>
              } else if (paragraph.startsWith('- ')) {
                return (
                  <ul key={idx} className="list-disc list-inside space-y-2 my-4">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i} className="text-gray-700">{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                )
              } else {
                return <p key={idx} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
              }
            })}
          </div>

          {/* 공유 버튼 */}
          <ShareButtons title={selectedNews.title} />
        </article>

        {/* 푸터 */}
        <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-400">
          © 2026 {SITE_NAME}. All rights reserved.
        </footer>

        {/* 토스트 */}
        {toast && (
          <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 ${
            toast.type === 'success' ? 'bg-green-500 text-white' :
            toast.type === 'error' ? 'bg-red-500 text-white' :
            'bg-gray-800 text-white'
          }`}>
            {toast.message}
          </div>
        )}
      </div>
    )
  }

  // ============================================
  // 메인 페이지
  // ============================================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#10436b]">{SITE_NAME}</span>
            <span className="text-xs bg-[#10436b] text-white px-2 py-0.5 rounded">BETA</span>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-gray-600 hidden sm:inline">
                  {user.name}님
                  {user.isSubscribed && <span className="ml-1 text-green-600">(구독중)</span>}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 bg-[#10436b] text-white text-sm rounded-lg hover:bg-[#0d3555]"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-br from-[#10436b] to-[#1a5a8a] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            AI 뉴스의 모든 것
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            매일 엄선된 AI 뉴스를 무료로 받아보세요
          </p>

          {user ? (
            user.isSubscribed ? (
              <div className="flex flex-col items-center gap-2">
                <span className="text-green-300">이미 구독 중입니다</span>
                <button
                  onClick={handleUnsubscribe}
                  className="text-sm text-blue-200 hover:text-white underline"
                >
                  구독 해지
                </button>
              </div>
            ) : (
              <button
                onClick={handleResubscribe}
                className="px-8 py-4 bg-white text-[#10436b] font-semibold rounded-xl hover:bg-blue-50 shadow-lg"
              >
                뉴스레터 다시 구독하기
              </button>
            )
          ) : (
            <button
              onClick={() => setShowSubscribePopup(true)}
              className="px-8 py-4 bg-white text-[#10436b] font-semibold rounded-xl hover:bg-blue-50 shadow-lg"
            >
              무료로 구독하기
            </button>
          )}
        </div>
      </section>

      {/* 뉴스 목록 */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">오늘의 주요 뉴스</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NEWS.map((news) => (
            <article
              key={news.id}
              onClick={() => setSelectedNews(news)}
              className="cursor-pointer group"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-xl mb-4 bg-gray-100 shadow-md group-hover:shadow-xl transition-shadow">
                <img
                  src={news.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="inline-block px-2 py-1 text-xs font-medium text-[#10436b] bg-blue-50 rounded mb-2">
                {news.category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#10436b] transition-colors leading-snug line-clamp-2">
                {news.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">{news.summary}</p>
              <span className="text-xs text-gray-400 mt-2 block">{news.date}</span>
            </article>
          ))}
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-white font-bold text-lg">{SITE_NAME}</span>
              <p className="text-sm mt-1">매일 새로운 AI 뉴스를 전달합니다</p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white">이용약관</a>
              <a href="#" className="hover:text-white">개인정보처리방침</a>
              <a href="#" className="hover:text-white">문의하기</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs">
            <p>© 2026 GIGA GLOBAL STUDIO. All rights reserved.</p>
            <p className="mt-2">
              본 메일은 정보통신망법에 따라 수신 동의하신 분께 발송됩니다.
              <br />
              수신을 원하지 않으시면 로그인 후 구독 해지를 하실 수 있습니다.
            </p>
          </div>
        </div>
      </footer>

      {/* ============================================ */}
      {/* 구독 팝업 (비로그인 사용자) */}
      {/* ============================================ */}
      {showSubscribePopup && !user && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative animate-fade-in">
            <button
              onClick={() => {
                setShowSubscribePopup(false)
                Cookies.set('giga_no_subscribe', 'true', 30)
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#10436b] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                AI 뉴스, 놓치지 마세요!
              </h3>
              <p className="text-gray-500">
                매일 엄선된 AI 뉴스를 무료로 받아보세요
              </p>
            </div>

            {/* 소셜 로그인 버튼 */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialLogin('kakao')}
                className="w-full py-3 bg-[#FEE500] text-black rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#f5dc00] transition-colors"
              >
                <KakaoIcon />
                카카오로 시작하기
              </button>

              <button
                onClick={() => handleSocialLogin('google')}
                className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <GoogleIcon />
                Google로 시작하기
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="text-sm text-gray-400">또는</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* 이메일 구독 폼 */}
            <form onSubmit={handleQuickSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소를 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#10436b]"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#10436b] text-white font-medium rounded-lg hover:bg-[#0d3555] transition-colors"
              >
                이메일로 구독하기
              </button>
            </form>

            <p className="mt-4 text-xs text-gray-400 text-center">
              구독 시 <a href="#" className="underline">이용약관</a> 및{' '}
              <a href="#" className="underline">개인정보처리방침</a>,{' '}
              <a href="#" className="underline">마케팅 수신</a>에 동의하게 됩니다.
              <br />
              구독은 언제든 해지하실 수 있습니다.
            </p>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* 로그인 모달 */}
      {/* ============================================ */}
      {showAuthModal && !user && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">로그인</h3>
              <p className="text-gray-500">소셜 계정으로 간편하게 로그인하세요</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleSocialLogin('kakao')}
                className="w-full py-3 bg-[#FEE500] text-black rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#f5dc00] transition-colors"
              >
                <KakaoIcon />
                카카오 로그인
              </button>

              <button
                onClick={() => handleSocialLogin('google')}
                className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <GoogleIcon />
                Google 로그인
              </button>
            </div>

            <p className="mt-6 text-xs text-gray-400 text-center">
              처음이신가요? 소셜 로그인으로 자동 가입됩니다.
            </p>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* 동의 모달 (신규 가입) */}
      {/* ============================================ */}
      {showConsentModal && pendingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                환영합니다, {pendingUser.name}님!
              </h3>
              <p className="text-gray-500">마지막 단계입니다</p>
            </div>

            {/* 동의 체크박스 */}
            <div className="space-y-4 mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consents.terms}
                  onChange={(e) => setConsents({...consents, terms: e.target.checked})}
                  className="mt-1 w-4 h-4"
                />
                <span className="text-sm">
                  <span className="text-red-500 font-medium">[필수]</span> 이용약관에 동의합니다
                  <a href="#" className="text-blue-500 ml-1" target="_blank">보기</a>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consents.privacy}
                  onChange={(e) => setConsents({...consents, privacy: e.target.checked})}
                  className="mt-1 w-4 h-4"
                />
                <span className="text-sm">
                  <span className="text-red-500 font-medium">[필수]</span> 개인정보 처리방침에 동의합니다
                  <a href="#" className="text-blue-500 ml-1" target="_blank">보기</a>
                </span>
              </label>

              <div className="border-t border-gray-200 pt-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consents.marketing}
                    onChange={(e) => setConsents({...consents, marketing: e.target.checked})}
                    className="mt-1 w-4 h-4"
                  />
                  <div className="text-sm">
                    <span className="text-gray-400">[선택]</span> AI 뉴스레터 및 마케팅 정보 수신에 동의합니다
                    <p className="text-xs text-gray-400 mt-1">
                      최신 AI 뉴스를 이메일로 받아보실 수 있습니다
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* 전체 동의 */}
            <label className="flex items-center gap-3 cursor-pointer mb-6 p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                checked={consents.terms && consents.privacy && consents.marketing}
                onChange={(e) => setConsents({
                  terms: e.target.checked,
                  privacy: e.target.checked,
                  marketing: e.target.checked
                })}
                className="w-5 h-5"
              />
              <span className="font-medium">전체 동의</span>
            </label>

            <button
              onClick={completeRegistration}
              disabled={!consents.terms || !consents.privacy}
              className="w-full py-3 bg-[#10436b] text-white font-medium rounded-lg hover:bg-[#0d3555] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              시작하기
            </button>

            <button
              onClick={() => {
                setShowConsentModal(false)
                setPendingUser(null)
              }}
              className="w-full py-2 mt-2 text-gray-500 text-sm hover:text-gray-700"
            >
              취소
            </button>
          </div>
        </div>
      )}

      {/* 토스트 메시지 */}
      {toast && (
        <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 ${
          toast.type === 'success' ? 'bg-green-500 text-white' :
          toast.type === 'error' ? 'bg-red-500 text-white' :
          'bg-gray-800 text-white'
        }`}>
          {toast.message}
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default App
