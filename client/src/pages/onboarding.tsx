import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, ThermometerSun, Heart, Zap } from "lucide-react";

const SYMPTOMS = [
  "Low energy or fatigue",
  "Cold hands and feet",
  "Difficulty losing weight",
  "Hair loss or thinning",
  "Irregular periods",
  "Poor sleep quality",
  "Digestive issues",
  "Brain fog",
  "Low mood or anxiety",
  "Afternoon energy crashes"
];

export default function Onboarding() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const completeOnboarding = useMutation({
    mutationFn: async () => {
      return await apiRequest("/api/user/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          symptoms: symptoms,
        }),
      });
    },
    onSuccess: async () => {
      // Invalidate and refetch user data
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      await queryClient.refetchQueries({ queryKey: ["/api/auth/user"] });
      
      // Small delay to ensure state updates, then reload to trigger auth check
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to complete onboarding",
        variant: "destructive",
      });
    },
  });

  const handleComplete = () => {
    if (!name.trim()) {
      return;
    }
    completeOnboarding.mutate();
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-chart-2/10 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Welcome to Lighter
            </h1>
            <p className="text-xl text-foreground font-medium">
              Become Lighter
            </p>
            <div className="flex items-center justify-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                <span className="text-sm">Emotionally</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm">Energetically</span>
              </div>
              <div className="flex items-center gap-2">
                <ThermometerSun className="w-5 h-5 text-primary" />
                <span className="text-sm">Physically</span>
              </div>
            </div>
          </div>

          <Card className="p-8 space-y-6 text-left">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">This is NOT a diet app</h2>
              <p className="text-muted-foreground leading-relaxed">
                We track energy first. Weight loss is just a side effect of a healthy, healed metabolism.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Your body knows what it needs. We help you discover it through personalized experiments and tracking what makes YOU feel lighter.
              </p>
            </div>

            <Button 
              onClick={() => setStep(2)} 
              className="w-full bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 transition-opacity"
              size="lg"
              data-testid="button-get-started"
            >
              Get Started
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-chart-2/10 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">What should we call you?</h2>
            <p className="text-muted-foreground">Let's personalize your experience</p>
          </div>

          <Card className="p-8 space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-base">Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-base"
                data-testid="input-name"
              />
            </div>

            <Button 
              onClick={() => {
                if (name.trim()) {
                  setStep(3);
                }
              }}
              disabled={!name.trim()}
              className="w-full bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 transition-opacity"
              size="lg"
              data-testid="button-continue-name"
            >
              Continue
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-chart-2/10 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Quick Metabolic Assessment</h2>
          <p className="text-muted-foreground">
            Select any symptoms you're currently experiencing
          </p>
        </div>

        <Card className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
          <div className="space-y-4">
            {SYMPTOMS.map((symptom) => (
              <div key={symptom} className="flex items-start space-x-3 p-3 rounded-lg hover-elevate">
                <Checkbox
                  id={symptom}
                  checked={symptoms.includes(symptom)}
                  onCheckedChange={() => handleSymptomToggle(symptom)}
                  data-testid={`checkbox-${symptom.toLowerCase().replace(/\s+/g, "-")}`}
                />
                <Label 
                  htmlFor={symptom} 
                  className="text-sm font-normal cursor-pointer leading-relaxed"
                >
                  {symptom}
                </Label>
              </div>
            ))}
          </div>

          <div className="pt-4 space-y-3">
            <Button 
              onClick={handleComplete}
              className="w-full bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 transition-opacity"
              size="lg"
              data-testid="button-complete-onboarding"
            >
              Complete Setup
            </Button>
            <Button 
              onClick={handleComplete}
              variant="ghost"
              className="w-full"
              data-testid="button-skip-assessment"
            >
              Skip for now
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
