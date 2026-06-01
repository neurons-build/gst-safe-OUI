# GST Tracker for Indian Freelancers — Full Strategic Analysis

***

## PHASE 1 — Idea Deconstruction

**One-line summary:** A GST threshold monitor and invoice vault for Indian freelancers that auto-calculates tax liability and sends timely payment alerts to prevent penalties.

### The Problem Breakdown

The problem is real and layered. India's GST framework mandates registration once a service provider crosses ₹20 lakh annual turnover (₹10 lakh in special category states). Most freelancers don't hit this in a straight line — income is sporadic, multi-source, and often paid from multiple clients across different timelines. The moment they cross the threshold, they're legally obligated to register, collect GST from clients, and file returns on time. Miss this, and penalties start at ₹10,000 minimum, with late fees of ₹50/day per return.

The freelancer's actual pain cascade looks like this: they earn from Upwork, a direct client, a part-time retainer, and a one-off project — all in different months, some invoiced, some not. They have no single number telling them "you've earned ₹17.4 lakh this year." They don't know when to register. They don't know the filing deadlines (GSTR-1 by 11th, GSTR-3B by 20th of following month). Most rely on a CA who costs ₹5,000–15,000/year but provides no real-time visibility. The invoice chaos is real — WhatsApp, email, Google Drive, Zoho — all scattered.

**Who experiences this:** Indian freelancers earning ₹6–40 lakh/year, particularly those in the ₹15–30 lakh bracket where GST threshold proximity is active anxiety. Also new freelancers who don't know the rules at all.

**Frequency:** Daily anxiety, monthly filing stress, quarterly returns for composition scheme users. This is a perpetual background stress, not a one-time event.

**Current alternatives:**

- A Chartered Accountant (CA): expensive, not real-time, relationship-dependent
- ClearTax / Zoho Books: generic accounting software, complex for freelancers, not threshold-aware
- Excel sheets: manual, error-prone, no alerts
- GST portal itself: government portal, no proactive intelligence
- General invoicing apps (Refrens, Invoice Ninja): invoicing only, no GST intelligence

**Why existing solutions fail:** ClearTax and Zoho Books are built for businesses, not solo freelancers. They require bookkeeping knowledge. They don't proactively warn you that you're ₹80,000 away from the threshold. CAs are asynchronous — they tell you what happened, not what's about to happen.

**Emotional pain:** High. Missing GST registration is not a minor inconvenience — it's a legal compliance failure with financial consequences. New freelancers feel genuine fear here. Established freelancers feel chronic low-grade stress.

**Financial pain:** Real and quantifiable. Penalties start at ₹10,000. Late filing fees accumulate. If you fail to register after crossing the threshold, the entire turnover can be assessed for unpaid tax.

**Must-have vs nice-to-have:** This sits closer to must-have for freelancers who are near or above the threshold. For those well below it, it's nice-to-have today, must-have tomorrow.

**Growing or shrinking:** Growing strongly. The Indian freelance economy is expanding rapidly — India is the second-largest freelance market globally and growing at \~20% annually. GST compliance complexity isn't decreasing.

### Customer Persona & ICP

Core persona: "Riya," 28, graphic designer in Pune. Earns ₹18–22 lakh/year from 4–6 clients. Filed taxes with a CA last year but doesn't fully understand her GST obligations. Gets paid via bank transfer, UPI, and occasionally PayPal. Stores invoices in WhatsApp and email. Has anxiety every time she quotes a new project — "should I be charging GST on this?"

**Best initial niche:** Indian tech freelancers and designers earning ₹10–30 lakh, active on platforms like Toptal, Upwork, LinkedIn, and in communities like Indie Hackers India, FreelancerIndia subreddit, Designer Hangout India.

**Who adopts fastest:** Freelancers who recently received a notice, or who just crossed (or nearly crossed) the threshold. Also new freelancers who want to "do it right from the start."

### Ratings

