import type { ExperimentTemplate } from "@shared/schema";

export const EXPERIMENTS: ExperimentTemplate[] = [
  {
    id: "carrot-salad",
    title: "7-Day Carrot Salad",
    duration: 7,
    category: "Digestion",
    why: "Raw carrots contain unique fibers that bind to excess estrogen and endotoxins in your gut, helping to eliminate them. This can reduce bloating, improve skin, and support hormonal balance. The peeling action on your gut also promotes healthy bacteria while clearing harmful ones.",
    how: [
      "Shred 1-2 medium carrots (about 1 cup)",
      "Mix with 1 tablespoon coconut oil or olive oil",
      "Add 1 tablespoon apple cider vinegar or lemon juice",
      "Season with salt to taste",
      "Eat this salad once daily, preferably with a meal"
    ],
    when: "Best consumed with lunch or dinner. The fibers work throughout your digestive tract for several hours.",
    whatToExpect: [
      { day: "Days 1-2", description: "You may notice increased bowel movements as your body begins eliminating toxins. This is normal and healthy." },
      { day: "Days 3-5", description: "Reduced bloating and improved digestion. You might feel lighter after meals." },
      { day: "Days 6-7", description: "Clearer skin, more stable energy, and reduced PMS symptoms if applicable." }
    ],
    dailyChecklist: ["Ate carrot salad with oil and vinegar"]
  },
  {
    id: "orange-juice",
    title: "Daily Orange Juice Protocol",
    duration: 14,
    category: "Energy",
    why: "Fresh orange juice provides easily digestible glucose that supports thyroid function and liver health. The natural sugars, minerals, and vitamin C help lower stress hormones (cortisol) while providing quick, clean energy. This is especially powerful for women with low metabolic rates.",
    how: [
      "Drink 4-8 oz fresh-squeezed orange juice (no pulp)",
      "Have it with a pinch of salt for better absorption",
      "Always consume with protein or fat to prevent blood sugar spikes",
      "Best quality: fresh-squeezed > not-from-concentrate > from concentrate"
    ],
    when: "Morning with breakfast and/or afternoon slump (2-3 PM). Avoid on empty stomach.",
    whatToExpect: [
      { day: "Days 1-3", description: "Immediate energy boost. You may feel warmer as metabolism activates." },
      { day: "Days 4-7", description: "More stable energy throughout the day. Less reliance on coffee or stimulants." },
      { day: "Days 8-14", description: "Improved morning temperature, better mood, and sustained energy without crashes." }
    ],
    dailyChecklist: ["Drank OJ with salt and food", "No blood sugar crashes"]
  },
  {
    id: "carbs-at-dinner",
    title: "Add Carbs at Dinner",
    duration: 14,
    category: "Sleep",
    why: "Eating carbohydrates in the evening raises serotonin, which converts to melatonin for better sleep. It also supports thyroid function overnight when your body does most of its healing. This helps lower stress hormones that can keep you wired at night.",
    how: [
      "Add 1/2 to 1 cup of quality carbs to dinner",
      "Best options: white rice, potatoes, sourdough bread, fruit, honey",
      "Pair with protein and fat for balanced digestion",
      "Eat dinner 2-3 hours before bed for optimal results"
    ],
    when: "Evening meal (5-7 PM ideally). Make this your most carb-rich meal of the day.",
    whatToExpect: [
      { day: "Days 1-3", description: "Feeling more relaxed in the evening. Easier time winding down." },
      { day: "Days 4-7", description: "Falling asleep faster. Deeper sleep without nighttime waking." },
      { day: "Days 8-14", description: "Waking up more refreshed. Higher morning temperature and better energy." }
    ],
    dailyChecklist: ["Ate quality carbs with dinner", "Tracked sleep quality"]
  },
  {
    id: "reduce-cardio",
    title: "Reduce Cardio Intensity",
    duration: 21,
    category: "Recovery",
    why: "Excessive cardio raises cortisol (stress hormone), which can suppress thyroid function and keep you in a stressed state. Many women over-exercise while under-eating, driving their metabolism lower. Gentle movement supports healing while high-intensity cardio can hinder it.",
    how: [
      "Replace intense cardio with walks (30-45 minutes)",
      "Try gentle yoga, stretching, or swimming",
      "Focus on strength training 2-3x per week instead",
      "Prioritize rest and recovery",
      "Listen to your body - fatigue means rest, not push harder"
    ],
    when: "Ongoing lifestyle change. Start immediately and maintain throughout 21 days.",
    whatToExpect: [
      { day: "Days 1-7", description: "You may feel anxious or 'off' initially if you're used to intense exercise. This is your body adjusting to lower stress." },
      { day: "Days 8-14", description: "Better energy levels. Less exhaustion after workouts. Feeling more recovered." },
      { day: "Days 15-21", description: "Improved sleep, higher resting temperature, stable mood. You may notice body composition improving despite less intense exercise." }
    ],
    dailyChecklist: ["Gentle movement (walk/yoga)", "No high-intensity cardio", "Prioritized rest"]
  },
  {
    id: "morning-salt-oj",
    title: "Morning Salt + OJ",
    duration: 14,
    category: "Energy",
    why: "Starting your day with salt and orange juice supports adrenal function and replenishes minerals lost overnight. The combination helps stabilize blood sugar, reduce morning cortisol spikes, and support hydration at the cellular level. This is especially powerful for women with adrenal fatigue.",
    how: [
      "Upon waking, drink 8 oz water with 1/4 to 1/2 teaspoon sea salt",
      "Wait 15-30 minutes, then have 4-8 oz fresh orange juice",
      "Follow with a balanced breakfast within an hour",
      "Use quality sea salt or Himalayan pink salt (not table salt)"
    ],
    when: "First thing in the morning, before coffee or other beverages.",
    whatToExpect: [
      { day: "Days 1-3", description: "Reduced morning anxiety and shakiness. Feeling more grounded." },
      { day: "Days 4-7", description: "Easier to wake up. Less reliance on coffee for energy." },
      { day: "Days 8-14", description: "Stable energy all morning. Higher morning temperature. Better stress resilience." }
    ],
    dailyChecklist: ["Salt water upon waking", "Orange juice after 15-30 min", "Balanced breakfast"]
  },
  {
    id: "sleep-optimization",
    title: "Sleep Optimization",
    duration: 21,
    category: "Sleep",
    why: "Quality sleep is when your body heals, balances hormones, and restores metabolic function. Poor sleep raises cortisol, lowers thyroid function, and disrupts hunger hormones. Optimizing your sleep environment and routine is foundational to metabolic healing.",
    how: [
      "Set consistent sleep/wake times (even weekends)",
      "Keep bedroom cool (65-68°F), completely dark, and quiet",
      "No screens 1 hour before bed",
      "Evening routine: dim lights, warm bath/shower, reading",
      "Avoid caffeine after 2 PM",
      "Eat dinner 2-3 hours before bed with quality carbs"
    ],
    when: "Daily routine starting tonight. Consistency is key for resetting circadian rhythm.",
    whatToExpect: [
      { day: "Days 1-7", description: "Establishing new habits. You may notice easier time falling asleep." },
      { day: "Days 8-14", description: "Deeper sleep with less waking. Feeling more rested in morning." },
      { day: "Days 15-21", description: "Waking naturally before alarm. Higher energy all day. Better temperature regulation." }
    ],
    dailyChecklist: ["In bed by target time", "No screens 1hr before bed", "Bedroom dark & cool", "Evening wind-down routine"]
  },
  {
    id: "magnesium-glycinate",
    title: "Magnesium Glycinate",
    duration: 21,
    category: "Recovery",
    why: "Magnesium is essential for over 300 processes in your body, including energy production, muscle relaxation, and nervous system regulation. Most women are deficient. Glycinate form is highly absorbable and promotes relaxation without digestive upset. It's especially helpful for sleep, anxiety, and muscle tension.",
    how: [
      "Take 200-400mg magnesium glycinate before bed",
      "Start with lower dose (200mg) and increase if needed",
      "Take with food if you experience any stomach sensitivity",
      "Quality matters - look for chelated magnesium glycinate",
      "Avoid magnesium oxide (poorly absorbed)"
    ],
    when: "Every evening, 30-60 minutes before bed. Consistency is important for building up levels.",
    whatToExpect: [
      { day: "Days 1-5", description: "More relaxed in evening. Muscles feel less tense. May notice softer bowel movements (this is normal)." },
      { day: "Days 6-14", description: "Falling asleep easier. Less nighttime anxiety. Reduced muscle cramps or restless legs." },
      { day: "Days 15-21", description: "Deeper sleep quality. Better stress resilience during the day. Fewer headaches and muscle tension." }
    ],
    dailyChecklist: ["Took magnesium glycinate (200-400mg)", "Noted any changes in sleep or tension"]
  }
];
