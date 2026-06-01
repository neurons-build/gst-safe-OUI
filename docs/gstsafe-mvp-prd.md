# GSTSafe — MVP Product Requirements Document

**Version:** 1.0  
**Status:** Ready for development  
**Scope:** MVP only — no features beyond what is explicitly listed in this document  

---

## 1. Purpose of this document

This PRD defines the complete scope, logic, data model, and UI behaviour for the first shippable version of GSTSafe — a GST threshold tracker and invoice vault built specifically for Indian freelancers.

Any LLM or developer reading this document should be able to build the product without asking clarifying questions about scope. If a feature is not described here, it is explicitly out of scope for this version.

---

## 2. One-line product definition

GSTSafe tells an Indian freelancer exactly how far they are from mandatory GST registration, estimates their current tax liability, alerts them before they cross the threshold, and stores all their client invoices in one place.

---

## 3. The core problem

Indian freelancers earning from multiple clients across multiple channels (Upwork, direct clients, retainers, one-off projects) have no single view of their annual turnover. When their combined income crosses ₹20,00,000 in a financial year (₹10,00,000 in special category states), they are legally required to register for GST. Crossing this threshold without registering carries a minimum penalty of ₹10,000. Late GST return filing carries an additional ₹50/day penalty per return.

Most freelancers either:
- Don't know the threshold exists
- Know about it but have no way to track multi-source income in real time
- Rely on a CA who tells them after the fact

GSTSafe solves the real-time awareness and early warning problem. It does not file returns. It does not replace a CA. It is an intelligent alert and tracking system.

---

## 4. Target user

**Primary persona:** Indian freelancer or independent consultant earning ₹6–35 lakh/year from multiple clients, working in services (design, development, writing, consulting, marketing, etc.).

**User characteristics:**
- Non-accountant. Does not understand GST filing mechanics in detail.
- Earns from a mix of domestic Indian clients and international clients (exports).
- Invoices clients manually or through basic tools (Word, Zoho Invoice, email).
- Stores invoices across WhatsApp, email, Google Drive — no central system.
- May or may not currently be GST registered.
- Pays a CA annually but has no real-time financial visibility.

**Who this is NOT for (out of scope for MVP):**
- Registered businesses with employees
- Composition scheme taxpayers
- Manufacturers or product sellers (only service providers)
- Companies with a dedicated accounts team

---

## 5. Financial year definition

India's financial year runs **April 1 to March 31**.

All threshold calculations, income aggregation, and alert logic must use this boundary — not the calendar year.

Example: Income entered for March 2025 belongs to FY 2024–25. Income entered for April 2025 belongs to FY 2025–26.

The app must track and display data per financial year. On April 1 each year, a new FY counter starts at zero. Previous FY data is archived and viewable but does not affect the current threshold counter.

---

## 6. GST rules encoded in the product

The following rules must be hard-coded into the application logic. These are the only rules the MVP needs to handle.

### 6.1 Registration threshold

| State category | Threshold |
|---|---|
| General states (28 states + 3 UTs) | ₹20,00,000 per financial year |
| Special category states | ₹10,00,000 per financial year |

**Special category states (exact list):**
Jammu & Kashmir, Uttarakhand, Himachal Pradesh, Manipur, Mizoram, Nagaland, Tripura, Sikkim, Arunachal Pradesh, Meghalaya.

All other states = general category = ₹20L threshold.

The user selects their state during onboarding. The app applies the correct threshold permanently (unless they update it in settings).

### 6.2 What counts toward the threshold

**Both domestic and export income count toward the registration threshold.** This is a critical rule that most freelancers get wrong. A freelancer earning ₹18L from Upwork (exports) + ₹3L from an Indian client has crossed the ₹20L threshold and must register — even though the Upwork income attracts 0% GST.

Every income entry — regardless of type — must be summed into the annual turnover total for threshold tracking.

### 6.3 GST rates on services

| Income type | GST rate | Notes |
|---|---|---|
| Domestic B2B services | 18% | Services billed to Indian clients |
| Export of services | 0% | Services billed to foreign clients, payment received in foreign currency |

