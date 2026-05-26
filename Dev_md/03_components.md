# 🧩 Components — 재사용 컴포넌트 레퍼런스

> `index.html` 내 정의된 CSS 컴포넌트 클래스 전체 목록과 사용법

---

## 1. 레이아웃

### `.shell`

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
  gap: var(--s7);           /* 48px */
  padding-top: var(--s8);   /* 64px */
}
```

960px 이하: `grid-template-columns: 1fr` 단일 컬럼으로 전환

---

### `.sidebar`

좌측 스티키 네비게이션.

```css
.sidebar {
  position: sticky;
  top: calc(var(--nav-h) + var(--s5));  /* 네비바 높이(72px) + 24px */
  max-height: calc(100vh - var(--nav-h) - var(--s10));
  overflow-y: auto;
}
```

**하위 요소:**

| 클래스 | 역할 |
|--------|------|
| `.sidebar-label` | 섹션 레이블 (small uppercase) |
| `.sidebar-item` | 네비 링크 (`.active` 시 gold 색상) |
| `.s-dot` | 작은 원형 마커 |
| `.sidebar-num` | 우측 정렬 섹션 번호 |
| `.sidebar-divider` | 구분선 |
| `.sidebar-callout` | 강조 정보 박스 |

---

## 2. 카드 (`.card`)

섹션별 장비 소개 카드.

```html
<div class="card">
  <div class="card-header">
    <div class="card-icon [ddos|fw|ips|waf|vis|siem]">🔥</div>
    <div class="card-meta">
      <div class="card-tag">CATEGORY</div>
      <div class="card-title">제목</div>
      <div class="card-layer">계층 정보</div>
    </div>
  </div>
  <div class="card-body">
    <p>설명...</p>
    <div class="badge-grid">...</div>
  </div>
</div>
```

**아이콘 변형 (`card-icon` modifier):**

| 클래스 | 포인트 컬러 | 사용 섹션 |
|--------|-------------|-----------|
| `.ddos` | `#E74A5A` (빨강) | DDoS 방어 |
| `.fw` | `#3D6FE0` (파랑) | 방화벽 |
| `.ips` | `#4AE79A` (초록) | IPS |
| `.waf` | `#E7A04A` (주황) | WAF |
| `.vis` | `#9B59B6` (보라) | 가시화 |
| `.siem` | `#3D6FE0` (파랑, 강) | SIEM/SOAR |

---

## 3. 배지 (`.badge`)

인라인 태그. 5가지 색상 변형.

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
/* 공통 구조 */
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

ASCII 아트 다이어그램 컨테이너.

```html
<div class="flow-wrap">
  <div class="flow-title">▶ 제목</div>
  <div class="flow-body">
<span class="c-block">  ┌────────────────┐</span>
<span class="c-block">  │  장비명        │</span>
<span class="c-block">  └───────┬────────┘</span>
           <span class="c-arrow">│ 설명</span>
           <span class="c-arrow">▼</span>
  </div>
</div>
```

**컬러 클래스:**

| 클래스 | 색상 | 의미 |
|--------|------|------|
| `.c-block` | `#FBD38D` (연황) | 장비/컴포넌트 박스 |
| `.c-arrow` | `#6B93F0` (골드라이트) | 트래픽 방향 화살표 |
| `.c-label` | `#81E6D9` (청록) | 라벨/프로토콜명 |
| `.c-layer` | `#9CA3AF` (회색) | 계층 주석 |
| `.c-note` | `#FC8181` (연분홍) | 경고/주의 사항 |
| `.c-ok` | `#68D391` (초록) | 성공/완료 표시 |

> ⚠️ `flow-body`는 `white-space: pre` 적용. 들여쓰기 시 스페이스 수가 정렬에 직접 영향.

---

## 5. 알림 박스 (`.alert`)

```html
<div class="alert [tip|warn|danger|ok]">
  <span class="alert-icon">💡</span>
  <div>
    <strong>제목</strong>
    본문 내용...
  </div>
</div>
```

| 변형 | 색상 | 사용 상황 |
|------|------|-----------|
| `.tip` | 파랑 left-border | 도움말, 권장 사항 |
| `.warn` | 주황 left-border | 주의 사항 |
| `.danger` | 빨강 left-border | 위험 경고 |
| `.ok` | 초록 left-border | 확인/성공 정보 |

---

## 6. 파이프라인 스텝 (`.pipeline`)

수평 단계 표시. `→` 화살표는 `::after` pseudo-element.

```html
<div class="pipeline">
  <div class="pipe-step">
    <div class="pipe-num">단계 01</div>
    <div class="pipe-name">단계명</div>
    <div class="pipe-desc">설명</div>
  </div>
  <!-- 마지막 step의 ::after는 display:none -->
</div>
```

```css
.pipeline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}
.pipe-step::after {
  content: '→';
  position: absolute;
  right: -18px;
}
```

---

## 7. 타임라인 (`.timeline`)

수직 타임라인. 왼쪽 세로선 + 원형 마커.

```html
<div class="timeline">
  <div class="tl-item">
    <div class="tl-time">Step 01 — Label</div>
    <div class="tl-title">제목</div>
    <div class="tl-body">내용</div>
  </div>
</div>
```

```css
.timeline::before {
  /* 세로선: 골드 → navy-300 그라디언트 */
  left: 20px; width: 2px;
}
.tl-item::before {
  /* 원형 마커: 골드 배경 + 이중 링 */
  width: 12px; height: 12px;
  box-shadow: 0 0 0 4px var(--bg), 0 0 0 6px rgba(107, 147, 240, 0.4);
}
```

---

## 8. 플레이북 (`.playbook`)

SOAR Playbook 시각화 컴포넌트.

```html
<div class="playbook">
  <div class="playbook-header">
    <div class="playbook-title">🔴 PB-001: 제목</div>
    <div class="playbook-tag">Critical · 자동</div>
  </div>
  <div class="playbook-steps">
    <div class="playbook-step">
      <div class="pb-num">1</div>
      <div class="pb-text">
        <strong>단계명:</strong> 설명
        <span class="pb-auto">AUTO</span>
      </div>
    </div>
  </div>
</div>
```

- `.playbook-tag` 배경: `var(--gold)` — 심각도 분류
- `.pb-auto` 배경: `#4AE79A15` (초록 반투명) — 자동화 단계 표시
- 각 step 경계: `border-top: 1px dashed var(--line)`

---

## 9. 섹션 공통 패턴

모든 섹션 최상단 구조:

```html
<section class="section-block" id="unique-id">
  <div class="section-eyebrow">XX — 영문 레이블</div>
  <h2 class="section-title">한국어 제목</h2>
  <p class="section-subtitle">부제목 (border-bottom으로 콘텐츠와 구분)</p>
  <!-- 콘텐츠 -->
</section>
```

```css
.section-eyebrow::before {
  content: '';
  width: 20px; height: 2px;
  background: var(--gold);  /* 골드 수평선 */
}
```

---

## 10. 테이블 패턴

```html
<div class="table-wrap">    <!-- overflow-x + border + border-radius -->
  <table>
    <thead>
      <tr><th>컬럼</th>...</tr>
    </thead>
    <tbody>
      <tr><td>...</td></tr>
    </tbody>
  </table>
</div>
```

```css
th {
  background: var(--ink-surface);   /* 항상 어두운 배경 */
  color: #fff;
  text-transform: uppercase;
  font-size: .8rem;
  letter-spacing: .05em;
}
tr:hover td { background: var(--bg-alt); }
```
