# Tech Enablement Hub - Project Status

**Last Updated:** May 13, 2026  
**Project Owner:** Megha Sood  
**Environment:** GitHub Codespaces  
**Status:** Active Development

---

## 🎯 Project Overview

A complete web application for managing Tech Enablement programs at Salesforce T&P APAC. Includes program planning, banner creation, reporting, and dashboards for 5 program types.

**Location:**
- **Codespaces (ACTIVE):** `/workspaces/tech-enablement-hub/`
- **Local Mac (BACKUP):** `/Users/megha.sood/tech-enablement-hub/`

**⚠️ CRITICAL:** Changes must be made in Codespaces, not local Mac files!

---

## 🚀 Features (Completed)

### 1. ✅ Program Planner
- Auto-generates 40+ tasks across 6 phases from Excel checklist
- Timeline calculation from launch date
- Progress tracking with visual indicators
- Task assignment and comments
- Export to CSV, save/resume capability
- **File:** `client/src/pages/ProgramPlanner.js`

### 2. ✅ Banner Creator (IN PROGRESS - ADDING TEMPLATES)
- Salesforce-branded banner generation
- 3 template styles (Modern, Minimal, Bold) - **ADDING 5 MORE**
- Real-time preview
- Download as PNG (html2canvas)
- Auto-formatted Slack posts
- Copy to clipboard
- **Current Issue:** Need to add 5 more templates + size selector in Codespaces
- **File:** `client/src/pages/BannerCreator.js`

### 3. ✅ Report Generator
- CSV/Excel file upload
- Google Sheets integration (optional - setup required)
- CSAT score visualization
- Completion rate tracking
- Topic interest analysis
- **File:** `client/src/pages/Reports.js`

### 4. ✅ Program Dashboards
- Calendar Training (Blue)
- Tech Talks (Purple)
- Cohort Programs (Teal)
- Onboarding (Green)
- Partnership Programs (Orange)
- **Files:** `client/src/pages/programs/*.js`

### 5. ✅ Gemini AI Integration (Setup but API Key Issue)
- Auto-generate banner titles, subtitles, Slack posts
- Backend endpoint: `/api/ai/generate-banner`
- **Issue:** API key validation failing
- **Status:** Feature exists but user can't use without valid key
- **File:** `server/index.js` (lines 329-394)

---

## 📁 Key File Structure

```
tech-enablement-hub/
├── client/                          # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── BannerCreator.js    # ⚠️ NEEDS UPDATES
│   │   │   ├── BannerCreator.css   # ⚠️ NEEDS UPDATES
│   │   │   ├── ProgramPlanner.js
│   │   │   ├── Reports.js
│   │   │   └── programs/           # 5 program dashboards
│   │   ├── utils/
│   │   │   ├── checklistTemplate.js
│   │   │   └── salesforceColors.js
│   │   └── App.js
│   ├── public/
│   └── package.json                # Has proxy config for Codespaces
├── server/
│   ├── index.js                    # Express backend with Gemini AI
│   ├── uploads/                    # File upload directory
│   └── data/                       # Saved program data
├── .env                            # GEMINI_API_KEY (shows "U" - untracked by git)
├── package.json
└── [15+ documentation files]
```

---

## 🔧 Tech Stack

**Frontend:**
- React 18
- React Router v6
- Axios (HTTP requests)
- html2canvas (banner downloads)
- date-fns (date formatting)
- lucide-react (icons)

**Backend:**
- Node.js v24.14.0
- Express
- Multer (file uploads)
- XLSX parser
- Google Sheets API (optional)
- @google/generative-ai (Gemini AI)
- dotenv

**Ports:**
- Frontend: 3000
- Backend: 5000

---

## 🎨 Current Work: Adding Banner Templates & Sizes

### What User Requested:
"lets add more templates for Banner genration also size selections"

### Templates to Add (8 Total):
1. ✅ Modern Gradient (existing)
2. ✅ Minimal Clean (existing)
3. ✅ Bold & Vibrant (existing)
4. ⚠️ Professional Corporate (needs to be added in Codespaces)
5. ⚠️ Playful & Dynamic (needs to be added in Codespaces)
6. ⚠️ Technical Blueprint (needs to be added in Codespaces)
7. ⚠️ Salesforce Ohana (needs to be added in Codespaces)
8. ⚠️ Trailblazer (needs to be added in Codespaces)

### Size Options to Add (6 Total):
1. Default (Flexible) - 100% width
2. LinkedIn Post - 1200 x 627px
3. Instagram Post - 1080 x 1080px
4. Twitter Header - 1600 x 900px
5. Slack Banner - 800 x 418px
6. Presentation Slide - 1920 x 1080px

### Status:
- ✅ Changes made to LOCAL Mac files (`/Users/megha.sood/tech-enablement-hub/`)
- ❌ Changes NOT yet made to CODESPACES files (`/workspaces/tech-enablement-hub/`)
- User sees old version because Codespaces is running from different location
- Server compiled successfully, but old code is running

