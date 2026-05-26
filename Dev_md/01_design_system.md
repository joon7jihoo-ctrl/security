# 🎨 Design System — CSS 디자인 시스템

> KDN `kdn-main` 프로젝트 디자인 시스템을 단일 파일에 포팅한 버전  
> 원본 참조: `C:\Users\User\Desktop\vibecoding\day1\kdn-main\src\styles\`

---

## 1. 컬러 팔레트

### Navy Base (11단계)

```css
--navy-900: #0A1428   /* 최대 강조, 다크 배경 */
--navy-800: #0F1B33   /* 기본 텍스트, 사이드바 */
--navy-700: #1B2A4A   /* 메인 테마 컬러 */
--navy-600: #2A3A5C   /* 보조 강조 */
--navy-500: #4A5A7C   /* 서브 텍스트 */
--navy-400: #7A89AB   /* 연한 텍스트 */
--navy-300: #B8C0D6   /* 강한 보더 */
--navy-200: #DDE2EE   /* 기본 보더 */
--navy-100: #F0F2F8   /* 중간 배경 */
--navy-50:  #F8F9FC   /* 라이트 배경 */
```

### Gold Accent

```css
--gold:       #3D6FE0   /* 주 강조색 (링크, 활성 상태, 배지) */
--gold-light: #6B93F0   /* 히어로 하이라이트 텍스트 */
--gold-dark:  #2A52B8   /* hover 상태 */
```

### 상태 컬러

```css
--red:    #E74A5A   /* Critical / 위험 */
--green:  #4AE79A   /* OK / 자동 처리 */
--orange: #E7A04A   /* Warning / 주의 */
```

---

## 2. 시맨틱 토큰

```css
/* 텍스트 */
--ink:          var(--navy-800)   /* 기본 텍스트 */
--ink-soft:     var(--navy-500)   /* 보조 텍스트 */

/* 배경 (다크모드에서도 어둡게 유지되는 서피스) */
--ink-surface:       var(--navy-800)   /* 네비게이션 바, 테이블 헤더 */
--ink-surface-hover: var(--navy-900)   /* 호버 상태 */

/* 레이아웃 */
--bg:      #fff             /* 페이지 배경 */
--bg-alt:  var(--navy-50)   /* 섹션 배경, 사이드바 */
--bg-card: #fff             /* 카드 배경 */
--line:    var(--navy-200)  /* 기본 구분선 */
--line-strong: var(--navy-300)  /* 강한 구분선 */
```

### 다크모드 오버라이드 (`[data-theme="dark"]`)

```css
--ink:        #D0D7E0
--ink-soft:   #8A93AB
--bg:         #111827
--bg-alt:     #161D2B
--bg-card:    #1A2236
--line:       #2A3348
--line-strong:#3A4560
/* ink-surface는 다크모드에서도 어둡게 유지 (KDN ink-surface 아키텍처) */
--ink-surface:       #1A1F2E
--ink-surface-hover: #242938
```

> **왜 `ink-surface`가 별도로 필요한가?**  
> 표준 다크모드 구현에서 `--navy-800`을 반전시키면 `#D0D7E0`(밝은 색)이 됩니다.
> 하지만 네비게이션 바·테이블 헤더처럼 "항상 어두운 배경에 흰 텍스트"여야 하는
> 컴포넌트는 양쪽 모드 모두 어두워야 합니다. 이를 위해 별도 토큰을 사용합니다.

---

## 3. 스페이싱 스케일

```css
--s1:  4px   --s2:  8px   --s3: 12px   --s4: 16px
--s5: 24px   --s6: 32px   --s7: 48px   --s8: 64px
--s9: 96px  --s10:128px  --s11:160px
```

사용 원칙: 마법 숫자(magic number) 사용 금지. 모든 padding/margin/gap은 변수로.

---

## 4. 보더 라디우스 스케일

```css
--radius:    4px    /* 배지, 코드 블록 */
--radius-sm: 8px    /* 버튼, 사이드바 아이템 */
--radius-md: 12px   /* 카드, 플레이북 */
--radius-lg: 16px   /* 플로우 다이어그램 */
--radius-xl: 20px   /* (예약) */
```

---

## 5. 타이포그래피

```css
font-family: 'Segoe UI', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif
```

| 요소 | 크기 | 굵기 | letter-spacing |
|------|------|------|----------------|
| `h1` (hero) | `clamp(2rem, 4vw, 3rem)` | 800 | -0.02em |
| `h2` (섹션 제목) | 1.6rem | 800 | -0.02em |
| `h3` (소제목) | 1.25rem | 700 | -0.02em |
| 본문 | 0.9~1rem | 400 | -0.01em |
| eyebrow | 0.72rem | 700 | +0.12em (uppercase) |
| 코드 | 0.875rem | 400 | 0 |

한국어 최적화: `word-break: keep-all` 전역 적용

---

## 6. 그라디언트

```css
/* 히어로 배경 */
--hero-bg: linear-gradient(135deg, #1B2A4A 0%, #0F1B33 60%, #0A1428 100%)

/* 하이라이트 텍스트 (투명 클립) */
background: linear-gradient(135deg, #6B93F0, #fff)
-webkit-background-clip: text
-webkit-text-fill-color: transparent
```

---

## 7. 반응형 브레이크포인트

| 브레이크포인트 | 변화 내용 |
|----------------|-----------|
| `960px` | 히어로 2컬럼 → 1컬럼, 히어로 다이어그램 숨김, 사이드바 → 수평 태그 형태 |
| `640px` | 탑바 숨김, 네비 링크 숨김, hero padding 축소 |

---

## 8. 애니메이션

```css
/* 상단바 상태 도트 */
@keyframes pulse {
  0%, 100% { opacity: 1 }
  50%       { opacity: 0.4 }
}

/* 카드 hover lift */
transform: translateY(-2px)
box-shadow: 0 8px 32px rgba(61, 111, 224, 0.12)
transition: all 0.25s
```
