# Tech Enablement Hub — Overview

**Team:** Technology, People, Innovation & Learning (TPIL) — T&P APAC, Salesforce
**Owner:** Megha Sood | **Status:** Live in GitHub Codespaces | **Date:** May 2026

---

## Why We Built This

The TPIL team runs 150+ programs per year across 5 program types — Calendar Training, Tech Talks, Cohort Programs, Onboarding, and Partnerships — serving thousands of engineers across APAC. Before this tool:

- **Program planning** was manual — PMs tracked 40+ tasks per program in spreadsheets with no timeline automation
- **Banner creation** required design requests with multi-day turnaround for every Slack announcement
- **Reporting** meant manually copying numbers from L++ exports into slide decks
- **Dashboards** didn't exist — leadership had no single view of program health, attendance, or CSAT trends
- **Data lived in silos** — UDMS spreadsheets, L++ exports, Google Sheets, and Slack posts were disconnected

The Tech Enablement Hub consolidates everything into one platform that any PM on the team can use without technical skills.

---

## What It Does

| Feature | What It Solves |
|---|---|
| **Dashboard** | Single view of all programs — total sessions, registered, attended, attendance %, learner CSAT, trainer CSAT. Color-coded by program type. Live Salesforce news feed via Gemini AI. |
| **Program Planner** | Auto-generates a 40-task checklist across 6 phases from a launch date. Inline editing for owners, dates, and comments. Export to CSV or save as JSON. |
| **Banner Creator** | Generates Salesforce-branded banners in 8 templates and 6 sizes (LinkedIn, Instagram, Slack, etc.). AI-powered title/subtitle/Slack post generation. AI background image generation. Download as PNG. |
| **Report Generator** | Upload L++ CSV/Excel exports for instant CSAT visualization, completion rates, and topic analysis. Optional Google Sheets live sync. |
| **Program Pages** | Dedicated page per program type with filtered stats and detailed data table (trainer, attendance, CSAT). |

---

## How We Built It

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Tailwind CSS, React Router v6, Lucide icons |
| **Backend** | Node.js, Express, Multer (file uploads), XLSX parser |
| **AI** | Google Gemini Flash API — text generation (titles, Slack posts) and image generation (banner backgrounds) |
| **Data** | CSV file (`program-data.csv`) parsed at runtime — no database required. Replace the file to update all dashboards. |
| **Design System** | Salesforce Sans font, full Salesforce 2026 color palette, Airbnb-inspired card-based UI |
| **Hosting** | GitHub Codespaces (development), deployable to Railway/Render/Vercel |

**Architecture:** The frontend fetches `program-data.csv` from the public folder and parses it client-side. The Express backend serves AI endpoints (Gemini), file uploads, and optional Google Sheets integration. No database — the CSV is the single source of truth.

---

## What's Needed to Fully Automate

### 1. Live Data Connection (Replaces Manual CSV Updates)

| Integration | What It Enables | Access Required |
|---|---|---|
| **Google Sheets API** | Auto-sync UDMS data to dashboard in real-time instead of replacing CSV files | Google Cloud service account + sheet shared with service account email |
| **L++ API** (if available) | Pull program data, attendance, and CSAT directly from L++ | API credentials from L++ platform team |
| **Salesforce Data Cloud** | Connect to internal Salesforce data for richer reporting | Data Cloud access + connected app setup |

### 2. AI Features (Currently Working)

| Integration | Status | Access Required |
|---|---|---|
| **Gemini Flash API** (text) | Active | `GEMINI_API_KEY` in `.env` — available from Google AI Studio |
| **Gemini Image API** (banners) | Active | Same API key — uses `gemini-2.0-flash-preview-image-generation` model |

### 3. Distribution & Notifications

| Integration | What It Enables | Access Required |
|---|---|---|
| **Slack Incoming Webhook** | Auto-post program announcements from Banner Creator directly to Slack channels | Slack app with incoming webhook URL for target channels |
| **Marketing Cloud API** | Send program email campaigns directly from the platform | MC API credentials + sender profile |
| **Calendar API (Google/Outlook)** | Auto-create calendar invites when a program plan is generated | OAuth consent for calendar write access |

### 4. Production Deployment

| Step | What's Needed |
|---|---|
| **Custom Domain** | DNS record pointing to hosting provider |
| **CI/CD Pipeline** | GitHub Actions workflow for auto-deploy on push to main |
| **Authentication** | Salesforce SSO / Okta integration for team-only access |
| **Persistent Storage** | PostgreSQL or MongoDB for saving program plans, report history (currently file-based) |

---

## Current Access Requirements (Minimum to Run)

| Requirement | Status |
|---|---|
| GitHub Codespaces | Active — running at `meghasood-tpil/tech-enablement-hub` |
| Node.js v18+ | Included in Codespaces |
| Gemini API Key | Set in `.env` — get from [aistudio.google.com](https://aistudio.google.com) |
| Program Data CSV | Manually updated in `client/public/data/program-data.csv` |

---

## Impact

- **Program planning time:** 2-3 days → 2 minutes (auto-generated 40-task checklist)
- **Banner creation:** Design request with 2-day wait → instant self-service with AI
- **Reporting:** Hours of manual data wrangling → upload CSV, get instant visualizations
- **Visibility:** No dashboard → real-time view of all programs, attendance, and CSAT for leadership

---

*Built with React, Tailwind CSS, Gemini AI, and Claude Code.*
