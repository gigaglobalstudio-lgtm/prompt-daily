#!/usr/bin/env python3
"""
Prompt Daily - AI News Auto Updater
매일 5개의 AI 뉴스를 자동으로 수집하여 news.json을 업데이트합니다.
"""

import json
import os
from datetime import datetime
from pathlib import Path

# 프로젝트 경로
PROJECT_ROOT = Path(__file__).parent.parent
NEWS_FILE = PROJECT_ROOT / "src" / "data" / "news.json"

def generate_news_id():
    """고유 뉴스 ID 생성"""
    return datetime.now().strftime("%Y%m%d%H%M%S")

def update_news(new_articles: list):
    """news.json 파일 업데이트"""
    # 기존 뉴스 로드
    if NEWS_FILE.exists():
        with open(NEWS_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
    else:
        data = {"articles": []}

    # 새 뉴스를 맨 앞에 추가
    for article in reversed(new_articles):
        article['id'] = generate_news_id()
        article['date'] = datetime.now().isoformat()
        data['articles'].insert(0, article)

    # 최대 50개 뉴스만 유지
    data['articles'] = data['articles'][:50]
    data['lastUpdated'] = datetime.now().isoformat()

    # 저장
    with open(NEWS_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"[OK] {len(new_articles)}개 뉴스 업데이트 완료")
    print(f"[OK] 총 {len(data['articles'])}개 뉴스 보유")

def main():
    """
    이 스크립트는 Claude Code의 /loop 명령어로 호출됩니다.
    Claude가 WebSearch로 뉴스를 수집한 후 이 스크립트를 실행합니다.
    """
    print("[NEWS] Prompt Daily 뉴스 업데이터")
    print(f"[TIME] {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    # 환경 변수에서 뉴스 데이터 읽기 (Claude가 설정)
    news_env = os.environ.get('PROMPT_DAILY_NEWS')
    if news_env:
        try:
            new_articles = json.loads(news_env)
            update_news(new_articles)
        except json.JSONDecodeError:
            print("[ERR] 뉴스 데이터 파싱 실패")
    else:
        print("[INFO] PROMPT_DAILY_NEWS 환경변수 없음 - Claude 연동 필요")

if __name__ == "__main__":
    main()
