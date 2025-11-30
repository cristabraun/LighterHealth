import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LearnFAQs() {
  const faqs = [
    {
      id: 1,
      question: "What does 'pro-metabolic' actually mean?",
      answer: `"Pro-metabolic" means supporting your body's ability to create energy efficiently and consistently.

When your metabolism is strong, you feel warmer and more energetic, digest food better, sleep more deeply, think more clearly, handle stress better, and regulate hormones more easily.

The pro-metabolic approach focuses on nourishing foods (especially carbs + protein), warmth and safety, nervous system calm, blood sugar stability, supportive movement, and lowering chronic stress hormones.

It's not about restriction or punishment; it's about building a body that has enough energy to heal.`,
    },
    {
      id: 2,
      question: "Is this another diet?",
      answer: `No — this is not a diet. This is a healing approach designed to restore your metabolism, balance your hormones, and help your body feel safe and energized again.

You don't have to cut out all your favorite foods or live in restriction. This method focuses on eating in a way that supports your thyroid, stabilizes blood sugar, reduces stress hormones, and improves digestion — so you can enjoy food without fear.

It's not about punishment or deprivation. It's about healing, nourishment, safety, and getting your metabolism working properly again. When your body feels supported, weight loss and better energy happen naturally.`,
    },
    {
      id: 3,
      question: "Do I have to cut out all 'bad' foods?",
      answer: `No — there are no rigid rules here. This approach is based on experimentation, learning what helps your energy and what slows it down. Some foods might not work for you right now, especially if digestion or stress hormones are high. That's totally normal.

The goal is not restriction — the goal is metabolic efficiency. You're learning which foods help your body burn fuel cleanly, stay warm, stay calm, and feel good.

If you avoid certain foods temporarily, it's for healing — not punishment. And it doesn't mean those foods are gone forever. As your metabolism strengthens, your digestion and tolerance often improve dramatically.`,
    },
    {
      id: 4,
      question: "What if I'm sensitive to dairy, fruit, or sugar?",
      answer: `Food sensitivities are extremely common in stressed metabolisms. You might react to dairy, certain fruits, sugar, or grains. That doesn't automatically mean those foods are "bad" — it usually means your digestion, thyroid, or stress response needs support.

As you lower stress, improve digestion, eat more regularly, warm up your body, and support thyroid and hormones — your tolerance for many foods often improves. You can work with what your body handles right now and expand slowly over time.`,
    },
    {
      id: 5,
      question: "Why does this app track temperature and pulse?",
      answer: `Because warmth and pulse are some of the most honest signals of how your metabolism is doing.

A healthier metabolism usually shows up as warm hands and feet, comfortable body temperature, and a calm, steady pulse (not crashing, not racing).

Tracking temp and pulse helps you see which foods support your energy, how stress affects you, if your current habits are helping or overloading you, and when your body feels safer and more regulated.

Instead of guessing, you can watch your body's real-time responses.`,
    },
    {
      id: 6,
      question: "Is fast weight loss possible with the pro-metabolic approach?",
      answer: `Fast weight loss isn't the focus here. The focus is safe, sustainable, and metabolism-friendly change.

Most women have tried fast-loss methods already — and paid for it with hormone issues, fatigue, binge–restrict cycles, anxiety, and rebound weight gain.

With a pro-metabolic approach, weight loss tends to happen more naturally as stress hormones come down, thyroid and progesterone improve, sleep gets better, digestion smooths out, and blood sugar stabilizes.

It might feel slower at first, but it's the path that actually lasts.`,
    },
    {
      id: 7,
      question: "Can I still do cardio or normal workouts?",
      answer: `Yes — but how you train matters. The goal is supportive movement, not wrecking yourself in the gym.

Pro-metabolic movement usually looks like lifting weights 2–4x per week, walking regularly, gentle conditioning (Pilates, barre, dance, light cycling), and avoiding chronic long, intense cardio.

Long, punishing cardio and overtraining can raise cortisol and adrenaline, suppress thyroid function, increase cravings and fatigue, and stall fat loss.

You don't need to stop all cardio forever — you just need to use it in a way that supports your metabolism instead of fighting it.`,
    },
    {
      id: 8,
      question: "Do I need supplements?",
      answer: `Not everyone needs supplements, but many women do find them helpful as support tools.

Supplements can support sleep and nervous system calm, help balance hormones, support thyroid function, reduce inflammation, and help digestion and energy.

But they cannot override chronic stress, undereating, extreme exercise, no sleep, or constant overwhelm.

Supplements work best on top of a foundation of nourishing food, warmth, rest, and nervous system safety. If you're unsure where to start, it's smart to speak with someone familiar with the bioenergetic / pro-metabolic approach.`,
    },
    {
      id: 9,
      question: "Can this approach help with PMS, anxiety, or sleep problems?",
      answer: `Yes — those issues are often tied to low thyroid function, blood sugar instability, high cortisol and adrenaline, estrogen dominance, poor digestion, and chronic stress.

By supporting regular eating, pro-metabolic foods, warmth, nervous system regulation, and progesterone and thyroid function — many women see big improvements in PMS, mood swings, anxiety, and sleep over time.

It's not a magic switch, but it goes after the root causes.`,
    },
    {
      id: 10,
      question: "How long does it take to see results?",
      answer: `It depends on how stressed and depleted your system is to begin with.

Rough guide:
• 1–3 weeks: many women notice changes in warmth, energy, digestion, and mood
• 3–6 months: deeper hormone and cycle changes often show up
• 6–12 months: more stable, long-term metabolic improvements

This is a nervous-system and metabolism healing journey, not a quick fix. The app helps you see progress through data (temp, pulse, symptoms) so you're not guessing.`,
    },
    {
      id: 11,
      question: "Can I follow this if I'm vegan or vegetarian?",
      answer: `Vegetarians usually can; strict vegans have a harder time.

This approach emphasizes dairy, eggs, gelatin / collagen, shellfish, and animal proteins because of their impact on hormones, thyroid, and the nervous system.

If you're vegetarian, it's still very workable with dairy, eggs, and gelatin combined with fruit, roots, and saturated fats.

If you're vegan, some principles (carbs, warmth, stress reduction) still help, but hitting protein and micronutrient targets gets trickier and may need extra planning or support.`,
    },
    {
      id: 12,
      question: "Will this help me lose weight?",
      answer: `Yes, indirectly — by getting your metabolism and hormones working with you instead of against you.

When you eat enough and regularly, lower stress hormones, sleep better, support thyroid and progesterone, and improve digestion — your body feels safer and more efficient at burning energy. Bloating falls, cravings calm down, and your body is more willing to let go of stored fat.

Weight loss here is a side effect of healing, not the only goal.`,
    },
    {
      id: 13,
      question: "Why are carbs encouraged here?",
      answer: `Because carbs are one of the main fuels for a healthy thyroid and nervous system.

Carbs refill liver glycogen, calm stress hormones, support progesterone and thyroid, help you sleep, and stabilize mood and energy.

When carbs are too low for too long, your body leans on cortisol and adrenaline to keep you going — which is the opposite of healing.

This approach encourages the right carbs (fruit, juice, roots, easy-to-digest starches) in combination with protein and salt.`,
    },
    {
      id: 14,
      question: "Why are seed oils discouraged?",
      answer: `Seed oils (high-PUFA oils like soybean, canola, sunflower, safflower, corn, etc.) are discouraged because they slow thyroid function, increase inflammation, make cells more fragile and easily damaged, promote estrogen dominance, and make metabolism less efficient over time.

Replacing them with more stable fats like butter, ghee, coconut oil, and beef tallow is a big lever for improving metabolic health, hormones, and energy.`,
    },
    {
      id: 15,
      question: "Why do you emphasize warmth so much?",
      answer: `Because temperature is one of the clearest reflections of metabolic function.

Cold body = more stress hormones. Warm body = more real energy.

When you're constantly cold, thyroid is often under-functioning, stress hormones are doing too much, and digestion, mood, and hormones usually struggle.

When you're warm and comfortable, food is being converted to energy, blood is flowing well, muscles and brain work better, and you feel safer and more grounded.

That's why the app pays so much attention to temp, pulse, and how warm you feel in daily life.`,
    },
  ];

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
          <h1 className="text-3xl font-bold" data-testid="heading-faqs">
            FAQs
          </h1>
          <p className="text-muted-foreground" data-testid="subheading-faqs">
            Common Questions About Metabolic Healing
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id} className="p-6 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid={`faq-card-${faq.id}`}>
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground text-base" data-testid={`faq-question-${faq.id}`}>
                  {faq.question}
                </h3>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed text-sm" data-testid={`faq-answer-${faq.id}`}>
                  {faq.answer}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
