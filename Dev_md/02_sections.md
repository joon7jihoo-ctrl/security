# 📐 Sections — 섹션별 구현 상세

> `index.html` 내 각 `<section>` 블록의 구조, 의도, 구현 메모

---

## Hero Section

**목적:** 문서 전체의 인상을 결정하는 진입부. 방어 스택 구조를 한눈에 파악.

**구현 포인트:**

```html
<section class="hero" id="overview">
  <div class="hero-grid">          <!-- 2컬럼: 텍스트 | 다이어그램 -->
    <div>                          <!-- 좌: eyebrow + 제목 + 통계 -->
    <div class="hero-diagram">     <!-- 우: ASCII 인라인 방어 스택 -->
```

- `hero-grid`: `grid-template-columns: 1.1fr 1fr` — 텍스트 측에 10% 비중 추가
- `hero::before`: `radial-gradient` 오버레이로 배경에 깊이감 부여
- `hero-diagram`: 960px 이하에서 `display:none` — 모바일에서 텍스트 집중
- `hero-stats`: 3열 통계 카드 — 문서의 "스펙" 요약 (장비 수, 계층 범위, 대응 체계)
- ASCII 다이어그램 내 컬러 코딩:
  - `.c-block` (연황색): 장비 박스
  - `.c-arrow` (골드): 트래픽 화살표
  - `.c-layer` (회색): 계층 설명 주석
  - `.c-ok` (초록): 아웃오브패스 장비

---

## Section 01 — 트래픽 흐름도

**목적:** 전체 문서의 뼈대. 이 섹션을 이해하면 나머지 섹션이 쉽게 연결됨.

**핵심 콘텐츠:**

1. **인바운드 전체 흐름 ASCII 다이어그램** — 60줄, 인라인 장비 4개 + 아웃오브패스 2개
2. **인라인 vs 아웃오브패스 알림 박스** — 개념 오해를 방지하는 가장 중요한 설명
3. **장비별 계층 비교표** — 6행, OSI 계층/배치 방식/차단 방식 한눈에 비교

```
인터넷 → ① DDoS → ② FW → ③ IPS → ④ WAF → 내부 서버
                              ↑ TAP/SPAN Mirror
                         ⑤ 가시화  ⑥ SIEM
```

**구현 메모:**
- `flow-wrap` + `flow-body` (pre 계열): 폰트 `Cascadia Code > Consolas > D2Coding` 폴백
- `white-space: pre`로 ASCII 정렬 보존 — 편집 시 스페이스 너비 주의
- 테이블은 `table-wrap > table` 패턴으로 overflow-x 처리

---

## Section 02 — DDoS 방어 시스템

**목적:** 트래픽 최상단 방어. 관제원이 가장 먼저 맞닥뜨리는 이벤트 유형.

**핵심 콘텐츠:**

1. **공격 유형별 탐지·완화 표** (6행) — UDP/SYN/ICMP/HTTP/DNS Amp/Slowloris
2. **스크러빙 기반 완화 프로세스** — BGP 우회 → 스크러빙 → GRE 재전달
3. **관제 포인트 경고 박스** — BGP Blackhole 적용 시 서비스 영향 주의사항

**카드 아이콘:** `ddos` 클래스 — 붉은 계열 그라디언트 (`#E74A5A` 포인트)

```css
.card-icon.ddos {
  background: linear-gradient(135deg, #1a1a2e, #E74A5A20);
  border: 1px solid #E74A5A40;
}
```

---

## Section 03 — 방화벽 (Firewall)

**목적:** ACL·세션 테이블·Zone 개념을 실무 기준으로 정확히 전달.

**핵심 콘텐츠:**

1. **Zone 분리 구조 다이어그램** — Untrust / DMZ / Trust 3계층
2. **ACL 5대 원칙 표** — Least Privilege, Deny-All, Stateful, 로그, 정기 리뷰
3. **Shadow Rule 경고 박스** — 실무 실수 방지용

**구현 메모:**
- Zone 다이어그램에서 Trust → DMZ 방향 접근이 허용 안 됨을 명시 (역방향 차단)
- Shadow Rule은 신입이 가장 자주 실수하는 부분이므로 `.alert.tip`으로 강조

---

## Section 04 — IPS

**목적:** DPI 개념과 시그니처 탐지 방식을 IDS/IPS 차이와 함께 이해.

**핵심 콘텐츠:**

1. **탐지 방식 비교표** (4행) — 시그니처/프로토콜 이상/Rate-Based/행위 기반
2. **4단계 처리 타임라인** — Detect → Analyze → Validate → Respond
3. **False Positive 관리 경고** — Alert 모드 48시간 운용 권장

**타임라인 컴포넌트:**

