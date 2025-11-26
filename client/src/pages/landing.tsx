import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Heart, Zap, ThermometerSun, TrendingUp, Calendar } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-chart-2/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center gap-3 text-5xl lg:text-6xl">
                <span>☀️</span>
                <span>🌿</span>
                <span>✨</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight" data-testid="heading-hero">
                Welcome to Lighter
              </h1>
              
              <p className="text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent" data-testid="text-tagline">
                Restore your energy & metabolism
              </p>
            </div>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-description">
              Feel like you again using carbs, sugar, warmth, and gentle movement — the pro-metabolic way.
            </p>

            <div className="space-y-3 max-w-2xl mx-auto" data-testid="section-benefits">
              <div className="flex items-start justify-start gap-3 text-foreground pl-6 pt-1">
                <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-benefit-1" />
                <span className="text-lg font-medium">Lower stress</span>
              </div>
              <div className="flex items-start justify-start gap-3 text-foreground pl-6 pt-1">
                <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-benefit-2" />
                <span className="text-lg font-medium">Increase energy & wellbeing</span>
              </div>
              <div className="flex items-start justify-start gap-3 text-foreground pl-6 pt-1">
                <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-benefit-3" />
                <span className="text-lg font-medium">Let weight come off gently</span>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <h2 className="text-2xl lg:text-3xl font-bold" data-testid="heading-cta-main">
                Are you ready to feel lighter?
              </h2>
              
              <div className="flex flex-col items-center gap-4" data-testid="section-pricing">
                <div className="space-y-2">
                  <p className="text-muted-foreground">Your metabolic healing guide for</p>
                  <span className="text-4xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">$19/month</span>
                </div>
                <Button 
                  onClick={() => window.location.href = '/api/login'}
                  className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 transition-opacity"
                  data-testid="button-get-started"
                >
                  Start Your Journey
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16" data-testid="section-features">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-8 space-y-4" data-testid="card-feature-track">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" data-testid="icon-track" />
            </div>
            <h3 className="text-xl font-semibold" data-testid="heading-track">Track Your Vitals</h3>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-track">
              Monitor morning temperature, pulse, energy, sleep, and digestion. See patterns emerge over time with beautiful charts.
            </p>
          </Card>

          <Card className="p-8 space-y-4" data-testid="card-feature-experiments">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" data-testid="icon-experiments" />
            </div>
            <h3 className="text-xl font-semibold" data-testid="heading-experiments">Run Experiments</h3>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-experiments">
              Try science-backed protocols like the 7-Day Carrot Salad or Daily Orange Juice. Track what works for YOUR body.
            </p>
          </Card>

          <Card className="p-8 space-y-4" data-testid="card-feature-insights">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" data-testid="icon-insights" />
            </div>
            <h3 className="text-xl font-semibold" data-testid="heading-insights">Get Insights</h3>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-insights">
              Receive personalized experiment recommendations based on your vitals. Celebrate milestones and metabolic wins.
            </p>
          </Card>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="max-w-4xl mx-auto px-6 py-16" data-testid="section-value">
        <Card className="p-12 space-y-8 bg-gradient-to-br from-primary/5 to-chart-2/5">
          <h2 className="text-3xl font-bold text-center" data-testid="heading-value">Your Coach in Your Pocket</h2>
          <div className="space-y-6">
            <p className="text-xl text-center text-muted-foreground leading-relaxed" data-testid="text-value-intro">
              For the price of a streaming subscription, get personalized metabolic health coaching every single day.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 text-muted-foreground" data-testid="section-comparisons">
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span>Netflix Premium</span>
                  <span className="font-semibold">$23/mo</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span>YouTube Premium</span>
                  <span className="font-semibold">$18/mo</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span>Spotify Premium</span>
                  <span className="font-semibold">$12/mo</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span>One health coaching session</span>
                  <span className="font-semibold">$100+</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span>Nutritionist consultation</span>
                  <span className="font-semibold">$150+</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-primary/50 bg-primary/5">
                  <span className="font-semibold text-foreground">Lighter (unlimited coaching)</span>
                  <span className="font-bold text-primary">$19/mo</span>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <p className="text-center text-lg font-medium" data-testid="text-value-what-you-get">
                What you get with Lighter:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  <span>Daily vital tracking with smart insights</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  <span>Personalized experiment recommendations</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  <span>Science-backed metabolic protocols</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  <span>Direct messaging for questions</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  <span>Beautiful progress charts and trends</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  <span>Educational library on metabolic health</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Philosophy Section */}
      <div className="max-w-4xl mx-auto px-6 py-16" data-testid="section-philosophy">
        <Card className="p-12 space-y-6 bg-gradient-to-br from-primary/5 to-chart-2/5">
          <h2 className="text-3xl font-bold text-center" data-testid="heading-philosophy">Not a Diet App</h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p data-testid="text-philosophy-1">
              We track energy first. Weight loss is just a side effect of a healthy, healed metabolism.
            </p>
            <p data-testid="text-philosophy-2">
              Your body knows what it needs. We help you discover it through personalized experiments and tracking what makes YOU feel lighter.
            </p>
          </div>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center" data-testid="section-cta">
        <h2 className="text-3xl font-bold mb-6" data-testid="heading-cta">Ready to Feel Lighter?</h2>
        <Button 
          onClick={() => window.location.href = '/api/login'}
          className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 transition-opacity"
          data-testid="button-cta-login"
        >
          Start Your Journey
        </Button>
      </div>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-8 pb-12 text-center" data-testid="footer">
        <p className="text-sm text-muted-foreground" data-testid="text-disclaimer">
          Lighter provides wellness and lifestyle guidance and does not provide medical advice.
        </p>
      </footer>
    </div>
  );
}
