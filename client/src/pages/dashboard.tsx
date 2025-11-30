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
  Sparkles,
  Clock,
  AlertCircle,
  Volume2,
  ArrowRight,
  MessageSquare,
  Sun
} from "lucide-react";
import type { DailyLog, ActiveExperiment, FoodLog } from "@shared/schema";
import { EXPERIMENTS } from "@/data/experiments";
import confetti from "canvas-confetti";
import startHereAudio from "@assets/Pro Metabolic Tracking and Healing Intro_1764477961046.wav?url";

function getDailyAffirmation(): string {
  const DAILY_AFFIRMATIONS = [
    "A body that is fed well, will heal well.",
    "You don't have to earn rest. You get to choose it whenever you want.",
    "Play counts. Fun counts. Joy counts.",
    "Sunlight is free medicine.",
    "Healing takes time, you're right on schedule.",
    "High body temp = higher metabolism",
    "Weight-loss is a side effect of healing your metabolism and lowering stress.",
    "Being energized and alert and happy is winning.",
    "Stable blood sugar = stable mood = stable hormones."
  ];
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  return DAILY_AFFIRMATIONS[dayOfYear % DAILY_AFFIRMATIONS.length];
}

export default function Dashboard() {
  const { user } = useAuth();
  const [showFullWelcome, setShowFullWelcome] = useState(false);

  // Fetch daily logs
  const { data: logs = [] } = useQuery<DailyLog[]>({
    queryKey: ["/api/logs"],
  });

  // Fetch active experiments
  const { data: activeExperiments = [] } = useQuery<ActiveExperiment[]>({
    queryKey: ["/api/experiments"],
  });

  const today = new Date().toISOString().split('T')[0];
  const todayLog = logs.find(log => log.date === today);
  const recentLogs = logs.slice(0, 7);

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

  const isFirstTimeUser = !user?.onboardingCompleted;

  // Helper: Calculate Metabolic Score
  const getMetabolicScore = () => {
    if (recentLogs.length === 0) return 0;
    const avgTemp = recentLogs.reduce((sum, log) => sum + log.temperature, 0) / recentLogs.length;
    const avgPulse = recentLogs.reduce((sum, log) => sum + log.pulse, 0) / recentLogs.length;
    const avgEnergy = recentLogs.reduce((sum, log) => sum + log.energy, 0) / recentLogs.length;
    const sleepConsistency = recentLogs.length; // How many days logged
    
    let tempScore = avgTemp >= 98 ? 25 : avgTemp >= 97.5 ? 15 : 5;
    let pulseScore = avgPulse < 75 ? 25 : avgPulse < 85 ? 15 : 5;
    let energyScore = avgEnergy >= 7 ? 25 : avgEnergy >= 5 ? 15 : 5;
    let sleepScore = sleepConsistency >= 6 ? 25 : sleepConsistency >= 4 ? 15 : 5;
    
    return Math.round(tempScore + pulseScore + energyScore + sleepScore);
  };

  // Helper: Get Smart Insights
  const getSmartInsights = () => {
    if (recentLogs.length < 3) return [];
    
    const avgTemp = recentLogs.reduce((sum, log) => sum + log.temperature, 0) / recentLogs.length;
    const avgPulse = recentLogs.reduce((sum, log) => sum + log.pulse, 0) / recentLogs.length;
    const avgEnergy = recentLogs.reduce((sum, log) => sum + log.energy, 0) / recentLogs.length;
    const avgSleep = recentLogs.reduce((sum, log) => sum + log.sleep, 0) / recentLogs.length;

    const insights: string[] = [];
    
    if (avgTemp >= 98.1) insights.push("Your temperature is rising—keep doing what you're doing!");
    else if (avgTemp < 97.5) insights.push("Try adding more carbs and salt to support your warmth.");
    
    if (avgPulse < 75) insights.push("Your resting pulse is steady and healthy.");
    else if (avgPulse > 85) insights.push("Elevated pulse? Try more rest and nourishment.");
    
    if (avgEnergy >= 7) insights.push("Your energy is strong—this is metabolic healing happening!");
    
    if (avgSleep >= 8) insights.push("Great sleep consistency—rest is where healing happens.");
    else if (avgSleep < 6) insights.push("Prioritize sleep. It's your metabolism's best friend.");
    
    return insights.slice(0, 2);
  };

  const metabolicScore = getMetabolicScore();
  const scorePercentage = (metabolicScore / 100) * 100;
  const smartInsights = getSmartInsights();

  // Get Foundation Experiments (top 5)
  const foundationExperiments = activeExperiments
    .filter(e => {
      const exp = EXPERIMENTS.find(x => x.id === e.experimentId);
      return exp && ['morning-temp-pulse', 'carrot-salad', 'no-pufas', 'oj-before-coffee', 'pairing-carbs-protein'].includes(e.experimentId);
    })
    .slice(0, 5);

  return (
    <div className="min-h-screen pb-24 bg-background">
      <div className="max-w-md mx-auto p-6 space-y-6">

        {/* SECTION 1: Welcome Card */}
        {isFirstTimeUser ? (
          <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20" data-testid="card-welcome">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold" data-testid="heading-welcome-title">Welcome to Lighter</h2>
              <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-welcome-message">
                Your metabolic healing space. Track your warmth, energy, and nourishment daily to heal your metabolism from the inside out.
              </p>
            </div>
            <Link href="/learn">
              <Button variant="outline" className="w-full" data-testid="button-learn-more">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-2">
            <h1 className="text-3xl font-bold" data-testid="heading-greeting">
              Hey {user?.name || "there"}! <Sparkles className="inline w-6 h-6 text-primary ml-1" />
            </h1>
            <p className="text-muted-foreground" data-testid="text-greeting-subtext">
              Your metabolic healing space
            </p>
          </div>
        )}

        {/* Start Here Audio - First-time users only */}
        {isFirstTimeUser && (
          <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-start-here">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold" data-testid="heading-start-here">Start Here</h2>
            </div>
            <audio controls className="w-full rounded-md" data-testid="audio-intro">
              <source src={startHereAudio} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </Card>
        )}

        {/* SECTION 2: Metabolic Score */}
        <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20" data-testid="card-metabolic-score">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold" data-testid="heading-score">Your Score</h2>
              <p className="text-xs text-muted-foreground">7-day wellness snapshot</p>
            </div>
            <p className="text-4xl font-bold text-primary" data-testid="text-score-number">{metabolicScore}</p>
          </div>
          <Progress value={scorePercentage} className="h-3" data-testid="progress-score" />
        </Card>

        {/* SECTION 3: Today Snapshot */}
        {todayLog && (
          <Card className="p-6 space-y-4" data-testid="card-today-snapshot">
            <h2 className="text-lg font-semibold" data-testid="heading-today">Today's Snapshot</h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-lg bg-muted/40" data-testid="metric-temp-snapshot">
                <Thermometer className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-2xl font-bold">{todayLog.temperature.toFixed(1)}°</p>
                <p className="text-xs text-muted-foreground">Warmth</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/40" data-testid="metric-pulse-snapshot">
                <Heart className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-2xl font-bold">{todayLog.pulse}</p>
                <p className="text-xs text-muted-foreground">Pulse</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/40" data-testid="metric-energy-snapshot">
                <Zap className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-2xl font-bold">{todayLog.energy}</p>
                <p className="text-xs text-muted-foreground">Energy</p>
              </div>
            </div>
          </Card>
        )}

        {/* SECTION 4: Active Experiments Overview */}
        {foundationExperiments.length > 0 && (
          <Card className="p-6 space-y-4" data-testid="card-experiments-overview">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold" data-testid="heading-experiments">Foundation Experiments</h2>
              <Link href="/experiments">
                <Button size="sm" variant="ghost" data-testid="button-view-all">
                  View All →
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {foundationExperiments.map(active => {
                const experiment = EXPERIMENTS.find(e => e.id === active.experimentId);
                if (!experiment) return null;
                const progress = (active.currentDay / experiment.duration) * 100;
                const daysLeft = experiment.duration - active.currentDay;

                return (
                  <div key={active.id} className="p-3 rounded-lg bg-muted/50 space-y-2" data-testid={`exp-overview-${active.id}`}>
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm" data-testid={`exp-title-${active.id}`}>{experiment.title}</p>
                      <Badge variant="secondary" className="text-xs" data-testid={`exp-badge-${active.id}`}>
                        Day {active.currentDay}
                      </Badge>
                    </div>
                    <Progress value={progress} className="h-2" data-testid={`exp-progress-${active.id}`} />
                    <p className="text-xs text-muted-foreground" data-testid={`exp-days-left-${active.id}`}>
                      {daysLeft} days to keep the momentum going
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* SECTION 5: Weekly Trends */}
        {recentLogs.length > 0 && (
          <Card className="p-6 space-y-4" data-testid="card-weekly-trends">
            <h2 className="text-lg font-semibold" data-testid="heading-trends">Weekly Overview</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-muted/40" data-testid="trend-temp">
                <p className="text-xs text-muted-foreground">Avg Warmth</p>
                <p className="text-2xl font-bold">
                  {(recentLogs.reduce((s, l) => s + l.temperature, 0) / recentLogs.length).toFixed(1)}°F
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40" data-testid="trend-pulse">
                <p className="text-xs text-muted-foreground">Avg Pulse</p>
                <p className="text-2xl font-bold">
                  {Math.round(recentLogs.reduce((s, l) => s + l.pulse, 0) / recentLogs.length)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40" data-testid="trend-energy">
                <p className="text-xs text-muted-foreground">Avg Energy</p>
                <p className="text-2xl font-bold">
                  {(recentLogs.reduce((s, l) => s + l.energy, 0) / recentLogs.length).toFixed(1)}/10
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40" data-testid="trend-sleep">
                <p className="text-xs text-muted-foreground">Avg Sleep</p>
                <p className="text-2xl font-bold">
                  {(recentLogs.reduce((s, l) => s + l.sleep, 0) / recentLogs.length).toFixed(1)}h
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* SECTION 6: Smart Insights */}
        {smartInsights.length > 0 && (
          <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-insights">
            <h2 className="text-lg font-semibold" data-testid="heading-insights">Mini Coaching</h2>
            <div className="space-y-2">
              {smartInsights.map((insight, idx) => (
                <div key={idx} className="flex gap-2" data-testid={`insight-${idx}`}>
                  <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{insight}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* SECTION 7: Quick Links */}
        <div className="grid grid-cols-3 gap-3" data-testid="section-quick-links">
          <Link href="/track" data-testid="link-quick-track">
            <Button variant="outline" className="w-full h-20 flex flex-col gap-1" data-testid="btn-quick-track">
              <Clock className="w-5 h-5" />
              <span className="text-xs">Track</span>
            </Button>
          </Link>
          <Link href="/experiments" data-testid="link-quick-experiments">
            <Button variant="outline" className="w-full h-20 flex flex-col gap-1" data-testid="btn-quick-experiments">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs">Experiments</span>
            </Button>
          </Link>
          <Link href="/messages" data-testid="link-quick-messages">
            <Button variant="outline" className="w-full h-20 flex flex-col gap-1" data-testid="btn-quick-messages">
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs">Message</span>
            </Button>
          </Link>
        </div>

        {/* Daily Affirmation */}
        <div className="mt-8 space-y-2" data-testid="section-affirmation">
          <div className="flex items-center justify-center gap-2 px-1">
            <Sun className="w-4 h-4 text-primary" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Daily Reminder</p>
            <Sun className="w-4 h-4 text-primary" />
          </div>
          <Card className="p-4 bg-white dark:bg-card/60 border border-primary/10 hover-elevate" data-testid="card-affirmation">
            <p className="text-sm text-center text-muted-foreground leading-relaxed" data-testid="text-affirmation">
              {getDailyAffirmation()}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
