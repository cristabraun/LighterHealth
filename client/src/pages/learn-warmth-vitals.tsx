import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LearnWarmthVitals() {
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
          <h1 className="text-3xl font-bold" data-testid="heading-warmth-vitals">
            Warmth & Vitals
          </h1>
          <p className="text-muted-foreground" data-testid="subheading-warmth-vitals">
            What Temperature & Pulse Tell You
          </p>
        </div>

        <Card className="p-6 space-y-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-content-warmth-vitals">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-base font-semibold text-foreground">
              In the bioenergetic approach, warmth = energy.
            </p>
            <p>
              It's that simple. A warm body means your cells are producing energy efficiently, your thyroid is active, metabolism is running, stress hormones are lower, and your body knows it is safe.
            </p>
            <p>
              A cold body means the opposite: low metabolic rate, thyroid suppression, higher cortisol and adrenaline, slower digestion, lower mood, fatigue, and weight loss resistance.
            </p>
            <p className="italic">
              Warmth isn't just comfort. It's metabolic function.
            </p>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground">Why We Track Temperature & Pulse</p>
              <p>
                Temperature and pulse are two of the fastest, clearest indicators of whether your body is running on energy mode (sugar, thyroid, safety) or stress mode (cortisol, adrenaline, survival).
              </p>
              <p>
                They tell you what's happening internally in real time — without labs, without guesswork.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground text-lg">Temperature: What It Means</p>
              <p>
                Your temperature reflects how much energy your body is producing.
              </p>
              <p className="font-semibold text-foreground text-sm pt-2">Healthy metabolic temperature ranges:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span><span className="font-semibold">Morning</span> (upon waking): 97.6–98.2°F</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span><span className="font-semibold">Mid-day/Afternoon:</span> 98.4–99.0°F</span>
                </li>
              </ul>

              <p className="text-sm pt-3 font-semibold text-foreground">If your temps stay low:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Your metabolism is running slow</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Thyroid function may be suppressed</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Stress hormones may be compensating</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>You may experience cold hands/feet, fatigue, cravings, irregular cycles, or anxiety</span>
                </li>
              </ul>

              <p className="text-sm pt-3">If your temperature rises after eating:</p>
              <p className="text-sm italic">Good — your body is responding to nourishment.</p>
              <p className="text-sm">This means:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Your liver has fuel</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Thyroid activity is improving</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Your body feels safer</span>
                </li>
              </ul>

              <p className="text-sm pt-3">If your temperature drops after eating:</p>
              <p className="text-sm">
                This often means under-eating chronically or relying on stress hormones to function. Your body struggles to produce energy from food and may shut down heat production.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground text-lg">Pulse: What It Means</p>
              <p>
                Pulse shows whether your body is using energy appropriately or relying on stress hormones.
              </p>
              <p className="font-semibold text-foreground text-sm pt-2">Healthy metabolic pulse ranges:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span><span className="font-semibold">Morning:</span> 75–90 bpm</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span><span className="font-semibold">Mid-day:</span> 80–95 bpm</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground pt-2 italic">
                Many women think 60 bpm is "healthy" — but in the bioenergetic approach, a low pulse is often a sign of slowed metabolism, not fitness.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground">Interpreting Patterns: The 4 Key Metabolic States</p>

              <div className="space-y-4 pl-4 border-l-2 border-primary/30">
                <div>
                  <p className="font-semibold text-foreground text-sm">1. Low Temp + Low Pulse = Low Metabolism</p>
                  <p className="text-sm pt-1">Your body lacks fuel. Stress hormones are elevated, but not enough to raise pulse.</p>
                  <p className="text-sm pt-1">You may feel: tired, cold, depressed, bloated, foggy.</p>
                  <p className="text-xs text-muted-foreground italic pt-1">This is the most common pattern in women stuck in chronic dieting or stress.</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground text-sm">2. Low Temp + High Pulse = Adrenaline Mode</p>
                  <p className="text-sm pt-1">Your body is running on stress hormones.</p>
                  <p className="text-sm pt-1">You may feel: anxious, wired, shaky, irregular hunger, heart racing when stressed or fasting.</p>
                  <p className="text-xs text-muted-foreground italic pt-1">This doesn't mean "your metabolism is fast." It means adrenaline is doing the work your thyroid should be doing.</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground text-sm">3. High Temp + Low Pulse = Thyroid Not Fully Supported</p>
                  <p className="text-sm pt-1">Often the body is warm but exhausted. Energy is still inconsistent.</p>
                  <p className="text-sm pt-1">You may feel: tired but warm, heavy, slow digestion.</p>
                  <p className="text-xs text-muted-foreground italic pt-1">This usually improves with more carbs + protein balanced meals.</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground text-sm">4. High Temp + High Pulse = Optimal Energy Production</p>
                  <p className="text-sm pt-1">This is where healing happens.</p>
                  <p className="text-sm pt-1">You may feel: warm, calm, energetic, stable hunger, better mood, improved sleep, easier fat loss.</p>
                  <p className="text-xs text-muted-foreground italic pt-1">This is the goal.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground">Why Warmth Matters in Metabolic Healing</p>
              <p>
                Warmth isn't just a symptom — it's a signal that your thyroid is active, your liver is storing glycogen, your cells are producing energy without stress hormones, and your body feels safe.
              </p>
              <p className="text-sm pt-2">Women often notice:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Warmer hands and feet</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Calmer nervous system</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>More stable energy</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Reduced bloating</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Fewer cravings</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Better cycles</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Glowing skin</span>
                </li>
              </ul>
              <p className="text-sm pt-3 italic">
                Warmth is one of the earliest improvements when metabolic healing begins.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground">How to Support Better Vitals</p>
              <ul className="space-y-3 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary font-semibold">1.</span>
                  <div>
                    <span className="font-semibold">Eat every 3–4 hours (carb + protein together)</span>
                    <p className="text-xs text-muted-foreground pt-0.5">Prevents blood sugar drops that trigger cortisol.</p>
                  </div>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary font-semibold">2.</span>
                  <div>
                    <span className="font-semibold">Prioritize easy-to-digest carbs (fruit, juice, dairy, roots)</span>
                    <p className="text-xs text-muted-foreground pt-0.5">These feed the liver and thyroid.</p>
                  </div>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary font-semibold">3.</span>
                  <div>
                    <span className="font-semibold">Keep PUFAs low</span>
                    <p className="text-xs text-muted-foreground pt-0.5">This reduces inflammation and improves mitochondrial energy.</p>
                  </div>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary font-semibold">4.</span>
                  <div>
                    <span className="font-semibold">Eat something with your coffee</span>
                    <p className="text-xs text-muted-foreground pt-0.5">Prevents adrenaline spikes and temperature drops.</p>
                  </div>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary font-semibold">5.</span>
                  <div>
                    <span className="font-semibold">Focus on gentle movement</span>
                    <p className="text-xs text-muted-foreground pt-0.5">Walking, light strength training, restorative exercise.</p>
                  </div>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary font-semibold">6.</span>
                  <div>
                    <span className="font-semibold">Warm environments + sunlight</span>
                    <p className="text-xs text-muted-foreground pt-0.5">Heat + light improve circulation and thyroid activity.</p>
                  </div>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary font-semibold">7.</span>
                  <div>
                    <span className="font-semibold">Support digestion</span>
                    <p className="text-xs text-muted-foreground pt-0.5">A calm gut signals safety to the whole system.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-4 pt-6 border-t border-primary/20 bg-gradient-to-r from-primary/5 to-chart-2/5 p-4 rounded-lg">
              <p className="font-semibold text-foreground">
                Your Temperature & Pulse Will Change Before Your Body Does
              </p>
              <p className="text-sm">
                This is one of the most encouraging parts of metabolic healing: Your vitals improve before you see visual results. But the improved vitals lead to the visual results.
              </p>
              <p className="text-sm pt-2">
                Higher warmth + stable pulse → better metabolism → better energy → better fat-burning capacity.
              </p>
              <p className="text-sm pt-3 italic font-semibold text-primary">
                This is why we track both every day in Lighter™.
              </p>
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
