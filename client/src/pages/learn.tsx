import { useState } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Zap, Sparkles, Volume2, Send, Thermometer, Heart, Moon, BookOpen, ArrowRight } from "lucide-react";
import startHereAudio from "@assets/Pro Metabolic Tracking and Healing Intro_1764477961046.wav?url";

export default function Learn() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAskCoach = async () => {
    if (question.trim()) {
      setIsLoading(true);
      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        });
        const data = await res.json();
        if (data.reply) {
          setResponse(data.reply);
        } else {
          setResponse("I couldn't generate a response. Please try again.");
        }
      } catch (error) {
        console.error("Error asking coach:", error);
        setResponse("There was an error connecting to the AI Coach. Please try again.");
      } finally {
        setIsLoading(false);
        setQuestion("");
      }
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-background via-background to-primary/5">
      <div className="max-w-md mx-auto p-6 space-y-8">

        {/* SECTION 1: Start Here Intro Card */}
        <div className="space-y-4">
          <Card
            className="p-6 space-y-4 bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20"
            data-testid="card-intro-learn"
          >
            <h1 className="text-2xl font-bold" data-testid="heading-start-here-learn">
              Start Here
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-intro-description">
              Learn the basics of healing your metabolism. This section teaches you the foundations of metabolic healing, so you can understand why you're tracking what you're tracking, and why it matters.
            </p>
          </Card>

          <div className="p-4 rounded-lg bg-muted/40 space-y-3" data-testid="audio-section-welcome">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium" data-testid="label-welcome-audio">Play Welcome Audio</span>
            </div>
            <audio controls className="w-full rounded-md" data-testid="audio-welcome-learn">
              <source src={startHereAudio} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>

        {/* SECTION 2: Learning Path - 5 Steps */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold" data-testid="heading-learning-path">
            Lighter™ Learning Path
          </h2>
          <p className="text-sm text-muted-foreground" data-testid="text-learning-intro">
            Follow these 5 steps to understand metabolic healing:
          </p>

          <div className="space-y-3">
            {[
              {
                id: "energy-basics",
                num: "1",
                title: "Energy Basics",
                subtitle: "Metabolism 101",
                desc: "Understand how your body makes energy, why metabolism matters, and how the pro-metabolic approach differs from restrictive diets.",
                href: "/learn-energy-basics",
              },
              {
                id: "stress-physiology",
                num: "2",
                title: "Stress Physiology",
                subtitle: "Why You Feel the Way You Feel",
                desc: "Learn how stress affects your body, why it slows metabolism, and how to support your nervous system.",
                href: "/learn-stress-physiology",
              },
              {
                id: "food-foundations",
                num: "3",
                title: "Food Foundations",
                subtitle: "Carbs, Protein, Fats",
                desc: "Discover why carbs are your friend, how to pair nutrients, and what easy-to-digest foods support healing.",
                href: "/learn-food-foundations",
              },
              {
                id: "warmth-vitals",
                num: "4",
                title: "Warmth & Vitals",
                subtitle: "What Temperature & Pulse Tell You",
                desc: "Learn to interpret your morning temperature, resting pulse, and what these numbers reveal about your metabolism.",
                href: "/learn-warmth-vitals",
              },
              {
                id: "healing-tools",
                num: "5",
                title: "Healing Tools",
                subtitle: "Foundational Experiments",
                desc: "Explore the 5 core experiments that form your metabolic healing foundation and why they work.",
                href: "/learn-healing-tools",
              },
            ].map((step) => (
              <Card
                key={step.id}
                className="p-4 space-y-3 hover-elevate active-elevate-2 border border-primary/10"
                data-testid={`card-step-${step.id}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-chart-2 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{step.num}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold" data-testid={`heading-${step.id}`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">{step.subtitle}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{step.desc}</p>
                    <Link href={step.href} data-testid={`link-learn-${step.id}`}>
                      <Button variant="outline" size="sm" data-testid={`button-learn-${step.id}`}>
                        Learn More
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* SECTION 3: AI Coach */}
        <Card
          className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-chart-2/5 border border-primary/10"
          data-testid="card-ai-coach"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold" data-testid="heading-ai-coach">
              Ask the Lighter™ AI Coach
            </h2>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <label htmlFor="coach-question" className="text-sm font-medium" data-testid="label-question">
                Your Question
              </label>
              <textarea
                id="coach-question"
                placeholder="Ask anything about metabolic healing, nutrition, or your experiments..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                rows={3}
                data-testid="input-coach-question"
              />
            </div>

            <Button
              onClick={handleAskCoach}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-chart-2"
              data-testid="button-ask-coach"
            >
              <Send className="w-4 h-4 mr-2" />
              {isLoading ? "Asking..." : "Ask"}
            </Button>

            {response && (
              <div className="p-4 rounded-lg bg-background border border-primary/20 space-y-2" data-testid="coach-response">
                <p className="text-xs font-medium text-muted-foreground uppercase">AI Coach Response</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{response}</p>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground text-center pt-2 border-t border-primary/10" data-testid="disclaimer-coach">
            For educational guidance only, not medical advice.
          </p>
        </Card>

        {/* SECTION 4: Topics Library */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold" data-testid="heading-topics-library">
            Topics Library
          </h2>

          <Accordion type="single" collapsible className="space-y-3">
            {[
              {
                id: "hormones",
                title: "Hormones",
                content: "Understand how hormones regulate your metabolism, why thyroid function matters, and how the pro-metabolic approach supports hormonal balance. Learn about the connection between nutrition, stress, and hormone production.",
                link: "/learn-hormones",
              },
              {
                id: "sleep-stress",
                title: "Sleep & Stress",
                content: "Explore how sleep affects metabolism, why stress slows healing, and practical strategies to improve rest quality. Learn why warm bedrooms, magnesium, and consistent timing matter for metabolic recovery.",
              },
              {
                id: "digestion",
                title: "Digestion",
                content: "Discover how digestion impacts energy production, why digestive comfort matters, and which foods are easier to digest. Learn about the role of hydration, temperature, and meal timing in supporting healthy digestion.",
              },
              {
                id: "movement",
                title: "Movement",
                content: "Learn how to move your body in ways that support—not stress—your metabolism. Understand the difference between sustainable movement and over-exercising, and how to fuel your workouts properly.",
              },
              {
                id: "supplements",
                title: "Supplements",
                content: "Explore foundational supplements that support metabolic healing, including minerals, vitamins, and digestive aids. Learn what to prioritize and why whole foods come first.",
              },
              {
                id: "food-lists",
                title: "Food Lists",
                content: "Browse curated lists of pro-metabolic foods organized by category: fruits, grains, proteins, dairy, vegetables, oils, and supplements. Use these to plan meals and understand which foods best support your healing.",
              },
              {
                id: "faqs",
                title: "FAQs",
                content: "Find answers to common questions about metabolic healing, tracking, experiments, and the Lighter™ app. If your question isn't here, ask the AI Coach above.",
              },
            ].map((topic) => {
              if (topic.link) {
                return (
                  <Link key={topic.id} href={topic.link} data-testid={`link-topic-${topic.id}`}>
                    <Card className="p-4 space-y-3 hover-elevate active-elevate-2 border border-primary/10 cursor-pointer" data-testid={`card-topic-${topic.id}`}>
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold" data-testid={`heading-${topic.id}`}>{topic.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{topic.content}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              }
              return (
                <AccordionItem key={topic.id} value={topic.id} className="border-none" data-testid={`accordion-${topic.id}`}>
                  <Card className="overflow-hidden border border-primary/10">
                    <AccordionTrigger
                      className="px-6 py-4 hover:no-underline [&[data-state=open]>div]:bg-primary/5"
                      data-testid={`trigger-${topic.id}`}
                    >
                      <div className="flex items-center gap-3 flex-1 transition-colors text-left">
                        <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="font-semibold">{topic.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4" data-testid={`content-${topic.id}`}>
                      <p className="text-sm text-muted-foreground leading-relaxed">{topic.content}</p>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* SECTION 5: Suggested Next Steps */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold" data-testid="heading-next-steps">
            Suggested Next Steps
          </h2>

          <div className="grid grid-cols-1 gap-3">
            <Link href="/experiments" data-testid="link-experiments-next">
              <Button
                variant="outline"
                className="w-full justify-between hover-elevate active-elevate-2"
                data-testid="button-go-experiments"
              >
                <span>Go to Experiments</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/track" data-testid="link-track-next">
              <Button
                variant="outline"
                className="w-full justify-between hover-elevate active-elevate-2"
                data-testid="button-go-track"
              >
                <span>Go to Track</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/essentials" data-testid="link-essentials-next">
              <Button
                variant="outline"
                className="w-full justify-between hover-elevate active-elevate-2"
                data-testid="button-go-essentials"
              >
                <span>Go to Essentials</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer spacing */}
        <div className="pt-4 pb-8 text-center" data-testid="footer-learn">
          <p className="text-xs text-muted-foreground">
            Ready to begin? Start tracking your vitals and begin your metabolic healing journey.
          </p>
        </div>
      </div>
    </div>
  );
}
