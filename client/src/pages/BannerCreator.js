import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { programColors } from '../utils/salesforceColors';
import { programTypes } from '../utils/checklistTemplate';
import { Download, RefreshCw, CheckCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { Card } from '../components/Card';
import { Input, Select } from '../components/Input';

const templates = [
  { id: 'modern', name: 'Modern Gradient', desc: 'Clean gradient flow' },
  { id: 'minimal', name: 'Minimal Clean', desc: 'Simple & elegant' },
  { id: 'bold', name: 'Bold & Vibrant', desc: 'High impact' },
  { id: 'professional', name: 'Professional', desc: 'Corporate ready' },
  { id: 'playful', name: 'Playful', desc: 'Dynamic & fun' },
  { id: 'technical', name: 'Blueprint', desc: 'Technical grid' },
  { id: 'ohana', name: 'Ohana', desc: 'Salesforce family' },
  { id: 'trailblazer', name: 'Trailblazer', desc: 'Pioneer spirit' },
];

const bannerSizes = {
  default: { width: '100%', height: 'auto', minHeight: '400px', label: 'Default' },
  linkedin: { width: '1200px', height: '627px', label: 'LinkedIn' },
  instagram: { width: '1080px', height: '1080px', label: 'Instagram' },
  twitter: { width: '1600px', height: '900px', label: 'Twitter' },
  slack: { width: '800px', height: '418px', label: 'Slack' },
  presentation: { width: '1920px', height: '1080px', label: 'Slides' },
};

const BannerCreator = () => {
  const [bannerData, setBannerData] = useState({
    programType: 'Tech Talks',
    title: '',
    subtitle: '',
    date: '',
    time: '',
    location: 'Virtual',
    template: 'modern',
    size: 'default',
  });
  const [slackPost, setSlackPost] = useState('');
  const [copied, setCopied] = useState(false);
  const bannerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBannerData(prev => ({ ...prev, [name]: value }));
  };

  const colors = programColors[bannerData.programType];

  const generateSlackPost = () => {
    setSlackPost(
      `*${bannerData.title}*\n\n${bannerData.subtitle}\n\n` +
      `Date: ${bannerData.date}\nTime: ${bannerData.time}\nLocation: ${bannerData.location}\n\n` +
      `Join us for this exciting ${bannerData.programType} session! Register now via L++\n\n` +
      `#TechEnablement #TPAPAC #LearningAndDevelopment`
    );
  };

  const downloadBanner = async () => {
    if (!bannerRef.current) return;
    const canvas = await html2canvas(bannerRef.current, { scale: 2, backgroundColor: null });
    const link = document.createElement('a');
    link.download = `${(bannerData.title || 'banner').replace(/\s+/g, '_')}_banner.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const copySlackPost = () => {
    navigator.clipboard.writeText(slackPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title="Banner Creator" subtitle="Design branded marketing materials for your programs" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card hover={false} className="p-6 space-y-5">
            <h3 className="text-base font-bold text-sf-blue-15">Details</h3>

            <Select label="Program Type" name="programType" value={bannerData.programType} onChange={handleChange}>
              {programTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </Select>

            <Input label="Title" name="title" value={bannerData.title} onChange={handleChange} placeholder="e.g., AI & Trust Workshop" />
            <Input label="Subtitle" name="subtitle" value={bannerData.subtitle} onChange={handleChange} placeholder="e.g., Building Secure AI Solutions" />

            <div className="grid grid-cols-2 gap-4">
              <Input label="Date" type="date" name="date" value={bannerData.date} onChange={handleChange} />
              <Input label="Time" type="time" name="time" value={bannerData.time} onChange={handleChange} />
            </div>

            <Input label="Location" name="location" value={bannerData.location} onChange={handleChange} placeholder="Virtual / Office Location" />
          </Card>

          {/* Template Selection */}
          <Card hover={false} className="p-6">
            <h3 className="text-base font-bold text-sf-blue-15 mb-4">Template</h3>
            <div className="grid grid-cols-2 gap-2">
              {templates.map(t => (
                <button
                  key={t.id}
                  onClick={() => setBannerData(prev => ({ ...prev, template: t.id }))}
                  className={`text-left p-3 rounded-xl border-2 transition-all duration-200 ${
                    bannerData.template === t.id
                      ? 'border-sf-blue-50 bg-sf-blue-95'
                      : 'border-transparent bg-sf-gray-95 hover:border-sf-gray-80'
                  }`}
                >
                  <div className="text-sm font-semibold text-sf-blue-15">{t.name}</div>
                  <div className="text-xs text-sf-gray-60">{t.desc}</div>
                </button>
              ))}
            </div>
          </Card>

          {/* Size Selection */}
          <Card hover={false} className="p-6">
            <h3 className="text-base font-bold text-sf-blue-15 mb-4">Size</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(bannerSizes).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setBannerData(prev => ({ ...prev, size: key }))}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    bannerData.size === key
                      ? 'bg-sf-blue-50 text-white'
                      : 'bg-sf-gray-95 text-sf-gray-60 hover:bg-sf-gray-80 hover:text-sf-blue-15'
                  }`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Preview */}
        <div className="lg:col-span-3 space-y-6">
          <Card hover={false} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-sf-blue-15">Preview</h3>
              <Button variant="primary" size="sm" onClick={downloadBanner}>
                <Download size={16} /> Download PNG
              </Button>
            </div>

            <div className="bg-sf-gray-95 rounded-xl p-4 overflow-auto flex justify-center">
              <div
                ref={bannerRef}
                className={`banner-preview ${bannerData.template} rounded-xl`}
                style={{
                  background: colors
                    ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
                    : '#066AFE',
                  width: bannerSizes[bannerData.size].width,
                  height: bannerSizes[bannerData.size].height,
                  minHeight: bannerSizes[bannerData.size].minHeight || 'auto',
                  maxWidth: '100%',
                }}
              >
                <div className="banner-content">
                  <div className="banner-category">{bannerData.programType}</div>
                  <h2 className="banner-title">{bannerData.title || 'Your Program Title'}</h2>
                  <p className="banner-subtitle">{bannerData.subtitle || 'Add a subtitle'}</p>
                  <div className="banner-details">
                    <div className="detail-item">
                      <span>📅</span> <span>{bannerData.date || 'Select Date'}</span>
                    </div>
                    <div className="detail-item">
                      <span>⏰</span> <span>{bannerData.time || 'Set Time'}</span>
                    </div>
                    <div className="detail-item">
                      <span>📍</span> <span>{bannerData.location}</span>
                    </div>
                  </div>
                  <div className="banner-footer">
                    <div className="footer-logo">⚡ Tech Enablement · T&P APAC</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Slack Post */}
          <Card hover={false} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-sf-blue-15">Slack Post</h3>
              <Button variant="secondary" size="sm" onClick={generateSlackPost}>
                <RefreshCw size={16} /> Generate
              </Button>
            </div>

            {slackPost ? (
              <div>
                <pre className="bg-sf-gray-95 rounded-xl p-4 text-sm text-sf-blue-15 whitespace-pre-wrap font-sans leading-relaxed">
                  {slackPost}
                </pre>
                <div className="mt-3 flex justify-end">
                  <Button variant="ghost" size="sm" onClick={copySlackPost}>
                    {copied ? <CheckCircle size={16} className="text-sf-green-70" /> : <Download size={16} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-sf-gray-60">Click "Generate" to create a formatted Slack post from your banner details.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BannerCreator;
