# Quick Reference Card

## 🚀 Getting Started

### First Time Setup
```bash
cd /Users/megha.sood/tech-enablement-hub

# Install dependencies
npm install
cd client && npm install && cd ..

# Start the app
npm run dev
```

**Open:** http://localhost:3000

---

## 📊 Google Sheets Real-Time Reports (Your Request!)

### Quick Setup (15 min)
1. **Install library:** `npm install googleapis`
2. **Google Cloud Console:**
   - Create project
   - Enable Google Sheets API
   - Create service account
   - Download credentials.json
3. **Move credentials:** `mv ~/Downloads/*.json server/credentials.json`
4. **Share your sheet** with service account email
5. **Get Sheet ID** from URL
6. **Test in app!**

### Using It
1. Go to Reports page
2. Enter Sheet ID
3. Click "Connect & Generate Report"
4. ✅ Check "Auto-refresh" for live updates!

**Full Guide:** `SETUP_GOOGLE_SHEETS.md`

---

## 📋 Program Planner

**Generate 40+ task checklist automatically:**
1. Click "Program Planner"
2. Enter program details + launch date
3. Click "Generate"
4. All tasks with auto-calculated dates!
5. Export to CSV

---

## 🎨 Banner Creator

**Create Salesforce-branded materials:**
1. Click "Banner Creator"
2. Choose program type (colors auto-apply!)
3. Fill in details
4. Download PNG + Copy Slack post

---

## 🗂️ Project Structure

```
tech-enablement-hub/
├── START_HERE.md              ← Read this first!
├── SETUP_GOOGLE_SHEETS.md     ← Real-time reports setup
├── QUICK_REFERENCE.md         ← This file
├── client/                    ← React frontend
│   └── src/
│       ├── pages/             ← All features
│       └── utils/             ← Colors & checklist
└── server/
    ├── index.js               ← Backend API
    └── credentials.json       ← Add this for Google Sheets!
```

---

## 🎨 Salesforce Brand Colors

Already integrated in app:

| Program Type | Primary Color |
|-------------|---------------|
| Tech Talks | Purple (#BA01FF) |
| Calendar Training | Blue (#066AFE) |
| Cohorts | Teal (#06A59A) |
| Onboarding | Green (#45C65A) |
| Partnerships | Orange (#F38303) |

**Font:** Salesforce Sans (all weights) ✅

---

## 🔧 Common Commands

```bash
# Install dependencies
npm install
cd client && npm install

# Start development
npm run dev              # Both frontend & backend

# Start separately
npm run server          # Backend only
npm run client          # Frontend only

# Install Google Sheets
npm install googleapis

# Check if running
curl http://localhost:5000/api/health
```

---

## 📖 Documentation Files

| File | Purpose | Read When |
|------|---------|-----------|
| **START_HERE.md** | Entry point | First time setup |
| **SETUP_GOOGLE_SHEETS.md** | Real-time reports | Setting up Google Sheets |
| **QUICK_REFERENCE.md** | This cheat sheet | Quick lookup |
| **PROJECT_SUMMARY.md** | What was built | Understanding project |
| **FEATURES_WALKTHROUGH.md** | Visual guide | Learning features |
| **GOOGLE_SHEETS_INTEGRATION.md** | Detailed integration | Advanced setup |
| **README.md** | Full documentation | Development |

---

## 🌐 URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Main app |
| Backend API | http://localhost:5000 | API server |
| Health Check | http://localhost:5000/api/health | Server status |

---

## ✅ Feature Checklist

- [x] Auto-generated program plans (40+ tasks)
- [x] Banner creator with Salesforce branding
- [x] Slack post generator
- [x] L++ report generator (CSV/Excel upload)
- [x] **Google Sheets real-time integration** ← NEW!
- [x] 5 program dashboards
- [x] Complete documentation
- [x] Auto-refresh for live data
- [x] Export/download capabilities

---

## 🆘 Quick Troubleshooting

**Can't start app?**
```bash
# Check Node.js installed
node --version  # Need v16+

# Kill processes on ports
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9

# Reinstall
rm -rf node_modules client/node_modules
npm install
cd client && npm install
```

**Google Sheets not working?**
- Check `credentials.json` in `server/` folder
- Verify sheet is shared with service account
- Confirm Sheet ID is correct
- See: `SETUP_GOOGLE_SHEETS.md`

**Port already in use?**
```bash
lsof -ti:3000 | xargs kill -9  # Frontend
lsof -ti:5000 | xargs kill -9  # Backend
```

---

## 📊 Google Sheet Format

**Minimal:**
```
Status      | CSAT Rating
Completed   | 5
Completed   | 4
In Progress | 3
```

**Full:**
```
Participant | Status | CSAT Rating | Topics | Certification
John Doe    | Done   | 5          | AI;ML  | Yes
Jane Smith  | Done   | 4          | AI     | Yes
```

---

## 🎯 Next Steps

1. ✅ Install Node.js (if not installed)
2. ✅ Run `npm install` commands
3. ✅ Start app with `npm run dev`
4. ✅ Test all features
5. ✅ Setup Google Sheets (15 min)
6. ✅ Connect your real data
7. ✅ Share with team!

---

## 💡 Pro Tips

- **Save time:** Use auto-refresh for dashboards
- **Export:** Download program plans as CSV
- **Multiple sheets:** Track different programs separately
- **Bookmark:** Save your Sheet IDs for quick access

---

**Everything you need is documented and ready!** 🚀

*Last updated: Full Google Sheets integration implemented!*
