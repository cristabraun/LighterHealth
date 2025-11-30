import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LearnFoodLists() {
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
          <h1 className="text-3xl font-bold" data-testid="heading-food-lists">
            Food Lists
          </h1>
          <p className="text-muted-foreground" data-testid="subheading-food-lists">
            Pro-Metabolic Foods & Foods to Avoid
          </p>
        </div>

        <Card className="p-6 space-y-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-content-food-lists">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-base font-semibold text-foreground">
              There are no hard rules in the pro-metabolic approach.
            </p>

            <p>
              Your body, history, stress levels, digestion, and metabolism are unique.
            </p>

            <p>
              Just because a certain food isn't working for you right now doesn't mean it will be off-limits forever. As your metabolism heals, many foods become easier to digest and enjoy.
            </p>

            <p className="italic">
              This list is a guiding framework — not a rigid diet.
            </p>

            {/* Pro-Metabolic Foods */}
            <div className="space-y-6 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">Pro-Metabolic Foods (Recommended)</h2>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Fruits & Fruit Juices</h3>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Orange juice</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Apples & applesauce</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Mango</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Pineapple</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Ripe peaches</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Ripe papaya</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Ripe berries (if tolerated)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Cherries</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Watermelon</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Grapes</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Melons</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Dried fruits (dates, figs) if tolerated</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Honey</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Maple syrup</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm italic">
                  Easy to digest, rich in fructose (supports liver glycogen), vitamins, minerals, antioxidants, carbs for thyroid + energy.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Roots & Easy-Digestible Carbs</h3>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Potatoes (boiled, mashed, baked)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Sweet potatoes (if tolerated)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Carrots (daily carrot salad recommended)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Beets (cooked)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Squash</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>White rice</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Rice noodles</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Sourdough bread (if tolerated)</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Dairy (if tolerated)</h3>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Milk (whole, 2%, skim depending on digestion)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Cheese</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Greek yogurt</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Cottage cheese</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Cream (in small amounts)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Kefir (if tolerated)</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm italic">
                  Highly bioavailable protein, calcium, sugar, nutrients that support thyroid + hormones. If dairy isn't tolerated, it often becomes tolerable later in healing.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Animal Proteins</h3>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Grass-fed beef</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Lamb</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Bison</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>White fish</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Shellfish (oysters, shrimp, scallops — very Peat-approved)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Eggs</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Liver (1–2x/week — extremely nutrient dense)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Gelatin + collagen</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm italic">
                  Supports thyroid, maintains muscle, stabilizes blood sugar, balances amino acids.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Fats (Clean, Stable Fats)</h3>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Butter</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Ghee</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Coconut oil</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>MCT oil</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Beef tallow</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Small amounts of olive oil</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm italic">
                  Saturated fats protect the thyroid, reduce inflammation, improve metabolism.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Pro-Metabolic Extras</h3>
                <ul className="space-y-3 pl-4">
                  <li>
                    <p className="font-semibold text-foreground">Daily Carrot Salad</p>
                    <p className="text-sm">Shredded carrot + vinegar + salt + coconut oil. Reduces endotoxin, improves digestion, lowers estrogen, supports liver.</p>
                  </li>
                  <li>
                    <p className="font-semibold text-foreground">Cooked White Mushrooms</p>
                    <p className="text-sm">Anti-estrogenic, gut-supportive, anti-inflammatory.</p>
                  </li>
                  <li>
                    <p className="font-semibold text-foreground">Bone Broth / Gelatin</p>
                    <p className="text-sm">Supports gut lining, skin, sleep, and metabolism.</p>
                  </li>
                  <li>
                    <p className="font-semibold text-foreground">Salt</p>
                    <p className="text-sm">Supports adrenal function, blood sugar, and thyroid.</p>
                  </li>
                  <li>
                    <p className="font-semibold text-foreground">Coffee with Sugar & Milk</p>
                    <p className="text-sm">Supports liver, boosts metabolism, increases CO₂ — if tolerated.</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Foods to Limit or Avoid */}
            <div className="space-y-6 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">Foods to Limit or Avoid for Metabolic Healing</h2>

              <p className="text-sm">
                These are foods frequently found to slow metabolism, raise inflammation, increase estrogen, or burden digestion — according to Ray Peat, Georgi Dinkov, Kate Deering, and bioenergetic research.
              </p>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">PUFAs (Polyunsaturated Fats)</h3>
                <p className="text-sm font-semibold text-foreground">The biggest category to avoid. Found in:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Seed oils (canola, soy, safflower, sunflower, corn)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Nuts & nut butters</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Almond milk</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Vegan "health foods"</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Most packaged foods</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Fried foods</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Commercial salad dressings</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm italic">
                  Suppress thyroid, increase inflammation, slow metabolism, disrupt hormones.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Hard-to-Digest Fibers & Raw Vegetables</h3>
                <p className="text-sm">Especially:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Raw broccoli, raw kale</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Raw cauliflower</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Raw spinach</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Raw cruciferous veggies</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Big salads</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Legumes (beans, lentils) unless very well-cooked</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm italic">
                  Slow metabolism, irritate the gut, increase endotoxin. (Cooked versions are often better.)
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Grains & Flours (for some people)</h3>
                <p>Many struggle with:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Whole wheat</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Oats</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Corn</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Multigrain breads</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm italic">
                  Others tolerate fine — individuality matters here.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Fatty Pork + Fatty Poultry</h3>
                <p className="text-sm">
                  High in PUFA unless trimmed or cooked in a way to remove the fat.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Excessive Caffeine Without Fuel</h3>
                <p>Leads to:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Anxiety</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Crashes</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Sleep disruption</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Cortisol spikes</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm italic">
                  Coffee + sugar + milk = best.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Fasting</h3>
                <p>
                  Depletes liver glycogen and forces the body to rely on stress hormones (cortisol & adrenaline) for fuel. This slows metabolism long-term.
                </p>
              </div>
            </div>

            {/* The Principle to Remember */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">The Principle to Remember</h2>
              
              <p>
                There are no rigid rules in the pro-metabolic approach. Your body heals through nourishment, warmth, rest, and safety — not restriction.
              </p>

              <p>
                Food becomes easier to digest as your metabolism strengthens. What doesn't work now may work beautifully later.
              </p>

              <p>
                This list helps you choose foods that support energy, thyroid function, digestion, hormones, and overall metabolic resilience.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