The app asks users to classify each income entry as Domestic or Export. The GST liability estimate is calculated only on Domestic entries. Export entries count toward the threshold total but contribute ₹0 to liability.

### 6.4 GST liability estimate formula

```
Monthly GST liability = Sum of all Domestic income entries for that month × 18%

Annual GST liability estimate = Sum of all Domestic income entries for the FY × 18%
```

This is shown as an estimate for planning purposes only. The product must display a disclaimer: *"This is an estimate for planning. Consult a CA before filing returns."*

### 6.5 Filing deadlines (informational only — no filing functionality)

Once registered, freelancers must file:
- **GSTR-1:** by the 11th of the following month
- **GSTR-3B:** by the 20th of the following month

The app shows these dates in a simple calendar widget on the dashboard. These are hardcoded dates — the app does not generate or submit any returns.

### 6.6 Penalty information (shown in alerts only)

- Late registration penalty: minimum ₹10,000
- Late filing penalty: ₹50/day per return (CGST ₹25 + SGST ₹25)

Show these figures in alert messages to communicate the financial stakes. Do not calculate actual penalty amounts — only state the minimum.

---

## 7. Feature list — MVP scope

### 7.1 Authentication

- Email + password signup and login
- Google OAuth login
- Password reset via email
- No phone-based OTP auth in MVP

### 7.2 Onboarding flow (first-time users only)

A 3-step onboarding that collects:

1. **Name and profession** (free text — e.g. "Freelance graphic designer")
2. **State** (dropdown of all Indian states — used to set threshold)
3. **Are you already GST registered?** (Yes / No)
   - If Yes: show informational message that the threshold tracker is still useful for monitoring turnover, but registration alerts won't apply
   - If No: proceed normally

After onboarding, take user directly to the dashboard. Do not ask for credit card at this point.

### 7.3 Dashboard

The dashboard is the primary screen. It must show:

**Threshold bar:**
- A horizontal progress bar showing current FY earnings as a percentage of the applicable threshold
- Label showing exact rupee amount earned and threshold (e.g. "₹14,60,000 of ₹20,00,000")
- Percentage label (e.g. "73% used")
- Bar colour logic:
  - 0–74%: neutral/default colour
  - 75–89%: amber/warning colour
  - 90–99%: orange/high-warning colour
  - 100%+: red/danger colour

**Four metric cards:**
1. Earned this FY (sum of all income entries, current FY)
2. Estimated GST liability (sum of domestic income × 18%, current FY)
3. Remaining to threshold (threshold minus total earned)
4. Estimated crossing date (based on average monthly income over last 3 months, projected forward — display as month name e.g. "~Feb 2026" or "Already crossed")

**Alert banner (conditional):**
- Show a warning banner if the user is at 75%+ of threshold
- Banner is dismissible per session but reappears on next login
- Banner links to a simple "What to do next" modal (static text explaining GST registration steps)

**Recent income list:**
- Last 5 income entries, showing: source name, month, amount, type (Domestic/Export)
- "View all" link to full income log

**Quick action buttons:**
- "Log income" → opens income entry form
- "Add invoice" → opens invoice upload form

**Filing deadline reminder (conditional — only shown if user is GST registered):**
- Simple text showing: "GSTR-1 due: 11th [next month]" and "GSTR-3B due: 20th [next month]"

### 7.4 Income log

**Income entry form fields:**
- Source name (text — e.g. "Toptal", "Infosys retainer", "Startup X")
- Amount in INR (number, required)
- Month and year (month picker — cannot select future months)
- Income type (radio: Domestic / Export)
- Notes (optional, free text, max 200 chars)

**Validation rules:**
- Amount must be a positive number
- Amount cannot exceed ₹1,00,00,000 per entry (sanity check)
- Month cannot be in the future
- Source name max 100 characters

**Income log list view:**
- Show all entries for the current FY by default
- Allow filtering by FY (dropdown: FY 2025–26, FY 2024–25, etc.)
- Allow filtering by type (All / Domestic / Export)
- Sort: newest first (default)
- Show running total for the filtered view
- Allow editing an entry (all fields editable)
- Allow deleting an entry (with confirmation dialog)
- No bulk import in MVP

### 7.5 Invoice vault

