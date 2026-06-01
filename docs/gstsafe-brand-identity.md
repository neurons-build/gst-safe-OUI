# GSTSafe — Brand Identity System

**Version:** 1.0  
**Status:** Foundation — ready for design implementation  
**Scope:** Logo concept, colour system, typography, voice, UI patterns, and usage rules

---

## 1. Brand foundation

### 1.1 Brand purpose

GSTSafe exists so that Indian freelancers never get blindsided by a tax they didn't know they owed.

Every design decision flows from this: the brand must feel like a trusted, calm, knowledgeable friend — not a government portal, not a corporate accounting suite, not a startup playing startup.

### 1.2 Brand positioning

**What we are:**  
The peace-of-mind layer between a freelancer's work life and India's GST system.

**What we are not:**  

- A CA firm (we don't file or advise)
- An accounting suite (we don't do bookkeeping)
- A government tool (we are warm, not bureaucratic)
- A generic fintech (we are specific, not broad)

### 1.3 Brand personality (the five traits)

| Trait | What it means in practice |
|---|---|
| Calm | Never alarmist. Alerts are informative, not panicked. |
| Clear | No jargon. If a word needs explaining, replace it. |
| Reliable | Consistent behaviour. No surprises. The numbers are always right. |
| Warm | Speaks to a person, not a taxpayer. Uses "you", not "the user". |
| Sharp | Knows GST cold. Specific, not vague. Earns trust through precision. |

### 1.4 Brand promise

> "You'll never be caught off guard by GST again."

This is the internal north star — not a tagline, but the test every product and brand decision must pass.

---

## 2. Naming

### 2.1 Product name

**GSTSafe**

Written as one word, capitalised as shown. Never:

- GST Safe (two words)
- Gstsafe (all lowercase in brand contexts)
- GST SAFE (all caps)
- gstSafe (camelCase)

### 2.2 Name rationale

"GST" is the exact search term Indian freelancers use. No abstraction needed. "Safe" is the emotional job-to-be-done — safety from penalties, from confusion, from being caught out. Together they are direct, memorable, and searchable.

### 2.3 Domain and handle conventions

- Primary domain: `gstsafe.in` (preferred) or `gstsafe.co`
- Handles: `@gstsafe` across platforms
- Email: `hello@gstsafe.in`, `alerts@gstsafe.in`

---

## 3. Logo

### 3.1 Logo concept

The logo mark is a **shield containing a simplified rupee symbol (₹)**.

Rationale: The shield communicates protection — the core emotional promise. The rupee symbol inside it grounds the product firmly in India and in money. Together they read instantly: "your rupees are protected."

The wordmark "GSTSafe" sits to the right of the shield in the primary horizontal lockup.

### 3.2 Logo construction rules

**Shield shape:**  
A slightly rounded pentagon pointing downward — not a police badge shape (too authoritarian), not a bubble (too soft). A geometric shield: modern, trustworthy, architectural.

**Rupee symbol treatment:**  
The ₹ sits centred inside the shield, rendered in white or the primary background colour. It should occupy approximately 55% of the shield's height. Use a geometric/structured version of the rupee — no script variants.

**Shield proportions:**  
Width:height ratio of approximately 1:1.15. Corner radius on the upper two corners only (lower comes to a soft point).

**Minimum logo size:**  

- With wordmark: 120px wide minimum
- Icon only: 24px × 28px minimum
- Never use below these sizes

### 3.3 Logo lockups

**Primary (horizontal):** Shield mark + "GSTSafe" wordmark — used on light backgrounds, marketing materials, headers.

**Stacked (vertical):** Shield mark centred above "GSTSafe" — used on app icons, square social formats.

**Icon only:** Shield mark alone — used at small sizes (favicon, app icon, notification badge).

**Wordmark only:** "GSTSafe" without the shield — used in running text contexts where the mark cannot scale appropriately (e.g. inline in a sentence).

### 3.4 Logo clear space

Maintain clear space equal to the height of the "G" in the wordmark on all four sides of any logo lockup. No other elements enter this zone.

### 3.5 What not to do with the logo

- Do not stretch, skew, or rotate the logo
- Do not apply drop shadows or gradients
- Do not change the shield colour independently of the system
- Do not place the logo on backgrounds where contrast ratio falls below 4.5:1
- Do not use the logo on a busy photographic background without a solid colour backing
- Do not recreate the logo in a different font

---

## 4. Colour system

### 4.1 Primary palette

The brand palette is built on **deep forest green** as the foundation colour, with a warm neutral off-white and a sharp accent.

Forest green was chosen because it communicates:

- Safety and clearance (traffic light green, "all clear")
- Financial health and growth (money, prosperity in Indian culture)
- Calm authority (not aggressive, not corporate-blue)

It is also distinctive — no major Indian fintech or GST tool uses deep green as a primary, giving GSTSafe immediate shelf differentiation.

---

**Primary green — "Vault"**

| Property | Value |
|---|---|
| Hex | `#0D6E4F` |
| RGB | 13, 110, 79 |
| HSL | 158°, 79%, 24% |
| Usage | Primary CTA buttons, logo shield, threshold bar fill, key numbers, active nav states |

**Primary green light — "Canopy"**

| Property | Value |
|---|---|
| Hex | `#E8F5EE` |
|  RGB | 232, 245, 238 |
| HSL | 143°, 42%, 93% |
| Usage | Alert banners (safe state), card backgrounds, hover states on white |

---

**Neutral — "Parchment"**  

| Property | Value |
|---|---|
| Hex | `#F7F5F0` |
| RGB | 247, 245, 240 |
| HSL | 40°, 29%, 96% |
| Usage | Page background — warmer than pure white, less clinical |

**Neutral dark — "Ink"**

| Property | Value |
|---|---|
| Hex | `#1A1A18` |
| RGB | 26, 26, 24 |
| HSL | 70°, 4%, 10% |
| Usage | Primary body text, headings — near-black with warmth, not cold #000000 |

**Neutral mid — "Stone"**

| Property | Value |
|---|---|
| Hex | `#6B6860` |
| RGB | 107, 104, 96 |
| HSL | 42°, 5%, 40% |
| Usage | Secondary text, labels, captions, placeholder text |

**Border — "Linen"**

| Property | Value |
|---|---|
| Hex | `#E2DED6` |
| RGB | 226, 222, 214 |
| HSL | 38°, 14%, 86% |
| Usage | Card borders, dividers, input borders |

---

### 4.2 Semantic palette (alerts and status)

These colours communicate status. Use them only for their defined meaning — never decoratively.

**Warning — "Turmeric"**

| Property | Value |
|---|---|
| Hex | `#C47D0E` |
| Background | `#FEF3DC` |
| Usage | 75–89% threshold state, approaching deadline |

**Danger — "Chilli"**

| Property | Value |
|---|---|
| Hex | `#B82D2D` |
| Background | `#FDEAEA` |
| Usage | 90%+ threshold state, overdue alerts, critical status |

**Success — "Mint"**

| Property | Value |
|---|---|
| Hex | `#0D6E4F` |
| Background | `#E8F5EE` |
| Usage | Registered status, all clear state, completed actions |

Note: Success intentionally uses the primary green — consistency over variety.

---

### 4.3 Threshold bar colour states

The threshold progress bar is the most important UI element. Its colour must communicate risk at a glance:

| Threshold reached | Bar colour | Label colour | State name |
|---|---|---|---|
| 0–74% | `#0D6E4F` (Vault green) | `#0D6E4F` | Safe |
| 75–89% | `#C47D0E` (Turmeric) | `#C47D0E` | Approaching |
| 90–99% | `#E05C0A` (between turmeric and chilli) | `#E05C0A` | Alert |
| 100%+ | `#B82D2D` (Chilli) | `#B82D2D` | Crossed |

### 4.4 Colour usage rules

- **Never use more than 3 colours in a single UI component**
- **Primary green is for active/primary actions only** — do not use it as a decorative background colour except in the logo shield and CTA buttons
- **Parchment is the page background** — components sit on top of it; do not put Parchment-coloured components on a white background
- **Turmeric and Chilli are semantic** — they must only appear when something requires the user's attention. Using them decoratively destroys their signal value.
- **Contrast ratios** — all text on coloured backgrounds must meet WCAG AA (4.5:1 for body text, 3:1 for large text)

---

## 5. Typography

### 5.1 Type philosophy

The typography system uses exactly two typefaces: one for display/headings, one for body and UI. No exceptions. Consistency over variety.

The display font is selected to be distinctive without being decorative — it should feel like a confident financial tool, not a startup, not a bank, not a government form.

### 5.2 Display typeface — headings and marketing

**Typeface: Fraunces**  
Available free on Google Fonts.

Fraunces is a variable optical-size serif with warmth and character. It reads as trustworthy and intelligent — the tone of a sharp CA who actually explains things clearly. It gives GSTSafe immediate visual differentiation from every other GST/fintech tool in India, which universally uses geometric sans-serifs.

Use Fraunces for:

- Hero headlines on the landing page
- Large dashboard numbers (the ₹ amount, the threshold percentage)
- Section headings in marketing materials
- Email subject line styling (in HTML emails)

Do NOT use Fraunces for:

- Body text
- UI labels, navigation, buttons
- Data tables
- Anything below 18px

**Fraunces specimen:**

| Style | Weight | Use |
|---|---|---|
| Fraunces 700 | Bold | Hero headlines, major section titles |
| Fraunces 600 | Semibold | Dashboard key numbers, subheadings |
| Fraunces 400 | Regular | Pull quotes, marketing taglines |

### 5.3 UI and body typeface

**Typeface: DM Sans**  
Available free on Google Fonts.

DM Sans is a clean, geometric sans-serif with strong legibility at small sizes and a friendly (not sterile) character. It pairs well with Fraunces without competing. It renders cleanly across Android (the dominant mobile OS for Indian freelancers) and all desktop browsers.

Use DM Sans for:

- All UI labels, navigation, buttons
- Body text in all contexts
- Form fields, placeholders, error messages
- Data tables and lists
- Email body text
- Everything below 18px

**DM Sans type scale:**

| Name | Size | Weight | Line height | Use |
|---|---|---|---|---|
| Display | 40px / 2.5rem | 600 | 1.15 | Hero on landing page only |
| Heading 1 | 28px / 1.75rem | 600 | 1.2 | Page titles, major sections |
| Heading 2 | 20px / 1.25rem | 600 | 1.3 | Section headings, card titles |
| Heading 3 | 16px / 1rem | 600 | 1.4 | Subsection labels, group headers |
| Body large | 16px / 1rem | 400 | 1.6 | Primary body text, descriptions |
| Body | 14px / 0.875rem | 400 | 1.5 | Secondary body, card content |
| Label | 13px / 0.8125rem | 500 | 1.4 | Form labels, metadata |
| Caption | 12px / 0.75rem | 400 | 1.4 | Helper text, timestamps, footnotes |
| Micro | 11px / 0.6875rem | 500 | 1.3 | Badges, status pills only |

**Minimum text size:** 11px. Never render text smaller than this in any context.

### 5.4 Number formatting rules

Numbers are core to the product. They must be formatted consistently:

- **Rupee amounts:** Use Indian numbering system (lakhs and crores). `₹14,60,000` — not `₹1,460,000` (Western format)
- **Rupee symbol:** Always use ₹ (Unicode U+20B9). Never use "Rs." or "INR" in UI.
- **Large amounts shorthand:** In metric cards and space-constrained contexts, use: `₹14.6L` for lakhs, `₹1.2Cr` for crores. Always one decimal place.
- **Percentages:** Round to nearest whole number. Never show `73.4%` — show `73%`.
- **Dates:** Use `MMM YYYY` format in most contexts (`Oct 2025`, `Apr 2026`). Use `DD MMM YYYY` when full date is needed (`14 Oct 2025`). Never use `DD/MM/YY` — ambiguous and informal.

---

## 6. Iconography

### 6.1 Icon style

Use **Phosphor Icons** (available at phosphoricons.com, free) in the **Regular** weight.

Phosphor was chosen because:

- It has a ₹ rupee symbol icon (critical)
- The Regular weight has warmth without being cartoonish
- It includes all necessary financial and UI icons
- It is consistent and well-maintained

Do NOT mix icon libraries. One library, one weight, throughout the product.

### 6.2 Icon sizes

| Context | Size |
|---|---|
| Navigation tabs | 24px |
| Inline with body text | 16px |
| Card header | 20px |
| CTA button (leading icon) | 18px |
| Status badge | 14px |
| Empty state illustration | 48px (can use Phosphor Duotone at this size) |

### 6.3 Key icons used in product

| Concept | Phosphor icon name |
|---|---|
| Dashboard / home | `House` |
| Income | `Money` |
| Invoice / document | `Receipt` |
| Settings | `Gear` |
| Alert / warning | `Warning` |
| Success / complete | `CheckCircle` |
| Upload | `UploadSimple` |
| Download | `DownloadSimple` |
| Calendar | `Calendar` |
| Shield / protection | `ShieldCheck` |
| Delete | `Trash` |
| Edit | `PencilSimple` |
| Rupee | `CurrencyInr` |
| Notification / bell | `Bell` |

---

## 7. Voice and tone

### 7.1 Voice principles

GSTSafe's voice is the voice of a knowledgeable friend who happens to understand GST — not a government portal, not a legal disclaimer generator, not a startup trying to sound cool.

**Four rules:**

1. **Plain Hindi-English is fine** — Our users switch naturally between Hindi and English. "You've crossed the ₹20L limit" is more natural than "Your aggregate annual turnover has exceeded the prescribed threshold." Use the first.

2. **Specific, not vague** — "You have ₹5,40,000 left before registration is mandatory" beats "You're approaching the limit." Numbers build trust.

3. **Action-forward** — Every message that identifies a problem must suggest a next step. "You've crossed the threshold — here's what to do next" beats "You've crossed the threshold."

4. **No fear-mongering** — The alerts communicate real stakes (₹10,000 minimum penalty), but they are framed as helpfully as possible. We're informing, not scaring.

### 7.2 Voice examples

**Good:**
> You've earned ₹14.6L this financial year. At this pace, you'll cross the GST registration limit around February.

**Bad:**
> Your annual aggregate turnover is approaching the mandatory GST registration threshold under Section 22 of the CGST Act, 2017.

---

**Good:**
> This is your GST liability estimate — ₹1,84,000. Talk to your CA before filing. This number is for planning, not submission.

**Bad:**
> Disclaimer: The figures presented herein are indicative only and should not be construed as tax advice.

---

**Good:**
> Invoice saved. You can find it anytime in your vault.

**Bad:**
> File uploaded successfully. Document has been persisted to storage.

### 7.3 Alert message tone by severity

| Alert level | Tone | Example opener |
|---|---|---|
| 75% (heads-up) | Calm, informational | "Heads up — you're 75% to your GST limit." |
| 90% (urgent) | Direct, action-oriented | "Time to act — you're close to the registration limit." |
| 100% (critical) | Clear, not panicked | "You've crossed the limit. Here's what to do." |

### 7.4 Error message style

Errors must explain what happened and what to do. Never show raw error codes.

| Instead of | Say |
|---|---|
| "Error 422: Unprocessable entity" | "We couldn't save that entry — check the amount and try again." |
| "File type not supported" | "We accept PDF, JPG, and PNG files only. Try converting your file first." |
| "Session expired" | "You've been logged out for security. Log back in to continue." |

### 7.5 Empty state copy

Empty states are the first experience for new users. They must not feel like dead ends.

| Screen | Empty state headline | Subtext |
|---|---|---|
| Dashboard (no income yet) | "Log your first income to start tracking" | "We'll show your GST threshold progress as you go." |
| Invoice vault (no invoices) | "Your invoices live here" | "Upload any client invoice — PDF, JPG, or PNG." |
| Income log (filtered, no results) | "No entries for this period" | "Try changing the filter above." |

---

## 8. UI design patterns

### 8.1 Component style rules

**Cards:**

- Background: white (`#FFFFFF`) on a Parchment page background
- Border: 1px solid Linen (`#E2DED6`)
- Corner radius: 12px
- Padding: 20px
- No drop shadows — border + background contrast is sufficient

**Buttons — primary (CTA):**

- Background: Vault green `#0D6E4F`
- Text: white, DM Sans 14px 500
- Corner radius: 8px
- Padding: 10px 20px
- Hover: `#0A5A40` (10% darker)
- Minimum tap target: 44px height

**Buttons — secondary:**

- Background: transparent
- Border: 1.5px solid Vault green `#0D6E4F`
- Text: Vault green, DM Sans 14px 500
- Hover: Canopy background `#E8F5EE`

**Buttons — destructive:**

- Background: transparent
- Border: 1.5px solid Chilli `#B82D2D`
- Text: Chilli `#B82D2D`
- Only shown in delete/remove contexts, after confirmation prompt

**Form inputs:**

- Border: 1.5px solid Linen `#E2DED6`
- Border on focus: 1.5px solid Vault green `#0D6E4F`
- Background: white
- Placeholder text colour: Stone `#6B6860`
- Corner radius: 8px
- Height: 44px (meets mobile tap target)
- Error state border: Chilli `#B82D2D` + error message below in Chilli

**Status badges / pills:**

- Corner radius: 100px (full pill)
- Font: DM Sans 11px 500
- Padding: 3px 10px
- Domestic income: Canopy background `#E8F5EE`, Vault green text `#0D6E4F`
- Export income: `#EAF4FB` background, `#1565A8` text (blue)
- Pro plan: Turmeric background `#FEF3DC`, `#7A4D00` text

### 8.2 Spacing system

Uses a base unit of 4px. All spacing values are multiples of 4.

| Token | Value | Use |
|---|---|---|
| space-1 | 4px | Micro gaps (icon to label, badge padding) |
| space-2 | 8px | Tight internal spacing |
| space-3 | 12px | Input internal padding, list item gaps |
| space-4 | 16px | Card internal padding (mobile), between related elements |
| space-5 | 20px | Card padding (desktop), section internal spacing |
| space-6 | 24px | Between cards, component vertical rhythm |
| space-8 | 32px | Section separators |
| space-12 | 48px | Major section breaks on landing page |

### 8.3 Motion principles

- **Duration:** 150ms for micro-interactions (button press, state change), 250ms for panel transitions, 350ms for modal entry
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` for entrances (fast start, cushioned end). `ease-in` for exits.
- **Properties to animate:** `opacity`, `transform` only. Never animate `height`, `width`, or `background-color` (expensive, janky on low-end devices)
- **Threshold bar:** Animate width on load with 600ms duration + 200ms delay — this is a hero moment and deserves a slightly longer, satisfying animation
- **Alert banner:** Slides down from top (`translateY(-100%) → translateY(0)`) on page load if triggered

### 8.4 Mobile-first breakpoints

GSTSafe is used primarily on mobile (Indian freelancers skew mobile-heavy).

| Breakpoint | Name | Width |
|---|---|---|
| Default | Mobile | < 640px |
| sm | Tablet | ≥ 640px |
| md | Small desktop | ≥ 768px |
| lg | Desktop | ≥ 1024px |

Design mobile first. The dashboard must be fully functional and legible at 360px width (common in India's mid-range Android segment).

---

## 9. Email design system

### 9.1 Email template structure

All transactional emails (alerts, welcome, receipts) follow a consistent structure:

```
[Header: GSTSafe logo on Parchment background]
[Body: White card, 600px max-width, centred]
  [Headline: Fraunces 600, 24px, Ink colour]
  [Body text: DM Sans 400, 16px, Ink colour, 1.6 line height]
  [Key number (if applicable): Fraunces 600, 32px, Vault green]
  [Primary CTA button: Vault green, full-width on mobile]
  [Disclaimer (if applicable): DM Sans 12px, Stone colour]
[Footer: DM Sans 12px, Stone, centred — unsubscribe link, address]
```

### 9.2 Email colour rules

- Background: Parchment `#F7F5F0`
- Card background: white `#FFFFFF`
- Headline text: Ink `#1A1A18`
- Body text: Ink `#1A1A18`
- Secondary text / labels: Stone `#6B6860`
- CTA button: Vault green `#0D6E4F`, white text
- Key rupee amounts: Vault green `#0D6E4F`, Fraunces

### 9.3 Email subject line format

Pattern: `[Status] — [Specific detail]`

Examples:

- `Heads up — you're 75% to your GST limit`
- `Action needed — ₹18.2L earned, close to GST threshold`
- `You've crossed the GST limit — here's what to do`
- `Welcome to GSTSafe — your threshold tracker is ready`

---

## 10. Brand application don'ts

A summary of what must never happen with the GSTSafe brand:

- Do not use gradients on the logo or primary UI elements
- Do not use drop shadows (border + background contrast is the system)
- Do not use more than two typefaces (Fraunces + DM Sans only)
- Do not use Western number formatting for INR amounts (`₹1,460,000` → wrong; `₹14,60,000` → correct)
- Do not use Turmeric or Chilli colours decoratively — they carry semantic meaning
- Do not use the word "threshold" without a number attached — "You're near the threshold" is vague; "You have ₹5.4L left" is clear
- Do not use passive voice in alerts — "Your threshold has been crossed" is weaker than "You've crossed the threshold"
- Do not use pure black (`#000000`) or pure white (`#FFFFFF`) as page backgrounds
- Do not add animation to elements that are not the threshold bar, modals, or alert banners — restraint is part of the brand

---

## 11. Brand asset checklist (what to create)

For a designer or developer implementing this brand, the minimum asset set is:

- [ ] Logo SVG — horizontal lockup (on light background)
- [ ] Logo SVG — horizontal lockup (on dark/green background)
- [ ] Logo SVG — icon only (for favicon and app icon)
- [ ] App icon — 1024×1024 PNG (for PWA manifest and app stores)
- [ ] Favicon — 32×32 and 16×16 ICO
- [ ] OG image — 1200×630 PNG (for social sharing previews)
- [ ] Email header image — 600×120 PNG
- [ ] CSS variables file (all colour tokens and type scale)
- [ ] Figma component library (buttons, inputs, cards, badges, threshold bar)

---

*End of Brand Identity document. Version 1.0.*  
*Pair with: GSTSafe MVP PRD (gstsafe-mvp-prd.md)*
