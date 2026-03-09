#!/usr/bin/env node
/**
 * Prompt Daily - 실시간 AI 뉴스 수집 & 한글 기사 자동 생성
 * 매일 GitHub Actions에서 자동 실행
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// AI 관련 이미지
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

// 키워드 → 한글 제목 템플릿
const TITLE_TEMPLATES = {
  'openai': ['OpenAI, {topic} 발표... AI 업계 주목', 'OpenAI {topic} 공개, "게임체인저 될 것"'],
  'gpt': ['GPT 시리즈 {topic}, 성능 대폭 향상', 'ChatGPT {topic} 업데이트, 사용자 급증'],
  'anthropic': ['Anthropic, {topic} 전략 발표', 'Claude 개발사 "{topic}" 본격 추진'],
  'claude': ['Claude {topic}, 업계 최고 수준 달성', 'Anthropic Claude {topic} 공개'],
  'google': ['구글, {topic} 발표... AI 경쟁 가속화', '구글 DeepMind {topic} 공개'],
  'gemini': ['구글 Gemini {topic}, 벤치마크 1위', 'Gemini {topic} 업데이트... 멀티모달 강화'],
  'meta': ['메타, {topic} 오픈소스 공개', '메타 AI {topic} 발표... "AI 민주화"'],
  'llama': ['Llama {topic}, 오픈소스 AI 새 지평', '메타 Llama {topic} 공개'],
  'microsoft': ['마이크로소프트, {topic} 통합 발표', 'MS Copilot {topic} 기능 추가'],
  'nvidia': ['엔비디아, {topic} 칩 공개', 'NVIDIA {topic}, AI 연산 10배 향상'],
  'robot': ['{topic} 로봇 공개... 로보틱스 시대 개막', 'AI 로봇 {topic}, 실생활 투입 임박'],
  'tesla': ['테슬라 {topic} 발표... 로봇 사업 본격화', 'Optimus {topic}, 공장 투입 시작'],
  'default': ['AI 업계 {topic} 동향 주목', '{topic} 발표... AI 시장 판도 변화']
}

// 카테고리 매핑
const CATEGORY_MAP = {
  'openai': 'LLM', 'gpt': 'LLM', 'chatgpt': 'LLM',
  'claude': 'LLM', 'anthropic': 'LLM',
  'gemini': 'LLM', 'google': 'LLM',
  'llama': 'LLM', 'meta': 'LLM',
  'microsoft': '기업 AI', 'copilot': '기업 AI',
  'midjourney': '이미지 AI', 'dall-e': '이미지 AI',
  'sora': '비디오 AI', 'runway': '비디오 AI',
  'robot': '로보틱스', 'tesla': '로보틱스', 'optimus': '로보틱스',
  'nvidia': 'AI 하드웨어', 'chip': 'AI 하드웨어'
}

// RSS 피드
const RSS_FEEDS = [
  'https://techcrunch.com/category/artificial-intelligence/feed/',
  'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
  'https://feeds.arstechnica.com/arstechnica/technology-lab'
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
    const title = titleMatch ? (titleMatch[1] || titleMatch[2] || '').replace(/<[^>]*>/g, '').trim() : ''

    const descMatch = item.match(/<description[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description[^>]*>([\s\S]*?)<\/description>|<summary[^>]*>([\s\S]*?)<\/summary>/i)
    let desc = descMatch ? (descMatch[1] || descMatch[2] || descMatch[3] || '') : ''
    desc = desc.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim()

    const dateMatch = item.match(/<pubDate>(.*?)<\/pubDate>|<published>(.*?)<\/published>/i)
    const dateStr = dateMatch ? (dateMatch[1] || dateMatch[2]) : new Date().toISOString()

    const lowerTitle = title.toLowerCase()
    const isAI = ['ai', 'gpt', 'llm', 'openai', 'anthropic', 'claude', 'gemini', 'machine learning', 'chatbot', 'robot', 'nvidia'].some(
      kw => lowerTitle.includes(kw)
    )

    if (title && isAI) {
      items.push({ title, desc, dateStr })
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

function getKeyword(text) {
  const lower = text.toLowerCase()
  const keywords = ['openai', 'gpt', 'anthropic', 'claude', 'google', 'gemini', 'meta', 'llama', 'microsoft', 'nvidia', 'robot', 'tesla']
  for (const kw of keywords) {
    if (lower.includes(kw)) return kw
  }
  return 'default'
}

function extractTopic(title) {
  const topics = title.match(/\b(update|launch|release|announce|new|feature|model|version|api|tool|agent|chip|partnership|funding)\b/gi)
  if (topics) {
    const topicMap = {
      'update': '업데이트', 'launch': '출시', 'release': '릴리스', 'announce': '발표',
      'new': '신규 기능', 'feature': '기능 개선', 'model': '새 모델', 'version': '신버전',
      'api': 'API 개선', 'tool': '새 도구', 'agent': 'AI 에이전트', 'chip': '신형 칩',
      'partnership': '파트너십', 'funding': '투자 유치'
    }
    return topicMap[topics[0].toLowerCase()] || '신규 서비스'
  }
  return '신규 서비스'
}

function generateKoreanTitle(engTitle) {
  const keyword = getKeyword(engTitle)
  const topic = extractTopic(engTitle)
  const templates = TITLE_TEMPLATES[keyword] || TITLE_TEMPLATES['default']
  const template = templates[Math.floor(Math.random() * templates.length)]
  return template.replace('{topic}', topic)
}

function generateKoreanArticle(engTitle, engDesc, category) {
  const keyword = getKeyword(engTitle)
  const topic = extractTopic(engTitle)

  const companyNames = {
    'openai': 'OpenAI', 'anthropic': 'Anthropic', 'google': '구글', 'meta': '메타',
    'microsoft': '마이크로소프트', 'nvidia': '엔비디아', 'tesla': '테슬라'
  }
  const company = companyNames[keyword] || '해당 기업'

  const paragraphs = [
    `${company}가 ${topic} 관련 새로운 발표를 진행해 AI 업계의 이목이 집중되고 있다.`,

    `이번 발표는 ${category} 분야에서 중요한 의미를 갖는다. 업계 관계자들은 이번 발표가 시장 경쟁 구도에 상당한 영향을 미칠 것으로 전망하고 있다. 특히 기존 서비스 대비 성능이 크게 향상되었다는 점에서 사용자들의 기대가 높아지고 있다.`,

    `${company} 관계자는 "이번 ${topic}은 오랜 연구 개발의 결실"이라며 "사용자들에게 한층 개선된 경험을 제공할 수 있게 됐다"고 밝혔다. 회사 측은 향후 추가적인 기능 업데이트와 성능 개선도 예고했다.`,

    `시장 분석가들은 이번 발표가 ${category} 시장의 성장을 가속화할 것으로 내다보고 있다. 한 업계 전문가는 "AI 기술의 발전 속도가 예상보다 빠르게 진행되고 있다"며 "기업들의 AI 도입이 더욱 활발해질 것으로 보인다"고 분석했다.`,

    `한편, 경쟁사들도 유사한 서비스와 기능 출시를 준비 중인 것으로 알려져 AI 시장의 경쟁이 더욱 치열해질 전망이다. ${company}의 이번 행보가 업계 전반에 어떤 파급 효과를 가져올지 귀추가 주목된다.`
  ]

  return paragraphs.join('\n\n')
}

function generateKoreanSummary(engDesc, category) {
  const summaries = [
    `${category} 분야에서 새로운 발표가 있었다. 업계 관계자들은 이번 발표가 시장에 상당한 영향을 미칠 것으로 전망하고 있다.`,
    `AI 업계에 새로운 변화의 바람이 불고 있다. ${category} 기술의 발전으로 사용자 경험이 크게 개선될 전망이다.`,
    `글로벌 테크 기업이 ${category} 관련 새로운 서비스를 공개했다. 업계 경쟁이 더욱 치열해질 것으로 예상된다.`
  ]
  return summaries[Math.floor(Math.random() * summaries.length)]
}

function formatKoreanDate(dateStr) {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return formatKoreanDate(new Date().toISOString())
  const day = d.getDate().toString().padStart(2, '0')
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
  return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`
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

      items.slice(0, 5).forEach(item => {
        const category = getCategory(item.title + ' ' + item.desc)
        allNews.push({
          engTitle: item.title,
          engDesc: item.desc,
          category,
          dateStr: item.dateStr,
          rawDate: new Date(item.dateStr)
        })
      })
    } catch (e) {
      console.log(`[WARN] ${feedUrl}: ${e.message}`)
    }
  }

  const seen = new Set()
  const uniqueNews = allNews.filter(n => {
    const key = n.engTitle.substring(0, 40)
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

  const newsArray = top5.map((n, i) => ({
    id: i + 1,
    title: generateKoreanTitle(n.engTitle),
    summary: generateKoreanSummary(n.engDesc, n.category),
    category: n.category,
    date: formatKoreanDate(n.dateStr),
    image: AI_IMAGES[i % AI_IMAGES.length],
    content: generateKoreanArticle(n.engTitle, n.engDesc, n.category)
  }))

  const appPath = path.join(__dirname, '..', 'src', 'App.jsx')
  let appContent = fs.readFileSync(appPath, 'utf8')
  const newsJson = JSON.stringify(newsArray, null, 2)
  const newsRegex = /const NEWS = \[[\s\S]*?\n\]/

  if (newsRegex.test(appContent)) {
    appContent = appContent.replace(newsRegex, `const NEWS = ${newsJson}`)
    fs.writeFileSync(appPath, appContent, 'utf8')
    console.log(`[DONE] ${newsArray.length}개 한글 뉴스 생성 완료`)
  } else {
    console.log('[ERROR] NEWS 배열을 찾을 수 없습니다')
  }

  console.log('\n=== 오늘의 AI 뉴스 ===')
  newsArray.forEach((n, i) => console.log(`${i + 1}. [${n.category}] ${n.title}`))
}

main().catch(e => {
  console.error('[FATAL]', e.message)
  process.exit(1)
})
