import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LearnStressPhysiology() {
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
          <h1 className="text-3xl font-bold" data-testid="heading-stress-physiology">
            Stress Physiology
          </h1>
          <p className="text-muted-foreground" data-testid="subheading-stress-physiology">
            Why You Feel the Way You Feel
          </p>
        </div>

        <Card className="p-6 space-y-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-content-stress-physiology">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-base font-semibold text-foreground">
              In the bioenergetic (pro-metabolic) view, "stress" isn't just a feeling.
            </p>
            <p>
              It's a physiological state your body enters when it senses: low energy, danger, undernourishment, cold, overexertion, emotional overwhelm, or chronic pressure.
            </p>
            <p>
              In this state, your body shifts from energy production → to energy survival. That switch is powered by stress hormones—mainly cortisol and adrenaline—and over time, they slow your metabolism, increase inflammation, disrupt digestion, and make weight loss harder.
            </p>
            <p className="italic">
              This is why stress isn't just "in your head." It's in your cells.
            </p>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground">How Stress Slows Your Metabolism</p>
              <p>
                When your body can't make enough energy easily (low thyroid, low glucose availability, poor sleep, skipping meals), it turns to the stress system.
              </p>
              <p className="font-semibold text-foreground text-sm pt-2">Here's what happens:</p>

              <div className="space-y-4 pl-4 border-l-2 border-primary/30">
                <div>
                  <p className="font-semibold text-foreground text-sm">1. Cortisol rises to maintain blood sugar</p>
                  <p className="text-sm pt-2">
                    Cortisol breaks down your muscle and tissues into amino acids and converts them into glucose (a process called gluconeogenesis). This keeps you alive — but it's expensive.
                  </p>
                  <p className="text-sm pt-2">Over time, high cortisol leads to:</p>
                  <ul className="space-y-1 pl-4 text-sm pt-1">
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Slower metabolism</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>More fat storage (especially belly)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Cravings</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Mood swings</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Sleep issues</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Feeling wired but tired</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-foreground text-sm">2. Adrenaline keeps you going when you should be resting</p>
                  <p className="text-sm pt-2">
                    Adrenaline gives short bursts of energy, but long-term it causes:
                  </p>
                  <ul className="space-y-1 pl-4 text-sm pt-1">
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Anxiety</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Heart palpitations</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Cold hands and feet</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Shaky hunger</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Digestive shutdown</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-foreground text-sm">3. Thyroid function drops</p>
                  <p className="text-sm pt-2">
                    Stress hormones directly suppress thyroid output — meaning:
                  </p>
                  <ul className="space-y-1 pl-4 text-sm pt-1">
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Lower body temp</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Lower pulse</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Lower energy</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Slower digestion</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Slower fat burning</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="pt-3 italic text-sm">
                This is why so many people think they have a willpower problem—it's actually a low-energy problem.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground">Why Modern Life Is More Stressful Than Ever</p>
              <p className="text-sm">Your body was designed for:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Warmth</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Sunlight</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Regular meals</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Community</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Rhythmic days</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Low environmental toxins</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Predictable routines</span>
                </li>
              </ul>
              <p className="text-sm pt-3">Modern life is the opposite:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Constant notifications</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>High work pressure</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Financial stress</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Processed foods</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Blue light</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Late nights</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Cold environments</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Stimulants (coffee) replacing breakfast</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Over-exercising</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Under-eating</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Emotional isolation</span>
                </li>
              </ul>
              <p className="text-sm pt-3 italic">
                Your biology reads all of this as danger. So it stays in stress mode by default — even when you think you're "fine."
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground">Why Stress Makes Weight Loss Hard</p>
              <p className="text-sm">When stress hormones stay elevated:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Your hunger signals become chaotic</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Cravings rise</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>You retain water</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Digestion slows</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Metabolism drops</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Sleep gets worse</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Inflammation goes up</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Fat loss becomes nearly impossible</span>
                </li>
              </ul>
              <p className="text-sm pt-3">This is why many women feel: exhausted, puffy, cold, anxious, stuck.</p>
              <p className="text-sm pt-2 italic">
                It's not a personal failure. It's physiology.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground">The Pro-Metabolic Approach to Lowering Stress</p>
              <p className="text-sm">
                Instead of pushing through stress — the bioenergetic view focuses on giving the body energy so it no longer needs the stress response.
              </p>
              <p className="text-sm pt-3">This is why Lighter™ teaches:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary font-semibold">1.</span>
                  <div>
                    <span className="font-semibold">Eat enough & eat regularly</span>
                    <p className="text-xs text-muted-foreground pt-0.5">Stable blood sugar = lower cortisol.</p>
                  </div>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary font-semibold">2.</span>
                  <div>
                    <span className="font-semibold">Prioritize carbs + protein together</span>
                    <p className="text-xs text-muted-foreground pt-0.5">Fruit + dairy + gelatin + roots = stable energy.</p>
                  </div>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary font-semibold">3.</span>
                  <div>
                    <span className="font-semibold">Warmth and safety signals</span>
                    <p className="text-xs text-muted-foreground pt-0.5">Warm environments help shift you out of stress mode.</p>
                  </div>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary font-semibold">4.</span>
                  <div>
                    <span className="font-semibold">Gentle movement (not punishing workouts)</span>
                    <p className="text-xs text-muted-foreground pt-0.5">Walking, restorative lifting, light movement — keeps energy steady.</p>
                  </div>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary font-semibold">5.</span>
                  <div>
                    <span className="font-semibold">Sunlight & circadian rhythm</span>
                    <p className="text-xs text-muted-foreground pt-0.5">Light lowers stress hormones and boosts metabolism.</p>
                  </div>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary font-semibold">6.</span>
                  <div>
                    <span className="font-semibold">Support digestion</span>
                    <p className="text-xs text-muted-foreground pt-0.5">A calm gut signals safety to the nervous system.</p>
                  </div>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary font-semibold">7.</span>
                  <div>
                    <span className="font-semibold">Avoid PUFAs (polyunsaturated fats)</span>
                    <p className="text-xs text-muted-foreground pt-0.5">These fats increase inflammation and stress load.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground">Why We Track Temperature & Pulse</p>
              <p className="text-sm">These two numbers tell you instantly: Am I in stress mode or energy mode?</p>
              <ul className="space-y-2 pl-4 text-sm">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><span className="font-semibold">Low temperature + low pulse</span> → low metabolism, high stress load</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><span className="font-semibold">Normal temperature + normal pulse</span> → body feels safe</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><span className="font-semibold">High pulse + low temp</span> → adrenaline-driven stress</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><span className="font-semibold">Low pulse + high temp</span> → thyroid not keeping up</span>
                </li>
              </ul>
              <p className="text-sm pt-3 italic">
                This is why we start with these simple vitals. They cut through confusion and tell you the truth about what's happening in your cells — in real time.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-primary/20 bg-gradient-to-r from-primary/5 to-chart-2/5 p-4 rounded-lg">
              <p className="font-semibold text-foreground">
                Your Body Wants to Heal
              </p>
              <p className="text-sm">
                The beautiful thing about the bioenergetic approach is this: Your body is not broken. It's responding perfectly to the environment it's been placed in.
              </p>
              <p className="text-sm pt-2">
                Once you give it: enough fuel, enough warmth, enough safety, consistent nourishment, stable rhythms…
              </p>
              <div className="text-sm space-y-1.5 pt-2">
                <p>✓ Your mood improves.</p>
                <p>✓ Your sleep deepens.</p>
                <p>✓ Your cravings settle.</p>
                <p>✓ Your metabolism increases.</p>
                <p>✓ Your body composition begins to change — gently and sustainably.</p>
              </div>
            </div>
          </div>
        </Card>

        <Link href="/learn">
          <Button className="w-full bg-gradient-to-r from-primary to-chart-2" data-testid="button-back-to-learn-bottom">
            Back to Learn
          </Button>
        </Link>
      </div>
    </div>
  );
}
