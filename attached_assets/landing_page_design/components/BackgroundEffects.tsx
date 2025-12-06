import React, { useEffect, useRef } from 'react';

export const BackgroundEffects: React.FC = () => {
  // Refs for the wrapper elements that will receive parallax transform
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const winW = window.innerWidth;
      const winH = window.innerHeight;

      // Update CSS variables for global mouse position for the spotlight
      document.documentElement.style.setProperty('--mouse-x', `${clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${clientY}px`);
      
      // Update CSS variables for percentage-based gradients
      const pctX = (clientX / winW) * 100;
      const pctY = (clientY / winH) * 100;
      document.documentElement.style.setProperty('--mouse-x-pct', `${pctX}%`);
      document.documentElement.style.setProperty('--mouse-y-pct', `${pctY}%`);

      // Parallax effect on wrappers
      parallaxRefs.current.forEach((wrapper, index) => {
        if (!wrapper) return;
        
        // Subtle parallax effect: blobs further away (lower index) move slower
        // Index 0: Background (slowest) -> 0.02
        // Index 2: Foreground (fastest) -> 0.06
        const depthFactor = (index + 1) * 0.02; 
        
        // Move opposite to mouse direction
        const x = (centerX - clientX) * depthFactor;
        const y = (centerY - clientY) * depthFactor;
        
        // Apply transform directly for 1:1 responsiveness (no lag)
        wrapper.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    // Initialize variables
    document.documentElement.style.setProperty('--mouse-x', `${window.innerWidth / 2}px`);
    document.documentElement.style.setProperty('--mouse-y', `${window.innerHeight / 2}px`);
    document.documentElement.style.setProperty('--mouse-x-pct', '50%');
    document.documentElement.style.setProperty('--mouse-y-pct', '50%');

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* 1. Global Gradient Base - Dynamic Mouse Reaction */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(
              circle 1400px at var(--mouse-x-pct, 50%) -10%,
              rgba(180, 83, 9, 0.15),
              transparent 60%
            ),
            radial-gradient(
              circle 800px at var(--mouse-x-pct, 50%) var(--mouse-y-pct, 50%),
              rgba(245, 158, 11, 0.05),
              transparent 40%
            ),
            linear-gradient(to bottom, rgba(15, 15, 17, 1), #0f0f11)
          `,
          backgroundColor: '#0f0f11'
        }}
      />

      {/* 2. CSS Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(245, 158, 11, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(245, 158, 11, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
        }}
      />

      {/* 3. Top Orange Glow (The "Light") */}
      <div 
        className="absolute top-0 left-0 w-full h-[900px] bg-gradient-to-b from-amber-300/20 via-orange-500/10 to-transparent blur-3xl z-0 transition-transform duration-500 ease-out" 
        style={{
            transform: 'translateX(calc((var(--mouse-x-pct, 50%) - 50%) * 0.1))'
        }}
      />
      
      {/* 3b. Extra Top Highlight for "Lightness" */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[500px] bg-amber-100/10 blur-[120px] z-0" />

      {/* 4. Dynamic Mouse Follower Spotlight */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(251, 191, 36, 0.08), transparent 40%)`
        }}
      />

      {/* 5. Floating Orbs Container */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        
        {/* Blob 1 Wrapper - Top Left (Background - Slowest) */}
        <div 
          ref={(el) => { parallaxRefs.current[0] = el; }}
          className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] will-change-transform"
        >
          {/* Inner Blob - Orange */}
          <div className="w-full h-full rounded-full bg-orange-600/20 blur-[120px] mix-blend-screen animate-float" />
        </div>
        
        {/* Blob 2 Wrapper - Center Right (Midground - Medium) */}
        <div 
          ref={(el) => { parallaxRefs.current[1] = el; }}
          className="absolute top-[10%] -right-[20%] w-[60vw] h-[60vw] will-change-transform"
        >
          {/* Inner Blob - Amber */}
          <div className="w-full h-full rounded-full bg-amber-600/20 blur-[120px] mix-blend-screen animate-float-delayed" />
        </div>
        
        {/* Blob 3 Wrapper - Bottom Left (Foreground - Fastest) */}
        <div 
          ref={(el) => { parallaxRefs.current[2] = el; }}
          className="absolute -bottom-[20%] left-[0%] w-[50vw] h-[50vw] will-change-transform"
        >
          {/* Inner Blob - Yellow */}
          <div className="w-full h-full rounded-full bg-yellow-500/15 blur-[100px] mix-blend-screen animate-float-slow" />
        </div>

      </div>
      
      {/* 6. Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};