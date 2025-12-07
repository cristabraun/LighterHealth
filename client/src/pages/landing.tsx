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
    window.location.href = '/auth';
  };

  const handleStartTrial = () => {
    window.location.href = '/auth';
  };

  return (
    <div className="landing-page min-h-screen bg-[#0f0f11] text-white font-sans selection:bg-white/20 selection:text-white overflow-x-hidden relative">
      <BackgroundEffects />
      <Navigation onLogin={handleLogin} onGetStarted={handleGetStarted} />
      
      <main>
        <Hero onStartTrial={handleStartTrial} />
        <Features />
        <DashboardPreview onStartTrial={handleStartTrial} />
        <DetailedFeatures />
        <Testimonials />
        <Comparison onStartTrial={handleStartTrial} />
        <VideoPreview />
        <FinalCTA onStartTrial={handleStartTrial} />
      </main>

      <Footer />
    </div>
  );
}
