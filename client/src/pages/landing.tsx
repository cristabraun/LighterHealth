import { useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';

export default function Landing() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = () => {
    window.location.href = '/auth';
  };

  const handleGetStarted = () => {
    window.location.href = '/auth';
  };

  const handleStartTrial = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-guest-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Unable to start checkout',
        description: 'Please try again or contact support if the issue persists.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
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