---

## 🚨 Critical Issue: Local vs Codespaces Files

**Problem:** 
- Claude Code edited files on local Mac (`/Users/megha.sood/`)
- User is running app in GitHub Codespaces (`/workspaces/`)
- These are TWO DIFFERENT locations with different file contents
- Changes to local files don't affect Codespaces

**Solution:**
- All future edits MUST be made in Codespaces directly
- User needs to edit files in Codespaces IDE
- OR copy updated code from local to Codespaces

---

## 📝 Code Changes Needed in Codespaces

### File 1: `client/src/pages/BannerCreator.js`

**Line 9-17** - Add `size` to state:
```javascript
const [bannerData, setBannerData] = useState({
  programType: 'Tech Talks',
  title: '',
  subtitle: '',
  date: '',
  time: '',
  location: 'Virtual',
  template: 'modern',
  size: 'default'  // ADD THIS LINE
});
```

**After line 28** - Add bannerSizes constant:
```javascript
const bannerSizes = {
  default: { width: '100%', height: 'auto', minHeight: '400px', label: 'Default (Flexible)' },
  linkedin: { width: '1200px', height: '627px', label: 'LinkedIn Post (1200 x 627)' },
  instagram: { width: '1080px', height: '1080px', label: 'Instagram Post (1080 x 1080)' },
  twitter: { width: '1600px', height: '900px', label: 'Twitter Header (1600 x 900)' },
  slack: { width: '800px', height: '418px', label: 'Slack Banner (800 x 418)' },
  presentation: { width: '1920px', height: '1080px', label: 'Presentation Slide (1920 x 1080)' }
};
```

**Line 154-165** - Update template dropdown:
```javascript
<div className="form-group">
  <label>Template Style</label>
  <select name="template" value={bannerData.template} onChange={handleChange} className="form-control">
    <option value="modern">Modern Gradient</option>
    <option value="minimal">Minimal Clean</option>
    <option value="bold">Bold & Vibrant</option>
    <option value="professional">Professional Corporate</option>
    <option value="playful">Playful & Dynamic</option>
    <option value="technical">Technical Blueprint</option>
    <option value="ohana">Salesforce Ohana</option>
    <option value="trailblazer">Trailblazer</option>
  </select>
</div>
```

**After template dropdown** - Add size dropdown:
```javascript
<div className="form-group">
  <label>Banner Size</label>
  <select name="size" value={bannerData.size} onChange={handleChange} className="form-control">
    {Object.entries(bannerSizes).map(([key, value]) => (
      <option key={key} value={key}>{value.label}</option>
    ))}
  </select>
</div>
```

**Line 161-167** - Update banner preview wrapper:
```javascript
<div className="banner-wrapper" style={{
  width: '100%',
  overflow: 'auto',
  display: 'flex',
  justifyContent: 'center'
}}>
  <div
    ref={bannerRef}
    className={`banner-preview ${bannerData.template}`}
    style={{
      background: colors ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` : '#066AFE',
      width: bannerSizes[bannerData.size].width,
      height: bannerSizes[bannerData.size].height,
      minHeight: bannerSizes[bannerData.size].minHeight || 'auto',
      maxWidth: '100%'
    }}
  >
```

**Close the wrapper** - Add closing `</div>` after banner content ends

### File 2: `client/src/pages/BannerCreator.css`

**After line 50** - Add new template styles:
```css
.banner-preview.professional {
  background: linear-gradient(135deg, #001E5B 0%, #004280 100%) !important;
  border-left: 8px solid #00D4FF;
}

.banner-preview.playful {
  box-shadow:
    0 0 0 6px rgba(255, 255, 255, 0.3),
    0 20px 40px rgba(0, 0, 0, 0.2);
  transform: rotate(-0.5deg);
}

.banner-preview.technical {
  position: relative;
  border: 3px solid rgba(255, 255, 255, 0.4);
}

.banner-preview.technical::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  opacity: 0.5;
}

