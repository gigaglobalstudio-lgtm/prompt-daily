#!/usr/bin/env node
/**
 * Prompt Daily - 실시간 AI 뉴스 수집 & 한글 기사 자동 생성
 * Anthropic Claude API를 사용하여 실제 뉴스 내용 기반 한글 기사 작성
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

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

const CATEGORY_MAP = {
  'openai': 'LLM', 'gpt': 'LLM', 'chatgpt': 'LLM',
  'claude': 'LLM', 'anthropic': 'LLM',
  'gemini': 'LLM', 'google': 'LLM', 'deepmind': 'LLM',
  'llama': 'LLM', 'meta': 'LLM',
  'microsoft': '기업 AI', 'copilot': '기업 AI',
  'midjourney': '이미지 AI', 'dall-e': '이미지 AI', 'stable diffusion': '이미지 AI',
  'sora': '비디오 AI', 'runway': '비디오 AI', 'veo': '비디오 AI',
  'robot': '로보틱스', 'tesla': '로보틱스', 'optimus': '로보틱스', 'humanoid': '로보틱스',
  'nvidia': 'AI 하드웨어', 'chip': 'AI 하드웨어', 'gpu': 'AI 하드웨어',
  'regulation': 'AI 정책', 'law': 'AI 정책', 'government': 'AI 정책', 'eu': 'AI 정책'
}

const RSS_FEEDS = [
  'https://techcrunch.com/category/artificial-intelligence/feed/',
  'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
  'https://feeds.arstechnica.com/arstechnica/technology-lab',
  'https://venturebeat.com/category/ai/feed/'
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

function postJson(url, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    const postData = JSON.stringify(data)

    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      }
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          reject(new Error('JSON parse error: ' + data.substring(0, 200)))
        }
      })
    })

    req.on('error', reject)
    req.write(postData)
    req.end()
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

    const descMatch = item.match(/<description[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description[^>]*>([\s\S]*?)<\/description>|<summary[^>]*>([\s\S]*?)<\/summary>|<content[^>]*>([\s\S]*?)<\/content>/i)
    let desc = descMatch ? (descMatch[1] || descMatch[2] || descMatch[3] || descMatch[4] || '') : ''
    desc = desc.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim()

    const dateMatch = item.match(/<pubDate>(.*?)<\/pubDate>|<published>(.*?)<\/published>|<updated>(.*?)<\/updated>/i)
    const dateStr = dateMatch ? (dateMatch[1] || dateMatch[2] || dateMatch[3]) : new Date().toISOString()

    const linkMatch = item.match(/<link[^>]*href="([^"]+)"|<link>([^<]+)<\/link>/i)
    const link = linkMatch ? (linkMatch[1] || linkMatch[2] || '') : ''

    const lowerTitle = title.toLowerCase()
    const isAI = ['ai', 'gpt', 'llm', 'openai', 'anthropic', 'claude', 'gemini', 'machine learning', 'chatbot', 'robot', 'nvidia', 'deep learning', 'neural', 'copilot', 'midjourney', 'dall-e', 'sora', 'llama'].some(
      kw => lowerTitle.includes(kw)
    )

    if (title && isAI && desc.length > 50) {
      items.push({ title, desc: desc.substring(0, 1000), dateStr, link })
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

async function generateKoreanArticle(newsItem) {
  if (!ANTHROPIC_API_KEY) {
    console.log('[WARN] ANTHROPIC_API_KEY 없음 - 기본 번역 사용')
    return {
      title: newsItem.title,
      summary: newsItem.desc.substring(0, 150) + '...',
      content: newsItem.desc
    }
  }

  const prompt = `당신은 AI 전문 기자입니다. 아래 영문 뉴스를 바탕으로 한글 기사를 작성하세요.

원문 제목: ${newsItem.title}
원문 내용: ${newsItem.desc}

다음 JSON 형식으로만 응답하세요 (마크다운 없이):
{
  "title": "한글 제목 (50자 이내, 임팩트 있게)",
  "summary": "2-3문장 요약",
  "content": "5개 문단의 상세 기사 (각 문단은 \\n\\n으로 구분)"
}

기사 작성 규칙:
1. 제목은 핵심 내용을 명확히 전달
2. 기사 내용은 사실에 기반하여 작성
3. 전문 용어는 한글로 자연스럽게 번역
4. 업계 맥락과 의미를 추가
5. 마지막 문단은 전망이나 영향 분석`

  try {
    const response = await postJson('https://api.anthropic.com/v1/messages', {
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }]
    })

    if (response.content && response.content[0] && response.content[0].text) {
      const text = response.content[0].text.trim()
      // JSON 추출 (마크다운 코드블록 제거)
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
    }
    throw new Error('Invalid response format')
  } catch (e) {
    console.log(`[WARN] API 호출 실패: ${e.message}`)
    return {
      title: newsItem.title,
      summary: newsItem.desc.substring(0, 150) + '...',
      content: newsItem.desc
    }
  }
}

async function main() {
  console.log('[START] Prompt Daily 뉴스 수집 시작')
  console.log(`[TIME] ${new Date().toISOString()}`)
  console.log(`[API] ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY ? '설정됨' : '없음'}`)

  const allNews = []

  for (const feedUrl of RSS_FEEDS) {
    try {
      console.log(`[FETCH] ${feedUrl}`)
      const xml = await fetchUrl(feedUrl)
      const items = parseRSS(xml)
      console.log(`[OK] ${items.length}개 AI 뉴스 발견`)

      items.slice(0, 3).forEach(item => {
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

  console.log(`\n[PROCESS] ${top5.length}개 뉴스 한글 변환 시작...`)

  const newsArray = []
  for (let i = 0; i < top5.length; i++) {
    const n = top5[i]
    console.log(`[${i + 1}/${top5.length}] ${n.title.substring(0, 50)}...`)

    const korean = await generateKoreanArticle(n)

    newsArray.push({
      id: i + 1,
      title: korean.title,
      summary: korean.summary,
      category: n.category,
      date: formatKoreanDate(n.dateStr),
      image: AI_IMAGES[i % AI_IMAGES.length],
      content: korean.content
    })

    // API 호출 간격 조절
    if (ANTHROPIC_API_KEY && i < top5.length - 1) {
      await new Promise(r => setTimeout(r, 1000))
    }
  }

  // App.jsx 업데이트
  const appPath = path.join(__dirname, '..', 'src', 'App.jsx')
  let appContent = fs.readFileSync(appPath, 'utf8')

  // 날짜 주석 업데이트
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
