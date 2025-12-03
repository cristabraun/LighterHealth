import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Beaker, Clock, ChevronDown, ChevronUp, CheckCircle2, XCircle } from "lucide-react";
import { EXPERIMENTS } from "@/data/experiments";
import type { ActiveExperiment, ExperimentTemplate, DailyMeasurements } from "@shared/schema";

export default function Experiments() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [activeExperiments, setActiveExperiments] = useState<ActiveExperiment[]>([]);
  const [selectedExperiment, setSelectedExperiment] = useState<ExperimentTemplate | null>(null);
  const [expandedExperiments, setExpandedExperiments] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const experiments = localStorage.getItem("lighter_active_experiments");
    if (experiments) {
      setActiveExperiments(JSON.parse(experiments));
    }
  }, []);

  const handleStartExperiment = (experimentId: string) => {
    const alreadyActive = activeExperiments.find(
      e => e.experimentId === experimentId && !e.completed
    );

    if (alreadyActive) {
      toast({
        title: "Already Active",
        description: "You're already running this experiment!",
        variant: "destructive",
      });
      return;
    }

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
    };

    const updated = [...activeExperiments, newExperiment];
    setActiveExperiments(updated);
    localStorage.setItem("lighter_active_experiments", JSON.stringify(updated));

    window.dispatchEvent(new CustomEvent('lighterDataUpdate', { detail: { type: 'experiment' } }));

    toast({
      title: "Experiment Started!",
      description: "Track your progress daily and see what makes you feel lighter",
    });

    setSelectedExperiment(null);
    setLocation("/experiments/detail");
  };

  const handleCompleteExperiment = (id: string) => {
    const updated = activeExperiments.map(e =>
      e.id === id ? { ...e, completed: true } : e
    );
    setActiveExperiments(updated);
    localStorage.setItem("lighter_active_experiments", JSON.stringify(updated));

    window.dispatchEvent(new CustomEvent('lighterDataUpdate', { detail: { type: 'experiment' } }));

    toast({
      title: "Experiment Completed!",
      description: "Great work! Check your progress to see the results",
    });
  };

  const handleStopExperiment = (id: string) => {
    const updated = activeExperiments.filter(e => e.id !== id);
    setActiveExperiments(updated);
    localStorage.setItem("lighter_active_experiments", JSON.stringify(updated));

    toast({
      title: "Experiment Stopped",
      description: "You can restart it anytime",
    });
  };

  const handleChecklistToggle = (experimentId: string, item: string) => {
    const updated = activeExperiments.map(e => {
      if (e.id === experimentId) {
        const checklist = e.checklist || [];
        const newChecklist = checklist.includes(item)
          ? checklist.filter(i => i !== item)
          : [...checklist, item];
        return { ...e, checklist: newChecklist };
      }
      return e;
    });
    setActiveExperiments(updated);
    localStorage.setItem("lighter_active_experiments", JSON.stringify(updated));
  };

  const handleMeasurementChange = (experimentId: string, inputId: string, value: string) => {
    const updated = activeExperiments.map(e => {
      if (e.id === experimentId) {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) return e;

        const measurements: DailyMeasurements = e.measurements ? JSON.parse(e.measurements) : {};
        const currentDay = e.currentDay.toString();
        
        if (!measurements[currentDay]) {
          measurements[currentDay] = {};
        }
        
        const experiment = EXPERIMENTS.find(exp => exp.id === e.experimentId);
        const input = experiment?.inputs?.find(inp => inp.id === inputId);
        
        measurements[currentDay][inputId] = {
          value: numValue,
          unit: input?.unit || "",
          timestamp: new Date().toISOString()
        };
        
        return { ...e, measurements: JSON.stringify(measurements) };
      }
      return e;
    });
    setActiveExperiments(updated);
    localStorage.setItem("lighter_active_experiments", JSON.stringify(updated));
  };

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

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Experiments</h1>
          <p className="text-muted-foreground">
            Discover what makes your body feel lighter
          </p>
        </div>

        <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-experiments-intro">
          <h2 className="text-lg font-semibold" data-testid="heading-how-to-use">How to Use the Experiments Page</h2>
        </Card>

        {/* Active Experiments Section - 2-column grid on desktop */}
        {activeExperiments.filter(e => !e.completed).length > 0 && (
          <div className="space-y-4" data-testid="section-active-experiments">
            <div>
              <h2 className="font-semibold text-lg" data-testid="heading-active-experiments">
                Active Experiments
              </h2>
              <p className="text-sm text-muted-foreground">Your ongoing tracking</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 space-y-3 md:space-y-0">
              {activeExperiments
                .filter(e => !e.completed)
                .map(active => {
                  const experiment = EXPERIMENTS.find(e => e.id === active.experimentId);
                  if (!experiment) return null;

                  const startDate = new Date(active.startDate);
                  const today = new Date();
                  const daysPassed = Math.floor(
                    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
                  ) + 1;
                  const currentDay = Math.max(1, daysPassed);
                  const progress = (currentDay / experiment.duration) * 100;

                  return (
                    <Card
                      key={active.id}
                      className="p-4 space-y-3 bg-gradient-to-br from-primary/5 to-chart-2/5"
                      data-testid={`card-active-${active.id}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm" data-testid={`text-active-title-${active.id}`}>
                            {experiment.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1" data-testid={`text-active-day-${active.id}`}>
                            Day {currentDay} of {experiment.duration}
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

        {/* Completed Experiments Section - 2-column grid on desktop */}
        {activeExperiments.filter(e => e.completed).length > 0 && (
          <div className="space-y-4" data-testid="section-completed-experiments">
            <div>
              <h2 className="font-semibold text-lg" data-testid="heading-completed-experiments">
                Completed Experiments
              </h2>
              <p className="text-sm text-muted-foreground">Your experiment history</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 space-y-3 md:space-y-0">
              {activeExperiments
                .filter(e => e.completed)
                .map(completed => {
                  const experiment = EXPERIMENTS.find(e => e.id === completed.experimentId);
                  if (!experiment) return null;

                  const startDate = new Date(completed.startDate);
                  const completedDate = new Date();
                  const totalDays = Math.floor(
                    (completedDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
                  ) + 1;

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
                            Completed on {completedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1" data-testid={`text-completed-days-${completed.id}`}>
                            {totalDays} day{totalDays !== 1 ? 's' : ''} tracked
                          </p>
                        </div>
                      </div>

                      <Button
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

            {/* Experiment Library Cards - 2-column grid on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4">
              {filteredExperiments.map(experiment => (
                <Card 
                  key={experiment.id} 
                  className="p-6 space-y-4 border-l-4 border-l-primary/20 hover:border-l-primary transition-colors"
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
              ))}
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
                  {/* Active experiments in tabs - 2-column grid on desktop */}
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-4">
                    {activeExperiments
                      .filter(e => !e.completed)
                      .map(active => {
                    const experiment = EXPERIMENTS.find(e => e.id === active.experimentId);
                    if (!experiment) return null;

                    const progress = (active.currentDay / experiment.duration) * 100;
                    const isExpanded = expandedExperiments.has(active.id);

                    return (
                      <Card key={active.id} className="p-6 space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{experiment.title}</h3>
                              <Badge variant="secondary" className="mt-2">
                                Day {active.currentDay} of {experiment.duration}
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
                            {experiment.inputs && experiment.inputs.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="font-medium text-sm">Today's Measurements</h4>
                                <div className="grid grid-cols-2 gap-3">
                                  {experiment.inputs.map((input) => {
                                    const measurements: DailyMeasurements = active.measurements 
                                      ? JSON.parse(active.measurements) 
                                      : {};
                                    const currentDayMeasurements = measurements[active.currentDay.toString()];
                                    const currentValue = currentDayMeasurements?.[input.id]?.value || "";

                                    return (
                                      <div key={input.id} className="space-y-1.5">
                                        <Label htmlFor={`${active.id}-${input.id}`} className="text-xs text-muted-foreground">
                                          {input.label}
                                        </Label>
                                        <div className="relative">
                                          <Input
                                            id={`${active.id}-${input.id}`}
                                            type={input.type}
                                            placeholder="0"
                                            value={currentValue}
                                            onChange={(e) => handleMeasurementChange(active.id, input.id, e.target.value)}
                                            min={input.min}
                                            max={input.max}
                                            step={input.step}
                                            className="pr-12"
                                            data-testid={`input-${active.id}-${input.id}`}
                                          />
                                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                                            {input.unit}
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            <div className="space-y-3">
                              <h4 className="font-medium text-sm">Today's Checklist</h4>
                              {experiment.dailyChecklist.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover-elevate">
                                  <Checkbox
                                    id={`${active.id}-${idx}`}
                                    checked={active.checklist?.includes(item)}
                                    onCheckedChange={() => handleChecklistToggle(active.id, item)}
                                    data-testid={`checkbox-${active.id}-${idx}`}
                                  />
                                  <Label
                                    htmlFor={`${active.id}-${idx}`}
                                    className="text-sm font-normal cursor-pointer flex-1"
                                  >
                                    {item}
                                  </Label>
                                </div>
                              ))}
                            </div>

                            <div className="flex gap-3">
                              <Button
                                onClick={() => handleCompleteExperiment(active.id)}
                                variant="default"
                                className="flex-1 bg-gradient-to-r from-primary to-chart-2"
                                data-testid={`button-complete-${active.id}`}
                              >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Complete
                              </Button>
                              <Button
                                onClick={() => handleStopExperiment(active.id)}
                                variant="outline"
                                className="flex-1"
                                data-testid={`button-stop-${active.id}`}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Stop
                              </Button>
                            </div>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                  </div>
                </div>

                {activeExperiments.filter(e => e.completed).length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold">Completed</h3>
                    {/* Completed experiments in tabs - 2-column grid on desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-4">
                      {activeExperiments
                        .filter(e => e.completed)
                        .map(completed => {
                          const experiment = EXPERIMENTS.find(e => e.id === completed.experimentId);
                          if (!experiment) return null;

                          return (
                            <Card key={completed.id} className="p-6 space-y-4 bg-muted/30">
                              <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                <div>
                                  <h3 className="font-semibold">{experiment.title}</h3>
                                  <p className="text-xs text-muted-foreground">
                                    Completed {experiment.duration} days
                                  </p>
                                </div>
                              </div>
                            </Card>
                          );
                        })}
                    </div>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>

        {/* Experiment Detail Dialog */}
        <Dialog open={!!selectedExperiment} onOpenChange={() => setSelectedExperiment(null)}>
          <DialogContent className="max-w-lg">
            {selectedExperiment && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedExperiment.title}</DialogTitle>
                  <DialogDescription>
                    {selectedExperiment.duration} day experiment
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Why This Works</h4>
                    <p className="text-sm text-muted-foreground">{selectedExperiment.why}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">How To Do It</h4>
                    <p className="text-sm text-muted-foreground">{selectedExperiment.how}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Daily Checklist</h4>
                    <ul className="space-y-1">
                      {selectedExperiment.dailyChecklist.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={() => handleStartExperiment(selectedExperiment.id)}
                    className="w-full bg-gradient-to-r from-primary to-chart-2"
                  >
                    Start Experiment
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