**Invoice upload:**
- Accepted file types: PDF, JPG, PNG, WEBP
- Maximum file size: 10MB per file
- User fills in metadata at upload time:
  - Client name (required, text)
  - Invoice amount in INR (required, number)
  - Invoice date (required, date picker)
  - Notes (optional, free text)
- File is stored securely; access requires authentication

**Invoice list view:**
- Chronological list, newest first
- Each row shows: client name, invoice date, amount, file type icon, download link
- Simple text search by client name
- No folders, no tags, no advanced filtering in MVP
- Download link opens the file directly (authenticated signed URL)
- Allow deleting an invoice (with confirmation)

**Storage limits:**
- Free tier: up to 10 invoices stored
- Pro tier: unlimited invoice storage

### 7.6 Alert system

Alerts fire automatically when the user's current FY income crosses threshold percentages. Each alert fires **once per financial year per user** — not repeatedly.

**Three alert triggers:**

| Trigger | Condition | Message tone |
|---|---|---|
| 75% alert | Total FY income ≥ 75% of threshold | Heads-up, informational |
| 90% alert | Total FY income ≥ 90% of threshold | Urgent, action-oriented |
| 100% alert | Total FY income ≥ 100% of threshold | Critical, immediate action required |

**Alert delivery channels:**
- Email (primary — every user)
- WhatsApp (if user has provided phone number — opt-in during onboarding)

**Alert trigger timing:**
- Alerts are checked every time a user saves a new income entry
- If the new entry pushes the total past a threshold percentage, the alert fires immediately
- Check the `alerts_sent` table before sending to prevent duplicate alerts

**Alert message content (exact copy for each):**

75% alert:
> Subject: You're 75% of the way to the GST threshold
>
> Hi [Name], you've earned ₹[X] this financial year — 75% of your ₹[threshold] GST threshold. At your current pace, you could cross the limit around [estimated month].
>
> You don't need to register yet, but now is a good time to prepare. [Link to "What is GST registration?" guide]
>
> — GSTSafe

90% alert:
> Subject: Action needed — you're 90% to your GST threshold
>
> Hi [Name], you've earned ₹[X] this year and are approaching the GST registration limit. You have approximately ₹[remaining] left before you're legally required to register.
>
> Missing the registration deadline carries a minimum penalty of ₹10,000. We recommend starting the registration process now — it takes 7–14 days to complete.
>
> [Link to GST registration guide]
>
> — GSTSafe

100% alert:
> Subject: You've crossed the GST threshold — register now
>
> Hi [Name], your annual income has crossed ₹[threshold]. Under Indian GST law, you are now required to register for GST.
>
> Not registering from this point is a legal violation. Penalties start at ₹10,000. Please speak to a CA or register directly at gstin.gov.in.
>
> [Link to step-by-step registration guide]
>
> — GSTSafe

**WhatsApp messages** are shorter versions of the above (under 200 words), same content, same three triggers.

### 7.7 Settings page

Minimal settings. Only what is necessary:

- Update name
- Update state (triggers threshold recalculation)
- Update phone number (for WhatsApp alerts)
- Toggle: WhatsApp alerts on/off
- Toggle: Email alerts on/off
- Update GST registration status (registered / not registered)
- Change password
- Delete account (with confirmation — permanently deletes all data)

### 7.8 Subscription and payments

**Free tier (no payment required):**
- Income tracking (unlimited entries)
- Threshold bar and dashboard
- All three threshold alerts (email)
- Up to 10 invoice uploads

**Pro tier (₹999/year):**
- Everything in free
- Unlimited invoice storage
- WhatsApp alerts (in addition to email)
- GST liability calculator (shown on dashboard)
- Filing deadline reminders

**Payment implementation:**
- Use Razorpay Subscriptions for annual plan
- On successful payment, update user's subscription status in database
- Show upgrade prompt when free user hits the 10-invoice limit or tries to access Pro features
- No free trial — free tier is the trial

---

## 8. Data model

### 8.1 Table: `users`