| Dimension | Score | Reasoning |
| --- | --- | --- |
| Pain severity | **7/10** | Real financial and legal risk, but not everyone feels it until they're stung |
| Urgency | **6/10** | Deadline-driven (monthly filings), but often procrastinated |
| Willingness to pay | **6/10** | Freelancers are price-sensitive, but will pay for something that saves them ₹10,000+ in penalties |
| Market timing | **8/10** | India freelance boom, increasing GST scrutiny, digital India push |
| Founder difficulty | **5/10** | Moderate — requires GST domain knowledge but no exotic tech |
| Competitive difficulty | **5/10** | Niche is underserved; generalist accounting tools aren't targeting this persona |

***

## PHASE 2 — Market Research

### Competitor Landscape

**Direct competitors (closest to this idea):**

There are virtually none that do exactly this for freelancers specifically. This is the most important finding. The gap is real.

**Indirect competitors:**

- **ClearTax** — Large, well-funded, broad audience. Their freelancer features are buried inside a business-focused product. No threshold alerts. Complex onboarding.
- **Zoho Books** — Full accounting suite. Powerful but overwhelming for a solo freelancer. ₹1,500–4,000/month pricing scares off individuals.
- **QuickBooks India** — Similar story to Zoho.
- **Refrens** — India-specific invoicing tool with some GST support. Growing, but focuses on invoice generation, not compliance intelligence.
- **myBillBook / Vyapar** — Designed for small businesses/retailers, not service-based freelancers.
- **Razorpay Rize** — Business banking + compliance bundle, but B2B focused.

**Substitute behaviors:**

The dominant substitute is "hire a CA and forget about it" — this is the real competitor. A CA costs ₹5,000–15,000/year and absorbs the anxiety. The product must be priced to undercut the CA OR complement the CA so well that freelancers want both.

**Gaps in the market:**

1. No product gives real-time threshold proximity alerts
2. No product is designed specifically for multi-source freelance income (platform + direct + retainer)
3. No product has a simple "how much GST do I owe right now?" dashboard
4. No product explains *why* — most GST tools assume you already know GST

**Community demand signals:**

Reddit's r/india, r/IndiaInvestments, and r/freelanceindia regularly surface questions like "I just crossed ₹20 lakh, what do I do?" and "how do I calculate GST on my Upwork income?" These threads get hundreds of upvotes and comments. The demand signal is clear and unambiguous.

Freelancer Facebook groups in India (Freelancers India, Indian Graphic Designers) are full of posts asking about GST compliance. Quora has thousands of questions about "GST for freelancers India" with millions of views. YouTube creators like Labour Law Advisor and Tax Guru have videos on this topic with 500K–2M views.

**Market size estimate:**

- India has approximately 15 million freelancers (NASSCOM estimates)
- Roughly 8–10% likely earn above ₹10 lakh/year, putting them in GST-relevant territory: \~1.2–1.5 million people
- Even at 5% penetration at ₹2,000/year average revenue: **₹12–15 crore ARR** in the SOM
- SAM (freelancers aware of and concerned about GST): \~3–4 million
- TAM (all Indian freelancers + small consultants): 15M+

**Market maturity:** Early. The category of "GST compliance tools for individual freelancers" essentially doesn't exist as a defined product category. That's an opportunity and a warning — you'll need to create the category, not just win share.

**Is this market overcrowded?** No. The generalist accounting tools are crowded. This niche is not.

**What positioning could win:** "The only GST tool built for freelancers, not businesses." Simple. The entire product language should speak to someone who doesn't know what a ledger is but does know they got paid ₹3 lakh last month and wants to know if they're okay.

***

## PHASE 3 — Digital Validation

### Execution Dimensions

**Technical difficulty:** Low to moderate. This is fundamentally a CRUD app with:

- Income tracking (manual entry + bank statement import)
- Threshold calculation logic (well-defined by GST law)
- Invoice storage (file upload + metadata)
- Notification system (email/SMS/WhatsApp)
- GST calculation engine (relatively simple math once rules are encoded)

No exotic technology required. The GST rules are publicly documented. The math is not complex.

**Operational difficulty:** Moderate. You need to stay current on GST rule changes (threshold changes, rate changes, new return formats). This requires ongoing domain expertise or a reliable CA partnership.

