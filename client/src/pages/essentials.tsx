import { Card } from "@/components/ui/card";
import { Sparkles, Heart, Pill, Sun, Leaf, Droplets, Zap } from "lucide-react";

export default function Essentials() {
  const placeholderItems = [
    { icon: Heart, title: "Thyroid Support", description: "Supplements for metabolic function" },
    { icon: Pill, title: "Minerals", description: "Essential minerals for cellular health" },
    { icon: Sun, title: "Light Therapy", description: "Tools for circadian rhythm support" },
    { icon: Leaf, title: "Digestive Aids", description: "Support for gut health" },
    { icon: Droplets, title: "Hydration", description: "Electrolyte and mineral balance" },
    { icon: Zap, title: "Energy Support", description: "Natural energy enhancers" },
  ];

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight" data-testid="heading-essentials">Essentials</h1>
          </div>
          <p className="text-muted-foreground">
            Curated supplements and wellness tools for your metabolic healing
          </p>
        </div>

        {/* Coming Soon Card - Full width */}
        <Card className="p-8 text-center space-y-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border-primary/10">
          <div className="space-y-2">
            <Sparkles className="w-12 h-12 mx-auto text-primary/50" />
            <h2 className="text-2xl font-semibold text-foreground" data-testid="heading-coming-soon">Coming Soon</h2>
            <p className="text-muted-foreground max-w-lg mx-auto" data-testid="text-essentials-description">
              We're curating the best supplements, minerals, and wellness tools to support your metabolic healing journey. Check back soon!
            </p>
          </div>
        </Card>

        {/* Preview Grid - 2-3 columns on desktop */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-muted-foreground">What's Coming</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {placeholderItems.map((item, index) => (
              <Card 
                key={index} 
                className="p-6 space-y-3 opacity-60 hover:opacity-80 transition-opacity bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm"
                data-testid={`card-essential-${index}`}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
