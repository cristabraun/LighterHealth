import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Heart, Zap, ThermometerSun, TrendingUp, Calendar } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-chart-2/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-white" data-testid="icon-hero-sparkles" />
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent" data-testid="heading-hero">
              Become Lighter
            </h1>
            
            <div className="flex items-center justify-center gap-8 text-muted-foreground flex-wrap" data-testid="section-benefits">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary" data-testid="icon-emotionally" />
                <span className="text-lg">Emotionally</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" data-testid="icon-energetically" />
                <span className="text-lg">Energetically</span>
              </div>
              <div className="flex items-center gap-2">
                <ThermometerSun className="w-6 h-6 text-primary" data-testid="icon-physically" />
                <span className="text-lg">Physically</span>
              </div>
            </div>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-description">
              Track your metabolism, run personalized experiments, and discover what makes YOU feel lighter. This is not a diet app.
            </p>

            <div className="pt-6 space-y-4">
              <div className="flex items-center justify-center gap-2" data-testid="section-pricing">
                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">$19/month</span>
                <span className="text-muted-foreground">— Your metabolic health coach</span>
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
