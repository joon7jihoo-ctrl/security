# 📐 Dev Note 02 — 섹션별 구현 상세

> **KDN 정보보안팀** — 보안관제 실무 가이드 개발 노트  
> `index.html` 내 각 `<section>` 블록의 구조·구현 의도·컴포넌트 사용 메모.

[![Sections](https://img.shields.io/badge/섹션-9개-blue)](../index.html)
[![Tables](https://img.shields.io/badge/테이블-15개-lightgrey)](../index.html)
[![SVG](https://img.shields.io/badge/Hero-SVG%20다이어그램-orange)](../index.html)
[![Playbook](https://img.shields.io/badge/Playbook-PB--001%20·%20PB--002-success)](../index.html)

---

## 🗺️ Dev Note 내비게이션

| # | 파일 | 내용 |
|---|------|------|
| 00 | [`00_overview.md`](./00_overview.md) | 프로젝트 개요 · 기술 스택 · 히스토리 |
| 01 | [`01_design_system.md`](./01_design_system.md) | CSS 디자인 시스템 — 컬러·스페이싱·타이포그래피 |
| **02** | `02_sections.md` ← 현재 위치 | 섹션별 구현 의도 및 상세 설명 |
| 03 | [`03_components.md`](./03_components.md) | 재사용 CSS 컴포넌트 11종 레퍼런스 |
| 04 | [`04_deployment.md`](./04_deployment.md) | 배포 구조 · 절차 · 트러블슈팅 |
| 05 | [`05_todo.md`](./05_todo.md) | 개선 로드맵 · 알려진 이슈 |

---

## 🖼️ Hero Section (SVG 다이어그램)

**목적:** 문서 전체 인상을 결정하는 진입부. 방어 스택 구조를 SVG 시각화로 즉시 파악.

### 구조

```html
<section class="hero" id="overview">
  <div class="hero-grid">          <!-- 2컬럼: 텍스트 | SVG 다이어그램 -->
    <div>                          <!-- 좌: eyebrow + 제목 + 통계 3개 -->
    <div class="hero-diagram">     <!-- 우: 인라인 SVG (420×450 viewBox) -->
```

### SVG 구성 (6개 장비 카드)

| 카드 | 위치 (y) | 컬러 | 아이콘 | 설명 텍스트 |
|------|----------|------|--------|-------------|
| 인터넷 | 20 | 회색 (`#0C1626`) | 지구본 SVG | Raw Traffic · HTTP · HTTPS… |
| ① DDoS | 73 | 빨강 `#E74A5A` | ① 뱃지 | Volumetric · BGP Blackhole |
| ② FW | 146 | 파랑 `#3D6FE0` | ② 뱃지 | Stateful Inspection · Zone |
| ③ IPS | 219 | 초록 `#4AE79A` | ③ 뱃지 | DPI · CVE 기반 차단 |
| ④ WAF | 292 | 주황 `#E7A04A` | ④ 뱃지 | OWASP Top 10 · SQLi · XSS |
| 내부 서버 | 365 | 초록 `#4AE79A` | 서버 랙 | Web · WAS · Database |

### 아웃오브패스 카드 (우측)

| 카드 | 위치 (y) | 컬러 | 아이콘 |
|------|----------|------|--------|
| ⑤ 가시화 | 155 | 보라 `#9B59B6` | 눈(Eye) SVG |
| ⑥ eyecloudxoar | 268 | 파랑 `#3D6FE0` | 번개(Lightning) SVG |

### animateMotion 4종

```
① Blue  r=3.5  Internet → 서버 전체 (3.6s, 메인 트래픽)
② Purple r=2.2  FW → TAP → Visibility (4s, 미러링)
③ Blue  r=2    DDoS → Syslog 레일 → SIEM (4.5s, 수집)
④ Purple r=2   Visibility → SIEM (3s, 집계 전달)
```

> **960px 이하:** `.hero-diagram { display: none }` 으로 SVG 숨김 → 텍스트 집중

---

## 📡 Section 01 — 트래픽 흐름도

**목적:** 전체 문서의 뼈대. 이 섹션 이해 → 나머지 섹션이 자연스럽게 연결.

### 핵심 콘텐츠

1. **인바운드 전체 흐름 ASCII 다이어그램** — 60줄, 인라인 4개 + 아웃오브패스 2개
2. **인라인 vs 아웃오브패스 알림 박스** — `.alert.tip` 컴포넌트
3. **장비별 계층 비교표** — 6행, OSI 계층/배치 방식/차단 방식

```
인터넷 → ① DDoS → ② FW → ③ IPS → ④ WAF → 내부 서버
                         ↑ TAP/SPAN Mirror
                  ⑤ 가시화       ⑥ SIEM
```

**구현 메모:**
- `flow-wrap` + `flow-body` (pre 계열): 폰트 `Cascadia Code > Consolas > D2Coding` 폴백
- `white-space: pre` 유지 — ASCII 정렬 보존, 편집 시 스페이스 너비 주의

---

## 🌊 Section 02 — DDoS 방어 시스템

**목적:** 트래픽 최상단 방어. 관제원이 가장 먼저 맞닥뜨리는 이벤트 유형.

### 핵심 콘텐츠

| 콘텐츠 | 형식 | 행/항목 |
|--------|------|---------|
| 공격 유형별 탐지·완화 | 테이블 | 6행 (UDP/SYN/ICMP/HTTP Flood/DNS Amp/Slowloris) |
| 스크러빙 완화 프로세스 | ASCII 플로우 | BGP 우회→스크러빙→GRE 재전달 |
| BGP Blackhole 주의 | `.alert.warn` | 서비스 영향 범위 경고 |

**카드 아이콘 CSS:**
```css
.card-icon.ddos {
  background: linear-gradient(135deg, #1a1a2e, #E74A5A20);
  border: 1px solid #E74A5A40;
}
```

---

## 🔥 Section 03 — 방화벽 (Firewall)

**목적:** ACL·세션 테이블·Zone 개념을 실무 기준으로 정확하게 전달.

### 핵심 콘텐츠

| 콘텐츠 | 형식 | 설명 |
|--------|------|------|
| Zone 분리 구조 | ASCII 플로우 | Untrust / DMZ / Trust 3계층 |
| ACL 5대 원칙 | 테이블 | Least Privilege · Deny-All · Stateful · 로그 · 정기 리뷰 |
| Shadow Rule 경고 | `.alert.tip` | 넓은 허용 규칙이 위에 있으면 아래 차단 규칙 무효 |

**설계 의도:**
- Zone 다이어그램에서 Trust → DMZ 역방향 접근 불가 명시
- Shadow Rule은 신입이 가장 자주 실수하는 부분 → `.alert.tip`으로 강조

---

## 🔬 Section 04 — IPS

**목적:** DPI 개념과 시그니처 탐지 방식을 IDS/IPS 차이와 함께 이해.

### 핵심 콘텐츠

| 콘텐츠 | 형식 | 항목 |
|--------|------|------|
| 탐지 방식 비교 | 테이블 | 시그니처 / 프로토콜 이상 / Rate-Based / 행위 기반 |
| 처리 절차 | 타임라인 컴포넌트 | Detect → Analyze → Validate → Respond (4단계) |
| False Positive 관리 | `.alert.danger` | Alert 모드 48시간 운용 권장 |

**타임라인 HTML 패턴:**
```html
<div class="timeline">
  <div class="tl-item">
    <div class="tl-time">Step 01 — Detect</div>
    <div class="tl-title">이벤트 수신 및 심각도 분류</div>
    <div class="tl-body">...</div>
  </div>
</div>
```
- `timeline::before` — 세로선 (골드→navy-300 그라디언트)
- `tl-item::before` — 원형 마커 (골드, 이중 링)

---

## 🕸️ Section 05 — WAF

**목적:** IPS와 차이(L7 HTTP 전체 파싱) 명확히 하고, OWASP 실무 매핑 제공.

### 핵심 콘텐츠

| 콘텐츠 | 형식 | 항목 |
|--------|------|------|
| OWASP Top 10 매핑 | 테이블 | 7행 (A01~A10 중 WAF 관련) |
| 동작 모드 | 파이프라인 컴포넌트 | Passive → Alert → Block → Challenge |

**OWASP 표 설계 의도:**
- `WAF 한계` 열 포함 → WAF 단독으로 모든 웹 공격을 막을 수 없음을 명시
- A02(암호화 실패), A07(인증 실패)는 앱 레벨에서 처리해야 함을 강조

**파이프라인 HTML:**
```html
<div class="pipeline">          <!-- auto-fit grid -->
  <div class="pipe-step">       <!-- → 화살표는 ::after pseudo-element -->
    <div class="pipe-num">모드 01</div>
    <div class="pipe-name">Passive</div>
    <div class="pipe-desc">...</div>
  </div>
</div>
```

---

## 📡 Section 06 — 가시화 장비

**목적:** TAP/SPAN 개념과 이상 징후 판단 기준을 실무 수치와 함께 제공.

### 핵심 콘텐츠

| 콘텐츠 | 형식 | 항목 |
|--------|------|------|
| TAP vs SPAN 비교 | 테이블 | 5행 (방식/정확도/서비스 영향/장애 영향/권장 구간) |
| KPI 이상 징후 | 테이블 | 6행 (Top Talker/Port/프로토콜/세션/DNS/대역폭) |

**실무 메모:**
- "Top Talker — 내부 IP가 외부로 대량 전송" → 데이터 유출 1차 지표
- "심야 대역폭 급증" → 랜섬웨어 C&C 또는 코인 마이닝 지표

---

## ⚡ Section 07 — eyecloudxoar (SIEM/SOAR)

**목적:** 플랫폼 기능 이해 + 상관관계 분석의 실제 가치 전달.

### 핵심 콘텐츠

| 콘텐츠 | 형식 | 항목 |
|--------|------|------|
| 수집 방식 | 테이블 | 6행 (장비별 프로토콜·포트·형식·주기) |
| 상관관계 시나리오 | ASCII 플로우 | SSH 브루트포스 + 내부 이동 탐지 (3조건 AND) |
| 분석 가치 | `.alert.ok` | 단일 장비로 볼 수 없는 공격 체인 연결 |

**시나리오 설계 의도:**
```
IPS: SSH 실패 ≥ 10회 / 60초
AND FW: 내부 다수 호스트 22포트 접근 시도
AND OS: SSH 로그인 성공 발생
─────────────────────────────
→ HIGH Alert 자동 생성 + Playbook 실행
```
세 조건을 각각 보면 의심스러울 뿐이지만, 조합하면 명확한 침해 공격 체인.

---

## 🔄 Section 08 — 보안관제 파이프라인

**목적:** 탐지부터 티켓 종결까지 전체 워크플로우와 Playbook 2종 실례 제시.

### 핵심 콘텐츠

| 콘텐츠 | 형식 | 세부 |
|--------|------|------|
| 전체 파이프라인 | ASCII 플로우 | 수집→정규화→상관관계→알람→(자동/수동)→티켓 (6단계) |
| PB-001 브루트포스 대응 | 플레이북 컴포넌트 | Critical · 자동 · 6단계 |
| PB-002 웹 공격 대응 | 플레이북 컴포넌트 | High · 반자동 · 5단계 |

**Playbook HTML 핵심:**
```html
<div class="playbook-step">
  <div class="pb-num">1</div>
  <div class="pb-text">
    <strong>트리거:</strong> 설명
    <span class="pb-auto">AUTO</span>   <!-- 초록 자동화 배지 -->
  </div>
</div>
```

---

## ✅ Section 09 — 실무 체크리스트

**목적:** 당직 교대 시 반드시 확인해야 할 항목과 SLA 기준 제공.

### 핵심 콘텐츠

| 콘텐츠 | 형식 | 항목 |
|--------|------|------|
| 일일 점검 | 테이블 | 7개 항목 (장비별 점검 포인트·기준값·조치) |
| 심각도별 SLA | 테이블 | 4단계 (Critical 15분/2h · High 30분/4h · Medium/Low) |
| 실무 메모 | `.alert.tip` | 티켓 기록 구체적 작성법 안내 |

**SLA 배지 사용:**
```html
<span class="badge red">Critical</span>
<span class="badge orange">High</span>
<span class="badge blue">Medium</span>
<span class="badge gray">Low</span>
```

---

## 🔗 관련 문서

- 📖 **라이브 문서:** [https://joon7jihoo-ctrl.github.io/security/](https://joon7jihoo-ctrl.github.io/security/)
- 🧩 **컴포넌트 레퍼런스:** [`03_components.md`](./03_components.md)

---

*© 2026 KDN 정보보안팀 · 대외비 · Dev Note 02*
