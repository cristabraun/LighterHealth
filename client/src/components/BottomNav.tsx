import { Link, useLocation } from "wouter";
import { Home, BookOpen, ClipboardList, Beaker, TrendingUp, Pill } from "lucide-react";

export function BottomNav() {
  const [location] = useLocation();

  const tabs = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/learn", icon: BookOpen, label: "Learn" },
    { path: "/track", icon: ClipboardList, label: "Track" },
    { path: "/experiments", icon: Beaker, label: "Experiments" },
    { path: "/progress", icon: TrendingUp, label: "My Metabolism" },
    { path: "/essentials", icon: Pill, label: "Essentials" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-card-border z-50">
      <div className="max-w-md mx-auto px-1">
        <div className="flex items-center justify-around h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location === tab.path;
            
            return (
              <Link
                key={tab.path}
                href={tab.path}
                data-testid={`link-nav-${tab.label.toLowerCase()}`}
              >
                <div 
                  className="flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-xl min-h-12 hover-elevate active-elevate-2 transition-colors relative"
                  data-testid={`button-nav-${tab.label.toLowerCase()}`}
                >
                  <Icon 
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                    data-testid={`icon-nav-${tab.label.toLowerCase()}`}
                  />
                  <span className={`text-xs font-medium transition-colors leading-none ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                    data-testid={`text-nav-${tab.label.toLowerCase()}`}
                  >
                    {tab.label}
                  </span>
                  {isActive && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary to-chart-2 rounded-full" data-testid={`indicator-nav-active-${tab.label.toLowerCase()}`} />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
