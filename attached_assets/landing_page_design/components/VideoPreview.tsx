import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Spotlight } from './ui/Spotlight';

export const VideoPreview: React.FC = () => {
  const ref = useScrollReveal();

  return (
    <section className="relative py-16 lg:py-24">
      <div ref={ref} className="scroll-animate mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl mb-6 font-geist font-light tracking-tighter">
            Take a Peek
            <span className="block bg-gradient-to-r from-amber-300 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-geist font-light tracking-tighter">
              Inside the App
            </span>
          </h2>
        </div>

        {/* Video Container */}
        <Spotlight 
          className="group relative w-full aspect-video overflow-hidden rounded-[2rem] border border-white/10 bg-[#0E0E12] shadow-2xl shadow-black/50 ring-1 ring-white/5"
          glowColor="rgba(245, 158, 11, 0.25)"
        >
          <video 
            className="w-full h-full object-cover rounded-[2rem]"
            controls
            playsInline
            poster="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/905eec03-e9d1-4c06-ac00-75f4081ef1b6_800w.jpg"
          >
            {/* PASTE YOUR VIDEO URL IN THE SRC ATTRIBUTE BELOW */}
            <source src="" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Spotlight>
      </div>
    </section>
  );
};