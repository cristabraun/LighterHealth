import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Thermometer, Heart, Zap, Moon, Apple, Sun, Flame, BookOpen, Sparkles, ExternalLink } from "lucide-react";

export default function Learn() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-24">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            Understanding Metabolic Health
          </h1>
          <p className="text-muted-foreground">
            Learn the science behind feeling lighter, energized, and balanced
          </p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">What is Metabolic Health?</h2>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Metabolic health is your body's ability to efficiently produce and use energy. 
            When your metabolism is working well, you feel energized, sleep deeply, maintain 
            a stable mood, and naturally maintain a healthy weight. This isn't about restriction 
            or dieting - it's about nourishing your body so it can heal and thrive.
          </p>
        </Card>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="temperature" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]>div]:bg-primary/5">
                <div className="flex items-center gap-3 flex-1 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Thermometer className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-left">Why Track Morning Temperature?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Your waking temperature is one of the best indicators of thyroid function and 
                    metabolic rate. A healthy metabolism maintains a temperature around 97.8-98.6°F 
                    upon waking.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="font-medium text-foreground">What low temperature means:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Your cells aren't producing enough energy</li>
                      <li>Your metabolism may be slowed or "stressed"</li>
                      <li>Your body is conserving energy rather than thriving</li>
                    </ul>
                  </div>
                  <p>
                    The good news? Temperature often rises naturally as you support your metabolism 
                    with adequate nutrition, especially carbohydrates, protein, and minerals.
                  </p>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="pulse" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]>div]:bg-primary/5">
                <div className="flex items-center gap-3 flex-1 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-left">Understanding Resting Pulse</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Your resting pulse rate reflects how efficiently your heart is working. 
                    A healthy metabolic pulse is typically 75-85 bpm for women.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="font-medium text-foreground">Pulse patterns to notice:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>Very low pulse (under 60):</strong> May indicate low thyroid or excessive stress response</li>
                      <li><strong>Healthy range (70-85):</strong> Good metabolic function and cellular energy</li>
                      <li><strong>High pulse (over 90):</strong> Could signal stress hormones or nutrient deficiencies</li>
                    </ul>
                  </div>
                  <p>
                    A low pulse isn't always "good" - it can mean your metabolism has slowed. As your 
                    health improves, you may see your pulse rise into a healthier range.
                  </p>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="energy" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]>div]:bg-primary/5">
                <div className="flex items-center gap-3 flex-1 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-left">Energy & Metabolism</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    True energy comes from efficient cellular respiration - your cells' ability to 
                    produce ATP (energy currency) from the food you eat.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="font-medium text-foreground">Signs of good metabolic energy:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Stable energy throughout the day</li>
                      <li>No afternoon crashes or need for caffeine</li>
                      <li>Feeling warm and energized after meals</li>
                      <li>Waking up refreshed without alarms</li>
                    </ul>
                  </div>
                  <p>
                    If you're relying on coffee, experience frequent crashes, or feel "tired and wired," 
                    your metabolism may be running on stress hormones rather than efficient energy production.
                  </p>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="nutrition" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]>div]:bg-primary/5">
                <div className="flex items-center gap-3 flex-1 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Apple className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-left">Pro-Metabolic Nutrition</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Supporting your metabolism means eating enough of the right foods to signal safety 
                    and abundance to your body. The goal is to provide easily digestible, nutrient-dense 
                    foods that support energy production rather than stress the body.
                  </p>
                  
                  <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                    <p className="font-medium text-foreground">Carbohydrates - Your body's preferred fuel:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>Orange juice:</strong> Highly absorbable sugars with potassium and vitamin C; reduces stress hormones</li>
                      <li><strong>Ripe fruit:</strong> Easy to digest, provides quick energy with minerals and antioxidants</li>
                      <li><strong>Honey:</strong> Contains glucose and fructose that support liver glycogen without stressing digestion</li>
                      <li><strong>White rice:</strong> Low in anti-nutrients, gentle on digestion, provides steady glucose</li>
                      <li><strong>Potatoes:</strong> Rich in potassium, supports electrolyte balance and thyroid function</li>
                      <li><strong>Milk:</strong> Contains lactose (milk sugar) plus calcium, protein, and vitamins</li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                    <p className="font-medium text-foreground">Quality Protein - Essential for hormones and healing:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>Dairy (milk, cheese, yogurt):</strong> Complete protein with calcium; supports thyroid and bone health</li>
                      <li><strong>Eggs:</strong> Nutrient-dense with essential amino acids, choline, and vitamins</li>
                      <li><strong>Shellfish (oysters, shrimp):</strong> High in zinc and copper for thyroid and immune function</li>
                      <li><strong>White fish:</strong> Easy to digest, low in inflammatory fats</li>
                      <li><strong>Gelatin/Collagen:</strong> Balances muscle meat amino acids; supports gut and skin health</li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                    <p className="font-medium text-foreground">Minerals & Protective Fats:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>Salt (sodium):</strong> Essential for energy production, stress resilience, and digestion</li>
                      <li><strong>Calcium:</strong> Calms nervous system, supports cellular energy production</li>
                      <li><strong>Magnesium:</strong> Required for hundreds of metabolic processes</li>
                      <li><strong>Butter:</strong> Contains vitamin A, K2, and butyrate for gut and hormone health</li>
                      <li><strong>Coconut oil:</strong> Contains MCTs that are easily converted to energy</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-900 space-y-2">
                    <p className="font-medium text-red-900 dark:text-red-200">Foods that may stress metabolism:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-red-800 dark:text-red-300 text-sm">
                      <li><strong>Seed oils (PUFA):</strong> Canola, soybean, corn, sunflower oils - highly inflammatory and suppress thyroid</li>
                      <li><strong>Excess uncooked vegetables:</strong> Hard to digest, contain anti-nutrients that block mineral absorption</li>
                      <li><strong>Nuts in excess:</strong> High in PUFA and difficult to digest</li>
                      <li><strong>Soy products:</strong> Can suppress thyroid function and disrupt hormones</li>
                      <li><strong>Excess lean meat without balance:</strong> High methionine without glycine from gelatin stresses liver</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-900">
                    <p className="font-medium text-amber-900 dark:text-amber-200">This is NOT a diet</p>
                    <p className="text-amber-800 dark:text-amber-300 text-sm mt-1">
                      You're not restricting calories or following rules. You're experimenting with foods 
                      that support efficient energy production and help your body feel safe enough to heal. 
                      Eat to satisfaction, prioritize easy-to-digest foods, and notice how different foods 
                      make you feel.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="hormones" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]>div]:bg-primary/5">
                <div className="flex items-center gap-3 flex-1 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-left">Hormonal Balance & Metabolism</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Your hormones are deeply interconnected with your metabolic health. According to biologist 
                    Ray Peat's research, supporting your metabolism naturally balances hormones without forcing 
                    or supplementing individual hormones in isolation.
                  </p>

                  <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                    <p className="font-medium text-foreground">Thyroid - The Metabolic Master:</p>
                    <p className="text-sm">
                      Your thyroid hormone controls your metabolic rate, body temperature, and energy production. 
                      When thyroid is functioning well, every cell produces energy efficiently.
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                      <li><strong>Signs of good thyroid function:</strong> Warm hands and feet, 97.8-98.6°F waking temperature, good energy, healthy bowel movements</li>
                      <li><strong>What supports thyroid:</strong> Adequate calories (especially carbs), selenium, zinc, copper, vitamin A, avoiding excess estrogen</li>
                      <li><strong>What suppresses thyroid:</strong> Under-eating, PUFA (seed oils), excess stress, high estrogen, low progesterone</li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                    <p className="font-medium text-foreground">Progesterone - The Anti-Stress Hormone:</p>
                    <p className="text-sm">
                      Progesterone is protective, calming, and pro-metabolic. It opposes cortisol and estrogen's 
                      stress-promoting effects. In Peat's framework, progesterone is key to metabolic health.
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                      <li><strong>Progesterone's benefits:</strong> Reduces inflammation, supports thyroid, improves sleep, stabilizes mood, protects brain</li>
                      <li><strong>How to support it:</strong> Adequate light exposure, eating enough (especially carbs and protein), vitamin E, reducing stress</li>
                      <li><strong>What lowers it:</strong> Chronic stress, PUFA consumption, under-eating, excess estrogen dominance</li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                    <p className="font-medium text-foreground">Estrogen - Balance is Key:</p>
                    <p className="text-sm">
                      While some estrogen is necessary, excess unopposed estrogen (estrogen dominance) can 
                      suppress metabolism, promote inflammation, and contribute to many health issues.
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                      <li><strong>Signs of excess estrogen:</strong> Heavy periods, PMS, breast tenderness, water retention, anxiety, low thyroid symptoms</li>
                      <li><strong>What increases estrogen:</strong> PUFA, plastics, stress, poor liver function, gut issues, environmental toxins</li>
                      <li><strong>How to lower excess:</strong> Support liver health (carrots, coffee, thyroid optimization), increase progesterone, avoid PUFA</li>
                      <li><strong>Ray Peat's raw carrot salad:</strong> Daily grated carrot with vinegar/salt/coconut oil helps eliminate excess estrogen through the gut</li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                    <p className="font-medium text-foreground">Cortisol & Stress Hormones:</p>
                    <p className="text-sm">
                      Cortisol and adrenaline are emergency hormones. When chronically elevated due to 
                      metabolic stress (under-eating, over-exercising, inflammation), they break down tissues 
                      and suppress metabolism.
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                      <li><strong>Signs of high stress hormones:</strong> Waking at 3-4am, anxiety, can't gain muscle, fat around midsection, sugar cravings</li>
                      <li><strong>How to lower:</strong> Eat enough carbs (prevents blood sugar crashes), salt food liberally, prioritize sleep, reduce inflammatory foods</li>
                      <li><strong>Quick stress reducers:</strong> Orange juice with salt, sipping milk, eating fruit with cheese</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900 space-y-2">
                    <p className="font-medium text-blue-900 dark:text-blue-200 flex items-center gap-2">
                      Ray Peat's Core Principles
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-blue-800 dark:text-blue-300 text-sm">
                      <li>Energy production is the foundation of health</li>
                      <li>Sugar (glucose) is not your enemy - it's protective when metabolism is healthy</li>
                      <li>PUFA (polyunsaturated fats) are the most damaging dietary factor</li>
                      <li>Thyroid and progesterone are protective; excess estrogen and cortisol are harmful</li>
                      <li>Your body can heal when given the right conditions: adequate nutrition, light, rest</li>
                    </ul>
                    <a 
                      href="http://raypeat.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1 mt-2 hover:underline"
                      data-testid="link-raypeat"
                    >
                      Explore Ray Peat's research <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <p className="text-sm pt-2">
                    The beauty of this approach is that you don't need to "fix" individual hormones. When you 
                    support your metabolism with proper nutrition, your hormones naturally find balance. Track 
                    your temperature, pulse, and energy to see how dietary changes affect your metabolic health.
                  </p>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="stress" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]>div]:bg-primary/5">
                <div className="flex items-center gap-3 flex-1 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Flame className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-left">Stress & Metabolism</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Chronic stress (physical, emotional, or metabolic) triggers cortisol and adrenaline, 
                    which can slow metabolism, increase inflammation, and make you store fat.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="font-medium text-foreground">Common metabolic stressors:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Under-eating or skipping meals</li>
                      <li>Excessive exercise without adequate recovery</li>
                      <li>Poor sleep or irregular sleep schedule</li>
                      <li>Chronic dieting or restriction</li>
                      <li>Inflammatory foods (seed oils, excess PUFA)</li>
                    </ul>
                  </div>
                  <p>
                    The goal is to reduce stressors and support your body's ability to produce energy 
                    efficiently rather than relying on stress hormones to keep you going.
                  </p>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="experiments" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]>div]:bg-primary/5">
                <div className="flex items-center gap-3 flex-1 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Sun className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-left">How to Use Experiments</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    The experiment library offers simple, evidence-based protocols to test how specific 
                    foods and habits affect YOUR unique metabolism.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="font-medium text-foreground">Experiment approach:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Choose ONE experiment to start with</li>
                      <li>Track your vitals daily during the experiment</li>
                      <li>Notice changes in temperature, energy, digestion, and mood</li>
                      <li>After completion, decide if it makes you feel "lighter"</li>
                      <li>Keep what works, release what doesn't</li>
                    </ul>
                  </div>
                  <p>
                    There are no wrong answers. You're the expert on your body - these experiments 
                    simply help you gather data and discover what helps you thrive.
                  </p>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        </Accordion>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ExternalLink className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Resources</h2>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Explore additional resources and references to deepen your understanding of metabolic health.
          </p>
          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-lg bg-muted/30 text-center">
              <p className="text-sm text-muted-foreground">
                Additional resources and references will be added here soon.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20">
          <div className="space-y-3 text-center">
            <h3 className="text-lg font-semibold">Remember</h3>
            <p className="text-muted-foreground">
              Healing your metabolism is not about perfection, restriction, or forcing your body to 
              change. It's about listening, experimenting, and providing what your body needs to 
              produce energy efficiently. Small, consistent steps create lasting transformation.
            </p>
            <p className="text-sm text-primary font-medium">
              You deserve to feel lighter - emotionally, energetically, and physically.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
