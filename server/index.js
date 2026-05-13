const express = require('express');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Gemini AI
let geminiAI = null;
try {
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  if (process.env.GEMINI_API_KEY) {
    geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log('✅ Gemini AI initialized');
  } else {
    console.log('⚠️  GEMINI_API_KEY not found in .env file');
  }
} catch (error) {
  console.log('⚠️  Gemini AI package not installed. Run: npm install @google/generative-ai');
}

// Google Sheets API (will be initialized if credentials exist)
let google = null;
let sheetsAPI = null;

// Try to load Google Sheets API if googleapis is installed
try {
  google = require('googleapis').google;
  console.log('✅ Google Sheets API available');
} catch (error) {
  console.log('⚠️  Google Sheets API not installed. Run: npm install googleapis');
}

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Create uploads directory if it doesn't exist
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Initialize Google Sheets API
async function initSheetsAPI() {
  if (!google) {
    throw new Error('Google Sheets API not installed. Run: npm install googleapis');
  }

  const credentialsPath = path.join(__dirname, 'credentials.json');

  if (!fs.existsSync(credentialsPath)) {
    throw new Error('credentials.json not found. Please follow GOOGLE_SHEETS_INTEGRATION.md setup guide');
  }

  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

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
    console.error('Error fetching sheet data:', error.message);
    throw error;
  }
}

// Process raw data into report format
function processReportData(rawData) {
  const totalParticipants = rawData.length;

  // Calculate completion rate
  const completedCount = rawData.filter(
    row => (row.Status || '').toLowerCase().includes('complet')
  ).length;

  const completionRate = totalParticipants > 0
    ? Math.round((completedCount / totalParticipants) * 100)
    : 0;

  // Calculate CSAT
  const csatRatings = rawData
    .map(row => {
      const rating = parseInt(row['CSAT Rating'] || row['Rating'] || row['CSAT'] || 0);
      return rating;
    })
    .filter(rating => !isNaN(rating) && rating >= 1 && rating <= 5);

  const avgCSAT = csatRatings.length > 0
    ? parseFloat((csatRatings.reduce((sum, rating) => sum + rating, 0) / csatRatings.length).toFixed(1))
    : 0;

  // CSAT breakdown
  const feedback = [5, 4, 3, 2, 1].map(rating => {
    const count = csatRatings.filter(r => r === rating).length;
    const percentage = csatRatings.length > 0
      ? Math.round((count / csatRatings.length) * 100)
      : 0;
    return { rating, count, percentage };
  });

  // Count certifications
  const certifications = rawData.filter(
    row => (row.Certification || row.Certified || '').toLowerCase() === 'yes'
  ).length;

  // Extract top topics
  const topicsMap = {};
  rawData.forEach(row => {
    const topicsStr = row.Topics || row.Interests || row.Interest || '';
    const topics = topicsStr.split(/[;,]/).map(t => t.trim()).filter(t => t);
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
    avgCSAT,
    certifications,
    engagementScore: completionRate,
    topPerformers: Math.round(totalParticipants * 0.1),
    feedback,
    topTopics,
    lastUpdated: new Date().toISOString()
  };
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Tech Enablement Hub API is running' });
});

// Upload and process L++ data
app.post('/api/upload-lms-data', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Process data (this is a simplified example)
    const processedData = {
      totalParticipants: data.length,
      completionRate: Math.round((data.filter(row => row.Status === 'Completed').length / data.length) * 100),
      avgCSAT: 4.5, // Calculate from actual data
      feedback: [] // Extract feedback data
    };

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json(processedData);
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Failed to process file' });
  }
});

// Save program plan
app.post('/api/save-program', (req, res) => {
  try {
    const { programData } = req.body;
    const filename = `program_${Date.now()}.json`;
    const filepath = path.join(__dirname, 'data', filename);

    if (!fs.existsSync('./data')) {
      fs.mkdirSync('./data');
    }

    fs.writeFileSync(filepath, JSON.stringify(programData, null, 2));

    res.json({ success: true, filename });
  } catch (error) {
    console.error('Error saving program:', error);
    res.status(500).json({ error: 'Failed to save program' });
  }
});

