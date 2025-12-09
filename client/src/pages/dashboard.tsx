import { useState } from "react";
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
  TrendingUp,
  TrendingDown,
  Smile,
  Meh,
  Frown,
  Target,
  Brain,
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

// Generate dynamic insights based on actual user data
function generateInsights(recentLogs: DailyLog[]): string {
  if (recentLogs.length === 0) {
    return "Start tracking your vitals to unlock personalized insights about your metabolic healing journey.";
  }

  const insights: string[] = [];
  
  // Temperature analysis
  if (recentLogs.length >= 2) {
    const todayTemp = recentLogs[0]?.temperature || 0;
    const avgOlderTemp = recentLogs.slice(1).reduce((sum, log) => sum + log.temperature, 0) / (recentLogs.length - 1);
    if (todayTemp > avgOlderTemp) {
      insights.push("Your temperature is rising—a sign of improved metabolic function.");
    } else if (todayTemp < avgOlderTemp - 0.5) {
      insights.push("Your temperature dipped today. Focus on consistent nourishment and movement.");
    }
  }

  // Energy analysis
  const avgEnergy = recentLogs.reduce((sum, log) => sum + log.energy, 0) / recentLogs.length;
  if (avgEnergy >= 8) {
    insights.push("Your energy is thriving—you're nourishing your body well.");
  } else if (avgEnergy < 5) {
    insights.push("Consider boosting your nourishment—your energy levels could use some support.");
  }

  // Sleep analysis
  const avgSleep = recentLogs.reduce((sum, log) => sum + log.sleep, 0) / recentLogs.length;
  if (avgSleep >= 8) {
    insights.push("Excellent sleep quality! Rest is crucial for metabolic healing.");
  } else if (avgSleep < 6) {
    insights.push("Your sleep quality is low. Prioritize rest and create a calm evening routine.");
  }

  // Stress analysis
  const avgStress = recentLogs.reduce((sum, log) => sum + log.stress, 0) / recentLogs.length;
  if (avgStress <= 4) {
    insights.push("Your stress levels are beautifully low—keep up this calm momentum.");
  } else if (avgStress >= 7) {
    insights.push("Stress is high. Try movement, breathing, or time in nature to find relief.");
  }

  // Consistency analysis
  const consistencyDays = recentLogs.length;
  if (consistencyDays === 7) {
    insights.push("Perfect week of tracking! Your consistency is building powerful metabolic insights.");
  } else if (consistencyDays >= 5) {
    insights.push("You're tracking consistently—this dedication is revealing your body's patterns.");
  }

  // Mood analysis
  const goodMoodDays = recentLogs.filter(log => log.mood === "good").length;
  const moodPercent = (goodMoodDays / recentLogs.length) * 100;
  if (moodPercent >= 70) {
    insights.push("Your mood has been predominantly positive—that's a win for your overall wellness.");
  } else if (moodPercent < 30) {
    insights.push("Your mood has been challenging. Check if stress or nutrition patterns correlate.");
  }

  // Digestion analysis
  const goodDigestionDays = recentLogs.filter(log => log.digestion === "good").length;
  if (goodDigestionDays >= recentLogs.length * 0.7) {
    insights.push("Your digestion is strong—this is foundational for metabolic healing.");
  } else if (goodDigestionDays < recentLogs.length * 0.3) {
    insights.push("Your digestion has been sluggish. Consider the Carrot Salad Experiment or adjusting meal timing.");
  }

  // Return most relevant insight
  if (insights.length === 0) {
    return "Keep tracking consistently—patterns emerge with time.";
  }

  // Return the first two most impactful insights
  return insights.slice(0, 2).join(" ");
}

// Stress Trend Line Chart Component
interface StressTrendChartProps {
  recentLogs?: DailyLog[];
}

