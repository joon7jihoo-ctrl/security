# 🎨 Dev Note 01 — CSS 디자인 시스템

> **KDN 정보보안팀** — 보안관제 실무 가이드 개발 노트  
> `kdn-main` 프로젝트 디자인 시스템을 단일 HTML 파일에 포팅한 CSS 아키텍처 레퍼런스.

[![CSS Variables](https://img.shields.io/badge/CSS%20변수-17개-blue)](../index.html)
[![CSS Lines](https://img.shields.io/badge/Style%20Lines-284줄-lightgrey)](../index.html)
[![Dark Mode](https://img.shields.io/badge/다크모드-지원-success)](../index.html)
[![Responsive](https://img.shields.io/badge/반응형-2%20Breakpoints-informational)](../index.html)

---

## 🗺️ Dev Note 내비게이션

| # | 파일 | 내용 |
|---|------|------|
| 00 | [`00_overview.md`](./00_overview.md) | 프로젝트 개요 · 기술 스택 · 히스토리 |
| **01** | `01_design_system.md` ← 현재 위치 | CSS 디자인 시스템 — 컬러·스페이싱·타이포그래피 |
| 02 | [`02_sections.md`](./02_sections.md) | 섹션별 구현 의도 및 상세 설명 |
| 03 | [`03_components.md`](./03_components.md) | 재사용 CSS 컴포넌트 11종 레퍼런스 |
| 04 | [`04_deployment.md`](./04_deployment.md) | 배포 구조 · 절차 · 트러블슈팅 |
| 05 | [`05_todo.md`](./05_todo.md) | 개선 로드맵 · 알려진 이슈 |

---

## 🎨 1. 컬러 팔레트

### Navy Base (11단계)

| 변수 | 값 | 주요 용도 |
|------|----|-----------|
| `--navy-900` | `#0A1428` | 최대 강조, SVG 배경, 다크 서피스 |
| `--navy-800` | `#0F1B33` | 기본 텍스트, 네비게이션 바 |
| `--navy-700` | `#1B2A4A` | 히어로 그라디언트 시작점 |
| `--navy-600` | `#2A3A5C` | 보조 강조 |
| `--navy-500` | `#4A5A7C` | 서브 텍스트 (`--ink-soft`) |
| `--navy-400` | `#7A89AB` | 연한 텍스트 |
| `--navy-300` | `#B8C0D6` | 강한 보더 (`--line-strong`) |
| `--navy-200` | `#DDE2EE` | 기본 보더 (`--line`) |
| `--navy-100` | `#F0F2F8` | 중간 배경 |
| `--navy-50`  | `#F8F9FC` | 라이트 배경 (`--bg-alt`) |

### Gold Accent (3단계)

| 변수 | 값 | 용도 |
|------|----|------|
| `--gold`       | `#3D6FE0` | 주 강조색 — 링크, 활성 상태, 배지 테두리 |
| `--gold-light` | `#6B93F0` | 히어로 텍스트 하이라이트, 화살표 레이블 |
| `--gold-dark`  | `#2A52B8` | 호버 다크 상태 |

### 상태 컬러

| 변수 | 값 | 사용 장비/용도 |
|------|----|----------------|
| `--red`    | `#E74A5A` | DDoS 방어 — Critical 배지 |
| `--green`  | `#4AE79A` | IPS · 내부 서버 — OK · 자동 처리 배지 |
| `--orange` | `#E7A04A` | WAF — Warning 배지 |
| Purple     | `#9B59B6` | 가시화 장비 (변수 미정의, 하드코딩) |

---

## 🔑 2. 시맨틱 토큰

```css
/* 텍스트 */
--ink:          var(--navy-800)   /* 기본 본문 텍스트 */
--ink-soft:     var(--navy-500)   /* 보조·설명 텍스트 */

/* 서피스 (다크모드에서도 어둡게 유지) */
--ink-surface:       var(--navy-800)   /* 테이블 헤더, 네비게이션 바 */
--ink-surface-hover: var(--navy-900)   /* 호버 상태 */

/* 레이아웃 배경 */
--bg:      #fff             /* 페이지 기본 배경 */
--bg-alt:  var(--navy-50)   /* 섹션 교대 배경, 사이드바 */
--bg-card: #fff             /* 카드 배경 */

/* 구분선 */
--line:       var(--navy-200)   /* 기본 보더 */
--line-strong:var(--navy-300)   /* 강조 보더 */
```

> **`ink-surface` 아키텍처란?**  
> 표준 다크모드는 `--navy-800`을 반전시키면 `#D0D7E0`(밝은 색)이 됩니다.  
> 하지만 테이블 헤더·네비게이션 바는 **양쪽 모드 모두 어두운 배경 + 흰 텍스트**여야 합니다.  
> 이를 위해 별도 `--ink-surface` 토큰을 분리하여 다크모드에서도 어두운 값을 유지합니다.  
> _(원본 `kdn-main` 프로젝트 설계 개념 계승)_

---

## 🌙 3. 다크모드

`[data-theme="dark"]` 속성 셀렉터로 전체 컬러 토큰을 오버라이드합니다.

```css
[data-theme="dark"] {
  --ink:        #D0D7E0;   /* 밝은 텍스트 */
  --ink-soft:   #8A93AB;
  --bg:         #111827;
  --bg-alt:     #161D2B;
  --bg-card:    #1A2236;
  --line:       #2A3348;
  --line-strong:#3A4560;
  /* ink-surface: 다크모드에서도 어둡게 유지 (ink-surface 아키텍처) */
  --ink-surface:       #1A1F2E;
  --ink-surface-hover: #242938;
}
```

**토글 구현 (JS 1줄):**
```javascript
document.documentElement.dataset.theme =
  document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
```

---

## 📏 4. 스페이싱 스케일

```css
--s1:  4px    --s2:  8px    --s3: 12px    --s4: 16px
--s5: 24px    --s6: 32px    --s7: 48px    --s8: 64px
--s9: 96px   --s10:128px   --s11:160px
```

**사용 원칙:** 마법 숫자(magic number) 사용 금지. 모든 `padding` / `margin` / `gap`은 변수로.

| 레벨 | 값 | 주요 사용처 |
|------|-----|------------|
| `--s3` | 12px | 배지 패딩, 사이드바 아이템 |
| `--s5` | 24px | 카드 내부 패딩 |
| `--s6` | 32px | 섹션 수평 패딩, 네비게이션 바 |
| `--s7` | 48px | Shell 컬럼 gap |
| `--s11`| 160px | 히어로·푸터 수직 패딩 |

---

## 🔲 5. 보더 라디우스 스케일

| 변수 | 값 | 사용처 |
|------|----|--------|
| `--radius`    | 4px  | 배지, 코드 인라인, 테이블 모서리 |
| `--radius-sm` | 8px  | 버튼, 사이드바 아이템 |
| `--radius-md` | 12px | 카드, 플레이북 |
| `--radius-lg` | 16px | 플로우 다이어그램, SVG 컨테이너 |
| `--radius-xl` | 20px | (예약) |

---

## 🔠 6. 타이포그래피

```css
font-family: 'Segoe UI', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
word-break: keep-all;   /* 한국어 단어 분리 방지 */
```

| 요소 | 크기 | 굵기 | letter-spacing |
|------|------|------|----------------|
| Hero `h1` | `clamp(2rem, 4vw, 3rem)` | 800 | `-0.02em` |
| 섹션 `h2` | `1.6rem` | 800 | `-0.02em` |
| 소제목 `h3` | `1.25rem` | 700 | `-0.02em` |
| 카드 제목 | `1.05rem` | 700 | — |
| eyebrow 레이블 | `0.72rem` | 700 | `+0.12em` (uppercase) |
| 본문 | `0.9~1rem` | 400 | `-0.01em` |
| 코드 | `0.875rem` | 400 | 0 |
| SVG 텍스트 | `7~11px` | 400~700 | `0~2.5` |

---

## 🌈 7. 주요 그라디언트

```css
/* 히어로 배경 */
--hero-bg: linear-gradient(135deg, #1B2A4A 0%, #0F1B33 60%, #0A1428 100%)

/* 하이라이트 텍스트 클리핑 */
background: linear-gradient(135deg, #6B93F0, #fff);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* SVG 카드 배경 (gCard gradient) */
linearGradient: #1E2D48 → #152038   /* 인라인 장비 카드 */
linearGradient: #0D2018 → #0A1A12   /* 내부 서버 카드 */
```

---

## 🖼️ 8. SVG 디자인 토큰

히어로 영역 인라인 SVG에서 사용하는 전용 값.

| 속성 | 값 | 설명 |
|------|-----|------|
| viewBox | `0 0 420 450` | 기준 캔버스 |
| 카드 좌측 액센트 바 | `width: 4px` | 장비별 컬러 표시 |
| 번호 뱃지 반지름 | `r="11"` | 원형 ① ② ③ ④ |
| 트래픽 도트 반지름 | `r="3.5"` (메인) / `r="2.2"` (미러) | animateMotion 요소 |
| 도트 글로우 필터 | `feGaussianBlur stdDeviation="2.5"` | `filter="url(#svgGlow)"` |
| 구분선 | `stroke-dasharray="5,4"` | 아웃오브패스 세퍼레이터 |
| Syslog 레일 | `stroke-dasharray="3,3"` | 장비→SIEM 집계선 |

---

## ⚡ 9. 애니메이션

```css
/* 상단바 상태 도트 (CSS) */
@keyframes pulse {
  0%, 100% { opacity: 1 }
  50%       { opacity: 0.4 }
}

/* 카드 hover lift (CSS) */
transition: all 0.25s;
transform: translateY(-2px);
box-shadow: 0 8px 32px rgba(61, 111, 224, 0.12);
```

### SVG animateMotion (4종)

| # | 도트 | 경로 | 주기 | 역할 |
|---|------|------|------|------|
| 1 | Blue `r=3.5` | Internet → 서버 (메인 흐름) | 3.6s | 인라인 트래픽 흐름 |
| 2 | Purple `r=2.2` | FW → TAP → Visibility | 4s | TAP 미러링 |
| 3 | Blue `r=2` | DDoS → Syslog 레일 → SIEM | 4.5s | Syslog 집계 |
| 4 | Purple `r=2` | Visibility → SIEM | 3s | 가시화→SIEM 전달 |

---

## 📐 10. 반응형 브레이크포인트

| 기준 | 변화 내용 |
|------|-----------|
| `960px` 이하 | 히어로 2컬럼 → 1컬럼, **SVG 다이어그램 숨김**, 사이드바 → 수평 태그 형태 |
| `640px` 이하 | 탑바 숨김, 네비 링크 숨김, hero padding 축소, 히어로 스탯 3열 유지 |

---

## 🔗 관련 문서

- 📖 **라이브 문서:** [https://joon7jihoo-ctrl.github.io/security/](https://joon7jihoo-ctrl.github.io/security/)
- 🧩 **컴포넌트 레퍼런스:** [`03_components.md`](./03_components.md)

---

*© 2026 KDN 정보보안팀 · 대외비 · Dev Note 01*
