import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Thermometer, Heart, Zap, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { DailyLog, ActiveExperiment } from "@shared/schema";
import { EXPERIMENTS } from "@/data/experiments";

export default function Progress() {
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [activeExperiments, setActiveExperiments] = useState<ActiveExperiment[]>([]);
  const [timeRange, setTimeRange] = useState(30);

  useEffect(() => {
    const logsData = localStorage.getItem("lighter_daily_logs");
    if (logsData) {
      const parsedLogs: DailyLog[] = JSON.parse(logsData)
        .sort((a: DailyLog, b: DailyLog) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setLogs(parsedLogs.slice(-timeRange).reverse());
    }

    const experiments = localStorage.getItem("lighter_active_experiments");
    if (experiments) {
      setActiveExperiments(JSON.parse(experiments));
    }
  }, [timeRange]);

  const getChartData = (metric: "temperature" | "pulse" | "energy") => {
    return logs.map(log => ({
      date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: log[metric],
      fullDate: log.date,
    })).reverse();
  };

  const getAverage = (metric: "temperature" | "pulse" | "energy") => {
    if (logs.length === 0) return 0;
    const sum = logs.reduce((acc, log) => acc + log[metric], 0);
    return (sum / logs.length).toFixed(metric === "temperature" ? 1 : 0);
  };

  const getTrend = (metric: "temperature" | "pulse" | "energy") => {
    if (logs.length < 2) return "same";
    const recent = logs[0][metric];
    const previous = logs[1][metric];
    if (recent > previous) return "up";
    if (recent < previous) return "down";
    return "same";
  };

  const getExperimentMarkers = () => {
    return activeExperiments.map(active => {
      const experiment = EXPERIMENTS.find(e => e.id === active.experimentId);
      return {
        date: active.startDate,
        name: experiment?.title || "Experiment",
      };
    });
  };

  const tempTrend = getTrend("temperature");
  const pulseTrend = getTrend("pulse");
  const energyTrend = getTrend("energy");

  const experimentMarkers = getExperimentMarkers();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg border border-card-border shadow-lg">
          <p className="text-sm font-medium">{payload[0].payload.date}</p>
          <p className="text-sm text-primary font-semibold">
            {payload[0].value}
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
            <h1 className="text-3xl font-bold tracking-tight">Progress</h1>
            <p className="text-muted-foreground">
              Track your metabolic healing journey
            </p>
          </div>

          <Card className="p-12 text-center space-y-4">
            <TrendingUp className="w-16 h-16 mx-auto text-muted-foreground/50" />
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">No Data Yet</h3>
              <p className="text-sm text-muted-foreground">
                Start tracking your daily vitals to see your progress
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Progress</h1>
          <p className="text-muted-foreground">
            Your metabolic healing journey over the last {timeRange} days
          </p>
        </div>

        <div className="flex gap-2">
          {[7, 14, 30].map(days => (
            <Badge
              key={days}
              variant={timeRange === days ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setTimeRange(days)}
              data-testid={`filter-${days}days`}
            >
              {days} days
            </Badge>
          ))}
        </div>

        <Tabs defaultValue="temperature" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="temperature" data-testid="tab-temperature">
              <Thermometer className="w-4 h-4 mr-2" />
              Temperature
            </TabsTrigger>
            <TabsTrigger value="pulse" data-testid="tab-pulse">
              <Heart className="w-4 h-4 mr-2" />
              Pulse
            </TabsTrigger>
            <TabsTrigger value="energy" data-testid="tab-energy">
              <Zap className="w-4 h-4 mr-2" />
              Energy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="temperature" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="p-4 space-y-2">
                <p className="text-sm text-muted-foreground">Average</p>
                <p className="text-3xl font-bold text-primary" data-testid="text-avg-temp">
                  {getAverage("temperature")}°F
                </p>
              </Card>
              <Card className="p-4 space-y-2">
                <p className="text-sm text-muted-foreground">Latest</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold" data-testid="text-latest-temp">
                    {logs[0].temperature.toFixed(1)}°F
                  </p>
                  {tempTrend === "up" && <TrendingUp className="w-5 h-5 text-green-500" />}
                  {tempTrend === "down" && <TrendingDown className="w-5 h-5 text-amber-500" />}
                  {tempTrend === "same" && <Minus className="w-5 h-5 text-muted-foreground" />}
                </div>
              </Card>
              <Card className="p-4 space-y-2 col-span-2 md:col-span-1">
                <p className="text-sm text-muted-foreground">Goal Range</p>
                <p className="text-xl font-semibold">97.8 - 98.6°F</p>
              </Card>
            </div>

            <Card className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getChartData("temperature")}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    fontSize={12}
                    domain={[96, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={97.8} stroke="hsl(var(--chart-2))" strokeDasharray="3 3" />
                  <ReferenceLine y={98.6} stroke="hsl(var(--chart-2))" strokeDasharray="3 3" />
                  {experimentMarkers.map((marker, idx) => (
                    <ReferenceLine
                      key={idx}
                      x={new Date(marker.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      stroke="hsl(var(--primary))"
                      strokeDasharray="5 5"
                      label={{ value: marker.name, fill: 'hsl(var(--primary))', fontSize: 10 }}
                    />
                  ))}
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                    activeDot={{ r: 6 }}
                    fill="url(#tempGradient)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="pulse" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="p-4 space-y-2">
                <p className="text-sm text-muted-foreground">Average</p>
                <p className="text-3xl font-bold text-primary" data-testid="text-avg-pulse">
                  {getAverage("pulse")} bpm
                </p>
              </Card>
              <Card className="p-4 space-y-2">
                <p className="text-sm text-muted-foreground">Latest</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold" data-testid="text-latest-pulse">
                    {logs[0].pulse} bpm
                  </p>
                  {pulseTrend === "up" && <TrendingUp className="w-5 h-5 text-amber-500" />}
                  {pulseTrend === "down" && <TrendingDown className="w-5 h-5 text-green-500" />}
                  {pulseTrend === "same" && <Minus className="w-5 h-5 text-muted-foreground" />}
                </div>
              </Card>
              <Card className="p-4 space-y-2 col-span-2 md:col-span-1">
                <p className="text-sm text-muted-foreground">Optimal Range</p>
                <p className="text-xl font-semibold">60 - 80 bpm</p>
              </Card>
            </div>

            <Card className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getChartData("pulse")}>
                  <defs>
                    <linearGradient id="pulseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={60} stroke="hsl(var(--chart-2))" strokeDasharray="3 3" />
                  <ReferenceLine y={80} stroke="hsl(var(--chart-2))" strokeDasharray="3 3" />
                  {experimentMarkers.map((marker, idx) => (
                    <ReferenceLine
                      key={idx}
                      x={new Date(marker.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      stroke="hsl(var(--primary))"
                      strokeDasharray="5 5"
                    />
                  ))}
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                    activeDot={{ r: 6 }}
                    fill="url(#pulseGradient)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="energy" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="p-4 space-y-2">
                <p className="text-sm text-muted-foreground">Average</p>
                <p className="text-3xl font-bold text-primary" data-testid="text-avg-energy">
                  {getAverage("energy")}/10
                </p>
              </Card>
              <Card className="p-4 space-y-2">
                <p className="text-sm text-muted-foreground">Latest</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold" data-testid="text-latest-energy">
                    {logs[0].energy}/10
                  </p>
                  {energyTrend === "up" && <TrendingUp className="w-5 h-5 text-green-500" />}
                  {energyTrend === "down" && <TrendingDown className="w-5 h-5 text-amber-500" />}
                  {energyTrend === "same" && <Minus className="w-5 h-5 text-muted-foreground" />}
                </div>
              </Card>
              <Card className="p-4 space-y-2 col-span-2 md:col-span-1">
                <p className="text-sm text-muted-foreground">Goal</p>
                <p className="text-xl font-semibold">8+ / 10</p>
              </Card>
            </div>

            <Card className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getChartData("energy")}>
                  <defs>
                    <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    fontSize={12}
                    domain={[1, 10]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={8} stroke="hsl(var(--chart-2))" strokeDasharray="3 3" />
                  {experimentMarkers.map((marker, idx) => (
                    <ReferenceLine
                      key={idx}
                      x={new Date(marker.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      stroke="hsl(var(--primary))"
                      strokeDasharray="5 5"
                    />
                  ))}
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                    activeDot={{ r: 6 }}
                    fill="url(#energyGradient)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