**Customer acquisition difficulty:** Moderate. Freelancers are scattered across communities, platforms, and professions. However, they congregate in specific places (Upwork India forums, LinkedIn groups, YouTube comments on CA videos) that are reachable.

**Retention difficulty:** Low — if the product is embedded in their monthly workflow (entering income, storing invoices), churn is naturally low. This is a habitual-use product.

**Monetization difficulty:** Moderate. Freelancers are price-sensitive. The sweet spot is ₹99–299/month or ₹999–2,499/year. Too cheap signals untrustworthiness for a compliance product. Too expensive and they'll stick with a CA.

**Capital requirements:** Low. This can be built by one technical founder for essentially ₹0 infrastructure cost at early stage. No unusual capital requirements.

**Legal/regulatory concerns:**

- You are providing financial/tax information, not filing on behalf of users. This distinction matters legally.
- You must not give personalized tax advice (that requires a CA license).
- Storing financial documents requires basic data security/privacy compliance.
- If you integrate with GST portal APIs, there are specific GSTN authorization requirements.

**AI disruption risk:** Moderate — LLMs could in theory answer GST questions, but a conversational bot isn't a system of record. People won't trust ChatGPT to track their actual income and alert them before a legal deadline. Structured tools with persistent data have a moat that AI chatbots don't easily dissolve.

**Platform dependency risk:** If you integrate with Upwork/Freelancer APIs, you're exposed to API policy changes. Keep manual entry as the fallback.

### Feasibility Assessment

| Question | Answer |
| --- | --- |
| Can a solo founder build this? | Yes |
| Can it be bootstrapped? | Yes |
| Time to MVP | 4–8 weeks (no-code/low-code) or 6–10 weeks (custom) |
| Time to first revenue | 2–3 months |
| Time to profitability | 12–18 months at modest scale |

**Validation verdict: Moderate-to-Strong opportunity.** Not a unicorn play, but a real, defensible, bootstrappable business in an underserved niche with genuine pain. The caveat: you must execute on trust and simplicity simultaneously, which is harder than it sounds.

***

## PHASE 4 — Founder Fit Analysis

### Skills Required

- Basic software product thinking (can be no-code)
- Strong understanding of Indian GST rules (non-negotiable)
- Empathy for non-accountant freelancers
- Community marketing ability (content, not ads, wins this)
- Ability to explain complex compliance in simple language

### What Type of Founder Succeeds Here

This is a **non-technical founder's opportunity** more than a technical founder's. The moat is domain knowledge and community trust, not engineering. A founder who:

- Was themselves a confused freelancer dealing with GST
- Has a CA background or strong CA connections
- Can write clearly for the freelance audience (blogs, YouTube, Twitter)
- Can build community before building product

A technical founder can absolutely build it faster, but the edge isn't code — it's credibility and distribution.

**Biggest bottlenecks:**

1. Earning trust with a compliance-sensitive audience
2. Keeping GST logic accurate as rules change
3. Convincing freelancers to change their current (messy) workflow

**Does this suit a beginner founder?** Yes, with caveats. The legal complexity requires either deep GST knowledge or a CA partner. Go in blind on the rules and you'll give wrong advice, kill trust, and face potential liability.

**Unfair advantages that would help:**

- Being a freelancer yourself (authentic storytelling)
- Having a CA co-founder or advisor
- Existing audience in freelancer communities
- Being known as a GST educator on YouTube/LinkedIn

**Probability of success if well-executed:** 55–65%. This is a real business. The failure modes are execution-specific, not market-specific.

**Top reasons this fails:**

1. GST rules change and the product gives wrong information — trust collapse
2. Product is too complex — freelancers don't adopt because it feels like accounting software
3. User acquisition cost exceeds LTV — can't find a scalable channel
4. A better-funded player (ClearTax, Razorpay) clones the feature as a free add-on

***

## PHASE 5 — Idea Improvement

### Repositioning

**Current framing (implicit):** "GST tracking software for freelancers" **Better framing:** "Your GST co-pilot — know exactly when to register, how much to pay, and never get fined"

This shift matters because the emotional job-to-be-done isn't "track income." It's "don't get in trouble with the tax department." Lead with the fear-removal.

