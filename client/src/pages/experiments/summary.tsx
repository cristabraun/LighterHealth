import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Award, Loader2 } from "lucide-react";
import type { ActiveExperiment, ExperimentTemplate } from "@shared/schema";
import { EXPERIMENTS } from "@/data/experiments";

interface LogEntry {
  date: string;
  temp: number | null;
  pulse: number | null;
  notes: string;
}

export default function ExperimentSummary() {
  // Get experimentId from query params (this is the template ID like "temp-before-after-meals")
  const params = new URLSearchParams(window.location.search);
  const experimentId = params.get("experimentId");

  // Fetch all experiments from the API
  const { data: experiments = [], isLoading } = useQuery<ActiveExperiment[]>({
    queryKey: ['/api/experiments'],
  });

  // Find the experiment template
  const experimentTemplate = experimentId ? EXPERIMENTS.find(e => e.id === experimentId) : null;

  // Find the matching experiment from the database (could be active or completed)
  const completedExperiment = experiments.find(e => e.experimentId === experimentId);

  // Parse logs from the experiment
  const logs: LogEntry[] = completedExperiment?.logs ? 
    (typeof completedExperiment.logs === 'string' ? JSON.parse(completedExperiment.logs) : completedExperiment.logs) : 
    [];

  if (isLoading) {
    return (
      <div className="min-h-screen pb-24 bg-gradient-to-b from-background via-background to-primary/5 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!experimentId || !experimentTemplate || !completedExperiment) {
    return (
      <div className="min-h-screen pb-24 bg-gradient-to-b from-background via-background to-primary/5">
        <div className="max-w-md mx-auto p-6 space-y-6">
          <Link href="/experiments">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-experiments">
              <ArrowLeft className="w-4 h-4" />
              Back to Experiments
            </Button>
          </Link>
          <p className="text-muted-foreground" data-testid="text-summary-not-found">
            Experiment not found. The experiment may not exist or may have been deleted.
          </p>
        </div>
      </div>
    );
  }

  const startDate = new Date(completedExperiment.startDate);
  const endDate = completedExperiment.completedAt ? new Date(completedExperiment.completedAt) : new Date();
  const totalDays = Math.max(1, Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1);

  const isCompleted = completedExperiment.completed;

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-background via-background to-primary/5">
      <div className="max-w-md mx-auto p-6 space-y-6">
        
        <Link href="/experiments">
          <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-experiments">
            <ArrowLeft className="w-4 h-4" />
            Back to Experiments
          </Button>
        </Link>

        <Card className="p-6 bg-gradient-to-br from-primary/20 to-chart-2/20 border border-primary/30 text-center space-y-3" data-testid="card-completion-banner">
          <div className="flex justify-center">
            <Award className="w-12 h-12 text-primary" data-testid="icon-award" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground" data-testid="heading-completion-title">
              {isCompleted ? "Experiment Complete!" : "Experiment Summary"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isCompleted ? "Great work tracking your metabolic patterns" : "View your experiment progress"}
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/5 to-chart-2/5 space-y-4" data-testid="card-experiment-summary">
          <div>
            <h2 className="text-xl font-semibold text-foreground" data-testid="heading-experiment-title">
              {experimentTemplate.title}
            </h2>
            <Badge variant={isCompleted ? "secondary" : "default"} className="mt-2">
              {isCompleted ? "Completed" : "Active"}
            </Badge>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <div className="flex justify-between" data-testid="section-dates">
              <div>
                <p className="text-xs text-muted-foreground" data-testid="label-start-date">Start Date</p>
                <p className="text-sm font-semibold text-foreground" data-testid="text-start-date">
                  {startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
              {isCompleted && (
                <div>
                  <p className="text-xs text-muted-foreground" data-testid="label-end-date">End Date</p>
                  <p className="text-sm font-semibold text-foreground" data-testid="text-end-date">
                    {endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/50 dark:bg-slate-900/50 rounded-md" data-testid="section-days-tracked">
                <p className="text-xs text-muted-foreground" data-testid="label-days-tracked">Days Tracked</p>
                <p className="text-lg font-bold text-primary mt-1" data-testid="text-days-tracked">
                  {completedExperiment.currentDay || logs.length || 1}
                </p>
              </div>
              <div className="p-3 bg-white/50 dark:bg-slate-900/50 rounded-md" data-testid="section-log-count">
                <p className="text-xs text-muted-foreground" data-testid="label-log-count">Logs Recorded</p>
                <p className="text-lg font-bold text-primary mt-1" data-testid="text-log-count">
                  {logs.length}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {logs.length > 0 && (
          <Card className="p-6 space-y-4" data-testid="card-logs-history">
            <h3 className="font-semibold text-foreground" data-testid="heading-logs">
              Log History
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {[...logs].reverse().map((log, idx) => (
                <div key={idx} className="p-3 bg-muted/50 rounded-lg" data-testid={`log-entry-${idx}`}>
                  <p className="text-xs text-muted-foreground">
                    {new Date(log.date).toLocaleString()}
                  </p>
                  {(log.temp || log.pulse) && (
                    <p className="text-sm text-foreground mt-1">
                      {log.temp ? `Temp: ${log.temp.toFixed(1)}°F` : ''} 
                      {log.temp && log.pulse ? ' | ' : ''}
                      {log.pulse ? `Pulse: ${log.pulse} bpm` : ''}
                    </p>
                  )}
                  {log.notes && (
                    <p className="text-sm text-muted-foreground mt-1">{log.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-chart-2/10 border border-primary/20 rounded-lg space-y-3" data-testid="card-ai-summary">
          <h3 className="font-semibold text-foreground" data-testid="heading-ai-summary">
            Experiment Insights
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-ai-summary-placeholder">
            {isCompleted 
              ? "Your experiment is complete. A full AI summary will be available soon."
              : "Continue logging daily to receive personalized insights when your experiment is complete."}
          </p>
        </Card>

        <div className="space-y-2" data-testid="section-actions">
          {!isCompleted && (
            <Link href={`/experiments/${experimentId}`}>
              <Button 
                variant="default"
                className="w-full"
                data-testid="button-continue-experiment"
              >
                Continue Experiment
              </Button>
            </Link>
          )}
          <Link href="/experiments">
            <Button 
              variant={isCompleted ? "default" : "outline"}
              className="w-full"
              data-testid="button-back-to-list"
            >
              Back to Experiments
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button 
              variant="outline"
              className="w-full"
              data-testid="button-go-to-dashboard"
            >
              View Dashboard
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
