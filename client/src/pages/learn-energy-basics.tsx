import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LearnEnergyBasics() {
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
          <h1 className="text-3xl font-bold" data-testid="heading-energy-basics">
            Energy Basics
          </h1>
          <p className="text-muted-foreground" data-testid="subheading-energy-basics">
            Metabolism 101
          </p>
        </div>

        <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-content-energy-basics">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This is the Energy Basics section where you'll learn the fundamentals of how your body produces and uses energy. 
              Understanding metabolism is the foundation of metabolic healing.
            </p>
            <p>
              Content placeholder: Detailed educational material about energy production, cellular function, ATP synthesis, 
              and how the pro-metabolic approach supports optimal energy creation in your body.
            </p>
            <p>
              This section covers the science behind why certain foods, behaviors, and practices help your cells make energy 
              more efficiently, and how this leads to feeling warmer, more energized, and healthier overall.
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
