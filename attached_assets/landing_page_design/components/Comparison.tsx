import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Check, X, Dumbbell } from 'lucide-react';

export const Comparison: React.FC = () => {
  const ref = useScrollReveal();

  return (
    <section id="pricing" className="relative py-16 lg:py-24">
      <div ref={ref} className="scroll-animate mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl mb-6 font-geist font-light tracking-tighter">
            Why Lighter™
            <span className="block bg-gradient-to-r from-amber-300 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-geist font-light tracking-tighter">
              Makes Sense
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/70 leading-relaxed">
            For less than the price of a gym membership, get personalized metabolic health guidance every day.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl w-full">
            
            {/* Fitness Memberships */}
            <div className="relative hover:bg-white/[0.04] transition-all duration-300 group rounded-2xl p-6 bg-[#0E0E12] border border-white/10 shadow-[inset_0_-16px_24px_rgba(255,255,255,0.05)]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex bg-white/5 border-white/20 border rounded-xl items-center justify-center">
                     <Dumbbell size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white tracking-tight leading-tight">Popular Weight Loss<br/>or Fitness Memberships</h3>
                    <p className="text-xs text-neutral-500 mt-1">Gyms / Classes</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl text-white font-geist font-light tracking-tighter">$40-$200</span>
                  <span className="text-sm text-neutral-400">/month</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">Generic access only</p>
              </div>

              <ul className="space-y-3 text-sm text-neutral-300 mb-8">
                <li className="flex items-start gap-3 opacity-50">
                   <X size={16} className="mt-0.5" />
                   Generic plans
                </li>
                <li className="flex items-start gap-3 opacity-50">
                  <X size={16} className="mt-0.5" />
                  No personalization
                </li>
                <li className="flex items-start gap-3 opacity-50">
                  <X size={16} className="mt-0.5" />
                  Do it yourself
                </li>
              </ul>
            </div>

            {/* Lighter Plan (Featured) */}
            <div className="relative hover:bg-white/[0.04] transition-all duration-300 group rounded-2xl p-6 bg-[#0E0E12] shadow-[inset_0_-16px_24px_rgba(255,255,255,0.25)] border-0 overflow-hidden transform scale-105 z-10">
               {/* Background Glows */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0E0E12] to-transparent z-0"></div>
              <div className="absolute top-0 right-0 w-[200%] h-32 bg-gradient-to-b from-orange-500/20 to-transparent blur-3xl transform -translate-y-1/2 translate-x-1/2 rotate-12"></div>
              <div className="absolute bottom-0 left-0 w-[200%] h-32 bg-gradient-to-t from-amber-500/20 to-transparent blur-3xl transform translate-y-1/2 -translate-x-1/2 -rotate-12"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex bg-white/10 border-white/20 border rounded-xl items-center justify-center">
                       <span className="text-lg">✨</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white tracking-tight">Lighter™</h3>
                      <p className="text-xs text-neutral-400">Daily Support</p>
                    </div>
                  </div>
                  <div className="h-5 w-5 rounded-full border-2 border-amber-400 bg-amber-400/20"></div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl text-white font-geist font-light tracking-tighter">$19</span>
                    <span className="text-sm text-neutral-400">/month</span>
                  </div>
                  <p className="text-xs text-amber-400 mt-1">First 3 days free</p>
                </div>

                <ul className="space-y-3 text-sm text-neutral-200 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="flex justify-center items-center w-4 h-4 bg-amber-500 rounded-full mt-0.5">
                      <Check size={10} className="text-black" />
                    </div>
                    Daily vital tracking
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex justify-center items-center w-4 h-4 bg-amber-500 rounded-full mt-0.5">
                      <Check size={10} className="text-black" />
                    </div>
                    Personalized experiments
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex justify-center items-center w-4 h-4 bg-amber-500 rounded-full mt-0.5">
                      <Check size={10} className="text-black" />
                    </div>
                    Metabolic protocols
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex justify-center items-center w-4 h-4 bg-amber-500 rounded-full mt-0.5">
                      <Check size={10} className="text-black" />
                    </div>
                    Direct messaging support
                  </li>
                </ul>

                <button className="w-full inline-flex gap-2 hover:from-amber-600 hover:to-orange-600 transition-all duration-200 text-sm font-semibold text-black bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl py-3 px-6 shadow-lg items-center justify-center">
                  Start Free Trial
                </button>
              </div>
            </div>

            {/* Specialist Plan */}
            <div className="relative hover:bg-white/[0.04] transition-all duration-300 group rounded-2xl p-6 bg-[#0E0E12] border border-white/10 shadow-[inset_0_-16px_24px_rgba(255,255,255,0.05)]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex bg-white/5 border-white/20 border rounded-xl items-center justify-center">
                     <span className="text-lg">👨‍⚕️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white tracking-tight">Specialist</h3>
                    <p className="text-xs text-neutral-500">Nutritionist / Coach</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl text-white font-geist font-light tracking-tighter">$150+</span>
                  <span className="text-sm text-neutral-400">/session</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">One-time consult</p>
              </div>

              <ul className="space-y-3 text-sm text-neutral-300 mb-8">
                <li className="flex items-start gap-3">
                  <Check size={16} className="mt-0.5 text-neutral-500" />
                  Expert Advice
                </li>
                <li className="flex items-start gap-3 opacity-50">
                  <X size={16} className="mt-0.5" />
                  Expensive per hour
                </li>
                <li className="flex items-start gap-3 opacity-50">
                   <X size={16} className="mt-0.5" />
                   No daily tracking
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};