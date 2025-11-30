import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LearnFoodFoundations() {
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
          <h1 className="text-3xl font-bold" data-testid="heading-food-foundations">
            Food Foundations
          </h1>
          <p className="text-muted-foreground" data-testid="subheading-food-foundations">
            Carbs, Protein, Fats
          </p>
        </div>

        <Card className="p-6 space-y-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-content-food-foundations">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-base font-semibold text-foreground">
              Food isn't just calories. It's information that tells your cells whether they should create energy efficiently or conserve energy and stress.
            </p>
            <p>
              The goal is always the same: Support the metabolism so your body can make energy easily, stay warm, stay calm, and burn fuel cleanly.
            </p>
            <p>
              To do that, these three categories matter more than anything: carbs, protein, and fats.
            </p>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground text-lg">Carbs</p>
              <p className="font-semibold text-foreground text-sm">Your metabolism runs on sugar — literally.</p>
              <p>
                In the bioenergetic view, carbohydrates are the body's preferred fuel because they create the most energy with the least stress.
              </p>
              <p className="font-semibold text-foreground text-sm pt-2">Carbs:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Support thyroid function</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Lower cortisol</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Stabilize mood</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Increase warmth</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Fuel the liver</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Help progesterone levels</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Improve sleep</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Reduce cravings</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Restore metabolic flexibility</span>
                </li>
              </ul>
              <p className="text-sm pt-3">When carbs are low:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Cortisol rises to make up the difference</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>The body breaks down muscle</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Cravings spike later in the day</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Energy becomes unstable</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Metabolism slows</span>
                </li>
              </ul>
              <p className="text-sm pt-3 italic">
                That's why many restrictive, low-carb diets work short-term but feel terrible long-term — they rely on stress hormones to function.
              </p>

              <p className="font-semibold text-foreground text-sm pt-3">The best carbs for metabolic health:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Ripe fruit</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Fruit juice</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Honey</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Milk</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Root vegetables (carrots, potatoes, beets)</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Well-cooked white rice</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Sourdough bread</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Easily digested sugars</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground pt-2">
                These foods are easy on digestion, stabilize blood sugar, and help the body produce clean energy.
              </p>

              <p className="font-semibold text-foreground text-sm pt-3">Carbs that slow healing:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Grains that are hard to digest (whole wheat, bran, oats)</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Raw leafy vegetables</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Beans/legumes</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>High-PUFA packaged foods</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground text-lg">Protein</p>
              <p className="font-semibold text-foreground text-sm">Builds the body — but the type of protein changes how you feel.</p>
              <p>
                Protein is necessary for tissue repair, hormones, immune function, blood sugar stability, and detoxification. But not all proteins metabolize the same way.
              </p>

              <p className="font-semibold text-foreground text-sm pt-3">Bioenergetic, pro-metabolic proteins:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Dairy (milk, cheese, cottage cheese)</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Gelatin/collagen</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Eggs</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Shellfish (especially low-fat, mineral-rich ones like shrimp or oysters)</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>White fish</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Lean beef in moderate amounts</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground pt-2">
                These proteins are easy to digest, low in inflammatory amino acids, balanced in minerals, and supportive of thyroid function.
              </p>
              <p className="text-sm pt-2 italic">
                Gelatin is especially important because it balances the inflammatory amino acids in muscle meat and supports gut health.
              </p>

              <p className="font-semibold text-foreground text-sm pt-3">Proteins that increase stress load:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Large amounts of muscle meat without gelatin</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Pork and chicken (high in PUFAs)</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Nut/seed "proteins"</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Plant proteins with antinutrients</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground text-lg">Fats</p>
              <p className="font-semibold text-foreground text-sm">The category that matters the most — and the one most people misunderstand.</p>
              <p>
                In the bioenergetic view, the type of fat you eat strongly affects inflammation, thyroid function, energy production, hormone balance, and metabolic rate itself.
              </p>

              <p className="font-semibold text-foreground text-sm pt-3">The metabolism-friendly fats:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Saturated fats from dairy (butter, cream)</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Coconut oil</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Cocoa butter</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Beef tallow</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Small amounts of olive oil (low PUFA)</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground pt-2">
                These fats support thyroid hormone conversion, protect against oxidative stress, stabilize blood sugar, and help the body tolerate carbs better.
              </p>

              <p className="font-semibold text-foreground text-sm pt-4">Fats that suppress metabolism (PUFAs)</p>
              <p className="text-sm">
                PUFAs (polyunsaturated fats) are the #1 fat that slows metabolic healing. Found in:
              </p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Nuts & seeds</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Nut butters</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Vegetable oils (canola, soybean, safflower, sunflower)</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Most restaurant food</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Packaged snacks</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Pork & chicken</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Many "health" foods</span>
                </li>
              </ul>
              <p className="text-sm pt-3">PUFAs:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Block thyroid hormone</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Increase estrogen</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Suppress metabolism</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Lower body temperature</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Increase inflammation</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Make cravings worse</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Destabilize blood sugar</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Impair mitochondrial energy production</span>
                </li>
              </ul>
              <p className="text-sm pt-3 font-semibold text-foreground">
                Removing or drastically lowering PUFAs is often the fastest way to increase warmth, calm the nervous system, restore metabolic flexibility, improve sleep and digestion, and support weight loss.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground">Putting It All Together: How to Build a Pro-Metabolic Plate</p>
              <p className="text-sm">Each meal should include:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span><span className="font-semibold">Carbs</span> (fruit, juice, roots, dairy, honey)</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span><span className="font-semibold">Protein</span> (dairy, eggs, gelatin, fish, shellfish, lean meats)</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span><span className="font-semibold">Saturated fat</span> (butter, coconut, dairy fat)</span>
                </li>
              </ul>

              <p className="text-sm pt-3 font-semibold text-foreground">Why this matters:</p>
              <p className="text-sm">Carbs + protein together:</p>
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
                  <span>Help muscles use glucose</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Support thyroid function</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Improve hunger/fullness signals</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Prevent overeating later</span>
                </li>
              </ul>

              <p className="text-sm pt-3">Fat (saturated) helps:</p>
              <ul className="space-y-1 pl-4">
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Slow carb absorption gently</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Keep energy steady</span>
                </li>
                <li className="flex gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>Reduce cravings</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 pt-6 border-t border-primary/20 bg-gradient-to-r from-primary/5 to-chart-2/5 p-4 rounded-lg">
              <p className="font-semibold text-foreground">
                What You'll Notice When You Eat This Way
              </p>
              <p className="text-sm">Many women report improvements in:</p>
              <div className="grid grid-cols-2 gap-2 text-sm pt-2">
                <div className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Warmth</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Stable moods</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Deeper sleep</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Fewer cravings</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Better digestion</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Clearer skin</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Improved cycles</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Less bloating</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Stable energy</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Sustainable fat loss</span>
                </div>
              </div>
              <p className="text-sm pt-3 italic">
                Not because they're dieting — but because they're feeding the metabolism, not fighting it.
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