| Column | Type | Notes |
|---|---|---|
| id | UUID, PK | Auto-generated |
| email | VARCHAR(255), UNIQUE | Required |
| name | VARCHAR(100) | Required |
| phone | VARCHAR(15) | Optional, for WhatsApp |
| state | VARCHAR(50) | Indian state name |
| state_category | ENUM('general', 'special') | Derived from state on save |
| gst_threshold | INTEGER | 2000000 or 1000000, derived from state_category |
| is_gst_registered | BOOLEAN | Default false |
| whatsapp_alerts | BOOLEAN | Default false |
| email_alerts | BOOLEAN | Default true |
| created_at | TIMESTAMP | Auto |
| updated_at | TIMESTAMP | Auto |

### 8.2 Table: `income_entries`

| Column | Type | Notes |
|---|---|---|
| id | UUID, PK | Auto-generated |
| user_id | UUID, FK → users.id | Required |
| source_name | VARCHAR(100) | Required |
| amount | INTEGER | In paise (multiply INR × 100) to avoid float errors |
| month | INTEGER | 1–12 |
| year | INTEGER | e.g. 2025 |
| financial_year | VARCHAR(10) | e.g. "2025-26" — computed on save |
| income_type | ENUM('domestic', 'export') | Required |
| notes | VARCHAR(200) | Optional |
| created_at | TIMESTAMP | Auto |
| updated_at | TIMESTAMP | Auto |

**Important:** Store all money as integers in paise (1 INR = 100 paise). Never use floats for currency. Convert to INR only for display.

### 8.3 Table: `invoices`

| Column | Type | Notes |
|---|---|---|
| id | UUID, PK | Auto-generated |
| user_id | UUID, FK → users.id | Required |
| client_name | VARCHAR(100) | Required |
| amount | INTEGER | In paise |
| invoice_date | DATE | Required |
| file_url | TEXT | Storage path/URL |
| file_type | VARCHAR(10) | pdf, jpg, png, webp |
| notes | VARCHAR(500) | Optional |
| created_at | TIMESTAMP | Auto |

### 8.4 Table: `alerts_sent`

| Column | Type | Notes |
|---|---|---|
| id | UUID, PK | Auto-generated |
| user_id | UUID, FK → users.id | Required |
| alert_type | ENUM('75', '90', '100') | Which threshold was crossed |
| financial_year | VARCHAR(10) | e.g. "2025-26" |
| channel | ENUM('email', 'whatsapp') | Which channel was used |
| sent_at | TIMESTAMP | Auto |

**Unique constraint:** (user_id, alert_type, financial_year, channel) — prevents duplicate alerts.

### 8.5 Table: `subscriptions`

| Column | Type | Notes |
|---|---|---|
| id | UUID, PK | Auto-generated |
| user_id | UUID, FK → users.id | Required |
| plan | ENUM('free', 'pro') | Default 'free' |
| status | ENUM('active', 'expired', 'cancelled') | |
| razorpay_subscription_id | VARCHAR(100) | From Razorpay |
| started_at | TIMESTAMP | |
| valid_until | TIMESTAMP | |
| created_at | TIMESTAMP | Auto |

---

## 9. Key computed values

These must be calculated consistently throughout the app. Define them once in a shared utility/service layer.

### 9.1 Financial year from a date

```
function getFinancialYear(month, year):
  if month >= 4:
    return "{year}-{(year+1).toString().slice(-2)}"
  else:
    return "{year-1}-{year.toString().slice(-2)}"

Examples:
  month=10, year=2025 → "2025-26"
  month=3,  year=2026 → "2025-26"
  month=4,  year=2026 → "2026-27"
```

### 9.2 Current FY total income

```
Sum of income_entries.amount
WHERE user_id = [current user]
AND financial_year = [current financial year]
```

Convert from paise to INR for display: `amount / 100`

### 9.3 Threshold percentage

```
percentage = (total_income_paise / user.gst_threshold_paise) × 100
Round to nearest integer for display.
```

### 9.4 Estimated crossing date

```
1. Get income entries for the last 3 calendar months (not FY months)
2. Calculate average monthly income across those 3 months
3. remaining = gst_threshold - current_fy_total
4. months_remaining = remaining / average_monthly_income
5. crossing_date = today + months_remaining (in months)
6. Display as: "~[Month] [Year]"

If average_monthly_income = 0: show "—"
If already crossed: show "Already crossed"
If months_remaining > 24: show "More than 2 years away"
```

