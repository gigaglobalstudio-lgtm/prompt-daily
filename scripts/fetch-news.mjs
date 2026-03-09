#!/usr/bin/env node
/**
 * Prompt Daily - 뉴스 자동 수집 & App.jsx 업데이트
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// RSS 피드
const RSS_FEEDS = [
  { url: 'https://techcrunch.com/category/artificial-intelligence/feed/', category: '기업 AI' },
  { url: 'https://venturebeat.com/category/ai/feed/', category: 'LLM' }
]

// HTTP GET
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'PromptDaily/1.0' }, timeout: 10000 }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject)
      }
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(data))
    }).on('error', reject)
  })
}

// RSS 파싱
function parseRSS(xml) {
  const items = []
  const regex = /<item>([\s\S]*?)<\/item>/g
  let match
  while ((match = regex.exec(xml)) !== null) {
    const item = match[1]
    const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)
    const desc = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description>([\s\S]*?)<\/description>/)
    const date = item.match(/<pubDate>(.*?)<\/pubDate>/)

    if (title) {
      items.push({
        title: (title[1] || title[2] || '').replace(/<[^>]*>/g, '').trim(),
        summary: (desc ? (desc[1] || desc[2] || '') : '').replace(/<[^>]*>/g, '').substring(0, 150).trim(),
        date: date ? new Date(date[1]).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      })
    }
  }
  return items
}

async function main() {
  console.log('[START] 뉴스 수집 시작')

  const allNews = []

  for (const feed of RSS_FEEDS) {
    try {
      console.log(`[FETCH] ${feed.url}`)
      const xml = await fetchUrl(feed.url)
      const items = parseRSS(xml)
      items.slice(0, 3).forEach((item, i) => {
        allNews.push({
          id: allNews.length + 1,
          title: item.title,
          summary: item.summary || item.title,
          category: feed.category,
          date: item.date
        })
      })
      console.log(`[OK] ${items.length}개 발견`)
    } catch (e) {
      console.log(`[ERR] ${e.message}`)
    }
  }

  // 최신순 정렬, 5개만
  const top5 = allNews.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
  top5.forEach((n, i) => n.id = i + 1)

  // App.jsx 업데이트
  const appPath = path.join(__dirname, '..', 'src', 'App.jsx')
  let appContent = fs.readFileSync(appPath, 'utf8')

  // NEWS_DATA 배열 교체
  const newsJson = JSON.stringify(top5, null, 2)
  appContent = appContent.replace(
    /const NEWS_DATA = \[[\s\S]*?\n\]/,
    `const NEWS_DATA = ${newsJson}`
  )

  fs.writeFileSync(appPath, appContent, 'utf8')

  console.log(`[DONE] ${top5.length}개 뉴스 업데이트 완료`)
  top5.forEach((n, i) => console.log(`  ${i+1}. ${n.title.substring(0, 50)}...`))
}

main().catch(console.error)
