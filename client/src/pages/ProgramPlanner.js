import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { masterChecklistTemplate, programTypes } from '../utils/checklistTemplate';
import { programColors } from '../utils/salesforceColors';
import { Download, CheckCircle, Circle, Save, ArrowRight, Zap } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { Card } from '../components/Card';
import { Input, Select } from '../components/Input';
import ProgressBar from '../components/ProgressBar';

const ProgramPlanner = () => {
  const [formData, setFormData] = useState({
    sessionName: '',
    sessionDate: format(new Date(), 'yyyy-MM-dd'),
    programManager: '',
    programType: 'Tech Talks',
  });
  const [checklist, setChecklist] = useState(null);
  const [showChecklist, setShowChecklist] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateChecklist = () => {
    const sessionDate = new Date(formData.sessionDate);
    const generated = JSON.parse(JSON.stringify(masterChecklistTemplate));
    generated.metadata = { ...formData, generatedOn: format(new Date(), 'yyyy-MM-dd HH:mm:ss') };
    generated.phases = generated.phases.map((phase, pi) => {
      const startDay = pi * 3;
      return {
        ...phase,
        tasks: phase.tasks.map((task, ti) => ({
          ...task,
          dueDate: format(addDays(sessionDate, -15 + startDay + Math.floor(ti / 2)), 'yyyy-MM-dd'),
        })),
      };
    });
    setChecklist(generated);
    setShowChecklist(true);
  };

  const toggleTaskStatus = (phaseId, taskId) => {
    setChecklist(prev => ({
      ...prev,
      phases: prev.phases.map(phase =>
        phase.id === phaseId
          ? { ...phase, tasks: phase.tasks.map(task =>
              task.id === taskId ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } : task
            )}
          : phase
      ),
    }));
  };

  const updateTaskField = (phaseId, taskId, field, value) => {
    setChecklist(prev => ({
      ...prev,
      phases: prev.phases.map(phase =>
        phase.id === phaseId
          ? { ...phase, tasks: phase.tasks.map(task =>
              task.id === taskId ? { ...task, [field]: value } : task
            )}
          : phase
      ),
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
    const blob = new Blob([JSON.stringify(checklist, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.sessionName.replace(/\s+/g, '_')}_progress.json`;
    a.click();
  };

  const getPhaseProgress = (phase) => {
    const done = phase.tasks.filter(t => t.status === 'completed').length;
    return Math.round((done / phase.tasks.length) * 100);
  };

  const colors = programColors[formData.programType];

  if (!showChecklist) {
    return (
      <div className="animate-fade-in">
        <PageHeader title="Program Planner" subtitle="Auto-generate comprehensive program checklists with timelines" />

        <Card hover={false} className="p-8 max-w-2xl">
          <h3 className="text-lg font-bold text-sf-blue-15 mb-6">Program Details</h3>

          <div className="space-y-5">
            <Select label="Program Type" name="programType" value={formData.programType} onChange={handleInputChange}>
              {programTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </Select>

            <Input label="Session Name" name="sessionName" value={formData.sessionName} onChange={handleInputChange} placeholder="e.g., Tech Talk - AI & Trust" />

            <div className="grid grid-cols-2 gap-4">
              <Input label="Launch Date (Day 15)" type="date" name="sessionDate" value={formData.sessionDate} onChange={handleInputChange} />
              <Input label="Program Manager" name="programManager" value={formData.programManager} onChange={handleInputChange} placeholder="Your name" />
            </div>
          </div>

          <Button
            className="mt-8 w-full"
            size="lg"
            onClick={generateChecklist}
            disabled={!formData.sessionName || !formData.programManager}
          >
            <Zap size={18} /> Generate Program Plan
          </Button>
        </Card>
      </div>
    );
  }

  const totalTasks = checklist.phases.reduce((sum, p) => sum + p.tasks.length, 0);
  const totalDone = checklist.phases.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'completed').length, 0);
  const overallProgress = Math.round((totalDone / totalTasks) * 100);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="rounded-2xl p-6 mb-6 text-white" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{checklist.metadata.sessionName}</h1>
            <p className="text-white/80 text-sm mt-1">
              {checklist.metadata.programType} · Launch: {format(new Date(checklist.metadata.sessionDate), 'MMMM d, yyyy')} · PM: {checklist.metadata.programManager}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button variant="ghost" size="sm" className="!text-white/80 hover:!text-white hover:!bg-white/10" onClick={() => setShowChecklist(false)}>
              ← Back
            </Button>
            <Button variant="ghost" size="sm" className="!text-white/80 hover:!text-white hover:!bg-white/10" onClick={saveProgress}>
              <Save size={16} /> Save
            </Button>
            <Button variant="ghost" size="sm" className="!text-white/80 hover:!text-white hover:!bg-white/10" onClick={downloadCSV}>
              <Download size={16} /> Export
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-white/80">Overall Progress</span>
            <span className="font-bold">{totalDone}/{totalTasks} tasks · {overallProgress}%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${overallProgress}%` }} />
          </div>
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-4">
        {checklist.phases.map(phase => {
          const progress = getPhaseProgress(phase);
          const done = phase.tasks.filter(t => t.status === 'completed').length;
          return (
            <Card key={phase.id} hover={false} className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-sf-blue-15">{phase.name}</h3>
                    <span className="text-xs font-medium text-sf-gray-60 px-2 py-0.5 bg-sf-gray-95 rounded-full">
                      {phase.timeline}
                    </span>
                  </div>
                  <p className="text-sm text-sf-gray-60 mt-0.5">{phase.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold text-sf-blue-15">{done}/{phase.tasks.length}</div>
                </div>
              </div>

              <ProgressBar value={progress} color={colors.primary} size="sm" showLabel={false} />

              <div className="mt-4 divide-y divide-sf-gray-95">
                {phase.tasks.map(task => (
                  <div key={task.id} className={`flex gap-3 py-3 first:pt-0 last:pb-0 ${task.status === 'completed' ? 'opacity-60' : ''}`}>
                    <button
                      onClick={() => toggleTaskStatus(phase.id, task.id)}
                      className="flex-shrink-0 mt-0.5 transition-transform hover:scale-110"
                    >
                      {task.status === 'completed'
                        ? <CheckCircle size={20} style={{ color: colors.primary }} />
                        : <Circle size={20} className="text-sf-gray-80" />
                      }
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm ${task.status === 'completed' ? 'line-through text-sf-gray-60' : 'text-sf-blue-15'}`}>
                        {task.text}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <input
                          type="date"
                          value={task.dueDate}
                          onChange={(e) => updateTaskField(phase.id, task.id, 'dueDate', e.target.value)}
                          className="text-xs px-2.5 py-1 rounded-lg border border-sf-gray-80 bg-white text-sf-gray-60 focus:outline-none focus:border-sf-blue-50"
                        />
                        <input
                          type="text"
                          value={task.owner}
                          onChange={(e) => updateTaskField(phase.id, task.id, 'owner', e.target.value)}
                          placeholder="Owner"
                          className="text-xs px-2.5 py-1 rounded-lg border border-sf-gray-80 bg-white text-sf-gray-60 placeholder:text-sf-gray-80 w-24 focus:outline-none focus:border-sf-blue-50"
                        />
                        <input
                          type="text"
                          value={task.comments}
                          onChange={(e) => updateTaskField(phase.id, task.id, 'comments', e.target.value)}
                          placeholder="Add note..."
                          className="text-xs px-2.5 py-1 rounded-lg border border-sf-gray-80 bg-white text-sf-gray-60 placeholder:text-sf-gray-80 flex-1 min-w-[120px] focus:outline-none focus:border-sf-blue-50"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProgramPlanner;
