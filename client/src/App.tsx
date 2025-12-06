import { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { BottomNav } from "@/components/BottomNav";
import Landing from "@/pages/landing";
import Onboarding from "@/pages/onboarding";
import Dashboard from "@/pages/dashboard";
import Learn from "@/pages/learn";
import LearnEnergyBasics from "@/pages/learn-energy-basics";
import LearnStressPhysiology from "@/pages/learn-stress-physiology";
import LearnFoodFoundations from "@/pages/learn-food-foundations";
import LearnWarmthVitals from "@/pages/learn-warmth-vitals";
import LearnHealingTools from "@/pages/learn-healing-tools";
import LearnHormones from "@/pages/learn-hormones";
import LearnSleep from "@/pages/learn-sleep";
import LearnDigestion from "@/pages/learn-digestion";
import LearnMovement from "@/pages/learn-movement";
import LearnSupplements from "@/pages/learn-supplements";
import LearnFoodLists from "@/pages/learn-food-lists";
import LearnFAQs from "@/pages/learn-faqs";
import Track from "@/pages/track";
import Experiments from "@/pages/experiments";
import ExperimentDetail from "@/pages/experiments/experiment-detail";
import ExperimentSummary from "@/pages/experiments/summary";
import Messages from "@/pages/messages";
import Essentials from "@/pages/essentials";
import AdminMessages from "@/pages/admin-messages";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-chart-2/10">
        <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" data-testid="spinner-loading" />
      </div>
    );
  }

  // Show landing page if not authenticated
  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route component={Landing} />
      </Switch>
    );
  }

  // Show onboarding if user hasn't completed it
  if (!user?.onboardingCompleted) {
    return <Onboarding />;
  }

  // Show main app with bottom navigation
  return (
    <div className="min-h-screen">
      <Switch>
        <Route path="/" component={Track} />
        <Route path="/track" component={Track} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/experiments" component={Experiments} />
        <Route path="/experiments/:id" component={ExperimentDetail} />
        <Route path="/experiments/summary" component={ExperimentSummary} />
        <Route path="/learn" component={Learn} />
        <Route path="/learn-energy-basics" component={LearnEnergyBasics} />
        <Route path="/learn-stress-physiology" component={LearnStressPhysiology} />
        <Route path="/learn-food-foundations" component={LearnFoodFoundations} />
        <Route path="/learn-warmth-vitals" component={LearnWarmthVitals} />
        <Route path="/learn-healing-tools" component={LearnHealingTools} />
        <Route path="/learn-hormones" component={LearnHormones} />
        <Route path="/learn-sleep" component={LearnSleep} />
        <Route path="/learn-digestion" component={LearnDigestion} />
        <Route path="/learn-movement" component={LearnMovement} />
        <Route path="/learn-supplements" component={LearnSupplements} />
        <Route path="/learn-food-lists" component={LearnFoodLists} />
        <Route path="/learn-faqs" component={LearnFAQs} />
        <Route path="/messages" component={Messages} />
        <Route path="/essentials" component={Essentials} />
        <Route path="/landing" component={Landing} />
        <Route path="/admin/messages" component={AdminMessages} />
        <Route component={NotFound} />
      </Switch>
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
