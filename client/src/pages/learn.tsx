import { Card } from "@/components/ui/card";
import { Volume2 } from "lucide-react";
import startHereAudio from "@assets/Pro Metabolic Tracking and Healing Intro_1764477961046.wav?url";

export default function Learn() {
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

        {/* --- LEARNING PATH CARDS (GRID ON DESKTOP) --- */}
        <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">

          {/* 1 — Energy Basics */}
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
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Understand how your body makes energy, why metabolism matters,
              and how the pro-metabolic approach differs from restrictive diets.
            </p>
          </Card>

          {/* 2 — Nutrition Essentials */}
          <Card className="p-5 rounded-xl" data-testid="card-nutrition-essentials">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-yellow-200 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Nutrition Essentials
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Food That Heals</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Learn the core foods that support warmth, energy, digestion, and
              hormonal balance — without dieting.
            </p>
          </Card>

          {/* 3 — Stress & Hormones */}
          <Card className="p-5 rounded-xl" data-testid="card-stress-hormones">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-rose-200 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200 flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Stress & Hormones
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">The Hidden Blocker</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Understand how stress changes metabolism and how lowering cortisol
              unlocks fat loss, better sleep, and better digestion.
            </p>
          </Card>

          {/* 4 — Digestion & Detox */}
          <Card className="p-5 rounded-xl" data-testid="card-digestion-detox">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-200 flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Digestion & Detox
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your Gut & Liver</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Learn how to support digestion, improve bowel movements, and
              reduce endotoxin — a major stressor on metabolism.
            </p>
          </Card>

          {/* 5 — Daily Practices */}
          <Card className="p-5 rounded-xl" data-testid="card-daily-practices">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-violet-200 dark:bg-violet-900/50 text-violet-800 dark:text-violet-200 flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Daily Practices
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Small Steps, Real Change</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              The simple habits that create real, consistent metabolic healing
              — warmth, energy, calmness, and steady fat loss.
            </p>
          </Card>
        </div>

        {/* bottom spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}