### 9.5 GST liability estimate

```
domestic_income = Sum of income_entries.amount
  WHERE user_id = [current user]
  AND financial_year = [current financial year]
  AND income_type = 'domestic'

gst_liability = domestic_income × 0.18

Display in INR, rounded to nearest rupee.
Always show disclaimer: "Estimate only. Consult a CA before filing."
```

---

## 10. Alert trigger logic

Run this check every time an income entry is saved (created or updated):

```
function checkAndSendAlerts(user_id):
  user = fetchUser(user_id)
  current_fy = getCurrentFinancialYear()
  total = getCurrentFYTotal(user_id)
  threshold = user.gst_threshold
  percentage = (total / threshold) × 100

  for each alertLevel in [75, 90, 100]:
    if percentage >= alertLevel:
      for each channel in ['email', 'whatsapp']:
        if channel == 'whatsapp' AND user.phone is null: continue
        if channel == 'whatsapp' AND user.whatsapp_alerts == false: continue
        if channel == 'email' AND user.email_alerts == false: continue

        already_sent = alerts_sent.exists(
          user_id = user_id,
          alert_type = alertLevel.toString(),
          financial_year = current_fy,
          channel = channel
        )

        if NOT already_sent:
          sendAlert(user, alertLevel, channel)
          alerts_sent.insert(user_id, alertLevel, current_fy, channel)
```

---

## 11. UI screens and navigation

### Navigation structure

```
/ (dashboard)           — main screen, threshold bar + metrics
/income                 — income log (list + add/edit form)
/invoices               — invoice vault (list + upload form)
/settings               — user settings
/upgrade                — Pro plan upgrade page
/onboarding             — first-time setup flow (redirect new users here)
```

No sidebar navigation in MVP. Use a simple bottom tab bar on mobile, top nav on desktop. Tabs: Dashboard, Income, Invoices, Settings.

### Screen-by-screen UI requirements

**Dashboard (/)**
- Threshold bar (prominent, top of screen)
- 4 metric cards in a 2×2 grid
- Alert banner (conditional, dismissible per session)
- Filing deadlines (conditional — only if is_gst_registered = true)
- Recent income list (last 5 entries)
- Two CTA buttons: Log income, Add invoice

**Income log (/income)**
- Filter bar: FY selector + type filter (All/Domestic/Export)
- Running total for the filtered view
- List of entries (newest first)
- Each entry: source name, month-year, amount, type badge, edit icon, delete icon
- Floating "+" button to open add form
- Add/edit form opens as a modal or slide-over panel

**Invoice vault (/invoices)**
- Search bar (client name search)
- List of invoices (newest first)
- Each row: file type icon, client name, invoice date, amount, download button, delete icon
- Upload button opens a form (client name, amount, date, file picker, notes)
- Pro upgrade prompt when free user exceeds 10 invoices

**Settings (/settings)**
- Grouped into sections: Profile, Alerts, Subscription, Account
- All fields inline-editable with save buttons
- Subscription section shows current plan + upgrade/manage button

---

## 12. Error states and edge cases

Every screen must handle these states:

| State | How to handle |
|---|---|
| No income entries yet | Show empty state with a prompt to log first income |
| Income entries exist but all in previous FY | Show current FY at ₹0, with option to view previous FY |
| User crosses threshold before entering all income (backdated entries) | Recalculate and fire missed alerts immediately on save |
| User deletes an entry that pushed them over a threshold | Do NOT retract alerts already sent. Threshold counter updates but sent alerts stay. |
| File upload fails | Show inline error, do not lose form data |
| Payment fails | Show Razorpay error message, keep user on upgrade page |
| User is in special category state | Apply ₹10L threshold throughout — threshold bar, metrics, alerts, all calculations |
| User changes state in settings | Recalculate threshold and percentage immediately. Re-evaluate whether alerts should fire. |

---

## 13. What this product explicitly does NOT do

Do not build any of the following in this version. If an LLM or developer suggests adding these, decline and refer back to this document:

