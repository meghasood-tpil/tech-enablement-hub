import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { programColors, salesforceColors } from '../utils/salesforceColors';
import { programTypes } from '../utils/checklistTemplate';
import { Download, RefreshCw } from 'lucide-react';
import './BannerCreator.css';

const BannerCreator = () => {
  const [bannerData, setBannerData] = useState({
    programType: 'Tech Talks',
    title: '',
    subtitle: '',
    date: '',
    time: '',
    location: 'Virtual',
    template: 'modern'
  });

  const [slackPost, setSlackPost] = useState('');
  const bannerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBannerData(prev => ({ ...prev, [name]: value }));
  };

  const colors = programColors[bannerData.programType];

  const generateSlackPost = () => {
    const post = `
🎯 *${bannerData.title}*

${bannerData.subtitle}

📅 *Date:* ${bannerData.date}
⏰ *Time:* ${bannerData.time}
📍 *Location:* ${bannerData.location}

Join us for this exciting ${bannerData.programType} session! Register now via L++

#TechEnablement #TPAPAC #LearningAndDevelopment
    `.trim();
    setSlackPost(post);
  };

  const downloadBanner = async () => {
    if (bannerRef.current) {
      const canvas = await html2canvas(bannerRef.current, {
        scale: 2,
        backgroundColor: null
      });
      const link = document.createElement('a');
      link.download = `${bannerData.title.replace(/\s+/g, '_')}_banner.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const copySlackPost = () => {
    navigator.clipboard.writeText(slackPost);
    alert('Slack post copied to clipboard!');
  };

  return (
    <div className="banner-creator">
      <div className="page-header">
        <h2>Banner & Slack Post Creator</h2>
        <p>Design branded marketing materials for your programs</p>
      </div>

      <div className="creator-container">
        <div className="creator-form card">
          <h3>Banner Details</h3>

          <div className="form-group">
            <label>Program Type</label>
            <select name="programType" value={bannerData.programType} onChange={handleChange} className="form-control">
              {programTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={bannerData.title}
              onChange={handleChange}
              placeholder="e.g., AI & Trust Workshop"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={bannerData.subtitle}
              onChange={handleChange}
              placeholder="e.g., Building Secure AI Solutions"
              className="form-control"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={bannerData.date}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={bannerData.time}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={bannerData.location}
              onChange={handleChange}
              placeholder="Virtual / Office Location"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Template Style</label>
            <select name="template" value={bannerData.template} onChange={handleChange} className="form-control">
              <option value="modern">Modern Gradient</option>
              <option value="minimal">Minimal Clean</option>
              <option value="bold">Bold & Vibrant</option>
            </select>
          </div>

          <button onClick={generateSlackPost} className="btn btn-primary">
            Generate Slack Post
          </button>
        </div>

        <div className="creator-preview">
          <div className="preview-section card">
            <h3>Banner Preview</h3>
            <div
              ref={bannerRef}
              className={`banner-preview ${bannerData.template}`}
              style={{
                background: colors ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` : '#066AFE'
              }}
            >
              <div className="banner-content">
                <div className="banner-category">{bannerData.programType}</div>
                <h2 className="banner-title">{bannerData.title || 'Your Program Title'}</h2>
                <p className="banner-subtitle">{bannerData.subtitle || 'Add a subtitle'}</p>
                <div className="banner-details">
                  <div className="detail-item">
                    <span className="detail-icon">📅</span>
                    <span>{bannerData.date || 'Select Date'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">⏰</span>
                    <span>{bannerData.time || 'Set Time'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <span>{bannerData.location}</span>
                  </div>
                </div>
                <div className="banner-footer">
                  <div className="footer-logo">⚡ Tech Enablement • T&P APAC</div>
                </div>
              </div>
            </div>
            <button onClick={downloadBanner} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
              <Download size={18} /> Download Banner
            </button>
          </div>

          {slackPost && (
            <div className="preview-section card">
              <h3>Slack Post</h3>
              <div className="slack-preview">
                <pre>{slackPost}</pre>
              </div>
              <button onClick={copySlackPost} className="btn btn-accent">
                📋 Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerCreator;
