# Google Sheets Integration for Real-Time Reports

## Overview

Connect your internal Google Sheets directly to the Tech Enablement Hub for automatic, real-time report generation.

---

## Setup Guide

### Step 1: Google Cloud Console Setup (10 minutes)

1. **Go to Google Cloud Console:**
   https://console.cloud.google.com

2. **Create/Select Project:**
   - Click "Select a project" → "New Project"
   - Name: "Tech Enablement Hub"
   - Click "Create"

3. **Enable Google Sheets API:**
   - Go to "APIs & Services" → "Library"
   - Search "Google Sheets API"
   - Click "Enable"

4. **Create Service Account:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Name: "tech-enablement-reader"
   - Role: "Viewer"
   - Click "Done"

5. **Download Credentials:**
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" → "Create New Key"
   - Choose "JSON"
   - Save file as `credentials.json`

6. **Copy the Service Account Email:**
   - It looks like: `tech-enablement-reader@your-project.iam.gserviceaccount.com`
   - You'll need this in Step 2!

---

### Step 2: Share Your Google Sheet (2 minutes)

1. **Open your Google Sheet** with CSAT/program data

2. **Click "Share" button**

3. **Add the service account email:**
   - Paste: `tech-enablement-reader@your-project.iam.gserviceaccount.com`
   - Permission: "Viewer"
   - Uncheck "Notify people"
   - Click "Share"

4. **Get your Sheet ID:**
   - From URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the `SHEET_ID_HERE` part

---

### Step 3: Install Google Sheets Library

```bash
cd /Users/megha.sood/tech-enablement-hub
npm install googleapis
```

---

### Step 4: Add Credentials to Project

1. **Move credentials file:**
```bash
mv ~/Downloads/credentials.json /Users/megha.sood/tech-enablement-hub/server/
```

2. **Update .gitignore** (already done, but verify):
```
credentials.json
```

---

### Step 5: Update Backend Code

Open: `server/index.js` and add this code:

```javascript
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load credentials
const credentials = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'credentials.json'))
);

// Initialize Google Sheets API
async function initSheetsAPI() {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });
  
  return sheets;
}

// Fetch data from Google Sheets
async function fetchSheetData(sheetId, range = 'Sheet1!A1:Z1000') {
  try {
    const sheets = await initSheetsAPI();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: range,
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      throw new Error('No data found in sheet');
    }

    // First row is headers
    const headers = rows[0];
    
    // Convert to array of objects
    const data = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      return obj;
    });

    return data;
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
}

// Process data into report format
function processReportData(rawData) {
  // Calculate metrics
  const totalParticipants = rawData.length;
  
  const completedCount = rawData.filter(
    row => row.Status === 'Completed' || row.Status === 'Complete'
  ).length;
  
  const completionRate = Math.round((completedCount / totalParticipants) * 100);
  
  // Calculate CSAT (assuming CSAT Rating column with 1-5 values)
  const csatRatings = rawData
    .map(row => parseInt(row['CSAT Rating'] || row['Rating']))
    .filter(rating => !isNaN(rating) && rating >= 1 && rating <= 5);
  
  const avgCSAT = csatRatings.length > 0
    ? (csatRatings.reduce((sum, rating) => sum + rating, 0) / csatRatings.length).toFixed(1)
    : 0;
  
  // CSAT breakdown
  const feedback = [5, 4, 3, 2, 1].map(rating => {
    const count = csatRatings.filter(r => r === rating).length;
    const percentage = csatRatings.length > 0
      ? Math.round((count / csatRatings.length) * 100)
      : 0;
    return { rating, count, percentage };
  });
  
  // Count certifications (assuming Certification column)
  const certifications = rawData.filter(
    row => row.Certification === 'Yes' || row.Certified === 'Yes'
  ).length;
  
  // Extract top topics (assuming Topics column with semicolon-separated values)
  const topicsMap = {};
  rawData.forEach(row => {
    const topics = (row.Topics || row.Interests || '').split(';').map(t => t.trim());
    topics.forEach(topic => {
      if (topic) {
        topicsMap[topic] = (topicsMap[topic] || 0) + 1;
      }
    });
  });
  
  const topTopics = Object.entries(topicsMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      interest: Math.round((count / totalParticipants) * 100)
    }));
  
  return {
    totalParticipants,
    completionRate,
    avgCSAT: parseFloat(avgCSAT),
    certifications,
    engagementScore: completionRate, // Can be customized
    topPerformers: Math.round(totalParticipants * 0.1), // Top 10%
    feedback,
    topTopics,
    lastUpdated: new Date().toISOString()
  };
}

// API Endpoint for Google Sheets sync
app.post('/api/sync-google-sheets', async (req, res) => {
  try {
    const { sheetId, range } = req.body;
    
    if (!sheetId) {
      return res.status(400).json({ error: 'Sheet ID is required' });
    }
    
    // Fetch data from Google Sheets
    const rawData = await fetchSheetData(sheetId, range);
    
    // Process into report format
    const reportData = processReportData(rawData);
    
    res.json({
      success: true,
      data: reportData,
      rowCount: rawData.length
    });
    
  } catch (error) {
    console.error('Google Sheets sync error:', error);
    res.status(500).json({
      error: 'Failed to sync with Google Sheets',
      message: error.message
    });
  }
});

// Get real-time data endpoint
app.get('/api/reports/live/:sheetId', async (req, res) => {
  try {
    const { sheetId } = req.params;
    const range = req.query.range || 'Sheet1!A1:Z1000';
    
    const rawData = await fetchSheetData(sheetId, range);
    const reportData = processReportData(rawData);
    
    res.json(reportData);
    
  } catch (error) {
    console.error('Error fetching live data:', error);
    res.status(500).json({ error: error.message });
  }
});
```

