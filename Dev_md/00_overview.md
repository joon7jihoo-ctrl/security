# 📁 Dev Notes — 보안관제 실무 가이드

> **프로젝트:** KDN 정보보안팀 신입직원 온보딩 문서  
> **버전:** v1.0  
> **최초 작성:** 2026-05-26  
> **파일 경로:** `security/index.html`  
> **라이브 URL:** https://joon7jihoo-ctrl.github.io/security/

---

## 목차

| 노트 | 파일 | 내용 |
|------|------|------|
| 00 | `00_overview.md` | 프로젝트 개요 및 아키텍처 |
| 01 | `01_design_system.md` | CSS 디자인 시스템 |
| 02 | `02_sections.md` | 섹션별 구현 상세 |
| 03 | `03_components.md` | 재사용 컴포넌트 레퍼런스 |
| 04 | `04_deployment.md` | 배포 프로세스 |
| 05 | `05_todo.md` | 개선 과제 및 로드맵 |

---

## 프로젝트 개요

### 목적

보안/컴퓨터공학 전공 신입사원이 실무 투입 전 KDN 보안관제 인프라의 전체 구조를
빠르게 파악할 수 있도록 기술적 깊이와 가독성을 동시에 갖춘 온보딩 문서.

### 핵심 설계 원칙

1. **단일 파일(Single-File) SPA** — 외부 의존성 0, 브라우저에서 즉시 열람
2. **KDN 디자인 시스템 계승** — `kdn-main` 프로젝트 UI/UX 벤치마킹
3. **기술 중심 서술** — 개념 설명이 아닌 실제 계층·동작 방식 위주
4. **시각 보조** — ASCII 다이어그램, 표, 타임라인, 플로우차트로 가독성 확보

### 파일 구성

```
security/
├── index.html              # 메인 문서 (75KB, 1,176줄)
├── .nojekyll               # GitHub Pages Jekyll 우회
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 자동 배포 워크플로우
├── Dev_md/                 # 개발 노트 (현재 폴더)
│   ├── 00_overview.md
│   ├── 01_design_system.md
│   ├── 02_sections.md
│   ├── 03_components.md
│   ├── 04_deployment.md
│   └── 05_todo.md
├── docs/                   # 공식 문서
│   └── evaluation_report.md
└── README.md
```

### 기술 스택

| 분류 | 기술 | 비고 |
|------|------|------|
| 마크업 | HTML5 Semantic | `<section>`, `<nav>`, `<aside>`, `<main>` 활용 |
| 스타일 | 순수 CSS (임베드) | 외부 프레임워크 미사용, CSS 변수 기반 |
| 스크립트 | Vanilla JS (임베드) | 사이드바 스크롤 연동 (~20줄) |
| 폰트 | Segoe UI + Noto Sans KR | 시스템 폰트 우선, 한글 최적화 |
| 배포 | GitHub Pages (Legacy) | `main` 브랜치 루트 자동 서빙 |
| CI/CD | GitHub Actions | `deploy.yml` 워크플로우 (빌드 단계 추가 대비) |

### 콘텐츠 구성 (9개 섹션)

```
Hero          → 방어 스택 다이어그램 + 통계
Section 01    → 트래픽 흐름도 (인라인/아웃오브패스)
Section 02    → DDoS 방어 시스템
Section 03    → 방화벽 (Firewall)
Section 04    → IPS (침입방지시스템)
Section 05    → WAF (웹 방화벽)
Section 06    → 가시화 장비
Section 07    → eyecloudxoar (SIEM/SOAR)
Section 08    → 보안관제 파이프라인
Section 09    → 실무 체크리스트
```

---

## 개발 히스토리

| 날짜 | 커밋 | 내용 |
|------|------|------|
| 2026-05-26 | `2f86026` | Initial commit (README only) |
| 2026-05-26 | `0493683` | feat: 보안관제 실무 가이드 v1.0 추가 |
