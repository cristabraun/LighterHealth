import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function LearnDigestion() {
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
          <h1 className="text-3xl font-bold" data-testid="heading-digestion">
            Digestion
          </h1>
          <p className="text-muted-foreground" data-testid="subheading-digestion">
            How Your Gut Shapes Your Energy, Hormones, and Metabolism
          </p>
        </div>

        <Card className="p-6 space-y-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-content-digestion">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-base font-semibold text-foreground">
              Your digestion isn't just about food breakdown — it's directly tied to your energy, mood, hormones, inflammation, and weight regulation.
            </p>

            <p>
              In the pro-metabolic view, a healthy gut means:
            </p>

            <ul className="space-y-2 pl-4">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>You absorb nutrients easily</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Your meals give you steady energy</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Your hormones stay balanced</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Stress stays lower</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Your metabolism runs faster</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Bloating and constipation fade</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Your body feels safe enough to release stored fat</span>
              </li>
            </ul>

            <p>
              When digestion is sluggish, irritated, or inflamed, your whole body shifts into stress mode.
            </p>

            {/* Why Digestion Matters */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">Why Digestion Matters in the Pro-Metabolic Approach</h2>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">1. Thyroid Function</h3>
                <p>
                  Inflammation, endotoxin, and low stomach acid all suppress thyroid activity — which slows metabolism and energy production.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">2. Hormones</h3>
                <p>
                  A stressed gut increases estrogen recycling and decreases progesterone.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">3. Blood Sugar Stability</h3>
                <p>
                  Poor digestion → unstable glucose → adrenaline/cortisol spikes → tired/wired cycles.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">4. Nervous System Calm</h3>
                <p>
                  A smooth, easy gut = calm parasympathetic ("rest & digest") tone.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">5. Bloating & Water Retention</h3>
                <p>
                  Almost always related to poor motility, stress hormones, or specific foods. Not because you "ate too many calories."
                </p>
              </div>
            </div>

            {/* Signs Your Digestion Needs Support */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">Signs Your Digestion Needs Support</h2>
              
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Bloating after meals</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Constipation or slow motility</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Loose stools</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Gas or cramping</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Puffy face</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Heartburn</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Feeling heavy or inflamed</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Anxiety after eating</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Sugar cravings after meals</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Afternoon crash</span>
                </li>
              </ul>

              <p className="pt-4 text-sm font-semibold text-foreground">
                These are often stress + low stomach acid + endotoxin issues, not "bad digestion genes."
              </p>
            </div>

            {/* What Improves Digestion */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">What Improves Digestion (Pro-Metabolic Tools)</h2>
              
              {/* 1. Regular Eating */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">1. Regular Eating</h3>
                <p>
                  Skipping meals slows stomach acid, slows motility, and increases stress hormones. Eating every 3–4 hours keeps digestion smooth.
                </p>
              </div>

              {/* 2. Warm, Cooked, Easy-to-Digest Foods */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">2. Warm, Cooked, Easy-to-Digest Foods</h3>
                <p>
                  Your gut loves warmth and softness. Best options include:
                </p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Cooked fruits</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Orange juice</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Mashed potatoes</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Eggs</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Gelatin</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Stews</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>White rice</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Ripe fruits</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm italic">
                  Cold, raw, fibrous foods often increase bloating.
                </p>
              </div>

              {/* 3. Carrot Salad */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">3. Carrot Salad — The Famous Ray Peat Digestion Tool</h3>
                <p>
                  Daily raw carrot salad helps:
                </p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Reduce endotoxin</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Clean the intestine</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Improve gut motility</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Balance estrogen</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Reduce bloating</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Support liver function</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Improve mood + energy</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm">
                  <span className="font-semibold">Basic recipe:</span> Shredded carrot + vinegar + salt + a bit of coconut oil (optional). Taken ideally before lunch or early afternoon.
                </p>
              </div>

              {/* 4. White Button Mushrooms */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">4. White Button Mushrooms</h3>
                <p>
                  White mushrooms reduce:
                </p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Aromatase (estrogen conversion)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Inflammation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Endotoxin</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Bloating</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Mood swings related to estrogen dominance</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm italic">
                  Cook them well — they're more powerful cooked.
                </p>
              </div>

              {/* 5. Gelatin & Collagen */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">5. Gelatin & Collagen</h3>
                <p>
                  Gelatin balances amino acids from muscle meats and supports:
                </p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Gut lining</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Digestion</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Joint health</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Thyroid support</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm">
                  <span className="font-semibold">Ideal as:</span> Gelatin gummies, in orange juice, in coffee, or mixed into warm drinks.
                </p>
              </div>

              {/* 6. Salt */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">6. Salt</h3>
                <p>
                  Salt improves stomach acid, adrenal stability, and digestion.
                </p>
                <p className="font-semibold text-foreground">Signs you need more:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Feeling puffy</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Afternoon cravings</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Dizziness</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Irritability</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Constipation</span>
                  </li>
                </ul>
                <p className="pt-2">
                  Add salt to meals freely.
                </p>
              </div>

              {/* 7. Stress Reduction */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">7. Stress Reduction</h3>
                <p>
                  A stressed gut is a slow gut. Try:
                </p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Slow breathing</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Eating sitting down</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Warm foods</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Avoiding multitasking while eating</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Short walks after meals</span>
                  </li>
                </ul>
                <p className="pt-2">
                  These shift your body back into "digest mode."
                </p>
              </div>
            </div>

            {/* Helpful Daily Routine Example */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">Helpful Daily Routine Example</h2>
              
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-foreground">Morning:</p>
                  <p>OJ + collagen → calm stomach, stable glucose</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Lunch:</p>
                  <p>Protein + carbs + carrot salad</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Mid-afternoon:</p>
                  <p>Fruit + cottage cheese or yogurt</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Dinner:</p>
                  <p>Protein + cooked starch + mushrooms</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Before bed:</p>
                  <p>Honey + milk or fruit to keep cortisol down</p>
                </div>
              </div>
            </div>

            {/* External Resources */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">External Resources (Beginner-Friendly)</h2>
              
              <div className="space-y-3">
                <a
                  href="https://raypeat.com/articles/articles/gut-health.shtml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                  data-testid="link-ray-peat-digestion"
                >
                  <span>Ray Peat — "Intestinal Health & Endotoxin"</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-foreground">Kate Deering — Digestion Chapter</p>
                <p className="text-sm">
                  Digestion chapter of "How to Heal Your Metabolism" (very accessible for beginners)
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="https://www.dannyroddy.com/blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                  data-testid="link-danny-roddy-digestion"
                >
                  <span>Danny Roddy — Gut & Endotoxin Articles</span>
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
