import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";

export default function ExperimentDetail() {
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
                Experiment Detail
              </h1>
              <p className="text-muted-foreground mt-1">Track your progress</p>
            </div>
            <Badge data-testid="badge-experiment-status">Active</Badge>
          </div>

          {/* Day Counter and Progress */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground" data-testid="text-day-counter">
              Day 4 of 30
            </p>
            <Progress value={13} data-testid="progress-experiment" />
          </div>
        </div>

        {/* Experiment Status Section */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-experiment-status">
          <h2 className="font-semibold text-foreground mb-3" data-testid="heading-status">
            Experiment Status
          </h2>
          <p className="text-muted-foreground text-sm" data-testid="text-status-placeholder">
            Placeholder: Status information will display here. Started on [date]. Ongoing tracking across all metrics.
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
            <p className="text-muted-foreground text-sm" data-testid="text-logs-placeholder">
              Placeholder: Your logged entries will appear here with timestamps and measurements.
            </p>
            <Button variant="outline" className="w-full" data-testid="button-log-data">
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
