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
              <div className="mt-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">What Is Energy Production?</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Metabolism is simply how your body turns food into usable energy. When 
                  energy production is strong, your body stays warm, digestion works well, 
                  hormones stay balanced, and stress hormones stay low.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Why PUFAs Lower Metabolism</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Polyunsaturated fats slow thyroid function and reduce your cells' ability 
                  to produce energy. This is why the pro-metabolic approach focuses on 
                  saturated fats and minimizing PUFAs.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Eating for Energy</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Carbs lower cortisol, protein stabilizes blood sugar, and saturated fats 
                  support hormone balance. Energy basics returns your body to its natural 
                  state of warmth and vitality.
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
              <div className="mt-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">How Stress Affects the Body</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  When your body experiences stress, adrenaline and cortisol rise. These 
                  hormones increase heart rate, steal energy from digestion, and make the 
                  body hold onto fat.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Why Stress Lowers Warmth</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Stress physiology shifts blood flow away from the gut and toward 
                  survival organs. This lowers warmth, slows metabolism, and makes you 
                  feel wired but tired.
                </p>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100">The Importance of Vitals</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Tracking temperature and pulse helps you see in real time whether you 
                  are in a stressed or healing state — making it one of the most accurate 
                  healing tools available.
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
