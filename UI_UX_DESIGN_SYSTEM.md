# CyberNews AI - Enterprise UI/UX Design System & Information Architecture

> **Design Paradigm**: Futuristic AI Operating System & High-Performance Editorial Publishing Platform  
> **Aesthetic Standard**: Frosted Glass Morphism, Dark Cyber Theme, Neon Cyan (#00f0ff) & Electric Blue Accents, Minimal Visual Noise  
> **Typography System**: Space Grotesk (Display Headings), Inter (Body & UI), JetBrains Mono (Telemetry & Code)  

---

## 1. Design Tokens & Design System Foundation

### A. Color Palette
* **Background Colors**:
  * `bg-primary`: `#020203` (Deep Obsidian Void)
  * `bg-secondary`: `#0a0d14` (Cyber Slate)
  * `bg-card`: `rgba(10, 15, 30, 0.65)` (Frosted Glass Surface)
* **Surface & Glass Layers**:
  * `glass-surface`: `rgba(255, 255, 255, 0.03)` with `backdrop-blur-xl`
  * `glass-border`: `rgba(0, 240, 255, 0.2)`
  * `glass-border-hover`: `rgba(0, 240, 255, 0.5)`
* **Brand Accents**:
  * `accent-cyan`: `#00f0ff` (Primary Glow & Live Indicators)
  * `accent-blue`: `#3b82f6` (Secondary Action & Data Streams)
  * `accent-purple`: `#8b5cf6` (AI Highlights & Special Features)
* **Text Colors**:
  * `text-main`: `#f8fafc` (Slate 50)
  * `text-muted`: `#94a3b8` (Slate 400)
  * `text-mono`: `#00f0ff` (Cyan Telemetry)
* **Status Colors**:
  * `success`: `#22c55e` (Emerald)
  * `warning`: `#f59e0b` (Amber)
  * `danger`: `#ef4444` (Rose)

### B. Shadow & Glow System
* `shadow-glass`: `0 8px 32px 0 rgba(0, 0, 0, 0.37)`
* `glow-cyan`: `0 0 20px rgba(0, 240, 255, 0.35)`
* `glow-blue`: `0 0 20px rgba(59, 130, 246, 0.35)`

### C. Spacing & Border Radius
* **Spacing Scale (8pt grid)**: `4px`, `8px`, `16px`, `24px`, `32px`, `48px`, `64px`
* **Border Radius**:
  * `rounded-sm`: `6px`
  * `rounded-md`: `12px`
  * `rounded-lg`: `20px`
  * `rounded-xl`: `28px` (Standard Card / Modal Radius)

---

## 2. Component Inventory & UI Specifications

### A. Buttons
* **Primary (Neon Cyan)**: Gradient fill from Cyan to Blue, bold JetBrains Mono text, hover glow animation.
* **Secondary / Glass**: Frosted glass surface with 1px cyan border, hover fill `rgba(0, 240, 255, 0.1)`.
* **Danger**: Rose border and background tint for destructive administrative actions.

### B. Cards
* **Glass News Card**: `backdrop-blur-xl`, border `cyan-500/2`, hover translation `-y-1`, smooth image zoom on hover.
* **Trending Card**: Compact row with numerical ranking badge (`01`, `02`, `03`) in neon cyan font.
* **Statistic Card**: Large tabular numbers with trend indicator percentage (`↑ 14%`).

### C. Inputs & Navigation
* **Search Command Palette (`⌘K`)**: Modal overlay with instant fuzzy search across articles, authors, and tags.
* **Sticky Header**: 64px height, livewire breaking news ticker bar, brand insignia, and quick action buttons.

---

## 3. Information Architecture & Page Hierarchy

```
[Root: CyberNews AI Portal]
├── Home (Live Feed, Hero Slider, Category Filters)
├── Article Intelligence View (Full Markdown, AI Summary, Voice Reader, Translation, Comments)
├── Enterprise Control Dashboard (Analytics, Content Management, System Logs, RLS Status)
└── AI Studio Writer (Prompt-to-Article Generator, SEO Meta Generator, Translator)
```

---

## 4. Responsive Strategy & Accessibility

* **Mobile-First Design**: Tailored touch targets (minimum 44px), collapsible drawer navigation, swipeable category rails.
* **Accessibility (WCAG 2.1 AA)**: High contrast ratios against deep obsidian backgrounds, full keyboard navigation with visible focus rings (`focus:ring-2 focus:ring-cyan-400`), ARIA landmarks across all modals and drawers.
