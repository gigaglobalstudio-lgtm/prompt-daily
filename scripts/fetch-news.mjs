#!/usr/bin/env node
/**
 * Prompt Daily - AI News Fetcher
 * RSS 피드에서 최신 AI 뉴스를 수집하여 news.json 업데이트
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// AI 뉴스 RSS 피드 소스
const RSS_FEEDS = [
  {
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    name: 'TechCrunch AI',
    category: '기업 AI'
  },
  {
    url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
    name: 'The Verge AI',
    category: 'LLM'
  },
  {
    url: 'https://venturebeat.com/category/ai/feed/',
    name: 'VentureBeat AI',
    category: '스타트업'
  }
];

// 카테고리 매핑
const CATEGORIES = ['LLM', '이미지 AI', '비디오 AI', '로보틱스', '기업 AI', '스타트업'];

// HTTP GET 요청
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'PromptDaily/1.0 (https://github.com/gigaglobalstudio-lgtm/prompt-daily)'
      },
      timeout: 10000
    };

    https.get(url, options, (res) => {
      // 리다이렉트 처리
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// RSS XML 파싱 (간단 버전)
function parseRSS(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];

    const title = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/);
    const link = itemXml.match(/<link>(.*?)<\/link>/);
    const description = itemXml.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description>([\s\S]*?)<\/description>/);
    const pubDate = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);

    if (title) {
      const cleanTitle = (title[1] || title[2] || '').replace(/<[^>]*>/g, '').trim();
      const cleanDesc = (description ? (description[1] || description[2] || '') : '')
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .substring(0, 200)
        .trim();

      if (cleanTitle) {
        items.push({
          title: cleanTitle,
          link: link ? link[1] : '',
          description: cleanDesc || cleanTitle,
          pubDate: pubDate ? new Date(pubDate[1]).toISOString() : new Date().toISOString()
        });
      }
    }
  }

  return items;
}

// 뉴스 데이터 생성
function createNewsItem(item, index, category) {
  const id = Date.now().toString() + index.toString().padStart(3, '0');

  return {
    id,
    title: item.title,
    summary: item.description || item.title,
    category: category || CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
    author: 'Prompt Daily 편집팀',
    date: item.pubDate,
    readTime: `${Math.floor(Math.random() * 4) + 2}분`,
    image: `https://picsum.photos/seed/${id}/800/450`,
    breaking: index === 0
  };
}

// 메인 함수
async function main() {
  console.log('[NEWS] Prompt Daily 뉴스 수집 시작...');
  console.log(`[TIME] ${new Date().toISOString()}`);

  const allNews = [];

  for (const feed of RSS_FEEDS) {
    try {
      console.log(`[FETCH] ${feed.name}...`);
      const xml = await fetchUrl(feed.url);
      const items = parseRSS(xml);

      items.slice(0, 3).forEach((item, i) => {
        allNews.push(createNewsItem(item, allNews.length, feed.category));
      });

      console.log(`[OK] ${items.length}개 항목 발견`);
    } catch (error) {
      console.log(`[ERR] ${feed.name}: ${error.message}`);
    }
  }

  // 최신순 정렬 및 상위 10개 선택
  allNews.sort((a, b) => new Date(b.date) - new Date(a.date));
  const topNews = allNews.slice(0, 10);

  // 기존 news.json 로드
  const newsPath = path.join(__dirname, '..', 'src', 'data', 'news.json');
  let existingData = { articles: [] };

  try {
    const fileContent = fs.readFileSync(newsPath, 'utf8');
    existingData = JSON.parse(fileContent);
  } catch (e) {
    console.log('[INFO] 기존 news.json 없음, 새로 생성');
  }

  // 새 뉴스를 맨 앞에 추가
  const mergedArticles = [...topNews, ...existingData.articles];

  // 중복 제거 (제목 기준)
  const uniqueArticles = [];
  const seenTitles = new Set();
  for (const article of mergedArticles) {
    if (!seenTitles.has(article.title)) {
      seenTitles.add(article.title);
      uniqueArticles.push(article);
    }
  }

  // 최대 50개 유지
  const finalArticles = uniqueArticles.slice(0, 50);

  // 저장
  const output = {
    lastUpdated: new Date().toISOString(),
    articles: finalArticles
  };

  fs.writeFileSync(newsPath, JSON.stringify(output, null, 2), 'utf8');

  console.log(`[OK] ${topNews.length}개 새 뉴스 추가`);
  console.log(`[OK] 총 ${finalArticles.length}개 뉴스 보유`);
  console.log('[DONE] news.json 업데이트 완료');
}

main().catch(console.error);
