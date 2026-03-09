#!/usr/bin/env node
/**
 * Prompt Daily - 실시간 AI 뉴스 수집 & App.jsx 자동 업데이트
 * 매일 GitHub Actions에서 실행됨
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// AI 관련 이미지 풀
const AI_IMAGES = [
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600',
  'https://images.unsplash.com/photo-1686191128892-3b37add4683e?w=600',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600'
]

// 카테고리 매핑
const CATEGORY_MAP = {
  'openai': 'LLM',
  'gpt': 'LLM',
  'claude': 'LLM',
  'anthropic': 'LLM',
  'gemini': 'LLM',
  'llama': 'LLM',
  'meta': 'LLM',
  'google': 'LLM',
  'microsoft': '기업 AI',
  'midjourney': '이미지 AI',
  'dall-e': '이미지 AI',
  'stable diffusion': '이미지 AI',
  'sora': '비디오 AI',
  'robot': '로보틱스',
  'tesla': '로보틱스',
  'optimus': '로보틱스',
  'chip': '하드웨어',
  'nvidia': '하드웨어',
  'default': 'AI 일반'
}

// RSS 피드 목록
const RSS_FEEDS = [
  'https://techcrunch.com/category/artificial-intelligence/feed/',
  'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
  'https://feeds.arstechnica.com/arstechnica/technology-lab'
]

// HTTP/HTTPS GET
function fetchUrl(url, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const req = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 PromptDaily/2.0',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*'
      },
      timeout
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchUrl(res.headers.location, timeout).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`))
      }
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(data))
    })
    req.on('error', reject)
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')) })
  })
}

// RSS XML 파싱
function parseRSS(xml) {
  const items = []
  const itemRegex = /<item>([\s\S]*?)<\/item>|<entry>([\s\S]*?)<\/entry>/gi
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1] || match[2]

    // 제목 추출
    const titleMatch = item.match(/<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>|<title[^>]*>(.*?)<\/title>/i)
    const title = titleMatch ? (titleMatch[1] || titleMatch[2] || '').replace(/<[^>]*>/g, '').trim() : ''

    // 설명 추출
    const descMatch = item.match(/<description[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description[^>]*>([\s\S]*?)<\/description>|<summary[^>]*>([\s\S]*?)<\/summary>|<content[^>]*>([\s\S]*?)<\/content>/i)
    let desc = descMatch ? (descMatch[1] || descMatch[2] || descMatch[3] || descMatch[4] || '') : ''
    desc = desc.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim()

    // 날짜 추출
    const dateMatch = item.match(/<pubDate>(.*?)<\/pubDate>|<published>(.*?)<\/published>|<updated>(.*?)<\/updated>/i)
    const dateStr = dateMatch ? (dateMatch[1] || dateMatch[2] || dateMatch[3]) : new Date().toISOString()

    // AI 관련 필터링
    const lowerTitle = title.toLowerCase()
    const lowerDesc = desc.toLowerCase()
    const isAI = ['ai', 'artificial intelligence', 'gpt', 'llm', 'openai', 'anthropic', 'claude',
                  'gemini', 'machine learning', 'neural', 'deep learning', 'chatbot', 'robot',
                  'midjourney', 'stable diffusion', 'nvidia', 'chip', 'model'].some(
      keyword => lowerTitle.includes(keyword) || lowerDesc.includes(keyword)
    )

    if (title && isAI) {
      items.push({ title, desc, dateStr })
    }
  }
  return items
}

// 카테고리 결정
function getCategory(title) {
  const lower = title.toLowerCase()
  for (const [keyword, category] of Object.entries(CATEGORY_MAP)) {
    if (lower.includes(keyword)) return category
  }
  return 'AI 일반'
}

// 한글 날짜 포맷
function formatKoreanDate(dateStr) {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return formatKoreanDate(new Date().toISOString())
  const day = d.getDate().toString().padStart(2, '0')
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
  const month = months[d.getMonth()]
  const year = d.getFullYear()
  return `${day} ${month} ${year}`
}

// 콘텐츠 생성 (요약 확장)
function generateContent(title, desc) {
  const summary = desc.substring(0, 200)
  return `${title}\n\n${desc}\n\n이 기사는 Prompt Daily가 자동으로 수집한 AI 관련 최신 뉴스입니다.`
}

async function main() {
  console.log('[START] Prompt Daily 뉴스 수집 시작')
  console.log(`[TIME] ${new Date().toISOString()}`)

  const allNews = []

  // RSS 피드에서 뉴스 수집
  for (const feedUrl of RSS_FEEDS) {
    try {
      console.log(`[FETCH] ${feedUrl}`)
      const xml = await fetchUrl(feedUrl)
      const items = parseRSS(xml)
      console.log(`[OK] ${items.length}개 AI 뉴스 발견`)

      items.slice(0, 5).forEach(item => {
        allNews.push({
          title: item.title,
          summary: item.desc.substring(0, 150) + (item.desc.length > 150 ? '...' : ''),
          category: getCategory(item.title),
          date: formatKoreanDate(item.dateStr),
          content: generateContent(item.title, item.desc),
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
    const key = n.title.substring(0, 50)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  // 최신순 정렬, 5개 선택
  uniqueNews.sort((a, b) => b.rawDate - a.rawDate)
  const top5 = uniqueNews.slice(0, 5)

  // 뉴스가 없으면 기본 뉴스 유지
  if (top5.length === 0) {
    console.log('[WARN] 수집된 뉴스가 없습니다. 기존 뉴스 유지.')
    return
  }

  // NEWS 배열 생성
  const newsArray = top5.map((n, i) => ({
    id: i + 1,
    title: n.title,
    summary: n.summary,
    category: n.category,
    date: n.date,
    image: AI_IMAGES[i % AI_IMAGES.length],
    content: n.content
  }))

  // App.jsx 업데이트
  const appPath = path.join(__dirname, '..', 'src', 'App.jsx')
  let appContent = fs.readFileSync(appPath, 'utf8')

  // NEWS 배열 교체 (정규식으로 const NEWS = [...] 전체 매칭)
  const newsJson = JSON.stringify(newsArray, null, 2)
    .replace(/"/g, '"')  // 유니코드 이스케이프 방지

  const newsRegex = /const NEWS = \[[\s\S]*?\n\]/
  if (newsRegex.test(appContent)) {
    appContent = appContent.replace(newsRegex, `const NEWS = ${newsJson}`)
    fs.writeFileSync(appPath, appContent, 'utf8')
    console.log(`[DONE] ${newsArray.length}개 뉴스로 App.jsx 업데이트 완료`)
  } else {
    console.log('[ERROR] NEWS 배열을 찾을 수 없습니다')
  }

  // 결과 출력
  console.log('\n=== 오늘의 AI 뉴스 ===')
  newsArray.forEach((n, i) => {
    console.log(`${i + 1}. [${n.category}] ${n.title.substring(0, 60)}...`)
  })
}

main().catch(e => {
  console.error('[FATAL]', e.message)
  process.exit(1)
})
