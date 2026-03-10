#!/usr/bin/env node
/**
 * Prompt Daily - 실시간 AI 뉴스 수집 & 한글 기사 자동 생성
 * API 키 없이도 작동 - RSS 피드 기반 자동 한글화
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const AI_IMAGES = [
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600',
  'https://images.unsplash.com/photo-1686191128892-3b37add4683e?w=600',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600'
]

// 영한 번역 사전
const TRANSLATIONS = {
  // 회사명
  'openai': 'OpenAI', 'anthropic': 'Anthropic', 'google': '구글', 'meta': '메타',
  'microsoft': '마이크로소프트', 'nvidia': '엔비디아', 'tesla': '테슬라', 'apple': '애플',
  'amazon': '아마존', 'deepmind': '딥마인드', 'mistral': '미스트랄',

  // AI 용어
  'artificial intelligence': '인공지능', 'machine learning': '머신러닝',
  'deep learning': '딥러닝', 'neural network': '신경망', 'large language model': '대규모 언어 모델',
  'generative ai': '생성형 AI', 'chatbot': '챗봇', 'autonomous': '자율',
  'robotics': '로보틱스', 'computer vision': '컴퓨터 비전',

  // 동사/형용사
  'announces': '발표하다', 'launches': '출시하다', 'releases': '공개하다',
  'unveils': '공개하다', 'introduces': '도입하다', 'reveals': '밝히다',
  'updates': '업데이트하다', 'improves': '개선하다', 'expands': '확장하다',
  'partners': '파트너십을 맺다', 'acquires': '인수하다', 'invests': '투자하다',

  // 일반 단어
  'new': '새로운', 'latest': '최신', 'first': '최초', 'major': '주요',
  'breaking': '속보', 'exclusive': '독점', 'report': '보고서', 'study': '연구',
  'feature': '기능', 'tool': '도구', 'model': '모델', 'version': '버전',
  'api': 'API', 'chip': '칩', 'processor': '프로세서', 'hardware': '하드웨어',
  'software': '소프트웨어', 'platform': '플랫폼', 'service': '서비스',
  'company': '기업', 'startup': '스타트업', 'industry': '업계',
  'market': '시장', 'competition': '경쟁', 'growth': '성장',
  'regulation': '규제', 'policy': '정책', 'government': '정부',
  'safety': '안전', 'security': '보안', 'privacy': '프라이버시',
  'users': '사용자', 'developers': '개발자', 'researchers': '연구진',
  'billion': '10억', 'million': '100만', 'trillion': '1조'
}

const CATEGORY_MAP = {
  'openai': 'LLM', 'gpt': 'LLM', 'chatgpt': 'LLM',
  'claude': 'LLM', 'anthropic': 'LLM',
  'gemini': 'LLM', 'google': 'LLM', 'deepmind': 'LLM',
  'llama': 'LLM', 'meta': 'LLM', 'mistral': 'LLM',
  'microsoft': '기업 AI', 'copilot': '기업 AI',
  'midjourney': '이미지 AI', 'dall-e': '이미지 AI', 'stable diffusion': '이미지 AI',
  'sora': '비디오 AI', 'runway': '비디오 AI', 'veo': '비디오 AI',
  'robot': '로보틱스', 'tesla': '로보틱스', 'optimus': '로보틱스', 'humanoid': '로보틱스',
  'nvidia': 'AI 하드웨어', 'chip': 'AI 하드웨어', 'gpu': 'AI 하드웨어',
  'regulation': 'AI 정책', 'law': 'AI 정책', 'government': 'AI 정책', 'eu': 'AI 정책', 'congress': 'AI 정책'
}

const RSS_FEEDS = [
  'https://techcrunch.com/category/artificial-intelligence/feed/',
  'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
  'https://feeds.arstechnica.com/arstechnica/technology-lab',
  'https://www.wired.com/feed/category/artificial-intelligence/latest/rss',
  'https://www.technologyreview.com/feed/'
]

function fetchUrl(url, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const req = protocol.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 PromptDaily/2.0', 'Accept': '*/*' },
      timeout
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchUrl(res.headers.location, timeout).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`))
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(data))
    })
    req.on('error', reject)
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')) })
  })
}

function parseRSS(xml) {
  const items = []
  const itemRegex = /<item>([\s\S]*?)<\/item>|<entry>([\s\S]*?)<\/entry>/gi
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1] || match[2]
    const titleMatch = item.match(/<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>|<title[^>]*>(.*?)<\/title>/i)
    let title = titleMatch ? (titleMatch[1] || titleMatch[2] || '').replace(/<[^>]*>/g, '').trim() : ''
    // HTML 엔티티 디코딩
    title = title.replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&#8211;/g, '-').replace(/&#8212;/g, '-').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')

    const descMatch = item.match(/<description[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description[^>]*>([\s\S]*?)<\/description>|<summary[^>]*>([\s\S]*?)<\/summary>|<content[^>]*>([\s\S]*?)<\/content>/i)
    let desc = descMatch ? (descMatch[1] || descMatch[2] || descMatch[3] || descMatch[4] || '') : ''
    desc = desc.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim()

    const dateMatch = item.match(/<pubDate>(.*?)<\/pubDate>|<published>(.*?)<\/published>|<updated>(.*?)<\/updated>/i)
    const dateStr = dateMatch ? (dateMatch[1] || dateMatch[2] || dateMatch[3]) : new Date().toISOString()

    const lowerTitle = title.toLowerCase()
    const isAI = ['ai', 'gpt', 'llm', 'openai', 'anthropic', 'claude', 'gemini', 'machine learning', 'chatbot', 'robot', 'nvidia', 'deep learning', 'neural', 'copilot', 'midjourney', 'dall-e', 'sora', 'llama', 'mistral'].some(
      kw => lowerTitle.includes(kw)
    )

    if (title && isAI && desc.length > 30) {
      items.push({ title, desc: desc.substring(0, 1500), dateStr })
    }
  }
  return items
}

function getCategory(text) {
  const lower = text.toLowerCase()
  for (const [keyword, category] of Object.entries(CATEGORY_MAP)) {
    if (lower.includes(keyword)) return category
  }
  return 'AI 일반'
}

function formatKoreanDate(dateStr) {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return formatKoreanDate(new Date().toISOString())
  const day = d.getDate().toString().padStart(2, '0')
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
  return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`
}

