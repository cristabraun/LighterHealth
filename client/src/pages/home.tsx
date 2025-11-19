import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { 
  Thermometer, 
  Heart, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Sparkles,
  Clock,
  AlertCircle,
  MessageCircle,
  Utensils
} from "lucide-react";
import type { DailyLog, ActiveExperiment, FoodLog } from "@shared/schema";
import { EXPERIMENTS } from "@/data/experiments";
import confetti from "canvas-confetti";

export default function Home() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<string[]>([]);

  // Fetch daily logs
  const { data: logs = [] } = useQuery<DailyLog[]>({
    queryKey: ["/api/logs"],
  });

  // Fetch active experiments
  const { data: activeExperiments = [] } = useQuery<ActiveExperiment[]>({
    queryKey: ["/api/experiments"],
  });

  // Get today's log and recent logs
  const today = new Date().toISOString().split('T')[0];
  const todayLog = logs.find(log => log.date === today);
  const recentLogs = logs.slice(0, 7);

  // Fetch today's food logs
  const { data: foodLogs = [] } = useQuery<FoodLog[]>({
    queryKey: [`/api/food-logs?date=${today}`],
  });

  // Generate recommendations
  useEffect(() => {
    if (recentLogs.length < 3) return;

    const avgTemp = recentLogs.reduce((sum, log) => sum + log.temperature, 0) / recentLogs.length;
    const avgPulse = recentLogs.reduce((sum, log) => sum + log.pulse, 0) / recentLogs.length;
    const avgEnergy = recentLogs.reduce((sum, log) => sum + log.energy, 0) / recentLogs.length;
    const poorSleep = recentLogs.filter(log => log.sleep < 6).length > recentLogs.length / 2;

    const recs: string[] = [];

    if (avgTemp < 97.5) {
      recs.push("orange-juice", "carbs-at-dinner");
    }

    if (avgPulse > 90 && avgTemp < 98) {
      recs.push("reduce-cardio", "morning-salt-oj");
    }

    if (poorSleep) {
      recs.push("magnesium-glycinate", "carbs-at-dinner", "sleep-optimization");
    }

    if (avgEnergy < 6) {
      recs.push("orange-juice", "reduce-cardio");
    }

    setRecommendations([...new Set(recs)].slice(0, 3));
  }, [recentLogs]);

  // Confetti celebration for temperature milestone
  useEffect(() => {
    if (todayLog && todayLog.temperature >= 98 && !sessionStorage.getItem("confetti_shown_today")) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B35', '#FF8C42', '#FFA552']
      });
      sessionStorage.setItem("confetti_shown_today", "true");
    }
  }, [todayLog]);

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-md mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight" data-testid="heading-welcome">
            Hey {user?.name || "there"}! <Sparkles className="inline w-6 h-6 text-primary ml-1" data-testid="icon-sparkles" />
          </h1>
          <p className="text-muted-foreground" data-testid="text-greeting">
            {todayLog ? "You're glowing today!" : "Ready to track today's vitals?"}
          </p>
        </div>

        {todayLog ? (
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 space-y-2" data-testid="card-temperature">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">Temp</span>
              </div>
              <p className="text-2xl font-bold" data-testid="text-temperature">{todayLog.temperature.toFixed(1)}°F</p>
            </Card>

            <Card className="p-4 space-y-2" data-testid="card-pulse">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">Pulse</span>
              </div>
              <p className="text-2xl font-bold" data-testid="text-pulse">{todayLog.pulse} BPM</p>
            </Card>

            <Card className="p-4 space-y-2" data-testid="card-energy">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">Energy</span>
              </div>
              <p className="text-2xl font-bold" data-testid="text-energy">{todayLog.energy}/10</p>
            </Card>
          </div>
        ) : (
          <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-track-prompt">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-primary" data-testid="icon-alert" />
              <div>
                <h3 className="font-semibold" data-testid="heading-track-prompt">Track Today's Vitals</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-track-description">Start building your metabolic data</p>
              </div>
            </div>
            <Link href="/track">
              <Button className="w-full bg-gradient-to-r from-primary to-chart-2" data-testid="button-track-today">
                Track Now
              </Button>
            </Link>
          </Card>
        )}

        {foodLogs.length > 0 && (
          <Card className="p-6 space-y-4" data-testid="card-food-log">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-primary" data-testid="icon-food" />
                <h2 className="text-lg font-semibold" data-testid="heading-food-log">Today's Food</h2>
              </div>
              <Link href="/track">
                <Button size="sm" variant="ghost" data-testid="button-add-more-food">
                  Add More
                </Button>
              </Link>
            </div>
            <div className="space-y-2">
              {foodLogs.slice(0, 4).map((log) => (
                <div
                  key={log.id}
                  className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg"
                  data-testid={`home-food-${log.id}`}
                >
                  <span className="text-xs font-medium text-primary capitalize min-w-fit">
                    {log.meal}
                  </span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm truncate">{log.foodItem}</span>
                </div>
              ))}
              {foodLogs.length > 4 && (
                <p className="text-xs text-muted-foreground text-center pt-2">
                  +{foodLogs.length - 4} more items
                </p>
              )}
            </div>
          </Card>
        )}

        <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-questions">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-primary" data-testid="icon-message" />
            <div>
              <h3 className="font-semibold" data-testid="heading-questions">Have a Question?</h3>
              <p className="text-sm text-muted-foreground" data-testid="text-questions-description">
                Get personalized guidance from your metabolic health coach
              </p>
            </div>
          </div>
          <Link href="/messages">
            <Button variant="outline" className="w-full" data-testid="button-ask-question">
              Ask a Question
            </Button>
          </Link>
        </Card>

        {recommendations.length > 0 && (
          <div className="space-y-4" data-testid="section-recommendations">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" data-testid="icon-recommendations" />
              <h2 className="text-xl font-semibold" data-testid="heading-recommendations">Recommended for You</h2>
            </div>
            {recommendations.map(recId => {
              const experiment = EXPERIMENTS.find(e => e.id === recId);
              if (!experiment) return null;

              return (
                <Card 
                  key={experiment.id}
                  className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-chart-2/5 border-2 border-transparent hover:border-primary/20 transition-colors"
                  data-testid={`card-recommendation-${experiment.id}`}
                >
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-chart-2/10" data-testid={`badge-category-${experiment.id}`}>
                      {experiment.category}
                    </Badge>
                    <h3 className="text-lg font-semibold" data-testid={`text-recommendation-title-${experiment.id}`}>
                      {experiment.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2" data-testid={`text-recommendation-why-${experiment.id}`}>
                      {experiment.why}
                    </p>
                  </div>
                  <Link href="/experiments" data-testid={`link-view-${experiment.id}`}>
                    <Button variant="outline" className="w-full" data-testid={`button-view-${experiment.id}`}>
                      Learn More
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        )}

        {activeExperiments.filter(e => !e.completed).length > 0 && (
          <div className="space-y-4" data-testid="section-active-experiments">
            <h2 className="text-xl font-semibold" data-testid="heading-active-experiments">Active Experiments</h2>
            {activeExperiments
              .filter(e => !e.completed)
              .map(active => {
                const experiment = EXPERIMENTS.find(e => e.id === active.experimentId);
                if (!experiment) return null;

                const progress = (active.currentDay / experiment.duration) * 100;

                return (
                  <Card key={active.id} className="p-6 space-y-4" data-testid={`card-active-${active.id}`}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold" data-testid={`text-active-title-${active.id}`}>{experiment.title}</h3>
                        <Badge variant="secondary" data-testid={`badge-day-${active.id}`}>
                          <Clock className="w-3 h-3 mr-1" />
                          Day {active.currentDay}/{experiment.duration}
                        </Badge>
                      </div>
                      <Progress value={progress} className="h-2" data-testid={`progress-${active.id}`} />
                    </div>
                    <Link href="/experiments" data-testid={`link-continue-${active.id}`}>
                      <Button variant="outline" size="sm" className="w-full" data-testid={`button-continue-${active.id}`}>
                        Continue Experiment
                      </Button>
                    </Link>
                  </Card>
                );
              })}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4" data-testid="section-quick-actions">
          <Link href="/experiments" data-testid="link-experiments">
            <Button variant="outline" className="w-full h-24 flex flex-col gap-2" data-testid="button-browse-experiments">
              <Sparkles className="w-6 h-6" data-testid="icon-browse-experiments" />
              <span className="text-sm">Browse Experiments</span>
            </Button>
          </Link>
          <Link href="/progress" data-testid="link-progress">
            <Button variant="outline" className="w-full h-24 flex flex-col gap-2" data-testid="button-view-progress">
              <TrendingUp className="w-6 h-6" data-testid="icon-view-progress" />
              <span className="text-sm">View Progress</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
