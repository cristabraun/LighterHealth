import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Heart, Zap, ThermometerSun, TrendingUp, Calendar, Beaker, Lightbulb, Check, Menu, X } from "lucide-react";
import cristaPhoto from "@assets/crista-profile-final.png";
import lighterIcon from "@assets/ChatGPT Image Nov 30, 2025, 08_16_18 PM_1764551798966.png";

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-chart-2/10">
      {/* Header */}
      <header className="header-frosted" data-testid="header-main">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3" data-testid="header-branding">
            <img 
              src={lighterIcon} 
              alt="Lighter App Icon" 
              className="w-12 h-12 rounded-lg shadow-sm"
              data-testid="image-header-icon"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent" data-testid="text-header-brand">
              Lighter™
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" data-testid="nav-header-desktop">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-nav-dashboard">Dashboard</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-nav-learn">Learn</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-nav-track">Track</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-nav-experiments">Experiments</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-nav-essentials">Essentials</a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-foreground/10 rounded-lg transition-colors"
            data-testid="button-mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" data-testid="icon-menu-close" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" data-testid="icon-menu-open" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border/40 bg-white/50 dark:bg-background/50" data-testid="nav-header-mobile">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2" data-testid="link-mobile-dashboard">Dashboard</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2" data-testid="link-mobile-learn">Learn</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2" data-testid="link-mobile-track">Track</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2" data-testid="link-mobile-experiments">Experiments</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2" data-testid="link-mobile-essentials">Essentials</a>
            </div>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-10 lg:py-14">
          <div className="text-center space-y-8">
            <div className="space-y-5">
              <h1 className="page-title text-5xl lg:text-6xl" data-testid="heading-hero">
                Heal Your Metabolism.
              </h1>
              
              <p className="text-lg lg:text-xl font-medium text-foreground" data-testid="text-tagline">
                Exhausted all the time? Weight won't budge? Running on stress and caffeine? Your metabolism is struggling. Lighter shows you how to listen to your body, lower cortisol, and find what actually works to feel energized again.
              </p>
            </div>

            <div className="space-y-6 max-w-2xl mx-auto pt-8 border-t border-border/40" data-testid="section-benefits">
              <div className="text-center mb-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide" data-testid="label-benefits">Lighter™ supports:</p>
              </div>
              <div className="flex gap-4 text-left">
                <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-1" data-testid="icon-benefit-1" />
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-0.5">Lowering stress so your body can begin healing.</h3>
                  <p className="text-sm text-muted-foreground">When your nervous system calms down, your metabolism finally shifts out of survival mode and starts working the way it's meant to.</p>
                </div>
              </div>
              <div className="flex gap-4 text-left">
                <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-1" data-testid="icon-benefit-2" />
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-0.5">Giving your body what it needs to thrive.</h3>
                  <p className="text-sm text-muted-foreground">Through simple experiments and daily tracking, you learn which foods, habits, and rhythms actually support your energy, digestion, and mood.</p>
                </div>
              </div>
              <div className="flex gap-4 text-left">
                <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-1" data-testid="icon-benefit-3" />
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-0.5">Strengthening your metabolism so your weight can stabilize naturally.</h3>
                  <p className="text-sm text-muted-foreground">When your body knows how to use energy efficiently again, weight loss becomes a side effect — not a struggle.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8 pt-8 border-t border-border/40">
              <div className="max-w-2xl mx-auto text-center space-y-4">
                <p className="text-base text-foreground leading-relaxed">Lighter™ helps you see what's really been happening beneath the surface.</p>
                <p className="text-base text-muted-foreground leading-relaxed">Your body is always speaking through signals most apps ignore—sleep, temperature, pulse, mood, cravings.</p>
                <p className="text-base text-muted-foreground leading-relaxed">These reveal where stress is hiding and slowing your metabolism down.</p>
                <p className="text-base text-muted-foreground leading-relaxed">The things most diets never taught you to notice.</p>
                <p className="text-base text-foreground font-medium leading-relaxed">Finally understand what your body has been trying to tell you.</p>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex flex-col items-center gap-4" data-testid="section-pricing">
                <div className="space-y-2">
                  <p className="text-muted-foreground">Your metabolic healing guide for</p>
                  <span className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">$19/month</span>
                </div>
                <Button 
                  onClick={() => window.location.href = '/api/login'}
                  className="h-16 px-12 text-xl bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 transition-opacity"
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
      <div className="page-section page-container" data-testid="section-features">
        <div className="bg-slate-50 dark:bg-slate-900/30 rounded-lg p-8">
          <div className="grid-responsive-3">
            <Card className="flex flex-col gap-4 p-6 frosted-glass-warm h-full" data-testid="card-feature-track">
              <TrendingUp className="w-8 h-8 text-primary flex-shrink-0" data-testid="icon-track" />
              <h3 className="text-base font-bold text-foreground" data-testid="heading-track">Track Your Body's Signals</h3>
              <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-track">
                See how your temperature, pulse, sleep, and daily habits affect your energy and stress.
              </p>
            </Card>

            <Card className="flex flex-col gap-4 p-6 frosted-glass-warm h-full" data-testid="card-feature-experiments">
              <Beaker className="w-8 h-8 text-primary flex-shrink-0" data-testid="icon-experiments" />
              <h3 className="text-base font-bold text-foreground" data-testid="heading-experiments">Run Gentle Experiments</h3>
              <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-experiments">
                Find out which foods, routines, and rhythms your body actually responds well to.
              </p>
            </Card>

            <Card className="flex flex-col gap-4 p-6 frosted-glass-warm h-full" data-testid="card-feature-insights">
              <Lightbulb className="w-8 h-8 text-primary flex-shrink-0" data-testid="icon-insights" />
              <h3 className="text-base font-bold text-foreground" data-testid="heading-insights">Get Insights & Recommendations</h3>
              <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-insights">
                Always know your next step with simple, personalized guidance based on your vitals.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="page-section page-container" data-testid="section-value">
        <Card className="card-padding card-spacing frosted-glass-warm">
          <div>
            <h2 className="section-title text-center mb-3" data-testid="heading-value-context">Why Lighter™ Makes Sense</h2>
            <p className="text-center text-base text-muted-foreground leading-relaxed" data-testid="text-value-intro">
              For the price of a streaming subscription, get personalized metabolic health coaching every single day.
            </p>
          </div>
            
          <div className="space-y-0" data-testid="section-comparisons">
            <div className="grid grid-cols-2 gap-4 py-3 px-4 border-b border-border/30 text-muted-foreground">
              <span className="text-sm">Netflix Premium</span>
              <span className="font-medium text-sm text-right">$23/mo</span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3 px-4 border-b border-border/30 text-muted-foreground">
              <span className="text-sm">YouTube Premium</span>
              <span className="font-medium text-sm text-right">$18/mo</span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3 px-4 border-b border-border/30 text-muted-foreground">
              <span className="text-sm">Spotify Premium</span>
              <span className="font-medium text-sm text-right">$12/mo</span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3 px-4 border-b border-border/30 text-muted-foreground">
              <span className="text-sm">One coaching session</span>
              <span className="font-medium text-sm text-right">$100+</span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3 px-4 border-b border-border/30 text-muted-foreground">
              <span className="text-sm">Nutritionist consult</span>
              <span className="font-medium text-sm text-right">$150+</span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3 px-4 bg-primary/10 rounded-md border border-primary/20">
              <span className="text-sm font-bold text-foreground">Lighter™ (daily support)</span>
              <span className="font-bold text-primary text-sm text-right">$19/mo</span>
            </div>
          </div>

            <div className="pt-8 mt-4 space-y-0">
              <p className="text-center text-lg font-medium mb-6" data-testid="text-value-what-you-get">
                What you get with Lighter™:
              </p>
              <div className="space-y-0">
                <div className="flex gap-3 py-3 border-b border-border/30 last:border-b-0">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-feature-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm mb-0.5">Daily vital tracking with smart insights</h4>
                    <p className="text-muted-foreground text-xs">Understand your energy, stress, and metabolic patterns with simple daily check-ins.</p>
                  </div>
                </div>
                <div className="flex gap-3 py-3 border-b border-border/30 last:border-b-0">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-feature-2" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm mb-0.5">Personalized experiment recommendations</h4>
                    <p className="text-muted-foreground text-xs">Find what works for your body with guided, gentle metabolic experiments.</p>
                  </div>
                </div>
                <div className="flex gap-3 py-3 border-b border-border/30 last:border-b-0">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-feature-3" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm mb-0.5">Science-backed metabolic protocols</h4>
                    <p className="text-muted-foreground text-xs">Follow simple, proven steps that support thyroid health, lower stress, and boost energy.</p>
                  </div>
                </div>
                <div className="flex gap-3 py-3 border-b border-border/30 last:border-b-0">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-feature-4" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm mb-0.5">Direct messaging for questions</h4>
                    <p className="text-muted-foreground text-xs">Get personalized support when you need clarity or encouragement.</p>
                  </div>
                </div>
                <div className="flex gap-3 py-3 border-b border-border/30 last:border-b-0">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-feature-5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm mb-0.5">Beautiful progress charts and trends</h4>
                    <p className="text-muted-foreground text-xs">See your improvements over time so you stay motivated and confident.</p>
                  </div>
                </div>
                <div className="flex gap-3 py-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-feature-6" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm mb-0.5">Educational metabolic library</h4>
                    <p className="text-muted-foreground text-xs">Learn the "why" behind your symptoms, hunger, energy shifts, and mood changes.</p>
                  </div>
                </div>
              </div>
            </div>
        </Card>
      </div>

      {/* Screenshots Section */}
      <div className="max-w-6xl mx-auto px-6 py-8" data-testid="section-screenshots">
        <section className="mt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary">
            See Inside the App
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden" data-testid="image-dashboard-preview">
              <img 
                src="/dashboard.png" 
                className="w-full h-auto" 
                alt="Lighter dashboard preview"
              />
            </div>

            <div className="rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden" data-testid="image-track-preview">
              <img 
                src="/track.png" 
                className="w-full h-auto" 
                alt="Lighter tracking preview"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Social Proof Section */}
      <div className="max-w-4xl mx-auto px-6 py-8 border-b border-border/40" data-testid="section-trust">
        <Card className="p-12 space-y-8 bg-slate-50 dark:bg-slate-900/30 border border-border/30">
          <h2 className="text-3xl font-bold text-center" data-testid="heading-trust">Why You Can Trust Lighter™</h2>
          <div className="space-y-0">
            <div className="flex gap-3 py-4 border-b border-border/30 last:border-b-0">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-trust-1" />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground text-sm mb-1">15+ years in fitness & women's health</h4>
                <p className="text-muted-foreground text-sm">Crista has spent more than a decade helping women understand their bodies, build strength, and finally feel good from the inside out. She knows the frustration of endless research, trial and error, and the emotional toll it takes. Lighter™ was created to save you that struggle and give you clear answers that actually help.</p>
              </div>
            </div>
            <div className="flex gap-3 py-4 border-b border-border/30 last:border-b-0">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-trust-2" />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground text-sm mb-1">Certified nutritional consultant with real-world experience</h4>
                <p className="text-muted-foreground text-sm">Her approach blends physiology, stress science, and practical nutrition — grounded in both education and lived experience.</p>
              </div>
            </div>
            <div className="flex gap-3 py-4">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-trust-3" />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground text-sm mb-1">Worked with dozens of women just like you</h4>
                <p className="text-muted-foreground text-sm">From fatigue and cravings to stress weight and metabolic confusion, Crista has supported many women through the exact struggles Lighter™ is designed to help with.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Who Lighter Is For Section */}
      <div className="max-w-4xl mx-auto px-6 py-10 border-b border-border/40" data-testid="section-who-is-for">
        <Card className="p-12 space-y-8 bg-slate-50 dark:bg-slate-900/30 border border-border/30">
          <h2 className="text-3xl font-bold text-center" data-testid="heading-who-is-for">Who Lighter™ Is For</h2>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex gap-3" data-testid="item-for-1">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-for-1" />
              <p className="text-muted-foreground text-sm">You feel tired, cold, wired, stressed, or "not yourself," and nothing seems to help.</p>
            </div>
            <div className="flex gap-3" data-testid="item-for-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-for-2" />
              <p className="text-muted-foreground text-sm">You've dieted for years and feel like you've damaged your metabolism.</p>
            </div>
            <div className="flex gap-3" data-testid="item-for-3">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-for-3" />
              <p className="text-muted-foreground text-sm">You've over-exercised or pushed too hard — and now your body isn't responding like it used to.</p>
            </div>
            <div className="flex gap-3" data-testid="item-for-4">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-for-4" />
              <p className="text-muted-foreground text-sm">You struggle with low energy, mood swings, cravings, or nighttime eating.</p>
            </div>
            <div className="flex gap-3" data-testid="item-for-5">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-for-5" />
              <p className="text-muted-foreground text-sm">You feel overwhelmed, on edge, or like you're "about to lose it" far too often.</p>
            </div>
            <div className="flex gap-3" data-testid="item-for-6">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-for-6" />
              <p className="text-muted-foreground text-sm">You wake up tired or have trouble sleeping deeply and recovering.</p>
            </div>
            <div className="flex gap-3" data-testid="item-for-7">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-for-7" />
              <p className="text-muted-foreground text-sm">You want gentle, sustainable weight loss without wrecking your hormones or metabolism.</p>
            </div>
            <div className="flex gap-3" data-testid="item-for-8">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-for-8" />
              <p className="text-muted-foreground text-sm">You want to understand what your body is actually telling you.</p>
            </div>
            <div className="md:col-span-2 flex gap-3" data-testid="item-for-9">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid="icon-for-9" />
              <p className="text-muted-foreground text-sm">You're ready for a calmer, warmer, more energized version of yourself.</p>
            </div>
          </div>
        </Card>
      </div>

      {/* About Me Section */}
      <div className="max-w-4xl mx-auto px-6 py-10 border-b border-border/40" data-testid="section-about">
        <Card className="p-12 space-y-6 bg-slate-50 dark:bg-slate-900/30 border border-border/30">
          <div className="flex flex-col items-center gap-8">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/50 flex-shrink-0 shadow-md" data-testid="image-crista">
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
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-24 text-center" data-testid="section-cta">
        <h2 className="text-3xl font-bold mb-4" data-testid="heading-cta">Ready to Feel Lighter?</h2>
        <p className="text-base text-muted-foreground mb-8" data-testid="subheading-cta">Start tracking, understanding, and healing your metabolism today.</p>
        <Button 
          onClick={() => window.location.href = '/api/login'}
          className="h-16 px-10 text-lg bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 transition-opacity"
          data-testid="button-cta-login"
        >
          Start Your 3-Day Trial
        </Button>
        <p className="text-xs text-muted-foreground mt-4" data-testid="text-cta-micro">Cancel anytime. No pressure.</p>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/30" data-testid="footer">
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-16 text-center">
          <nav className="flex justify-center gap-8 mb-8 flex-wrap" data-testid="nav-footer">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-dashboard">Dashboard</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-learn">Learn</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-track">Track</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-experiments">Experiments</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-essentials">Essentials</a>
          </nav>
          <p className="text-xs text-muted-foreground" data-testid="text-disclaimer">
            Lighter™ provides wellness and lifestyle guidance and does not provide medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