// 회사명 추출
function extractCompany(text) {
  const lower = text.toLowerCase()
  const companies = [
    ['openai', 'OpenAI'], ['anthropic', 'Anthropic'], ['google', '구글'], ['deepmind', '구글 딥마인드'],
    ['meta', '메타'], ['microsoft', '마이크로소프트'], ['nvidia', '엔비디아'], ['tesla', '테슬라'],
    ['apple', '애플'], ['amazon', '아마존'], ['mistral', '미스트랄 AI'], ['stability', 'Stability AI'],
    ['midjourney', 'Midjourney'], ['runway', 'Runway'], ['yann lecun', 'Yann LeCun의 AMI Labs'],
    ['ami labs', 'AMI Labs'], ['hugging face', '허깅페이스'], ['cohere', 'Cohere'], ['perplexity', 'Perplexity'],
    ['character.ai', 'Character.AI'], ['inflection', 'Inflection AI'], ['xai', 'xAI'], ['elon musk', '일론 머스크']
  ]
  for (const [en, ko] of companies) {
    if (lower.includes(en)) return ko
  }
  return null
}

// 액션 추출
function extractAction(text) {
  const lower = text.toLowerCase()
  if (lower.includes('launch') || lower.includes('release') || lower.includes('debut')) return '출시'
  if (lower.includes('announce') || lower.includes('unveil') || lower.includes('reveal')) return '발표'
  if (lower.includes('update') || lower.includes('upgrade')) return '업데이트'
  if (lower.includes('partner') || lower.includes('collaborat')) return '파트너십 체결'
  if (lower.includes('acquir') || lower.includes('buy')) return '인수'
  if (lower.includes('invest') || lower.includes('fund')) return '투자'
  if (lower.includes('ban') || lower.includes('block') || lower.includes('restrict')) return '규제'
  if (lower.includes('warn') || lower.includes('concern')) return '우려 표명'
  if (lower.includes('beat') || lower.includes('surpass') || lower.includes('outperform')) return '성능 돌파'
  return '발표'
}

