import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { 
  Thermometer, 
  Heart, 
  Moon,
  TrendingUp, 
  TrendingDown, 
  Minus,
  Sparkles,
  Plus,
  Utensils,
  Calendar,
  ArrowRight
} from "lucide-react";
import type { DailyLog, ActiveExperiment, FoodLog } from "@shared/schema";
import { EXPERIMENTS } from "@/data/experiments";

export default function MyMetabolism() {
  // Fetch daily logs
  const { data: logsData = [] } = useQuery<DailyLog[]>({
    queryKey: ["/api/logs"],
  });

  // Sort logs by date descending (most recent first)
  const logs = [...logsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Fetch active experiments
  const { data: activeExperiments = [] } = useQuery<ActiveExperiment[]>({
    queryKey: ["/api/experiments"],
  });

  // Get today's data
  const today = new Date().toISOString().split('T')[0];
  const todayLog = logs.find(log => log.date === today);
  
  // Fetch today's food logs
  const { data: foodLogs = [] } = useQuery<FoodLog[]>({
    queryKey: [`/api/food-logs?date=${today}`],
  });

  // Get last 7 days for charts (already sorted, just reverse for chronological display)
  const last7Days = logs.slice(0, 7).reverse();

  // Helper functions
  const getTrend = (metric: "temperature" | "pulse" | "sleep") => {
    if (logs.length < 2) return "same";
    const recent = logs[0][metric];
    const previous = logs[1][metric];
    if (recent > previous) return "up";
    if (recent < previous) return "down";
    return "same";
  };

  const getAverage = (metric: "temperature" | "pulse" | "energy" | "sleep", days: number = 7) => {
    const recentLogs = logs.slice(0, days);
    if (recentLogs.length === 0) return 0;
    const sum = recentLogs.reduce((acc, log) => acc + log[metric], 0);
    return sum / recentLogs.length;
  };

  const getWeeklyImprovement = (metric: "temperature" | "pulse" | "energy" | "sleep") => {
    if (logs.length < 14) return null; // Not enough data for comparison
    const thisWeek = getAverage(metric, 7);
    const lastWeekLogs = logs.slice(7, 14);
    if (lastWeekLogs.length === 0) return null;
    const lastWeek = lastWeekLogs.reduce((acc, log) => acc + log[metric], 0) / lastWeekLogs.length;
    if (lastWeek === 0) return null; // Avoid division by zero
    return ((thisWeek - lastWeek) / lastWeek * 100).toFixed(1);
  };

  const getChartData = (metric: "temperature" | "pulse" | "energy" | "sleep") => {
    return last7Days.map(log => ({
      date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: log[metric],
    }));
  };

  const getMealsByType = () => {
    const breakfast = foodLogs.filter(f => f.meal === 'breakfast');
    const lunch = foodLogs.filter(f => f.meal === 'lunch');
    const dinner = foodLogs.filter(f => f.meal === 'dinner');
    const snacks = foodLogs.filter(f => f.meal === 'snack');
    return { breakfast, lunch, dinner, snacks };
  };

  const getDigestionSummary = () => {
    const allLogs = logs.slice(0, 7);
    const good = allLogs.filter(l => l.digestion === 'good').length;
    const okay = allLogs.filter(l => l.digestion === 'okay').length;
    const poor = allLogs.filter(l => l.digestion === 'poor').length;
    return { good, okay, poor, total: allLogs.length };
  };

  const getGoodVitalsDays = () => {
    const allLogs = logs.slice(0, 7);
    return allLogs.filter(log => 
      log.temperature >= 98 && log.pulse <= 85 && log.energy >= 6
    ).length;
  };

  const getConsecutiveGoodDays = () => {
    let streak = 0;
    for (let i = 0; i < logs.length; i++) {
      if (logs[i].temperature >= 98 && logs[i].pulse <= 85 && logs[i].energy >= 6) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const getAverageDigestion = () => {
    const allLogs = logs.slice(0, 7);
    const scores = allLogs.map(l => {
      if (l.digestion === 'good') return 10;
      if (l.digestion === 'okay') return 5;
      return 0;
    });
    return (scores.reduce((a, b) => a + b, 0) / allLogs.length).toFixed(0);
  };

  const getPatternInsights = () => {
    const insights: string[] = [];
    const allLogs = logs.slice(0, 7);
    
    const avgTemp = getAverage("temperature", 7);
    const avgPulse = getAverage("pulse", 7);
    const avgEnergy = getAverage("energy", 7);
    const avgSleep = getAverage("sleep", 7);
    
    if (avgTemp >= 98.1) {
      insights.push("Your temperature is consistently elevated - great metabolic sign!");
    } else if (avgTemp < 97.5) {
      insights.push("Focus on increasing your metabolic temperature with carbs and consistency.");
    }
    
    if (avgPulse < 75) {
      insights.push("Low resting pulse indicates excellent cardiovascular health.");
    } else if (avgPulse > 85) {
      insights.push("Elevated pulse may indicate stress - try more rest and relaxation.");
    }
    
    if (avgEnergy >= 7) {
      insights.push("Your energy levels are strong - you're on the right track!");
    }
    
    if (avgSleep >= 8) {
      insights.push("Excellent sleep quality supporting your recovery.");
    } else if (avgSleep < 7) {
      insights.push("Prioritize sleep - it's crucial for metabolic healing.");
    }
    
    return insights;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg border border-card-border shadow-lg">
          <p className="text-sm font-medium">{payload[0].payload.date}</p>
          <p className="text-sm text-primary font-semibold">
            {payload[0].value.toFixed(1)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (logs.length === 0) {
    return (
      <div className="min-h-screen pb-20 bg-background">
        <div className="max-w-md mx-auto p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight" data-testid="heading-my-metabolism">My Metabolism</h1>
            </div>
            <p className="text-muted-foreground">
              A gentle overview of your daily energy, patterns, and progress.
            </p>
          </div>

          <Card className="p-12 text-center space-y-4">
            <TrendingUp className="w-16 h-16 mx-auto text-muted-foreground/50" />
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Your Journey Starts Here</h3>
              <p className="text-sm text-muted-foreground">
                Start tracking your daily vitals to see your metabolic patterns
              </p>
            </div>
            <Link href="/track">
              <Button className="mt-4" data-testid="button-start-tracking">
                Track Today's Vitals
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  const tempTrend = getTrend("temperature");
  const pulseTrend = getTrend("pulse");
  const sleepTrend = getTrend("sleep");
  const meals = getMealsByType();

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight" data-testid="heading-my-metabolism">My Metabolism</h1>
          </div>
          <p className="text-muted-foreground">
            A gentle overview of your daily energy, patterns, and progress.
          </p>
        </div>

        {/* Section 1: Today's Overview */}
        {todayLog && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Today's Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6 space-y-3" data-testid="card-overview-temp">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Temp</span>
                  </div>
                  {tempTrend === "up" && <TrendingUp className="w-4 h-4 text-green-500" data-testid="icon-temp-trend-up" />}
                  {tempTrend === "down" && <TrendingDown className="w-4 h-4 text-amber-500" data-testid="icon-temp-trend-down" />}
                  {tempTrend === "same" && <Minus className="w-4 h-4 text-muted-foreground" />}
                </div>
                <p className="text-4xl font-bold" data-testid="text-today-temp">{todayLog.temperature.toFixed(1)}°F</p>
                <p className="text-sm text-muted-foreground">Warmth today</p>
              </Card>

              <Card className="p-6 space-y-3" data-testid="card-overview-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Pulse</span>
                  </div>
                  {pulseTrend === "up" && <TrendingUp className="w-4 h-4 text-amber-500" data-testid="icon-pulse-trend-up" />}
                  {pulseTrend === "down" && <TrendingDown className="w-4 h-4 text-green-500" data-testid="icon-pulse-trend-down" />}
                  {pulseTrend === "same" && <Minus className="w-4 h-4 text-muted-foreground" />}
                </div>
                <p className="text-4xl font-bold" data-testid="text-today-pulse">{todayLog.pulse} bpm</p>
                <p className="text-sm text-muted-foreground">Energy & stress indicator</p>
              </Card>

              <Card className="p-6 space-y-3" data-testid="card-overview-sleep">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Moon className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Sleep</span>
                  </div>
                  {sleepTrend === "up" && <TrendingUp className="w-4 h-4 text-green-500" data-testid="icon-sleep-trend-up" />}
                  {sleepTrend === "down" && <TrendingDown className="w-4 h-4 text-amber-500" data-testid="icon-sleep-trend-down" />}
                  {sleepTrend === "same" && <Minus className="w-4 h-4 text-muted-foreground" />}
                </div>
                <p className="text-4xl font-bold" data-testid="text-today-sleep">{todayLog.sleep.toFixed(1)} hrs</p>
                <p className="text-sm text-muted-foreground">Rest & recovery</p>
              </Card>
            </div>
          </div>
        )}

        {/* Section 2: Active Experiments */}
        {activeExperiments.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Your Current Experiments</h2>
                <p className="text-sm text-muted-foreground">What you're exploring right now</p>
              </div>
              <Link href="/experiments">
                <Button variant="outline" size="sm" data-testid="button-view-all-experiments">
                  View All
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeExperiments.slice(0, 4).map(active => {
                const experiment = EXPERIMENTS.find(e => e.id === active.experimentId);
                if (!experiment) return null;
                
                const progress = (active.currentDay / experiment.duration) * 100;
                const daysLeft = experiment.duration - active.currentDay + 1;

                return (
                  <Card key={active.id} className="p-5 space-y-4" data-testid={`card-active-experiment-${active.id}`}>
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold leading-tight">{experiment.title}</h3>
                        <Badge variant="secondary" className="shrink-0">
                          Day {active.currentDay}/{experiment.duration}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{experiment.category}</p>
                    </div>
                    <div className="space-y-2">
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">{daysLeft} days remaining</p>
                    </div>
                    <Link href="/experiments">
                      <Button variant="outline" size="sm" className="w-full" data-testid={`button-view-progress-${active.id}`}>
                        View Progress
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </Card>
                );
              })}
            </div>
            <Link href="/experiments">
              <Button variant="outline" className="w-full" data-testid="button-add-experiment">
                <Plus className="w-4 h-4 mr-2" />
                Add Another Experiment
              </Button>
            </Link>
          </div>
        )}

        {/* Section 3: Food Log Summary */}
        {foodLogs.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Your Meals Today</h2>
                <p className="text-sm text-muted-foreground">What you're nourishing yourself with</p>
              </div>
              <Link href="/track">
                <Button variant="outline" size="sm" data-testid="button-track-food">
                  <Utensils className="w-4 h-4 mr-2" />
                  Track Food
                </Button>
              </Link>
            </div>
            <Card className="p-6 space-y-4">
              {meals.breakfast.length > 0 && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Breakfast</p>
                  <p className="text-base" data-testid="text-breakfast-foods">
                    {meals.breakfast.map(f => f.foodItem).join(", ")}
                  </p>
                </div>
              )}
              {meals.lunch.length > 0 && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Lunch</p>
                  <p className="text-base" data-testid="text-lunch-foods">
                    {meals.lunch.map(f => f.foodItem).join(", ")}
                  </p>
                </div>
              )}
              {meals.dinner.length > 0 && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Dinner</p>
                  <p className="text-base" data-testid="text-dinner-foods">
                    {meals.dinner.map(f => f.foodItem).join(", ")}
                  </p>
                </div>
              )}
              {meals.snacks.length > 0 && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Snacks</p>
                  <p className="text-base" data-testid="text-snack-foods">
                    {meals.snacks.map(f => f.foodItem).join(", ")}
                  </p>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Section 4: Metabolic Graphs */}
        {last7Days.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">7-Day Trends</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Temperature Chart */}
              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Temperature</h3>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={getChartData("temperature")}>
                    <defs>
                      <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                      domain={[96, 100]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', r: 3 }}
                      fill="url(#tempGradient)"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground">
                  7-day average: {getAverage("temperature", 7).toFixed(1)}°F
                </p>
              </Card>

              {/* Pulse Chart */}
              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Pulse</h3>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={getChartData("pulse")}>
                    <defs>
                      <linearGradient id="pulseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--chart-2))', r: 3 }}
                      fill="url(#pulseGradient)"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground">
                  7-day average: {getAverage("pulse", 7).toFixed(0)} bpm
                </p>
              </Card>

              {/* Energy Chart */}
              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Energy</h3>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={getChartData("energy")}>
                    <defs>
                      <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--chart-3))" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                      domain={[1, 10]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--chart-3))', r: 3 }}
                      fill="url(#energyGradient)"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground">
                  7-day average: {getAverage("energy", 7).toFixed(1)}/10
                </p>
              </Card>

              {/* Sleep Chart */}
              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Moon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Sleep</h3>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={getChartData("sleep")}>
                    <defs>
                      <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--chart-4))" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="hsl(var(--chart-4))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                      domain={[0, 12]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--chart-4))"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--chart-4))', r: 3 }}
                      fill="url(#sleepGradient)"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground">
                  7-day average: {getAverage("sleep", 7).toFixed(1)} hrs
                </p>
              </Card>
            </div>
          </div>
        )}

        {/* Section 5: Progress Insights & Patterns */}
        {logs.length >= 7 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Progress & Patterns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Week-over-Week Improvements */}
              {logs.length >= 14 && (
                <Card className="p-6 space-y-4 bg-gradient-to-br from-green-500/5 to-transparent" data-testid="card-week-comparison">
                  <h3 className="font-semibold">Week-over-Week Change</h3>
                  <div className="space-y-2">
                    {getWeeklyImprovement("temperature") !== null && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Temperature</span>
                        <div className="flex items-center gap-1">
                          {parseFloat(getWeeklyImprovement("temperature")!) > 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-500" data-testid="icon-temp-improvement" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-amber-500" />
                          )}
                          <span className={parseFloat(getWeeklyImprovement("temperature")!) > 0 ? "text-green-600 font-semibold" : "text-amber-600 font-semibold"}>
                            {getWeeklyImprovement("temperature")}%
                          </span>
                        </div>
                      </div>
                    )}
                    {getWeeklyImprovement("pulse") !== null && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Pulse</span>
                        <div className="flex items-center gap-1">
                          {parseFloat(getWeeklyImprovement("pulse")!) < 0 ? (
                            <TrendingDown className="w-4 h-4 text-green-500" data-testid="icon-pulse-improvement" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-amber-500" />
                          )}
                          <span className={parseFloat(getWeeklyImprovement("pulse")!) < 0 ? "text-green-600 font-semibold" : "text-amber-600 font-semibold"}>
                            {Math.abs(parseFloat(getWeeklyImprovement("pulse")!))}%
                          </span>
                        </div>
                      </div>
                    )}
                    {getWeeklyImprovement("energy") !== null && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Energy</span>
                        <div className="flex items-center gap-1">
                          {parseFloat(getWeeklyImprovement("energy")!) > 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-500" data-testid="icon-energy-improvement" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-amber-500" />
                          )}
                          <span className={parseFloat(getWeeklyImprovement("energy")!) > 0 ? "text-green-600 font-semibold" : "text-amber-600 font-semibold"}>
                            {getWeeklyImprovement("energy")}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Streaks & Milestones */}
              <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-transparent" data-testid="card-streaks">
                <h3 className="font-semibold">Streaks & Milestones</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Optimal Health Days</p>
                    <p className="text-2xl font-bold text-primary" data-testid="text-good-vitals-days">{getConsecutiveGoodDays()} day streak</p>
                    <p className="text-xs text-muted-foreground">{getGoodVitalsDays()}/7 days with optimal vitals</p>
                  </div>
                </div>
              </Card>

              {/* Digestion Summary */}
              <Card className="p-6 space-y-4" data-testid="card-digestion-summary">
                <h3 className="font-semibold">Digestion This Week</h3>
                <div className="space-y-2">
                  {(() => {
                    const dig = getDigestionSummary();
                    return (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Good Days</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" data-testid="badge-good-digestion">
                            {dig.good}/{dig.total}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Okay Days</span>
                          <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100" data-testid="badge-okay-digestion">
                            {dig.okay}/{dig.total}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Challenging Days</span>
                          <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100" data-testid="badge-poor-digestion">
                            {dig.poor}/{dig.total}
                          </Badge>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </Card>

              {/* Weekly Averages */}
              <Card className="p-6 space-y-4" data-testid="card-weekly-averages">
                <h3 className="font-semibold">7-Day Averages</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Temp</p>
                    <p className="text-lg font-semibold" data-testid="text-avg-temp">{getAverage("temperature", 7).toFixed(1)}°F</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Pulse</p>
                    <p className="text-lg font-semibold" data-testid="text-avg-pulse">{getAverage("pulse", 7).toFixed(0)} bpm</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Energy</p>
                    <p className="text-lg font-semibold" data-testid="text-avg-energy">{getAverage("energy", 7).toFixed(1)}/10</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Sleep</p>
                    <p className="text-lg font-semibold" data-testid="text-avg-sleep">{getAverage("sleep", 7).toFixed(1)} hrs</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Section 6: Personalized Pattern Insights */}
        {logs.length >= 7 && getPatternInsights().length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">What We're Seeing</h2>
            <div className="space-y-2">
              {getPatternInsights().map((insight, idx) => (
                <Card key={idx} className="p-4 space-y-2 bg-gradient-to-r from-primary/5 to-chart-2/5" data-testid={`card-insight-${idx}`}>
                  <div className="flex gap-3">
                    <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground" data-testid={`text-insight-${idx}`}>{insight}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Section 6: Encouragement Card */}
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-chart-2/5 border-primary/20">
          <div className="flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Gentle Reminder</h3>
              <p className="text-muted-foreground">
                You're doing beautifully. Metabolic healing is a journey, not a rush. Every small step you take is nourishing your body and building lasting warmth from within.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
