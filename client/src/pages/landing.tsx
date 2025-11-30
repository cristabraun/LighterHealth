import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Heart, Zap, ThermometerSun, TrendingUp, Calendar } from "lucide-react";
import cristaPhoto from "@assets/Blue and Yellow Instagram Profile Picture_1764221887753.png";
import lighterIcon from "@assets/IMG_4823_1764541165994.JPG?url";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-chart-2/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent pb-1" data-testid="heading-hero">
                Welcome to Lighter™
              </h1>
              
              <div className="flex justify-center py-6">
                <img 
                  src={lighterIcon} 
                  alt="Lighter App Icon" 
                  className="w-48 h-48"
                  data-testid="image-app-icon"
                />
              </div>
              
              <p className="text-2xl lg:text-3xl font-semibold text-foreground" data-testid="text-tagline">
                Your gentle space for restoring energy, wellbeing & healing your metabolism.
              </p>
            </div>

            <Card className="p-6 bg-primary/5 border border-primary/20 max-w-3xl mx-auto" data-testid="text-hero-box">
              <p className="text-lg lg:text-xl font-medium text-foreground leading-relaxed" data-testid="text-description">
                Feel lighter, calmer, and more energized every day using carbs, sugar, warmth, and gentle movement — the pro-metabolic way.
              </p>
            </Card>

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
                  Start Your 3-Day Trial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 border-b border-border/40" data-testid="section-features">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-8 space-y-4 border-2 border-border/30 hover-elevate transition-all" data-testid="card-feature-track">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" data-testid="icon-track" />
            </div>
            <h3 className="text-xl font-semibold" data-testid="heading-track">Track Your Temperature, Pulse, Sleep & Energy</h3>
            <div className="space-y-3 text-muted-foreground leading-relaxed" data-testid="text-track">
              <p>See what truly supports your body.</p>
              <p className="font-medium text-foreground">Finally understand what your body needs to feel good again.</p>
            </div>
          </Card>

          <Card className="p-8 space-y-4 border-2 border-border/30 hover-elevate transition-all" data-testid="card-feature-experiments">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" data-testid="icon-experiments" />
            </div>
            <h3 className="text-xl font-semibold" data-testid="heading-experiments">Run Gentle Experiments</h3>
            <div className="space-y-3 text-muted-foreground leading-relaxed" data-testid="text-experiments">
              <p>Discover what works for you and how your body actually responds.</p>
              <p className="font-medium text-foreground">A softer way to get healthy — one that actually works with your body.</p>
            </div>
          </Card>

          <Card className="p-8 space-y-4 border-2 border-border/30 hover-elevate transition-all" data-testid="card-feature-insights">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" data-testid="icon-insights" />
            </div>
            <h3 className="text-xl font-semibold" data-testid="heading-insights">Get Insights & Recommendations</h3>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-insights">
              Based on your vitals, always know your next step in healing your metabolism and restoring energy.
            </p>
          </Card>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 border-b border-border/40" data-testid="section-value">
        <Card className="p-12 space-y-8 bg-gradient-to-br from-primary/5 to-chart-2/5 border-2 border-border/30">
          <h2 className="text-3xl font-bold text-center" data-testid="heading-value">Your Pocket Metabolism Coach</h2>
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
                  <span className="font-semibold text-foreground">Lighter™ (+ private support messaging)</span>
                  <span className="font-bold text-primary">$19/mo</span>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <p className="text-center text-lg font-medium" data-testid="text-value-what-you-get">
                What you get with Lighter™:
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
      <div className="max-w-4xl mx-auto px-6 py-16 border-b border-border/40" data-testid="section-philosophy">
        <Card className="p-12 space-y-6 bg-gradient-to-br from-primary/5 to-chart-2/5 border-2 border-border/30">
          <h2 className="text-3xl font-bold text-center whitespace-nowrap" data-testid="heading-philosophy">The Lighter™ Lifestyle</h2>
          <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
            <p data-testid="text-philosophy-intro" className="font-medium text-foreground">
              Healing your metabolism so your body can produce energy easily again.
            </p>
            <p data-testid="text-philosophy-1">
              Instead of restricting calories, we help your body use them well — supporting your thyroid, lowering stress, and restoring your natural ability to burn fuel.
            </p>
            <p data-testid="text-philosophy-2" className="font-medium text-foreground pt-2">
              Over time, you'll feel real change: steady energy, a calmer mood, deeper vitality, easier weight loss, and finally feeling at home in your body again.
            </p>
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
            <p data-testid="text-about-1" className="font-medium text-foreground">
              I've been where you are.
            </p>
            
            <p data-testid="text-about-2">
              The endless cycle of being "good" all day, then standing in front of the fridge at night, eating everything in sight because your body was screaming for nourishment you kept denying it. The confusion of trying to keep up with every new diet trend, wondering why nothing ever sticks. The hours spent running, training, working out—desperately trying to "earn" your food or burn off yesterday's "mistake."
            </p>
            
            <p data-testid="text-about-3">
              It never worked long term. And it left me exhausted.
            </p>
            
            <p data-testid="text-about-4">
              I know what it's like to wake up with anxiety coursing through your body, your heart pounding in your chest when you're supposed to be sleeping. To feel irritable, foggy, and like you're running on fumes and stress hormones instead of actual energy. I ignored what my body was trying to tell me for way too long.
            </p>
            
            <p data-testid="text-about-5" className="font-medium text-foreground">
              Then I discovered the pro-metabolic approach—and a light went on.
            </p>
            
            <p data-testid="text-about-6">
              My body wasn't broken. My metabolism just needed healing. I realized that all the conventional diet and fitness advice—while it might help you lose weight in the short term—doesn't work long term because it doesn't address the root cause.
            </p>
            
            <p data-testid="text-about-7">
              Now, every day, I see women talking about: "This must be what getting older is like." "I can't sleep well anymore." "I feel drained all the time." "My hair is falling out, my skin is dull." "I'm cold all the time." "I'm not excited about anything anymore."
            </p>
            
            <p data-testid="text-about-8">
              And my heart breaks—because I know there's another way.
            </p>
            
            <p data-testid="text-about-9" className="font-medium text-foreground">
              That's why I created Lighter™.
            </p>
            
            <p data-testid="text-about-10">
              I built this app to help women feel GOOD again. To feel energized, happy, and truly lighter—not just in body, but in spirit. To finally understand how to work WITH their metabolism instead of against it.
            </p>
            
            <p data-testid="text-about-11" className="font-medium text-foreground pt-4">
              You deserve to feel warm, rested, and alive. You deserve to eat without guilt and sleep without anxiety. You deserve to trust your body again.
            </p>
            
            <p data-testid="text-about-12" className="pt-4">
              Let me show you how.
            </p>
            
            <p data-testid="text-about-signature" className="text-right pt-4 flex items-center justify-end gap-2" style={{ fontFamily: "'Architects Daughter', cursive", fontSize: '1.625rem', fontWeight: '400', letterSpacing: '0.08em' }}>
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
