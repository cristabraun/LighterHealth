// Onboarding page updated to match the dark Lighter™ landing page theme.
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, ChevronRight } from "lucide-react";

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
      <div className="min-h-screen bg-[#0f0f11] text-white font-sans selection:bg-white/20 selection:text-white overflow-x-hidden relative flex flex-col items-center justify-center p-4 sm:p-6">
        {/* Ambient glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-transparent rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-orange-600/10 to-transparent rounded-full blur-[100px]" />
        </div>

        {/* Subtle animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-2 h-2 bg-amber-400/20 rounded-full animate-pulse" style={{ top: '15%', left: '10%', animationDelay: '0s' }} />
          <div className="absolute w-1.5 h-1.5 bg-orange-400/15 rounded-full animate-pulse" style={{ top: '70%', left: '85%', animationDelay: '0.5s' }} />
          <div className="absolute w-1 h-1 bg-yellow-400/15 rounded-full animate-pulse" style={{ top: '80%', left: '20%', animationDelay: '1s' }} />
          <div className="absolute w-2 h-2 bg-amber-500/15 rounded-full animate-pulse" style={{ top: '25%', left: '75%', animationDelay: '1.5s' }} />
        </div>

        <div className="w-full max-w-xl mx-auto relative z-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center border border-amber-500/20">
              <Sparkles className="h-8 w-8 text-amber-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter text-center mb-4">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-amber-300 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Lighter™
            </span>
          </h1>

          {/* Card container - dark translucent */}
          <div className="mt-8 p-6 sm:p-8 md:p-10 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/10 shadow-2xl">
            <div className="space-y-5">
              <p className="text-lg sm:text-xl font-medium text-amber-100/90 leading-relaxed">
                Your journey to a calmer, clearer, more energized body starts here.
              </p>
              
              <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                Lighter is built to help you understand your metabolism, lower stress, and feel better from the inside out — gently, naturally, and without dieting.
              </p>
              
              <p className="text-sm sm:text-base text-white/50 leading-relaxed">
                Before you start tracking, we'll take 60 seconds to get to know you so your experience is personalized and your dashboard reflects exactly what you want to improve.
              </p>
            </div>

            <Button 
              onClick={() => setStep(2)} 
              className="w-full mt-8 h-12 sm:h-14 text-base sm:text-lg font-medium bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:via-orange-400 hover:to-amber-500 text-white border-0 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
              size="lg"
              data-testid="button-get-started"
            >
              Get Started
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-[#0f0f11] text-white font-sans selection:bg-white/20 selection:text-white overflow-x-hidden relative flex flex-col items-center justify-center p-4 sm:p-6">
        {/* Ambient glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-transparent rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-orange-600/10 to-transparent rounded-full blur-[100px]" />
        </div>

        {/* Subtle animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-2 h-2 bg-amber-400/20 rounded-full animate-pulse" style={{ top: '20%', left: '15%', animationDelay: '0s' }} />
          <div className="absolute w-1.5 h-1.5 bg-orange-400/15 rounded-full animate-pulse" style={{ top: '65%', left: '80%', animationDelay: '0.5s' }} />
        </div>

        <div className="w-full max-w-xl mx-auto relative z-10">
          {/* Step indicator */}
          <div className="flex justify-center gap-2 mb-8">
            <div className="w-8 h-1 rounded-full bg-amber-500" />
            <div className="w-8 h-1 rounded-full bg-amber-500" />
            <div className="w-8 h-1 rounded-full bg-white/20" />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-2">
              What should we call you?
            </h2>
            <p className="text-white/60">Let's personalize your experience</p>
          </div>

          {/* Card container */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/10 shadow-2xl">
            <div className="space-y-4">
              <Label htmlFor="name" className="text-base text-white/80">Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 text-base bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-amber-500/50 focus:ring-amber-500/20"
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
              className="w-full mt-6 h-12 sm:h-14 text-base sm:text-lg font-medium bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:via-orange-400 hover:to-amber-500 text-white border-0 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 disabled:opacity-50 disabled:shadow-none"
              size="lg"
              data-testid="button-continue-name"
            >
              Continue
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white font-sans selection:bg-white/20 selection:text-white overflow-x-hidden relative flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-orange-600/10 to-transparent rounded-full blur-[100px]" />
      </div>

      {/* Subtle animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-2 h-2 bg-amber-400/20 rounded-full animate-pulse" style={{ top: '10%', left: '20%', animationDelay: '0s' }} />
        <div className="absolute w-1.5 h-1.5 bg-orange-400/15 rounded-full animate-pulse" style={{ top: '75%', left: '85%', animationDelay: '0.5s' }} />
      </div>

      <div className="w-full max-w-xl mx-auto relative z-10">
        {/* Step indicator */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-8 h-1 rounded-full bg-amber-500" />
          <div className="w-8 h-1 rounded-full bg-amber-500" />
          <div className="w-8 h-1 rounded-full bg-amber-500" />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-2">
            Quick Metabolic Assessment
          </h2>
          <p className="text-white/60">
            Select any symptoms you're currently experiencing
          </p>
        </div>

        {/* Card container */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/10 shadow-2xl max-h-[60vh] overflow-y-auto">
          <div className="space-y-3">
            {SYMPTOMS.map((symptom) => (
              <div 
                key={symptom} 
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer"
                onClick={() => handleSymptomToggle(symptom)}
              >
                <Checkbox
                  id={symptom}
                  checked={symptoms.includes(symptom)}
                  onCheckedChange={() => handleSymptomToggle(symptom)}
                  className="border-white/30 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                  data-testid={`checkbox-${symptom.toLowerCase().replace(/\s+/g, "-")}`}
                />
                <Label 
                  htmlFor={symptom} 
                  className="text-sm sm:text-base font-normal cursor-pointer leading-relaxed text-white/80"
                >
                  {symptom}
                </Label>
              </div>
            ))}
          </div>

          <div className="pt-6 space-y-3">
            <Button 
              onClick={handleComplete}
              className="w-full h-12 sm:h-14 text-base sm:text-lg font-medium bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:via-orange-400 hover:to-amber-500 text-white border-0 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
              size="lg"
              data-testid="button-complete-onboarding"
            >
              Complete Setup
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={handleComplete}
              variant="ghost"
              className="w-full text-white/60 hover:text-white hover:bg-white/5"
              data-testid="button-skip-assessment"
            >
              Skip for now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
