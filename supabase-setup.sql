-- Prompt Daily - Supabase 데이터베이스 설정
-- Supabase 대시보드 > SQL Editor에서 실행하세요

-- 1. 뉴스 테이블
CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  category TEXT DEFAULT 'AI',
  source_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 구독자 테이블
CREATE TABLE subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RLS (Row Level Security) 활성화
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- 4. 뉴스 읽기 정책 (누구나 읽기 가능)
CREATE POLICY "Anyone can read news" ON news
  FOR SELECT USING (true);

-- 5. 구독 정책 (누구나 구독 가능)
CREATE POLICY "Anyone can subscribe" ON subscribers
  FOR INSERT WITH CHECK (true);

-- 6. 샘플 뉴스 데이터
INSERT INTO news (title, summary, category) VALUES
('OpenAI, GPT-5 베타 테스트 시작', 'OpenAI가 차세대 대규모 언어 모델 GPT-5의 베타 테스트를 시작했다. 복잡한 추론 작업에서 기존 모델 대비 3배 향상된 성능을 보인다.', 'LLM'),
('Anthropic, Claude 4 출시 예고', 'Anthropic이 3월 중 Claude 4 출시를 예고했다. 향상된 Constitutional AI와 함께 멀티모달 기능이 대폭 강화될 전망이다.', 'LLM'),
('구글 Gemini 2.5, 코딩 벤치마크 1위', '구글의 Gemini 2.5가 주요 코딩 벤치마크에서 GPT-4o를 앞질렀다. 특히 복잡한 알고리즘 문제 해결에서 15% 높은 정확도를 기록.', 'LLM'),
('미드저니 V7 알파 공개', '미드저니가 V7 알파 버전을 공개했다. 전문가들도 실제 사진과 구분하기 어려운 수준의 이미지 생성이 가능해졌다.', '이미지 AI'),
('테슬라 Optimus 2.0 공장 투입', '테슬라가 차세대 휴머노이드 로봇 Optimus 2.0을 프리몬트 공장에 시범 배치했다. 2027년 대량 생산 목표.', '로보틱스');

-- 완료! 이제 사이트에서 뉴스가 표시됩니다.
