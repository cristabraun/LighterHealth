import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Thermometer, Heart, Zap, Moon, Apple, Utensils, Trash2, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { InsertDailyLog, DailyLog, InsertFoodLog, FoodLog } from "@shared/schema";
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

  // Food log state
  const [showFoodForm, setShowFoodForm] = useState(false);
  const [meal, setMeal] = useState<"breakfast" | "lunch" | "dinner" | "snack">("breakfast");
  const [foodItem, setFoodItem] = useState("");
  const [foodNotes, setFoodNotes] = useState("");

  const today = new Date().toISOString().split('T')[0];

  // Fetch today's log
  const { data: todaysLog } = useQuery<DailyLog>({
    queryKey: ["/api/logs", today],
  });

  // Fetch today's food logs
  const { data: foodLogs = [] } = useQuery<FoodLog[]>({
    queryKey: ["/api/food-logs"],
    queryFn: async () => {
      const res = await fetch(`/api/food-logs?date=${today}`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch food logs');
      return res.json();
    },
  });

  // Pre-fill form with existing data
  useEffect(() => {
    if (todaysLog) {
      setTemperature(todaysLog.temperature.toString());
      setPulse(todaysLog.pulse.toString());
      setEnergy([todaysLog.energy]);
      setSleep([todaysLog.sleep]);
      setDigestion(todaysLog.digestion as "good" | "okay" | "poor");
      setNotes(todaysLog.notes || "");
    }
  }, [todaysLog]);

  const saveMutation = useMutation({
    mutationFn: async (logData: InsertDailyLog) => {
      const res = await apiRequest("POST", "/api/logs", logData);
      return await res.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/logs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/logs", today] });

      const tempNum = variables.temperature;
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

      setTimeout(() => {
        setLocation("/");
      }, 1500);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save log",
        variant: "destructive",
      });
    },
  });

  const addFoodMutation = useMutation({
    mutationFn: async (foodData: InsertFoodLog) => {
      const res = await apiRequest("POST", "/api/food-logs", foodData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/food-logs"] });
      setFoodItem("");
      setFoodNotes("");
      setShowFoodForm(false);
      toast({
        title: "Food Logged!",
        description: "Your meal has been recorded",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to log food",
        variant: "destructive",
      });
    },
  });

  const deleteFoodMutation = useMutation({
    mutationFn: async (foodLogId: string) => {
      const res = await apiRequest("DELETE", `/api/food-logs/${foodLogId}`, {});
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/food-logs"] });
      toast({
        title: "Deleted",
        description: "Food log removed",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
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

    const logData: InsertDailyLog = {
      date: today,
      temperature: tempNum,
      pulse: pulseNum,
      energy: energy[0],
      sleep: sleep[0],
      digestion,
      notes: notes.trim() || undefined,
    };

    saveMutation.mutate(logData);
  };

  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!foodItem.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter what you ate",
        variant: "destructive",
      });
      return;
    }

    const foodData: InsertFoodLog = {
      date: today,
      meal,
      foodItem: foodItem.trim(),
      notes: foodNotes.trim() || undefined,
    };

    addFoodMutation.mutate(foodData);
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
            disabled={saveMutation.isPending}
            data-testid="button-save-data"
          >
            {saveMutation.isPending ? "Saving..." : "Save Today's Data"}
          </Button>
        </form>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Utensils className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">Food Log</h2>
            </div>
            {!showFoodForm && (
              <Button
                size="sm"
                onClick={() => setShowFoodForm(true)}
                data-testid="button-add-food"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Food
              </Button>
            )}
          </div>

          {showFoodForm && (
            <form onSubmit={handleAddFood} className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="meal">Meal</Label>
                <Select value={meal} onValueChange={(value: any) => setMeal(value)}>
                  <SelectTrigger id="meal" data-testid="select-meal">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="foodItem">What did you eat? <span className="text-destructive">*</span></Label>
                <Input
                  id="foodItem"
                  placeholder="e.g., Orange juice, scrambled eggs, carrot salad"
                  value={foodItem}
                  onChange={(e) => setFoodItem(e.target.value)}
                  data-testid="input-food-item"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="foodNotes">Notes (Optional)</Label>
                <Textarea
                  id="foodNotes"
                  placeholder="How did you feel after? Any reactions?"
                  value={foodNotes}
                  onChange={(e) => setFoodNotes(e.target.value)}
                  rows={2}
                  className="resize-none"
                  data-testid="textarea-food-notes"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={addFoodMutation.isPending}
                  data-testid="button-save-food"
                  className="flex-1"
                >
                  {addFoodMutation.isPending ? "Adding..." : "Add"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowFoodForm(false);
                    setFoodItem("");
                    setFoodNotes("");
                  }}
                  data-testid="button-cancel-food"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {foodLogs.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Today's meals:</p>
              {foodLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start justify-between p-3 bg-muted/30 rounded-lg"
                  data-testid={`food-log-${log.id}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-primary capitalize">
                        {log.meal}
                      </span>
                      <span className="text-sm font-medium">{log.foodItem}</span>
                    </div>
                    {log.notes && (
                      <p className="text-xs text-muted-foreground mt-1">{log.notes}</p>
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteFoodMutation.mutate(log.id)}
                    disabled={deleteFoodMutation.isPending}
                    data-testid={`button-delete-food-${log.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            !showFoodForm && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No food logged yet today. Track what you eat to see how it affects your energy and vitals.
              </p>
            )
          )}
        </Card>
      </div>
    </div>
  );
}
