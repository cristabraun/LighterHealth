import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Beaker, Clock, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { EXPERIMENTS } from "@/data/experiments";
import type { ActiveExperiment, ExperimentTemplate } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Experiments() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [expandedExperiments, setExpandedExperiments] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<string>("all");
  const [introExpanded, setIntroExpanded] = useState(false);

  const { data: activeExperiments = [], isLoading } = useQuery<ActiveExperiment[]>({
    queryKey: ['/api/experiments'],
  });

  const stopExperimentMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest('DELETE', `/api/experiments/${id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Experiment Stopped",
        description: "You can restart it anytime",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/experiments'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to stop experiment",
        variant: "destructive",
      });
    },
  });

  const toggleExpanded = (id: string) => {
    const newSet = new Set(expandedExperiments);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedExperiments(newSet);
  };

  const filteredExperiments = filter === "all" 
    ? EXPERIMENTS 
    : EXPERIMENTS.filter(e => e.category === filter);

  const activeCount = activeExperiments.filter(e => !e.completed).length;
  const completedExperiments = activeExperiments.filter(e => e.completed);
  const inProgressExperiments = activeExperiments.filter(e => !e.completed);

  if (isLoading) {
    return (
      <div className="min-h-screen pb-20 bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Experiments</h1>
          <p className="text-muted-foreground">
            Discover what makes your body feel lighter
          </p>
        </div>

        <Card className="p-6 space-y-4 frosted-glass-warm" data-testid="card-experiments-intro">
          <h2 className="text-lg font-semibold text-violet-800 dark:text-violet-300" data-testid="heading-how-to-use">How to Use the Experiments Page</h2>
          
          <div className="text-sm text-violet-700 dark:text-violet-300/90 space-y-4">
            <p>
              Before exploring all of the experiments, begin with these three foundations.
              They give you the clearest picture of how your metabolism and nervous system
              are responding day-by-day. Treat them like gentle discovery tools—not strict rules.
            </p>

            {!introExpanded && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIntroExpanded(true)}
                className="text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-200 p-0 h-auto font-medium"
                data-testid="button-read-more"
              >
                Read more <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            )}

            {introExpanded && (
              <>
                <p>
                  <strong>1. Daily Raw Carrot Salad</strong><br />
                  Supports digestion, lowers endotoxin, and helps calm the system.
                </p>

                <p>
                  <strong>2. Temperature Before & After Meals</strong><br />
                  In addition to the morning temperature and pulse you track on the Track page,
                  try checking them before and after eating.<br />
                  — If warmth and pulse rise: your body is converting food into energy well.<br />
                  — If they drop: the meal likely slowed digestion or added stress.
                </p>

                <p>
                  <strong>3. Remove PUFA Oils</strong><br />
                  Reducing polyunsaturated fats helps support cellular energy, hormonal balance,
                  and digestion. Many people feel warmer and more stable as they lower PUFAs.
                </p>

                <p>These three experiments create a strong baseline. Your body will give you insight starting from here.</p>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIntroExpanded(false)}
                  className="text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-200 p-0 h-auto font-medium"
                  data-testid="button-read-less"
                >
                  Read less <ChevronUp className="w-4 h-4 ml-1" />
                </Button>
              </>
            )}
          </div>
        </Card>

        {inProgressExperiments.length > 0 && (
          <div className="space-y-4" data-testid="section-active-experiments">
            <div>
              <h2 className="font-semibold text-lg" data-testid="heading-active-experiments">
                Active Experiments
              </h2>
              <p className="text-sm text-muted-foreground">Your ongoing tracking</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 space-y-3 md:space-y-0">
              {inProgressExperiments.map(active => {
                const experiment = EXPERIMENTS.find(e => e.id === active.experimentId);
                if (!experiment) return null;

                const completedDays = active.currentDay || 0;
                const progress = (completedDays / experiment.duration) * 100;
                const displayDay = completedDays + 1;

                return (
                  <Card
                    key={active.id}
                    className="p-4 space-y-3 frosted-glass-warm"
                    data-testid={`card-active-${active.id}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm" data-testid={`text-active-title-${active.id}`}>
                          {experiment.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1" data-testid={`text-active-day-${active.id}`}>
                          Day {displayDay} of {experiment.duration}
                        </p>
                      </div>
                    </div>

                    <div className="h-1.5 bg-muted rounded-full overflow-hidden" data-testid={`progress-active-${active.id}`}>
                      <div
                        className="h-full bg-gradient-to-r from-primary to-chart-2 transition-all"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>

                    <Button
                      onClick={() => setLocation(`/experiments/${active.experimentId}`)}
                      size="sm"
                      variant="outline"
                      className="w-full"
                      data-testid={`button-active-detail-${active.id}`}
                    >
                      View Progress
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {completedExperiments.length > 0 && (
          <div className="space-y-4" data-testid="section-completed-experiments">
            <div>
              <h2 className="font-semibold text-lg" data-testid="heading-completed-experiments">
                Completed Experiments
              </h2>
              <p className="text-sm text-muted-foreground">Your experiment history</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 space-y-3 md:space-y-0">
              {completedExperiments.map(completed => {
                const experiment = EXPERIMENTS.find(e => e.id === completed.experimentId);
                if (!experiment) return null;

                const logs = completed.logs ? JSON.parse(completed.logs) : [];
                const totalDays = logs.length || completed.currentDay || 0;

                return (
                  <Card
                    key={completed.id}
                    className="p-4 space-y-3 bg-gradient-to-br from-primary/5 to-chart-2/5"
                    data-testid={`card-completed-${completed.id}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm" data-testid={`text-completed-title-${completed.id}`}>
                          {experiment.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1" data-testid={`text-completed-date-${completed.id}`}>
                          Completed on {new Date(completed.completedAt || completed.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1" data-testid={`text-completed-days-${completed.id}`}>
                          {totalDays} day{totalDays !== 1 ? 's' : ''} tracked
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={() => setLocation(`/experiments/summary?experimentId=${completed.experimentId}`)}
                      size="sm"
                      variant="outline"
                      className="w-full"
                      data-testid={`button-completed-summary-${completed.id}`}
                    >
                      View Summary
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        <Tabs defaultValue="library" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library" data-testid="tab-library">
              Library
            </TabsTrigger>
            <TabsTrigger value="active" data-testid="tab-active">
              Active ({activeCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-4 mt-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Badge
                variant={filter === "all" ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setFilter("all")}
                data-testid="filter-all"
              >
                All
              </Badge>
              {["Temperature & Pulse", "Nutrition", "Stress & Nervous System", "Movement", "Hormones & Cycle", "Digestion", "Advanced"].map(cat => (
                <Badge
                  key={cat}
                  variant={filter === cat ? "default" : "outline"}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setFilter(cat)}
                  data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}`}
                >
                  {cat}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4">
              {filteredExperiments.map(experiment => {
                const isFoundational = ["temp-before-after-meals", "raw-carrot-salad", "low-pufa-week"].includes(experiment.id);
                return (
                <Card 
                  key={experiment.id} 
                  className={`p-6 space-y-4 border-l-4 transition-colors ${
                    isFoundational 
                      ? "bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-950/30 dark:to-purple-950/30 border-l-violet-500 hover:border-l-violet-600" 
                      : "border-l-primary/20 hover:border-l-primary"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{experiment.title}</h3>
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs">
                            {experiment.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {experiment.duration} days
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {experiment.why.slice(0, 150)}...
                    </p>
                  </div>

                  <Button
                    onClick={() => setLocation(`/experiments/${experiment.id}`)}
                    variant="outline"
                    className="w-full"
                    data-testid={`button-learn-more-${experiment.id}`}
                  >
                    Learn More
                  </Button>
                </Card>
              );
              })}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-6 mt-6">
            {activeCount === 0 ? (
              <Card className="p-12 text-center space-y-4">
                <Beaker className="w-16 h-16 mx-auto text-muted-foreground/50" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">No Active Experiments</h3>
                  <p className="text-sm text-muted-foreground">
                    Ready to start your first experiment?
                  </p>
                </div>
              </Card>
            ) : (
              <>
                <div className="space-y-2">
                  <h3 className="font-semibold">In Progress</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-4">
                    {inProgressExperiments.map(active => {
                      const experiment = EXPERIMENTS.find(e => e.id === active.experimentId);
                      if (!experiment) return null;

                      const completedDays = active.currentDay || 0;
                      const progress = (completedDays / experiment.duration) * 100;
                      const isExpanded = expandedExperiments.has(active.id);

                      return (
                        <Card key={active.id} className="p-6 space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">{experiment.title}</h3>
                                <Badge variant="secondary" className="mt-2">
                                  Day {completedDays + 1} of {experiment.duration}
                                </Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleExpanded(active.id)}
                                data-testid={`button-toggle-${active.id}`}
                              >
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5" />
                                ) : (
                                  <ChevronDown className="w-5 h-5" />
                                )}
                              </Button>
                            </div>

                            <Progress value={progress} className="h-2" />
                          </div>

                          {isExpanded && (
                            <div className="space-y-4 pt-4 border-t">
                              <div className="flex gap-2 pt-4 flex-wrap">
                                <Button
                                  onClick={() => setLocation(`/experiments/${active.experimentId}`)}
                                  variant="outline"
                                  className="flex-1"
                                  data-testid={`button-view-progress-${active.id}`}
                                >
                                  View Progress
                                </Button>
                                <Button
                                  onClick={() => stopExperimentMutation.mutate(active.id)}
                                  disabled={stopExperimentMutation.isPending}
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                  data-testid={`button-stop-${active.id}`}
                                >
                                  {stopExperimentMutation.isPending ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    "Stop"
                                  )}
                                </Button>
                              </div>
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
