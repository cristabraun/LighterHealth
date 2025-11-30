import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function LearnMovement() {
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
          <h1 className="text-3xl font-bold" data-testid="heading-movement">
            Movement
          </h1>
          <p className="text-muted-foreground" data-testid="subheading-movement">
            How to Exercise in a Pro-Metabolic, Feminine, Healing Way
          </p>
        </div>

        <Card className="p-6 space-y-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-content-movement">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-base font-semibold text-foreground">
              Movement should give you energy, not drain it.
            </p>

            <p>
              In the pro-metabolic approach, exercise helps your body become warmer, calmer, stronger, and more resilient — not stressed, depleted, or inflamed.
            </p>

            <p>
              Women have been told to "burn more calories," "push harder," and "do more cardio," but that's the opposite of what actually heals the metabolism.
            </p>

            <p>
              Your body thrives when movement matches your biology, not the fitness industry's punish-yourself approach.
            </p>

            {/* Why Movement Matters */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">Why Movement Matters (Metabolic Perspective)</h2>
              
              <p className="font-semibold text-foreground">Done correctly, movement improves:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Thyroid function</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Insulin sensitivity</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Mood + nervous system stability</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Digestion</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Hormones</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Blood sugar</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Body composition</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Sleep</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Confidence + femininity</span>
                </li>
              </ul>

              <p className="pt-2 font-semibold text-foreground">
                Done incorrectly, movement raises stress hormones and slows healing — even if you're training hard.
              </p>
            </div>

            {/* What Hurts Your Metabolism */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">What Hurts Your Metabolism</h2>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">1. Excessive Cardio</h3>
                <p>Long, hard cardio:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Raises cortisol</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Raises adrenaline</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Breaks down muscle</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Slows thyroid output</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Increases cravings</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Makes your body hold fat</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm italic">
                  You feel "fit but exhausted."
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">2. Over-Exercising</h3>
                <p>Training too often or too intensely:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Burns through glycogen</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Blocks progesterone</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Suppresses immunity</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Causes swelling/puffiness</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Makes you retain water</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Triggers PMS symptoms</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm">
                  The body thinks you're running from danger.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">3. Fasting + Intense Workouts</h3>
                <p>This is the most metabolically damaging combo.</p>
                <p>Fasting + training = Your body runs entirely on stress hormones.</p>
                <p>This causes:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Shakiness</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Binge eating later</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Cold hands/feet</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Hormonal imbalance</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Period issues</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Hair shedding</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Thyroid suppression</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm italic">
                  This is why women feel "skinny-fat," burnt out, and inflamed.
                </p>
              </div>
            </div>

            {/* What Helps Your Metabolism */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">What Helps Your Metabolism</h2>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">1. Strength Training (2–4 days/week)</h3>
                <p>Slow, controlled, feminine strength training builds:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Muscle (raises metabolism)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Bone density</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Confidence</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Curves + tone</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Better blood sugar regulation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>A resilient, warm body</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm">
                  You don't need long sessions — just consistent ones.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">2. Walking</h3>
                <p>Walking regulates:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Blood sugar</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Digestion</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Cortisol</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Lymph flow</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Inflammation</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm">
                  It's one of the best metabolic tools available. 10–20 minutes after meals works wonders.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">3. Low-Intensity Conditioning</h3>
                <p>Gentle, restorative conditioning supports energy without raising stress hormones.</p>
                <p className="font-semibold text-foreground">Great options:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Pilates</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Barre</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Light cycling</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Dance</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Long walks</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Reformer workouts</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm">
                  These help women feel feminine, grounded, and stable.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">4. Fueling Before & After You Move</h3>
                <p>You need energy to produce energy.</p>
                <p className="font-semibold text-foreground">Fueling prevents:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Cortisol spikes</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Muscle breakdown</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Fatigue</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Brain fog</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Bloating</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Anxiety post-workout</span>
                  </li>
                </ul>
                <p className="pt-4 font-semibold text-foreground">Best pre-workout fuel:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Fruit</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Orange juice</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Honey + Greek yogurt</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Milk + collagen</span>
                  </li>
                </ul>
                <p className="pt-4 font-semibold text-foreground">Best post-workout fuel:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Protein + carbs</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Salt</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Easy-to-digest meals</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">5. Rest Days = Healing Days</h3>
                <p>Resting improves:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Thyroid</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Progesterone</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Muscle repair</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Fat-burning</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Mood</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Sleep</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Nervous system calm</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm italic">
                  You don't get fitter from training — you get fitter from recovering.
                </p>
              </div>
            </div>

            {/* Signs Your Workouts Are Too Stressful */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">Signs Your Workouts Are Too Stressful</h2>
              
              <p>If you experience these, your movement routine is working against you:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Feeling puffy after workouts</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Hard crash after training</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Increased cravings</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Trouble sleeping</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Anxiety or irritability</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>PMS getting worse</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Period dysfunction</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Cold extremities</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Getting sick often</span>
                </li>
              </ul>
              <p className="pt-4 text-sm">
                This means your workouts are burning through stress hormones, not real energy.
              </p>
            </div>

            {/* Pro-Metabolic Philosophy */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">Pro-Metabolic Philosophy in One Sentence</h2>
              <p className="italic font-semibold text-foreground">
                Move in a way that raises your energy — not your stress.
              </p>
            </div>

            {/* External Resources */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">External Resources</h2>
              
              <div className="space-y-3">
                <a
                  href="https://raypeat.com/articles/articles/exercise.shtml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                  data-testid="link-ray-peat-movement"
                >
                  <span>Ray Peat — "The Energy of Movement"</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="space-y-3">
                <a
                  href="https://www.youtube.com/@Katedeeringfitness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                  data-testid="link-kate-deering-movement"
                >
                  <span>Kate Deering — Strength training for thyroid & hormones</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="space-y-3">
                <a
                  href="https://www.dannyroddy.com/blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                  data-testid="link-danny-roddy-movement"
                >
                  <span>Danny Roddy — "Cardio vs. Metabolism"</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
