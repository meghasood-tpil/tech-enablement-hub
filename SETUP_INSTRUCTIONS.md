# Setup Instructions

## Quick Start

Your Tech Enablement Hub is ready! Follow these steps to get it running:

### 1. Install Node.js (if not already installed)

Download and install Node.js from: https://nodejs.org/ (LTS version recommended)

Verify installation:
```bash
node --version
npm --version
```

### 2. Install Dependencies

Open Terminal and run:

```bash
cd /Users/megha.sood/tech-enablement-hub

# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
```

### 3. Start the Application

From the root directory (`/Users/megha.sood/tech-enablement-hub`):

```bash
# Option 1: Start both frontend and backend together
npm run dev

# Option 2: Start them separately
# Terminal 1 - Backend:
npm run server

# Terminal 2 - Frontend:
npm run client
```

### 4. Access the Application

- **Frontend (Main App):** http://localhost:3000
- **Backend API:** http://localhost:5000

## Features Overview

### 🚀 Program Planner
- Auto-generates comprehensive checklists based on your master template
- Calculates all task due dates from your launch day (Day 15)
- Visual progress tracking with completion percentages
- Export to CSV or save as JSON
- Editable fields for dates, owners, and comments

### 🎨 Banner Creator
- Generate Salesforce-branded program banners
- Three template styles (Modern, Minimal, Bold)
- Auto-formatted Slack posts
- Download banners as PNG images
- Copy Slack posts to clipboard

### 📊 Report Generator
- Upload L++ CSV/Excel exports
- Visualize CSAT scores and feedback
- Track participation and completion rates
- Topic interest analysis
- **Coming Soon:** Direct Google Sheets integration

### 📁 Program Dashboards
- Calendar Training Programs
- Tech Talks
- Cohort Programs
- Onboarding Program
- Partnership Programs

Each with dedicated tracking and metrics!

## Google Sheets Integration (Future)

To connect your internal Google Sheets for CSAT and program data:

1. **Enable Google Sheets API:**
   - Go to Google Cloud Console
   - Enable Google Sheets API
   - Create a service account
   - Download JSON credentials

2. **Install Google Sheets library:**
```bash
npm install googleapis
```

3. **Share your Google Sheet:**
   - Share with the service account email
   - Grant "Viewer" permissions

4. **Configure in code:**
```javascript
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
});

const sheets = google.sheets({ version: 'v4', auth });

// Fetch data
const response = await sheets.spreadsheets.values.get({
  spreadsheetId: 'YOUR_SHEET_ID',
  range: 'Sheet1!A1:Z100'
});
```

## Troubleshooting

### Port Already in Use
If port 3000 or 5000 is already in use:

```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Issues
```bash
# Clean build
cd client
rm -rf build node_modules package-lock.json
npm install
npm run build
```

## Development Tips

- **Hot Reload:** Frontend auto-refreshes on code changes
- **API Testing:** Use http://localhost:5000/api/health to verify backend
- **Salesforce Colors:** All defined in `client/src/utils/salesforceColors.js`
- **Checklist Template:** Customizable in `client/src/utils/checklistTemplate.js`

## Customization

### Adding New Program Types

1. Add to `client/src/utils/checklistTemplate.js`:
```javascript
export const programTypes = [
  'Calendar Training',
  'Tech Talks',
  'Your New Type'
];
```

2. Add colors in `client/src/utils/salesforceColors.js`:
```javascript
export const programColors = {
  'Your New Type': {
    primary: '#066AFE',
    secondary: '#90D0FE',
    // ...
  }
};
```

### Modifying Checklist Tasks

Edit `masterChecklistTemplate` in `client/src/utils/checklistTemplate.js`

### Changing Brand Colors

Update `salesforceColors` in `client/src/utils/salesforceColors.js`

## Production Deployment

### Build for Production
```bash
cd /Users/megha.sood/tech-enablement-hub
npm run build
```

### Deploy Options
- **Heroku:** Connect Git repo and deploy
- **Vercel:** Deploy frontend, separate backend
- **AWS:** EC2 or Elastic Beanstalk
- **Docker:** Containerize both services

## Support

For questions or issues:
- Check README.md for detailed documentation
- Review component code in `client/src/pages/`
- Backend API routes in `server/index.js`

---

**Built with ⚡ by Tech Enablement Team**
