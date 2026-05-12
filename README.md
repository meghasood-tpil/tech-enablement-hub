# Tech Enablement Hub

Centralized program management platform for T&P APAC Tech Enablement Team.

## Features

### 1. Auto-Generated Program Plans
- Create comprehensive checklists with timeline
- Based on your existing Excel master checklist
- Auto-calculates due dates from launch day (Day 15)
- Track progress with visual completion indicators
- Export to CSV or save as JSON

### 2. Banner & Slack Post Creator
- Generate program banners with Salesforce branding
- Auto-format Slack posts with program details
- Multiple template styles (Modern, Minimal, Bold)
- Download banners as PNG
- Copy Slack posts to clipboard

### 3. Report Generator
- Upload L++ CSV/Excel exports
- Generate comprehensive program reports
- Visualize CSAT scores and feedback
- Track completion rates and engagement
- **Future:** Direct Google Sheets integration for real-time data

### 4. Program Dashboards
Dedicated pages for each program type:
- Calendar Training Programs
- Tech Talks
- Cohort Programs
- Onboarding Program
- Partnership Programs

## Technology Stack

- **Frontend:** React 18 with React Router
- **Backend:** Node.js + Express
- **File Processing:** XLSX for Excel/CSV parsing
- **Design:** Salesforce Brand Colors & Typography
- **Icons:** Lucide React

## Installation

### Prerequisites
- Node.js 16+ and npm

### Setup

1. **Install dependencies:**
```bash
cd /Users/megha.sood/tech-enablement-hub
npm run install-all
```

2. **Start development servers:**
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Individual Commands

```bash
# Start frontend only
npm run client

# Start backend only
npm run server

# Build for production
npm run build
```

## Project Structure

```
tech-enablement-hub/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── assets/
│       │   ├── fonts/       # Salesforce Sans fonts
│       │   └── icons/       # Salesforce brand icons
│       ├── components/      # Reusable components
│       ├── pages/           # Page components
│       ├── utils/           # Utilities & constants
│       │   ├── salesforceColors.js
│       │   └── checklistTemplate.js
│       ├── App.js
│       └── index.js
├── server/                  # Node.js backend
│   ├── routes/
│   ├── utils/
│   └── index.js
└── package.json
```

## Google Sheets Integration (Future Enhancement)

To connect CSAT and program data from internal Google Sheets:

1. **Enable Google Sheets API** in Google Cloud Console
2. **Create a service account** with appropriate permissions
3. **Share your Google Sheet** with the service account email
4. **Install Google Sheets library:**
```bash
npm install googleapis
```

5. **Implement in backend:**
```javascript
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: 'path/to/service-account-key.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
});

const sheets = google.sheets({ version: 'v4', auth });

// Read data from sheet
const response = await sheets.spreadsheets.values.get({
  spreadsheetId: 'YOUR_SHEET_ID',
  range: 'Sheet1!A1:Z100'
});
```

## Salesforce Branding

The application uses official Salesforce brand colors and fonts:
- **Primary Blue:** #066AFE (Electric Blue 50)
- **Cloud Blue:** #00B3FF
- **Teal:** #06A59A
- **Typography:** Salesforce Sans (Regular, Bold, Light)

## Usage Guide

### Creating a Program Plan

1. Navigate to **Program Planner**
2. Select program type, enter session details
3. Click "Generate Program Plan"
4. Review auto-generated checklist with dates
5. Check off tasks as completed
6. Update owners, comments, and dates as needed
7. Export to CSV or save progress as JSON

### Designing Banners

1. Go to **Banner Creator**
2. Choose program type for automatic color scheme
3. Fill in program details (title, date, time, location)
4. Select template style
5. Preview banner in real-time
6. Click "Generate Slack Post" for formatted text
7. Download banner or copy Slack post

### Generating Reports

1. Visit **Report Generator**
2. Upload L++ CSV/Excel export
3. View auto-generated analytics:
   - Participation metrics
   - CSAT breakdown
   - Top interest topics
   - Completion rates
4. Download or share reports

## Development Notes

- Built with Salesforce brand guidelines 2026
- Responsive design for desktop and mobile
- All program types use consistent color theming
- Modular component structure for easy maintenance

## Support

For issues or feature requests, contact the Tech Enablement team.

---

**Built with ⚡ by Tech Enablement Team • T&P APAC**