// Google Sheets integration endpoint
app.post('/api/sync-google-sheets', async (req, res) => {
  try {
    const { sheetId, range } = req.body;

    if (!sheetId) {
      return res.status(400).json({
        error: 'Sheet ID is required',
        hint: 'Get it from your Google Sheets URL: /d/SHEET_ID/edit'
      });
    }

    // Fetch data from Google Sheets
    const rawData = await fetchSheetData(sheetId, range || 'Sheet1!A1:Z1000');

    // Process into report format
    const reportData = processReportData(rawData);

    res.json({
      success: true,
      data: reportData,
      rowCount: rawData.length,
      message: 'Successfully synced with Google Sheets'
    });

  } catch (error) {
    console.error('Google Sheets sync error:', error);

    let errorMessage = 'Failed to sync with Google Sheets';
    let hint = '';

    if (error.message.includes('credentials.json')) {
      hint = 'Setup required: Follow GOOGLE_SHEETS_INTEGRATION.md guide';
    } else if (error.message.includes('not installed')) {
      hint = 'Run: npm install googleapis';
    } else if (error.message.includes('permission')) {
      hint = 'Share your sheet with the service account email';
    } else if (error.message.includes('No data found')) {
      hint = 'Check that your sheet has data and the range is correct';
    }

    res.status(500).json({
      error: errorMessage,
      message: error.message,
      hint
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
    res.status(500).json({
      error: 'Failed to fetch live data',
      message: error.message
    });
  }
});

// Check Google Sheets status
app.get('/api/google-sheets/status', (req, res) => {
  const hasGoogleAPI = google !== null;
  const hasCredentials = fs.existsSync(path.join(__dirname, 'credentials.json'));

  res.json({
    available: hasGoogleAPI && hasCredentials,
    hasGoogleAPI,
    hasCredentials,
    message: hasGoogleAPI && hasCredentials
      ? 'Google Sheets integration is ready!'
      : 'Setup required - see GOOGLE_SHEETS_INTEGRATION.md'
  });
});

// Gemini AI - Generate banner content from description
app.post('/api/ai/generate-banner', async (req, res) => {
  try {
    if (!geminiAI) {
      return res.status(503).json({
        error: 'Gemini AI not available',
        message: 'Check that GEMINI_API_KEY is set in .env file'
      });
    }

    const { description, programType } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const model = geminiAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
You are a marketing expert creating content for tech training programs at Salesforce.

Program Type: ${programType || 'Tech Program'}
Program Description: ${description}

Based on this description, generate:
1. A catchy, concise title (max 60 characters)
2. An engaging subtitle (max 80 characters)
3. A compelling Slack post announcement (include emojis, bullet points, and relevant hashtags)
4. 3 recommended design themes (from: modern, professional, bold, minimal, playful, technical)
5. Suggested color mood (warm, cool, vibrant, calm, energetic)

Return ONLY valid JSON in this exact format:
{
  "title": "the catchy title",
  "subtitle": "the engaging subtitle",
  "slackPost": "the complete slack post with emojis and formatting",
  "designThemes": ["theme1", "theme2", "theme3"],
  "colorMood": "mood description"
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse AI response');
    }

    const aiSuggestions = JSON.parse(jsonMatch[0]);

    res.json({
      success: true,
      suggestions: aiSuggestions
    });

  } catch (error) {
    console.error('Gemini AI error:', error);
    res.status(500).json({
      error: 'Failed to generate content',
      message: error.message
    });
  }
});

// Check Gemini AI status
app.get('/api/ai/status', (req, res) => {
  res.json({
    available: geminiAI !== null,
    message: geminiAI
      ? 'Gemini AI is ready!'
      : 'GEMINI_API_KEY not configured in .env file'
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '..', 'client', 'build');

  app.use(express.static(clientBuildPath));

  // Handle React routing - return index.html for all non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    }
  });

  console.log('📦 Serving frontend from:', clientBuildPath);
}

app.listen(PORT, () => {
  console.log(`🚀 Tech Enablement Hub server running on port ${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`);

  if (process.env.NODE_ENV === 'production') {
    console.log(`🌐 Frontend: http://localhost:${PORT}`);
  } else {
    console.log(`🌐 Frontend dev server: http://localhost:3000`);
  }
});
