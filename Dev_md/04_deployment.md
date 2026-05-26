# 🚀 Dev Note 04 — 배포 프로세스

> **KDN 정보보안팀** — 보안관제 실무 가이드 개발 노트  
> GitHub Pages 기반 정적 파일 배포 구성, 절차, 트러블슈팅 가이드.

[![Live](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?logo=github)](https://joon7jihoo-ctrl.github.io/security/)
[![Build](https://img.shields.io/badge/빌드-Legacy%20(자동)-blue)](https://github.com/joon7jihoo-ctrl/security)
[![Build Time](https://img.shields.io/badge/빌드시간-~17초-lightgrey)](https://github.com/joon7jihoo-ctrl/security)
[![HTTPS](https://img.shields.io/badge/HTTPS-강제적용-success)](https://joon7jihoo-ctrl.github.io/security/)

---

## 🗺️ Dev Note 내비게이션

| # | 파일 | 내용 |
|---|------|------|
| 00 | [`00_overview.md`](./00_overview.md) | 프로젝트 개요 · 기술 스택 · 히스토리 |
| 01 | [`01_design_system.md`](./01_design_system.md) | CSS 디자인 시스템 — 컬러·스페이싱·타이포그래피 |
| 02 | [`02_sections.md`](./02_sections.md) | 섹션별 구현 의도 및 상세 설명 |
| 03 | [`03_components.md`](./03_components.md) | 재사용 CSS 컴포넌트 11종 레퍼런스 |
| **04** | `04_deployment.md` ← 현재 위치 | 배포 구조 · 절차 · 트러블슈팅 |
| 05 | [`05_todo.md`](./05_todo.md) | 개선 로드맵 · 알려진 이슈 |

---

## 🏗️ 배포 아키텍처

```
로컬 편집 (C:\Users\User\Desktop\security\)
        │
        │  git add . && git commit -m "..."
        │  git push origin main
        ▼
GitHub origin/main
  └── index.html  (루트)
  └── .nojekyll
        │
        │  GitHub Pages Legacy 빌드 (자동, ~17초)
        ▼
https://joon7jihoo-ctrl.github.io/security/
        (CDN · HTTPS 강제 · gzip 자동 압축)
```

---

## ⚙️ GitHub Pages 설정

| 항목 | 값 |
|------|----|
| **라이브 URL** | `https://joon7jihoo-ctrl.github.io/security/` |
| **Build Type** | `legacy` (브랜치 직접 서빙) |
| **Source Branch** | `main` |
| **Source Path** | `/` (루트) |
| **HTTPS** | 강제 적용 |
| **CDN** | Fastly (GitHub Pages 내장) |
| **gzip** | 자동 적용 |
| **빌드 시간** | 약 17~40초 |

---

## 📁 배포 핵심 파일

```
/ (루트)
├── index.html     ← GitHub Pages가 직접 서빙하는 진입점
└── .nojekyll      ← Jekyll 처리 우회 (빈 파일)
```

### `.nojekyll`이 필요한 이유

GitHub Pages는 기본적으로 Jekyll 빌더를 실행합니다.  
Jekyll은 `_` 로 시작하는 폴더(`_layouts`, `_includes`)를 특수 처리하므로  
단순 HTML 파일 서빙 시 불필요한 처리 지연이 발생합니다.  
루트에 `.nojekyll` 빈 파일을 추가하면 Jekyll을 완전히 우회합니다.

---

## 🔄 업데이트 배포 절차

```bash
# 1. 파일 수정 (index.html, Dev_md/*.md, docs/*.md 등)

# 2. 변경사항 스테이징
git add .

# 3. 커밋 (컨벤션 준수)
git commit -m "feat: 변경 내용 요약"

# 4. 푸시 → GitHub Pages 자동 재빌드 트리거
git push origin main

# 5. 약 20초 후 라이브 반영 확인
# curl -I https://joon7jihoo-ctrl.github.io/security/
```

### 커밋 메시지 컨벤션

| 태그 | 사용 상황 | 예시 |
|------|-----------|------|
| `feat:` | 새 기능·콘텐츠 추가 | `feat: IPS 섹션 로그 샘플 추가` |
| `fix:` | 오탈자·오류 수정 | `fix: WAF 섹션 OWASP 번호 수정` |
| `docs:` | Dev_md / docs 파일 수정 | `docs: 00_overview 커밋 히스토리 업데이트` |
| `style:` | CSS 수정 (기능 변경 없음) | `style: 카드 hover 색상 조정` |
| `refactor:` | 코드 구조 개선 | `refactor: SVG defs 정리` |

---

## ⚡ GitHub Actions 워크플로우

현재는 **Legacy 모드**로 배포 중이라 Actions 워크플로우는 대기 상태입니다.  
향후 `npm build` / 이미지 최적화 등 빌드 단계가 필요할 때 활성화합니다.

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
  workflow_dispatch:        # 수동 트리거 지원

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: '.' }
      - uses: actions/deploy-pages@v4
        id: deployment
```

### GitHub Actions로 전환하는 방법

1. GitHub 리포지토리 → **Settings → Pages**
2. **Source** 드롭다운: `Branch: main` → **`GitHub Actions`** 선택
3. 다음 `git push` 시 Actions 워크플로우 자동 실행

---

## 🔑 GitHub Pages API 관리

```bash
TOKEN="<Personal Access Token>"
OWNER="joon7jihoo-ctrl"
REPO="security"

# 현재 Pages 상태 조회
curl -H "Authorization: Bearer $TOKEN" \
     -H "Accept: application/vnd.github+json" \
     "https://api.github.com/repos/$OWNER/$REPO/pages"

# 최근 빌드 이력 (최신 3건)
curl -H "Authorization: Bearer $TOKEN" \
     "https://api.github.com/repos/$OWNER/$REPO/pages/builds?per_page=3"

# HTTP 상태 빠른 확인
curl -s -o /dev/null -w "HTTP:%{http_code} | Size:%{size_download}bytes | Time:%{time_total}s" \
     "https://joon7jihoo-ctrl.github.io/security/"
```

---

## 💻 로컬 미리보기

외부 서버 없이 브라우저에서 바로 열람 가능합니다 (단일 파일 SPA 장점).

```bash
# Windows — 파일 탐색기에서 더블클릭 또는
start C:\Users\User\Desktop\security\index.html

# Git Bash
explorer index.html

# VS Code Live Server 확장 (포트 5500)
# → http://localhost:5500/
```

---

## 🛠️ 트러블슈팅

| 증상 | 원인 | 해결 |
|------|------|------|
| 푸시 후에도 구버전 표시 | 브라우저 캐시 | `Ctrl+Shift+R` 강력 새로고침 |
| Pages 빌드 실패 | Jekyll 처리 오류 | 루트에 `.nojekyll` 파일 존재 확인 |
| 404 오류 | `index.html`이 루트에 없음 | 파일 경로 확인 후 재푸시 |
| Actions 워크플로우 실패 | Pages 소스가 Legacy 상태 | Settings → Pages → GitHub Actions 전환 |
| SVG 다이어그램 렌더링 깨짐 | `defs` id 충돌 | 브라우저 DevTools에서 중복 id 확인 |
| 다크모드 지속 안됨 | `localStorage` 미사용 | 새로고침 시 Light 모드로 리셋 (설계 의도) |

---

## 📋 배포 히스토리

| 날짜 | 커밋 | 배포 결과 | 파일 크기 |
|------|------|-----------|-----------|
| 2026-05-26 | `2f86026` | Initial Pages 활성화 | — |
| 2026-05-26 | `0493683` | v1.0 최초 라이브 | 75KB |
| 2026-05-26 | `9b32040` | Dev_md / docs 추가 | 75KB |
| 2026-05-26 | `7eea481` | README 업데이트 | 75KB |
| 2026-05-26 | `4b5b272` | **SVG 히어로 다이어그램 교체** | **92KB** |

---

## 🔗 관련 문서

- 📖 **라이브 문서:** [https://joon7jihoo-ctrl.github.io/security/](https://joon7jihoo-ctrl.github.io/security/)
- 📋 **README:** [`README.md`](../README.md)

---

*© 2026 KDN 정보보안팀 · 대외비 · Dev Note 04*
