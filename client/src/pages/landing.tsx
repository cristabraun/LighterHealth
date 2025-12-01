import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Heart, Zap, ThermometerSun, TrendingUp, Calendar, Beaker, Lightbulb, Check } from "lucide-react";
import cristaPhoto from "@assets/Blue and Yellow Instagram Profile Picture_1764221887753.png";
import lighterIcon from "@assets/IMG_4823_1764541165994.JPG?url";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-chart-2/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <img 
                src={lighterIcon} 
                alt="Lighter App Icon" 
                className="w-28 h-28 mx-auto mb-2 rounded-xl shadow-md"
                data-testid="image-app-icon"
              />
              
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent pb-1 mt-4" data-testid="heading-hero">
                Feel Good in Your Body Again.
              </h1>
              
              <p className="text-xl lg:text-2xl font-semibold text-foreground" data-testid="text-tagline">
                Understand your body, lower stress, and restore your energy through simple daily tracking and personalized insights inside the Lighter™ app.
              </p>
            </div>

            <div className="space-y-6 max-w-2xl mx-auto" data-testid="section-benefits">
              <div className="text-center mb-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide" data-testid="label-benefits">What Lighter™ Improves</p>
              </div>
              <div className="flex gap-4 text-left">
                <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-1" data-testid="icon-benefit-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Lower stress</h3>
                  <p className="text-muted-foreground">Feel calmer and more grounded throughout the day.</p>
                </div>
              </div>
              <div className="flex gap-4 text-left">
                <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-1" data-testid="icon-benefit-2" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Increase energy & wellbeing</h3>
                  <p className="text-muted-foreground">Restore steady, natural energy without stimulants or burnout.</p>
                </div>
              </div>
              <div className="flex gap-4 text-left">
                <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-1" data-testid="icon-benefit-3" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Let weight come off gently</h3>
                  <p className="text-muted-foreground">Support your metabolism so weight loss becomes effortless, not stressful.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-4">
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
                  Start Your 3-Day Trial
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2.5" data-testid="text-microcopy">
                  Cancel anytime. First 3 days free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-8 border-b border-border/40" data-testid="section-features">
        <div className="bg-primary/5 rounded-lg p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3" data-testid="card-feature-track">
              <TrendingUp className="w-8 h-8 text-primary flex-shrink-0" data-testid="icon-track" />
              <h3 className="text-lg font-bold text-foreground" data-testid="heading-track">Track Your Body's Signals</h3>
              <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-track">
                See how your temperature, pulse, sleep, and daily habits affect your energy and stress.
              </p>
            </div>

            <div className="flex flex-col gap-3" data-testid="card-feature-experiments">
              <Beaker className="w-8 h-8 text-primary flex-shrink-0" data-testid="icon-experiments" />
              <h3 className="text-lg font-bold text-foreground" data-testid="heading-experiments">Run Gentle Experiments</h3>
              <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-experiments">
                Find out which foods, routines, and rhythms your body actually responds well to.
              </p>
            </div>

            <div className="flex flex-col gap-3" data-testid="card-feature-insights">
              <Lightbulb className="w-8 h-8 text-primary flex-shrink-0" data-testid="icon-insights" />
              <h3 className="text-lg font-bold text-foreground" data-testid="heading-insights">Get Insights & Recommendations</h3>
              <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-insights">
                Always know your next step with simple, personalized guidance based on your vitals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 border-b border-border/40" data-testid="section-value">
        <Card className="p-12 space-y-8 bg-gradient-to-br from-primary/5 to-chart-2/5 border-2 border-border/30">
          <h2 className="text-3xl font-bold text-center" data-testid="heading-value">Your Daily Metabolism Support System — Right in Your Pocket</h2>
          <div className="space-y-6">
            <p className="text-xl text-center text-muted-foreground leading-relaxed" data-testid="text-value-intro">
              For the price of a streaming subscription, get personalized metabolic health coaching every single day.
            </p>
            
            <div className="space-y-1" data-testid="section-comparisons">
              <div className="flex items-center justify-between py-2 px-3 border-b border-border/30 text-muted-foreground">
                <span className="text-sm">Netflix Premium</span>
                <span className="font-medium text-sm">$23/mo</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 border-b border-border/30 text-muted-foreground">
                <span className="text-sm">YouTube Premium</span>
                <span className="font-medium text-sm">$18/mo</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 border-b border-border/30 text-muted-foreground">
                <span className="text-sm">Spotify Premium</span>
                <span className="font-medium text-sm">$12/mo</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 border-b border-border/30 text-muted-foreground">
                <span className="text-sm">One coaching session</span>
                <span className="font-medium text-sm">$100+</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 border-b border-border/30 text-muted-foreground">
                <span className="text-sm">Nutritionist consult</span>
                <span className="font-medium text-sm">$150+</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 bg-primary/10 rounded-md border border-primary/20">
                <span className="text-sm font-bold text-foreground">Lighter™ (daily support)</span>
                <span className="font-bold text-primary text-sm">$19/mo</span>
              </div>
            </div>

            <div className="pt-8 mt-4 space-y-0">
              <p className="text-center text-lg font-medium mb-6" data-testid="text-value-what-you-get">
                What you get with Lighter™:
              </p>
              <div className="space-y-0">
                <div className="flex gap-3 py-4 border-b border-border/30 last:border-b-0">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-feature-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Daily vital tracking with smart insights</h4>
                    <p className="text-muted-foreground text-sm">Understand your energy, stress, and metabolic patterns with simple daily check-ins.</p>
                  </div>
                </div>
                <div className="flex gap-3 py-4 border-b border-border/30 last:border-b-0">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-feature-2" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Personalized experiment recommendations</h4>
                    <p className="text-muted-foreground text-sm">Find what works for your body with guided, gentle metabolic experiments.</p>
                  </div>
                </div>
                <div className="flex gap-3 py-4 border-b border-border/30 last:border-b-0">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-feature-3" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Science-backed metabolic protocols</h4>
                    <p className="text-muted-foreground text-sm">Follow simple, proven steps that support thyroid health, lower stress, and boost energy.</p>
                  </div>
                </div>
                <div className="flex gap-3 py-4 border-b border-border/30 last:border-b-0">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-feature-4" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Direct messaging for questions</h4>
                    <p className="text-muted-foreground text-sm">Get personalized support when you need clarity or encouragement.</p>
                  </div>
                </div>
                <div className="flex gap-3 py-4 border-b border-border/30 last:border-b-0">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-feature-5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Beautiful progress charts and trends</h4>
                    <p className="text-muted-foreground text-sm">See your improvements over time so you stay motivated and confident.</p>
                  </div>
                </div>
                <div className="flex gap-3 py-4">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-feature-6" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Educational metabolic library</h4>
                    <p className="text-muted-foreground text-sm">Learn the "why" behind your symptoms, hunger, energy shifts, and mood changes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Social Proof Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 border-b border-border/40" data-testid="section-trust">
        <Card className="p-12 space-y-8 bg-gradient-to-br from-primary/5 to-chart-2/5 border-2 border-border/30">
          <h2 className="text-3xl font-bold text-center" data-testid="heading-trust">Why You Can Trust Lighter™</h2>
          <div className="space-y-0">
            <div className="flex gap-3 py-5 border-b border-border/30 last:border-b-0">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-trust-1" />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">15+ years in fitness & women's health</h4>
                <p className="text-muted-foreground text-sm">Crista has spent more than a decade helping women understand their bodies, build strength, and finally feel good from the inside out. She knows the frustration of endless research, trial and error, and the emotional toll it takes. Lighter™ was created to save you that struggle and give you clear answers that actually help.</p>
              </div>
            </div>
            <div className="flex gap-3 py-5 border-b border-border/30 last:border-b-0">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-trust-2" />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Certified nutritional consultant with real-world experience</h4>
                <p className="text-muted-foreground text-sm">Her approach blends physiology, stress science, and practical nutrition — grounded in both education and lived experience.</p>
              </div>
            </div>
            <div className="flex gap-3 py-5">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-trust-3" />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Worked with dozens of women just like you</h4>
                <p className="text-muted-foreground text-sm">From fatigue and cravings to stress weight and metabolic confusion, Crista has supported many women through the exact struggles Lighter™ is designed to help with.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Who Lighter Is For Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 border-b border-border/40" data-testid="section-who-is-for">
        <Card className="p-12 space-y-8 bg-gradient-to-br from-primary/5 to-chart-2/5 border-2 border-border/30">
          <h2 className="text-3xl font-bold text-center" data-testid="heading-who-is-for">Who Lighter™ Is For</h2>
          <div className="space-y-0">
            <div className="flex gap-3 py-4 border-b border-border/30">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-for-1" />
              <p className="text-muted-foreground text-sm">You feel tired, cold, wired, stressed, or "not yourself," and nothing seems to help.</p>
            </div>
            <div className="flex gap-3 py-4 border-b border-border/30">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-for-2" />
              <p className="text-muted-foreground text-sm">You've dieted for years and feel like you've damaged your metabolism.</p>
            </div>
            <div className="flex gap-3 py-4 border-b border-border/30">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-for-3" />
              <p className="text-muted-foreground text-sm">You've over-exercised or pushed too hard — and now your body isn't responding like it used to.</p>
            </div>
            <div className="flex gap-3 py-4 border-b border-border/30">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-for-4" />
              <p className="text-muted-foreground text-sm">You struggle with low energy, mood swings, cravings, or nighttime eating.</p>
            </div>
            <div className="flex gap-3 py-4 border-b border-border/30">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-for-5" />
              <p className="text-muted-foreground text-sm">You feel overwhelmed, on edge, or like you're "about to lose it" far too often.</p>
            </div>
            <div className="flex gap-3 py-4 border-b border-border/30">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-for-6" />
              <p className="text-muted-foreground text-sm">You wake up tired or have trouble sleeping deeply and recovering.</p>
            </div>
            <div className="flex gap-3 py-4 border-b border-border/30">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-for-7" />
              <p className="text-muted-foreground text-sm">You want gentle, sustainable weight loss without wrecking your hormones or metabolism.</p>
            </div>
            <div className="flex gap-3 py-4 border-b border-border/30">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-for-8" />
              <p className="text-muted-foreground text-sm">You want to understand what your body is actually telling you.</p>
            </div>
            <div className="flex gap-3 py-4">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-for-9" />
              <p className="text-muted-foreground text-sm">You're ready for a calmer, warmer, more energized version of yourself.</p>
            </div>
          </div>
        </Card>
      </div>

      {/* About Me Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 border-b border-border/40" data-testid="section-about">
        <Card className="p-12 space-y-6 bg-gradient-to-br from-primary/5 to-chart-2/5 border-2 border-border/30">
          <div className="flex flex-col items-center gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/20 to-chart-2/20 flex-shrink-0" data-testid="image-crista">
              <img 
                src={cristaPhoto} 
                alt="Crista"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold text-center" data-testid="heading-about">Hi, I'm Crista</h2>
          </div>
          <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
            <p data-testid="text-about-1">
              I've been where you are — exhausted, anxious, trying to "be good" all day only to lose control at night. I spent years over-exercising, restricting, chasing every new diet trend, and wondering why my body kept fighting me.
            </p>
            
            <p data-testid="text-about-2" className="font-medium text-foreground">
              It wasn't lack of discipline.
              <br />
              My metabolism was stressed and confused.
            </p>
            
            <p data-testid="text-about-3">
              I know what it's like to wake up with anxiety, to feel wired and tired at the same time, to run on stress hormones instead of real energy. I ignored the signs for far too long.
            </p>
            
            <p data-testid="text-about-4">
              When I discovered the pro-metabolic approach, everything clicked. My body wasn't broken — it just needed support, not punishment.
            </p>
            
            <p data-testid="text-about-5">
              Lighter™ is everything I wish I had years ago: a simple, gentle way to understand your body, support your energy, and finally feel good again.
            </p>
            
            <p data-testid="text-about-6" className="font-medium text-foreground pt-4">
              You deserve to feel warm, rested, nourished, and alive. And you deserve a path that actually works — not one that breaks you.
            </p>
            
            <p data-testid="text-about-signature" className="text-right pt-2 flex items-center justify-end gap-2" style={{ fontFamily: "'Architects Daughter', cursive", fontSize: '1.375rem', fontWeight: '400', letterSpacing: '0.08em' }}>
              Xo, Crista
              <Heart className="w-4 h-4 text-primary fill-primary" />
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
          Start Your 3-Day Trial
        </Button>
      </div>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-8 pb-12 text-center" data-testid="footer">
        <p className="text-sm text-muted-foreground" data-testid="text-disclaimer">
          Lighter™ provides wellness and lifestyle guidance and does not provide medical advice.
        </p>
      </footer>
    </div>
  );
}
