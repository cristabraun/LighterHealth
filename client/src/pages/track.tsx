import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Thermometer, Heart, Zap, Moon, Apple } from "lucide-react";
import type { InsertDailyLog, DailyLog } from "@shared/schema";
import confetti from "canvas-confetti";

export default function Track() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [temperature, setTemperature] = useState("");
  const [pulse, setPulse] = useState("");
  const [energy, setEnergy] = useState([7]);
  const [sleep, setSleep] = useState([7]);
  const [digestion, setDigestion] = useState<"good" | "okay" | "poor">("good");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const logs = localStorage.getItem("lighter_daily_logs");
    if (logs) {
      const parsedLogs: DailyLog[] = JSON.parse(logs);
      const today = new Date().toISOString().split('T')[0];
      const todaysLog = parsedLogs.find(log => log.date === today);
      
      if (todaysLog) {
        setTemperature(todaysLog.temperature.toString());
        setPulse(todaysLog.pulse.toString());
        setEnergy([todaysLog.energy]);
        setSleep([todaysLog.sleep]);
        setDigestion(todaysLog.digestion as "good" | "okay" | "poor");
        setNotes(todaysLog.notes || "");
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!temperature || !pulse) {
      toast({
        title: "Missing Information",
        description: "Please enter your temperature and pulse",
        variant: "destructive",
      });
      return;
    }

    const tempNum = parseFloat(temperature);
    const pulseNum = parseInt(pulse);

    if (tempNum < 94 || tempNum > 102) {
      toast({
        title: "Invalid Temperature",
        description: "Please enter a temperature between 94°F and 102°F",
        variant: "destructive",
      });
      return;
    }

    if (pulseNum < 40 || pulseNum > 150) {
      toast({
        title: "Invalid Pulse",
        description: "Please enter a pulse between 40 and 150 bpm",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const today = new Date().toISOString().split('T')[0];
    const logData: InsertDailyLog = {
      date: today,
      temperature: tempNum,
      pulse: pulseNum,
      energy: energy[0],
      sleep: sleep[0],
      digestion,
      notes: notes.trim() || undefined,
    };

    const logs = localStorage.getItem("lighter_daily_logs");
    const parsedLogs: DailyLog[] = logs ? JSON.parse(logs) : [];
    
    const existingIndex = parsedLogs.findIndex(log => log.date === today);
    const newLog: DailyLog = {
      ...logData,
      id: existingIndex >= 0 ? parsedLogs[existingIndex].id : `log_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      parsedLogs[existingIndex] = newLog;
    } else {
      parsedLogs.push(newLog);
    }

    const sortedLogs = parsedLogs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    localStorage.setItem("lighter_daily_logs", JSON.stringify(sortedLogs));

    window.dispatchEvent(new CustomEvent('lighterDataUpdate', { detail: { type: 'dailyLog' } }));

    if (tempNum >= 98 && !sessionStorage.getItem("confetti_shown_today")) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FF6B35', '#FF8C42', '#FFA552']
      });
      sessionStorage.setItem("confetti_shown_today", "true");
      
      toast({
        title: "You're glowing!",
        description: "Your temperature is rising - that's amazing progress!",
      });
    } else {
      toast({
        title: "Data Saved!",
        description: "Your vitals have been tracked successfully",
      });
    }

    setLoading(false);
    
    setTimeout(() => {
      setLocation("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-md mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Track Today</h1>
          <p className="text-muted-foreground">
            Record your vitals and see how you're feeling
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Thermometer className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">Required Vitals</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="temperature" className="text-base">
                    Morning Temperature (°F) <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      placeholder="97.8"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      className="text-lg"
                      data-testid="input-temperature"
                      required
                    />
                    <span className="text-sm text-muted-foreground min-w-fit">°F</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Take immediately upon waking, before getting out of bed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pulse" className="text-base">
                    Resting Pulse (bpm) <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="pulse"
                      type="number"
                      placeholder="75"
                      value={pulse}
                      onChange={(e) => setPulse(e.target.value)}
                      className="text-lg"
                      data-testid="input-pulse"
                      required
                    />
                    <span className="text-sm text-muted-foreground min-w-fit">bpm</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Count for 60 seconds while sitting or lying down
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">How You Feel</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Energy Level</Label>
                    <span className="text-2xl font-bold text-primary" data-testid="text-energy-value">
                      {energy[0]}/10
                    </span>
                  </div>
                  <Slider
                    value={energy}
                    onValueChange={setEnergy}
                    min={1}
                    max={10}
                    step={1}
                    className="cursor-pointer"
                    data-testid="slider-energy"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Exhausted</span>
                    <span>Amazing</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base flex items-center gap-2">
                      <Moon className="w-4 h-4" />
                      Sleep Quality
                    </Label>
                    <span className="text-2xl font-bold text-primary" data-testid="text-sleep-value">
                      {sleep[0]}/10
                    </span>
                  </div>
                  <Slider
                    value={sleep}
                    onValueChange={setSleep}
                    min={1}
                    max={10}
                    step={1}
                    className="cursor-pointer"
                    data-testid="slider-sleep"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Terrible</span>
                    <span>Restful</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-base flex items-center gap-2">
                    <Apple className="w-4 h-4" />
                    Digestion
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      type="button"
                      variant={digestion === "good" ? "default" : "outline"}
                      onClick={() => setDigestion("good")}
                      className="h-auto py-3"
                      data-testid="button-digestion-good"
                    >
                      Good
                    </Button>
                    <Button
                      type="button"
                      variant={digestion === "okay" ? "default" : "outline"}
                      onClick={() => setDigestion("okay")}
                      className="h-auto py-3"
                      data-testid="button-digestion-okay"
                    >
                      Okay
                    </Button>
                    <Button
                      type="button"
                      variant={digestion === "poor" ? "default" : "outline"}
                      onClick={() => setDigestion("poor")}
                      className="h-auto py-3"
                      data-testid="button-digestion-poor"
                    >
                      Poor
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <Label htmlFor="notes" className="text-base">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="What did you notice today? Any observations about how you're feeling?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="resize-none"
              data-testid="textarea-notes"
            />
          </Card>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 transition-opacity"
            size="lg"
            disabled={loading}
            data-testid="button-save-data"
          >
            {loading ? "Saving..." : "Save Today's Data"}
          </Button>
        </form>
      </div>
    </div>
  );
}