```html
<div class="timeline">
  <div class="tl-item">
    <div class="tl-time">Step 01</div>
    <div class="tl-title">이벤트 수신</div>
    <div class="tl-body">...</div>
  </div>
</div>
```

- `timeline::before`: 세로선 (골드→회색 그라디언트)
- `tl-item::before`: 원형 마커 (골드, 이중 링)

---

## Section 05 — WAF

**목적:** IPS와의 차이(페이로드 vs HTTP 전체 파싱)를 명확히 하고, OWASP 실무 매핑 제공.

**핵심 콘텐츠:**

1. **OWASP Top 10 매핑표** (7행) — A01~A10 중 WAF 방어 가능 항목
2. **4가지 동작 모드 파이프라인** — Passive → Alert → Block → Challenge

**OWASP 표 설계 의도:**
- `WAF 한계` 열을 포함한 이유: WAF만으로 모든 웹 공격을 막을 수 없음을 명시
- A02(암호화 실패), A07(인증 실패) 등은 앱 레벨에서 처리해야 함을 강조

**파이프라인 컴포넌트:**

```html
<div class="pipeline">        <!-- auto-fit grid -->
  <div class="pipe-step">    <!-- →  화살표는 ::after pseudo-element -->
    <div class="pipe-num">모드 01</div>
    <div class="pipe-name">Passive</div>
    <div class="pipe-desc">...</div>
  </div>
</div>
```

---

## Section 06 — 가시화 장비

**목적:** TAP/SPAN 개념과 이상 징후 판단 기준을 실무 수치와 함께 제공.

**핵심 콘텐츠:**

1. **TAP vs SPAN 비교표** (5행)
2. **6가지 KPI 이상 징후 표** — Top Talker, Port, 프로토콜 비율, 세션 수, DNS, 대역폭

**실무 메모 (표 작성 기준):**
- "Top Talker에서 내부 IP가 외부로 대량 전송" → 데이터 유출 1차 지표
- "심야 시간 대역폭 급증" → 랜섬웨어 C&C 또는 코인 마이닝 지표

---

## Section 07 — eyecloudxoar (SIEM/SOAR)

**목적:** 플랫폼 기능 이해 + 상관관계 분석의 실제 가치 전달.

**핵심 콘텐츠:**

1. **수집 방식 표** (6행) — 장비별 프로토콜, 포트, 로그 형식, 주기
2. **브루트포스 + 내부 이동 탐지 시나리오** — 3가지 조건이 AND로 결합되는 상관관계 예시
3. **상관관계 분석 가치 설명** — 단일 장비로 볼 수 없는 공격 체인 연결

**시나리오 설계 의도:**
```
IPS 로그 (SSH 실패 ≥ 10회)
AND 방화벽 로그 (내부 다수 호스트 22포트 접근)
AND OS 로그 (SSH 로그인 성공)
→ HIGH Alert 자동 생성
```
세 조건을 각각 보면 의심스러울 뿐이지만, 조합하면 명확한 침해 사고 패턴.

---

## Section 08 — 보안관제 파이프라인

**목적:** 탐지부터 티켓 종결까지 전체 워크플로우와 Playbook 2종 실례 제시.

**핵심 콘텐츠:**

1. **6단계 전체 파이프라인 다이어그램** — 수집→정규화→상관관계→알람→(자동/수동)→티켓
2. **PB-001: 외부 IP 브루트포스** (Critical, 자동)
3. **PB-002: 웹 공격 SQLi/XSS** (High, 반자동)

**Playbook 컴포넌트:**

```html
<div class="playbook">
  <div class="playbook-header">
    <div class="playbook-title">🔴 PB-001</div>
    <div class="playbook-tag">Critical · 자동</div>
  </div>
  <div class="playbook-steps">
    <div class="playbook-step">
      <div class="pb-num">1</div>
      <div class="pb-text">
        <strong>트리거:</strong> ...
        <span class="pb-auto">AUTO</span>   <!-- 자동화 단계 표시 -->
      </div>
    </div>
  </div>
</div>
```

- `pb-auto` 배지: 초록색 (`#4AE79A`) — 자동 처리 단계 시각화
- 수동 단계: `<strong>(수동)</strong>` 인라인 표시

---

## Section 09 — 실무 체크리스트

**목적:** 당직 교대 시 반드시 확인해야 할 항목과 SLA 기준 제공.

**핵심 콘텐츠:**

1. **일일 점검 7개 항목** — 장비별 점검 포인트, 기준값, 조치 방법
2. **심각도별 SLA 표** (4단계) — Critical 15분/2시간, High 30분/4시간 등

**SLA 표에 배지 사용:**
```html
<span class="badge red">Critical</span>
<span class="badge orange">High</span>
<span class="badge blue">Medium</span>
<span class="badge gray">Low</span>
```
