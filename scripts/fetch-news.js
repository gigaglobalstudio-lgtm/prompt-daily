#!/usr/bin/env node
/**
 * Prompt Daily - AI News Fetcher
 * RSS 피드에서 최신 AI 뉴스를 수집하여 news.json 업데이트
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

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
    const protocol = url.startsWith('https') ? https : require('http');
    protocol.get(url, {
      headers: { 'User-Agent': 'PromptDaily/1.0' }
    }, (res) => {
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
    const description = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/);
    const pubDate = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);

    if (title) {
      items.push({
        title: (title[1] || title[2] || '').replace(/<[^>]*>/g, '').trim(),
        link: link ? link[1] : '',
        description: (description ? (description[1] || description[2] || '') : '').replace(/<[^>]*>/g, '').substring(0, 200).trim(),
        pubDate: pubDate ? new Date(pubDate[1]).toISOString() : new Date().toISOString()
      });
    }
  }

  return items;
}

// 영어 제목을 한글로 변환 (간단 번역)
function translateTitle(title) {
  // 주요 키워드 번역
  const translations = {
    'launches': '출시',
    'announces': '발표',
    'unveils': '공개',
    'releases': '릴리스',
    'introduces': '도입',
    'partners with': '파트너십 체결',
    'acquires': '인수',
    'raises': '투자 유치',
    'AI': 'AI',
    'artificial intelligence': '인공지능',
    'machine learning': '머신러닝',
    'deep learning': '딥러닝',
    'model': '모델',
    'startup': '스타트업',
    'funding': '펀딩',
    'billion': '억 달러',
    'million': '백만 달러'
  };

  // 간단한 키워드 치환 (실제로는 번역 API 사용 권장)
  let translated = title;
  for (const [eng, kor] of Object.entries(translations)) {
    translated = translated.replace(new RegExp(eng, 'gi'), kor);
  }

  return translated;
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
    existingData = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
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
