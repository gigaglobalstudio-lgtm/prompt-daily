import { createClient } from '@supabase/supabase-js'

// Supabase 설정
// 실제 운영 시 환경변수로 관리
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 사이트 URL (OAuth 리다이렉트용)
export const SITE_URL = 'https://gigaglobalstudio-lgtm.github.io/prompt-daily/'

// 소셜 로그인 Provider 설정
export const OAUTH_PROVIDERS = {
  kakao: {
    name: '카카오',
    color: '#FEE500',
    textColor: '#000000'
  },
  google: {
    name: 'Google',
    color: '#FFFFFF',
    textColor: '#000000',
    border: true
  }
}
