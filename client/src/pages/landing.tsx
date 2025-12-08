import {
  BackgroundEffects,
  Navigation,
  Hero,
  Features,
  DashboardPreview,
  DetailedFeatures,
  Comparison,
  Testimonials,
  VideoPreview,
  FinalCTA,
  Footer
} from '@/components/landing';

export default function Landing() {
  const handleLogin = () => {
    window.location.href = '/auth';
  };

  const handleGetStarted = () => {
    window.location.href = '/auth?mode=register';
  };

  const handleStartBeta = () => {
    // Route directly to signup page for free beta
    window.location.href = '/auth?mode=register';
  };

  return (
    <div className="landing-page min-h-screen bg-[#0f0f11] text-white font-sans selection:bg-white/20 selection:text-white overflow-x-hidden relative">
      <BackgroundEffects />
      <Navigation onLogin={handleLogin} onGetStarted={handleGetStarted} />
      
      <main>
        <Hero onStartTrial={handleStartBeta} />
        <Features />
        <DashboardPreview onStartTrial={handleStartBeta} />
        <DetailedFeatures />
        <Testimonials />
        <Comparison onStartTrial={handleStartBeta} />
        <VideoPreview />
        <FinalCTA onStartTrial={handleStartBeta} />
      </main>

      <Footer />
    </div>
  );
}
