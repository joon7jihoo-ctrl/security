# 🚀 Deployment — 배포 프로세스

> GitHub Pages 기반 정적 파일 배포 구성

---

## 배포 아키텍처

```
로컬 편집
    │
    │  git add . && git commit -m "..."
    ▼
GitHub origin/main
    │
    │  GitHub Pages Legacy 빌드 (자동, ~17초)
    ▼
https://joon7jihoo-ctrl.github.io/security/
```

---

## GitHub Pages 설정

| 항목 | 값 |
|------|----|
| **URL** | https://joon7jihoo-ctrl.github.io/security/ |
| **Build Type** | Legacy (브랜치 직접 서빙) |
| **Source Branch** | `main` |
| **Source Path** | `/` (루트) |
| **HTTPS** | 강제 적용 |
| **빌드 시간** | 약 17~40초 |

---

## 배포 파일 구성

```
/ (루트)
├── index.html     ← GitHub Pages가 직접 서빙하는 파일
└── .nojekyll      ← Jekyll 처리 우회 (언더스코어 폴더 인식 오류 방지)
```

### `.nojekyll` 필요 이유

GitHub Pages는 기본적으로 Jekyll 정적 사이트 빌더를 실행합니다.
Jekyll은 `_` 로 시작하는 폴더(예: `_layouts`, `_includes`)를 처리하므로,
단순 HTML 파일 서빙 시 불필요한 처리가 발생합니다.
`.nojekyll` 빈 파일을 루트에 두면 Jekyll 처리를 완전히 건너뜁니다.

---

## GitHub Actions 워크플로우 (`.github/workflows/deploy.yml`)

현재는 **Legacy 모드**로 배포 중이라 Actions 워크플로우는 대기 상태입니다.
향후 빌드 단계(npm build, 파일 압축, 이미지 최적화 등)가 추가될 경우를 대비해 포함되었습니다.

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
  workflow_dispatch:          # 수동 트리거 지원

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

### GitHub Actions로 전환 시 절차

1. GitHub 리포지토리 → **Settings → Pages**
2. **Source** 를 `Branch: main` → **`GitHub Actions`** 로 변경
3. 다음 `git push` 시 Actions 워크플로우 자동 실행

---

## 업데이트 배포 절차

```bash
# 1. 파일 수정
# (index.html, Dev_md/*.md, docs/*.md 등)

# 2. 변경사항 스테이징
git add .

# 3. 커밋
git commit -m "fix: 섹션명 내용 수정 — 변경 요약"

# 4. 푸시 (자동 배포 트리거)
git push origin main

# 5. 빌드 완료 확인 (약 20초 후)
# https://joon7jihoo-ctrl.github.io/security/ 접속 확인
```

---

## GitHub Pages API 관리

GitHub REST API로 Pages 상태 조회 및 관리 가능.

```bash
TOKEN="<Personal Access Token>"
OWNER="joon7jihoo-ctrl"
REPO="security"

# 상태 조회
curl -H "Authorization: Bearer $TOKEN" \
     -H "Accept: application/vnd.github+json" \
     "https://api.github.com/repos/$OWNER/$REPO/pages"

# 최근 빌드 이력
curl -H "Authorization: Bearer $TOKEN" \
     "https://api.github.com/repos/$OWNER/$REPO/pages/builds?per_page=5"
```

---

## 로컬 미리보기

외부 서버 없이 브라우저에서 바로 열람 가능 (단일 파일 SPA 장점):

```bash
# Windows
start C:\Users\User\Desktop\security\index.html

# 또는 VS Code Live Server 확장 사용
```

---

## 트러블슈팅

| 증상 | 원인 | 해결 |
|------|------|------|
| 빌드 후에도 구버전 표시 | 브라우저 캐시 | `Ctrl+Shift+R` (강력 새로고침) |
| Pages 빌드 실패 | Jekyll 처리 오류 | `.nojekyll` 파일 존재 확인 |
| 404 오류 | `index.html`이 루트에 없음 | 파일 경로 확인 |
| Actions 워크플로우 실패 | Pages 소스가 Legacy 상태 | Settings → Pages → GitHub Actions로 전환 |
