import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LearnStressPhysiology() {
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
          <h1 className="text-3xl font-bold" data-testid="heading-stress-physiology">
            Stress Physiology
          </h1>
          <p className="text-muted-foreground" data-testid="subheading-stress-physiology">
            Why You Feel the Way You Feel
          </p>
        </div>

        <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-content-stress-physiology">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Stress is one of the most powerful factors affecting your metabolism. This section explores how physical and 
              emotional stress impacts your body at a cellular level.
            </p>
            <p>
              Content placeholder: Deep dive into cortisol, the nervous system, fight-or-flight responses, and how chronic 
              stress slows metabolism. Learn practical strategies to support your nervous system and reduce metabolic stress.
            </p>
            <p>
              Understanding stress physiology helps you recognize why certain practices—like rest, warm foods, and adequate 
              nourishment—are so powerful for metabolic healing.
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
