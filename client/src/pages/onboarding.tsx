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
      const res = await apiRequest("POST", "/api/user/onboarding", {
        name: name.trim(),
        symptoms: symptoms,
      });
      return await res.json();
    },
    onSuccess: async () => {
      // Invalidate and refetch user data - Router will automatically update when query completes
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      await queryClient.refetchQueries({ queryKey: ["/api/auth/user"] });
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
        <div className="w-full max-w-4xl mx-auto px-4 md:px-6 space-y-8">
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Welcome to Lighter™
            </h1>
          </div>

          <Card className="p-6 space-y-6 text-left bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20">
            <div className="space-y-4">
              <p className="text-lg font-semibold text-foreground leading-relaxed">
                Your journey to a calmer, clearer, more energized body starts here.
              </p>
              
              <p className="text-base text-foreground leading-relaxed">
                Lighter is built to help you understand your metabolism, lower stress, and feel better from the inside out — gently, naturally, and without dieting.
              </p>
              
              <p className="text-base text-muted-foreground leading-relaxed">
                Before you start tracking, we'll take 60 seconds to get to know you so your experience is personalized and your dashboard reflects exactly what you want to improve.
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
        <div className="w-full max-w-4xl mx-auto px-4 md:px-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">What should we call you?</h2>
            <p className="text-muted-foreground">Let's personalize your experience</p>
          </div>

          <Card className="p-6 space-y-6 bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20">
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
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Quick Metabolic Assessment</h2>
          <p className="text-muted-foreground">
            Select any symptoms you're currently experiencing
          </p>
        </div>

        <Card className="p-6 space-y-6 max-h-[600px] overflow-y-auto bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20">
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
