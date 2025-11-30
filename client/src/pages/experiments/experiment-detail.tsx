import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import type { ActiveExperiment, ExperimentTemplate } from "@shared/schema";
import { EXPERIMENTS } from "@/data/experiments";

interface LogEntry {
  date: string;
  temp: number | null;
  pulse: number | null;
  notes: string;
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

    // Navigate back to experiments page
    setLocation("/experiments");
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

  if (!currentExperiment) {
    return (
      <div className="min-h-screen pb-24 bg-gradient-to-b from-background via-background to-primary/5">
        <div className="max-w-md mx-auto p-6 space-y-6">
          <Link href="/experiments">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-experiments">
              <ArrowLeft className="w-4 h-4" />
              Back to Experiments
            </Button>
          </Link>
          <p className="text-muted-foreground" data-testid="text-no-active-experiment">
            No active experiment. Start this experiment to begin tracking.
          </p>
        </div>
      </div>
    );
  }

  const startDate = new Date(currentExperiment.startDate);
  const today = new Date();
  const daysPassed = Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;
  const currentDay = Math.max(1, daysPassed);
  const progress = (currentDay / experimentTemplate.duration) * 100;

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

        {/* Header Container */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-chart-2/5 space-y-4" data-testid="card-experiment-header">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h1 className="text-3xl font-bold" data-testid="heading-experiment-title">
                {experimentTemplate.title}
              </h1>
              <p className="text-sm text-muted-foreground mt-2" data-testid="text-started-date">
                Started: {startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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

        {/* Experiment Status Section */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-experiment-status">
          <h2 className="font-semibold text-foreground mb-3" data-testid="heading-status">
            Experiment Status
          </h2>
          <p className="text-muted-foreground text-sm" data-testid="text-status-placeholder">
            Started on {new Date(currentExperiment.startDate).toLocaleDateString()}. Ongoing tracking across all metrics.
          </p>
        </Card>

        {/* Daily Tasks Section */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-daily-tasks">
          <h2 className="font-semibold text-foreground mb-3" data-testid="heading-daily-tasks">
            Daily Tasks
          </h2>
          <p className="text-muted-foreground text-sm" data-testid="text-daily-tasks-placeholder">
            Placeholder: Daily tasks and checklist items will appear here. Check off completed actions as you go.
          </p>
        </Card>

        {/* Logs Section */}
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

        {/* AI Insights Section */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-ai-insights">
          <h2 className="font-semibold text-foreground mb-3" data-testid="heading-ai-insights">
            AI Insights
          </h2>
          <p className="text-muted-foreground text-sm" data-testid="text-ai-insights-placeholder">
            Placeholder: AI-powered insights and analysis of your experiment progress will appear here as you log data.
          </p>
        </Card>

        {/* Finish Experiment Button */}
        <Button 
          onClick={handleFinishExperiment}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          data-testid="button-finish-experiment"
        >
          Finish Experiment
        </Button>

      </div>
    </div>
  );
}
