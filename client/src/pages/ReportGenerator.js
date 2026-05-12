import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, FileText, TrendingUp, Users, Award, RefreshCw } from 'lucide-react';
import './ReportGenerator.css';

const ReportGenerator = () => {
  const [file, setFile] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Google Sheets state
  const [sheetId, setSheetId] = useState('');
  const [sheetRange, setSheetRange] = useState('Sheet1!A1:Z1000');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [googleSheetsAvailable, setGoogleSheetsAvailable] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      processFile(uploadedFile);
    }
  };

  // Check Google Sheets availability on mount
  useEffect(() => {
    axios.get('/api/google-sheets/status')
      .then(response => {
        setGoogleSheetsAvailable(response.data.available);
      })
      .catch(() => {
        setGoogleSheetsAvailable(false);
      });
  }, []);

  // Auto-refresh Google Sheets data
  useEffect(() => {
    if (autoRefresh && sheetId && reportData) {
      const interval = setInterval(() => {
        fetchGoogleSheetsData();
      }, 5 * 60 * 1000); // 5 minutes

      return () => clearInterval(interval);
    }
  }, [autoRefresh, sheetId, reportData]);

  const fetchGoogleSheetsData = async () => {
    if (!sheetId.trim()) {
      alert('Please enter a Google Sheet ID');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`/api/reports/live/${sheetId}?range=${encodeURIComponent(sheetRange)}`);
      setReportData(response.data);
      setLastRefresh(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Google Sheets data:', error);
      const errorMsg = error.response?.data?.hint || error.response?.data?.message || 'Failed to fetch data from Google Sheets';
      alert(errorMsg);
      setLoading(false);
    }
  };

  const processFile = (file) => {
    setLoading(true);
    setTimeout(() => {
      const mockData = {
        totalParticipants: 145,
        completionRate: 87,
        avgCSAT: 4.6,
        topPerformers: 12,
        engagementScore: 92,
        certifications: 98,
        feedback: [
          { rating: 5, count: 89, percentage: 61 },
          { rating: 4, count: 42, percentage: 29 },
          { rating: 3, count: 11, percentage: 8 },
          { rating: 2, count: 2, percentage: 1 },
          { rating: 1, count: 1, percentage: 1 }
        ],
        topTopics: [
          { name: 'AI & Machine Learning', interest: 95 },
          { name: 'Cloud Architecture', interest: 88 },
          { name: 'API Design', interest: 82 },
          { name: 'Security Best Practices', interest: 79 }
        ]
      };
      setReportData(mockData);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="report-generator">
      <div className="page-header">
        <h2>Report Generator</h2>
        <p>Upload L++ data to generate comprehensive program reports</p>
      </div>

      {!reportData ? (
        <div className="upload-section card">
          <div className="upload-area">
            <Upload size={64} color="#066AFE" />
            <h3>Upload L++ Export File</h3>
            <p>Supports CSV, Excel (.xlsx, .xls)</p>
            <label className="upload-btn">
              <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} style={{ display: 'none' }} />
              <span className="btn btn-primary">Choose File</span>
            </label>
            {file && <p className="file-name">Selected: {file.name}</p>}
            {loading && <div className="loading">Processing file</div>}
          </div>

          <div className={`integration-info ${googleSheetsAvailable ? 'available' : ''}`}>
            <h4>📊 Google Sheets Integration {googleSheetsAvailable ? '✅ Ready' : '⚙️ Setup Required'}</h4>

            {googleSheetsAvailable ? (
              <div className="google-sheets-form">
                <p>Connect directly to your Google Sheet for real-time reports!</p>

                <div className="form-group">
                  <label>Google Sheet ID</label>
                  <input
                    type="text"
                    value={sheetId}
                    onChange={(e) => setSheetId(e.target.value)}
                    placeholder="Paste Sheet ID from URL"
                    className="form-control"
                  />
                  <small className="hint">From URL: docs.google.com/spreadsheets/d/<strong>SHEET_ID</strong>/edit</small>
                </div>

                <div className="form-group">
                  <label>Range (optional)</label>
                  <input
                    type="text"
                    value={sheetRange}
                    onChange={(e) => setSheetRange(e.target.value)}
                    placeholder="Sheet1!A1:Z1000"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={autoRefresh}
                      onChange={(e) => setAutoRefresh(e.target.checked)}
                    />
                    <span>Auto-refresh every 5 minutes</span>
                  </label>
                </div>

                <button
                  onClick={fetchGoogleSheetsData}
                  className="btn btn-primary"
                  disabled={!sheetId.trim() || loading}
                  style={{ width: '100%' }}
                >
                  <RefreshCw size={18} /> {loading ? 'Connecting...' : 'Connect & Generate Report'}
                </button>

                {lastRefresh && (
                  <p className="last-refresh">
                    Last updated: {lastRefresh.toLocaleTimeString()}
                    {autoRefresh && ' • Auto-refresh enabled'}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <p>Real-time sync with your internal Google Sheets for CSAT and program data.</p>
                <ul>
                  <li>Auto-sync CSAT scores</li>
                  <li>Real-time participant tracking</li>
                  <li>Automated data refresh</li>
                </ul>
                <p className="note">
                  <strong>Setup Required:</strong> Follow the guide in <code>GOOGLE_SHEETS_INTEGRATION.md</code> to enable this feature.
                  <br/>Quick start: Install googleapis, setup service account, share your sheet.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="report-view">
          <div className="report-summary">
            <div className="summary-card" style={{ borderTop: '4px solid #066AFE' }}>
              <Users size={40} color="#066AFE" />
              <h3>{reportData.totalParticipants}</h3>
              <p>Total Participants</p>
            </div>
            <div className="summary-card" style={{ borderTop: '4px solid #45C65A' }}>
              <TrendingUp size={40} color="#45C65A" />
              <h3>{reportData.completionRate}%</h3>
              <p>Completion Rate</p>
            </div>
            <div className="summary-card" style={{ borderTop: '4px solid #FCC003' }}>
              <Award size={40} color="#FCC003" />
              <h3>{reportData.avgCSAT}/5.0</h3>
              <p>Average CSAT</p>
            </div>
            <div className="summary-card" style={{ borderTop: '4px solid #BA01FF' }}>
              <FileText size={40} color="#BA01FF" />
              <h3>{reportData.certifications}</h3>
              <p>Certifications</p>
            </div>
          </div>

          <div className="report-details">
            <div className="card">
              <h3>Satisfaction Breakdown</h3>
              <div className="feedback-chart">
                {reportData.feedback.map((item) => (
                  <div key={item.rating} className="feedback-row">
                    <div className="rating-label">{'⭐'.repeat(item.rating)}</div>
                    <div className="rating-bar">
                      <div className="rating-fill" style={{ width: `${item.percentage}%`, background: '#066AFE' }}></div>
                    </div>
                    <div className="rating-count">{item.count} ({item.percentage}%)</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3>Top Interest Topics</h3>
              <div className="topics-list">
                {reportData.topTopics.map((topic, index) => (
                  <div key={index} className="topic-item">
                    <div className="topic-name">{topic.name}</div>
                    <div className="topic-bar">
                      <div className="topic-fill" style={{ width: `${topic.interest}%` }}></div>
                    </div>
                    <div className="topic-score">{topic.interest}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button onClick={() => { setReportData(null); setFile(null); }} className="btn btn-secondary">
            Generate New Report
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportGenerator;
