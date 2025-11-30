import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Zap, Lightbulb, Clock } from "lucide-react";
import type { ActiveExperiment, ExperimentTemplate } from "@shared/schema";
import { EXPERIMENTS } from "@/data/experiments";
import { generateAIInsight } from "@/lib/ai";

export interface LogEntry {
  date: string;
  temp: number | null;
  pulse: number | null;
  notes: string;
}

interface AIInsight {
  text: string;
  date: string;
}

// Helper function to generate habit suggestions based on log patterns
function generateHabitSuggestions(logs: LogEntry[]): string[] {
  const suggestions: string[] = [];

  if (logs.length === 0) return suggestions;

  // Analyze temperature patterns
  const temps = logs.filter(log => log.temp !== null).map(log => log.temp as number);
  if (temps.length > 0) {
    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
    if (avgTemp < 97.4) {
      suggestions.push("Try increasing morning carbs or adding a warm beverage to support your metabolism.");
    }
  }

  // Analyze pulse patterns
  const pulses = logs.filter(log => log.pulse !== null).map(log => log.pulse as number);
  if (pulses.length > 0) {
    const avgPulse = pulses.reduce((a, b) => a + b, 0) / pulses.length;
    if (avgPulse > 90) {
      suggestions.push("Consider adding more sodium or evaluating stress triggers throughout your day.");
    }
  }

  // Analyze notes patterns
  const emptyNotes = logs.filter(log => !log.notes || log.notes.trim().length === 0).length;
  const emptyNotesRatio = emptyNotes / logs.length;
  if (emptyNotesRatio > 0.5) {
    suggestions.push("Try adding short daily notes to help AI understand your patterns better.");
  }

  return suggestions;
}

