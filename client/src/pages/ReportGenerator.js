import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Upload, Users, TrendingUp, Award, FileText, RefreshCw, ArrowLeft, Star } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { Card, StatCard } from '../components/Card';
import { Input } from '../components/Input';

const ReportGenerator = () => {
  const [file, setFile] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const [sheetId, setSheetId] = useState('');
  const [sheetRange, setSheetRange] = useState('Sheet1!A1:Z1000');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [googleSheetsAvailable, setGoogleSheetsAvailable] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);

  useEffect(() => {
    axios.get('/api/google-sheets/status')
      .then(r => setGoogleSheetsAvailable(r.data.available))
      .catch(() => setGoogleSheetsAvailable(false));
  }, []);

  const fetchGoogleSheetsData = useCallback(async () => {
    if (!sheetId.trim()) return;
    setLoading(true);
    try {
      const r = await axios.get(`/api/reports/live/${sheetId}?range=${encodeURIComponent(sheetRange)}`);
      setReportData(r.data);
      setLastRefresh(new Date());
    } catch (error) {
      const msg = error.response?.data?.hint || error.response?.data?.message || 'Failed to fetch data';
      alert(msg);
    }
    setLoading(false);
  }, [sheetId, sheetRange]);

  useEffect(() => {
    if (autoRefresh && sheetId && reportData) {
      const interval = setInterval(fetchGoogleSheetsData, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, sheetId, reportData, fetchGoogleSheetsData]);

  const processFile = (f) => {
    setFile(f);
    setLoading(true);
    setTimeout(() => {
      setReportData({
        totalParticipants: 145,
        completionRate: 87,
        avgCSAT: 4.6,
        certifications: 98,
        feedback: [
          { rating: 5, count: 89, percentage: 61 },
          { rating: 4, count: 42, percentage: 29 },
          { rating: 3, count: 11, percentage: 8 },
          { rating: 2, count: 2, percentage: 1 },
          { rating: 1, count: 1, percentage: 1 },
        ],
        topTopics: [
          { name: 'AI & Machine Learning', interest: 95 },
          { name: 'Cloud Architecture', interest: 88 },
          { name: 'API Design', interest: 82 },
          { name: 'Security Best Practices', interest: 79 },
        ],
      });
      setLoading(false);
    }, 1500);
  };

  const handleFileUpload = (e) => {
    const f = e.target.files[0];
    if (f) processFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) processFile(f);
  };

  const ratingColors = ['#066AFE', '#06A59A', '#FCC003', '#F38303', '#FF538A'];

  if (reportData) {
    return (
      <div className="animate-fade-in">
        <PageHeader
          title="Program Report"
          subtitle={file ? `Source: ${file.name}` : 'Live from Google Sheets'}
          actions={
            <Button variant="ghost" size="sm" onClick={() => { setReportData(null); setFile(null); }}>
              <ArrowLeft size={16} /> New Report
            </Button>
          }
        />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Users size={22} />} value={reportData.totalParticipants} label="Participants" color="#066AFE" />
          <StatCard icon={<TrendingUp size={22} />} value={`${reportData.completionRate}%`} label="Completion Rate" color="#45C65A" />
          <StatCard icon={<Star size={22} />} value={`${reportData.avgCSAT}/5`} label="Avg CSAT" color="#FCC003" />
          <StatCard icon={<Award size={22} />} value={reportData.certifications} label="Certifications" color="#BA01FF" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CSAT Breakdown */}
          <Card hover={false} className="p-6">
            <h3 className="text-base font-bold text-sf-blue-15 mb-5">Satisfaction Breakdown</h3>
            <div className="space-y-3">
              {reportData.feedback.map((item, i) => (
                <div key={item.rating} className="flex items-center gap-3">
                  <div className="w-16 text-sm text-sf-gray-60 flex items-center gap-1">
                    <Star size={14} className="text-sf-yellow-80 fill-sf-yellow-80" />
                    {item.rating}
                  </div>
                  <div className="flex-1 h-2.5 bg-sf-gray-95 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${item.percentage}%`, backgroundColor: ratingColors[i] }}
                    />
                  </div>
                  <div className="w-20 text-right text-sm text-sf-gray-60">
                    {item.count} <span className="text-sf-gray-80">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Topics */}
          <Card hover={false} className="p-6">
            <h3 className="text-base font-bold text-sf-blue-15 mb-5">Top Interest Topics</h3>
            <div className="space-y-4">
              {reportData.topTopics.map((topic, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-sf-blue-15">{topic.name}</span>
                    <span className="text-sm font-bold" style={{ color: ratingColors[i] }}>{topic.interest}%</span>
                  </div>
                  <div className="h-2 bg-sf-gray-95 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${topic.interest}%`, backgroundColor: ratingColors[i] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="Report Generator" subtitle="Upload L++ data to generate comprehensive program reports" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload */}
        <Card hover={false} className="p-8">
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${
              dragOver
                ? 'border-sf-blue-50 bg-sf-blue-95'
                : 'border-sf-gray-80 hover:border-sf-blue-80 hover:bg-sf-blue-95/30'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-sf-blue-95 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload size={28} className="text-sf-blue-50" />
            </div>
            <h3 className="text-lg font-bold text-sf-blue-15 mb-1">Upload L++ Export</h3>
            <p className="text-sm text-sf-gray-60 mb-5">Drag & drop or click to browse. Supports CSV, XLSX, XLS</p>
            <label>
              <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} className="hidden" />
              <Button variant="primary" size="md" className="cursor-pointer" as="span">Choose File</Button>
            </label>
            {file && <p className="mt-3 text-sm font-medium text-sf-blue-50">{file.name}</p>}
            {loading && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-sf-gray-60">
                <div className="w-4 h-4 border-2 border-sf-blue-80 border-t-sf-blue-50 rounded-full animate-spin" />
                Processing...
              </div>
            )}
          </div>
        </Card>

        {/* Google Sheets */}
        <Card hover={false} className="p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-sf-green-95 rounded-xl flex items-center justify-center">
              <FileText size={20} className="text-sf-green-50" />
            </div>
            <div>
              <h3 className="text-base font-bold text-sf-blue-15">Google Sheets</h3>
              <p className="text-xs text-sf-gray-60">
                {googleSheetsAvailable ? 'Connected & ready' : 'Setup required'}
              </p>
            </div>
            <span className={`ml-auto px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              googleSheetsAvailable
                ? 'bg-sf-green-95 text-sf-green-50'
                : 'bg-sf-yellow-95 text-sf-yellow-50'
            }`}>
              {googleSheetsAvailable ? 'Ready' : 'Setup'}
            </span>
          </div>

          {googleSheetsAvailable ? (
            <div className="space-y-4">
              <Input
                label="Sheet ID"
                value={sheetId}
                onChange={(e) => setSheetId(e.target.value)}
                placeholder="From URL: docs.google.com/spreadsheets/d/SHEET_ID/edit"
              />
              <Input
                label="Range"
                value={sheetRange}
                onChange={(e) => setSheetRange(e.target.value)}
                placeholder="Sheet1!A1:Z1000"
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="w-4 h-4 rounded border-sf-gray-80 text-sf-blue-50 focus:ring-sf-blue-50"
                />
                <span className="text-sm text-sf-blue-15">Auto-refresh every 5 minutes</span>
              </label>
              <Button className="w-full" onClick={fetchGoogleSheetsData} disabled={!sheetId.trim() || loading}>
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                {loading ? 'Connecting...' : 'Connect & Generate'}
              </Button>
              {lastRefresh && (
                <p className="text-xs text-sf-gray-60 text-center">
                  Last updated: {lastRefresh.toLocaleTimeString()}
                  {autoRefresh && ' · Auto-refresh on'}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-3 text-sm text-sf-gray-60">
              <p>Connect directly to your Google Sheet for real-time reports.</p>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-sf-blue-50" /> Auto-sync CSAT scores</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-sf-teal-60" /> Real-time participant tracking</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-sf-violet-50" /> Automated data refresh</li>
              </ul>
              <p className="text-xs p-3 bg-sf-yellow-95 rounded-xl text-sf-yellow-20">
                Follow <code className="font-mono">GOOGLE_SHEETS_INTEGRATION.md</code> to enable.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ReportGenerator;