---

### Step 6: Update Frontend to Use Real-Time Data

Open: `client/src/pages/ReportGenerator.js`

Add this function:

```javascript
// Add to imports
import { useState, useEffect } from 'react';
import axios from 'axios';

// Add Google Sheets connection UI
const [sheetId, setSheetId] = useState('');
const [useGoogleSheets, setUseGoogleSheets] = useState(false);
const [autoRefresh, setAutoRefresh] = useState(false);

// Function to fetch real-time data
const fetchGoogleSheetsData = async () => {
  setLoading(true);
  try {
    const response = await axios.get(`/api/reports/live/${sheetId}`);
    setReportData(response.data);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    alert('Failed to fetch data from Google Sheets. Check Sheet ID and permissions.');
    setLoading(false);
  }
};

// Auto-refresh every 5 minutes
useEffect(() => {
  if (autoRefresh && sheetId && reportData) {
    const interval = setInterval(() => {
      fetchGoogleSheetsData();
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(interval);
  }
}, [autoRefresh, sheetId, reportData]);

// Add to your JSX (in the upload section):
<div className="google-sheets-connection">
  <h4>📊 Real-Time Google Sheets</h4>
  <div className="form-group">
    <label>Google Sheet ID</label>
    <input
      type="text"
      value={sheetId}
      onChange={(e) => setSheetId(e.target.value)}
      placeholder="Paste your Sheet ID here"
      className="form-control"
    />
    <small>From URL: docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit</small>
  </div>
  
  <div className="form-group">
    <label>
      <input
        type="checkbox"
        checked={autoRefresh}
        onChange={(e) => setAutoRefresh(e.target.checked)}
      />
      Auto-refresh every 5 minutes
    </label>
  </div>
  
  <button
    onClick={fetchGoogleSheetsData}
    className="btn btn-primary"
    disabled={!sheetId}
  >
    🔄 Connect & Generate Report
  </button>
</div>
```

---

## Your Google Sheet Format

Structure your Google Sheet like this:

| Participant Name | Email | Program Name | Status | Completion Date | CSAT Rating | Feedback | Topics | Certification |
|-----------------|-------|--------------|--------|----------------|-------------|----------|--------|---------------|
| John Doe | john@co.com | AI Workshop | Completed | 2026-05-15 | 5 | Great! | AI;ML;Cloud | Yes |
| Jane Smith | jane@co.com | AI Workshop | Completed | 2026-05-15 | 4 | Good | AI;Security | Yes |
| Bob Jones | bob@co.com | AI Workshop | In Progress | | 3 | Ok | AI | No |

**Required Columns:**
- Participant Name
- Status (Completed/Complete/In Progress)
- CSAT Rating (1-5)