function StressTrendChart({ recentLogs = [] }: StressTrendChartProps) {
  const stressData = recentLogs.length > 0 
    ? recentLogs.map(log => log.stress || 5).reverse()
    : [4, 6, 5, 7, 4, 3, 5];
    
  const getDayLabel = (index: number) => {
    if (recentLogs.length === 0) {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index];
    }
    const date = new Date();
    date.setDate(date.getDate() - (recentLogs.length - 1 - index));
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const days = stressData.map((_, i) => getDayLabel(i));
  const maxStress = 10;
  const chartHeight = 120;
  const chartWidth = 280;
  const padding = 20;
  
  const avgStress = stressData.length > 0 
    ? (stressData.reduce((a, b) => a + b, 0) / stressData.length).toFixed(1)
    : '4.9';
    
  const stressTrend = stressData.length >= 2 
    ? stressData[stressData.length - 1] < stressData[0]
      ? 'improving'
      : 'increasing'
    : 'stable';
  
  const points = stressData.map((value, index) => ({
    x: stressData.length > 1 
      ? padding + (index * ((chartWidth - padding * 2) / (stressData.length - 1)))
      : chartWidth / 2,
    y: chartHeight - padding - ((value / maxStress) * (chartHeight - padding * 2))
  }));
  
  const pathD = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  return (
    <Card className="p-5 space-y-4 frosted-glass-warm" data-testid="card-stress-trend">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Stress Trend</h3>
        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">{stressData.length} days</Badge>
      </div>
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-32">
        <defs>
          <linearGradient id="stressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="100%" stopColor="#FFB085" />
          </linearGradient>
          <linearGradient id="stressFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${padding} ${chartHeight - padding} Z`}
          fill="url(#stressFill)"
        />
        <path
          d={pathD}
          fill="none"
          stroke="url(#stressGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((point, index) => (
          <g key={index}>
            <circle cx={point.x} cy={point.y} r="6" fill="white" stroke="#FF6B35" strokeWidth="2" />
            <text x={point.x} y={chartHeight - 4} textAnchor="middle" className="text-[10px] fill-gray-500 dark:fill-gray-400">
              {days[index]}
            </text>
          </g>
        ))}
      </svg>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground" data-testid="stress-avg">Avg: {avgStress}/10</span>
        <div className="flex items-center gap-1 text-green-600 dark:text-green-400" data-testid="stress-trend">
          {stressTrend === 'improving' ? (
            <>
              <TrendingDown className="w-3 h-3" />
              <span>Improving</span>
            </>
          ) : (
            <>
              <TrendingUp className="w-3 h-3" />
              <span>Increasing</span>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

// Sleep Quality Chart Component
interface SleepQualityChartProps {
  recentLogs?: DailyLog[];
}

function SleepQualityChart({ recentLogs = [] }: SleepQualityChartProps) {
  const sleepData = recentLogs.length > 0 
    ? recentLogs.map(log => log.sleep || 7).reverse()
    : [7.5, 6.8, 8.2, 7.0, 6.5, 8.5, 7.8];
    
  const getDayLabel = (index: number) => {
    if (recentLogs.length === 0) {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index];
    }
    const date = new Date();
    date.setDate(date.getDate() - (recentLogs.length - 1 - index));
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const days = sleepData.length > 0 ? sleepData.map((_, i) => getDayLabel(i)) : [];
  const maxSleep = 10;
  
  const avgSleep = sleepData.length > 0
    ? (sleepData.reduce((a, b) => a + b, 0) / sleepData.length).toFixed(1)
    : '7.5';

  const sleepTrend = sleepData.length >= 2
    ? sleepData[sleepData.length - 1] > sleepData[0]
      ? 'improving'
      : 'declining'
    : 'stable';
  
  return (
    <Card className="p-5 space-y-4 frosted-glass-warm" data-testid="card-sleep-quality">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Sleep Quality</h3>
        <Badge variant="secondary" className="text-xs bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">{sleepData.length} days</Badge>
      </div>
      <div className="flex items-end justify-between gap-2 h-24">
        {sleepData.map((quality, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className="w-full rounded-t-md bg-gradient-to-t from-violet-400 to-blue-300 dark:from-violet-600 dark:to-blue-500 transition-all duration-300 hover:opacity-80"
              style={{ height: `${(quality / maxSleep) * 100}%`, minHeight: '20px' }}
            />
            <span className="text-[10px] text-muted-foreground mt-1">{days[index]}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground" data-testid="sleep-avg">Avg: {avgSleep}/10</span>
        <div className="flex items-center gap-1 text-violet-600 dark:text-violet-400" data-testid="sleep-trend">
          {sleepTrend === 'improving' ? (
            <>
              <TrendingUp className="w-3 h-3" />
              <span>Improving</span>
            </>
          ) : (
            <>
              <TrendingDown className="w-3 h-3" />
              <span>Declining</span>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

// Mood Card Component
interface MoodCardProps {
  todayLog: DailyLog | undefined;
  yesterdayLog: DailyLog | undefined;
  recentLogs: DailyLog[];
}

function MoodCard({ todayLog, yesterdayLog, recentLogs }: MoodCardProps) {
  const getMoodIcon = (mood: string | null | undefined) => {
    switch (mood) {
      case "good":
        return <Smile className="w-8 h-8 mx-auto text-amber-500" />;
      case "okay":
        return <Meh className="w-8 h-8 mx-auto text-violet-500" />;
      case "bad":
        return <Frown className="w-8 h-8 mx-auto text-red-500" />;
      default:
        return <Meh className="w-8 h-8 mx-auto text-gray-400" />;
    }
  };

  const getMoodColor = (mood: string | null | undefined) => {
    switch (mood) {
      case "good":
        return "from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30";
      case "okay":
        return "from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30";
      case "bad":
        return "from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30";
      default:
        return "from-gray-100 to-gray-200 dark:from-gray-900/30 dark:to-gray-900/30";
    }
  };

  // Calculate mood trend
  const moodTrend = recentLogs.length >= 2
    ? recentLogs[0]?.mood === "good" && recentLogs[1]?.mood !== "good"
      ? "improving"
      : recentLogs[0]?.mood === "bad" && recentLogs[1]?.mood !== "bad"
      ? "improving"
      : "stable"
    : "stable";

  return (
    <div className="space-y-4">
      <Card className="p-5 space-y-4" data-testid="card-mood">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Mood Tracker</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className={`p-4 rounded-xl bg-gradient-to-br ${getMoodColor(yesterdayLog?.mood)} text-center space-y-2`} data-testid="mood-yesterday">
            <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Yesterday</p>
            <div className="text-3xl">
              {getMoodIcon(yesterdayLog?.mood)}
            </div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">{yesterdayLog?.mood || "—"}</p>
          </div>
          <div className={`p-4 rounded-xl bg-gradient-to-br ${getMoodColor(todayLog?.mood)} text-center space-y-2`} data-testid="mood-today">
            <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Today</p>
            <div className="text-3xl">
              {getMoodIcon(todayLog?.mood)}
            </div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">{todayLog?.mood || "—"}</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 text-center space-y-2" data-testid="mood-trend">
            <p className="text-[10px] font-medium text-rose-600 dark:text-rose-300 uppercase tracking-wide">Trend</p>
            <div className="text-3xl">
              {moodTrend === "improving" ? (
                <TrendingUp className="w-8 h-8 mx-auto text-rose-500" />
              ) : (
                <TrendingDown className="w-8 h-8 mx-auto text-rose-500" />
              )}
            </div>
            <p className="text-xs font-medium text-rose-700 dark:text-rose-300 capitalize">{moodTrend}</p>
          </div>
        </div>
      </Card>

      {/* Today's Notes Section */}
      {(todayLog?.moodNotes || todayLog?.digestionNotes || todayLog?.howYouFeelNotes) && (
        <Card className="p-4 space-y-3 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/30" data-testid="card-today-notes">
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Today's Notes
          </h3>
          <div className="space-y-2 text-sm">
            {todayLog?.moodNotes && (
              <div className="p-2 rounded-lg bg-white dark:bg-gray-900/50" data-testid="note-mood">
                <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">Mood & Stress</p>
                <p className="text-gray-700 dark:text-gray-300">{todayLog.moodNotes}</p>
              </div>
            )}
            {todayLog?.digestionNotes && (
              <div className="p-2 rounded-lg bg-white dark:bg-gray-900/50" data-testid="note-digestion">
                <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">Digestion</p>
                <p className="text-gray-700 dark:text-gray-300">{todayLog.digestionNotes}</p>
              </div>
            )}
            {todayLog?.howYouFeelNotes && (
              <div className="p-2 rounded-lg bg-white dark:bg-gray-900/50" data-testid="note-feel">
                <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">How You Feel</p>
                <p className="text-gray-700 dark:text-gray-300">{todayLog.howYouFeelNotes}</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}

// 30-Day Mini Trend Chart Component
interface MiniTrendChartProps {
  data: number[];
  label: string;
  unit: string;
  color: "pulse" | "temperature";
  icon: typeof Heart;
}

function MiniTrendChart({ data, label, unit, color, icon: Icon }: MiniTrendChartProps) {
  const chartHeight = 60;
  const chartWidth = 140;
  const padding = 8;
  
  const colorStyles = {
    pulse: {
      stroke: "rgba(251, 113, 133, 0.9)",
      fill: "rgba(251, 113, 133, 0.15)",
      glow: "rgba(251, 113, 133, 0.4)",
      iconColor: "text-rose-400",
      bgGradient: "from-rose-900/20 to-pink-900/10",
    },
    temperature: {
      stroke: "rgba(251, 191, 36, 0.9)",
      fill: "rgba(251, 191, 36, 0.15)", 
      glow: "rgba(251, 191, 36, 0.4)",
      iconColor: "text-amber-400",
      bgGradient: "from-amber-900/20 to-orange-900/10",
    },
  };

  const style = colorStyles[color];
  
  if (data.length < 5) {
    return (
      <div className={`p-4 rounded-xl bg-gradient-to-br ${style.bgGradient} border border-white/5`} data-testid={`mini-trend-${color}`}>
        <div className="flex items-center gap-2 mb-2">
          <Icon className={`w-4 h-4 ${style.iconColor}`} />
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
        </div>
        <p className="text-xs text-muted-foreground/70 italic">
          Trend will appear after a few days of logging.
        </p>
      </div>
    );
  }

  const minVal = Math.min(...data) - 1;
  const maxVal = Math.max(...data) + 1;
  const range = maxVal - minVal || 1;

  const points = data.map((value, index) => ({
    x: padding + (index * ((chartWidth - padding * 2) / (data.length - 1))),
    y: chartHeight - padding - ((value - minVal) / range) * (chartHeight - padding * 2)
  }));

  const linePath = points.map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`)).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x},${chartHeight - padding} L ${padding},${chartHeight - padding} Z`;

  const currentValue = data[data.length - 1];
  const trend = data.length >= 2 
    ? data[data.length - 1] > data[0] ? "up" : data[data.length - 1] < data[0] ? "down" : "stable"
    : "stable";

  return (
    <div className={`p-4 rounded-xl bg-gradient-to-br ${style.bgGradient} border border-white/5`} data-testid={`mini-trend-${color}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${style.iconColor}`} />
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
        </div>
        <span className="text-sm font-semibold text-foreground">
          {currentValue.toFixed(color === "temperature" ? 1 : 0)}{unit}
        </span>
      </div>
      
      <svg 
        width="100%" 
        height={chartHeight} 
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={style.fill} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id={`glow-${color}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <line 
          x1={padding} 
          y1={chartHeight / 2} 
          x2={chartWidth - padding} 
          y2={chartHeight / 2} 
          stroke="rgba(255,255,255,0.1)" 
          strokeDasharray="2,2" 
        />
        
        <path
          d={areaPath}
          fill={`url(#gradient-${color})`}
        />
        
        <path
          d={linePath}
          fill="none"
          stroke={style.stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#glow-${color})`}
        />
        
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r="3"
          fill={style.stroke}
          filter={`url(#glow-${color})`}
        />
      </svg>
      
      <div className="flex items-center justify-between mt-1">
        <span className="text-[10px] text-muted-foreground/60">30 days</span>
        <div className="flex items-center gap-1">
          {trend === "up" && <TrendingUp className="w-3 h-3 text-emerald-400" />}
          {trend === "down" && <TrendingDown className="w-3 h-3 text-rose-400" />}
          <span className="text-[10px] text-muted-foreground/60 capitalize">{trend}</span>
        </div>
      </div>
    </div>
  );
}

// 30-Day Metabolic Trends Section
interface MetabolicTrendsProps {
  logs: DailyLog[];
}

function MetabolicTrends({ logs }: MetabolicTrendsProps) {
  const last30Days = logs
    .filter(log => log.pulse > 0 || log.temperature > 0)
    .slice(0, 30)
    .reverse();

  const pulseData = last30Days
    .filter(log => log.pulse > 0)
    .map(log => log.pulse);
    
  const tempData = last30Days
    .filter(log => log.temperature > 0)
    .map(log => log.temperature);

  return (
    <Card className="p-5 space-y-4 frosted-glass-warm" data-testid="card-30day-trends">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
        30-Day Metabolic Trends
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <MiniTrendChart
          data={pulseData}
          label="Pulse"
          unit=" bpm"
          color="pulse"
          icon={Heart}
        />
        <MiniTrendChart
          data={tempData}
          label="Temperature"
          unit="°F"
          color="temperature"
          icon={Thermometer}
        />
      </div>
    </Card>
  );
}

// Consistency Meter Component
interface ConsistencyMeterProps {
  recentLogs?: DailyLog[];
}

function ConsistencyMeter({ recentLogs = [] }: ConsistencyMeterProps) {
  const daysCompleted = recentLogs.length;
  const totalDays = 7;
  const percentage = (daysCompleted / totalDays) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="p-5 space-y-4 frosted-glass-warm" data-testid="card-consistency">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Weekly Consistency</h3>
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="consistencyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#FF6B35" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#consistencyGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">{daysCompleted}/{totalDays}</span>
            <span className="text-xs text-muted-foreground">days</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Target className="w-4 h-4 text-emerald-500" />
        <span className="text-sm text-muted-foreground">
          {daysCompleted === 7 ? "Perfect week! 🔥" : daysCompleted >= 5 ? "Great consistency!" : "Keep going!"}
        </span>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [welcomeExpanded, setWelcomeExpanded] = useState(true);

  // Fetch active experiments from API
  const { data: activeExperiments = [] } = useQuery<ActiveExperiment[]>({
    queryKey: ["/api/experiments"],
  });

  // Fetch daily logs
  const { data: logs = [] } = useQuery<DailyLog[]>({
    queryKey: ["/api/logs"],
  });

  const today = new Date().toISOString().split("T")[0];
  const todayLog = logs.find((log) => log.date === today);
  
  // Calculate yesterday
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toISOString().split("T")[0];
  const yesterdayLog = logs.find((log) => log.date === yesterday);
  
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

  // Calculate Wellness Score (0-100)
  const calculateWellnessScore = () => {
    if (recentLogs.length === 0) return 0;

    // 1. Temperature trend (20 points) - is it rising?
    let tempScore = 0;
    if (todayLog && recentLogs.length > 1) {
      const avgOlderTemp =
        recentLogs.slice(1).reduce((sum, log) => sum + log.temperature, 0) / (recentLogs.length - 1);
      const tempDiff = todayLog.temperature - avgOlderTemp;
      tempScore = Math.max(0, Math.min(20, 10 + tempDiff * 5)); // +5 points per degree rise
    } else {
      tempScore = 10;
    }

    // 2. Sleep Quality (20 points) - average of 1-10 scale
    const sleepScore = (parseFloat(avgSleep) / 10) * 20;

    // 3. Energy (20 points) - average of 1-10 scale
    const energyScore = (parseFloat(avgEnergy) / 10) * 20;

    // 4. Mood Consistency (20 points) - percentage of "good" mood days
    const goodMoodDays = recentLogs.filter((log) => log.mood === "good").length;
    const moodScore = (goodMoodDays / recentLogs.length) * 20;

    // 5. Digestion Quality (10 points) - percentage of "good" digestion
    const goodDigestionDays = recentLogs.filter((log) => log.digestion === "good").length;
    const digestionScore = (goodDigestionDays / recentLogs.length) * 10;

    // 6. Logging Consistency (10 points) - days logged out of 7
    const consistencyScore = (recentLogs.length / 7) * 10;

    const totalScore = tempScore + sleepScore + energyScore + moodScore + digestionScore + consistencyScore;
    return Math.round(Math.min(100, Math.max(0, totalScore)));
  };

  const wellnessScore = calculateWellnessScore();

  // Get active foundational experiments
  const foundationalIds = [
    "morning-vs-afternoon-temp",
    "raw-carrot-salad",
    "low-pufa-week",
  ];
  const activeFoundational = activeExperiments
    .filter((exp) => !exp.completed && foundationalIds.includes(exp.experimentId))
    .slice(0, 5);

  // Helper function to calculate day from startDate using UTC to avoid timezone issues
  const calculateDayFromStart = (startDate: string, duration: number) => {
    const [year, month, day] = startDate.split('-').map(Number);
    const startDateUTC = Date.UTC(year, month - 1, day);
    const todayUTC = Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate());
    const daysSinceStart = Math.floor((todayUTC - startDateUTC) / (1000 * 60 * 60 * 24));
    return Math.min(Math.max(1, daysSinceStart + 1), duration);
  };

  // Helper function to get the latest log snippet from an experiment
  const getLatestLogSnippet = (logsJson: string | null) => {
    if (!logsJson) return null;
    try {
      const logs = JSON.parse(logsJson);
      if (logs.length === 0) return null;
      const latestLog = logs[logs.length - 1];
      if (latestLog.notes && latestLog.notes.trim()) {
        return latestLog.notes.trim().substring(0, 60) + (latestLog.notes.length > 60 ? "..." : "");
      }
      return null;
    } catch {
      return null;
    }
  };

  const isFirstTimeUser = !user?.onboardingCompleted;

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-background via-background to-primary/5">
      {/* Universal Layout - works on mobile and desktop */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* Theme Toggle - Top Right */}
        <div className="flex justify-end" data-testid="section-theme-toggle-desktop">
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
            className="p-6 space-y-4 frosted-glass-warm"
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
            {/* Daily Snapshot with colorful metrics */}
            <Card className="p-6 space-y-4 frosted-glass-warm" data-testid="card-today-snapshot-desktop">
              <h2 className="text-lg font-semibold" data-testid="heading-today-desktop">
                Daily Snapshot
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-orange-100/50 dark:from-primary/20 dark:to-orange-900/20" data-testid="metric-temperature-desktop">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-4 h-4 text-primary" />
                    <p className="text-xs text-muted-foreground font-medium">Morning Temp</p>
                  </div>
                  <p className="text-2xl font-bold" data-testid="value-morning-temp-desktop">
                    {todayLog?.temperature.toFixed(1) || "—"}°F
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-rose-100/50 to-pink-100/50 dark:from-rose-900/20 dark:to-pink-900/20" data-testid="metric-pulse-desktop">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <p className="text-xs text-muted-foreground font-medium">Pulse</p>
                  </div>
                  <p className="text-2xl font-bold" data-testid="value-pulse-desktop">
                    {todayLog?.pulse || "—"} bpm
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-100/50 to-yellow-100/50 dark:from-amber-900/20 dark:to-yellow-900/20" data-testid="metric-energy-desktop">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <p className="text-xs text-muted-foreground font-medium">Energy</p>
                  </div>
                  <p className="text-2xl font-bold" data-testid="value-energy-desktop">
                    {todayLog?.energy || "—"}/10
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-100/50 to-cyan-100/50 dark:from-blue-900/20 dark:to-cyan-900/20" data-testid="metric-sleep-desktop">
                  <div className="flex items-center gap-2 mb-2">
                    <Moon className="w-4 h-4 text-blue-500" />
                    <p className="text-xs text-muted-foreground font-medium">Sleep Quality</p>
                  </div>
                  <p className="text-2xl font-bold" data-testid="value-sleep-desktop">
                    {todayLog?.sleep || "—"}/10
                  </p>
                </div>
              </div>
            </Card>

            {/* 30-Day Metabolic Trends */}
            <MetabolicTrends logs={logs} />

            {/* Quick Links Buttons with colorful accents */}
            <div className="grid grid-cols-3 gap-3" data-testid="section-quick-links-desktop">
              <Link href="/track" data-testid="link-quick-track-desktop">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col gap-2 hover-elevate active-elevate-2 bg-gradient-to-br from-primary/5 to-orange-50 dark:from-primary/10 dark:to-orange-950/20 border-primary/20"
                  data-testid="button-quick-track-desktop"
                >
                  <ClipboardList className="w-5 h-5 text-primary" />
                  <span className="text-xs font-medium">Track</span>
                </Button>
              </Link>
              <Link href="/experiments" data-testid="link-quick-experiments-desktop">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col gap-2 hover-elevate active-elevate-2 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border-violet-200/50"
                  data-testid="button-quick-experiments-desktop"
                >
                  <Beaker className="w-5 h-5 text-violet-500" />
                  <span className="text-xs font-medium">Experiments</span>
                </Button>
              </Link>
              <Link href="/messages" data-testid="link-quick-messages-desktop">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col gap-2 hover-elevate active-elevate-2 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 border-cyan-200/50"
                  data-testid="button-quick-messages-desktop"
                >
                  <MessageSquare className="w-5 h-5 text-cyan-500" />
                  <span className="text-xs font-medium">Message</span>
                </Button>
              </Link>
            </div>

            {/* Mood Card */}
            <MoodCard todayLog={todayLog} yesterdayLog={yesterdayLog} recentLogs={recentLogs} />

            {/* Consistency Meter */}
            <ConsistencyMeter recentLogs={recentLogs} />

            {/* Recent Experiments */}
            <Card className="p-6 space-y-4 bg-gradient-to-br from-violet-50/30 to-purple-50/30 dark:from-violet-950/10 dark:to-purple-950/10 border-violet-200/30 dark:border-violet-800/20" data-testid="card-experiments-overview-desktop">
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
                    const currentDay = calculateDayFromStart(active.startDate, experiment.duration);
                    const progress = (currentDay / experiment.duration) * 100;
                    const daysLeft = Math.max(0, experiment.duration - currentDay);
                    const latestSnippet = getLatestLogSnippet(active.logs);

                    return (
                      <Link key={active.id} href={`/experiments/${active.experimentId}`}>
                        <div
                          className="p-3 rounded-lg bg-white/60 dark:bg-card/40 space-y-2 hover-elevate cursor-pointer"
                          data-testid={`exp-card-desktop-${active.id}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-medium text-sm" data-testid={`exp-title-desktop-${active.id}`}>
                              {experiment.title}
                            </p>
                            <Badge variant="secondary" className="text-xs bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 shrink-0" data-testid={`exp-badge-desktop-${active.id}`}>
                              Day {currentDay}/{experiment.duration}
                            </Badge>
                          </div>
                          <Progress value={progress} className="h-2" data-testid={`exp-progress-desktop-${active.id}`} />
                          {latestSnippet ? (
                            <p className="text-xs text-muted-foreground italic truncate" data-testid={`exp-snippet-desktop-${active.id}`}>
                              "{latestSnippet}"
                            </p>
                          ) : (
                            <p className="text-xs text-muted-foreground" data-testid={`exp-days-left-desktop-${active.id}`}>
                              {daysLeft} days remaining
                            </p>
                          )}
                        </div>
                      </Link>
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
                    {wellnessScore}
                  </p>
                  <p className="text-xs text-muted-foreground" data-testid="text-score-max-desktop">/100</p>
                </div>
              </div>
              <Progress value={wellnessScore} className="h-3" data-testid="progress-score-desktop" />
              <p className="text-xs text-muted-foreground" data-testid="text-score-status-desktop">
                {wellnessScore >= 80
                  ? "Excellent! You're thriving."
                  : wellnessScore >= 60
                  ? "Great progress! Keep building consistency."
                  : wellnessScore >= 40
                  ? "You're on the right path—keep tracking."
                  : "Start logging to see your wellness score."}
              </p>
            </Card>

            {/* Stress Trend Chart */}
            <StressTrendChart recentLogs={recentLogs} />

            {/* Sleep Quality Chart */}
            <SleepQualityChart recentLogs={recentLogs} />

            {/* Daily Reminder */}
            <div className="space-y-2" data-testid="section-affirmation-desktop">
              <div className="flex items-center justify-center gap-2">
                <Sun className="w-4 h-4 text-primary" />
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Daily Reminder</p>
                <Sun className="w-4 h-4 text-primary" />
              </div>
              <Card
                className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200/50 dark:border-amber-800/30 hover-elevate"
                data-testid="card-affirmation-desktop"
              >
                <p className="text-sm text-center text-gray-700 dark:text-gray-300 leading-relaxed" data-testid="text-affirmation-desktop">
                  {getTodayAffirmation()}
                </p>
              </Card>
            </div>

            {/* Support & Coaching CTAs */}
            <div className="grid grid-cols-2 gap-3" data-testid="section-cta-desktop">
              {/* Need Support */}
              <Link href="/messages" data-testid="link-message-me-cta-desktop">
                <Card
                  className="p-4 space-y-3 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 border-cyan-200/50 dark:border-cyan-800/30 hover-elevate cursor-pointer h-full"
                  data-testid="card-message-me-desktop"
                >
                  <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">Need Support</p>
                  <p className="text-sm text-muted-foreground">Questions about the app?</p>
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold text-sm">
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
                  className="p-4 space-y-3 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 border-rose-200/50 dark:border-rose-800/30 hover-elevate cursor-pointer h-full"
                  data-testid="card-book-call-desktop"
                >
                  <p className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest">Further Coaching?</p>
                  <p className="text-sm text-muted-foreground">Free 20-min strategy call</p>
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Book a Call</span>
                  </div>
                </Card>
              </a>
            </div>

            {/* Insights Card */}
            <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-chart-2/5 border-primary/20" data-testid="card-insights-desktop">
              <h2 className="text-lg font-semibold" data-testid="heading-insights-desktop">
                Insights
              </h2>
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-insight-desktop">
                  {generateInsights(recentLogs)}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
