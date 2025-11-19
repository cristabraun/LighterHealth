# Lighter App - Design Guidelines

## Design Approach
**Reference-Based with Wellness Focus**: Drawing inspiration from wellness apps like Calm and Headspace for emotional warmth, combined with the data clarity of fitness tracking apps like Apple Health and Oura. The design emphasizes encouragement and metabolic warmth through the specified coral/orange gradient palette.

## Core Design Principles
1. **Metabolic Warmth**: Visual warmth reflects internal metabolic healing
2. **Encouraging Progress**: Every interaction celebrates small wins
3. **Feminine Energy**: Soft, nurturing, but never patronizing
4. **Data Clarity**: Complex health data presented simply and beautifully

## Typography System
- **Primary Font**: 'Inter' or 'DM Sans' from Google Fonts (clean, modern, friendly)
- **Display/Headers**: 600-700 weight, generous letter-spacing (tracking-tight)
- **Body Text**: 400-500 weight for readability
- **Data/Numbers**: 500-600 weight (slightly bolder for emphasis on metrics)
- **Hierarchy**: text-3xl for page titles, text-xl for section headers, text-base for body, text-sm for labels

## Layout System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16 for consistent rhythm (p-4, gap-6, mt-8, etc.)
- Cards/Components: p-6 padding, rounded-2xl corners for soft, approachable feel
- Section Spacing: mb-8 between major sections, gap-4 for related items
- Mobile-First: Container max-w-md for mobile, max-w-4xl for tablet/desktop
- Safe Areas: px-4 for mobile edges, px-6 for tablet+

## Component Library

### Navigation
- **Bottom Tab Bar** (mobile-first): 4 equal-width tabs with icons + labels, fixed to bottom with subtle backdrop-blur effect, active state with gradient underline
- Tabs: Home, Track, Experiments, Progress with lucide-react icons

### Cards & Containers
- **Experiment Cards**: Large cards with rounded-2xl, gradient border accent (1px coral gradient), white background, p-6 padding, shadow-lg on hover
- **Daily Tracking Card**: Soft white card with organized input sections, clear visual separation between metric types
- **Stat Cards**: Small rounded-xl cards for dashboard quick stats, with large prominent numbers and small labels below
- **Category Badges**: Pill-shaped (rounded-full), px-3 py-1, small text with subtle background tints

### Forms & Inputs
- **Temperature/Pulse Inputs**: Large, clear number inputs with units displayed inline (°F, bpm)
- **Sliders**: Custom-styled range inputs with gradient track for 1-10 scales, large touch targets
- **Button Groups**: For Digestion quality (Good/Okay/Poor), full-width on mobile, horizontally arranged with clear selected state
- **Text Areas**: For notes, with placeholder text that's encouraging ("What did you notice today?")
- **Primary CTA Buttons**: Gradient background (coral to orange), rounded-xl, py-3, font-medium, with subtle shadow

### Data Visualization
- **Charts** (using recharts): Line charts for temperature/pulse trends with coral stroke color, gradient fill below line, 30-day view
- **Progress Bars**: For active experiments, gradient fill showing completion percentage, rounded-full
- **Trend Indicators**: Small arrows/icons showing if metrics are improving (↑ green) or need attention (→ amber)

### Celebration Moments
- **Milestone Alerts**: Confetti animation when temp reaches 98°F+, encouraging messages overlay
- **Streak Counters**: Bold numbers with flame icons for consecutive tracking days
- **Success States**: Gentle pulse animation on positive metric changes

### Personalized Recommendations
- **Smart Cards**: On dashboard, gradient left border accent, icon representing category, clear "Why this?" explanation, single CTA to start experiment

## Interaction Patterns
- **Smooth Transitions**: 200ms ease-in-out for all state changes
- **Haptic Feedback Feel**: Subtle scale transforms (scale-95 to scale-100) on button presses
- **Progressive Disclosure**: Experiment details expand on tap, collapse others
- **Swipe Gestures**: For navigating between active experiments (mobile)
- **Loading States**: Skeleton screens with subtle shimmer for chart loading

## Images
**Hero Images**: Not applicable for this app - focus on data and tracking interface rather than large hero sections. The onboarding welcome screen uses gradient backgrounds with typography emphasis instead of imagery.

**Icons Throughout**: Use lucide-react library exclusively:
- Thermometer for temperature
- Heart/Activity for pulse
- Zap for energy
- Moon for sleep
- Apple/Utensils for digestion
- TrendingUp for progress
- Flask/Beaker for experiments

## Mobile-First Layout Strategy
- **Single Column**: All content flows vertically on mobile with full-width cards
- **Tab Navigation**: Always visible bottom bar for easy thumb access
- **Touch Targets**: Minimum 44px height for all interactive elements
- **Generous Spacing**: Extra breathing room between sections (gap-6 to gap-8)
- **Desktop Adaptation**: Two-column layout for dashboard (stats left, experiments right), charts expand horizontally

## Tone & Messaging Design
- **Welcoming Copy**: "Hey [name]!" greetings, "You're glowing!" encouragements
- **Anti-Diet Language**: Visible throughout - "nourish" over "restrict", "energy" over "calories"
- **Progress Affirmations**: "Your temp is rising!", "Look at that energy!", embedded in UI
- **Empty States**: Encouraging prompts like "Ready to start your first experiment?" with warm illustrations

## Key Screens Layout

**Dashboard/Home**: Greeting header, 3-stat quick view cards (temp/pulse/energy), personalized recommendation cards (1-3), active experiments preview, quick action buttons at bottom

**Daily Tracking**: Form with clear sections - required vitals at top (temp, pulse), optional metrics below (energy/sleep sliders, digestion buttons), notes field, large "Save Today's Data" gradient button

**Experiment Library**: Grid of 7 experiment cards (1 column mobile, 2 columns tablet+), filterable by category badges, each card shows duration, category, brief description, "Learn More" CTA

**Progress View**: Tab selector for different metrics (Temp/Pulse/Energy), large chart filling screen width, averages displayed prominently, correlation markers where experiments started, 7/14/30 day view toggle