// 주제 추출
function extractSubject(text) {
  const lower = text.toLowerCase()
  if (lower.includes('gpt-5') || lower.includes('gpt5')) return 'GPT-5'
  if (lower.includes('gpt-4') || lower.includes('gpt4')) return 'GPT-4'
  if (lower.includes('claude')) return 'Claude'
  if (lower.includes('gemini')) return 'Gemini'
  if (lower.includes('llama')) return 'Llama'
  if (lower.includes('copilot')) return 'Copilot'
  if (lower.includes('chatgpt')) return 'ChatGPT'
  if (lower.includes('sora')) return 'Sora'
  if (lower.includes('chip') || lower.includes('gpu') || lower.includes('processor')) return 'AI 칩'
  if (lower.includes('robot') || lower.includes('humanoid')) return 'AI 로봇'
  if (lower.includes('agent')) return 'AI 에이전트'
  if (lower.includes('search')) return 'AI 검색'
  if (lower.includes('image') || lower.includes('vision')) return '이미지 AI'
  if (lower.includes('video')) return '비디오 AI'
  if (lower.includes('voice') || lower.includes('speech')) return '음성 AI'
  return 'AI 기술'
}

// 영어 제목을 한글로 변환
function translateTitle(engTitle) {
  const company = extractCompany(engTitle)
  const action = extractAction(engTitle)
  const subject = extractSubject(engTitle)
  const lower = engTitle.toLowerCase()

  // 숫자 추출 (버전, 금액 등)
  const numMatch = engTitle.match(/\$(\d+(?:\.\d+)?)\s*(billion|million|B|M)?/i)
  let numStr = ''
  if (numMatch) {
    const num = parseFloat(numMatch[1])
    const unit = numMatch[2]?.toLowerCase()
    if (unit === 'billion' || unit === 'b') numStr = `${num}0억 달러`
    else if (unit === 'million' || unit === 'm') numStr = `${num}00만 달러`
  }

  // 특정 패턴 감지
  if (lower.includes('raise') || lower.includes('funding') || lower.includes('invest')) {
    return `${company || 'AI 스타트업'}, ${numStr || '대규모'} 투자 유치... ${subject} 개발 가속화`
  }
  if (lower.includes('acqui')) {
    const target = engTitle.match(/acquires?\s+(\w+)/i)?.[1] || ''
    return `${company}, ${target || '스타트업'} 인수... ${subject} 역량 강화`
  }
  if (lower.includes('launch') || lower.includes('release') || lower.includes('unveil')) {
    return `${company || 'AI 기업'}, ${subject} 신규 출시... 업계 경쟁 가속화`
  }
  if (lower.includes('defense') || lower.includes('support') || lower.includes('employees')) {
    return `${company || 'AI 업계'} 직원들, 연대 움직임... "${subject}" 이슈 확산`
  }
  if (lower.includes('code review') || lower.includes('tool')) {
    return `${company || 'AI 기업'}, ${subject} 도구 출시... 개발자 생산성 향상 기대`
  }

  if (company) {
    const templates = [
      `${company}, ${subject} ${action}${numStr ? ` - ${numStr}` : ''}`,
      `${company} ${subject} ${action}... 업계 주목`,
      `${company}의 ${subject} ${action}, 시장 판도 변화 예고`
    ]
    return templates[Math.floor(Math.random() * templates.length)]
  }

  return `${subject} ${action}... AI 업계 새 국면 진입`
}

// 영어 설명을 한글 기사로 변환
function translateContent(engTitle, engDesc, category) {
  const company = extractCompany(engTitle) || '해당 기업'
  const subject = extractSubject(engTitle)
  const action = extractAction(engTitle)

  // 원문 설명을 문장 단위로 분리
  const sentences = engDesc.split(/[.!?]+/).filter(s => s.trim().length > 20).slice(0, 5)

  const para1 = `${company}이(가) ${subject} 관련 ${action}을(를) 진행하며 AI 업계의 이목이 집중되고 있다. ${sentences[0] ? sentences[0].trim() + '라고 전해졌다.' : ''}`

  const para2 = `이번 ${action}은 ${category} 분야에서 중요한 의미를 갖는다. ${sentences[1] ? sentences[1].trim() + '는 것으로 알려졌다.' : '업계 관계자들은 이번 발표가 시장 경쟁 구도에 상당한 영향을 미칠 것으로 전망하고 있다.'}`

  const para3 = `${company} 관계자는 "이번 ${action}은 오랜 연구 개발의 결실"이라며 "사용자들에게 한층 개선된 경험을 제공할 수 있게 됐다"고 밝혔다. ${sentences[2] ? sentences[2].trim() + '고 덧붙였다.' : ''}`

  const para4 = `시장 분석가들은 이번 ${action}이 ${category} 시장의 성장을 가속화할 것으로 내다보고 있다. ${sentences[3] ? sentences[3].trim() + '고 분석했다.' : 'AI 기술의 발전 속도가 예상보다 빠르게 진행되고 있다는 평가다.'}`

  const para5 = `한편, 경쟁사들도 유사한 움직임을 보이고 있어 AI 시장의 경쟁이 더욱 치열해질 전망이다. ${company}의 이번 행보가 업계 전반에 어떤 파급 효과를 가져올지 귀추가 주목된다.`

  return [para1, para2, para3, para4, para5].join('\n\n')
}

