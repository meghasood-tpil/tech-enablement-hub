import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { masterChecklistTemplate, programTypes } from '../utils/checklistTemplate';
import { programColors } from '../utils/salesforceColors';
import { Download, CheckCircle, Circle, Save } from 'lucide-react';
import './ProgramPlanner.css';

const ProgramPlanner = () => {
  const [formData, setFormData] = useState({
    sessionName: '',
    sessionDate: format(new Date(), 'yyyy-MM-DD'),
    programManager: '',
    programType: 'Tech Talks'
  });

  const [checklist, setChecklist] = useState(null);
  const [showChecklist, setShowChecklist] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateChecklist = () => {
    const sessionDate = new Date(formData.sessionDate);
    const generatedChecklist = JSON.parse(JSON.stringify(masterChecklistTemplate));

    generatedChecklist.metadata = {
      ...formData,
      generatedOn: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    };

    generatedChecklist.phases = generatedChecklist.phases.map((phase, phaseIndex) => {
      const startDay = phaseIndex * 3;
      return {
        ...phase,
        tasks: phase.tasks.map((task, taskIndex) => {
          const daysOffset = startDay + Math.floor(taskIndex / 2);
          const calculatedDate = addDays(sessionDate, -15 + daysOffset);
          return {
            ...task,
            dueDate: format(calculatedDate, 'yyyy-MM-dd')
          };
        })
      };
    });

    setChecklist(generatedChecklist);
    setShowChecklist(true);
  };

  const toggleTaskStatus = (phaseId, taskId) => {
    setChecklist(prev => ({
      ...prev,
      phases: prev.phases.map(phase =>
        phase.id === phaseId
          ? {
              ...phase,
              tasks: phase.tasks.map(task =>
                task.id === taskId
                  ? {
                      ...task,
                      status: task.status === 'completed' ? 'pending' : 'completed'
                    }
                  : task
              )
            }
          : phase
      )
    }));
  };

  const updateTaskField = (phaseId, taskId, field, value) => {
    setChecklist(prev => ({
      ...prev,
      phases: prev.phases.map(phase =>
        phase.id === phaseId
          ? {
              ...phase,
              tasks: phase.tasks.map(task =>
                task.id === taskId
                  ? { ...task, [field]: value }
                  : task
              )
            }
          : phase
      )
    }));
  };

  const downloadCSV = () => {
    let csv = 'Phase,Task,Due Date,Status,Owner,Comments,Resources\n';
    checklist.phases.forEach(phase => {
      phase.tasks.forEach(task => {
        csv += `"${phase.name}","${task.text}","${task.dueDate}","${task.status}","${task.owner}","${task.comments}","${task.resources}"\n`;
      });
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.sessionName.replace(/\s+/g, '_')}_checklist.csv`;
    a.click();
  };

  const saveProgress = () => {
    const dataStr = JSON.stringify(checklist, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.sessionName.replace(/\s+/g, '_')}_progress.json`;
    a.click();
    alert('Progress saved successfully!');
  };

  const getPhaseProgress = (phase) => {
    const completed = phase.tasks.filter(t => t.status === 'completed').length;
    const total = phase.tasks.length;
    return Math.round((completed / total) * 100);
  };

  const colors = programColors[formData.programType];

  return (
    <div className="program-planner">
      <div className="page-header" style={{ borderLeft: `6px solid ${colors?.primary || '#066AFE'}` }}>
        <h2>Program Planner</h2>
        <p>Auto-generate comprehensive program checklists with timelines</p>
      </div>

      {!showChecklist ? (
        <div className="planner-form card">
          <h3>Program Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Program Type</label>
              <select
                name="programType"
                value={formData.programType}
                onChange={handleInputChange}
                className="form-control"
              >
                {programTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Session Name</label>
              <input
                type="text"
                name="sessionName"
                value={formData.sessionName}
                onChange={handleInputChange}
                placeholder="e.g., Tech Talk - AI & Trust"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Session Date (Day 15 - Launch Day)</label>
              <input
                type="date"
                name="sessionDate"
                value={formData.sessionDate}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Program Manager</label>
              <input
                type="text"
                name="programManager"
                value={formData.programManager}
                onChange={handleInputChange}
                placeholder="Your name"
                className="form-control"
              />
            </div>
          </div>

          <button
            onClick={generateChecklist}
            className="btn btn-primary"
            disabled={!formData.sessionName || !formData.programManager}
            style={{ marginTop: '1.5rem' }}
          >
            🚀 Generate Program Plan
          </button>
        </div>
      ) : (
        <div className="checklist-view">
          <div className="checklist-header card" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` }}>
            <div className="checklist-info">
              <h2 style={{ color: 'white', margin: 0 }}>{checklist.metadata.sessionName}</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', margin: '0.5rem 0 0 0' }}>
                {checklist.metadata.programType} • Launch: {format(new Date(checklist.metadata.sessionDate), 'MMMM d, yyyy')} • PM: {checklist.metadata.programManager}
              </p>
            </div>
            <div className="checklist-actions">
              <button onClick={saveProgress} className="btn-icon" title="Save Progress">
                <Save size={20} /> Save
              </button>
              <button onClick={downloadCSV} className="btn-icon" title="Download CSV">
                <Download size={20} /> Export
              </button>
              <button onClick={() => setShowChecklist(false)} className="btn-icon" title="Start Over">
                ← Back
              </button>
            </div>
          </div>

          <div className="phases-container">
            {checklist.phases.map(phase => {
              const progress = getPhaseProgress(phase);
              return (
                <div key={phase.id} className="phase-card card">
                  <div className="phase-header">
                    <div>
                      <h3>{phase.name}</h3>
                      <p className="phase-timeline">{phase.timeline} • {phase.description}</p>
                    </div>
                    <div className="phase-progress">
                      <div className="progress-circle" style={{ background: `conic-gradient(${colors.primary} ${progress * 3.6}deg, #e0e0e0 0deg)` }}>
                        <div className="progress-inner">{progress}%</div>
                      </div>
                    </div>
                  </div>

                  <div className="tasks-list">
                    {phase.tasks.map(task => (
                      <div key={task.id} className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
                        <div className="task-checkbox" onClick={() => toggleTaskStatus(phase.id, task.id)}>
                          {task.status === 'completed' ? (
                            <CheckCircle size={24} color={colors.primary} />
                          ) : (
                            <Circle size={24} color="#ccc" />
                          )}
                        </div>
                        <div className="task-content">
                          <div className="task-text">{task.text}</div>
                          <div className="task-meta">
                            <input
                              type="date"
                              value={task.dueDate}
                              onChange={(e) => updateTaskField(phase.id, task.id, 'dueDate', e.target.value)}
                              className="task-date"
                            />
                            <input
                              type="text"
                              value={task.owner}
                              onChange={(e) => updateTaskField(phase.id, task.id, 'owner', e.target.value)}
                              placeholder="Owner"
                              className="task-owner"
                            />
                            <input
                              type="text"
                              value={task.comments}
                              onChange={(e) => updateTaskField(phase.id, task.id, 'comments', e.target.value)}
                              placeholder="Add comments..."
                              className="task-comments"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramPlanner;
