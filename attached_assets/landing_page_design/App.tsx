import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { DetailedFeatures } from './components/DetailedFeatures';
import { DashboardPreview } from './components/DashboardPreview';
import { Comparison } from './components/Comparison';
import { VideoPreview } from './components/VideoPreview';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { FinalCTA } from './components/FinalCTA';
import { BackgroundEffects } from './components/BackgroundEffects';

function App() {
  return (
    <div className="min-h-screen bg-transparent text-text-primary font-sans selection:bg-white/20 selection:text-white overflow-x-hidden relative">
      <BackgroundEffects />
      <Navigation />
      
      <main>
        <Hero />
        <Features />
        <DashboardPreview />
        <DetailedFeatures />
        <Testimonials />
        <Comparison />
        <VideoPreview />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;