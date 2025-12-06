import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Spotlight } from './ui/Spotlight';

export const DashboardPreview: React.FC = () => {
  const ref = useScrollReveal();

  return (
    <section id="dashboard" className="relative py-16 lg:py-24">
      <div ref={ref} className="scroll-animate mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl mb-6 font-geist font-light tracking-tighter">
            See Inside
            <span className="block bg-gradient-to-r from-amber-300 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-geist font-light tracking-tighter">
              The App
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/70 leading-relaxed">
            Lighter™ helps you see what's really been happening beneath the surface.
          </p>
        </div>

        {/* Dual Screenshot Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start justify-center">
          
          {/* Screenshot 1 */}
          <Spotlight 
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 bg-[#0E0E12] shadow-2xl shadow-black/50"
            glowColor="rgba(245, 158, 11, 0.2)"
          >
            {/* Placeholder for "Your Metabolic Dashboard" Screenshot */}
            {/* REPLACE src WITH YOUR DASHBOARD SCREENSHOT URL */}
            <div className="aspect-[9/19] w-full relative">
              <img 
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8eb0f134-ad73-4767-934c-a816876c5a4c_800w.jpg" 
                alt="Lighter Dashboard" 
                className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" 
                style={{ filter: 'brightness(0.9)' }}
              />
              {/* Overlay to hint at UI if image is abstract */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
            </div>
          </Spotlight>

          {/* Screenshot 2 */}
          <Spotlight 
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 bg-[#0E0E12] shadow-2xl shadow-black/50"
            glowColor="rgba(245, 158, 11, 0.2)"
          >
            {/* Placeholder for "Tracking" Screenshot */}
            {/* REPLACE src WITH YOUR TRACKING SCREENSHOT URL */}
            <div className="aspect-[9/19] w-full relative">
              <img 
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/b535e27a-5611-40e0-a6fd-24d3fdc4aa08_800w.jpg" 
                alt="Lighter Tracking" 
                className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'brightness(0.9)' }}
              />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
            </div>
          </Spotlight>

        </div>

        <div className="text-center mt-16">
          <button className="group inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-base font-medium text-white/90 hover:bg-white/10 hover:border-white/25 transition-all duration-300 backdrop-blur-xl">
             Start Your 3-Day Trial
          </button>
        </div>
      </div>
    </section>
  );
};