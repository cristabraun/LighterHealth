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
import Home from "@/pages/home";
import Learn from "@/pages/learn";
import Track from "@/pages/track";
import Experiments from "@/pages/experiments";
import Progress from "@/pages/progress";
import Messages from "@/pages/messages";
import Essentials from "@/pages/essentials";
import AdminMessages from "@/pages/admin-messages";
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
    return <Landing />;
  }

  // Show onboarding if user hasn't completed it
  if (!user?.onboardingCompleted) {
    return <Onboarding />;
  }

  // Show main app with bottom navigation
  return (
    <div className="min-h-screen">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/landing" component={Landing} />
        <Route path="/learn" component={Learn} />
        <Route path="/track" component={Track} />
        <Route path="/experiments" component={Experiments} />
        <Route path="/progress" component={Progress} />
        <Route path="/messages" component={Messages} />
        <Route path="/essentials" component={Essentials} />
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
