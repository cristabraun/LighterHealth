import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function LearnSleep() {
  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-background via-background to-primary/5">
      <div className="max-w-md mx-auto p-6 space-y-6">
        
        <Link href="/learn">
          <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-learn">
            <ArrowLeft className="w-4 h-4" />
            Back to Learn
          </Button>
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold" data-testid="heading-sleep">
            Sleep
          </h1>
          <p className="text-muted-foreground" data-testid="subheading-sleep">
            The Most Underrated Metabolic Tool
          </p>
        </div>

        <Card className="p-6 space-y-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-content-sleep">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-base font-semibold text-foreground">
              Sleep is the most underrated metabolic tool women have.
            </p>

            <p>
              When you sleep well, everything improves — thyroid function, digestion, progesterone, blood sugar, mood, cravings, and weight regulation.
            </p>

            <p>
              When sleep is broken or shallow, the body shifts into stress metabolism just to survive.
            </p>

            {/* Why Sleep Matters */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">Why Sleep Matters in the Pro-Metabolic View</h2>
              
              <p className="font-semibold text-foreground">During good sleep, your body:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Repairs tissues</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Rebalances hormones</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Produces progesterone</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Restores glycogen</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Lowers inflammation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Rebuilds thyroid output</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Resets cortisol</span>
                </li>
              </ul>

              <p className="pt-2">
                When you don't sleep long enough or deeply enough, the opposite happens — metabolism slows, cortisol rises, and your body relies on stress hormones for energy.
              </p>
            </div>

            {/* Signs Your Sleep Needs Support */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">Signs Your Sleep Needs Support</h2>
              
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Waking up between 1–4am</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Racing thoughts at night</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Waking hungry</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Feeling wired but tired</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Hard time falling asleep</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Feeling puffy or inflamed</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Low morning temps/pulse</span>
                </li>
              </ul>

              <p className="pt-4 text-sm font-semibold text-foreground">
                These are often blood sugar issues — not a lack of willpower.
              </p>
            </div>

            {/* What Improves Sleep */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">What Improves Sleep (Pro-Metabolic Style)</h2>
              
              {/* 1. Balanced Evenings */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">1. Balanced Evenings</h3>
                <p>Eat dinner with:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Protein</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Carbs</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Salt</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Easy-to-digest foods</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm italic">
                  The goal: prevent nighttime blood sugar crashes.
                </p>
              </div>

              {/* 2. Bedtime Snack */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">2. Bedtime Snack</h3>
                <p>Great options:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Fruit + cheese</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Milk + honey</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Orange juice + gelatin</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Greek yogurt + berries</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Small salty snack</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm italic">
                  Keeps cortisol from spiking overnight.
                </p>
              </div>

              {/* 3. Warmth */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">3. Warmth</h3>
                <p>
                  A warm body = a rested body. Cold increases adrenaline. A warm shower before bed works wonders.
                </p>
              </div>

              {/* 4. Light & Dark Cycles */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">4. Light & Dark Cycles</h3>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Morning sunlight → regulates your circadian rhythm</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Dark nights → improves melatonin naturally</span>
                  </li>
                </ul>
              </div>

              {/* 5. Stress Reduction Before Bed */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">5. Stress Reduction Before Bed</h3>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Journaling</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Gentle stretching</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Deep breathing</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Reading</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Relaxed conversations</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Warm herbal tea</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm">
                  Avoid intense workouts or emotional conversations at night — they raise cortisol.
                </p>
              </div>
            </div>

            {/* Resources */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">Resources</h2>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Ray Peat — Sleep & Thyroid</h3>
                <a
                  href="https://raypeat.com/articles/articles/thyroid-insomnia.shtml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                  data-testid="link-ray-peat-sleep"
                >
                  <span>"Thyroid, Insomnia, and Metabolic Efficiency"</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Sleep-Supportive Essentials */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">Suggested Sleep-Supportive Essentials</h2>
              
              <p>
                See the Essentials section in your app for sleep-supportive supplements, minerals, and pro-metabolic tools.
              </p>

              <Link href="/essentials">
                <Button variant="outline" className="w-full" data-testid="button-essentials-sleep">
                  Go to Essentials
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