### Better Target Audience (Start Narrower)

Don't start with "all Indian freelancers." Start with **tech freelancers and designers earning ₹12–25 lakh/year** — they are the most likely to be GST-threshold-adjacent, the most digitally savvy, and the most reachable via LinkedIn and Twitter.

### Better Monetization

| Tier | Price | What it includes |
| --- | --- | --- |
| Free | ₹0 | Income tracker, threshold indicator, basic alerts |
| Pro | ₹199/month or ₹1,499/year | Invoice vault, GST calculation, filing reminders, multi-source income |
| Pro + CA Connect | ₹499/month | Everything + 1 CA review call per quarter |

The CA partnership tier is the killer differentiator — you're not replacing the CA, you're making the CA relationship 10x more efficient.

### Better Growth Loops

1. **Share your GST status:** "I'm at 73% of my GST threshold" — shareable card that spreads brand in freelancer communities
2. **Invite your CA:** Give the CA a read-only view — they love it, they recommend it to other clients
3. **Content → Product:** Write the definitive guide to "GST for freelancers in India." Rank on Google. Convert readers to users.

### The Three MVPs

**Simplest winning MVP (build this first):** A WhatsApp bot or web form where a freelancer enters their monthly income from each source. The bot replies: "You've earned ₹14.2 lakh this year. You have ₹5.8 lakh before mandatory GST registration. At your current pace, you'll cross in approximately 3 months." That's it. No invoices, no filing, no dashboard. Just the number that matters. Launch in 3 weeks.

**Stronger premium version:** Full web app with income tracking, invoice upload/storage, GST calculation dashboard, filing deadline calendar with alerts via email and WhatsApp, and a CA directory for referrals.

**Scalable long-term vision:** Become the "Stripe Atlas for Indian freelancers" — not just GST but PAN-linked income aggregation, TDS tracking, ITR filing integration, and eventually a business current account for freelancers (FinTech layer).

### Three Pivots

1. **Pivot to SMB compliance:** Expand from freelancers to small agencies (5–15 person shops) facing the same GST confusion but with higher willingness to pay
2. **Pivot to CA enablement tool:** Instead of replacing CAs, sell a white-label version to CAs to manage all their freelancer clients — B2B2C model with higher LTV
3. **Pivot to GST education + tool bundle:** Build a Udemy-style GST course for freelancers and bundle the tool — content drives trust, tool drives retention

### Three Adjacent Opportunities

1. **TDS tracker:** Freelancers also face TDS deduction confusion — "my client deducted 10% TDS, how does this affect my ITR?" — another pain point, same audience
2. **Invoice financing:** Partner with a fintech to offer invoice-based credit to freelancers using your stored invoice data as collateral
3. **Freelancer financial health score:** A credit-score-like metric for freelancers based on income stability, GST compliance, and invoice history

### Three AI-Enabled Improvements

1. **AI invoice parser:** User forwards an invoice email or uploads a PDF — AI extracts amount, client name, date, and logs the income automatically
2. **AI GST Q&A:** Embedded chatbot trained specifically on Indian GST rules for freelancers — answers "do I need to charge GST on international clients?" in plain Hindi/English
3. **AI filing predictor:** Predicts which months you're likely to have highest liability based on past patterns — helps with cash flow planning

### Three Moat-Building Strategies

1. **Data moat:** The longer a freelancer uses the product, the more historical income data it holds — impossible to easily migrate, unlike a simple invoice tool
2. **CA network moat:** Build a network of CAs who recommend the product — each CA becomes a distribution channel and a trust signal
3. **Content moat:** Own the top 20 Google search results for "GST for freelancers India" through authoritative, accurate content — this is a 12-month investment that becomes a permanent distribution advantage

***

## PHASE 6 — Execution Plan

### 30-Day Validation Plan

**Week 1:** Talk to 20 freelancers. Ask: Do you know your current annual turnover? Have you paid GST? Do you know when you're supposed to register? Where do you store invoices? What do you currently use? Record everything.

