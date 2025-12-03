import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import startHereAudio from "@assets/Pro Metabolic Tracking and Healing Intro_1764477961046.wav?url";

export default function Learn() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const handleAICoachAsk = async () => {
    if (!aiInput.trim()) return;

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: aiInput }),
    });

    const data = await res.json();
    setAiResponse(data.reply);
  };

  return (
    <div className="min-h-screen pb-24 bg-background">

      {/* Shared desktop container */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-8">

        {/* --- START HERE SECTION --- */}
        <Card className="p-5 md:p-6 frosted-glass-warm rounded-xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Start Here
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Learn the basics of healing your metabolism. This section teaches
            you the foundations of metabolic healing, so you can understand
            why you're tracking, and why it matters.
          </p>
        </Card>

        {/* --- AUDIO PLAYER --- */}
        <Card className="p-4 rounded-xl frosted-glass-warm">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="w-4 h-4 text-primary" />
            <p className="text-gray-700 dark:text-gray-300 font-medium">Play Welcome Audio</p>
          </div>
          <audio controls className="w-full rounded-lg" data-testid="audio-welcome-learn">
            <source src={startHereAudio} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </Card>

        {/* --- LEARNING PATH TITLE --- */}
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Lighter Learning Path
        </h2>

        <p className="text-gray-600 dark:text-gray-400 -mt-4">
          Follow these 5 steps to understand metabolic healing:
        </p>

        {/* --- LIGHTER LEARNING PATH CARDS WITH ACCORDION --- */}
        <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">

          {/* ENERGY BASICS */}
          <Card className="p-5 rounded-xl frosted-glass-warm" data-testid="card-energy-basics">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-orange-200 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Energy Basics</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Metabolism 101</p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
              Understand how your body makes energy, why metabolism matters, and how the 
              pro-metabolic approach differs from restrictive diets.
            </p>

            <Button
              onClick={() => setOpenSection(openSection === 'energy' ? null : 'energy')}
              className="w-full text-sm"
              data-testid="button-learn-energy"
            >
              {openSection === 'energy' ? "Hide" : "Learn More"}
            </Button>

            {openSection === 'energy' && (
              <div className="mt-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">What Does "Good Metabolism" Actually Mean?</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Most people think metabolism is just about how fast you burn calories or whether you gain weight easily.
                  But metabolism is actually about how well your body creates energy.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Every single thing your body does—breathing, thinking, moving, digesting food, keeping you warm—requires energy. Your metabolism is the process of turning the food you eat into usable energy for all of this.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100">When your metabolism is working well:</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>You feel warm (not cold all the time)</li>
                  <li>You have steady energy throughout the day</li>
                  <li>You sleep well and wake up refreshed</li>
                  <li>Your mood is calm and stable</li>
                  <li>You digest food easily</li>
                  <li>Your body naturally stays at a healthy weight</li>
                </ul>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100">When your metabolism is slow or "broken":</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>You're always tired and cold</li>
                  <li>You can't sleep well</li>
                  <li>You feel anxious or moody</li>
                  <li>You can't lose weight even when eating very little</li>
                  <li>Your body is running on stress hormones just to keep going</li>
                </ul>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">How Your Body Makes Energy: The Two Ways</h4>

                <h5 className="font-medium text-gray-800 dark:text-gray-200">1. The Good Way (Efficient Energy)</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  When your body has enough food (especially carbs), oxygen, and isn't stressed out, your cells make energy efficiently.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">What happens:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Your cells burn food completely and cleanly</li>
                  <li>One molecule of glucose can produce 32–38 units of energy</li>
                  <li>Waste products are just CO₂ and water</li>
                  <li>You feel warm, energized, and grounded</li>
                </ul>

                <h5 className="font-medium text-gray-800 dark:text-gray-200">2. The Stress Way (Inefficient Energy)</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  When you're stressed, under-eating, or inflamed, your cells switch to a backup system.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">What happens:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Only 2 units of energy are produced from the same glucose</li>
                  <li>Lactic acid builds up (making you tired, sore, and foggy)</li>
                  <li>Your body relies on stress hormones (adrenaline, cortisol)</li>
                  <li>You feel cold, exhausted, anxious, and stuck</li>
                </ul>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">The Pro-Metabolic Goal</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Support your body so it can return to making energy the efficient way. That means:
                </p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>✓ Eating enough food—especially easy-to-digest carbs like fruit, juice, potatoes, rice</li>
                  <li>✓ Eating enough quality protein</li>
                  <li>✓ Avoiding inflammatory fats (PUFA seed oils)</li>
                  <li>✓ Lowering stress so your body doesn't have to run on adrenaline</li>
                  <li>✓ Supporting the thyroid</li>
                  <li>✓ Eating regularly to stabilize blood sugar</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">
                  This is metabolic healing.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">What Lighter™ Does to Help</h4>

                <h5 className="font-medium text-gray-800 dark:text-gray-200">1. We Track the Right Things</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Instead of obsessing over calories, Lighter™ tracks the markers that show how well your metabolism is functioning:
                </p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>🌡️ Temperature — shows metabolic strength</li>
                  <li>❤️ Pulse — shows how efficiently your body uses energy</li>
                  <li>⚡ Energy — shows your stress load</li>
                  <li>😴 Sleep — reveals recovery</li>
                  <li>🧠 Mood — reflects your nervous system state</li>
                </ul>

                <h5 className="font-medium text-gray-800 dark:text-gray-200">2. We Help You Experiment</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  You test small changes and see what actually improves your energy, digestion, sleep, and warmth.
                </p>

                <h5 className="font-medium text-gray-800 dark:text-gray-200">3. We Show You Patterns</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">The app highlights trends like:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>"Your temperature rises on days you eat breakfast."</li>
                  <li>"Your sleep quality improves when you stop eating late."</li>
                </ul>

                <h5 className="font-medium text-gray-800 dark:text-gray-200">4. We Focus on Feeling Good First</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  When your metabolism heals, weight naturally normalizes without restriction.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">The Simple Truth</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your metabolism is your body's energy system. When it's strong, everything becomes easier—energy, sleep, mood, digestion, and long-term wellness. Lighter™ helps you create the conditions for your body to thrive again.
                </p>
              </div>
            )}
          </Card>


          {/* STRESS PHYSIOLOGY */}
          <Card className="p-5 rounded-xl frosted-glass-warm" data-testid="card-stress-physiology">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-yellow-200 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Stress Physiology</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Why You Feel the Way You Do</p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
              Learn why stress changes metabolism, warmth, digestion, and your ability 
              to lose weight — and why tracking temperature and pulse matters.
            </p>

            <Button
              onClick={() => setOpenSection(openSection === 'stress' ? null : 'stress')}
              className="w-full text-sm"
              data-testid="button-learn-stress"
            >
              {openSection === 'stress' ? "Hide" : "Learn More"}
            </Button>

            {openSection === 'stress' && (
              <div className="mt-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Stress Isn't Just a Feeling—It's a Physical State</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  When most people think about stress, they think it's just an emotion—feeling overwhelmed, anxious, or worried. But stress is actually a physiological state your entire body enters into.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  When you're stressed (physically, mentally, or emotionally), your body goes into survival mode. It thinks you're in danger—like you're being chased by a lion—even if you're just sitting at your desk worrying about work or skipping meals.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">Your body can't tell the difference between:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>A real physical threat</li>
                  <li>Emotional stress</li>
                  <li>Metabolic stress (not eating enough, overexercising, poor sleep)</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  To your body, stress = stress. And when you're stressed, your entire metabolism shifts.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">What Happens in Your Body When You're Stressed</h4>

                <h5 className="font-medium text-gray-800 dark:text-gray-200">1. Cortisol Rises to Maintain Blood Sugar</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Cortisol keeps your brain fueled by breaking down muscle and converting it into glucose. This is meant to be temporary, but in modern life, cortisol stays high chronically. Chronically elevated cortisol:
                </p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Breaks down muscle</li>
                  <li>Increases belly fat</li>
                  <li>Suppresses the immune system</li>
                  <li>Disrupts sleep</li>
                  <li>Slows metabolism</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">High cortisol = your body thinks it's in constant danger.</p>

                <h5 className="font-medium text-gray-800 dark:text-gray-200">2. Adrenaline Keeps You Going When You Should Be Resting</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Adrenaline gives quick bursts of energy. It raises heart rate and puts your body on high alert. Many people run on adrenaline all day:
                </p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Feeling wired, jittery, anxious</li>
                  <li>Feeling "productive" but exhausted underneath</li>
                  <li>Crashing later and needing caffeine or sugar</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">Adrenaline = borrowed energy that you eventually pay for.</p>

                <h5 className="font-medium text-gray-800 dark:text-gray-200">3. Your Thyroid Slows Down</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your thyroid is the gas pedal for metabolism. Under chronic stress, it slows down to conserve resources. Results:
                </p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Feeling cold</li>
                  <li>Low energy</li>
                  <li>Hair shedding</li>
                  <li>Slowed digestion</li>
                  <li>Weight that won't move</li>
                  <li>Feeling foggy and depressed</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">Low thyroid = low metabolic rate = survival mode.</p>

                <h5 className="font-medium text-gray-800 dark:text-gray-200">4. Your Cells Switch to "Stress Metabolism"</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Instead of producing 32–38 units of energy from glucose, stressed cells switch to the backup system and make only 2 units. This creates lactic acid and makes you:
                </p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Sore</li>
                  <li>Tired</li>
                  <li>Inflamed</li>
                  <li>Foggy</li>
                  <li>Low-energy</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">Stress metabolism = running on fumes.</p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">Why Modern Life Is More Stressful Than Ever</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Our bodies were designed for short bursts of stress, followed by long periods of rest and plenty of food. Modern life is the opposite:
                </p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Constant mental pressure</li>
                  <li>Poor sleep</li>
                  <li>Under-eating and dieting</li>
                  <li>Overexercising</li>
                  <li>Artificial light</li>
                  <li>No true rest</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Your body stays stuck in a stress response for months or years.</p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">Why Stress Makes Weight Loss So Hard</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">Stress physiology makes fat loss very difficult:</p>
                <ol className="text-sm text-gray-700 dark:text-gray-300 list-decimal list-inside space-y-1">
                  <li>Cortisol promotes fat storage</li>
                  <li>Thyroid slows metabolism</li>
                  <li>Low energy reduces movement</li>
                  <li>Cravings increase</li>
                  <li>Muscle is broken down (slowing metabolism further)</li>
                </ol>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  You can diet harder and train more—but your body will hold on because it thinks you're in danger.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">The Pro-Metabolic Approach to Lowering Stress</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  This approach helps your body feel safe again so it can return to efficient energy production.
                </p>

                <h5 className="font-medium text-gray-800 dark:text-gray-200">1. Eat Enough—Especially Carbs</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Carbs stop cortisol from rising. Eat every 3–4 hours and avoid skipping breakfast.
                </p>

                <h5 className="font-medium text-gray-800 dark:text-gray-200">2. Minimize PUFA Oils</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  PUFAs suppress the thyroid and increase oxidative stress. Choose saturated fats instead.
                </p>

                <h5 className="font-medium text-gray-800 dark:text-gray-200">3. Lower Exercise Stress</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Move gently. Walk more. Train strength without overexerting. Rest more.
                </p>

                <h5 className="font-medium text-gray-800 dark:text-gray-200">4. Improve Sleep</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Good sleep lowers cortisol and supports metabolism.
                </p>

                <h5 className="font-medium text-gray-800 dark:text-gray-200">5. Support Your Thyroid</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Carbs, protein, minerals, and sunlight all support thyroid function.
                </p>

                <h5 className="font-medium text-gray-800 dark:text-gray-200">6. Lower Emotional & Mental Stress</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your thoughts directly affect your physiology. Create calm wherever you can.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">What Lighter™ Teaches You About Stress</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">Lighter™ helps you understand and lower stress through:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Education on stress physiology</li>
                  <li>Experiments to test what improves your energy</li>
                  <li>Tracking temperature and pulse to see stress vs. healing</li>
                </ul>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">Why Temperature & Pulse Matter</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Temperature shows metabolic rate.<br />
                  Pulse shows how efficiently you're making energy.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Low temp/pulse = stressed, slowed metabolism<br />
                  Rising temp/pulse = healing, safety, improved energy
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">Your Body Isn't Broken—It's Protecting You</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your body slows down, stores fat, raises cortisol, and lowers thyroid function because it thinks resources are scarce. It's protecting you.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  When you nourish it, rest it, and remove stressors, your metabolism rises. Your energy returns. Your weight stabilizes. You heal.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  This is the bioenergetic approach. This is what Lighter™ supports.
                </p>
              </div>
            )}
          </Card>


          {/* FOOD FOUNDATIONS */}
          <Card className="p-5 rounded-xl frosted-glass-warm" data-testid="card-food-foundations">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-rose-200 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200 flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Food Foundations</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Carbs · Protein · Fats</p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
              Understand why carbs are good, the best proteins for metabolic health, and 
              how to avoid PUFAs while supporting your hormones.
            </p>

            <Button
              onClick={() => setOpenSection(openSection === 'food' ? null : 'food')}
              className="w-full text-sm"
              data-testid="button-learn-food"
            >
              {openSection === 'food' ? "Hide" : "Learn More"}
            </Button>

            {openSection === 'food' && (
              <div className="mt-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  A practical overview of nutrition principles designed to support optimal cellular energy production and hormonal balance.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100">1. Why Simple Sugars Matter (Fruit Sugar, Honey, OJ)</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  The pro-metabolic approach views easily digestible sugars as the cell's preferred fuel source. When glucose and fructose are readily available, your metabolism can function optimally without relying on stress hormones for energy.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">Benefits of simple sugars:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Lower cortisol and adrenaline production</li>
                  <li>Support liver glycogen storage (signaling metabolic "safety")</li>
                  <li>Aid thyroid hormone conversion (T4 → T3)</li>
                  <li>Promote stable body temperature, pulse, and mood</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  When adequate sugar is available, the body shifts away from stress-based metabolism and produces more ATP, CO₂, and heat—hallmarks of efficient cellular respiration and energy generation.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">2. Why Carbohydrates Are Metabolically Preferred</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your mitochondria function most efficiently when fueled by carbohydrates. Compared to fats or proteins, carbs generate energy with minimal metabolic stress and maximum efficiency.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">Carbohydrates support:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Higher CO₂ production (a marker of efficient metabolism)</li>
                  <li>Improved oxygen utilization</li>
                  <li>Faster recovery and adaptation</li>
                  <li>Balanced hormone production</li>
                  <li>Stable body warmth and energy levels</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  This is why the pro-metabolic framework emphasizes easily digestible carbs from fruit, juice, honey, dairy sugars, squashes, potatoes, and similar sources—they provide clean fuel that supports rather than stresses your system.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">3. Fats to Avoid (PUFAs)</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  A cornerstone of the pro-metabolic approach is minimizing polyunsaturated fatty acids (PUFAs), primarily found in industrial seed oils.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Why avoid PUFAs?</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">PUFAs interfere with mitochondrial respiration and cellular function:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Suppress thyroid activity</li>
                  <li>Increase systemic inflammation</li>
                  <li>Elevate estrogen levels</li>
                  <li>Promote accumulation of aging pigments (lipofuscin)</li>
                  <li>Lower body temperature and energy production</li>
                  <li>Create long-term metabolic slowdown</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">PUFA-heavy fats to minimize:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Canola, soy, corn, sunflower, safflower oils</li>
                  <li>Most fish oils</li>
                  <li>Nut and seed oils</li>
                  <li>Commercial salad dressings and processed foods</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">Better fat choices:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Butter</li>
                  <li>Coconut oil</li>
                  <li>Beef tallow</li>
                  <li>Dairy fats</li>
                  <li>Cacao butter</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  These saturated fats are metabolically stable—they support energy production rather than interfere with it.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">4. Optimal Protein Sources</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  The pro-metabolic framework prioritizes proteins that are easy to digest, low in inflammatory compounds, and supportive of hormonal health.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Recommended proteins:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Dairy products (milk, cheese, Greek yogurt, cottage cheese)</li>
                  <li>Gelatin and collagen (important for balancing muscle meat amino acids)</li>
                  <li>Eggs (preferably well-cooked)</li>
                  <li>Shellfish (especially oysters and shrimp—rich in minerals)</li>
                  <li>Occasional well-sourced beef or lamb</li>
                  <li>Organ meats like liver (1–2 times per week for concentrated nutrition)</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  These protein sources support thyroid function, progesterone production, and overall metabolic rate while being gentle on digestion.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">5. Best Carbohydrate Sources</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Ideal carbohydrates in this approach are easily digestible, low in anti-nutrients, mineral-rich, and supportive of liver glycogen storage.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Preferred carb sources:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Fresh fruit (especially citrus and tropical varieties)</li>
                  <li>Orange juice (fresh-squeezed when possible)</li>
                  <li>Raw honey</li>
                  <li>Dairy sugars (lactose from milk and yogurt)</li>
                  <li>Well-cooked white potatoes</li>
                  <li>White rice (easier on the digestive system)</li>
                  <li>Cooked root vegetables (winter squash, carrots, beets)</li>
                  <li>Ripe papaya, pineapple, and berries</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  The key principle: carbohydrates should leave you feeling energized and light, not heavy or sluggish.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">6. Alcohol Considerations</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  When consuming alcohol, the pro-metabolic approach favors dry red wine in moderation.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Why dry red wine?</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Lower residual sugar reduces fermentation byproducts</li>
                  <li>Contains beneficial polyphenols and antioxidants</li>
                  <li>Generally lower in histamine than sweet wines</li>
                  <li>May support circulation when consumed lightly</li>
                  <li>Provides nervous system relaxation without severely compromising metabolism</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  The approach isn't anti-alcohol—it simply recognizes that quality and quantity matter significantly.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  If choosing to drink: Dry red wine over sweet wines, beer, or distilled spirits.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">7. The Central Importance of Avoiding PUFAs</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  This point bears repeating due to its foundational importance in the pro-metabolic framework.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">How PUFAs undermine metabolism:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Directly suppress thyroid hormone activity</li>
                  <li>Slow overall metabolic rate</li>
                  <li>Increase cellular oxidative stress</li>
                  <li>Promote estrogen dominance</li>
                  <li>Make cell membranes fragile and prone to inflammation</li>
                  <li>Interfere with glucose oxidation pathways</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  The pro-metabolic view holds that PUFA accumulation in tissues is a primary driver of modern chronic issues: persistent fatigue, stubborn weight gain, hormonal imbalances, PMS, and accelerated aging.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  Avoiding PUFAs supports: Restored energy levels, improved body temperature regulation, and balanced hormone production.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">Summary: The Pro-Metabolic Food Foundation</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">The core principles in brief:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>✓ Use easily digestible sugars to reduce stress hormone dependence</li>
                  <li>✓ Choose stable saturated fats for cellular integrity</li>
                  <li>✓ Select gentle, bioavailable proteins for tissue repair</li>
                  <li>✓ Strictly avoid PUFAs that interfere with mitochondrial function</li>
                  <li>✓ Emphasize carbohydrates that digest smoothly and support glycogen stores</li>
                  <li>✓ Approach alcohol thoughtfully when desired</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  This framework is fundamentally about supporting your body's natural energy production systems—prioritizing cellular respiration, hormonal balance, and metabolic efficiency through strategic food choices.
                </p>
              </div>
            )}
          </Card>


          {/* WARMTH & VITALS */}
          <Card className="p-5 rounded-xl" data-testid="card-warmth-vitals">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-200 flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Warmth & Vitals</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">What Temp & Pulse Tell You</p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
              Learn why warmth, temperature, and pulse give you a real-time picture of 
              whether your metabolism is healing or under stress.
            </p>

            <Button
              onClick={() => setOpenSection(openSection === 'vitals' ? null : 'vitals')}
              className="w-full text-sm"
              data-testid="button-learn-vitals"
            >
              {openSection === 'vitals' ? "Hide" : "Learn More"}
            </Button>

            {openSection === 'vitals' && (
              <div className="mt-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">1. Warmth = High Metabolic Function</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  In the pro-metabolic framework, body warmth is a direct indicator of cellular energy production. When your cells efficiently generate ATP, CO₂, and heat, you experience natural warmth, mental clarity, and emotional stability.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">A warm body signals:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Active thyroid function</li>
                  <li>Low stress hormone production</li>
                  <li>Efficient mitochondrial energy generation</li>
                  <li>Optimal digestion and stable mood</li>
                  <li>Strong metabolic resilience</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">Cold extremities indicate low energy output:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Cold hands, cold feet, or a persistently cold nose aren't just discomforts—they're signs that your cells aren't producing adequate energy. Your body prioritizes warming vital organs first, so cold extremities reveal that your metabolism is operating below optimal capacity.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  Warmth isn't merely about comfort—it's a real-time window into how efficiently your cells are converting fuel into usable energy.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">2. Pulse = Your Metabolic Fuel Source Indicator</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your resting pulse rate provides immediate feedback about whether your body is running on sustainable cellular energy or compensating with stress hormones.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">A healthy pro-metabolic pulse:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Rests between 75–90 beats per minute during the day</li>
                  <li>Feels strong and steady, not racing or pounding</li>
                  <li>Accompanies a warm body temperature</li>
                  <li>Remains relatively stable throughout the day</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">A chronically low pulse often indicates:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Suppressed thyroid activity</li>
                  <li>Elevated serotonin or cortisol</li>
                  <li>Low blood sugar availability</li>
                  <li>Metabolic "hibernation" mode</li>
                  <li>Slowed cellular respiration</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">A high pulse with cold body temperature signals:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Heavy reliance on adrenaline for energy</li>
                  <li>Insufficient ATP production at the cellular level</li>
                  <li>Compensation rather than true vitality</li>
                  <li>Stress-driven metabolism rather than sugar-driven</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  Your pulse reveals what type of energy your body is running on—sustainable cellular fuel or emergency stress hormones.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">3. Body Temperature Reflects Thyroid and Energy Production</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your thyroid gland orchestrates how your cells use oxygen and glucose to produce heat and energy. Body temperature is therefore one of the most reliable indicators of metabolic rate.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Optimal daytime temperature range:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>97.8–98.6°F (measured orally or under the arm)</li>
                  <li>Consistent throughout the day</li>
                  <li>Accompanied by warm hands and feet</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">Low body temperature indicates:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Reduced metabolic rate</li>
                  <li>Possible thyroid insufficiency</li>
                  <li>Cellular energy production below optimal levels</li>
                  <li>The overlap between stress physiology and aging physiology</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  Think of body temperature as your metabolism's fuel gauge—it shows how much energy your cells are actually generating, not just how much fuel you're consuming.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">4. These Vitals Reveal Whether You're in Energy Mode or Stress Mode</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Tracking temperature and pulse together creates a complete picture of your metabolic state. These simple measurements show whether your body is operating from a place of abundance or scarcity.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium text-green-700 dark:text-green-400">Energy Mode (Optimal Metabolism):</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Warm body and extremities</li>
                  <li>Steady, appropriate pulse rate</li>
                  <li>Stable, positive mood</li>
                  <li>Efficient digestion</li>
                  <li>Low cortisol and balanced stress response</li>
                  <li>Hormonal balance and regular cycles</li>
                  <li>Restful, uninterrupted sleep</li>
                  <li>Mental clarity and focus</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium text-red-700 dark:text-red-400 mt-2">Stress Mode (Compromised Metabolism):</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Cold hands, feet, or overall body</li>
                  <li>Low, erratic, or compensatory high pulse</li>
                  <li>Persistent fatigue despite rest</li>
                  <li>Irritability or mood swings</li>
                  <li>Pronounced PMS or hormonal symptoms</li>
                  <li>Digestive issues (bloating, constipation)</li>
                  <li>Waking frequently during the night</li>
                  <li>Brain fog and difficulty concentrating</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">The fundamental principle:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  When cellular energy production is abundant, all body systems function smoothly. When energy generation is blocked or insufficient, the body shifts into stress-compensation mode, and symptoms cascade across multiple systems.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  Your vitals show you which metabolic world your body currently inhabits.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">5. Why Self-Tracking Creates Healing Awareness</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  The pro-metabolic approach strongly encourages regular tracking of key metrics because patterns reveal what supports versus undermines your energy production.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">What to track:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Morning and afternoon body temperature</li>
                  <li>Resting pulse at multiple times of day</li>
                  <li>Physical symptoms and their timing</li>
                  <li>Sleep quality and interruptions</li>
                  <li>Responses to different foods and meals</li>
                  <li>Mood and energy fluctuations</li>
                  <li>Menstrual cycle changes (if applicable)</li>
                  <li>Stress levels and recovery capacity</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">What patterns reveal:</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li>Which foods consistently increase warmth and energy</li>
                  <li>Which meals cause pulse crashes or temperature drops</li>
                  <li>Whether stress is accumulating or resolving</li>
                  <li>How your metabolism adapts over time</li>
                  <li>Whether your interventions are actually working</li>
                  <li>Your body's unique metabolic rhythms</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Self-tracking transforms your body from a confusing mystery into an intelligible feedback system. You gain the ability to make informed adjustments based on objective data rather than guesswork or generic advice.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">The tracking mindset shift:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Instead of following rigid protocols blindly, you learn to read your body's signals and adjust accordingly. This creates a dynamic, personalized approach to metabolic healing where you become the expert on your own physiology.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mt-4">Why These Markers Matter So Much</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Warmth, temperature, and pulse are powerful because they provide simple, accessible, real-time indicators of:
                </p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                  <li><span className="font-medium">Thyroid function</span> – How well your master metabolic regulator is working</li>
                  <li><span className="font-medium">Stress load</span> – Whether you're running on cellular energy or stress hormones</li>
                  <li><span className="font-medium">Energy production</span> – How efficiently your mitochondria are generating ATP</li>
                  <li><span className="font-medium">Metabolic resilience</span> – Your capacity to handle physical and emotional demands</li>
                  <li><span className="font-medium">Overall vitality</span> – The foundational health that supports everything else</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  These measurements show how effectively you're producing energy—and energy production is the foundation of metabolic health.
                </p>

                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-4">The core insight:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Healing your metabolism isn't about following complicated protocols or restricting yourself into wellness. It's about understanding what supports your body's natural energy-generating capacity and providing the right conditions for that energy to flourish.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  <span className="text-green-700 dark:text-green-400">Warm body, steady pulse, stable energy</span> = cells producing abundant ATP = metabolism functioning as designed.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-red-700 dark:text-red-400">Cold body, erratic pulse, persistent fatigue</span> = cells struggling to produce energy = metabolism in stress compensation mode.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic mt-2">
                  These simple vitals give you immediate, honest feedback about whether your current approach is genuinely healing your metabolism or just masking symptoms while the underlying energy crisis continues.
                </p>
              </div>
            )}
          </Card>


          {/* HEALING TOOLS */}
          <Card className="p-5 rounded-xl" data-testid="card-healing-tools">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-violet-200 dark:bg-violet-900/50 text-violet-800 dark:text-violet-200 flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Healing Tools</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">The Core 5 Experiments</p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
              Explore the 5 core Lighter tools that help lower stress, improve digestion, 
              and restore metabolic function.
            </p>

            <Button
              onClick={() => setOpenSection(openSection === 'tools' ? null : 'tools')}
              className="w-full text-sm"
              data-testid="button-learn-tools"
            >
              {openSection === 'tools' ? "Hide" : "Learn More"}
            </Button>

            {openSection === 'tools' && (
              <div className="mt-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  Simple, measurable practices based on pro-metabolic principles to restore energy, warmth, and vitality.
                </p>

                {/* Experiment 1: Temperature Tracking */}
                <div className="border-l-4 border-orange-400 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Experiment 1: Track Your Temperature Daily</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <span className="font-medium">What it is:</span> Measure your body temperature 2–3 times per day to understand your baseline metabolic function and track improvements over time.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">How to do it:</p>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                    <li>Take your temperature upon waking (before getting out of bed)</li>
                    <li>Take it again mid-morning (around 10–11 AM)</li>
                    <li>Take it once more in the afternoon (around 2–4 PM)</li>
                    <li>Use an oral or underarm thermometer</li>
                    <li>Log your readings in the Lighter app along with how you feel</li>
                  </ul>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <span className="font-medium">Why it matters:</span> Temperature is your metabolism's fuel gauge. It shows whether your thyroid is active and your cells are producing adequate energy. Tracking creates awareness and reveals patterns—you'll see which foods, activities, and lifestyle choices raise your temperature (meaning they support your metabolism) and which ones lower it (meaning they create metabolic stress).
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">What you're looking for:</p>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                    <li>Gradual upward trends toward 97.8–98.6°F</li>
                    <li>More consistent readings throughout the day</li>
                    <li>Correlation between warmer temps and better energy/mood</li>
                    <li>Warm hands and feet accompanying higher readings</li>
                  </ul>
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic mt-2">
                    The healing insight: When you see your temperature rise consistently, you're witnessing cellular energy production improve in real time. This isn't subjective—it's measurable metabolic healing.
                  </p>
                </div>

                {/* Experiment 2: Carrot Salad */}
                <div className="border-l-4 border-orange-400 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Experiment 2: Eat a Daily Carrot Salad</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <span className="font-medium">What it is:</span> One raw carrot salad per day, designed to gently cleanse excess estrogen, endotoxins, and inflammatory compounds from your digestive system.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">How to make it:</p>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                    <li>1 large raw carrot, shredded or grated</li>
                    <li>1–2 tablespoons coconut oil or olive oil</li>
                    <li>1 tablespoon vinegar (apple cider or white)</li>
                    <li>Pinch of salt</li>
                  </ul>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Mix and eat, preferably between meals or before dinner.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <span className="font-medium">Why it matters:</span> Raw carrots contain unique insoluble fibers that bind to excess estrogen, bacterial endotoxins, and bile acids in your intestines, helping your body eliminate them before they're reabsorbed. This reduces the toxic load on your liver, lowers systemic inflammation, and helps rebalance hormones—all of which support better thyroid function and metabolic rate.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">What you might notice:</p>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                    <li>Improved digestion and regularity</li>
                    <li>Reduced bloating</li>
                    <li>Better mood and less PMS</li>
                    <li>Clearer skin</li>
                    <li>More stable energy</li>
                    <li>Gradual reduction in stress-related symptoms</li>
                  </ul>
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic mt-2">
                    The healing insight: Your gut health directly impacts your metabolic health. By reducing endotoxin and estrogen recirculation, you're removing metabolic brakes that have been slowing down your thyroid and energy production. This simple daily practice creates space for your metabolism to function more efficiently.
                  </p>
                </div>

                {/* Experiment 3: Eliminate PUFAs */}
                <div className="border-l-4 border-orange-400 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Experiment 3: Eliminate PUFAs (Polyunsaturated Fats)</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <span className="font-medium">What it is:</span> Systematically remove seed oils and PUFA-rich foods from your diet and replace them with stable, metabolism-supporting fats.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">Foods/oils to eliminate:</p>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                    <li>Canola, soybean, corn, sunflower, safflower oils</li>
                    <li>Vegetable oil and "blended" oils</li>
                    <li>Most restaurant and packaged foods (read labels carefully)</li>
                    <li>Margarine and industrial spreads</li>
                    <li>Most nuts and seeds (especially in large quantities)</li>
                    <li>Conventional chicken and pork (high in PUFA from feed)</li>
                  </ul>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">Replace with:</p>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                    <li>Butter (grass-fed when possible)</li>
                    <li>Coconut oil</li>
                    <li>Olive oil (in moderation, not heated)</li>
                    <li>Beef tallow or lamb fat</li>
                    <li>Dairy fats (cream, cheese, whole milk)</li>
                    <li>Cacao butter</li>
                  </ul>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <span className="font-medium">Why it matters:</span> PUFAs are chemically unstable and easily oxidize in your body, where they accumulate in cell membranes and interfere with mitochondrial respiration. They directly suppress thyroid function, block glucose metabolism, promote inflammation, and increase estrogen dominance. Removing them is often the single most powerful metabolic intervention you can make.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">What you might notice:</p>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                    <li>Increased body warmth (especially in hands and feet)</li>
                    <li>More stable energy without crashes</li>
                    <li>Reduced inflammation and pain</li>
                    <li>Better hormone balance</li>
                    <li>Improved sleep quality</li>
                    <li>Weight loss or easier weight management</li>
                    <li>Clearer thinking</li>
                  </ul>
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic mt-2">
                    The healing insight: PUFAs have accumulated in your tissues over years or decades. As you stop consuming them and they gradually clear from your system, your mitochondria can finally produce energy efficiently again. This experiment often creates the most dramatic and sustained improvements because you're removing a fundamental metabolic blocker.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Timeline note: Full PUFA clearance can take 2–4 years, but most people notice significant improvements within weeks to months.
                  </p>
                </div>

                {/* Experiment 4: Sunlight */}
                <div className="border-l-4 border-orange-400 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Experiment 4: Get Sunlight Daily</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <span className="font-medium">What it is:</span> Expose your skin and eyes to natural sunlight every day, prioritizing morning and midday light.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">How to do it:</p>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                    <li>Get outside within 30–60 minutes of waking</li>
                    <li>Aim for 10–30 minutes of direct sunlight on your skin (arms, legs, face)</li>
                    <li>Don't wear sunglasses during safe morning/evening light</li>
                    <li>Take a midday sun break when possible (even 5–10 minutes helps)</li>
                    <li>If you work indoors, eat lunch outside or take walking breaks</li>
                    <li>In winter or low-light climates, maximize whatever light exposure you can get</li>
                  </ul>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <span className="font-medium">Why it matters:</span> Sunlight does far more than produce vitamin D. Morning light sets your circadian rhythm, which regulates cortisol, melatonin, thyroid function, and metabolic rate. UV exposure supports steroid hormone production (including progesterone and pregnenolone), reduces inflammation, improves mitochondrial function, and directly supports cellular energy production. Red and near-infrared wavelengths penetrate deep into tissues and enhance ATP generation.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">What you might notice:</p>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                    <li>Better sleep quality and easier waking</li>
                    <li>Improved mood and reduced anxiety</li>
                    <li>More consistent energy throughout the day</li>
                    <li>Reduced inflammation and pain</li>
                    <li>Better stress resilience</li>
                    <li>Improved body temperature regulation</li>
                    <li>Enhanced sense of vitality</li>
                  </ul>
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic mt-2">
                    The healing insight: Your body is designed to interact with natural light. Modern indoor living has disconnected us from this fundamental metabolic signal. Sunlight exposure recalibrates your hormonal and circadian systems, allowing your metabolism to function according to its natural design. Light is information—and your metabolism needs that information to heal.
                  </p>
                </div>

                {/* Experiment 5: Joy & Presence */}
                <div className="border-l-4 border-orange-400 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Experiment 5: Do Something You Love Daily & Come Home to Your Body</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <span className="font-medium">What it is:</span> Intentionally engage in an activity that brings you genuine joy, relaxation, or fulfillment every single day—and practice being fully present in your body while doing it.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">Choose activities that genuinely nourish you:</p>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                    <li>Creative pursuits (painting, music, writing, crafting)</li>
                    <li>Gentle movement you enjoy (walking, dancing, swimming, stretching)</li>
                    <li>Social connection (calling a friend, quality time with loved ones)</li>
                    <li>Being in nature (gardening, hiking, sitting outside)</li>
                    <li>Reading, listening to music, cooking a beautiful meal</li>
                    <li>Any hobby or practice that makes you feel alive and peaceful</li>
                  </ul>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">The "coming home" practice:</p>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                    <li>While doing your chosen activity, actively relax your shoulders, jaw, and belly</li>
                    <li>Breathe slowly and fully</li>
                    <li>Notice sensations in your body without judgment</li>
                    <li>Let go of rushing or productivity pressure</li>
                    <li>Give yourself full permission to simply be rather than constantly do</li>
                    <li>Practice feeling safe in your body</li>
                  </ul>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <span className="font-medium">Why it matters:</span> Chronic stress and nervous system dysregulation suppress metabolism just as powerfully as poor nutrition. When you're constantly in fight-or-flight mode—rushing, worrying, pushing, never feeling safe or satisfied—your body produces cortisol and adrenaline instead of thyroid hormone and progesterone. True metabolic healing requires nervous system healing.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Joy, presence, and embodied relaxation signal to your body that it's safe to produce energy, digest food properly, balance hormones, and invest in healing rather than survival.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-2">What you might notice:</p>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                    <li>Decreased anxiety and mental tension</li>
                    <li>Better digestion (especially when you eat in a relaxed state)</li>
                    <li>Improved sleep</li>
                    <li>More stable mood and emotional resilience</li>
                    <li>Reduced pain and inflammation</li>
                    <li>Higher body temperature and steadier pulse</li>
                    <li>A sense of finally feeling "like yourself" again</li>
                  </ul>
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic mt-2">
                    The healing insight: Your metabolism cannot fully heal while your nervous system remains in chronic stress mode. Doing what you love isn't selfish or indulgent—it's a metabolic necessity. When you come home to your body through presence and joy, you're literally signaling your cells that it's safe to shift from stress-based survival metabolism to energy-abundant, regenerative metabolism.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    This experiment recognizes that you are not a machine to be optimized—you're a living being whose energy and healing capacity flourish in conditions of safety, pleasure, and genuine self-care.
                  </p>
                </div>

                {/* How to Use These Experiments */}
                <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">How to Use These Experiments on Lighter</h4>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-3">Start with tracking:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Temperature tracking (Experiment 1) gives you objective data to measure whether the other experiments are working for your unique body.
                  </p>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-3">Add experiments gradually:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    You don't need to do all five perfectly from day one. Start with one or two, establish consistency, then add more. Track your temperature, symptoms, and how you feel throughout.
                  </p>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-3">Look for patterns:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Use the Lighter app to log your experiments and notice:
                  </p>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                    <li>Which combinations increase your temperature most</li>
                    <li>How your energy and mood shift over time</li>
                    <li>What creates the biggest improvements in your specific symptoms</li>
                  </ul>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-3">Trust the process:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Metabolic healing isn't linear. You may have ups and downs, but consistent practice of these experiments creates the conditions for your body to restore its natural energy-producing capacity.
                  </p>
                </div>

                {/* The Fundamental Truth */}
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">The fundamental truth:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    These aren't restrictions or punishments—they're invitations to provide your body with what it's been missing: stable fuel sources, reduced toxic load, natural light, nervous system safety, and the conditions for cellular energy to flourish.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium italic mt-2">
                    When you give your body these things consistently, your metabolism remembers how to heal.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* --- ASK THE LIGHTER AI COACH --- */}
        <div className="mt-10 p-6 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700" data-testid="card-ai-coach">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Ask the Lighter AI Coach
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Get instant guidance on metabolic healing, stress, digestion, warmth, food, and daily habits.
            Ask anything — your Lighter Coach is here to help.
          </p>

          <div className="space-y-3">
            <textarea
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-500"
              rows={3}
              placeholder="Ask a question…"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              data-testid="textarea-ai-coach"
            />

            <Button
              onClick={handleAICoachAsk}
              className="w-full text-sm bg-violet-200 text-violet-800 hover:bg-violet-300"
              data-testid="button-ask-coach"
            >
              Ask the Coach
            </Button>

            {aiResponse && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line" data-testid="ai-coach-response">
                {aiResponse}
              </div>
            )}
          </div>
        </div>

        {/* bottom spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}
