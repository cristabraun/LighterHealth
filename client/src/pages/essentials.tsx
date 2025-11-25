import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function Essentials() {
  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-md mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight" data-testid="heading-essentials">Essentials</h1>
          </div>
          <p className="text-muted-foreground">
            Curated supplements and wellness tools for your metabolic healing
          </p>
        </div>

        <Card className="p-8 text-center space-y-4 bg-gradient-to-br from-primary/5 to-chart-2/5 border-primary/10">
          <div className="space-y-2">
            <Sparkles className="w-12 h-12 mx-auto text-primary/50" />
            <h2 className="text-2xl font-semibold text-foreground" data-testid="heading-coming-soon">Coming Soon</h2>
            <p className="text-muted-foreground" data-testid="text-essentials-description">
              We're curating the best supplements, minerals, and wellness tools to support your metabolic healing journey. Check back soon!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
