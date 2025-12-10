import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Thermometer, Heart, BarChart3, Carrot, FlaskConical, ThermometerSun, MessageCircle, Calendar, BookOpen } from "lucide-react";

export default function StartHere() {
  return (
    <div className="min-h-screen pb-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-8">
        
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-home">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="heading-start-here">
            Welcome to Lighter™ — Start Here
          </h1>
        </div>

        <Card className="p-6 frosted-glass-warm space-y-6" data-testid="card-what-lighter-is">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">What Lighter Is All About</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Lighter helps you heal your metabolism so you can have <strong className="text-foreground">more energy, less stress, better sleep, balanced hormones, and a body that feels good again.</strong>
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              But this is about <strong className="text-foreground">so much more than weight loss.</strong> When your metabolism is healthy, <em>every area of your life improves.</em> You have real energy. Your mood stabilizes. You feel grounded and present. You can show up as your best self—for yourself and for the people you love.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Lighter is about <strong className="text-foreground">reducing stress, slowing down, and making life more enjoyable again.</strong> When you stop forcing your body and start supporting it, everything shifts. You gain patience, clarity, and joy. Life stops feeling like a constant struggle.
            </p>
            
            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <p className="text-sm text-foreground font-medium mb-2">The key difference:</p>
              <p className="text-sm text-muted-foreground">
                Most diets stress your body out—<strong className="text-foreground">fasting, restricting, overtraining.</strong> We do the opposite. <strong className="text-foreground">We give your body what it needs to create energy efficiently so it can actually thrive.</strong>
              </p>
            </div>
            
            <div className="bg-chart-2/10 p-4 rounded-lg border border-chart-2/20">
              <p className="text-foreground font-semibold">Remember:</p>
              <p className="text-muted-foreground">We get healthy so we can lose weight.<br/>We don't lose weight so we can get healthy.</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 frosted-glass-warm space-y-6" data-testid="card-what-we-track">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            What We Track & Why
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-chart-1" />
                Temperature & Pulse
              </h3>
              <p className="text-muted-foreground">These two numbers tell you how well your metabolism is working.</p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-medium text-foreground mb-2">Temperature</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li><strong>Morning:</strong> Moving toward 97.8–98.6°F</li>
                    <li className="text-xs">(Below 97.5°F = sluggish metabolism)</li>
                    <li><strong>Daytime:</strong> Should rise into the high 98s</li>
                  </ul>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    Pulse
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Ideal range: <strong>75–90 bpm</strong></li>
                    <li>Not racing. Not sluggish.</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">What improves both:</strong> Easily digestible carbs, quality protein, and lower stress.
              </p>
            </div>
            
            <div className="border-t border-border pt-4 space-y-4">
              <h3 className="text-lg font-medium text-foreground">Daily Tracking</h3>
              <p className="text-muted-foreground">Log these daily to see patterns:</p>
              
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>Stress levels</li>
                <li>Sleep quality</li>
                <li>Digestion</li>
                <li>Energy</li>
                <li>Food intake</li>
              </ul>
              
              <p className="text-muted-foreground">You'll start clearly seeing:</p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>What makes you feel better</li>
                <li>What drains you</li>
                <li>How stress impacts your body in real time</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-6 frosted-glass-warm space-y-6" data-testid="card-what-to-eat">
          <h2 className="text-xl font-semibold text-foreground">What to Eat</h2>
          <p className="text-muted-foreground">No "good" or "bad" foods—just foods that <strong className="text-foreground">support</strong> or <strong className="text-foreground">stress</strong> your metabolism.</p>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-green-500">Foods to Enjoy More</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <p className="font-medium text-foreground mb-2">Easy proteins</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Dairy (milk, cheese, yogurt, cottage cheese)</li>
                    <li>Eggs</li>
                    <li>Shellfish (oysters, shrimp)</li>
                    <li>White fish</li>
                    <li>Gelatin / collagen</li>
                    <li>Beef liver (1–2x/week)</li>
                  </ul>
                </div>
                
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <p className="font-medium text-foreground mb-2">Metabolism-supporting carbs</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Orange juice</li>
                    <li>Ripe fruit (oranges, pineapple, mango, berries)</li>
                    <li>Honey</li>
                    <li>White rice</li>
                    <li>Potatoes</li>
                    <li>Sourdough bread</li>
                  </ul>
                </div>
                
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <p className="font-medium text-foreground mb-2">Stable fats</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Butter</li>
                    <li>Coconut oil</li>
                    <li>Cream</li>
                    <li>Ghee</li>
                  </ul>
                </div>
                
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <p className="font-medium text-foreground mb-2">Nutrient-dense extras</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Raw carrot salad (carrot + vinegar + salt)</li>
                    <li>Coffee with sugar and milk</li>
                    <li>Dark chocolate (low PUFA)</li>
                    <li>Bone broth</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-amber-500">What to Limit (not eliminate)</h3>
              
              <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Seed oils (canola, soybean, sunflower)</li>
                  <li>Nuts and seeds (high in PUFAs)</li>
                  <li>Fatty pork and chicken (high in PUFAs)</li>
                  <li>Raw leafy greens in excess</li>
                  <li>Fasting or very low-carb diets</li>
                </ul>
              </div>
              
              <Link href="/learn">
                <Button variant="outline" className="gap-2" data-testid="button-learn-more-foods">
                  <BookOpen className="w-4 h-4" />
                  Learn More in the Learn Tab
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <Card className="p-6 frosted-glass-warm space-y-6" data-testid="card-experiments">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-primary" />
            Start With These 3 Experiments
          </h2>
          <p className="text-muted-foreground">Experiments are what make Lighter different. Start with these three:</p>
          
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Carrot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">1. Daily Carrot Salad</h4>
                  <p className="text-sm text-muted-foreground mt-1">Raw carrot + vinegar + salt. Supports estrogen detox, reduces endotoxins, and improves digestion.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="bg-chart-2/20 p-2 rounded-full">
                  <FlaskConical className="w-4 h-4 text-chart-2" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">2. Eliminate PUFAs</h4>
                  <p className="text-sm text-muted-foreground mt-1">Remove seed oils and high-PUFA foods. This is one of the <strong>most powerful metabolism healers.</strong></p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="bg-chart-1/20 p-2 rounded-full">
                  <ThermometerSun className="w-4 h-4 text-chart-1" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">3. Track Temperature After Meals</h4>
                  <p className="text-sm text-muted-foreground mt-1">Take your temp 30–60 minutes after eating. If it rises → that food supports your metabolism. If it drops → that food may be stressing your system.</p>
                </div>
              </div>
            </div>
          </div>
          
          <Link href="/experiments">
            <Button className="w-full bg-gradient-to-r from-primary to-chart-2 text-primary-foreground" data-testid="button-view-experiments">
              View All Experiments
            </Button>
          </Link>
        </Card>

        <Card className="p-6 frosted-glass-warm space-y-6" data-testid="card-first-steps">
          <h2 className="text-xl font-semibold text-foreground">Your First Steps</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h4 className="font-medium text-foreground">Log Your Food Daily</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>Focus on <strong>adding pro-metabolic foods first</strong></li>
                  <li>Don't obsess over calories yet</li>
                  <li>Make notes on how foods make you feel</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h4 className="font-medium text-foreground">Track Your Vitals Consistently</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>Temperature (morning + afternoon)</li>
                  <li>Pulse</li>
                  <li>Digestion, Stress, Energy, Sleep</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h4 className="font-medium text-foreground">Start Experimenting</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>Pick 1–2 experiments at a time</li>
                  <li>Log what you notice</li>
                  <li>Stay curious</li>
                  <li><strong>You're your own best biohacker</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 frosted-glass-warm space-y-4" data-testid="card-need-help">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Need Help?
          </h2>
          
          <div className="space-y-3">
            <Link href="/messages">
              <Button variant="outline" className="w-full gap-2" data-testid="button-message-coach">
                <MessageCircle className="w-4 h-4" />
                Message Me Directly in the App
              </Button>
            </Link>
            
            <a href="https://calendly.com/chatwithcrista/30min" target="_blank" rel="noopener noreferrer">
              <Button className="w-full gap-2 bg-gradient-to-r from-primary to-chart-2 text-primary-foreground" data-testid="button-book-call">
                <Calendar className="w-4 h-4" />
                Book a Free 20-Minute Strategy Call
              </Button>
            </a>
            
            <Link href="/learn">
              <Button variant="outline" className="w-full gap-2" data-testid="button-learn-tab">
                <BookOpen className="w-4 h-4" />
                Explore the Learn Tab for Deeper Education
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6 frosted-glass-warm text-center space-y-4" data-testid="card-youve-got-this">
          <h2 className="text-xl font-semibold text-foreground">You've Got This</h2>
          <div className="text-muted-foreground space-y-1">
            <p>Stress less.</p>
            <p>Sleep better.</p>
            <p>Love life more.</p>
          </div>
          <p className="text-foreground font-medium">And finally feel <strong className="text-primary">good</strong> in your body again.</p>
        </Card>
        
      </div>
    </div>
  );
}
