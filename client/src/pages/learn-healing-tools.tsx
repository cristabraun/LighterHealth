import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LearnHealingTools() {
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
          <h1 className="text-3xl font-bold" data-testid="heading-healing-tools">
            Healing Tools
          </h1>
          <p className="text-muted-foreground" data-testid="subheading-healing-tools">
            Foundational Experiments
          </p>
        </div>

        <Card className="p-6 space-y-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-content-healing-tools">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-base font-semibold text-foreground">
              Your body isn't healed through restriction, discipline, or guessing.
            </p>
            <p>
              It's healed through feedback — small, gentle experiments that show you what helps your cells produce more energy and what stresses them.
            </p>
            <p>
              These 5 experiments consistently create: lower cortisol, warmer temps, calmer moods, better digestion, more stable hunger, fewer cravings, better sleep, and improved metabolic flexibility.
            </p>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground text-lg">1. Morning Temperature & Pulse Tracking</p>
              <p className="text-sm font-semibold text-foreground italic">The Nervous System Reset Experiment</p>
              <p>
                This is the most important experiment because it tells you how your metabolism is functioning, whether you are running on energy or stress, and whether your thyroid has what it needs.
              </p>
              <p className="text-sm pt-2 font-semibold text-foreground">You track:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span><span className="font-semibold">Upon waking:</span> Temperature & Pulse</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span><span className="font-semibold">Before lunch:</span> Temperature & Pulse</span>
                </li>
              </ul>
              <p className="text-sm pt-2">
                These numbers show whether you're moving toward safety (higher warmth + stable pulse) or toward stress (lower warmth, elevated adrenaline, suppressed thyroid).
              </p>
              <p className="text-sm pt-2 italic">
                You get instant feedback about what's improving your metabolism — allowing you to adjust food, rest, and stress inputs in real time.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground text-lg">2. The Daily Carrot Salad</p>
              <p className="text-sm font-semibold text-foreground italic">The Gut & Estrogen Detox Experiment</p>
              <p>
                This simple raw carrot + vinegar + coconut oil salad is a core metabolic experiment because it helps lower endotoxin, improve digestion, bind excess estrogen, reduce bloating, and calm PMS symptoms.
              </p>
              <p className="text-sm pt-2">It helps:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Flatten stomach inflammation</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Support liver detoxification</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Lower stress hormones</span>
                </li>
              </ul>
              <p className="text-sm pt-2">
                The fiber in raw carrot is antimicrobial, meaning it sweeps out the toxins that keep the liver stressed — which keeps the metabolism stressed.
              </p>
              <p className="text-sm pt-2 italic">
                A calmer gut = a calmer nervous system = lower cortisol = higher cellular energy. Many women feel results within 3–7 days.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground text-lg">3. Eat Something Before Coffee</p>
              <p className="text-sm font-semibold text-foreground italic">The Blood Sugar Stabilizer Experiment</p>
              <p>
                Coffee on an empty stomach spikes adrenaline, cortisol, heart rate, shakiness, anxiety, irritability, and digestive stress.
              </p>
              <p className="text-sm pt-2">
                You're drinking a stimulant without any fuel — so your body has to break down its own tissues to keep blood sugar stable.
              </p>
              <p className="text-sm pt-2 font-semibold text-foreground">By eating carb + protein first, you improve:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Warmth</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Mood</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Focus</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Digestion</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Blood sugar stability</span>
                </li>
              </ul>
              <p className="text-sm pt-2 italic">
                Food lowers the cortisol response to caffeine, making your body feel safe instead of stressed.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground text-lg">4. PUFA Reduction</p>
              <p className="text-sm font-semibold text-foreground italic">The Inflammation, Thyroid, & Metabolic Boost Experiment</p>
              <p>
                PUFAs (polyunsaturated fats) slow metabolic healing more than almost anything else.
              </p>
              <p className="text-sm pt-2">Reducing PUFAs often leads to:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Warmer temperatures</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Clearer skin</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Faster digestion</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Improved sleep</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Better moods</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Lower inflammation</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Easier fat loss</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>More stable energy</span>
                </li>
              </ul>
              <p className="text-sm pt-3 font-semibold text-foreground">Sources to avoid or limit:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Nuts & seeds</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Vegetable oils</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Nut butters</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Restaurant food</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Packaged snacks</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Pork & chicken (higher PUFA animals)</span>
                </li>
              </ul>
              <p className="text-sm pt-2 italic">
                PUFAs damage mitochondrial energy production. Reducing them gives your cells room to heal and produce energy cleanly again.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground text-lg">5. Carb + Protein Balance Every 3–4 Hours</p>
              <p className="text-sm font-semibold text-foreground italic">The Blood Sugar, Thyroid, & Mood Stabilizer Experiment</p>
              <p>
                This experiment teaches your body: "You're safe. Energy is coming consistently."
              </p>
              <p className="text-sm pt-2">
                Eating every 3–4 hours—always pairing carbs + protein—helps:
              </p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Stabilize blood sugar</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Lower cortisol</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Reduce cravings</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Deepen sleep</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Calm anxiety</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Improve cycle health</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Warm the body</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Support the thyroid</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Increase metabolic rate</span>
                </li>
              </ul>
              <p className="text-sm pt-3 font-semibold text-foreground">Examples of good pairings:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Fruit + cheese</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Milk + gelatin</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Orange juice + eggs</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Potatoes + ground beef</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Cottage cheese + honey</span>
                </li>
              </ul>
              <p className="text-sm pt-2 italic">
                Your metabolism thrives on rhythm, predictability, and consistent nourishment — not fasting or long gaps between meals.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-primary/20 bg-gradient-to-r from-primary/5 to-chart-2/5 p-4 rounded-lg">
              <p className="font-semibold text-foreground">
                Why These 5 Experiments Work Together
              </p>
              <p className="text-sm">Each experiment addresses a different piece of metabolic healing:</p>
              <ul className="space-y-1 pl-4 text-sm pt-2">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><span className="font-semibold">Temp/Pulse</span> → feedback</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><span className="font-semibold">Carrot Salad</span> → gut & estrogen cleanup</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><span className="font-semibold">Food Before Coffee</span> → blood sugar safety</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><span className="font-semibold">PUFA Reduction</span> → cellular repair</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><span className="font-semibold">Carb/Protein Rhythm</span> → metabolic stability</span>
                </li>
              </ul>
              <p className="text-sm pt-3">Together, they create:</p>
              <div className="grid grid-cols-1 gap-1 text-sm pt-1">
                <p>✓ Lower stress hormones</p>
                <p>✓ Better thyroid function</p>
                <p>✓ Improved digestion</p>
                <p>✓ Warmer temperatures</p>
                <p>✓ Better sleep</p>
                <p>✓ Increased metabolic flexibility</p>
                <p>✓ Gentle but lasting fat loss</p>
              </div>
              <p className="text-sm pt-4 italic font-semibold text-primary">
                These aren't diets or rules — they're tools. Simple shifts that help your body feel safer every day.
              </p>
              <p className="text-sm pt-2 italic">
                When the body feels safe, it heals. When it heals, everything you've been struggling with becomes easier.
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