**Optional Columns:**
- Email
- Program Name
- Completion Date
- Feedback (text)
- Topics (semicolon-separated)
- Certification (Yes/No)

---

## Configuration File (Easier Management)

Create: `server/config.js`

```javascript
module.exports = {
  googleSheets: {
    // Add your Sheet IDs here for easy reference
    sheets: {
      'csat-data': 'YOUR_CSAT_SHEET_ID_HERE',
      'tech-talks': 'YOUR_TECH_TALKS_SHEET_ID_HERE',
      'cohorts': 'YOUR_COHORTS_SHEET_ID_HERE'
    },
    // Default range
    defaultRange: 'Sheet1!A1:Z1000',
    // Refresh interval (milliseconds)
    refreshInterval: 5 * 60 * 1000 // 5 minutes
  }
};
```

---

## Testing

### Test 1: Manual Test
```bash
# Start your server
npm run server

# In another terminal, test the endpoint
curl -X POST http://localhost:5000/api/sync-google-sheets \
  -H "Content-Type: application/json" \
  -d '{"sheetId": "YOUR_SHEET_ID", "range": "Sheet1!A1:Z100"}'
```

### Test 2: Frontend Test
1. Start app: `npm run dev`
2. Go to Reports page
3. Enter your Sheet ID
4. Click "Connect & Generate Report"
5. See real-time data!

---

## Advanced: Webhook for Instant Updates

For **instant** updates when sheet changes (no polling):

1. **Google Apps Script** in your sheet:

```javascript
function onEdit(e) {
  // Trigger on any edit
  var url = 'http://YOUR_SERVER_URL/api/webhook/sheet-update';
  
  var payload = {
    sheetId: SpreadsheetApp.getActiveSpreadsheet.getId(),
    timestamp: new Date().toISOString()
  };
  
  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };
  
  UrlFetchApp.fetch(url, options);
}
```

2. **Backend webhook handler:**

```javascript
app.post('/api/webhook/sheet-update', async (req, res) => {
  const { sheetId } = req.body;
  
  // Fetch fresh data
  const rawData = await fetchSheetData(sheetId);
  const reportData = processReportData(rawData);
  
  // Broadcast to connected clients (using WebSockets or Server-Sent Events)
  // Or cache for next request
  
  res.json({ received: true });
});
```

---

## Security Best Practices

1. **Never commit credentials.json to git** (already in .gitignore)
2. **Use environment variables** for production:
```javascript
const credentials = process.env.GOOGLE_CREDENTIALS 
  ? JSON.parse(process.env.GOOGLE_CREDENTIALS)
  : JSON.parse(fs.readFileSync('credentials.json'));
```
3. **Restrict service account** to only sheets you need
4. **Use read-only permissions** (Viewer role)

---

## Troubleshooting

### Error: "The caller does not have permission"
- Check sheet is shared with service account email
- Verify service account has "Viewer" role

### Error: "Unable to parse range"
- Use format: `Sheet1!A1:Z1000`
- Check sheet name matches exactly (case-sensitive)

### Error: "Credentials not found"
- Ensure `credentials.json` is in `/server/` directory
- Check file permissions

### Data not updating
- Verify auto-refresh is enabled
- Check browser console for errors
- Verify Sheet ID is correct

---

## Summary

**What You Can Do:**

✅ **Manual Upload** - Works now, upload CSV/Excel anytime

✅ **Google Sheets Real-Time** - After setup:
- Auto-refresh every 5 minutes
- Live dashboards
- No manual exports needed
- Multiple sheets supported

✅ **Webhook Updates** - For instant sync:
- Updates immediately when sheet changes
- No polling needed
- Most efficient

**Choose Your Approach:**
- **Quick & Easy:** Manual CSV upload (already works!)
- **Automated:** Google Sheets with auto-refresh (follow steps above)
- **Advanced:** Webhooks for instant updates (optional)

---

## Next Steps

1. ✅ Try manual CSV upload first (works now!)
2. Follow Google Cloud setup for real-time
3. Share sheet with service account
4. Test with your actual data
5. Enable auto-refresh
6. Enjoy automated reports!

---

**Your real-time reporting is just a few setup steps away!** 🚀
