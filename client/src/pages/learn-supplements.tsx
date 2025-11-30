import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function LearnSupplements() {
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
          <h1 className="text-3xl font-bold" data-testid="heading-supplements">
            Supplements
          </h1>
          <p className="text-muted-foreground" data-testid="subheading-supplements">
            Support Tools to Strengthen Your Metabolism
          </p>
        </div>

        <Card className="p-6 space-y-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-content-supplements">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-base font-semibold text-foreground">
              Supplements can be incredibly helpful — but only when the foundation is in place.
            </p>

            <p>
              If your sleep, food, stress levels, warmth, and daily rhythm are out of alignment, no supplement can override those deeper metabolic needs.
            </p>

            <p>
              Think of supplements as support, not a standalone solution. They can calm stress hormones, help with sleep, balance hormones, improve digestion, increase energy, and support thyroid function — when paired with the right lifestyle choices.
            </p>

            <p>
              Every woman is unique. Your needs, your metabolism, your stress levels, and your symptoms are individual. If you're unsure where to start, it's always best to talk to someone who understands this approach and can guide you.
            </p>

            {/* Foundational Supplements */}
            <div className="space-y-6 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">Foundational Supplements</h2>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Progesterone (Bioidentical USP)</h3>
                <p>
                  Supports calm, sleep, thyroid health, stress resistance, and balances estrogen.
                </p>
                <p className="text-sm font-semibold text-foreground">Often used for:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>PMS</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Anxiety</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Sleep issues</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Estrogen dominance</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Low mood</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Luteal phase symptoms</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Vitamin E (Mixed Tocopherols)</h3>
                <p>
                  Antioxidant, anti-estrogenic, supports progesterone, protects thyroid, reduces inflammation.
                </p>
                <p className="text-sm font-semibold text-foreground">Helps with:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>PMS</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Breast tenderness</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Stress recovery</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Hormonal symptoms</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Vitamin K2 (MK-4)</h3>
                <p>
                  Helps calcium go into bones, supports metabolism, works synergistically with vitamin D.
                </p>
                <p className="text-sm font-semibold text-foreground">Great for:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Bone strength</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Hormone balance</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Metabolic healing</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Vitamin D3 (Preferably paired with K2)</h3>
                <p>
                  Boosts mood, immunity, hormone production, and thyroid function. Especially helpful for women who work indoors or live in low-sun areas.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Magnesium (Glycinate, Malate, or Bicarbonate)</h3>
                <p>
                  Calms the nervous system, supports sleep, lowers cortisol, improves digestion.
                </p>
                <p className="text-sm font-semibold text-foreground">Useful for:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Anxiety</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Constipation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>PMS</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Muscle tension</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Sleep quality</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Calcium (If dietary intake is low)</h3>
                <p>
                  Ray Peat emphasized calcium for metabolic stability.
                </p>
                <p className="text-sm font-semibold text-foreground">Supports:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Thyroid function</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Progesterone</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Reducing inflammation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Warmth and energy</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm font-semibold text-foreground">Best sources:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Milk</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Cheese</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Orange juice with calcium</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Gelatin & Collagen</h3>
                <p>
                  Balances amino acids, supports gut lining, improves sleep, calms nerves.
                </p>
                <p className="text-sm font-semibold text-foreground">Easy to add to:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Coffee</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Milk</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Smoothies</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Orange juice</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Niacinamide (Vitamin B3)</h3>
                <p>
                  Supports energy production, stabilizes blood sugar, lowers lipolysis, reduces stress hormone spikes.
                </p>
                <p className="text-sm font-semibold text-foreground">Helps with:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Afternoon crashes</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Anxiety</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Blood sugar instability</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Taurine</h3>
                <p>
                  Calms the nervous system, supports bile flow, lowers inflammation.
                </p>
                <p className="text-sm font-semibold text-foreground">Useful for:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Bloating</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Sleep</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Stress response</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Gut issues</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Glycine</h3>
                <p>
                  Calming amino acid that supports sleep, digestion, and nervous system regulation. Pairs well with collagen or taken alone.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Aspirin (Low Dose, if tolerated)</h3>
                <p>
                  Has anti-inflammatory and metabolic-supportive properties in the Peat framework.
                </p>
                <p className="text-sm font-semibold text-foreground">May support:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Thyroid function</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Stress reduction</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Inflammation control</span>
                  </li>
                </ul>
                <p className="pt-2 text-sm italic">
                  Important: Always start small and monitor.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Activated B Vitamins (Especially B1 + B2)</h3>
                <p>
                  Fundamental for energy production, thyroid hormone utilization, and blood sugar stability.
                </p>
                <p className="text-sm font-semibold text-foreground">Support:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Mood</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Metabolic rate</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>Cognitive function</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Important Reminder */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">Important Reminder</h2>
              
              <p>
                Your metabolism responds to your whole lifestyle, not just a pill. Supplements work best when paired with:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Regular eating</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Nourishing, pro-metabolic foods</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Warmth</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Good sleep</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Lower stress</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Gentle movement</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Sunlight</span>
                </li>
              </ul>

              <p className="pt-4">
                If you're unsure where to begin, talk to someone familiar with the bioenergetic/pro-metabolic approach. Your body's needs are unique, and the right guidance can make a big difference.
              </p>
            </div>

            {/* External Resources */}
            <div className="space-y-4 pt-4 border-t border-primary/20">
              <h2 className="text-lg font-semibold text-foreground">External Resources</h2>
              
              <p className="text-sm">
                These links give deeper explanations of how these supplements fit into the bioenergetic model:
              </p>

              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-foreground mb-3">Ray Peat</p>
                  <div className="space-y-2">
                    <a
                      href="https://raypeat.com/articles/articles/progesterone.shtml"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                      data-testid="link-ray-peat-progesterone"
                    >
                      <span>Progesterone Overview</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://raypeat.com/articles/articles/vitamin-e-retinoids.shtml"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                      data-testid="link-ray-peat-vitamin-e"
                    >
                      <span>Vitamin E</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://raypeat.com/articles/articles/thyroid.shtml"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                      data-testid="link-ray-peat-thyroid"
                    >
                      <span>Thyroid & Aspirin</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://raypeat.com/articles/articles/gut-health.shtml"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                      data-testid="link-ray-peat-gut"
                    >
                      <span>Gut & Metabolic Support</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div>
                  <a
                    href="https://www.dannyroddy.com/blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                    data-testid="link-danny-roddy-supplements"
                  >
                    <span className="font-semibold">Danny Roddy Blog</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-sm text-muted-foreground">
                    Supplement-related explanations + metabolic concepts
                  </p>
                </div>

                <div>
                  <a
                    href="https://katedeering.com/blog/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                    data-testid="link-kate-deering-supplements"
                  >
                    <span className="font-semibold">Kate Deering</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-sm text-muted-foreground">
                    Beginner-friendly metabolic content
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
