import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Award } from "lucide-react";
import type { ActiveExperiment, ExperimentTemplate } from "@shared/schema";
import { EXPERIMENTS } from "@/data/experiments";

interface LogEntry {
  date: string;
  temp: number | null;
  pulse: number | null;
  notes: string;
}

export default function ExperimentSummary() {
  const [, setLocation] = useLocation();
  const [completedExperiment, setCompletedExperiment] = useState<ActiveExperiment | null>(null);
  const [experimentTemplate, setExperimentTemplate] = useState<ExperimentTemplate | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    // Get experimentId from query params
    const params = new URLSearchParams(window.location.search);
    const experimentId = params.get("experimentId");

    if (!experimentId) {
      setLocation("/experiments");
      return;
    }

    // Find the experiment template
    const template = EXPERIMENTS.find(e => e.id === experimentId);
    setExperimentTemplate(template || null);

    // Load the completed experiment from localStorage
    const experimentsData = localStorage.getItem("lighter_active_experiments");
    if (experimentsData) {
      const experiments: ActiveExperiment[] = JSON.parse(experimentsData);
      const completed = experiments.find(e => e.experimentId === experimentId && e.completed);
      if (completed) {
        setCompletedExperiment(completed);
        // Load logs
        try {
          const experimentLogs = (completed as any).logs || [];
          setLogs(experimentLogs);
        } catch {
          setLogs([]);
        }
      }
    }
  }, [setLocation]);

  if (!experimentTemplate || !completedExperiment) {
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
            Experiment not found.
          </p>
        </div>
      </div>
    );
  }

  const startDate = new Date(completedExperiment.startDate);
  const endDate = completedExperiment.completedAt ? new Date(completedExperiment.completedAt) : new Date();
  const totalDays = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

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

        {/* Completion Banner */}
        <Card className="p-6 bg-gradient-to-br from-primary/20 to-chart-2/20 border border-primary/30 text-center space-y-3" data-testid="card-completion-banner">
          <div className="flex justify-center">
            <Award className="w-12 h-12 text-primary" data-testid="icon-award" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground" data-testid="heading-completion-title">
              Experiment Complete!
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Great work tracking your metabolic patterns
            </p>
          </div>
        </Card>

        {/* Experiment Summary Card */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-chart-2/5 space-y-4" data-testid="card-experiment-summary">
          <div>
            <h2 className="text-xl font-semibold text-foreground" data-testid="heading-experiment-title">
              {experimentTemplate.title}
            </h2>
            <Badge variant="secondary" className="mt-2">
              Completed
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
              <div>
                <p className="text-xs text-muted-foreground" data-testid="label-end-date">End Date</p>
                <p className="text-sm font-semibold text-foreground" data-testid="text-end-date">
                  {endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/50 dark:bg-slate-900/50 rounded-md" data-testid="section-days-tracked">
                <p className="text-xs text-muted-foreground" data-testid="label-days-tracked">Days Tracked</p>
                <p className="text-lg font-bold text-primary mt-1" data-testid="text-days-tracked">
                  {totalDays}
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

        {/* AI Summary Card */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-chart-2/10 border border-primary/20 rounded-lg space-y-3" data-testid="card-ai-summary">
          <h3 className="font-semibold text-foreground" data-testid="heading-ai-summary">
            Experiment Summary
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-ai-summary-placeholder">
            Your experiment is complete. A full AI summary will be available soon.
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-2" data-testid="section-actions">
          <Link href="/experiments">
            <Button 
              variant="default"
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
