# 📁 Dev Note 00 — 프로젝트 개요

> **KDN 정보보안팀** — 보안관제 실무 가이드 개발 노트  
> 프로젝트 전체 구조, 기술 스택, 설계 원칙, 개발 히스토리를 한눈에 정리합니다.

[![Live](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?logo=github)](https://joon7jihoo-ctrl.github.io/security/)
[![Version](https://img.shields.io/badge/version-v1.0-blue)](https://github.com/joon7jihoo-ctrl/security)
[![Lines](https://img.shields.io/badge/index.html-1%2C377줄-lightgrey)](../index.html)
[![Size](https://img.shields.io/badge/파일크기-92KB-informational)](../index.html)

---

## 🗺️ Dev Note 내비게이션

| # | 파일 | 내용 |
|---|------|------|
| **00** | `00_overview.md` ← 현재 위치 | 프로젝트 개요 · 기술 스택 · 히스토리 |
| 01 | [`01_design_system.md`](./01_design_system.md) | CSS 디자인 시스템 — 컬러·스페이싱·타이포그래피 |
| 02 | [`02_sections.md`](./02_sections.md) | 섹션별 구현 의도 및 상세 설명 |
| 03 | [`03_components.md`](./03_components.md) | 재사용 CSS 컴포넌트 11종 레퍼런스 |
| 04 | [`04_deployment.md`](./04_deployment.md) | 배포 구조 · 절차 · 트러블슈팅 |
| 05 | [`05_todo.md`](./05_todo.md) | 개선 로드맵 · 알려진 이슈 |

---

## 🎯 프로젝트 목적

보안/컴퓨터공학 전공 **신입직원**이 실무 투입 전 KDN 보안관제 인프라의 전체 구조를  
빠르게 파악할 수 있도록 기술적 깊이와 가독성을 동시에 갖춘 온보딩 웹 문서.

### 기존 문서의 문제점

| 문제 | 원인 | 본 프로젝트 해결 방식 |
|------|------|----------------------|
| 단순 개념 나열 | 교재 스타일 서술 | 실제 트래픽 흐름 기준 기술 설명 |
| 장비 간 연관성 부재 | 장비별 독립 문서 | 인라인/아웃오브패스 흐름도로 연결 |
| 낮은 가독성 | 텍스트 중심 구성 | SVG·표·타임라인·Playbook 시각화 |
| 접근성 | 파일 공유 필요 | GitHub Pages 상시 웹 접근 |

---

## ⚙️ 핵심 설계 원칙

1. **단일 파일(Single-File) SPA** — 외부 의존성 0개, 브라우저에서 즉시 열람
2. **KDN 디자인 시스템 계승** — `kdn-main` 프로젝트 UI/UX 벤치마킹 (Navy + Gold)
3. **기술 중심 서술** — 개념이 아닌 실제 OSI 계층·동작 방식·CLI 기준 설명
4. **시각 보조 우선** — SVG 다이어그램, 비교표, 타임라인, Playbook 카드
5. **즉시 배포** — `git push` 한 번으로 ~20초 내 라이브 반영

---

## 🏗️ 기술 스택

| 분류 | 기술 | 상세 |
|------|------|------|
| **마크업** | HTML5 Semantic | `<section>` `<nav>` `<aside>` `<main>` 활용 |
| **스타일** | 순수 CSS (인라인 임베드) | 외부 프레임워크 0, CSS Custom Properties 기반 |
| **스크립트** | Vanilla JS (인라인 임베드) | 사이드바 스크롤 연동 ~20줄 |
| **그래픽** | SVG (인라인 임베드) | 히어로 방어 스택 다이어그램, `animateMotion` 애니메이션 |
| **폰트** | Segoe UI + Noto Sans KR | 시스템 폰트 우선, 한글 `word-break: keep-all` |
| **배포** | GitHub Pages (Legacy) | `main` 브랜치 루트 `index.html` 자동 서빙 |
| **CI/CD** | GitHub Actions | `deploy.yml` (빌드 단계 확장 대비) |

---

## 🗂️ 리포지토리 구조

```
security/
├── index.html                    # 보안관제 실무 가이드 (92KB · 1,377줄)
│                                 #   ├── CSS: ~284줄 (CSS 변수 17개)
│                                 #   ├── SVG: ~200줄 (히어로 인라인 방어 스택)
│                                 #   └── JS:  ~20줄 (스크롤 연동)
├── .nojekyll                     # GitHub Pages Jekyll 처리 우회
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions 자동 배포 워크플로우
│
├── Dev_md/                       # 📝 개발 노트 (6종)
│   ├── 00_overview.md            # ← 현재 파일
│   ├── 01_design_system.md       # CSS 디자인 시스템
│   ├── 02_sections.md            # 섹션별 구현 상세
│   ├── 03_components.md          # 컴포넌트 레퍼런스
│   ├── 04_deployment.md          # 배포 프로세스
│   └── 05_todo.md                # 로드맵 & 이슈
│
├── docs/
│   └── evaluation_report.md      # 📊 개발 평가 보고서
└── README.md                     # 리포지토리 메인 문서
```

---

## 📄 콘텐츠 구성 (9섹션)

| ID | 섹션명 | 핵심 콘텐츠 | 시각화 요소 |
|----|--------|-------------|-------------|
| Hero | 인라인 방어 체계 | 방어 스택 개요, 3개 통계 | **SVG 다이어그램** (animateMotion) |
| 01 | 트래픽 흐름도 | 인터넷→서버 전 구간 | ASCII 플로우 + 계층 비교표 |
| 02 | DDoS 방어 | 공격 유형 6종 | 스크러빙 프로세스 플로우 |
| 03 | 방화벽 | Zone 분리, ACL 원칙 | Zone 구조 ASCII 다이어그램 |
| 04 | IPS | 탐지 방식 4종 | 4단계 타임라인 컴포넌트 |
| 05 | WAF | OWASP Top 10 매핑 | 동작 모드 파이프라인 |
| 06 | 가시화 장비 | TAP/SPAN, KPI 이상 징후 | 비교표 |
| 07 | SIEM/SOAR | 상관관계 분석 시나리오 | 수집 경로 플로우 |
| 08 | 파이프라인 | 6단계 워크플로우 | Playbook PB-001 · PB-002 |
| 09 | 체크리스트 | 일일 점검, SLA 기준 | 심각도 배지 테이블 |

---

## 📋 개발 히스토리

| 날짜 | 커밋 | 태그 | 내용 |
|------|------|------|------|
| 2026-05-26 | `2f86026` | — | Initial commit (README only) |
| 2026-05-26 | `0493683` | **v1.0** | 보안관제 실무 가이드 최초 배포 |
| 2026-05-26 | `9b32040` | — | Dev_md 개발 노트 6종 + 평가 보고서 추가 |
| 2026-05-26 | `7eea481` | — | README.md 전면 업데이트 |
| 2026-05-26 | `4b5b272` | — | 히어로 ASCII → **SVG 인라인 다이어그램** 교체 |

---

## 🔗 관련 문서

- 📖 **라이브 문서:** [https://joon7jihoo-ctrl.github.io/security/](https://joon7jihoo-ctrl.github.io/security/)
- 📊 **평가 보고서:** [`docs/evaluation_report.md`](../docs/evaluation_report.md)
- 📌 **README:** [`README.md`](../README.md)

---

*© 2026 KDN 정보보안팀 · 대외비 · Dev Note 00*
