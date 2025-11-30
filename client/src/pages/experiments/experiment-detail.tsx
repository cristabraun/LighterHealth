import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import type { ActiveExperiment } from "@shared/schema";
import { EXPERIMENTS } from "@/data/experiments";

interface LogEntry {
  date: string;
  temp: number | null;
  pulse: number | null;
  notes: string;
}

export default function ExperimentDetail() {
  const [currentExperiment, setCurrentExperiment] = useState<ActiveExperiment | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    // Load the most recent active experiment from localStorage
    const experimentsData = localStorage.getItem("lighter_active_experiments");
    if (experimentsData) {
      const experiments: ActiveExperiment[] = JSON.parse(experimentsData);
      const active = experiments.find(e => !e.completed);
      if (active) {
        setCurrentExperiment(active);
        // Try to load logs from the experiment
        try {
          const experimentLogs = (active as any).logs || [];
          setLogs(experimentLogs);
        } catch {
          setLogs([]);
        }
      }
    }
  }, []);

  const handleLogData = () => {
    if (!currentExperiment) return;

    const newLog: LogEntry = {
      date: new Date().toISOString(),
      temp: null,
      pulse: null,
      notes: "",
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
  };

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
          <p className="text-muted-foreground" data-testid="text-no-experiment">
            No active experiment found. Start an experiment to get started.
          </p>
        </div>
      </div>
    );
  }

  const experiment = EXPERIMENTS.find(e => e.id === currentExperiment.experimentId);
  if (!experiment) {
    return (
      <div className="min-h-screen pb-24 bg-gradient-to-b from-background via-background to-primary/5">
        <div className="max-w-md mx-auto p-6 space-y-6">
          <Link href="/experiments">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-experiments">
              <ArrowLeft className="w-4 h-4" />
              Back to Experiments
            </Button>
          </Link>
          <p className="text-muted-foreground">Experiment not found.</p>
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
  const progress = (currentDay / experiment.duration) * 100;

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

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold" data-testid="heading-experiment-title">
                {experiment.title}
              </h1>
              <p className="text-muted-foreground mt-1">Track your progress</p>
            </div>
            <Badge data-testid="badge-experiment-status">Active</Badge>
          </div>

          {/* Day Counter and Progress */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground" data-testid="text-day-counter">
              Day {currentDay} of {experiment.duration}
            </p>
            <Progress value={Math.min(progress, 100)} data-testid="progress-experiment" />
          </div>
        </div>

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
                  </div>
                ))}
              </div>
            )}
            
            <Button 
              onClick={handleLogData}
              variant="outline" 
              className="w-full" 
              data-testid="button-log-data"
            >
              Log Today's Data
            </Button>
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

      </div>
    </div>
  );
}
