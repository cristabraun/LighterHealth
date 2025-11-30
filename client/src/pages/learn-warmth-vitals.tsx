import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LearnWarmthVitals() {
  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-background via-background to-primary/5">
      <div className="max-w-md mx-auto p-6 space-y-6">
        
        <Link href="/learn">
          <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-learn">
            <ArrowLeft className="w-4 h-4" />
            Back to Learn
          </Button>
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold" data-testid="heading-warmth-vitals">
            Warmth & Vitals
          </h1>
          <p className="text-muted-foreground" data-testid="subheading-warmth-vitals">
            What Temperature & Pulse Tell You
          </p>
        </div>

        <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-content-warmth-vitals">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Your morning temperature and resting pulse are powerful indicators of metabolic function. This section teaches 
              you how to measure and interpret these vital signs.
            </p>
            <p>
              Content placeholder: Learn why body temperature reflects thyroid function and metabolic rate. Understand what 
              your resting pulse reveals about nervous system balance and cellular energy. Discover how these measurements 
              change as your metabolism heals.
            </p>
            <p>
              Tracking your vitals is the language your body uses to communicate. Learn to read this data and adjust your 
              approach based on what your body is telling you.
            </p>
          </div>
        </Card>

        <Link href="/learn">
          <Button className="w-full bg-gradient-to-r from-primary to-chart-2" data-testid="button-back-to-learn-bottom">
            Back to Learn
          </Button>
        </Link>
      </div>
    </div>
  );
}
