# Quick Setup: Google Sheets Real-Time Integration

## ✅ What's Been Implemented

Your Tech Enablement Hub now has **full Google Sheets integration**! You can connect your internal Google Sheets for real-time CSAT and program data.

---

## 🚀 Quick Setup (15 minutes)

### Step 1: Install Google Sheets API Library

```bash
cd /Users/megha.sood/tech-enablement-hub
npm install googleapis
```

### Step 2: Google Cloud Console Setup

1. **Go to:** https://console.cloud.google.com

2. **Create Project:**
   - Click "Select a project" → "New Project"
   - Name: `Tech Enablement Hub`
   - Click "Create"

3. **Enable Google Sheets API:**
   - Menu → "APIs & Services" → "Library"
   - Search: `Google Sheets API`
   - Click it → Click "Enable"

4. **Create Service Account:**
   - Menu → "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Service account name: `tech-enablement-reader`
   - Click "Create and Continue"
   - Role: Select "Viewer" (or "Basic > Viewer")
   - Click "Done"

5. **Download Credentials:**
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" → "Create New Key"
   - Format: **JSON**
   - Click "Create" → File downloads automatically

6. **Save Credentials:**
```bash
# Move the downloaded file to your project
mv ~/Downloads/tech-enablement-hub-*.json /Users/megha.sood/tech-enablement-hub/server/credentials.json
```

7. **Copy Service Account Email:**
   - It looks like: `tech-enablement-reader@tech-enablement-hub-xxxxx.iam.gserviceaccount.com`
   - **You'll need this for Step 3!**

### Step 3: Prepare Your Google Sheet

#### Option A: Use Existing Sheet

1. **Open your Google Sheet** with CSAT/program data

2. **Click "Share" button** (top right)

3. **Add service account:**
   - Paste the service account email you copied
   - Permission: **Viewer**
   - ✅ Uncheck "Notify people"
   - Click "Share"

4. **Get Sheet ID:**
   - From URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
   - Copy the `YOUR_SHEET_ID` part (long string of letters/numbers)
   - **Save this - you'll use it in the app!**

#### Option B: Create Test Sheet

Use this template structure:

| Participant Name | Email | Program Name | Status | Completion Date | CSAT Rating | Feedback | Topics | Certification |
|-----------------|-------|--------------|--------|----------------|-------------|----------|--------|---------------|
| John Doe | john@salesforce.com | AI Workshop | Completed | 2026-05-15 | 5 | Great session! | AI;ML;Cloud | Yes |
| Jane Smith | jane@salesforce.com | AI Workshop | Completed | 2026-05-15 | 4 | Very helpful | AI;Security | Yes |
| Bob Jones | bob@salesforce.com | Tech Talk | In Progress | | 3 | Good content | API;Design | No |

**Required Columns:**
- `Status` (Completed/In Progress)
- `CSAT Rating` (1-5)

**Optional Columns:**
- Participant Name, Email, Program Name
- Completion Date, Feedback
- Topics (semicolon-separated like: AI;ML;Cloud)
- Certification (Yes/No)

Then follow sharing steps above.

### Step 4: Test the Integration

1. **Start your server:**
```bash
cd /Users/megha.sood/tech-enablement-hub
npm run dev
```

2. **Open:** http://localhost:3000/reports

3. **You should see:**
   - ✅ "Google Sheets Integration ✅ Ready" (green box)

4. **Enter your Sheet ID** in the form

5. **Click "Connect & Generate Report"**

6. **See real-time data!** 🎉

---

## 📊 Using Real-Time Reports

### Basic Usage

1. Go to Reports page
2. Enter Google Sheet ID
3. Click "Connect & Generate Report"
4. View instant analytics!

### Auto-Refresh Feature

- ✅ Check "Auto-refresh every 5 minutes"
- Reports update automatically
- See last update time
- Perfect for live dashboards!

### Multiple Sheets

You can connect different sheets for different programs:
- CSAT data sheet
- Tech Talks attendance sheet
- Cohort progress sheet
- etc.

---

## 🔍 Troubleshooting

