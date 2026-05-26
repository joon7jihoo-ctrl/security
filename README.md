# 🛡️ 보안관제 실무 가이드

> **KDN 정보보안팀** — 신입직원 온보딩 문서  
> DDoS · 방화벽 · IPS · WAF · 가시화 · SIEM/SOAR 전 계층 실무 기술 가이드

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?logo=github)](https://joon7jihoo-ctrl.github.io/security/)
[![Version](https://img.shields.io/badge/version-v1.0-blue)](https://github.com/joon7jihoo-ctrl/security/releases)
[![License](https://img.shields.io/badge/license-Internal%20Only-red)](.)

---

## 🌐 라이브 문서

**👉 [https://joon7jihoo-ctrl.github.io/security/](https://joon7jihoo-ctrl.github.io/security/)**

---

## 📖 문서 소개

보안/컴퓨터공학 전공 신입직원이 실무 투입 전 KDN 보안관제 인프라 전반을 빠르게 이해할 수 있도록 제작된 기술 중심 온보딩 문서입니다.

단순 개념 나열이 아닌 **실제 트래픽 흐름** 상에서 각 장비가 어떤 계층에서 어떻게 유기적으로 동작하는지를 ASCII 다이어그램, 비교표, 타임라인, Playbook으로 시각화합니다.

### 커버 범위

| # | 장비 | 계층 | 배치 방식 |
|---|------|------|-----------|
| ① | DDoS 방어 시스템 | L3 / L4 / L7 | 인라인 / BGP |
| ② | 방화벽 (Firewall) | L3 / L4 | 인라인 |
| ③ | IPS (침입방지시스템) | L4 / L7 | 인라인 |
| ④ | WAF (웹 방화벽) | L7 HTTP/S | 인라인 / Reverse Proxy |
| ⑤ | 가시화 장비 | L2 ~ L7 | 아웃오브패스 (TAP/SPAN) |
| ⑥ | eyecloudxoar (SIEM/SOAR) | 전 계층 | 아웃오브패스 |

---

## 🗂️ 리포지토리 구조

```
security/
├── index.html                    # 보안관제 실무 가이드 (단일 파일 SPA, 75KB)
├── .nojekyll                     # GitHub Pages Jekyll 처리 우회
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions 자동 배포 워크플로우
│
├── Dev_md/                       # 📝 개발 노트
│   ├── 00_overview.md            # 프로젝트 개요, 기술 스택, 개발 히스토리
│   ├── 01_design_system.md       # CSS 디자인 시스템 (컬러·스페이싱·타이포그래피)
│   ├── 02_sections.md            # 섹션별 구현 의도 및 상세 설명
│   ├── 03_components.md          # 재사용 CSS 컴포넌트 11종 레퍼런스
│   ├── 04_deployment.md          # 배포 구조, 절차, 트러블슈팅
│   └── 05_todo.md                # 개선 로드맵 (v1.1 ~ v2.0) 및 알려진 이슈
│
└── docs/
    └── evaluation_report.md      # 📊 개발 평가 보고서 (종합 95/100점)
```

---

## 🏗️ 기술 스택

| 분류 | 기술 |
|------|------|
| 마크업 | HTML5 (Semantic) |
| 스타일 | 순수 CSS — 외부 프레임워크 0, CSS 변수 기반 디자인 시스템 |
| 스크립트 | Vanilla JS (~20줄) — 사이드바 스크롤 연동 |
| 디자인 시스템 | KDN `kdn-main` 벤치마킹 (Navy + Gold 팔레트, 다크모드) |
| 배포 | GitHub Pages (Legacy, `main` 브랜치 자동 서빙) |
| CI/CD | GitHub Actions (`deploy.yml`, 빌드 단계 확장 대비) |

---

## 📄 문서 구성 (9섹션)

```
00  Hero          인라인 방어 스택 개요, 통계
01  트래픽 흐름도  인터넷 → 내부 서버 전 구간 ASCII 플로우 + 장비 계층 비교표
02  DDoS 방어      공격 유형 6종 탐지·완화 + 스크러빙 프로세스
03  방화벽         Zone 분리 구조 + ACL 5대 원칙
04  IPS           탐지 방식 4종 비교 + 4단계 처리 타임라인
05  WAF           OWASP Top 10 매핑 + 동작 모드 4단계
06  가시화 장비    TAP/SPAN 비교 + 6개 KPI 이상 징후
07  SIEM/SOAR     수집·정규화·상관관계 + Playbook PB-001·002
08  파이프라인     6단계 보안관제 전체 워크플로우
09  체크리스트     일일 점검 항목 + 심각도별 SLA 기준
```

---

## 🚀 로컬 실행

외부 서버 불필요 — 브라우저에서 바로 열람 가능합니다.

```bash
# 클론
git clone https://github.com/joon7jihoo-ctrl/security.git
cd security

# 브라우저에서 열기 (Windows)
start index.html
```

---

## 🔄 업데이트 배포

`main` 브랜치에 푸시하면 GitHub Pages가 자동으로 재빌드됩니다 (~20초).

```bash
# 내용 수정 후
git add .
git commit -m "docs: 변경 내용 요약"
git push origin main
# → https://joon7jihoo-ctrl.github.io/security/ 자동 반영
```

---

## 📊 개발 평가

| 평가 영역 | 점수 |
|-----------|------|
| 요구사항 충족도 | 30 / 30 |
| 기술 정확성 | 24 / 25 |
| 콘텐츠 가독성 | 19 / 20 |
| UI/UX 품질 | 13 / 15 |
| 성능 및 배포 | 9 / 10 |
| **종합** | **95 / 100** |

> 상세 내용: [`docs/evaluation_report.md`](./docs/evaluation_report.md)

---

## 📋 개발 히스토리

| 날짜 | 버전 | 커밋 | 내용 |
|------|------|------|------|
| 2026-05-26 | — | `2f86026` | Initial commit |
| 2026-05-26 | v1.0 | `0493683` | 보안관제 실무 가이드 최초 배포 |
| 2026-05-26 | v1.0 | `9b32040` | Dev_md 개발 노트 6종 + 평가 보고서 추가 |

---

## ⚠️ 주의사항

본 문서는 **KDN 정보보안팀 내부 온보딩 전용**입니다.  
보안관제 인프라 구조가 상세히 기술되어 있으므로 **외부 공개 및 무단 배포를 금지**합니다.

---

*© 2026 KDN 정보보안팀 · 대외비*