- GST return filing (GSTR-1, GSTR-3B, or any other return)
- Bank account integration or statement import
- Automatic invoice parsing or OCR
- TDS tracking or ITR filing assistance
- CA matching or marketplace
- Multi-user accounts or team features
- Mobile app (responsive web only)
- Bulk income import (CSV or otherwise)
- Composition scheme support
- Input tax credit (ITC) calculations
- Invoice generation / creation (only storage)
- Notifications via SMS (email + WhatsApp only)
- Analytics dashboards or charts
- API or webhook integrations
- Multi-currency support (INR only)
- Offline mode

---

## 14. Recommended tech stack

This is a recommendation, not a requirement. Developers may use alternatives that satisfy the same functional requirements.

**Preferred stack:**

| Layer | Tool | Notes |
|---|---|---|
| Frontend | Next.js 14+ (App Router) | React-based, good for SEO on landing page |
| Database + Auth | Supabase | Postgres, built-in auth, row-level security |
| File storage | Supabase Storage | Signed URLs for secure file access |
| Email | Resend | Simple API, good deliverability |
| WhatsApp | Interakt or AiSensy | Indian WhatsApp Business API providers |
| Payments | Razorpay | Subscriptions + one-time payments, India-first |
| Hosting | Vercel | Free tier sufficient for MVP |

**No-code alternative:**

| Layer | Tool |
|---|---|
| App + DB | Bubble.io |
| Automation + alerts | Make.com |
| File storage | Bubble built-in |
| Email | Resend (via Make) |
| Payments | Razorpay |

---

## 15. Security requirements

These are non-negotiable minimums for an MVP handling financial data:

- All API routes must require authentication. No unauthenticated data access.
- File downloads must use time-limited signed URLs (expire after 15 minutes). Never expose raw storage URLs.
- Users can only read and write their own data. Enforce this at the database level using Row Level Security (RLS) policies in Supabase, not just in application code.
- Passwords must be hashed. Use Supabase Auth (bcrypt) — do not implement custom password hashing.
- HTTPS only. No HTTP fallback.
- Do not log user financial data to application logs or error tracking tools.
- Add a basic privacy policy page stating: no data sold, no third-party sharing, data deleted on account deletion.

---

## 16. Acceptance criteria

The MVP is complete when all of the following are true:

- [ ] A new user can sign up, complete onboarding, and see their dashboard in under 3 minutes
- [ ] A user can log income from multiple sources across multiple months
- [ ] The threshold bar correctly reflects the sum of all entries for the current FY
- [ ] The threshold bar uses the correct limit (₹10L or ₹20L) based on the user's state
- [ ] Export income is counted in the threshold total but not in the GST liability estimate
- [ ] The 75%, 90%, and 100% alerts fire exactly once per financial year per channel
- [ ] A user can upload an invoice (PDF or image) and retrieve it later via download
- [ ] Free users see an upgrade prompt when they attempt to upload their 11th invoice
- [ ] Pro users have unlimited invoice storage after successful Razorpay payment
- [ ] The financial year resets correctly on April 1 (new FY counter starts at ₹0; prior FY data viewable but separate)
- [ ] All money is stored as integers (paise) and displayed correctly as INR
- [ ] File downloads require authentication (signed URLs, not public links)
- [ ] Users in special category states see ₹10,00,000 as their threshold throughout the app
- [ ] A user can delete their account and all associated data is permanently removed

---

## 17. Glossary

| Term | Definition |
|---|---|
| FY | Financial Year — April 1 to March 31 in India |
| GST | Goods and Services Tax — India's unified indirect tax |
| Threshold | The turnover limit above which GST registration becomes mandatory |
| Domestic income | Income from Indian clients, subject to 18% GST once registered |
| Export income | Income from foreign clients in foreign currency — zero-rated (0% GST) but counts toward threshold |
| GSTR-1 | Monthly return declaring outward supplies — due 11th of following month |
| GSTR-3B | Monthly summary return with tax payment — due 20th of following month |
| Paise | Smallest unit of INR. 1 INR = 100 paise. All monetary values stored in paise in the database. |
| Special category state | 10 Indian states with a lower GST registration threshold of ₹10L |
| RLS | Row Level Security — database-level access control policy in Supabase |

---

*End of document. Version 1.0. Build only what is described here.*