**Week 2:** Build the simplest possible version — a Google Sheet or Notion template that calculates threshold proximity when you fill in monthly income. Share it for free in 3 freelancer communities. Watch if people use it.

**Week 3:** Create a landing page (use Framer or Carrd). Write one piece of content: "The complete guide to GST for Indian freelancers in 2025." Run it on LinkedIn and Reddit. Collect emails.

**Week 4:** Offer 10 early users a 30-minute call in exchange for detailed feedback. Pre-sell the product at ₹999/year to 5 people before building it. If 5 people pay, you have validation.

**Success criteria for Day 30:** 200 email signups, 5 pre-sales, 10 user interviews completed.

### 60-Day MVP Roadmap

**Tech stack (no-code route):**

- Bubble.io or Glide for the app
- Airtable as the database
- Zapier/Make for automation and alerts
- WhatsApp Business API (via Interakt or AiSensy) for notifications
- Razorpay for payments

**Tech stack (code route):**

- Next.js frontend
- Supabase (Postgres + auth + storage)
- Vercel for hosting
- Resend for email
- Twilio/MSG91 for WhatsApp/SMS

**MVP feature set (strict, nothing more):**

- Income entry by source and month
- Automatic threshold tracker with visual indicator
- GST liability calculator
- Invoice upload and storage (just PDF/image, no fancy parsing yet)
- Email + WhatsApp alerts at 75%, 90%, 100% of threshold
- Filing deadline calendar (GSTR-1 and GSTR-3B)

**Budget estimate:** ₹0–50,000 for no-code (mainly tool subscriptions). ₹1–3 lakh if hiring a developer for 6 weeks.

### 90-Day Launch Strategy

**Customer acquisition channels:**

1. **SEO content** — target "GST for freelancers India," "GST registration threshold freelancer," "how to calculate GST freelancer" — these have high intent and low competition
2. **YouTube** — partner with small CA YouTube channels (50K–500K subscribers) for sponsored content or affiliate deals
3. **Reddit + LinkedIn** — be genuinely helpful in freelancer communities; never pitch, just answer GST questions and let your profile link do the work
4. **CA referral program** — give CAs a referral link; when their clients sign up, CA gets a cut or a free pro account
5. **Twitter/X** — post GST tips for freelancers weekly; build a following before selling

**Pricing for launch:** Offer lifetime deal at ₹2,999 (one-time) for the first 100 users — this funds development and creates early evangelists.

**Content strategy:** One definitive blog post per week on GST topics for freelancers. Topics: "Do I need to charge GST on international clients?", "GST on Upwork income India," "How to get GST number as a freelancer," "GSTR-1 vs GSTR-3B explained simply." These are all real search queries with real volume.

***

## PHASE 7 — Final Verdict

**Brutally honest assessment:** This is a real idea solving a real problem in an underserved niche. It is not a unicorn. It is not a bad idea. It is a genuine small-to-mid-sized SaaS business that a solo founder or small team can bootstrap to ₹50 lakh–2 crore ARR over 3 years if executed with disciplined focus on simplicity, trust, and content-led distribution.

The risks are not existential — they are execution risks. The biggest danger is building something that looks like accounting software when it needs to feel like a "peace of mind" product. The second biggest danger is GST rule inaccuracies eroding trust.

**Would I personally pursue it?** Yes, but only if I had strong GST knowledge or a CA co-founder. Without domain authority, the product will make expensive mistakes and lose trust fast.

**Real revenue potential:** Yes — ₹50 lakh to ₹2 crore ARR in 3 years is realistic. Not a venture-scale outcome, but a strong lifestyle business or a sellable asset.

**Startup-scale potential:** Moderate, only if expanded beyond GST into full freelancer financial OS (income tracking, TDS, ITR, banking). The GST-only version is a feature, not a company, at venture scale.

**Biggest hidden risk:** A well-funded player (ClearTax, Razorpay, Zoho) adds a "freelancer mode" with threshold alerts as a free feature. This doesn't kill the business but limits the ceiling significantly.

**Biggest hidden opportunity:** The CA referral/partnership channel. If 500 CAs each refer 10 clients, you have 5,000 paying users with near-zero acquisition cost. CAs have massive trust with their clients and actively want tools that make their job easier. This channel is almost entirely untapped.

