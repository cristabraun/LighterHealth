import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LearnFoodFoundations() {
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
          <h1 className="text-3xl font-bold" data-testid="heading-food-foundations">
            Food Foundations
          </h1>
          <p className="text-muted-foreground" data-testid="subheading-food-foundations">
            Carbs, Protein, Fats
          </p>
        </div>

        <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-content-food-foundations">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Food is medicine for your metabolism. This section teaches you how to nourish your body in ways that support 
              optimal energy production and metabolic healing.
            </p>
            <p>
              Content placeholder: Learn why carbohydrates are essential, how to pair macronutrients for stable energy, 
              and which foods are easiest for your body to digest. Discover the role of minerals, hydration, and meal timing 
              in supporting metabolic function.
            </p>
            <p>
              Understand the difference between pro-metabolic foods and foods that stress your system. Learn practical meal 
              planning strategies that work with your body's needs.
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
