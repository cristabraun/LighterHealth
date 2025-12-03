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
        <Card className="p-5 md:p-6 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-800/30 rounded-xl">
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
        <Card className="p-4 rounded-xl shadow-sm">
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
          <Card className="p-5 rounded-xl" data-testid="card-energy-basics">
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
          <Card className="p-5 rounded-xl" data-testid="card-stress-physiology">
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
          <Card className="p-5 rounded-xl" data-testid="card-food-foundations">
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
              <div className="mt-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Carbs Are Not the Enemy</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Carbs lower cortisol and give the liver the fuel it needs to regulate 
                  hormones. Fruit, juice, sugar, and roots are central in the pro-metabolic 
                  approach.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Protein for Hormone Health</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Dairy proteins, eggs, gelatin, and shellfish support muscle, thyroid 
                  function, and detoxification.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Fats That Heal</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Saturated fats support metabolism. PUFAs suppress thyroid function and 
                  slow mitochondrial energy production.
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
              <div className="mt-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Warmth as a Healing Marker</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Warm hands, feet, and nose are signs your metabolism is producing enough 
                  energy and your thyroid is supported.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100">What Pulse Shows</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  A healthy pulse (75–90 bpm) means your cells are using energy well. A 
                  low pulse can signal sluggish thyroid function or chronic stress.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Temperature Patterns</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Morning temperatures show thyroid baseline. Rising temperatures through 
                  the day show your metabolism is responding to food and movement.
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
              <div className="mt-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Carrot Salad</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Daily raw carrot salad binds estrogen and endotoxin, reduces bloating, 
                  and lowers stress burden.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100">White Button Mushrooms</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Mushrooms lower aromatase, reduce estrogen burden, and support immune 
                  and gut balance.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Orange Juice</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Fresh OJ provides easy-to-digest sugar, potassium, and vitamin C that 
                  support liver and thyroid function.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Gelatin & Bone Broth</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Glycine-rich foods balance amino acids, support gut healing, and improve 
                  sleep quality.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Salt & Hydration</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Proper sodium intake supports adrenal function, blood pressure regulation, 
                  and reduces stress hormones.
                </p>
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