export default function ExperimentDetail() {
  const params = useParams();
  const experimentId = params.id as string;
  const [, setLocation] = useLocation();
  
  const [currentExperiment, setCurrentExperiment] = useState<ActiveExperiment | null>(null);
  const [experimentTemplate, setExperimentTemplate] = useState<ExperimentTemplate | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [formTemp, setFormTemp] = useState<string>("");
  const [formPulse, setFormPulse] = useState<string>("");
  const [formNotes, setFormNotes] = useState<string>("");
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  useEffect(() => {
    // Find the experiment template from the static list
    const template = EXPERIMENTS.find(e => e.id === experimentId);
    setExperimentTemplate(template || null);

    // Load the active experiment instance from localStorage
    const experimentsData = localStorage.getItem("lighter_active_experiments");
    if (experimentsData) {
      const experiments: ActiveExperiment[] = JSON.parse(experimentsData);
      const active = experiments.find(e => e.experimentId === experimentId && !e.completed);
      if (active) {
        setCurrentExperiment(active);
        // Load logs from the experiment
        try {
          const experimentLogs = (active as any).logs || [];
          setLogs(experimentLogs);
        } catch {
          setLogs([]);
        }
      }
    }
  }, [experimentId]);

  // Fetch AI insights when logs change and logs exist
  useEffect(() => {
    if (logs.length > 0 && experimentTemplate && currentExperiment) {
      const fetchInsight = async () => {
        setAiLoading(true);
        const insight = await generateAIInsight({
          experimentId: currentExperiment.experimentId,
          experimentTitle: experimentTemplate.title,
          logs,
          date: new Date().toISOString().split('T')[0],
        });
        setAiInsights(prev => [
          {
            text: insight,
            date: new Date().toISOString()
          },
          ...prev
        ]);
        setAiLoading(false);
      };
      fetchInsight();
    }
  }, [logs, experimentTemplate, currentExperiment]);

  const handleLogData = () => {
    if (!currentExperiment) return;

    const newLog: LogEntry = {
      date: new Date().toISOString(),
      temp: formTemp ? parseFloat(formTemp) : null,
      pulse: formPulse ? parseFloat(formPulse) : null,
      notes: formNotes,
    };

    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);

    // Update the experiment in localStorage
    const experimentsData = localStorage.getItem("lighter_active_experiments");
    if (experimentsData) {
      const experiments: ActiveExperiment[] = JSON.parse(experimentsData);
      const updated = experiments.map(e =>
        e.id === currentExperiment.id
          ? { ...e, logs: updatedLogs }
          : e
      );
      localStorage.setItem("lighter_active_experiments", JSON.stringify(updated));
    }

    // Clear the form inputs
    setFormTemp("");
    setFormPulse("");
    setFormNotes("");
  };

  const handleStartExperiment = () => {
    if (!experimentTemplate) return;

    const newExperiment: ActiveExperiment = {
      id: `active_${Date.now()}`,
      userId: 'local',
      experimentId,
      startDate: new Date().toISOString().split('T')[0],
      currentDay: 1,
      completed: false,
      notes: [],
      checklist: [],
      measurements: '{}',
      logs: [],
    };

    const experimentsData = localStorage.getItem("lighter_active_experiments");
    const existing: ActiveExperiment[] = experimentsData ? JSON.parse(experimentsData) : [];
    const updated = [...existing, newExperiment];
    localStorage.setItem("lighter_active_experiments", JSON.stringify(updated));

    setCurrentExperiment(newExperiment);
  };

  const handleFinishExperiment = () => {
    if (!currentExperiment) return;

    // Update the experiment in localStorage
    const experimentsData = localStorage.getItem("lighter_active_experiments");
    if (experimentsData) {
      const experiments: ActiveExperiment[] = JSON.parse(experimentsData);
      const updated = experiments.map(e =>
        e.id === currentExperiment.id
          ? { 
              ...e, 
              completed: true, 
              completedAt: new Date().toISOString() 
            }
          : e
      );
      localStorage.setItem("lighter_active_experiments", JSON.stringify(updated));
    }

    // Navigate to experiment summary page
    setLocation(`/experiments/summary?experimentId=${currentExperiment.experimentId}`);
  };

  if (!experimentTemplate) {
    return (
      <div className="min-h-screen pb-24 bg-gradient-to-b from-background via-background to-primary/5">
        <div className="max-w-md mx-auto p-6 space-y-6">
          <Link href="/experiments">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-experiments">
              <ArrowLeft className="w-4 h-4" />
              Back to Experiments
            </Button>
          </Link>
          <p className="text-muted-foreground" data-testid="text-experiment-not-found">
            Experiment not found.
          </p>
        </div>
      </div>
    );
  }

  // Calculate day counter and progress for active experiments
  let currentDay = 1;
  let progress = 0;
  const isActive = currentExperiment && !currentExperiment.completed;
  
  if (currentExperiment) {
    const startDate = new Date(currentExperiment.startDate);
    const today = new Date();
    const daysPassed = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
    currentDay = Math.max(1, daysPassed);
    progress = (currentDay / experimentTemplate.duration) * 100;
  }

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-background via-background to-primary/5">
      <div className="max-w-md mx-auto p-6 space-y-6">
        
        {/* Back Button */}
        <Link href="/experiments">
          <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-experiments">
            <ArrowLeft className="w-4 h-4" />
            Back to Experiments
          </Button>
        </Link>

        {/* Experiment Overview */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-chart-2/5 space-y-4" data-testid="card-experiment-overview">
          <div>
            <h1 className="text-3xl font-bold text-foreground" data-testid="heading-overview-title">
              {experimentTemplate.title}
            </h1>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed" data-testid="text-overview-description">
              {experimentTemplate.why}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap pt-2">
            <Badge variant="secondary" data-testid="badge-category">
              {experimentTemplate.category}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1" data-testid="text-duration">
              <Clock className="w-3 h-3" />
              {experimentTemplate.duration} days
            </span>
          </div>
        </Card>

        {/* Start Experiment Button (only show when not started) */}
        {!currentExperiment && (
          <Button 
            onClick={handleStartExperiment}
            className="w-full bg-gradient-to-r from-primary to-chart-2 text-primary-foreground text-base font-semibold py-3"
            data-testid="button-start-experiment"
          >
            Start Experiment
          </Button>
        )}

        {/* Header Container (only show when active) */}
        {isActive && (
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-chart-2/5 space-y-4" data-testid="card-experiment-header">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h2 className="text-lg font-semibold" data-testid="heading-progress-title">
                Progress
              </h2>
              <p className="text-sm text-muted-foreground mt-1" data-testid="text-started-date">
                Started: {new Date(currentExperiment.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <Badge data-testid="badge-experiment-status">Active</Badge>
          </div>

          {/* Day Counter and Progress */}
          <div className="space-y-3 pt-2">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-semibold text-foreground" data-testid="text-day-counter">
                Day {currentDay} of {experimentTemplate.duration}
              </p>
              <span className="text-xs text-muted-foreground" data-testid="text-progress-percentage">
                {Math.round(Math.min(progress, 100))}%
              </span>
            </div>
            <Progress value={Math.min(progress, 100)} data-testid="progress-experiment" />
          </div>
        </Card>
        )}

        {/* Experiment Status Section (only show when active) */}
        {isActive && (
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-experiment-status">
          <h2 className="font-semibold text-foreground mb-3" data-testid="heading-status">
            Experiment Status
          </h2>
          <p className="text-muted-foreground text-sm" data-testid="text-status-placeholder">
            Started on {new Date(currentExperiment.startDate).toLocaleDateString()}. Ongoing tracking across all metrics.
          </p>
        </Card>
        )}

        {/* Daily Tasks Section (only show when active) */}
        {isActive && (
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-daily-tasks">
          <h2 className="font-semibold text-foreground mb-3" data-testid="heading-daily-tasks">
            Daily Tasks
          </h2>
          <p className="text-muted-foreground text-sm" data-testid="text-daily-tasks-placeholder">
            Placeholder: Daily tasks and checklist items will appear here. Check off completed actions as you go.
          </p>
        </Card>
        )}

        {/* Logs Section (only show when active) */}
        {isActive && (
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-logs">
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground" data-testid="heading-logs">
              Logs
            </h2>
            
            {logs.length === 0 ? (
              <p className="text-muted-foreground text-sm" data-testid="text-logs-empty">
                No logs yet. Click the button below to log your first entry.
              </p>
            ) : (
              <div className="space-y-2" data-testid="logs-list">
                {logs.map((log, idx) => (
                  <div key={idx} className="p-3 bg-muted/50 rounded-lg" data-testid={`log-entry-${idx}`}>
                    <p className="text-xs text-muted-foreground" data-testid={`log-date-${idx}`}>
                      {new Date(log.date).toLocaleString()}
                    </p>
                    <p className="text-sm text-foreground mt-1" data-testid={`log-notes-${idx}`}>
                      Temp: {log.temp || "-"} | Pulse: {log.pulse || "-"}
                    </p>
                    {log.notes && (
                      <p className="text-sm text-muted-foreground mt-1" data-testid={`log-notes-text-${idx}`}>
                        {log.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Log Form Inputs */}
            <div className="space-y-3 pt-4 border-t" data-testid="section-log-form">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="temp-input" className="text-xs text-muted-foreground">
                    Temperature (°F)
                  </Label>
                  <Input
                    id="temp-input"
                    type="number"
                    placeholder="98.6"
                    value={formTemp}
                    onChange={(e) => setFormTemp(e.target.value)}
                    step="0.1"
                    data-testid="input-log-temp"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pulse-input" className="text-xs text-muted-foreground">
                    Pulse (bpm)
                  </Label>
                  <Input
                    id="pulse-input"
                    type="number"
                    placeholder="72"
                    value={formPulse}
                    onChange={(e) => setFormPulse(e.target.value)}
                    step="1"
                    data-testid="input-log-pulse"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="notes-input" className="text-xs text-muted-foreground">
                  Notes
                </Label>
                <Textarea
                  id="notes-input"
                  placeholder="How are you feeling? Any observations?"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="resize-none"
                  data-testid="textarea-log-notes"
                />
              </div>

              <Button 
                onClick={handleLogData}
                variant="outline" 
                className="w-full" 
                data-testid="button-log-data"
              >
                Log Today's Data
              </Button>
            </div>
          </div>
        </Card>
        )}

        {/* AI Insights Section (only show when active) */}
        {isActive && (
        <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-chart-2/10 border border-primary/20 rounded-lg shadow-sm" data-testid="card-ai-insights">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-primary" data-testid="icon-ai-zap" />
            <h2 className="font-semibold text-foreground" data-testid="heading-ai-insights">
              Your Metabolic Insight
            </h2>
          </div>

          {logs.length === 0 ? (
            <p className="text-muted-foreground text-sm" data-testid="text-ai-insights-empty">
              AI insights will appear once you log data.
            </p>
          ) : aiLoading ? (
            <div className="flex items-center gap-2" data-testid="section-ai-loading">
              <Loader2 className="w-4 h-4 text-primary animate-spin" data-testid="icon-loader-spin" />
              <p className="text-muted-foreground text-sm" data-testid="text-ai-analyzing">
                Analyzing your logs…
              </p>
            </div>
          ) : aiInsights.length > 0 ? (
            <div className="space-y-3" data-testid="section-ai-insights-list">
              {aiInsights.map((insight, idx) => (
                <div key={idx} className="p-3 bg-white/50 dark:bg-slate-900/50 rounded-md border border-primary/10" data-testid={`ai-insight-item-${idx}`}>
                  <p className="text-xs text-muted-foreground mb-2" data-testid={`ai-insight-date-${idx}`}>
                    {new Date(insight.date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-sm text-foreground leading-relaxed" data-testid={`ai-insight-text-${idx}`}>
                    {insight.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm" data-testid="text-ai-generating">
              Generating insights…
            </p>
          )}
        </Card>
        )}

        {/* Suggested Habits Section (only show when active) */}
        {isActive && logs.length > 0 && (
          <Card className="p-6 bg-gradient-to-br from-chart-2/10 via-primary/5 to-primary/10 border border-chart-2/20 rounded-lg shadow-sm" data-testid="card-habits">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-chart-2" data-testid="icon-habit-lightbulb" />
              <h2 className="font-semibold text-foreground" data-testid="heading-habits">
                Suggested Habits
              </h2>
            </div>

            {(() => {
              const suggestions = generateHabitSuggestions(logs);
              return suggestions.length > 0 ? (
                <ul className="space-y-2" data-testid="section-habits-list">
                  {suggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-sm text-foreground flex gap-2" data-testid={`habit-suggestion-${idx}`}>
                      <span className="text-chart-2 font-semibold">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-sm" data-testid="text-habits-none">
                  Keep logging to receive personalized habit suggestions.
                </p>
              );
            })()}
          </Card>
        )}

        {/* Finish Experiment Button (only show when active) */}
        {isActive && (
        <Button 
          onClick={handleFinishExperiment}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          data-testid="button-finish-experiment"
        >
          Finish Experiment
        </Button>
        )}

      </div>
    </div>
  );
}
