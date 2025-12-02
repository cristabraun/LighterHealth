import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import {
  Thermometer,
  Heart,
  Zap,
  Moon,
  Sparkles,
  Volume2,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Beaker,
  ClipboardList,
  Sun,
  Calendar,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import type { DailyLog, ActiveExperiment } from "@shared/schema";
import { EXPERIMENTS } from "@/data/experiments";
import startHereAudio from "@assets/Pro Metabolic Tracking and Healing Intro_1764477961046.wav?url";

const DAILY_AFFIRMATIONS = [
  "You don't have to earn rest. You get to choose it whenever you want.",
  "A body that is fed well, will heal well.",
  "Play counts. Fun counts. Joy counts.",
  "Sunlight is free medicine.",
  "Healing takes time, you're right on schedule.",
  "High body temp = higher metabolism.",
  "Weight loss is a side effect of healing your metabolism and lowering stress.",
  "Being energized, alert, and happy is winning.",
  "Stable blood sugar = stable mood = stable hormones.",
];

function getTodayAffirmation(): string {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return DAILY_AFFIRMATIONS[dayOfYear % DAILY_AFFIRMATIONS.length];
}

export default function Dashboard() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [welcomeExpanded, setWelcomeExpanded] = useState(true);
  const [activeExperiments, setActiveExperiments] = useState<ActiveExperiment[]>([]);

  // Load active experiments from localStorage and listen for changes
  useEffect(() => {
    const loadExperiments = () => {
      const experimentsData = localStorage.getItem("lighter_active_experiments");
      if (experimentsData) {
        try {
          const experiments: ActiveExperiment[] = JSON.parse(experimentsData);
          setActiveExperiments(experiments);
        } catch {
          setActiveExperiments([]);
        }
      }
    };

    loadExperiments();

    // Listen for visibility changes (when returning to this tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadExperiments();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Fetch daily logs
  const { data: logs = [] } = useQuery<DailyLog[]>({
    queryKey: ["/api/logs"],
  });

  const today = new Date().toISOString().split("T")[0];
  const todayLog = logs.find((log) => log.date === today);
  const recentLogs = logs.slice(0, 7);

  // Calculate averages
  const avgTemp =
    recentLogs.length > 0
      ? (recentLogs.reduce((sum, log) => sum + log.temperature, 0) / recentLogs.length).toFixed(1)
      : "98.2";
  const avgPulse =
    recentLogs.length > 0
      ? Math.round(recentLogs.reduce((sum, log) => sum + log.pulse, 0) / recentLogs.length)
      : "72";
  const avgSleep =
    recentLogs.length > 0
      ? (recentLogs.reduce((sum, log) => sum + log.sleep, 0) / recentLogs.length).toFixed(1)
      : "7.5";
  const avgEnergy =
    recentLogs.length > 0
      ? (recentLogs.reduce((sum, log) => sum + log.energy, 0) / recentLogs.length).toFixed(1)
      : "7.0";

  // Get active foundational experiments
  const foundationalIds = [
    "morning-vs-afternoon-temp",
    "raw-carrot-salad",
    "low-pufa-week",
  ];
  const activeFoundational = activeExperiments
    .filter((exp) => !exp.completed && foundationalIds.includes(exp.experimentId))
    .slice(0, 5);

  const isFirstTimeUser = !user?.onboardingCompleted;

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-background via-background to-primary/5">
      {/* Mobile Layout */}
      <div className="lg:hidden max-w-md mx-auto p-6 space-y-6">
        {/* Theme Toggle - Top Right */}
        <div className="flex justify-end mb-2" data-testid="section-theme-toggle">
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleTheme}
            className="gap-1"
            data-testid="button-theme-toggle"
          >
            {theme === "light" ? (
              <>
                <Moon className="w-4 h-4" />
                <span className="text-xs">Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4" />
                <span className="text-xs">Light</span>
              </>
            )}
          </Button>
        </div>
        
        {/* SECTION 1: Welcome Card */}
        {welcomeExpanded && (
          <Card
            className="p-6 space-y-4 bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20"
            data-testid="card-welcome"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="space-y-1">
                  <div className="flex items-center gap-2" data-testid="heading-welcome">
                    <h1 className="text-3xl font-bold">
                      Hey {user?.name || "Crista"}!
                    </h1>
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-lg text-muted-foreground font-medium">
                    Your Metabolic Dashboard
                  </p>
                </div>
                <p className="text-sm text-muted-foreground" data-testid="text-welcome-description">
                  Track your warmth, energy, and nourishment daily to heal your metabolism from the inside out.
                </p>
              </div>
              <button
                onClick={() => setWelcomeExpanded(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-collapse-welcome"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
            {isFirstTimeUser && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium" data-testid="text-welcome-audio-label">Welcome Audio</span>
                </div>
                <audio controls className="w-full rounded-md" data-testid="audio-welcome">
                  <source src={startHereAudio} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </Card>
        )}

        {!welcomeExpanded && (
          <button
            onClick={() => setWelcomeExpanded(true)}
            className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors w-full text-left"
            data-testid="button-expand-welcome"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Welcome back!</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" />
          </button>
        )}

        {/* SECTION 2: Metabolic Score */}
        <Card
          className="p-6 space-y-4 bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20"
          data-testid="card-metabolic-score"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold" data-testid="heading-score">
                Your Score
              </h2>
              <p className="text-xs text-muted-foreground" data-testid="text-score-subtitle">
                7-day wellness snapshot
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-primary" data-testid="text-score-value">
                74
              </p>
              <p className="text-xs text-muted-foreground" data-testid="text-score-max">/100</p>
            </div>
          </div>
          <Progress value={74} className="h-3" data-testid="progress-score" />
          <p className="text-xs text-muted-foreground" data-testid="text-score-status">
            Keep building consistency—you're on a great path
          </p>
        </Card>

        {/* SECTION 3: Today's Snapshot */}
        <Card className="p-6 space-y-4" data-testid="card-today-snapshot">
          <h2 className="text-lg font-semibold" data-testid="heading-today">
            Today's Snapshot
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-transparent" data-testid="metric-temperature">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="w-4 h-4 text-primary" />
                <p className="text-xs text-muted-foreground font-medium">Morning Temp</p>
              </div>
              <p className="text-2xl font-bold" data-testid="value-morning-temp">
                {todayLog?.temperature.toFixed(1) || "—"}°F
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-chart-2/5 to-transparent" data-testid="metric-pulse">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-chart-2" />
                <p className="text-xs text-muted-foreground font-medium">Pulse</p>
              </div>
              <p className="text-2xl font-bold" data-testid="value-pulse">
                {todayLog?.pulse || "—"} bpm
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-chart-3/5 to-transparent" data-testid="metric-energy">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-chart-3" />
                <p className="text-xs text-muted-foreground font-medium">Energy</p>
              </div>
              <p className="text-2xl font-bold" data-testid="value-energy">
                {todayLog?.energy || "—"}/10
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-chart-4/5 to-transparent" data-testid="metric-digestion">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="w-4 h-4 text-chart-4" />
                <p className="text-xs text-muted-foreground font-medium">Digestion</p>
              </div>
              <p className="text-2xl font-bold capitalize" data-testid="value-digestion">
                {todayLog?.digestion || "—"}
              </p>
            </div>
          </div>
        </Card>

        {/* SECTION 4: Active Experiments Overview */}
        <Card className="p-6 space-y-4" data-testid="card-experiments-overview">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold" data-testid="heading-experiments">
              Foundation Experiments
            </h2>
            <Link href="/experiments">
              <Button size="sm" variant="ghost" data-testid="button-view-all-experiments">
                View All
              </Button>
            </Link>
          </div>

          {activeFoundational.length > 0 ? (
            <div className="space-y-3">
              {activeFoundational.map((active) => {
                const experiment = EXPERIMENTS.find((e) => e.id === active.experimentId);
                if (!experiment) return null;
                const progress = (active.currentDay / experiment.duration) * 100;
                const daysLeft = experiment.duration - active.currentDay;

                return (
                  <div
                    key={active.id}
                    className="p-3 rounded-lg bg-muted/50 space-y-2"
                    data-testid={`exp-card-${active.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm" data-testid={`exp-title-${active.id}`}>
                        {experiment.title}
                      </p>
                      <Badge variant="secondary" className="text-xs" data-testid={`exp-badge-${active.id}`}>
                        Day {active.currentDay}/{experiment.duration}
                      </Badge>
                    </div>
                    <Progress value={progress} className="h-2" data-testid={`exp-progress-${active.id}`} />
                    <p className="text-xs text-muted-foreground" data-testid={`exp-days-left-${active.id}`}>
                      {daysLeft} days remaining
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4" data-testid="text-no-experiments">
              No active experiments yet. Start one in the Experiments section.
            </p>
          )}
        </Card>

        {/* SECTION 5: Weekly Trends */}
        <Card className="p-6 space-y-4" data-testid="card-weekly-trends">
          <h2 className="text-lg font-semibold" data-testid="heading-trends">
            Weekly Trends
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-lg bg-primary/5" data-testid="trend-temperature">
              <p className="text-xs text-muted-foreground font-medium mb-1">Avg Temperature</p>
              <p className="text-2xl font-bold" data-testid="value-avg-temp">
                {avgTemp}°F
              </p>
            </div>
            <div className="p-4 rounded-lg bg-chart-2/5" data-testid="trend-pulse">
              <p className="text-xs text-muted-foreground font-medium mb-1">Avg Pulse</p>
              <p className="text-2xl font-bold" data-testid="value-avg-pulse">
                {avgPulse} bpm
              </p>
            </div>
            <div className="p-4 rounded-lg bg-chart-4/5" data-testid="trend-sleep">
              <p className="text-xs text-muted-foreground font-medium mb-1">Avg Sleep</p>
              <p className="text-2xl font-bold" data-testid="value-avg-sleep">
                {avgSleep}h
              </p>
            </div>
            <div className="p-4 rounded-lg bg-chart-3/5" data-testid="trend-energy">
              <p className="text-xs text-muted-foreground font-medium mb-1">Avg Energy</p>
              <p className="text-2xl font-bold" data-testid="value-avg-energy">
                {avgEnergy}/10
              </p>
            </div>
          </div>
        </Card>

        {/* SECTION 6: Smart Insights */}
        <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-insights">
          <h2 className="text-lg font-semibold" data-testid="heading-insights">
            Insights
          </h2>
          <div className="flex gap-3">
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-insight">
              Your pulse is rising—a sign of improved metabolic function. Keep nourishing your body consistently.
            </p>
          </div>
        </Card>

        {/* SECTION 7: Quick Links */}
        <div className="grid grid-cols-3 gap-3" data-testid="section-quick-links">
          <Link href="/track" data-testid="link-quick-track">
            <Button
              variant="outline"
              className="w-full h-20 flex flex-col gap-2 hover-elevate active-elevate-2"
              data-testid="button-quick-track"
            >
              <ClipboardList className="w-5 h-5" />
              <span className="text-xs font-medium">Track</span>
            </Button>
          </Link>
          <Link href="/experiments" data-testid="link-quick-experiments">
            <Button
              variant="outline"
              className="w-full h-20 flex flex-col gap-2 hover-elevate active-elevate-2"
              data-testid="button-quick-experiments"
            >
              <Beaker className="w-5 h-5" />
              <span className="text-xs font-medium">Experiments</span>
            </Button>
          </Link>
          <Link href="/messages" data-testid="link-quick-messages">
            <Button
              variant="outline"
              className="w-full h-20 flex flex-col gap-2 hover-elevate active-elevate-2"
              data-testid="button-quick-messages"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs font-medium">Message</span>
            </Button>
          </Link>
        </div>

        {/* SECTION 8: Daily Affirmation */}
        <div className="mt-12 space-y-2" data-testid="section-affirmation">
          <div className="flex items-center justify-center gap-2">
            <Sun className="w-4 h-4 text-primary" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Daily Reminder</p>
            <Sun className="w-4 h-4 text-primary" />
          </div>
          <Card
            className="p-4 bg-white dark:bg-card/60 border border-primary/10 hover-elevate"
            data-testid="card-affirmation"
          >
            <p className="text-sm text-center text-muted-foreground leading-relaxed" data-testid="text-affirmation">
              {getTodayAffirmation()}
            </p>
          </Card>
        </div>

        {/* SECTION 9: Message Me & Strategy Call CTA */}
        <div className="mt-8 grid grid-cols-2 gap-3" data-testid="section-cta">
          {/* Message Me */}
          <Link href="/messages" data-testid="link-message-me-cta">
            <Card
              className="p-4 space-y-3 bg-gradient-to-br from-primary/5 to-chart-2/5 border-primary/20 hover-elevate cursor-pointer"
              data-testid="card-message-me"
            >
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Need Support</p>
              <p className="text-sm text-muted-foreground">Confused with the app?</p>
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <ArrowRight className="w-4 h-4" />
                <span>Message Me</span>
              </div>
            </Card>
          </Link>

          {/* Book Strategy Call */}
          <a
            href="https://calendly.com/chatwithcrista/30min"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-book-call-cta"
          >
            <Card
              className="p-4 space-y-3 border-primary/20 hover-elevate cursor-pointer"
              data-testid="card-book-call"
            >
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Want Further Coaching?</p>
              <p className="text-sm text-muted-foreground">Get a free 20-minute metabolic strategy coaching call.</p>
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <ArrowRight className="w-4 h-4" />
                <span>Book a Call</span>
              </div>
            </Card>
          </a>
        </div>
      </div>

      {/* Desktop Layout (lg and above) */}
      <div className="hidden lg:block max-w-6xl mx-auto p-6 space-y-6">
        {/* Theme Toggle - Top Right */}
        <div className="flex justify-end mb-2" data-testid="section-theme-toggle-desktop">
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleTheme}
            className="gap-1"
            data-testid="button-theme-toggle-desktop"
          >
            {theme === "light" ? (
              <>
                <Moon className="w-4 h-4" />
                <span className="text-xs">Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4" />
                <span className="text-xs">Light</span>
              </>
            )}
          </Button>
        </div>

        {/* TOP (FULL WIDTH): Welcome Card */}
        {welcomeExpanded && (
          <Card
            className="p-6 space-y-4 bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20"
            data-testid="card-welcome-desktop"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="space-y-1">
                  <div className="flex items-center gap-2" data-testid="heading-welcome-desktop">
                    <h1 className="text-4xl font-bold">
                      Hey {user?.name || "Crista"}!
                    </h1>
                    <Sparkles className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-lg text-muted-foreground font-medium">
                    Your Metabolic Dashboard
                  </p>
                </div>
                <p className="text-sm text-muted-foreground max-w-lg" data-testid="text-welcome-description-desktop">
                  Track your warmth, energy, and nourishment daily to heal your metabolism from the inside out.
                </p>
              </div>
              <button
                onClick={() => setWelcomeExpanded(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-collapse-welcome-desktop"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
            {isFirstTimeUser && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium" data-testid="text-welcome-audio-label-desktop">Welcome Audio</span>
                </div>
                <audio controls className="w-full rounded-md max-w-2xl" data-testid="audio-welcome-desktop">
                  <source src={startHereAudio} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </Card>
        )}

        {!welcomeExpanded && (
          <button
            onClick={() => setWelcomeExpanded(true)}
            className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-left"
            data-testid="button-expand-welcome-desktop"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Welcome back!</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" />
          </button>
        )}

        {/* TWO-COLUMN GRID LAYOUT */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Daily Snapshot */}
            <Card className="p-6 space-y-4" data-testid="card-today-snapshot-desktop">
              <h2 className="text-lg font-semibold" data-testid="heading-today-desktop">
                Daily Snapshot
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-transparent" data-testid="metric-temperature-desktop">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-4 h-4 text-primary" />
                    <p className="text-xs text-muted-foreground font-medium">Morning Temp</p>
                  </div>
                  <p className="text-2xl font-bold" data-testid="value-morning-temp-desktop">
                    {todayLog?.temperature.toFixed(1) || "—"}°F
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-chart-2/5 to-transparent" data-testid="metric-pulse-desktop">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-chart-2" />
                    <p className="text-xs text-muted-foreground font-medium">Pulse</p>
                  </div>
                  <p className="text-2xl font-bold" data-testid="value-pulse-desktop">
                    {todayLog?.pulse || "—"} bpm
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-chart-3/5 to-transparent" data-testid="metric-energy-desktop">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-chart-3" />
                    <p className="text-xs text-muted-foreground font-medium">Energy</p>
                  </div>
                  <p className="text-2xl font-bold" data-testid="value-energy-desktop">
                    {todayLog?.energy || "—"}/10
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-chart-4/5 to-transparent" data-testid="metric-digestion-desktop">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="w-4 h-4 text-chart-4" />
                    <p className="text-xs text-muted-foreground font-medium">Sleep</p>
                  </div>
                  <p className="text-2xl font-bold" data-testid="value-sleep-desktop">
                    {todayLog?.sleep || "—"}h
                  </p>
                </div>
              </div>
            </Card>

            {/* Quick Links Buttons */}
            <div className="grid grid-cols-3 gap-3" data-testid="section-quick-links-desktop">
              <Link href="/track" data-testid="link-quick-track-desktop">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col gap-2 hover-elevate active-elevate-2"
                  data-testid="button-quick-track-desktop"
                >
                  <ClipboardList className="w-5 h-5" />
                  <span className="text-xs font-medium">Track</span>
                </Button>
              </Link>
              <Link href="/experiments" data-testid="link-quick-experiments-desktop">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col gap-2 hover-elevate active-elevate-2"
                  data-testid="button-quick-experiments-desktop"
                >
                  <Beaker className="w-5 h-5" />
                  <span className="text-xs font-medium">Experiments</span>
                </Button>
              </Link>
              <Link href="/messages" data-testid="link-quick-messages-desktop">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col gap-2 hover-elevate active-elevate-2"
                  data-testid="button-quick-messages-desktop"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-xs font-medium">Message</span>
                </Button>
              </Link>
            </div>

            {/* Recent Experiments */}
            <Card className="p-6 space-y-4" data-testid="card-experiments-overview-desktop">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold" data-testid="heading-experiments-desktop">
                  Recent Experiments
                </h2>
                <Link href="/experiments">
                  <Button size="sm" variant="ghost" data-testid="button-view-all-experiments-desktop">
                    View All
                  </Button>
                </Link>
              </div>

              {activeFoundational.length > 0 ? (
                <div className="space-y-3">
                  {activeFoundational.map((active) => {
                    const experiment = EXPERIMENTS.find((e) => e.id === active.experimentId);
                    if (!experiment) return null;
                    const progress = (active.currentDay / experiment.duration) * 100;
                    const daysLeft = experiment.duration - active.currentDay;

                    return (
                      <div
                        key={active.id}
                        className="p-3 rounded-lg bg-muted/50 space-y-2"
                        data-testid={`exp-card-desktop-${active.id}`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm" data-testid={`exp-title-desktop-${active.id}`}>
                            {experiment.title}
                          </p>
                          <Badge variant="secondary" className="text-xs" data-testid={`exp-badge-desktop-${active.id}`}>
                            Day {active.currentDay}/{experiment.duration}
                          </Badge>
                        </div>
                        <Progress value={progress} className="h-2" data-testid={`exp-progress-desktop-${active.id}`} />
                        <p className="text-xs text-muted-foreground" data-testid={`exp-days-left-desktop-${active.id}`}>
                          {daysLeft} days remaining
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4" data-testid="text-no-experiments-desktop">
                  No active experiments yet. Start one in the Experiments section.
                </p>
              )}
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Metabolic Score Card */}
            <Card
              className="p-6 space-y-4 bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20"
              data-testid="card-metabolic-score-desktop"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold" data-testid="heading-score-desktop">
                    Your Score
                  </h2>
                  <p className="text-xs text-muted-foreground" data-testid="text-score-subtitle-desktop">
                    7-day wellness snapshot
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-primary" data-testid="text-score-value-desktop">
                    74
                  </p>
                  <p className="text-xs text-muted-foreground" data-testid="text-score-max-desktop">/100</p>
                </div>
              </div>
              <Progress value={74} className="h-3" data-testid="progress-score-desktop" />
              <p className="text-xs text-muted-foreground" data-testid="text-score-status-desktop">
                Keep building consistency—you're on a great path
              </p>
            </Card>

            {/* Weekly Activity Chart Placeholder */}
            <Card className="p-6 space-y-4" data-testid="card-activity-chart-desktop">
              <h2 className="text-lg font-semibold" data-testid="heading-activity-desktop">
                Weekly Activity
              </h2>
              <div className="h-48 bg-gradient-to-br from-primary/5 to-chart-2/5 rounded-lg flex items-center justify-center text-muted-foreground">
                <p className="text-sm">[Chart Placeholder]</p>
              </div>
            </Card>

            {/* Daily Reminder */}
            <div className="space-y-2" data-testid="section-affirmation-desktop">
              <div className="flex items-center justify-center gap-2">
                <Sun className="w-4 h-4 text-primary" />
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Daily Reminder</p>
                <Sun className="w-4 h-4 text-primary" />
              </div>
              <Card
                className="p-4 bg-white dark:bg-card/60 border border-primary/10 hover-elevate"
                data-testid="card-affirmation-desktop"
              >
                <p className="text-sm text-center text-muted-foreground leading-relaxed" data-testid="text-affirmation-desktop">
                  {getTodayAffirmation()}
                </p>
              </Card>
            </div>

            {/* Support & Coaching CTAs */}
            <div className="grid grid-cols-2 gap-3" data-testid="section-cta-desktop">
              {/* Need Support */}
              <Link href="/messages" data-testid="link-message-me-cta-desktop">
                <Card
                  className="p-4 space-y-3 bg-gradient-to-br from-primary/5 to-chart-2/5 border-primary/20 hover-elevate cursor-pointer h-full"
                  data-testid="card-message-me-desktop"
                >
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Need Support</p>
                  <p className="text-sm text-muted-foreground">Questions about the app?</p>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <MessageSquare className="w-4 h-4" />
                    <span>Message Me</span>
                  </div>
                </Card>
              </Link>

              {/* Book a Call */}
              <a
                href="https://calendly.com/chatwithcrista/30min"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-book-call-cta-desktop"
              >
                <Card
                  className="p-4 space-y-3 border-primary/20 hover-elevate cursor-pointer h-full"
                  data-testid="card-book-call-desktop"
                >
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Further Coaching?</p>
                  <p className="text-sm text-muted-foreground">Free 20-min strategy call</p>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Book a Call</span>
                  </div>
                </Card>
              </a>
            </div>

            {/* Insights Card */}
            <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-insights-desktop">
              <h2 className="text-lg font-semibold" data-testid="heading-insights-desktop">
                Insights
              </h2>
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-insight-desktop">
                  Your pulse is rising—a sign of improved metabolic function. Keep nourishing your body consistently.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
