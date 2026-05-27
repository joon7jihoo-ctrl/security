#!/usr/bin/env node
/**
 * inject-env.js — 환경변수를 index.html 플레이스홀더에 주입 후 dist/ 에 출력
 *
 * 로컬:    node scripts/inject-env.js          (.env 파일 읽기)
 * CI/CD:   node scripts/inject-env.js          (환경변수 직접 사용)
 *
 * 플레이스홀더:
 *   __SUPABASE_URL__       → SUPABASE_URL
 *   __SUPABASE_ANON_KEY__  → SUPABASE_ANON_KEY
 */

'use strict';

const fs   = require('fs');
const path = require('path');

/* ── 경로 설정 ──────────────────────────────────────────────────── */
const ROOT     = path.resolve(__dirname, '..');
const DIST     = path.join(ROOT, 'dist');
const ENV_FILE = path.join(ROOT, '.env');

/* ── 1. .env 파싱 (없으면 process.env 만 사용) ──────────────────── */
function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('ℹ️  .env 파일 없음 — process.env 사용');
    return {};
  }
  const lines  = fs.readFileSync(filePath, 'utf-8').split('\n');
  const result = {};
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;     // 빈 줄·주석 무시
    const eqIdx = line.indexOf('=');
    if (eqIdx < 1) continue;
    const key = line.slice(0, eqIdx).trim();
    const val = line.slice(eqIdx + 1).trim()
                    .replace(/^["']|["']$/g, '');    // 따옴표 제거
    result[key] = val;
  }
  return result;
}

/* ── 2. 플레이스홀더 정의 ─────────────────────────────────────────
   { 치환할_문자열: '환경변수_이름' }
─────────────────────────────────────────────────────────────────── */
const PLACEHOLDERS = {
  '__SUPABASE_URL__'      : 'VITE_SUPABASE_URL',
  '__SUPABASE_ANON_KEY__' : 'VITE_SUPABASE_ANON_KEY',
};

/* ── 3. 메인 ────────────────────────────────────────────────────── */
function main() {
  const fileEnv = loadEnv(ENV_FILE);
  // process.env 가 .env 보다 우선 (CI/CD 환경 대응)
  const env = { ...fileEnv, ...process.env };

  // 필수 키 확인
  const missing = Object.values(PLACEHOLDERS).filter(k => !env[k]);
  if (missing.length) {
    console.error(`❌ 누락된 환경변수: ${missing.join(', ')}`);
    console.error('   .env 파일 또는 GitHub Secrets 를 확인하세요.');
    process.exit(1);
  }

  // dist/ 디렉터리 생성
  fs.mkdirSync(DIST, { recursive: true });

  // index.html 치환
  const srcHtml  = path.join(ROOT, 'index.html');
  let   html     = fs.readFileSync(srcHtml, 'utf-8');

  for (const [placeholder, envKey] of Object.entries(PLACEHOLDERS)) {
    const value = env[envKey];
    html = html.replaceAll(placeholder, value);
    console.log(`✅ ${placeholder} → (${envKey} 적용)`);
  }

  fs.writeFileSync(path.join(DIST, 'index.html'), html, 'utf-8');

  // 정적 파일 복사 (.nojekyll 등)
  const staticFiles = ['.nojekyll'];
  for (const file of staticFiles) {
    const src = path.join(ROOT, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(DIST, file));
      console.log(`📄 복사: ${file}`);
    }
  }

  console.log(`\n🚀 빌드 완료 → dist/index.html`);
}

main();
