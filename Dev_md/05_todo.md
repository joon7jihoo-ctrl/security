# 📋 Dev Note 05 — 개선 로드맵 & 알려진 이슈

> **KDN 정보보안팀** — 보안관제 실무 가이드 개발 노트  
> 단기·중기·장기 개선 과제, 알려진 이슈, 기여 가이드 정리.

[![Roadmap](https://img.shields.io/badge/로드맵-v1.1~v2.0-blue)](https://github.com/joon7jihoo-ctrl/security)
[![Issues](https://img.shields.io/badge/알려진%20이슈-2건-yellow)](https://github.com/joon7jihoo-ctrl/security/issues)
[![Completed](https://img.shields.io/badge/완료-SVG%20히어로%20다이어그램-success)](https://github.com/joon7jihoo-ctrl/security/commit/4b5b272)
[![Priority](https://img.shields.io/badge/우선순위-🔴High%20🟡Mid%20🟢Low-lightgrey)](https://github.com/joon7jihoo-ctrl/security)

---

## 🗺️ Dev Note 내비게이션

| # | 파일 | 내용 |
|---|------|------|
| 00 | [`00_overview.md`](./00_overview.md) | 프로젝트 개요 · 기술 스택 · 히스토리 |
| 01 | [`01_design_system.md`](./01_design_system.md) | CSS 디자인 시스템 — 컬러·스페이싱·타이포그래피 |
| 02 | [`02_sections.md`](./02_sections.md) | 섹션별 구현 의도 및 상세 설명 |
| 03 | [`03_components.md`](./03_components.md) | 재사용 CSS 컴포넌트 11종 레퍼런스 |
| 04 | [`04_deployment.md`](./04_deployment.md) | 배포 구조 · 절차 · 트러블슈팅 |
| **05** | `05_todo.md` ← 현재 위치 | 개선 로드맵 · 알려진 이슈 |

---

## ✅ 완료됨

| 커밋 | 항목 | 내용 |
|------|------|------|
| `4b5b272` | **SVG 히어로 다이어그램** | ASCII 아트 → 인라인 SVG 교체. 6개 장비 카드, `animateMotion` 4종, 글로우 필터 적용. |
| `9b32040` | **Dev_md 개발 노트 6종** | 프로젝트 구조·디자인·컴포넌트·배포·로드맵 문서화 완료. |
| `7eea481` | **README 전면 개편** | 뱃지·구조 트리·기술 스택·배포 절차·평가 요약 포함. |
| `0493683` | **v1.0 최초 배포** | 9개 섹션, 15개 테이블, Playbook 2종 포함 실무 가이드 완성. |

---

## 🔴 v1.1 단기 과제

| 우선순위 | 항목 | 설명 |
|----------|------|------|
| 🔴 | **검색 기능** | 섹션 내 키워드 검색 (브라우저 `Ctrl+F` 보완, 하이라이팅 포함) |
| 🔴 | **인쇄 스타일시트** | `@media print` — 배경 제거, 컬러 절약 모드, 페이지 나누기 최적화 |
| 🟡 | **앵커 딥링크 공유** | URL `#section-id` 공유 시 해당 섹션으로 자동 스크롤 + 하이라이팅 |
| 🟡 | **읽기 진행률 바** | 스크롤 위치 기반 상단 `progress` bar (Vanilla JS, 3줄 내외) |
| 🟢 | **코드 복사 버튼** | `<pre>` 블록 우측 상단 📋 복사 버튼 — `navigator.clipboard` API |

---

## 🟡 v1.2 콘텐츠 확장

| 우선순위 | 항목 | 설명 |
|----------|------|------|
| 🔴 | **eyecloudxoar 운용 가이드** | 콘솔 화면 설명, 대시보드 구성, 사용자 권한 체계, 알람 운용 기준 |
| 🔴 | **실제 로그 샘플** | 장비별 실제 로그 형식 예시 (IP·호스트명 익명화 처리) |
| 🟡 | **MITRE ATT&CK 매핑** | 탐지 시나리오 → ATT&CK TTP 번호(T1xxx) 연계 테이블 |
| 🟡 | **인시던트 케이스 스터디** | 실제 대응 사례 (익명화) — Before / After / Timeline 형식 |
| 🟢 | **장비별 CLI 명령어** | 관제원이 현장에서 바로 쓰는 확인 명령어 모음 (방화벽·IPS·WAF) |

---

## 🟢 v2.0 구조 개선

| 우선순위 | 항목 | 설명 |
|----------|------|------|
| 🔴 | **다중 페이지 분리** | 장비별 상세 페이지 분리 (현재 단일 파일의 확장 한계 해소) |
| 🔴 | **Vite + React 마이그레이션** | `kdn-main` 프로젝트 구조로 완전 이식, 컴포넌트 재사용 |
| 🟡 | **사용자 진도 추적** | `localStorage` 기반 "읽은 섹션" 체크 + 재방문 시 복원 |
| 🟡 | **다국어 지원** | 한국어 / 영어 토글 (`lang` 속성 기반 i18n) |
| 🟢 | **오프라인 지원** | Service Worker + PWA Manifest 적용 |

---

## 🐛 알려진 이슈

| # | 증상 | 재현 조건 | 영향도 | 상태 |
|---|------|-----------|--------|------|
| ~~#1~~ | ~~ASCII 히어로 다이어그램 모바일 가로 스크롤~~ | ~~480px 이하~~ | ~~낮음~~ | ✅ **해결됨** — SVG로 교체 (`4b5b272`) |
| #2 | 사이드바 스크롤 연동이 빠른 스크롤 시 지연 | 매우 빠른 스크롤, IntersectionObserver 임계 | 낮음 | 🔍 추적 중 |
| #3 | 다크모드 전환 시 일부 `<pre>` 배경 미전환 | 다크모드 토글 직후 일부 환경 | 낮음 | 🔍 추적 중 |

> **참고:** 이슈 #2·#3은 사용성에 큰 영향을 주지 않으므로 v1.1 범위 내에서 여유 시간에 수정합니다.

---

## 🤝 기여 가이드

### 커밋 메시지 컨벤션

| 태그 | 사용 상황 | 예시 |
|------|-----------|------|
| `feat:` | 새 기능·콘텐츠 추가 | `feat: IPS 섹션 로그 샘플 추가` |
| `fix:` | 오탈자·오류 수정 | `fix: WAF 섹션 OWASP 번호 수정` |
| `docs:` | Dev_md / docs 파일 수정 | `docs: 05_todo 로드맵 업데이트` |
| `style:` | CSS 수정 (기능 변경 없음) | `style: 카드 hover 색상 조정` |
| `refactor:` | 코드 구조 개선 | `refactor: SVG defs 정리` |

### 브랜치 전략

```
main ─── 항상 배포 가능 상태 유지
  └── feature/검색기능    (완료 후 PR → main)
  └── feature/인쇄스타일  (완료 후 PR → main)
```

> 현재는 1인 개발로 `main` 직접 커밋 허용. 팀 확장 시 PR 리뷰 필수화 예정.

---

## 🔗 관련 문서

- 📖 **라이브 문서:** [https://joon7jihoo-ctrl.github.io/security/](https://joon7jihoo-ctrl.github.io/security/)
- 📋 **README:** [`README.md`](../README.md)
- 📊 **평가 보고서:** [`docs/evaluation_report.md`](../docs/evaluation_report.md)

---

*© 2026 KDN 정보보안팀 · 대외비 · Dev Note 05*