**Single smartest next move:** Before writing one line of code, publish the definitive guide to "GST for Indian freelancers" and collect 500 email signups. If 500 people sign up in 30 days from organic search and sharing, the market exists and wants you. If you can't get 500 signups, your distribution thesis is wrong and you need to find a new channel before building.

***

**The bottom line:** This isn't a bad idea dressed up as a good one — it's a genuinely underserved problem in a growing market. The Indian freelance boom is real, GST compliance anxiety is real, and no one is solving it specifically for this persona. The ceiling is a strong lifestyle business (₹1–2 crore ARR) with a path to something larger if you expand the product scope.

The single thing that separates success from failure here isn't the product — it's whether you build trust fast enough before a larger player notices the gap. That means content and community before code.

# MVP Description

Here's the complete build plan — broken into what to build, how to build it, and in what order.

***

## The core principle: one screen, one number

The MVP must answer exactly one question the moment a freelancer opens it: "Am I safe?" Everything else is secondary. No charts, no reports, no settings pages. Just: here's where you stand, here's what you owe, here's when to act.

***

## What the MVP includes (and excludes)

**In scope — these 5 things only:**

1. Income entry by source and month (manual, no bank integration)
2. Real-time threshold tracker showing ₹X earned of ₹20L limit
3. GST liability calculator (18% on B2B services, 0% on exports — the two most common freelancer cases)
4. Invoice upload and storage (PDF/image, flat storage, no parsing)
5. Alert system — email + WhatsApp at 75%, 90%, and 100% of threshold

**Out of scope for MVP — do not build these yet:**

- Bank statement import
- Automatic invoice parsing / OCR
- GSTR-1 / GSTR-3B filing assistance
- CA matching
- TDS tracking
- Mobile app
- Multi-user / team features
- Dashboard analytics or charts

Cutting these is not laziness — it's the difference between shipping in 6 weeks and 6 months. Every feature you defer is a feature you validate first with real users before building.

***

## Tech stack decision

Two paths. Pick one based on your background:

