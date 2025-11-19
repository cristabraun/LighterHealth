import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Thermometer, Heart, Zap, Moon, Apple, Sun, Flame, BookOpen } from "lucide-react";

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
                    and abundance to your body.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="font-medium text-foreground">Key metabolic supporters:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>Carbohydrates:</strong> Fruit, fruit juice, honey, white rice, potatoes</li>
                      <li><strong>Quality protein:</strong> Dairy, eggs, shellfish, white fish, gelatin</li>
                      <li><strong>Minerals:</strong> Salt, calcium, magnesium, potassium</li>
                      <li><strong>Saturated fats:</strong> Butter, coconut oil (in moderation)</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-900">
                    <p className="font-medium text-amber-900 dark:text-amber-200">This is NOT a diet</p>
                    <p className="text-amber-800 dark:text-amber-300 text-sm mt-1">
                      You're not restricting calories or following rules. You're experimenting with foods 
                      that support efficient energy production and help your body feel safe enough to heal.
                    </p>
                  </div>
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
