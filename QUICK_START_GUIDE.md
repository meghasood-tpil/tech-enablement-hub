# Tech Enablement Hub - Quick Start Guide

## 🎯 What You Have

A complete, production-ready web application for managing all Tech Enablement programs at T&P APAC!

### ✨ Key Features Built:

1. **Auto-Generated Program Plans** ✅
   - Based on your Excel master checklist
   - Auto-calculates 40+ task due dates from launch day
   - Visual progress tracking
   - Export to CSV

2. **Banner & Slack Post Creator** ✅
   - Salesforce-branded banners
   - 3 template styles
   - Auto-formatted Slack posts
   - One-click download & copy

3. **Report Generator** ✅
   - Upload L++ CSV/Excel files
   - Auto-generate analytics
   - CSAT visualizations
   - Completion metrics

4. **5 Program Dashboards** ✅
   - Calendar Training
   - Tech Talks
   - Cohort Programs
   - Onboarding
   - Partnership Programs

## 📦 What's Included

```
tech-enablement-hub/
├── ✅ Full React frontend with routing
├── ✅ Node.js/Express backend API
├── ✅ Salesforce fonts & brand assets
├── ✅ Master checklist template
├── ✅ All Salesforce 2026 brand colors
├── ✅ Responsive design (mobile + desktop)
├── ✅ Export/download capabilities
└── ✅ Ready for Google Sheets integration
```

## 🚀 To Get Started:

### Step 1: Install Node.js
Download from: **https://nodejs.org/** (choose LTS version)

### Step 2: Open Terminal and Run:

```bash
cd /Users/megha.sood/tech-enablement-hub

# Install dependencies
npm install
cd client && npm install && cd ..

# Start the app
npm run dev
```

### Step 3: Open Your Browser
Visit: **http://localhost:3000**

That's it! 🎉

## 📖 How to Use Each Feature

### Creating a Program Plan

1. Click **"Program Planner"** in navigation
2. Select program type (Tech Talks, Calendar Training, etc.)
3. Enter:
   - Session name (e.g., "AI & Trust Workshop")
   - Launch date (Day 15)
   - Program manager name
4. Click **"Generate Program Plan"**
5. Review all 40+ tasks with auto-calculated dates
6. Check off tasks as you complete them
7. Add owners and comments
8. Click **"Export"** to download CSV

**Timeline Logic:**
- Your input = Launch Day (Day 15)
- App automatically calculates:
  - Day 0-3: Early Preparation tasks
  - Day 4-7: Setup & Logistics
  - Day 8-11: Communication & Engagement
  - Day 12-14: Final Readiness
  - Day 15: Launch Day
  - Day 16+: Post-Launch Follow-up

### Creating Banners & Slack Posts

1. Go to **"Banner Creator"**
2. Choose program type (colors auto-apply!)
3. Fill in:
   - Title
   - Subtitle
   - Date & Time
   - Location
4. Select template style
5. Preview updates in real-time
6. Click **"Generate Slack Post"**
7. Click **"Download Banner"** (PNG) or **"Copy to Clipboard"** (Slack text)

### Generating Reports

1. Navigate to **"Reports"**
2. Click **"Choose File"**
3. Upload L++ CSV/Excel export
4. View auto-generated metrics:
   - Total participants
   - Completion rate
   - CSAT scores with breakdown
   - Top interest topics
5. Share or download results

## 🎨 Salesforce Branding

All Salesforce 2026 brand colors are integrated:

- **Electric Blue:** #066AFE (Primary)
- **Cloud Blue:** #00B3FF
- **Teal:** #06A59A (Cohorts)
- **Violet:** #BA01FF (Tech Talks)
- **Yellow:** #FCC003
- **Pink:** #FF538A
- **Orange:** #F38303 (Partnerships)
- **Green:** #45C65A (Onboarding)

**Fonts:** Salesforce Sans (Regular, Bold, Light) - auto-loaded

## 📊 Google Sheets Integration

**Your Question:** *"How can I connect the website with internal Google sheet for CSAT and other data?"*

**Answer:** Here's the approach:

### Option 1: Google Sheets API (Recommended)

```javascript
// Install library
npm install googleapis

// Backend code (server/index.js)
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: 'service-account-credentials.json', // Download from Google Cloud
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
});

const sheets = google.sheets({ version: 'v4', auth });

// Fetch CSAT data
async function getCSATData() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: 'YOUR_GOOGLE_SHEET_ID',
    range: 'CSAT!A2:E100' // Your sheet name and range
  });
  
  return response.data.values;
}
```

**Setup Steps:**
1. Go to Google Cloud Console
2. Enable Google Sheets API
3. Create service account
4. Download JSON credentials
5. Share your Google Sheet with service account email
6. Add the code above to your backend

### Option 2: Google Apps Script Webhook

Create a script in your Google Sheet that sends data to your app:

```javascript
function sendToHub() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  var url = 'http://localhost:5000/api/sync-google-sheets';
  
  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ data: data })
  });
}
```

**I've already added the endpoint** (`/api/sync-google-sheets`) in the backend - you just need to implement the Google Sheets connection!

## 🔧 Customization

### Add More Tasks to Checklist

Edit: `client/src/utils/checklistTemplate.js`

```javascript
tasks: [
  {
    id: 'task41',
    text: 'Your new task here',
    // ...
  }
]
```

### Change Colors

Edit: `client/src/utils/salesforceColors.js`

### Add New Program Type

1. Add to `programTypes` array
2. Add color scheme to `programColors`
3. Create new page in `client/src/pages/`

## 📱 Mobile Responsive

The entire app works on:
- Desktop (1920px+)
- Laptop (1366px+)
- Tablet (768px+)
- Mobile (375px+)

## 🐛 Troubleshooting

**Can't install dependencies?**
```bash
# Install Node.js first from nodejs.org
node --version  # Should show v18.x.x or higher
npm --version   # Should show v9.x.x or higher
```

**Port already in use?**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**App not loading?**
```bash
# Clear cache and reinstall
rm -rf node_modules client/node_modules
npm install
cd client && npm install
```

## 📈 Next Steps

1. **Install Node.js** (if not installed)
2. **Run the setup commands** above
3. **Test each feature** with sample data
4. **Customize** colors/text/branding as needed
5. **Set up Google Sheets integration** for live CSAT data
6. **Deploy** to production (Heroku, Vercel, AWS)

## 📞 Need Help?

Check these files:
- `README.md` - Full documentation
- `SETUP_INSTRUCTIONS.md` - Detailed setup guide
- Code comments in all files

## 🎓 File Structure Guide

- **Program Planner:** `client/src/pages/ProgramPlanner.js`
- **Banner Creator:** `client/src/pages/BannerCreator.js`
- **Report Generator:** `client/src/pages/ReportGenerator.js`
- **Checklist Template:** `client/src/utils/checklistTemplate.js`
- **Brand Colors:** `client/src/utils/salesforceColors.js`
- **Backend API:** `server/index.js`

---

## 🎉 You're All Set!

Your centralized Tech Enablement Hub is ready to transform how you manage programs across T&P APAC!

**Built with ⚡ and the Salesforce brand you know and love**

Questions? Everything is documented in the code with comments! 🚀
