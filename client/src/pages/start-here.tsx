import React from "react";
import { Link } from "react-router-dom";

export default function StartHere() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Start Here ✨
      </h1>

      <p className="text-gray-700 leading-relaxed">
        Welcome to <strong>Lighter™</strong> — the metabolic healing system that helps you feel
        energized, calm, and in control of your body again.  
        Instead of dieting or forcing discipline, we use bioenergetic
        principles to restore your metabolism, lower stress, and help your body feel safe.
      </p>

      <div className="bg-orange-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-orange-700 mb-2">
          What Do You Want to Improve First?
        </h2>

        <p className="text-gray-700 mb-4">
          Choose your main focus, and I’ll guide you step-by-step with the
          right experiments and daily habits.
        </p>

        <div className="space-y-3">
          <Link
            to="/start-plan?goal=weight-loss"
            className="block bg-orange-500 text-white rounded-md px-4 py-3 text-center font-medium"
          >
            Lose Weight (Safely)
          </Link>

          <Link
            to="/start-plan?goal=sleep"
            className="block bg-orange-500 text-white rounded-md px-4 py-3 text-center font-medium"
          >
            Sleep Better
          </Link>

          <Link
            to="/start-plan?goal=energy"
            className="block bg-orange-500 text-white rounded-md px-4 py-3 text-center font-medium"
          >
            Raise My Energy
          </Link>

          <Link
            to="/start-plan?goal=stress"
            className="block bg-orange-500 text-white rounded-md px-4 py-3 text-center font-medium"
          >
            Lower My Stress
          </Link>

          <Link
            to="/start-plan?goal=hormones"
            className="block bg-orange-500 text-white rounded-md px-4 py-3 text-center font-medium"
          >
            Balance Hormones
          </Link>
        </div>
      </div>

      <div className="pt-4">
        <p className="text-gray-600">
          Or explore everything on your own:
        </p>
        <Link
          to="/learn"
          className="text-orange-600 font-medium underline"
        >
          Browse metabolic lessons →
        </Link>
      </div>
    </div>
  );
}

