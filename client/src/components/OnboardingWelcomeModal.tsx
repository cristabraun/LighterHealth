import { X, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface OnboardingWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDontShowAgain: () => void;
}

export function OnboardingWelcomeModal({
  isOpen,
  onClose,
  onDontShowAgain,
}: OnboardingWelcomeModalProps) {
  const [, setLocation] = useLocation();

  const handleStartHere = () => {
    onClose();
    setLocation("/start-here");
  };

  const handleDontShowAgain = () => {
    onDontShowAgain();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-card border-border" data-testid="modal-onboarding-welcome">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          data-testid="button-close-modal"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <DialogHeader className="pt-2">
          <DialogTitle className="text-2xl font-bold text-foreground text-center" data-testid="heading-welcome-title">
            Welcome to Lighter™
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <p className="text-sm text-muted-foreground text-center leading-relaxed" data-testid="text-welcome-subtitle">
            Your metabolism, energy, and stress levels are about to make a lot more sense — tap Start Here to learn how Lighter works.
          </p>

          <div className="flex flex-col items-center gap-3">
            <Button
              onClick={handleStartHere}
              className="w-full bg-gradient-to-r from-primary to-chart-2 text-primary-foreground font-semibold py-3"
              data-testid="button-start-here"
            >
              Start Here
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <button
              onClick={handleDontShowAgain}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              data-testid="button-dont-show-again"
            >
              Don't show me this again
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