.banner-preview.ohana {
  background: linear-gradient(135deg, #0176D3 0%, #1589EE 50%, #50E3C2 100%) !important;
  box-shadow: 0 20px 60px rgba(1, 118, 211, 0.4);
}

.banner-preview.ohana::after {
  content: '🏔️';
  position: absolute;
  bottom: 20px;
  right: 30px;
  font-size: 4rem;
  opacity: 0.15;
}

.banner-preview.trailblazer {
  background: linear-gradient(135deg, #032D60 0%, #0176D3 100%) !important;
  position: relative;
  overflow: hidden;
}

.banner-preview.trailblazer::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.banner-preview.trailblazer .banner-title {
  text-transform: uppercase;
  letter-spacing: 2px;
}
```

---

## 🔄 How to Apply Changes in Codespaces

### Method 1: Manual Edit in Codespaces (Recommended)
1. Open Codespaces in browser
2. Navigate to files in left sidebar
3. Copy-paste code sections from this document
4. Save files (Ctrl+S)
5. Wait for "Compiled successfully"
6. Refresh browser (Ctrl+Shift+R)

### Method 2: Use Claude Code in Codespaces
1. In Codespaces, open terminal
2. Type: `claude`
3. Ask Claude to make the edits
4. Provide this PROJECT.md file for context

---

## 📊 Sample Data

**Location:** `/Users/megha.sood/Downloads/Sample_CSAT_Data.csv`

Contains 20 participant records with:
- Participant Name, Email
- Program Name, Session Date
- CSAT Score (1-5)
- Completion Status
- Topics of Interest
- Comments

Programs in sample data:
- Tech Talk - AI & Trust
- Calendar Training - Salesforce Admin
- Cohort - DevOps Bootcamp
- Tech Talk - Cloud Architecture

---

## ⚙️ Environment Setup

### Running in Codespaces (Current):
```bash
# Start both servers
npm run dev

# Ports:
# - Frontend: 3000
# - Backend: 5000

# Make port 3000 PUBLIC in PORTS tab to access externally
```

### Environment Variables:
```
GEMINI_API_KEY=AIzaSyAfygMo6hlskS6O7Jl_QtX_aFQXX49OGp4
```
(Currently shows as invalid/expired - may need new key from user's personal Google account)

### Installed Packages:
- Root: express, cors, multer, xlsx, dotenv, @google/generative-ai
- Client: react, react-router-dom, axios, html2canvas, date-fns, lucide-react

---

## 🐛 Known Issues

### 1. Gemini AI API Key Invalid
- **Status:** API key fails with "[400 Bad Request] API key not valid"
- **Tried:** Multiple API keys from user's personal Google account
- **Impact:** AI content generation doesn't work
- **Workaround:** User can manually enter titles/subtitles
- **Note:** Feature is implemented, just needs valid API key

### 2. Banner Templates Not Showing
- **Status:** New templates coded in local Mac, not in Codespaces
- **Impact:** User sees old 3 templates instead of 8
- **Fix:** Apply code changes documented above to Codespaces files

### 3. Date Format Error (FIXED)
- ~~Issue: RangeError with date-fns in ProgramPlanner~~
- ~~Fix: Changed format from `yyyy-MM-DD` to `yyyy-MM-dd`~~
- Status: ✅ Resolved

---

## 📚 Documentation Files

Complete guides available:
1. START_HERE.md
2. QUICK_REFERENCE.md
3. PROJECT_SUMMARY.md
4. CODESPACES_QUICK_START.md
5. GITHUB_CODESPACES_SETUP.md
6. DOCKER_QUICK_START.md
7. DOCKER_SETUP.md
8. DOCKER_VISUAL_GUIDE.md
9. INSTALL_DOCKER.md
10. CHECK_NODEJS.md
11. SETUP_INSTRUCTIONS.md
12. SETUP_GOOGLE_SHEETS.md
13. GOOGLE_SHEETS_INTEGRATION.md
14. FEATURES_WALKTHROUGH.md
15. FINAL_SUMMARY.md

---

## ✅ Next Steps

### Immediate:
1. **Add 5 new banner templates** in Codespaces
2. **Add size selector dropdown** in Codespaces
3. **Add CSS for new templates** in Codespaces
4. **Test all templates and sizes**
5. **Verify download works for all sizes**

### Optional:
1. Get valid Gemini API key for AI features
2. Setup Google Sheets integration (if needed)
3. Deploy to production (Railway/Render)
4. Train team on using platform

---

## 💡 Important Notes

### For Next Chat Session:
- Read this PROJECT.md file first
- Check if working in Codespaces or local Mac
- Verify which files need updates
- Ask user to confirm Codespaces is running
- Remember: `/workspaces/` = Codespaces, `/Users/megha.sood/` = local Mac

### User Preferences:
- Works in Codespaces (no local Node.js/Docker allowed)
- Wants Salesforce-branded templates
- Needs banner size options for social media
- May need PDF with template examples (user mentioned "i will update the PDF")

### Git Status:
- .env file shows "U" (Untracked) - this is normal, don't commit it
- server/index.js shows "M" (Modified)
- Changes not yet committed to git

---

## 🎯 Success Criteria

Project is successful when:
- ✅ Program plans generate in 2 minutes
- ⚠️ Branded banners with 8+ templates (in progress)
- ⚠️ Banner size selector working (in progress)
- ✅ CSAT reports auto-generate
- ✅ All 5 program dashboards working
- ❌ AI content generation (needs valid API key)
- ✅ Team can access via Codespaces

---

## 📞 Contact & Support

**Project Owner:** Megha Sood  
**Team:** T&P APAC Tech Enablement  
**Organization:** Salesforce

---

**Last Session Summary:**
User requested adding more banner templates and size selections. Changes were made to local Mac files but need to be applied to Codespaces files where the app is actually running. User couldn't see new templates because browser was loading from Codespaces (different file location). Next session should focus on applying these changes directly in Codespaces.

---

*This file should be read at the start of every new Claude Code session to maintain context and continuity.*
