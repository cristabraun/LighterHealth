import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function LearnHormones() {
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
          <h1 className="text-3xl font-bold" data-testid="heading-hormones">
            Hormones
          </h1>
          <p className="text-muted-foreground" data-testid="subheading-hormones">
            How Your Energy, Mood, and Metabolism Work
          </p>
        </div>

        <Card className="p-6 space-y-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-content-hormones">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-base font-semibold text-foreground">
              Your hormones aren't random. They're messengers that tell your body how safe you are, how much energy you can use, and whether you can thrive — or whether you need to conserve.
            </p>

            <p>
              In the pro-metabolic approach, we focus on the hormones that give energy, not the ones that steal it.
            </p>

            {/* Thyroid Section */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">1. Thyroid Hormones (T3/T4)</h2>
              
              <p>
                Your thyroid is the engine of your metabolism. When T3 is strong, you feel warm, clear-headed, emotionally stable, and able to handle life. When it drops, everything slows: digestion, mood, confidence, weight loss, muscle tone, libido.
              </p>

              <div className="space-y-3">
                <p className="font-semibold text-foreground">Key signs your thyroid needs support:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Cold hands/feet</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Low waking temps</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Feeling puffy</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Fatigue after eating</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Anxiety or irritability</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>"Stuck" weight despite effort</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-foreground">What improves thyroid function:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Regular eating</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Carbs, sugar, protein</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Warmth</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Better sleep</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Lower stress</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Avoiding over-exercise</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Progesterone Section */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">2. Progesterone (Your Calm, Protective Hormone)</h2>
              
              <p>
                Progesterone is the hormone of safety, stability, and calm energy. It balances estrogen, supports thyroid function, stabilizes your emotions, and reduces inflammation.
              </p>

              <div className="space-y-3">
                <p className="font-semibold text-foreground">Low progesterone makes women feel:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>On edge</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Bloated</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Moody</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Anxious</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Easily overwhelmed</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-foreground">Supporting progesterone includes:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Adequate calories</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Carbs + protein together</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Minerals (esp. calcium + sodium)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Stress reduction</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Supportive sunlight</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Good blood sugar rhythms</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Cortisol Section */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">3. Cortisol (Your Stress Hormone)</h2>
              
              <p>
                Cortisol isn't "bad." It's protective — but only in short bursts. When it stays chronically high, it suppresses thyroid function, raises inflammation, increases belly fat, and keeps your body in survival mode.
              </p>

              <div className="space-y-3">
                <p className="font-semibold text-foreground">A stressed metabolism feels like:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Wired but tired</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Sleep issues</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Sugar cravings</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Shaky between meals</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Brain fog</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Weight that won't budge</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-foreground">Balancing cortisol means:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Eating before you're starving</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Less fasting, more fueling</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Gentle movement</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Warmth</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Blood sugar stability</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Emotional regulation</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Why Hormones Matter */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">Why Hormones Matter for Weight & Energy</h2>
              
              <p>
                Your body can't lose weight, heal, or feel good when it thinks you're in danger. Balanced hormones signal:
              </p>

              <p className="italic font-semibold text-foreground">
                "I'm safe. I can burn energy. I can release stored fat. I can thrive."
              </p>

              <p>
                This is the entire foundation of the pro-metabolic approach.
              </p>
            </div>

            {/* External Resources */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">Recommended External Resources</h2>
              
              <p className="text-sm">
                Here are high-quality, pro-metabolic hormone resources that won't overwhelm beginners:
              </p>

              {/* Articles */}
              <div className="space-y-3">
                <p className="font-semibold text-foreground">Articles</p>
                <div className="space-y-2">
                  <a
                    href="https://raypeat.com/articles/articles/thyroid-insomnia.shtml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                    data-testid="link-ray-peat-thyroid"
                  >
                    <span>Ray Peat — "Thyroid, Insomnia, and Metabolic Efficiency"</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://raypeat.com/articles/articles/estrogen-progesterone-stress.shtml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                    data-testid="link-ray-peat-hormones"
                  >
                    <span>Ray Peat — "Estrogen, Progesterone, and Stress"</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.dannyroddy.com/blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                    data-testid="link-danny-roddy"
                  >
                    <span>Danny Roddy — "The Hormone Hierarchy"</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Videos */}
              <div className="space-y-3">
                <p className="font-semibold text-foreground">Videos</p>
                <a
                  href="https://www.youtube.com/@Katedeeringfitness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                  data-testid="link-kate-deering"
                >
                  <span>Kate Deering — "Why Women Aren't Losing Weight: Stress, Thyroid & Hormones"</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Podcast */}
              <div className="space-y-3">
                <p className="font-semibold text-foreground">Podcast Episode</p>
                <a
                  href="https://www.youtube.com/watch?v=Csz6IdzA7FY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                  data-testid="link-podcast-progesterone"
                >
                  <span>"Progesterone, Thyroid & Metabolism" — Kate Deering on The Strong Sistas Podcast</span>
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
