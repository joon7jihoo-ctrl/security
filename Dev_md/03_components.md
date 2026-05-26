# 🧩 Dev Note 03 — 컴포넌트 레퍼런스

> **KDN 정보보안팀** — 보안관제 실무 가이드 개발 노트  
> `index.html` 내 정의된 CSS 컴포넌트 클래스 전체 목록과 HTML 사용법.

[![Components](https://img.shields.io/badge/컴포넌트-11종-blue)](../index.html)
[![CSS Classes](https://img.shields.io/badge/CSS%20클래스-464개-lightgrey)](../index.html)
[![SVG Elements](https://img.shields.io/badge/SVG%20요소-50%2B개-orange)](../index.html)

---

## 🗺️ Dev Note 내비게이션

| # | 파일 | 내용 |
|---|------|------|
| 00 | [`00_overview.md`](./00_overview.md) | 프로젝트 개요 · 기술 스택 · 히스토리 |
| 01 | [`01_design_system.md`](./01_design_system.md) | CSS 디자인 시스템 — 컬러·스페이싱·타이포그래피 |
| 02 | [`02_sections.md`](./02_sections.md) | 섹션별 구현 의도 및 상세 설명 |
| **03** | `03_components.md` ← 현재 위치 | 재사용 CSS 컴포넌트 11종 레퍼런스 |
| 04 | [`04_deployment.md`](./04_deployment.md) | 배포 구조 · 절차 · 트러블슈팅 |
| 05 | [`05_todo.md`](./05_todo.md) | 개선 로드맵 · 알려진 이슈 |

---

## 📦 컴포넌트 목록

| # | 컴포넌트 | 주요 클래스 | 사용 섹션 |
|---|----------|------------|-----------|
| 1 | [레이아웃 Shell](#1-레이아웃-shell) | `.shell` `.sidebar` `.main` | 전체 |
| 2 | [카드](#2-카드-card) | `.card` `.card-icon` `.card-body` | 02~07 |
| 3 | [배지](#3-배지-badge) | `.badge` `.badge-grid` | 전체 |
| 4 | [플로우 다이어그램](#4-플로우-다이어그램-flow-wrap) | `.flow-wrap` `.flow-body` | 01~08 |
| 5 | [알림 박스](#5-알림-박스-alert) | `.alert` | 전체 |
| 6 | [파이프라인 스텝](#6-파이프라인-pipe-step) | `.pipeline` `.pipe-step` | 05 |
| 7 | [타임라인](#7-타임라인-timeline) | `.timeline` `.tl-item` | 04 |
| 8 | [플레이북](#8-플레이북-playbook) | `.playbook` `.playbook-step` | 08 |
| 9 | [섹션 공통 패턴](#9-섹션-공통-패턴) | `.section-block` `.section-eyebrow` | 전체 |
| 10 | [테이블 패턴](#10-테이블-패턴) | `.table-wrap` | 전체 |
| 11 | [SVG 히어로 다이어그램](#11-svg-히어로-다이어그램) | `.hero-diagram` `<svg>` | Hero |

---

## 1. 레이아웃 Shell

메인 콘텐츠 2컬럼 레이아웃 컨테이너.

```html
<div class="shell">
  <aside class="sidebar">...</aside>
  <main class="main">...</main>
</div>
```

```css
.shell {
  max-width: 1200px;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: var(--s7);          /* 48px */
  padding-top: var(--s8);  /* 64px */
}
```

| 클래스 | 역할 |
|--------|------|
| `.shell` | 2컬럼 그리드 컨테이너 (960px 이하 → 1컬럼) |
| `.sidebar` | 스티키 좌측 네비 (`top: nav-h + 24px`) |
| `.sidebar-item` | 네비 링크 (`.active` 시 gold 색상) |
| `.sidebar-callout` | 사이드바 내 강조 정보 박스 |
| `.main` | 우측 메인 콘텐츠 영역 |

---

## 2. 카드 (`.card`)

섹션별 장비 소개 카드. hover 시 lift 효과.

```html
<div class="card">
  <div class="card-header">
    <div class="card-icon [ddos|fw|ips|waf|vis|siem]">🔥</div>
    <div class="card-meta">
      <div class="card-tag">CATEGORY</div>
      <div class="card-title">카드 제목</div>
      <div class="card-layer">L3 / L4 계층 정보</div>
    </div>
  </div>
  <div class="card-body">
    <p>설명 텍스트...</p>
    <div class="badge-grid">...</div>
  </div>
</div>
```

**`.card-icon` 변형 6종:**

| 클래스 | 포인트 컬러 | 장비 |
|--------|------------|------|
| `.ddos` | `#E74A5A` (빨강) | DDoS 방어 |
| `.fw`   | `#3D6FE0` (파랑) | 방화벽 |
| `.ips`  | `#4AE79A` (초록) | IPS |
| `.waf`  | `#E7A04A` (주황) | WAF |
| `.vis`  | `#9B59B6` (보라) | 가시화 |
| `.siem` | `#3D6FE0` (파랑, 강조) | SIEM/SOAR |

---

## 3. 배지 (`.badge`)

인라인 상태 태그. 6가지 색상 변형.

```html
<div class="badge-grid">
  <span class="badge red">Critical</span>
  <span class="badge blue">정책 적용</span>
  <span class="badge green">자동 처리</span>
  <span class="badge orange">주의</span>
  <span class="badge purple">분석 중</span>
  <span class="badge gray">기타</span>
</div>
```

```css
.badge {
  display: inline-flex;
  padding: 4px 12px;
  border-radius: var(--radius);  /* 4px */
  font-size: .78rem;
  font-weight: 600;
  border: 1px solid transparent;
}
```

---

## 4. 플로우 다이어그램 (`.flow-wrap`)

ASCII 아트 다이어그램 컨테이너. 검정 배경 + 컬러 코딩.

```html
<div class="flow-wrap">
  <div class="flow-title">▶ 제목</div>
  <div class="flow-body">
<span class="c-block">  ┌────────────────┐</span>
<span class="c-block">  │  장비명        │</span>
<span class="c-block">  └───────┬────────┘</span>
           <span class="c-arrow">│ 레이블</span>
           <span class="c-arrow">▼</span>
  </div>
</div>
```

**컬러 클래스 6종:**

| 클래스 | 색상 | 의미 |
|--------|------|------|
| `.c-block` | `#FBD38D` (연황) | 장비·컴포넌트 박스 |
| `.c-arrow` | `#6B93F0` (골드라이트) | 트래픽 방향 화살표 |
| `.c-label` | `#81E6D9` (청록) | 레이블·프로토콜명 |
| `.c-layer` | `#9CA3AF` (회색) | 계층 주석 |
| `.c-note`  | `#FC8181` (연분홍) | 경고·주의 사항 |
| `.c-ok`    | `#68D391` (초록) | 성공·완료 표시 |

> ⚠️ `flow-body`는 `white-space: pre` 적용. 스페이스 수가 정렬에 직접 영향.

---

## 5. 알림 박스 (`.alert`)

주의·도움말·경고·확인 정보를 강조하는 박스.

```html
<div class="alert [tip|warn|danger|ok]">
  <span class="alert-icon">💡</span>
  <div>
    <strong>제목 (선택)</strong>
    본문 내용...
  </div>
</div>
```

| 변형 | left-border 색상 | 배경 | 사용 상황 |
|------|-----------------|------|-----------|
| `.tip`    | `#3D6FE0` (파랑) | `#3D6FE010` | 도움말·권장 사항 |
| `.warn`   | `#E7A04A` (주황) | `#E7A04A10` | 주의 사항 |
| `.danger` | `#E74A5A` (빨강) | `#E74A5A10` | 위험 경고 |
| `.ok`     | `#4AE79A` (초록) | `#4AE79A10` | 확인·성공 정보 |

---

## 6. 파이프라인 (`.pipeline`)

수평 단계 표시. `→` 화살표는 `::after` pseudo-element로 자동 생성.

```html
<div class="pipeline">
  <div class="pipe-step">
    <div class="pipe-num">단계 01</div>
    <div class="pipe-name">단계명</div>
    <div class="pipe-desc">설명 텍스트</div>
  </div>
  <!-- 마지막 .pipe-step의 ::after는 display:none 자동 처리 -->
</div>
```

```css
.pipeline { grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); }
.pipe-step::after { content: '→'; position: absolute; right: -18px; }
```

---

## 7. 타임라인 (`.timeline`)

수직 타임라인. 좌측 세로선 + 원형 마커.

```html
<div class="timeline">
  <div class="tl-item">
    <div class="tl-time">Step 01 — Label</div>
    <div class="tl-title">단계 제목</div>
    <div class="tl-body">설명 내용</div>
  </div>
</div>
```

```css
.timeline::before {
  /* 세로선: 골드→navy-300 그라디언트 */
  left: 20px; width: 2px;
}
.tl-item::before {
  /* 원형 마커: 골드 배경 + 이중 링 */
  width: 12px; height: 12px;
  box-shadow: 0 0 0 4px var(--bg), 0 0 0 6px rgba(107,147,240,0.4);
}
```

---

## 8. 플레이북 (`.playbook`)

SOAR Playbook 시각화 컴포넌트. 자동/수동 단계 구분 포함.

```html
<div class="playbook">
  <div class="playbook-header">
    <div class="playbook-title">🔴 PB-001: 제목</div>
    <div class="playbook-tag">Critical · 자동</div>  <!-- gold 배경 배지 -->
  </div>
  <div class="playbook-steps">
    <div class="playbook-step">
      <div class="pb-num">1</div>
      <div class="pb-text">
        <strong>단계명:</strong> 설명 텍스트
        <span class="pb-auto">AUTO</span>  <!-- 초록 반투명 자동화 배지 -->
      </div>
    </div>
  </div>
</div>
```

| 클래스 | 스타일 | 의미 |
|--------|--------|------|
| `.playbook-tag` | `background: var(--gold)` | 심각도·자동화 여부 |
| `.pb-num` | Navy 원형 | 단계 번호 |
| `.pb-auto` | `#4AE79A15` 초록 반투명 | 자동화 처리 단계 |
| (수동) | `<strong>(수동)</strong>` 인라인 | 관제원 직접 판단 |

---

## 9. 섹션 공통 패턴

모든 섹션 최상단에서 반복되는 eyebrow → 제목 → 부제목 구조.

```html
<section class="section-block" id="고유-id">
  <div class="section-eyebrow">XX — 영문 레이블</div>
  <h2 class="section-title">한국어 제목</h2>
  <p class="section-subtitle">부제목 (border-bottom으로 콘텐츠와 구분)</p>
  <!-- 본문 콘텐츠 -->
</section>
```

```css
.section-eyebrow::before {
  content: '';
  width: 20px; height: 2px;
  background: var(--gold);   /* 골드 수평 액센트 선 */
}
```

---

## 10. 테이블 패턴

`overflow-x` 처리 + border-radius 포함 wrapper.

```html
<div class="table-wrap">
  <table>
    <thead>
      <tr><th>컬럼 A</th><th>컬럼 B</th></tr>
    </thead>
    <tbody>
      <tr><td>데이터</td><td>데이터</td></tr>
    </tbody>
  </table>
</div>
```

```css
th {
  background: var(--ink-surface);   /* 다크 배경 (다크모드 유지) */
  color: #fff;
  text-transform: uppercase;
  font-size: .8rem;
  letter-spacing: .05em;
}
tr:hover td { background: var(--bg-alt); }
```

---

## 11. SVG 히어로 다이어그램

히어로 영역 인라인 SVG. 6개 장비 카드 + 4개 `animateMotion` 애니메이션.

```html
<div class="hero-diagram">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 450" width="100%"
       role="img" aria-label="보안관제 인라인 방어 체계 다이어그램">
    <defs>
      <!-- 그라디언트: gBg · gCard · gServer -->
      <!-- 화살표 마커: mBlue · mGreen · mPurple -->
      <!-- 글로우 필터: svgGlow (feGaussianBlur stdDeviation="2.5") -->
      <!-- 도트 패턴: dotGrid (20×20, opacity 0.03) -->
    </defs>
    <!-- 배경 + 도트 그리드 -->
    <!-- 인라인 카드: Internet · ①DDoS · ②FW · ③IPS · ④WAF · 서버 -->
    <!-- 아웃오브패스: Syslog 레일 + ⑤가시화 + ⑥SIEM -->
    <!-- animateMotion 4종 -->
  </svg>
</div>
```

```css
/* 960px 이하: 숨김 */
.hero-diagram { line-height: 1; border-radius: var(--radius-lg); overflow: hidden; }
.hero-diagram svg { width: 100%; height: auto; display: block; }
@media(max-width:960px) { .hero-diagram { display: none } }
```

**편집 시 주의사항:**
- 카드 y 좌표 변경 시 화살표 `y1` · `y2` 좌표도 함께 수정
- `animateMotion` path 좌표도 카드 y 값에 종속
- `defs`의 `id` 이름이 SVG 외부 요소와 충돌하지 않도록 `g`·`svg` prefix 사용

---

## 🔗 관련 문서

- 📖 **라이브 문서:** [https://joon7jihoo-ctrl.github.io/security/](https://joon7jihoo-ctrl.github.io/security/)
- 🎨 **디자인 시스템:** [`01_design_system.md`](./01_design_system.md)

---

*© 2026 KDN 정보보안팀 · 대외비 · Dev Note 03*