### Error: "credentials.json not found"

**Fix:**
```bash
# Make sure file is in correct location
ls /Users/megha.sood/tech-enablement-hub/server/credentials.json

# If not found, download again from Google Cloud Console
```

### Error: "The caller does not have permission"

**Fix:**
- Check that you shared the sheet with service account email
- Permission must be "Viewer" or higher
- Make sure you clicked "Share" button

### Error: "No data found in sheet"

**Fix:**
- Check Sheet ID is correct
- Verify sheet name in range (default: `Sheet1!A1:Z1000`)
- Make sure sheet has data in first row (headers)

### Error: "Google Sheets API not installed"

**Fix:**
```bash
cd /Users/megha.sood/tech-enablement-hub
npm install googleapis
```

### Green box shows "Setup Required" instead of "Ready"

**Check:**
1. `npm install googleapis` completed successfully
2. `credentials.json` exists in `server/` folder
3. Restart your server: `npm run dev`

---

## 🎯 Expected Sheet Format

### Minimal Required Format

```
Status     | CSAT Rating
-----------|------------
Completed  | 5
Completed  | 4
In Progress| 3
```

### Recommended Full Format

```
Participant | Email | Program | Status | Date | CSAT | Feedback | Topics | Certified
------------|-------|---------|--------|------|------|----------|--------|----------
John Doe    | john@ | AI Talk | Done   | 5/15 | 5    | Great!   | AI;ML  | Yes
Jane Smith  | jane@ | AI Talk | Done   | 5/15 | 4    | Good     | AI     | Yes
```

**Column Names (flexible):**
- Status: `Status` or `Completion Status`
- CSAT: `CSAT Rating`, `Rating`, or `CSAT`
- Topics: `Topics`, `Interests`, or `Interest`
- Certification: `Certification`, `Certified`

The system is smart and will find these columns by name!

---

## 📈 What You Get

Once connected, you'll see:

✅ **Real-Time Metrics:**
- Total participants
- Completion rate (%)
- Average CSAT score
- Certifications count

✅ **CSAT Breakdown:**
- Visual 5-star rating distribution
- Percentage for each rating
- Count per rating level

✅ **Top Topics:**
- Most popular interest areas
- Percentage interest per topic
- Top 5 topics displayed

✅ **Auto-Updates:**
- Optional 5-minute refresh
- Last updated timestamp
- Always current data

---

## 🔐 Security Notes

✅ **Your credentials.json is protected:**
- Already in `.gitignore`
- Won't be committed to git
- Service account has read-only access

✅ **Best Practices:**
- Use "Viewer" permission (read-only)
- Don't share credentials file
- One service account per project

---

## 🎉 You're Ready!

**Test Checklist:**

- [ ] `npm install googleapis` completed
- [ ] `credentials.json` in `server/` folder
- [ ] Google Sheet shared with service account email
- [ ] Sheet ID copied
- [ ] Server running (`npm run dev`)
- [ ] Reports page shows "✅ Ready"
- [ ] Connected and generated first report!

**Once working:**
- ✅ No more manual CSV uploads needed!
- ✅ Always up-to-date data
- ✅ Auto-refresh available
- ✅ Multiple sheets supported

---

## 💡 Pro Tips

1. **Bookmark Sheet IDs:**
   - Save your commonly used Sheet IDs
   - Create a config file with your Sheet IDs
   - Quick access to different reports

2. **Sheet Organization:**
   - One sheet per program type
   - Or one master sheet with all data
   - Use consistent column names

3. **Testing:**
   - Start with a test sheet
   - Verify data before using production
   - Check all columns are recognized

4. **Performance:**
   - Auto-refresh is optional
   - Manual refresh gives more control
   - Large sheets may take a few seconds

---

## 📞 Need Help?

See the full detailed guide:
- **GOOGLE_SHEETS_INTEGRATION.md** - Complete documentation
- **PROJECT_SUMMARY.md** - Project overview
- **README.md** - Technical details

---

**Your real-time reporting is just 15 minutes away!** 🚀

Questions? All code has helpful error messages that guide you to the solution!