**No-code path (recommended if you're non-technical):**

- Frontend + database: Bubble.io (\~₹2,500/month at launch scale)
- File storage: Bubble's built-in file hosting
- Alerts: Make.com (automation) + MSG91 (WhatsApp/SMS) + Resend (email)
- Payments: Razorpay
- Landing page: Framer or Carrd

Total monthly infrastructure cost at launch: ₹4,000–7,000

**Code path (if you're technical or have a dev):**

- Frontend: Next.js (App Router)
- Backend + DB + Auth: Supabase (free tier covers early stage)
- File storage: Supabase Storage
- Email: Resend (free tier: 3,000 emails/month)
- WhatsApp alerts: Interakt or AiSensy (₹999/month starter)
- Payments: Razorpay
- Hosting: Vercel (free tier)

Total monthly infrastructure cost at launch: ₹1,500–3,000

***

## The database schema (what you need to store)

Five tables. Nothing more.

| Table | Key fields |
| --- | --- |
| `users` | id, name, email, phone, gst\_state (general/special category), created\_at |
| `income_entries` | id, user\_id, source\_name, amount, month, year, income\_type (domestic/export), created\_at |
| `invoices` | id, user\_id, client\_name, amount, invoice\_date, file\_url, notes |
| `alerts_sent` | id, user\_id, alert\_type (75/90/100), sent\_at |
| `subscriptions` | id, user\_id, plan, status, razorpay\_id, valid\_until |

The GST threshold logic lives in your app code, not the database. On every income entry, you recalculate: sum all `income_entries` for this financial year (April–March) for this user. If it crosses 75%, 90%, or 100% of ₹20 lakh (or ₹10 lakh for special category states), fire an alert — but only if that alert hasn't been sent yet (check `alerts_sent`).

***

## The GST calculation logic

This is the core of the product. Encode it correctly from day one.

```javascript
Financial year: April 1 to March 31

Threshold:
  General states: ₹20,00,000
  Special category states: ₹10,00,000
  (J&K, Uttarakhand, HP, Manipur, Mizoram, Nagaland, Tripura, Sikkim, Arunachal Pradesh, Meghalaya)

GST rates for freelancers:
  Domestic B2B services: 18% (most common)
  Exports of services: 0% (zero-rated, but counts toward threshold)
  International clients paying in foreign currency: treated as export = 0% GST

Liability calculation (once registered):
  Monthly GST payable = Total invoiced amount in that month × 18%
  (Only on domestic invoices; export invoices = 0%)

Filing deadlines (once registered):
  GSTR-1: 11th of following month
  GSTR-3B: 20th of following month
  (Quarterly for composition scheme — not relevant for most freelancers)

Penalty for late filing:
  ₹50/day per return (CGST ₹25 + SGST ₹25)
  Minimum penalty: ₹10,000

```

***

## The alert system (the most important feature)

Three alert triggers, each firing once per financial year:

- 75% alert: "You've earned ₹15 lakh this year — you're 75% of the way to mandatory GST registration. At this pace, you'll cross in approximately X weeks."
- 90% alert: "You've earned ₹18 lakh. Register for GST now — crossing ₹20 lakh without registration carries a minimum ₹10,000 penalty."
- 100% alert: "You've crossed the GST threshold. You must register immediately. Here are the next steps."

Delivery: email (Resend) + WhatsApp (Interakt). WhatsApp open rates in India are \~90% vs \~20% for email — WhatsApp is the primary channel, email is the backup. SMS as tertiary.

Each alert message should include one link to a plain-language guide on what to do next. Don't just fire the alert — tell them what action to take.

***

## The UI: 3 screens only

Here's what the MVP interface looks like. Three screens, no more.



**Screen 1 — Dashboard (the only screen most users ever need)**

Shows the threshold bar, current year earnings total, estimated next milestone, and a "Log income" button. That's it. No nav, no clutter.

**Screen 2 — Income log**

A simple table of income entries with a form: Source name, Amount (₹), Month/Year, Type (Domestic / Export). One add button. No edit history, no bulk import — just the form.

**Screen 3 — Invoice vault**

File upload (drag or tap). Each invoice shows: client name, amount, date, and a download link. No tagging, no search yet. Chronological list is enough for MVP.

Here's what that dashboard screen actually looks like:That's the entire MVP UI. One screen that tells the full story at a glance — threshold bar, key numbers, recent entries, one alert when it matters.

***

## Build sequence: week by week

**Week 1 — Foundation**

- Set up your tech stack (Bubble or Supabase + Next.js)
- Build user auth (email + Google login)
- Build the income entry form (source, amount, month, type)
- Build the threshold calculation logic
- Display the threshold bar on dashboard

At the end of week 1, a user can sign up, enter income, and see their threshold status. That alone is the core value proposition.

**Week 2 — Alerts**

- Set up Resend (email) and Interakt/AiSensy (WhatsApp)
- Build the alert trigger logic (75%, 90%, 100% of threshold)
- Build the `alerts_sent` deduplication so users don't get spammed
- Write the three alert messages (make them actionable, not just notifications)
- Test the full alert flow end-to-end

**Week 3 — Invoice vault**

- Build file upload (PDF and images, max 10MB each)
- Store files in Supabase Storage or Bubble's file hosting
- Build the invoice list view (client name, amount, date, download link)
- Add a simple upload form

**Week 4 — Payments + polish**

- Integrate Razorpay for ₹999/year Pro plan
- Gate invoice vault behind Pro (keep dashboard and alerts on free tier)
- Add the GST liability calculator (total domestic income × 18%)
- Add filing deadline calendar — just two dates per month, hardcoded
- Fix all edge cases: April vs March year boundaries, special category states toggle, export vs domestic income distinction
- Basic mobile responsiveness

**Week 5–6 — Testing and launch prep**

- Give 10 freelancers free access. Watch them use it. Note every point of confusion.
- Fix the top 5 problems they surface
- Write the landing page copy: lead with "Never pay a GST penalty again"
- Add a waitlist/email capture for people not ready to pay
- Set up basic analytics (Plausible or Umami — avoid Google Analytics complexity)

***

## The 10 decisions that matter most

These are the places where most early-stage products go wrong:

**1. Financial year boundary:** India's FY runs April 1 – March 31, not January–December. Get this wrong and all threshold calculations are wrong. Build a test case specifically for a user who has income in March and April.

**2. Special category states:** Users in J&K, Uttarakhand, and 8 other states have a ₹10 lakh threshold, not ₹20 lakh. Ask for state on signup. Don't let this be a setting they can forget to set — ask it upfront with a simple picker.

**3. Export income still counts toward the threshold:** A common misconception is that international/export income doesn't trigger GST registration. It does — it's zero-rated once registered, but it absolutely counts toward the turnover threshold. Your income entries must count exports in the total but exclude them from liability calculation. This is the most technically important distinction in your entire product.

**4. Don't give tax advice:** Your app can say "you've crossed the threshold, here are next steps." It cannot say "you owe ₹X in GST this month" as if it's filing guidance. The calculation is informational. Add a one-line disclaimer on the liability calculator: "This is an estimate for planning purposes. Consult a CA before filing."

**5. Monthly vs aggregate tracking:** Users enter income monthly. The threshold is annual aggregate. Make sure your UI shows both — "₹85,000 this month" and "₹14.6L this year" — so users understand what's driving the threshold bar.

**6. WhatsApp template approval:** WhatsApp Business API messages require pre-approved templates. Submit your three alert message templates to Meta through Interakt before you need them. Approval takes 1–3 days. Don't wait until launch week.

**7. Razorpay recurring subscriptions:** For an annual plan, use Razorpay's subscription product, not one-time payments. This handles renewals automatically and reduces churn from payment failures.

**8. Free vs paid gating:** Put the threshold bar and alerts on the free tier. These are what make users realize the product is valuable. Gate the invoice vault and the GST liability calculator behind Pro. Freemium where the free tier is genuinely useful is the right model here — it converts better than a free trial.

**9. Data security basics:** You're storing financial documents. Use HTTPS (automatic on Vercel/Supabase). Don't expose file URLs without authentication — use signed URLs with expiry (Supabase Storage supports this natively). Add a basic privacy policy stating you don't sell data and don't share with third parties. This is a trust product — the basics matter more than they do for most apps.

**10. The financial year reset:** On April 1 each year, every user's threshold counter resets to zero. Make sure you archive the previous year's data (don't delete it — users will want to see last year's records) and start the new FY counter fresh. This is easy to miss and catastrophic if it silently fails.

***

## Launch channels for the first 100 users

In order of expected conversion rate:

1. **Post in r/freelanceindia and r/IndiaInvestments** — not a pitch, a genuine "I built this because I had this problem" post. These communities respond well to authentic founder stories and brutally ignore marketing copy.
2. **LinkedIn post from your personal profile** — "I was terrified of accidentally missing my GST threshold. So I built this." Tag 5–10 CA influencers in the post.
3. **DM 20 freelancers directly** — find them in the comments of CA YouTube videos asking GST questions. Offer free access in exchange for 15 minutes of feedback.
4. **One CA partnership** — find one CA who advises freelancers and offer them free Pro accounts for all their clients. If they have 30 clients, you have 30 users with a trusted referral.
5. **Lifetime deal at ₹2,999** — post on IndieHackers and in freelancer Facebook groups. Lifetime deals convert skeptics who don't want to commit to recurring.

***

## Budget estimate

| Item | Cost |
| --- | --- |
| Supabase (free tier) | ₹0 |
| Vercel (free tier) | ₹0 |
| Resend (free: 3K emails/month) | ₹0 |
| Interakt WhatsApp starter | ₹999/month |
| Domain | ₹800/year |
| Razorpay (2% transaction fee) | \~₹200 per ₹999 sale |
| Total month 1 infrastructure | \~₹2,000/month |

You need 3 paying users at ₹999/year to cover month 1 infrastructure. That's the bar.

The hardest part of this build is not the code — it's correctly encoding the GST rules for all edge cases and earning enough trust that a freelancer hands you their financial data. Get those two things right and the rest is straightforward execution.
