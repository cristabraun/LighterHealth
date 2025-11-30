import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LearnEnergyBasics() {
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
          <h1 className="text-3xl font-bold" data-testid="heading-energy-basics">
            Energy Basics
          </h1>
          <p className="text-muted-foreground" data-testid="subheading-energy-basics">
            Metabolism 101
          </p>
        </div>

        <Card className="p-6 space-y-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-content-energy-basics">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-base font-semibold text-foreground">
              Your metabolism is not about burning calories.
            </p>
            <p>
              It's about producing energy so your cells can function with ease — warmth, calmness, stable mood, steady energy, good digestion, glowing skin, and a body that feels safe.
            </p>

            <div className="space-y-4 pt-2 border-t border-primary/20">
              <p className="font-semibold text-foreground">In the pro-metabolic world (inspired by Ray Peat), "good metabolism" means:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Your cells are producing energy efficiently</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Your thyroid is active</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Your body feels warm, not cold</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>You're using sugar for fuel instead of stress hormones</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Your digestion is calm</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Your sleep is restorative</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>You feel emotionally grounded</span>
                </li>
              </ul>
            </div>

            <p className="italic pt-2">
              When your metabolism is working, everything in your life feels easier.
            </p>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground">Your cells run on sugar + oxygen</p>
              <p>
                The bioenergetic, Peat-inspired view is simple: Your cells need glucose + oxygen to make energy (ATP) efficiently.
              </p>
              <p>When they have both, they produce:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Lots of ATP</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Carbon dioxide (which is good!)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Warmth</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Steady energy</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Calm nervous system function</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>A high metabolic rate</span>
                </li>
              </ul>
              <p className="pt-2 text-sm italic">
                This is called oxidative metabolism, and it's the foundation of healing your body.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground">When your body can't make energy well… it uses stress instead.</p>
              <p>
                If you're under-eating, skipping carbs, fasting, overtraining, or overwhelmed, your body switches from energy production to survival mode.
              </p>
              <p>Instead of glucose + oxygen, your body uses:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Adrenaline</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Cortisol</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Stored fat (which is mostly PUFA — inflammatory)</span>
                </li>
              </ul>
              <p className="pt-3 font-semibold text-foreground text-sm">This leads to:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Cold hands and feet</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Anxiety</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Irritability</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Poor sleep</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Hormonal imbalances</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Bloating</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Water retention</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Slow digestion</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Stubborn weight gain</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground">Why carbs are essential (not optional)</p>
              <p>
                In the pro-metabolic approach, carbohydrates are the preferred fuel of the body.
              </p>
              <p>Ray Peat's teachings emphasize:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Fruit</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Honey</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Orange juice</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Milk</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Root vegetables</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Easily digestible sugars</span>
                </li>
              </ul>
              <p className="pt-3">
                These support the thyroid, lower stress hormones, and help your liver store glycogen — which keeps blood sugar stable.
              </p>
              <p className="pt-3">When your liver is fueled, you experience:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  <span>Stable energy</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  <span>Calmer mood</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  <span>Fewer cravings</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  <span>Warmer body temperature</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  <span>Easier weight loss</span>
                </li>
              </ul>
              <p className="pt-3 text-sm italic">
                Carbs = metabolic support.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground">What a healthy metabolism feels like</p>
              <p>When your metabolism is "on," you experience:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Warm hands and feet</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Restful sleep</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>More stable cycles</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Fewer cravings</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Easier digestion</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Steady mood</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>More joy</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Less anxiety</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Weight that naturally trends toward healthy</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Energy that lasts all day without caffeine crashes</span>
                </li>
              </ul>
              <p className="pt-3 italic">
                You feel like yourself again.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="font-semibold text-foreground">How Lighter™ helps you restore metabolic energy</p>
              <p>This app teaches you how to:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Fuel your body so it feels safe</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Support your thyroid through food</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Balance carbs + protein</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Avoid metabolic stressors</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Use gentle experiments to learn what works for you</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Track the signs of healing (temp, pulse, energy)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Shift your body away from stress metabolism and toward real energy production</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 pt-6 border-t border-primary/20 bg-gradient-to-r from-primary/5 to-chart-2/5 p-4 rounded-lg">
              <p className="font-semibold text-foreground">
                You don't heal your metabolism by force, discipline, or deprivation.
              </p>
              <p>
                You heal it by giving your body what it's been missing.
              </p>
              <p className="pt-2 text-sm">
                Warmth. Nourishment. Safety. Carbs. Protein. Rest. Understanding. The feminine, soft approach.
              </p>
              <p className="pt-3 text-sm italic font-semibold text-primary">
                This is the foundation of everything inside Lighter™.
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
