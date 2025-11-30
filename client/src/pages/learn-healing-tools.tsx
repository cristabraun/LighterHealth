import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LearnHealingTools() {
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
          <h1 className="text-3xl font-bold" data-testid="heading-healing-tools">
            Healing Tools
          </h1>
          <p className="text-muted-foreground" data-testid="subheading-healing-tools">
            Foundational Experiments
          </p>
        </div>

        <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-content-healing-tools">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The five foundational experiments form the core of your metabolic healing journey. This section explains each 
              tool and how to use them effectively.
            </p>
            <p>
              Content placeholder: Discover the science behind morning temperature and pulse tracking, daily carrot salad 
              for digestion, avoiding inflammatory oils, eating before coffee, and pairing carbs with protein. Learn why 
              these practices work and how to implement them consistently.
            </p>
            <p>
              These aren't complicated rules—they're simple, evidence-based practices that signal to your body it's safe 
              and well-fed. Together, they create the foundation for metabolic healing.
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
