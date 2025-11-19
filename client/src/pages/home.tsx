import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Thermometer, 
  Heart, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Sparkles,
  Clock,
  AlertCircle
} from "lucide-react";
import type { DailyLog, ActiveExperiment } from "@shared/schema";
import { EXPERIMENTS } from "@/data/experiments";
import confetti from "canvas-confetti";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [todayLog, setTodayLog] = useState<DailyLog | null>(null);
  const [recentLogs, setRecentLogs] = useState<DailyLog[]>([]);
  const [activeExperiments, setActiveExperiments] = useState<ActiveExperiment[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [, setLocation] = useLocation();

  const loadData = () => {
    const userData = localStorage.getItem("lighter_user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const logs = localStorage.getItem("lighter_daily_logs");
    if (logs) {
      const parsedLogs: DailyLog[] = JSON.parse(logs)
        .sort((a: DailyLog, b: DailyLog) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const today = new Date().toISOString().split('T')[0];
      const todaysLog = parsedLogs.find(log => log.date === today);
      setTodayLog(todaysLog || null);
      const recent = parsedLogs.slice(-7).reverse();
      setRecentLogs(recent);
      generateRecommendations(recent);
    }

    const experiments = localStorage.getItem("lighter_active_experiments");
    if (experiments) {
      const allExperiments = JSON.parse(experiments);
      setActiveExperiments(allExperiments);
    }
  };

  useEffect(() => {
    loadData();

    const handleDataUpdate = () => {
      loadData();
    };

    window.addEventListener('lighterDataUpdate', handleDataUpdate);
    return () => window.removeEventListener('lighterDataUpdate', handleDataUpdate);
  }, []);

  const generateRecommendations = (logs: DailyLog[]) => {
    if (logs.length < 3) return;

    const avgTemp = logs.reduce((sum, log) => sum + log.temperature, 0) / logs.length;
    const avgPulse = logs.reduce((sum, log) => sum + log.pulse, 0) / logs.length;
    const avgEnergy = logs.reduce((sum, log) => sum + log.energy, 0) / logs.length;
    const poorSleep = logs.filter(log => log.sleep < 6).length > logs.length / 2;

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
  };

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

  const getTemperatureTrend = () => {
    if (recentLogs.length < 2) return null;
    const recent = recentLogs[0].temperature;
    const previous = recentLogs[1].temperature;
    return recent > previous ? "up" : recent < previous ? "down" : "same";
  };

  const tempTrend = getTemperatureTrend();

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
              <div className="flex items-center justify-between">
                <Thermometer className="w-5 h-5 text-primary" data-testid="icon-temperature" />
                {tempTrend === "up" && <TrendingUp className="w-4 h-4 text-green-500" data-testid="icon-trend-up" />}
                {tempTrend === "down" && <TrendingDown className="w-4 h-4 text-amber-500" data-testid="icon-trend-down" />}
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold" data-testid="text-temp-value">
                  {todayLog.temperature.toFixed(1)}°F
                </p>
                <p className="text-xs text-muted-foreground">Temperature</p>
              </div>
            </Card>

            <Card className="p-4 space-y-2" data-testid="card-pulse">
              <Heart className="w-5 h-5 text-primary" data-testid="icon-pulse" />
              <div className="space-y-1">
                <p className="text-2xl font-bold" data-testid="text-pulse-value">
                  {todayLog.pulse}
                </p>
                <p className="text-xs text-muted-foreground">Pulse (bpm)</p>
              </div>
            </Card>

            <Card className="p-4 space-y-2" data-testid="card-energy">
              <Zap className="w-5 h-5 text-primary" data-testid="icon-energy" />
              <div className="space-y-1">
                <p className="text-2xl font-bold" data-testid="text-energy-value">
                  {todayLog.energy}/10
                </p>
                <p className="text-xs text-muted-foreground">Energy</p>
              </div>
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
                <Card key={experiment.id} className="p-6 space-y-4 border-l-4 border-l-primary" data-testid={`card-recommendation-${experiment.id}`}>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg" data-testid={`text-recommendation-title-${experiment.id}`}>{experiment.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1" data-testid={`text-recommendation-duration-${experiment.id}`}>
                          {experiment.duration} days • {experiment.category}
                        </p>
                      </div>
                      <Badge variant="secondary" data-testid={`badge-category-${experiment.id}`}>{experiment.category}</Badge>
                    </div>
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