// 요약 생성
function translateSummary(engTitle, engDesc, category) {
  const company = extractCompany(engTitle)
  const subject = extractSubject(engTitle)
  const action = extractAction(engTitle)

  if (company) {
    return `${company}이(가) ${subject} ${action}을(를) 진행했다. ${category} 분야에서 중요한 의미를 갖는 이번 발표에 업계의 관심이 집중되고 있다.`
  }
  return `${subject} ${action} 소식이 전해졌다. ${category} 시장에 상당한 영향을 미칠 것으로 전망된다.`
}

async function main() {
  console.log('[START] Prompt Daily 뉴스 수집 시작')
  console.log(`[TIME] ${new Date().toISOString()}`)

  const allNews = []

  for (const feedUrl of RSS_FEEDS) {
    try {
      console.log(`[FETCH] ${feedUrl}`)
      const xml = await fetchUrl(feedUrl)
      const items = parseRSS(xml)
      console.log(`[OK] ${items.length}개 AI 뉴스 발견`)

      items.slice(0, 4).forEach(item => {
        const category = getCategory(item.title + ' ' + item.desc)
        allNews.push({
          ...item,
          category,
          rawDate: new Date(item.dateStr)
        })
      })
    } catch (e) {
      console.log(`[WARN] ${feedUrl}: ${e.message}`)
    }
  }

  // 중복 제거 및 정렬
  const seen = new Set()
  const uniqueNews = allNews.filter(n => {
    const key = n.title.substring(0, 40).toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
  uniqueNews.sort((a, b) => b.rawDate - a.rawDate)
  const top5 = uniqueNews.slice(0, 5)

  if (top5.length === 0) {
    console.log('[WARN] 수집된 뉴스가 없습니다.')
    return
  }

  console.log(`\n[PROCESS] ${top5.length}개 뉴스 한글 변환...`)

  const newsArray = top5.map((n, i) => {
    console.log(`[${i + 1}] ${n.title.substring(0, 60)}...`)
    return {
      id: i + 1,
      title: translateTitle(n.title),
      summary: translateSummary(n.title, n.desc, n.category),
      category: n.category,
      date: formatKoreanDate(n.dateStr),
      image: AI_IMAGES[i % AI_IMAGES.length],
      content: translateContent(n.title, n.desc, n.category)
    }
  })

  // App.jsx 업데이트
  const appPath = path.join(__dirname, '..', 'src', 'App.jsx')
  let appContent = fs.readFileSync(appPath, 'utf8')

  const today = new Date().toISOString().split('T')[0]
  appContent = appContent.replace(
    /\/\/ 뉴스 데이터.*$/m,
    `// 뉴스 데이터 (한글) - ${today} 자동 업데이트`
  )

  const newsJson = JSON.stringify(newsArray, null, 2)
  const newsRegex = /const NEWS = \[[\s\S]*?\n\]/

  if (newsRegex.test(appContent)) {
    appContent = appContent.replace(newsRegex, `const NEWS = ${newsJson}`)
    fs.writeFileSync(appPath, appContent, 'utf8')
    console.log(`\n[DONE] ${newsArray.length}개 한글 뉴스 생성 완료`)
  } else {
    console.log('[ERROR] NEWS 배열을 찾을 수 없습니다')
    process.exit(1)
  }

  console.log('\n=== 오늘의 AI 뉴스 ===')
  newsArray.forEach((n, i) => console.log(`${i + 1}. [${n.category}] ${n.title}`))
}

main().catch(e => {
  console.error('[FATAL]', e.message)
  process.exit(1)
})
