import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Zap, Lightbulb, Clock } from "lucide-react";
import type { ActiveExperiment, ExperimentTemplate, ExperimentLogEntry } from "@shared/schema";
import { EXPERIMENTS } from "@/data/experiments";
import { generateAIInsight } from "@/lib/ai";
import { apiRequest, queryClient } from "@/lib/queryClient";

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

function generateHabitSuggestions(logs: LogEntry[]): string[] {
  const suggestions: string[] = [];

  if (logs.length === 0) return suggestions;

  const temps = logs.filter(log => log.temp !== null).map(log => log.temp as number);
  if (temps.length > 0) {
    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
    if (avgTemp < 97.4) {
      suggestions.push("Try increasing morning carbs or adding a warm beverage to support your metabolism.");
    }
  }

  const pulses = logs.filter(log => log.pulse !== null).map(log => log.pulse as number);
  if (pulses.length > 0) {
    const avgPulse = pulses.reduce((a, b) => a + b, 0) / pulses.length;
    if (avgPulse > 90) {
      suggestions.push("Consider adding more sodium or evaluating stress triggers throughout your day.");
    }
  }

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
  const { toast } = useToast();
  
  const [formTemp, setFormTemp] = useState<string>("");
  const [temperatureUnit, setTemperatureUnit] = useState<"F" | "C">("F");
  const [formPulse, setFormPulse] = useState<string>("");
  const [formNotes, setFormNotes] = useState<string>("");
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [insightFetched, setInsightFetched] = useState<boolean>(false);

  const experimentTemplate = EXPERIMENTS.find(e => e.id === experimentId);

  const { data: currentExperiment, isLoading: experimentLoading, refetch: refetchExperiment } = useQuery<ActiveExperiment | null>({
    queryKey: ['/api/experiments/by-template', experimentId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/experiments/by-template/${experimentId}`, {
          credentials: 'include'
        });
        if (response.status === 404) {
          return null;
        }
        if (!response.ok) {
          throw new Error('Failed to fetch experiment');
        }
        return response.json();
      } catch {
        return null;
      }
    },
  });

  const logs: LogEntry[] = currentExperiment?.logs ? JSON.parse(currentExperiment.logs) : [];

  const startExperimentMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/experiments', {
        experimentId,
        startDate: new Date().toISOString().split('T')[0],
        currentDay: 0,
        completed: false,
        notes: [],
        checklist: [],
        measurements: '{}',
        logs: '[]',
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Experiment Started!",
        description: "Track your progress daily and see what makes you feel lighter",
      });
      refetchExperiment();
      queryClient.invalidateQueries({ queryKey: ['/api/experiments'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to start experiment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addLogMutation = useMutation({
    mutationFn: async (logData: { date: string; temp: number | null; pulse: number | null; notes: string }) => {
      const response = await apiRequest('POST', `/api/experiments/${experimentId}/log`, logData);
      return response.json();
    },
    onSuccess: (updatedExperiment) => {
      toast({
        title: "Data Logged!",
        description: `Day ${updatedExperiment.currentDay} of ${experimentTemplate?.duration || 30} completed`,
      });
      refetchExperiment();
      queryClient.invalidateQueries({ queryKey: ['/api/experiments'] });
      setFormTemp("");
      setFormPulse("");
      setFormNotes("");
      setInsightFetched(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to log data. Please try again.",
        variant: "destructive",
      });
    },
  });

  const completeExperimentMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', `/api/experiments/${experimentId}/complete`, {});
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Experiment Completed!",
        description: "Great work! Check your progress to see the results",
      });
      setLocation(`/experiments/summary?experimentId=${experimentId}`);
      queryClient.invalidateQueries({ queryKey: ['/api/experiments'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to complete experiment. Please try again.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (logs.length > 0 && experimentTemplate && currentExperiment && !insightFetched) {
      const fetchInsight = async () => {
        setAiLoading(true);
        setInsightFetched(true);
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
          ...prev.slice(0, 4)
        ]);
        setAiLoading(false);
      };
      fetchInsight();
    }
  }, [logs.length, experimentTemplate, currentExperiment?.id, insightFetched]);

  const isTempPulseExperiment = experimentId === "morning-vs-afternoon-temp" || experimentId === "temp-before-after-meals";

  const handleLogData = () => {
    if (!currentExperiment) return;

    let tempNum: number | null = null;
    if (isTempPulseExperiment && formTemp) {
      const parsedTemp = parseFloat(formTemp);
      tempNum = temperatureUnit === "C" ? (parsedTemp * 9/5) + 32 : parsedTemp;
    }

    addLogMutation.mutate({
      date: new Date().toISOString(),
      temp: tempNum,
      pulse: isTempPulseExperiment && formPulse ? parseFloat(formPulse) : null,
      notes: formNotes,
    });
  };

  const handleStartExperiment = () => {
    startExperimentMutation.mutate();
  };

  const handleFinishExperiment = () => {
    completeExperimentMutation.mutate();
  };

  if (!experimentTemplate) {
    return (
      <div className="min-h-screen pb-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-6">
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

  if (experimentLoading) {
    return (
      <div className="min-h-screen pb-20 bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Calculate day based on startDate using UTC to avoid timezone issues
  const duration = experimentTemplate.duration;
  const calculateDayFromStart = () => {
    if (!currentExperiment?.startDate) return 1;
    const [year, month, day] = currentExperiment.startDate.split('-').map(Number);
    const startDateUTC = Date.UTC(year, month - 1, day);
    const todayUTC = Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate());
    const daysSinceStart = Math.floor((todayUTC - startDateUTC) / (1000 * 60 * 60 * 24));
    return Math.max(1, daysSinceStart + 1);
  };
  const displayDay = currentExperiment ? Math.min(calculateDayFromStart(), duration) : 1;
  const progress = (displayDay / duration) * 100;
  const isActive = currentExperiment && !currentExperiment.completed;

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-6">
        
        <Link href="/experiments">
          <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-experiments">
            <ArrowLeft className="w-4 h-4" />
            Back to Experiments
          </Button>
        </Link>

        <Card className="p-6 frosted-glass-warm space-y-4" data-testid="card-experiment-overview">
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

        <Card className="p-6 frosted-glass-warm" data-testid="card-recipe">
          <h2 className="font-semibold text-foreground mb-3" data-testid="heading-recipe">
            How to Do This
          </h2>
          <ul className="space-y-2" data-testid="list-recipe-steps">
            {experimentTemplate.how.map((step, idx) => (
              <li key={idx} className="text-sm text-foreground flex gap-3" data-testid={`recipe-step-${idx}`}>
                <span className="text-primary font-semibold flex-shrink-0">{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </Card>

        {!currentExperiment && (
          <Button 
            onClick={handleStartExperiment}
            disabled={startExperimentMutation.isPending}
            className="w-full bg-gradient-to-r from-primary to-chart-2 text-primary-foreground text-base font-semibold py-3"
            data-testid="button-start-experiment"
          >
            {startExperimentMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Starting...
              </>
            ) : (
              "Start Experiment"
            )}
          </Button>
        )}

        {isActive && (
        <Card className="p-6 frosted-glass-warm space-y-4" data-testid="card-experiment-header">
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

          <div className="space-y-3 pt-2">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-semibold text-foreground" data-testid="text-day-counter">
                Day {displayDay} of {duration}
              </p>
              <span className="text-xs text-muted-foreground" data-testid="text-progress-percentage">
                {completedDays} day{completedDays !== 1 ? 's' : ''} logged
              </span>
            </div>
            <Progress value={Math.min(progress, 100)} data-testid="progress-experiment" />
          </div>
        </Card>
        )}

        {isActive && (
        <Card className="p-6 frosted-glass-warm" data-testid="card-logs">
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground" data-testid="heading-logs">
              Logs ({logs.length} entries)
            </h2>
            
            {logs.length === 0 ? (
              <p className="text-muted-foreground text-sm" data-testid="text-logs-empty">
                No logs yet. Click the button below to log your first entry.
              </p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto" data-testid="logs-list">
                {[...logs].reverse().slice(0, 5).map((log, idx) => (
                  <div key={idx} className="p-3 bg-muted/50 rounded-lg" data-testid={`log-entry-${idx}`}>
                    <p className="text-xs text-muted-foreground" data-testid={`log-date-${idx}`}>
                      {new Date(log.date).toLocaleString()}
                    </p>
                    {isTempPulseExperiment && (log.temp || log.pulse) && (
                      <p className="text-sm text-foreground mt-1" data-testid={`log-vitals-${idx}`}>
                        {log.temp ? `Temp: ${log.temp.toFixed(1)}°F` : ''} 
                        {log.temp && log.pulse ? ' | ' : ''}
                        {log.pulse ? `Pulse: ${log.pulse} bpm` : ''}
                      </p>
                    )}
                    {log.notes && (
                      <p className="text-sm text-muted-foreground mt-1" data-testid={`log-notes-text-${idx}`}>
                        {log.notes}
                      </p>
                    )}
                  </div>
                ))}
                {logs.length > 5 && (
                  <p className="text-xs text-muted-foreground text-center">
                    + {logs.length - 5} more entries
                  </p>
                )}
              </div>
            )}

            <div className="space-y-3 pt-4 border-t" data-testid="section-log-form">
              {isTempPulseExperiment && (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between mb-1">
                      <Label htmlFor="temp-input" className="text-xs text-muted-foreground">
                        Temperature
                      </Label>
                      <div className="flex gap-1">
                        <Button
                          type="button"
                          size="sm"
                          variant={temperatureUnit === "F" ? "default" : "outline"}
                          onClick={() => setTemperatureUnit("F")}
                          className="h-6 px-1.5 text-xs"
                          data-testid="button-exp-temp-fahrenheit"
                        >
                          °F
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant={temperatureUnit === "C" ? "default" : "outline"}
                          onClick={() => setTemperatureUnit("C")}
                          className="h-6 px-1.5 text-xs"
                          data-testid="button-exp-temp-celsius"
                        >
                          °C
                        </Button>
                      </div>
                    </div>
                    <Input
                      id="temp-input"
                      type="number"
                      placeholder={temperatureUnit === "F" ? "98.6" : "37"}
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
              )}

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
                disabled={addLogMutation.isPending}
                className="w-full bg-gradient-to-r from-primary to-chart-2 text-primary-foreground font-semibold" 
                data-testid="button-log-data"
              >
                {addLogMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Logging...
                  </>
                ) : (
                  "Log Today's Data"
                )}
              </Button>
            </div>
          </div>
        </Card>
        )}

        {isActive && (
        <Card className="p-6 frosted-glass-warm" data-testid="card-ai-insights">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-primary" data-testid="icon-ai-zap" />
            <h2 className="font-semibold text-foreground" data-testid="heading-ai-insights">
              Your Metabolic Insight
            </h2>
          </div>

          {logs.length === 0 ? (
            <p className="text-muted-foreground text-sm" data-testid="text-ai-insights-empty">
              Log your first entry to receive personalized metabolic insights.
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
            <p className="text-muted-foreground text-sm" data-testid="text-ai-waiting">
              Add more logs to receive metabolic insights based on your patterns.
            </p>
          )}
        </Card>
        )}

        {isActive && logs.length > 0 && (
          <Card className="p-6 frosted-glass-warm" data-testid="card-habits">
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


      </div>
    </div>
  );
}
