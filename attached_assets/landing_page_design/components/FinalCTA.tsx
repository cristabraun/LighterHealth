import React from 'react';
import { Button } from './ui/Button';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Image Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen">
        <img 
          src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8eb0f134-ad73-4767-934c-a816876c5a4c_800w.jpg" 
          alt="Background Texture" 
          className="w-full h-full object-cover"
          style={{ filter: 'hue-rotate(135deg) saturate(1.5) brightness(0.8) blur(2px)' }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0f11]/80 to-[#0f0f11] pointer-events-none" />
      
      {/* Amber Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-5xl sm:text-6xl font-light tracking-tighter mb-8">
          Ready to Feel Lighter?
        </h2>
        <p className="text-xl text-text-secondary mb-10">
          Join the community of women healing their metabolism today.
        </p>
        
        <div className="flex flex-col items-center gap-4">
          <Button size="lg" className="px-12 bg-white text-black hover:bg-white/90">Start Your 3-Day Trial</Button>
          <p className="text-sm text-text-muted">Cancel anytime. No pressure.</p>
        </div>
      </div>
    </section>
  );
};