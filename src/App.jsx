import { useState, useEffect } from 'react'

// 뉴스 데이터 (한글) - 2026-03-11 자동 업데이트 - 상세 버전
const NEWS = [
  {
    "id": 1,
    "title": "OpenAI·구글 직원 30명, Anthropic 편에서 펜타곤 소송 지원... AI 업계 이례적 연대",
    "summary": "OpenAI와 구글 딥마인드 직원 30명 이상이 Anthropic을 지지하는 법정 의견서를 제출했다. 구글 수석 과학자 제프 딘도 서명에 참여했으며, 펜타곤의 Anthropic 블랙리스트가 미국 AI 산업 전체를 위협한다고 경고했다.",
    "category": "기업 AI",
    "date": "11 3월 2026",
    "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
    "content": `OpenAI와 구글 딥마인드 직원 30명 이상이 Anthropic을 지지하는 법정 의견서(amicus brief)를 제출하며 AI 업계의 이례적인 연대가 이뤄졌다. 이는 평소 치열하게 경쟁하는 AI 기업들이 윤리적 AI 개발이라는 공동의 가치 아래 뭉친 역사적인 순간으로 평가받고 있다.

## 주요 서명자와 그 의미

구글 수석 과학자 제프 딘(Jeff Dean)을 포함한 AI 분야 최고 연구자들이 서명에 참여했다. 제프 딘은 구글 브레인의 공동 창립자이자 현재 구글 AI 연구를 총괄하는 인물로, 그의 참여는 이번 사안의 중요성을 상징적으로 보여준다.

OpenAI에서는 안전 연구팀 소속 연구원 다수가 서명했으며, 이는 OpenAI가 최근 펜타곤과의 협력을 확대하고 있는 상황에서 더욱 주목할 만하다. 직원들이 회사의 사업 방향과 다른 입장을 공개적으로 표명한 것이기 때문이다.

## Anthropic 블랙리스트 사건의 전말

Anthropic은 지난달 28일 미 국방부로부터 '국가 안보 공급망 리스크'로 지정되는 충격적인 조치를 받았다. 이는 Anthropic이 2억 달러 규모의 펜타곤 계약을 거부하면서 시작됐다.

Anthropic의 다리오 아모데이(Dario Amodei) CEO는 계약 거부 당시 "우리는 AI가 대량 감시나 자율 살상 무기에 사용되는 것을 허용할 수 없다"고 밝혔다. 이후 국방부는 Anthropic을 블랙리스트에 올렸고, 이로 인해 미국 정부 기관과 주요 방산업체들은 Anthropic의 Claude AI를 사용할 수 없게 됐다.

## 법정 의견서의 핵심 주장

제출된 법정 의견서는 세 가지 핵심 주장을 담고 있다:

첫째, 펜타곤의 조치가 미국 헌법의 적법 절차 조항을 위반했다는 것이다. Anthropic은 구체적인 혐의 없이 블랙리스트에 올려졌으며, 이의 제기의 기회도 제공받지 못했다.

둘째, 이러한 선례가 미국 AI 산업 전체를 위축시킬 수 있다는 우려다. 기업들이 윤리적 기준을 세우면 정부로부터 보복을 받을 수 있다는 메시지를 주기 때문이다.

셋째, 국제 경쟁력 측면에서의 우려다. 미국 AI 기업들이 정부의 일방적 조치에 취약하다는 인식이 퍼지면, 해외 투자와 인재 유치에 부정적 영향을 미칠 수 있다.

## 업계 반응과 향후 전망

실리콘밸리의 반응은 대체로 Anthropic을 지지하는 분위기다. Y Combinator의 샘 올트먼은 트위터에서 "AI 안전을 진지하게 다루는 기업을 처벌하는 것은 장기적으로 모두에게 해롭다"고 언급했다.

반면 일부에서는 국가 안보 논리를 지지하는 목소리도 있다. 전 국방부 관계자들은 "AI 기업들도 국가 안보에 기여할 책임이 있다"고 주장한다.

법원의 판결은 이르면 4월 중순에 나올 것으로 예상되며, 그 결과는 AI 기업과 정부 간 관계의 새로운 기준을 세울 것으로 전망된다.`
  },
  {
    "id": 2,
    "title": "구글, Gemini Workspace 대규모 업데이트 발표... Docs·Sheets·Slides에 AI 혁신",
    "summary": "구글이 Workspace에 Gemini AI 신기능을 추가한다. 문서, 스프레드시트, 슬라이드, 드라이브에서 AI 활용이 더욱 편리해지며, Google AI Ultra/Pro 구독자에게 베타로 우선 제공된다.",
    "category": "LLM",
    "date": "11 3월 2026",
    "image": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600",
    "content": `구글이 Google Workspace에 Gemini AI의 새로운 기능들을 대규모로 추가한다고 발표했다. 이번 업데이트는 Microsoft의 Copilot에 대응하는 구글의 가장 공격적인 기업 AI 전략으로 평가받고 있다.

## Google Docs의 새로운 AI 기능

Google Docs에서는 '스마트 작성(Smart Compose)' 기능이 대폭 강화된다. 기존에는 문장 단위 자동완성만 지원했지만, 이제는 전체 문단이나 섹션을 AI가 작성해준다.

가장 주목할 만한 기능은 '문서 재구성(Document Restructure)'이다. 사용자가 "이 보고서를 임원 브리핑 형식으로 바꿔줘"라고 요청하면, AI가 자동으로 문서 구조, 톤, 길이를 조정한다.

또한 '실시간 팩트체크(Real-time Fact Check)' 기능이 추가됐다. 문서 작성 중 통계나 사실 관계를 실시간으로 검증하고, 출처를 자동으로 추가해준다.

## Google Sheets의 데이터 분석 혁신

스프레드시트에서는 자연어 데이터 분석이 핵심이다. "지난 분기 매출이 가장 높은 지역 상위 5개를 보여줘"라고 입력하면 자동으로 피벗 테이블과 차트가 생성된다.

'예측 모델링(Predictive Modeling)' 기능도 추가됐다. 과거 데이터를 기반으로 향후 트렌드를 예측하는 모델을 클릭 몇 번으로 만들 수 있다. 이전에는 데이터 과학자가 필요했던 작업이다.

특히 주목할 점은 '이상치 탐지(Anomaly Detection)' 기능이다. 데이터에서 비정상적인 패턴을 자동으로 감지하고 하이라이트해준다. 재무 데이터 검토나 품질 관리에 유용할 것으로 보인다.

## Google Slides 프레젠테이션 자동 생성

슬라이드에서는 '원클릭 프레젠테이션(One-Click Presentation)' 기능이 가장 혁신적이다. 텍스트 문서나 개요만 입력하면 전체 프레젠테이션이 자동 생성된다. 디자인, 레이아웃, 이미지 배치까지 AI가 처리한다.

'스피커 노트 자동 생성(Auto Speaker Notes)' 기능도 추가됐다. 각 슬라이드에 맞는 발표 스크립트를 AI가 작성해준다. 발표 시간 예측 기능과 함께 제공된다.

'실시간 번역 프레젠테이션(Real-time Translation)'을 통해 발표 중 실시간으로 자막을 다른 언어로 번역할 수 있다. 글로벌 비즈니스 환경에서 특히 유용할 전망이다.

## Google Drive의 지능형 검색

드라이브에서는 '의미 기반 검색(Semantic Search)'이 도입된다. 파일명이나 정확한 키워드를 몰라도 "작년에 김 대리가 작성한 마케팅 전략 문서"처럼 자연어로 검색할 수 있다.

'크로스 파일 분석(Cross-File Analysis)' 기능으로 여러 문서를 한 번에 분석하고 요약하는 것도 가능해졌다. 프로젝트 관련 모든 파일을 선택하고 "핵심 내용을 요약해줘"라고 요청하면 된다.

## 출시 일정과 가격 정책

새 기능들은 오늘부터 베타로 롤아웃되며, Google AI Ultra(월 $25) 및 Pro(월 $20) 구독자에게 먼저 제공된다. 일반 Workspace Business 사용자들에게는 4월 중 순차적으로 적용될 예정이다.

구글 클라우드의 토마스 쿠리안 CEO는 "이번 업데이트로 모든 지식 근로자가 AI 어시스턴트를 갖게 될 것"이라며 "업무 생산성의 새로운 시대가 열린다"고 강조했다.`
  },
  {
    "id": 3,
    "title": "AWS, 헬스케어 전용 AI 에이전트 5종 출시... HIPAA 준수 의료 자동화 시대 개막",
    "summary": "AWS가 Amazon Connect Health를 출시했다. 환자 확인, 예약 관리, 환자 인사이트, 진료 기록, 의료 코딩 등 5개 AI 에이전트가 HIPAA 준수 의료 자동화를 지원한다.",
    "category": "기업 AI",
    "date": "11 3월 2026",
    "image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600",
    "content": `AWS가 헬스케어 산업을 위한 전용 AI 솔루션 'Amazon Connect Health'를 출시하며 의료 AI 시장에 본격 진출했다. 이번 출시는 의료 산업의 AI 자동화를 가속화할 것으로 기대된다.

## 5가지 전문 AI 에이전트 소개

Amazon Connect Health는 의료 현장의 핵심 업무를 자동화하는 5개의 목적별 AI 에이전트로 구성된다:

### 1. 환자 신원 확인 에이전트 (Patient Verification Agent)
전화나 온라인으로 접수되는 환자의 신원을 자동으로 확인한다. 음성 인식과 생체 인증을 결합해 보험 정보, 알레르기 이력, 복용 중인 약물 등을 실시간으로 검증한다. 기존 수동 확인 대비 처리 시간을 90% 단축한다.

### 2. 예약 관리 에이전트 (Appointment Management Agent)
24시간 자동 예약 시스템을 제공한다. 환자의 선호 시간, 담당 의사 스케줄, 검사실 가용성 등을 종합적으로 고려해 최적의 예약 시간을 제안한다. 노쇼(No-show) 예측 기능도 포함되어 리마인더를 자동 발송한다.

### 3. 환자 인사이트 에이전트 (Patient Insights Agent)
환자의 과거 진료 기록, 검사 결과, 처방 이력 등을 분석해 의료진에게 인사이트를 제공한다. 예를 들어, 당뇨 환자의 혈당 추이를 분석하고 위험 신호를 조기에 감지해 알림을 보낸다.

### 4. 환경 문서화 에이전트 (Ambient Documentation Agent)
의사와 환자 간 대화를 실시간으로 분석해 진료 기록(EMR)을 자동 작성한다. 이는 의사들이 가장 많은 시간을 소비하는 행정 업무 중 하나로, 이 에이전트로 인해 의사당 하루 평균 2시간을 절약할 수 있다.

### 5. 의료 코딩 에이전트 (Medical Coding Agent)
진료 내용을 자동으로 ICD-10, CPT 코드로 변환한다. 정확한 코딩은 보험 청구의 핵심으로, 이 에이전트는 98% 이상의 정확도를 보여준다. 잘못된 코딩으로 인한 청구 반려를 대폭 줄일 수 있다.

## HIPAA 준수와 보안

모든 에이전트는 HIPAA(Health Insurance Portability and Accountability Act) 준수 환경에서 운영된다. 환자 데이터는 AWS의 의료 전용 클라우드 인프라에서 처리되며, 종단간 암호화가 적용된다.

AWS는 BAA(Business Associate Agreement)를 기본 제공하며, 의료 기관의 컴플라이언스 요구사항을 충족하는 상세한 감사 로그를 제공한다.

## 기존 시스템과의 통합

Amazon Connect Health는 Epic, Cerner, MEDITECH 등 주요 EMR 시스템과 네이티브 통합을 지원한다. API를 통해 기존 병원 정보 시스템(HIS)과도 연동할 수 있다.

초기 도입 병원인 Cleveland Clinic의 CIO는 "6주 만에 전체 콜센터에 배포할 수 있었다"며 "환자 대기 시간이 40% 감소했다"고 밝혔다.

## 가격과 시장 전망

가격은 에이전트당 월 $2,000부터 시작하며, 통화량에 따른 종량제 옵션도 제공된다. 중소 병원을 위한 번들 패키지는 월 $5,000부터 시작한다.

가트너는 2028년까지 미국 병원의 60%가 AI 기반 환자 응대 시스템을 도입할 것으로 전망했다. AWS의 이번 출시로 Microsoft Azure 및 Google Cloud와의 의료 AI 시장 경쟁이 더욱 치열해질 것으로 예상된다.`
  },
  {
    "id": 4,
    "title": "오라클 실적 발표, AI·클라우드 폭발 성장... 월가 예상치 대폭 상회",
    "summary": "오라클이 2026 회계연도 3분기 실적을 발표했다. EPS 1.79달러(예상 1.70달러), 매출 172억 달러(예상 169억 달러)를 기록하며 AI와 IaaS 성장에 힘입어 예상치를 상회했다.",
    "category": "기업 AI",
    "date": "11 3월 2026",
    "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600",
    "content": `오라클(Oracle)이 2026 회계연도 3분기 실적에서 월가 예상치를 대폭 상회하며 AI 전환의 성공을 입증했다. 실적 발표 직후 시간외 거래에서 주가는 8% 이상 급등했다.

## 핵심 실적 요약

오라클은 3분기(12월~2월) 실적에서 다음과 같은 성과를 거뒀다:

- **주당순이익(EPS)**: $1.79 (예상 $1.70, +5.3%)
- **매출**: $172억 (예상 $169.2억, +1.7%)
- **클라우드 매출**: $58억 (+32% YoY)
- **IaaS 매출**: $24억 (+45% YoY)

특히 IaaS(Infrastructure as a Service) 부문의 45% 성장이 눈에 띈다. 이는 AWS(32%)와 Azure(28%)의 같은 기간 성장률을 크게 상회하는 수치다.

## AI 인프라 수요 폭증

래리 엘리슨(Larry Ellison) 회장은 실적 발표 컨퍼런스 콜에서 AI 인프라 수요에 대해 상세히 설명했다:

"우리는 GPU 클러스터에 대한 수요를 도저히 따라갈 수 없습니다. 현재 수주잔고(backlog)가 $120억을 넘어섰으며, 이 중 대부분이 AI 워크로드입니다. NVIDIA, AMD와 협력해 공급을 늘리고 있지만, 수요 증가 속도가 더 빠릅니다."

오라클은 특히 대규모 AI 모델 학습에 필요한 '슈퍼클러스터'에서 강점을 보이고 있다. 단일 클러스터에서 최대 65,000개의 GPU를 연결할 수 있으며, 이는 경쟁사 대비 2배 이상의 규모다.

## 주요 고객사 확보

이번 분기에 오라클은 대형 AI 계약을 다수 체결했다:

- **OpenAI**: GPT-5 학습을 위한 대규모 GPU 클러스터 계약 확대
- **Cohere**: 엔터프라이즈 LLM 인프라 전면 OCI 이전
- **미 국방부**: 기밀 클라우드 AI 인프라 구축 계약

특히 OpenAI와의 파트너십 확대는 주목할 만하다. 오라클은 이미 Microsoft Azure와 함께 OpenAI의 주요 클라우드 파트너이며, 이번 계약으로 그 비중이 더욱 커질 전망이다.

## 데이터베이스 AI 통합

오라클은 전통적인 강점인 데이터베이스 사업에서도 AI 혁신을 진행 중이다. 이번 분기에 발표된 'Oracle Database 24c'는 벡터 검색과 자연어 쿼리를 네이티브로 지원한다.

사프라 카츠(Safra Catz) CEO는 "기업들이 기존 오라클 데이터베이스에 저장된 데이터로 즉시 AI 애플리케이션을 구축할 수 있게 됐다"며 "데이터 이동 없이 AI를 적용할 수 있다는 것이 핵심"이라고 강조했다.

## 애널리스트 반응

월가 애널리스트들은 대체로 긍정적인 반응을 보였다:

- **JP Morgan**: 목표가 $180 → $210 상향, "AI 인프라의 숨은 강자"
- **Goldman Sachs**: 투자의견 '매수' 유지, "클라우드 전환이 가속화되고 있다"
- **Morgan Stanley**: "엔터프라이즈 AI 시장에서 오라클의 위치가 재평가되고 있다"

다음 분기 가이던스도 긍정적이다. 오라클은 4분기 매출 성장률을 15~17%로 제시했으며, 이는 시장 예상(12%)을 크게 상회한다.`
  },
  {
    "id": 5,
    "title": "구글, 펜타곤 AI 협력 대폭 강화... GenAI.mil 포털에 맞춤형 AI 에이전트 기능 도입",
    "summary": "구글이 미 국방부와의 AI 협력을 확대한다. 펜타곤 AI 포털 GenAI.mil에 민간·군인이 직접 AI 에이전트를 구축할 수 있는 기능을 도입했다.",
    "category": "기업 AI",
    "date": "11 3월 2026",
    "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600",
    "content": `구글이 미국 국방부와의 AI 협력 관계를 대폭 강화하며 방산 AI 시장에서의 입지를 확대하고 있다. 이는 Anthropic의 펜타곤 블랙리스트 사건 이후 재편되고 있는 국방 AI 생태계의 최신 동향을 보여준다.

## GenAI.mil 새 기능 소개

구글은 펜타곤의 엔터프라이즈 AI 포털 'GenAI.mil'에 혁신적인 기능을 추가했다. 핵심은 '커스텀 에이전트 빌더(Custom Agent Builder)'로, 비개발자도 자신만의 AI 에이전트를 구축할 수 있다.

이 도구를 사용하면 국방부 직원들이 다음과 같은 작업을 자동화할 수 있다:
- 정보 보고서 요약 및 분석
- 군수품 재고 관리 및 예측
- 인사 기록 검토 및 분류
- 훈련 일정 최적화
- 예산 문서 작성 보조

모든 에이전트는 비분류(unclassified) 환경에서 운영되며, FedRAMP High 인증을 받은 구글 클라우드 인프라에서 실행된다.

## Anthropic 공백 메우기

이번 협력 확대는 Anthropic이 국방부와의 관계를 단절한 이후 생긴 공백을 메우려는 움직임의 일환이다. 2월 말까지 Anthropic은 펜타곤 기밀 클라우드에서 유일한 AI 제공업체였다.

현재 펜타곤 기밀 네트워크에 접근할 수 있는 AI 기업은 다음과 같다:
- **OpenAI**: GPT-4 기반 모델 제공
- **xAI**: Grok 모델 도입 협상 중
- **Google**: Gemini 모델 통합 진행 중

구글은 기밀 환경용 Gemini 배포를 위해 국방부와 별도 협약을 체결했으며, 올해 하반기 배포를 목표로 하고 있다.

## 직원들의 반발과 내부 갈등

구글의 국방부 협력 확대는 내부에서도 논란이 되고 있다. 지난주 구글 직원 약 200명이 "AI 윤리 원칙 준수"를 요구하는 서한을 경영진에 제출했다.

2018년 '프로젝트 메이븐(Project Maven)' 논란 당시 구글은 "AI를 무기 개발에 사용하지 않겠다"는 원칙을 발표한 바 있다. 일부 직원들은 현재의 협력이 이 원칙에 위배될 수 있다고 우려한다.

구글 대변인은 "우리는 방어적 목적의 AI 개발만을 지원하며, 자율 무기 시스템에는 참여하지 않는다"고 밝혔다. 그러나 비판론자들은 "방어"와 "공격"의 경계가 AI에서는 모호하다고 지적한다.

## 시장 영향과 경쟁 구도

국방 AI 시장은 빠르게 성장하고 있다. 국방부의 AI 예산은 2026년 $30억으로, 전년 대비 40% 증가했다. 이 중 상당 부분이 민간 클라우드 및 AI 서비스 구매에 배정됐다.

현재 시장 점유율은 다음과 같이 추정된다:
- AWS: 45%
- Microsoft Azure: 30%
- Google Cloud: 15%
- 기타: 10%

구글은 3년 내 점유율을 25%까지 끌어올리겠다는 목표를 세웠다. 이를 위해 전 국방부 CIO 출신 인력을 영입하고, 방산 전문 영업팀을 확대하고 있다.

## 향후 전망

전문가들은 Anthropic 사태가 국방 AI 시장의 구조적 변화를 촉발했다고 분석한다. 단일 벤더 의존에서 벗어나 여러 AI 제공업체를 활용하는 '멀티 벤더' 전략이 부상하고 있다.

한편, AI 윤리와 국가 안보 사이의 긴장은 계속될 전망이다. 이번 분쟁의 결과는 향후 AI 기업과 정부 간 관계의 새로운 기준을 제시할 것으로 보인다.`
  }
]

function App() {
  const [selectedNews, setSelectedNews] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login' or 'signup'
  const [showSubscribe, setShowSubscribe] = useState(false)
  const [showGoogleLogin, setShowGoogleLogin] = useState(false)
  const [googleEmail, setGoogleEmail] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('info') // 'success', 'error', 'info'
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // 초기 사용자 세션 체크 (localStorage 기반)
  useEffect(() => {
    const savedUser = localStorage.getItem('pd_current_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        localStorage.removeItem('pd_current_user')
      }
    }
  }, [])

  // 회원가입 (localStorage 기반)
  async function handleSignup(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    // 이메일 형식 체크
    if (!email.includes('@')) {
      setMessage('올바른 이메일 형식이 아닙니다.')
      setMessageType('error')
      setLoading(false)
      return
    }

    // 비밀번호 길이 체크
    if (password.length < 6) {
      setMessage('비밀번호는 6자 이상이어야 합니다.')
      setMessageType('error')
      setLoading(false)
      return
    }

    // localStorage에서 사용자 확인
    const users = JSON.parse(localStorage.getItem('pd_users') || '{}')

    if (users[email]) {
      setMessage('이미 가입된 이메일입니다.')
      setMessageType('error')
      setLoading(false)
      return
    }

    // 새 사용자 등록
    users[email] = { password, createdAt: new Date().toISOString() }
    localStorage.setItem('pd_users', JSON.stringify(users))

    // 자동 로그인
    const newUser = { email, id: Date.now().toString() }
    localStorage.setItem('pd_current_user', JSON.stringify(newUser))
    setUser(newUser)

    setMessage('가입 완료! 환영합니다.')
    setMessageType('success')
    setTimeout(() => {
      setShowAuth(false)
      setMessage('')
      setEmail('')
      setPassword('')
    }, 1500)
    setLoading(false)
  }

  // 로그인 (localStorage 기반)
  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const users = JSON.parse(localStorage.getItem('pd_users') || '{}')
    const userData = users[email]

    if (!userData) {
      setMessage('등록되지 않은 이메일입니다.')
      setMessageType('error')
      setLoading(false)
      return
    }

    if (userData.password !== password) {
      setMessage('비밀번호가 일치하지 않습니다.')
      setMessageType('error')
      setLoading(false)
      return
    }

    // 로그인 성공
    const loggedInUser = { email, id: Date.now().toString() }
    localStorage.setItem('pd_current_user', JSON.stringify(loggedInUser))
    setUser(loggedInUser)

    setMessage('로그인 성공!')
    setMessageType('success')
    setTimeout(() => {
      setShowAuth(false)
      setMessage('')
      setEmail('')
      setPassword('')
    }, 1500)
    setLoading(false)
  }

  // 로그아웃
  async function handleLogout() {
    localStorage.removeItem('pd_current_user')
    setUser(null)
    setMessage('로그아웃 되었습니다.')
    setMessageType('info')
    setTimeout(() => setMessage(''), 2000)
  }

  // 뉴스레터 구독 (localStorage 기반)
  async function handleSubscribe(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (!email.includes('@')) {
      setMessage('올바른 이메일 형식이 아닙니다.')
      setMessageType('error')
      setLoading(false)
      return
    }

    const list = JSON.parse(localStorage.getItem('pd_subscribers') || '[]')
    if (!list.includes(email)) {
      list.push(email)
      localStorage.setItem('pd_subscribers', JSON.stringify(list))
      setMessage('구독 완료! 매일 AI 뉴스를 받아보세요.')
      setMessageType('success')
    } else {
      setMessage('이미 구독 중인 이메일입니다.')
      setMessageType('info')
    }

    setTimeout(() => {
      setShowSubscribe(false)
      setMessage('')
      setEmail('')
    }, 2000)
    setLoading(false)
  }

  // Google 로그인 모달 열기
  function handleGoogleLogin() {
    setShowAuth(false)
    setShowGoogleLogin(true)
    setGoogleEmail('')
    setMessage('')
  }

  // Google 로그인 처리
  function processGoogleLogin(e) {
    e.preventDefault()
    if (!googleEmail || !googleEmail.includes('@')) {
      setMessage('올바른 이메일을 입력해주세요.')
      setMessageType('error')
      return
    }

    // Google 계정으로 자동 가입/로그인
    const users = JSON.parse(localStorage.getItem('pd_users') || '{}')
    if (!users[googleEmail]) {
      users[googleEmail] = { password: 'google_oauth', provider: 'google', createdAt: new Date().toISOString() }
      localStorage.setItem('pd_users', JSON.stringify(users))
    }

    const googleUser = { email: googleEmail, id: Date.now().toString(), provider: 'google' }
    localStorage.setItem('pd_current_user', JSON.stringify(googleUser))
    setUser(googleUser)

    setMessage('Google 로그인 성공!')
    setMessageType('success')
    setTimeout(() => {
      setShowGoogleLogin(false)
      setMessage('')
      setGoogleEmail('')
    }, 1500)
  }

  // 기사 상세 페이지
  if (selectedNews) {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <button onClick={() => setSelectedNews(null)} className="text-[#10436b] font-bold text-xl">
              Prompt Daily
            </button>
            <button onClick={() => setSelectedNews(null)} className="text-[#10436b] hover:underline text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              목록으로
            </button>
          </div>
        </header>

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
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">이 기사 공유하기</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedNews.title + ' - Prompt Daily')}&url=${encodeURIComponent('https://gigaglobalstudio-lgtm.github.io/prompt-daily/')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 flex items-center gap-2 no-underline"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X (Twitter)
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://gigaglobalstudio-lgtm.github.io/prompt-daily/')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm hover:bg-blue-800 flex items-center gap-2 no-underline"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://gigaglobalstudio-lgtm.github.io/prompt-daily/')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2 no-underline"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </a>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  const shareUrl = 'https://gigaglobalstudio-lgtm.github.io/prompt-daily/'
                  const shareText = selectedNews.title + '\n' + shareUrl
                  if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(shareText)
                    setMessage('링크가 복사되었습니다!')
                    setMessageType('success')
                    setTimeout(() => setMessage(''), 2000)
                  } else {
                    const ta = document.createElement('textarea')
                    ta.value = shareText
                    ta.style.position = 'fixed'
                    ta.style.left = '-9999px'
                    document.body.appendChild(ta)
                    ta.select()
                    try {
                      document.execCommand('copy')
                      setMessage('링크가 복사되었습니다!')
                      setMessageType('success')
                    } catch (err) {
                      setMessage('복사 실패')
                      setMessageType('error')
                    }
                    document.body.removeChild(ta)
                    setTimeout(() => setMessage(''), 2000)
                  }
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 flex items-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                링크 복사
              </button>
            </div>
            {message && (
              <div className={`mt-4 p-3 rounded-lg text-sm ${
                messageType === 'success' ? 'bg-green-100 text-green-700' :
                messageType === 'error' ? 'bg-red-100 text-red-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {message}
              </div>
            )}
          </div>
        </article>

        <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-400">
          © 2026 Prompt Daily. All rights reserved.
        </footer>
      </div>
    )
  }

  // 메인 페이지
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-[#10436b] font-bold text-2xl">Prompt Daily</h1>
            <nav className="hidden md:flex gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-[#10436b]">전체기사</a>
              <a href="#" className="text-gray-600 hover:text-[#10436b]">LLM</a>
              <a href="#" className="text-gray-600 hover:text-[#10436b]">기업 AI</a>
              <a href="#" className="text-gray-600 hover:text-[#10436b]">소개</a>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            {user ? (
              <>
                <span className="text-gray-600 hidden md:inline">{user.email}</span>
                <button onClick={handleLogout} className="text-gray-600 hover:text-[#10436b]">
                  로그아웃
                </button>
              </>
            ) : (
              <button onClick={() => { setShowAuth(true); setAuthMode('login') }} className="text-gray-600 hover:text-[#10436b]">
                로그인
              </button>
            )}
            <button
              onClick={() => setShowSubscribe(true)}
              className="bg-[#10436b] text-white px-4 py-2 rounded-lg hover:bg-[#0d3555] transition-colors"
            >
              구독하기
            </button>
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-br from-[#10436b] to-[#1a5a8a] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">AI News That Matters</h2>
          <p className="text-xl text-blue-100 mb-8">매일 가장 중요한 AI 뉴스를 전합니다</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowSubscribe(true)}
              className="bg-white text-[#10436b] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              무료 구독하기
            </button>
          </div>
        </div>
      </section>

      {/* 메시지 토스트 */}
      {message && !showAuth && !showSubscribe && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 ${
          messageType === 'success' ? 'bg-green-500 text-white' :
          messageType === 'error' ? 'bg-red-500 text-white' :
          'bg-gray-800 text-white'
        }`}>
          {message}
        </div>
      )}

      {/* Featured */}
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
              <p className="text-gray-500 text-sm line-clamp-2 mb-3">{news.summary}</p>
              <span className="text-xs text-gray-400">{news.date}</span>
            </article>
          ))}
        </div>
      </section>

      {/* 뉴스레터 CTA */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">매일 아침, AI 뉴스를 받아보세요</h2>
          <p className="text-gray-600 mb-8">5,000명 이상의 AI 전문가들이 구독하고 있습니다</p>
          <button
            onClick={() => setShowSubscribe(true)}
            className="bg-[#10436b] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#0d3555] transition-colors"
          >
            무료로 구독하기
          </button>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <h3 className="text-[#10436b] font-bold text-xl mb-2">Prompt Daily</h3>
              <p className="text-gray-500 text-sm">매일 가장 중요한 AI 뉴스를 전합니다.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">카테고리</h4>
                <ul className="space-y-2 text-gray-500">
                  <li><a href="#" className="hover:text-[#10436b]">LLM</a></li>
                  <li><a href="#" className="hover:text-[#10436b]">기업 AI</a></li>
                  <li><a href="#" className="hover:text-[#10436b]">생성형 AI</a></li>
                  <li><a href="#" className="hover:text-[#10436b]">로보틱스</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">연락처</h4>
                <ul className="space-y-2 text-gray-500">
                  <li>contact@promptdaily.kr</li>
                  <li>서울특별시 강남구</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
            © 2026 Prompt Daily. All rights reserved.
          </div>
        </div>
      </footer>

      {/* 로그인/회원가입 모달 */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAuth(false)}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {authMode === 'login' ? '로그인' : '회원가입'}
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              {authMode === 'login' ? 'Prompt Daily에 로그인하세요' : '새 계정을 만드세요'}
            </p>

            {message && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                messageType === 'success' ? 'bg-green-100 text-green-700' :
                messageType === 'error' ? 'bg-red-100 text-red-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={authMode === 'login' ? handleLogin : handleSignup}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#10436b] focus:border-transparent"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 (6자 이상)"
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#10436b] focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#10436b] text-white font-medium rounded-lg hover:bg-[#0d3555] transition-colors disabled:opacity-50"
              >
                {loading ? '처리 중...' : (authMode === 'login' ? '로그인' : '회원가입')}
              </button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-400">또는</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google로 계속하기
            </button>

            <p className="mt-6 text-center text-sm text-gray-500">
              {authMode === 'login' ? (
                <>계정이 없으신가요? <button onClick={() => setAuthMode('signup')} className="text-[#10436b] font-medium hover:underline">회원가입</button></>
              ) : (
                <>이미 계정이 있으신가요? <button onClick={() => setAuthMode('login')} className="text-[#10436b] font-medium hover:underline">로그인</button></>
              )}
            </p>

            <button onClick={() => { setShowAuth(false); setMessage(''); setEmail(''); setPassword('') }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Google 로그인 모달 */}
      {showGoogleLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowGoogleLogin(false)}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Google로 로그인</h3>
              <p className="text-gray-500">Google 계정 이메일을 입력하세요</p>
            </div>

            {message && (
              <div className={`mb-4 p-3 rounded-lg text-sm text-center ${
                messageType === 'success' ? 'bg-green-100 text-green-700' :
                messageType === 'error' ? 'bg-red-100 text-red-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={processGoogleLogin}>
              <input
                type="email"
                value={googleEmail}
                onChange={(e) => setGoogleEmail(e.target.value)}
                placeholder="example@gmail.com"
                required
                autoFocus
                className="w-full px-4 py-4 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <button
                type="submit"
                className="w-full py-4 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors text-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                계속하기
              </button>
            </form>

            <button onClick={() => { setShowGoogleLogin(false); setMessage(''); setGoogleEmail('') }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 구독 모달 */}
      {showSubscribe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowSubscribe(false)}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#10436b] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">뉴스레터 구독</h3>
              <p className="text-gray-500">매일 아침 AI 뉴스를 이메일로 받아보세요</p>
            </div>

            {message && (
              <div className={`mb-4 p-3 rounded-lg text-sm text-center ${
                messageType === 'success' ? 'bg-green-100 text-green-700' :
                messageType === 'error' ? 'bg-red-100 text-red-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소를 입력하세요"
                required
                className="w-full px-4 py-4 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-[#10436b] focus:border-transparent text-lg"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#10436b] text-white font-medium rounded-xl hover:bg-[#0d3555] transition-colors text-lg disabled:opacity-50"
              >
                {loading ? '처리 중...' : '무료로 구독하기'}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-gray-400">
              구독은 언제든 취소할 수 있습니다
            </p>

            <button onClick={() => { setShowSubscribe(false); setMessage(''); setEmail('') }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
