import type { ExperimentTemplate } from "@shared/schema";

export const EXPERIMENTS: ExperimentTemplate[] = [
  // MODULE SET 1 — Temperature & Pulse Experiments
  {
    id: "temp-before-after-meals",
    title: "Temperature Before + After Meals",
    duration: 30,
    category: "Temperature & Pulse",
    why: "Your body's temperature response to food reveals how well you're converting food into energy. If a meal raises temp/pulse → metabolism is strong. If it drops → low thyroid or high cortisol response. This is one of Ray Peat's foundational metabolic tracking methods.",
    how: [
      "Take temperature and pulse before eating",
      "Eat a normal, balanced meal",
      "Measure temperature and pulse again 30–60 minutes later",
      "Record the changes in your notes",
      "Track how you feel (warmer, calmer, energized, or opposite)"
    ],
    when: "Choose one meal per day (ideally the same meal each day) to track consistently.",
    whatToExpect: [
      { day: "Days 1-7", description: "Learning your baseline. You may notice that some meals warm you up while others don't." },
      { day: "Days 8-20", description: "Patterns emerge - certain foods consistently raise or lower your temperature." },
      { day: "Days 21-30", description: "Deep understanding of which meals support your metabolism. You can confidently adjust your diet." }
    ],
    dailyChecklist: ["Measured temp/pulse before meal", "Measured temp/pulse 30-60 min after", "Noted warmth and mood changes"],
    alternatives: ["If tracking numbers feels overwhelming, just track: Warmer/Cooler/Same and Calmer/Anxious/Same"],
    inputs: [
      { id: "beforeTemp", label: "Temperature Before Meal", unit: "°F", type: "number" as const, min: 94, max: 102, step: 0.1 },
      { id: "beforePulse", label: "Pulse Before Meal", unit: "bpm", type: "number" as const, min: 40, max: 150, step: 1 },
      { id: "afterTemp", label: "Temperature After Meal (30-60 min)", unit: "°F", type: "number" as const, min: 94, max: 102, step: 0.1 },
      { id: "afterPulse", label: "Pulse After Meal (30-60 min)", unit: "bpm", type: "number" as const, min: 40, max: 150, step: 1 }
    ]
  },
  {
    id: "morning-vs-afternoon-temp",
    title: "Morning vs Afternoon Temp/Pulse",
    duration: 30,
    category: "Temperature & Pulse",
    why: "Morning is when metabolism is lowest. Afternoon should be highest. If this pattern is reversed (high AM, low PM), it indicates cortisol dominance - your body is running on stress hormones rather than efficient energy production.",
    how: [
      "Take temperature and pulse immediately upon waking (before getting out of bed)",
      "Take temperature and pulse again mid-afternoon (2-4 PM)",
      "Track the difference between AM and PM readings",
      "Note: afternoon should be warmer with stable pulse (70-90)"
    ],
    when: "Daily tracking for 30 days. Consistency is key to identifying patterns.",
    whatToExpect: [
      { day: "Days 1-7", description: "Establishing baseline. You may notice your AM temp is quite low." },
      { day: "Days 8-20", description: "Patterns become clear - healthy pattern shows rising temp throughout day." },
      { day: "Days 21-30", description: "Deep insights into your circadian rhythm. If reversed pattern persists, focus on reducing stress and supporting nutrition." }
    ],
    dailyChecklist: ["Measured temp/pulse upon waking", "Measured temp/pulse mid-afternoon", "Noted warmth, calmness, hunger"],
    alternatives: ["If pulse tracking feels stressful, only track temperature and warmth"],
    inputs: [
      { id: "morningTemp", label: "Morning Temperature (upon waking)", unit: "°F", type: "number" as const, min: 94, max: 102, step: 0.1 },
      { id: "morningPulse", label: "Morning Pulse (upon waking)", unit: "bpm", type: "number" as const, min: 40, max: 150, step: 1 },
      { id: "afternoonTemp", label: "Afternoon Temperature (2-4 PM)", unit: "°F", type: "number" as const, min: 94, max: 102, step: 0.1 },
      { id: "afternoonPulse", label: "Afternoon Pulse (2-4 PM)", unit: "bpm", type: "number" as const, min: 40, max: 150, step: 1 }
    ]
  },
  {
    id: "warm-vs-cold-foods",
    title: "Warm vs Cold Foods",
    duration: 3,
    category: "Temperature & Pulse",
    why: "Food temperature impacts your nervous system. Warm foods activate parasympathetic (rest & digest) mode. Cold foods can trigger a cortisol spike as your body works to warm them. This simple shift can dramatically improve digestion and reduce anxiety.",
    how: [
      "For 3 days, choose warm meals only (soups, cooked foods, warm drinks)",
      "Warm up leftovers rather than eating them cold",
      "Drink warm or room temperature beverages",
      "Notice how your body responds"
    ],
    when: "Try this for 3 consecutive days, especially if you struggle with anxiety or poor digestion.",
    whatToExpect: [
      { day: "Days 1-2", description: "You may feel calmer during and after meals. Digestion feels easier." },
      { day: "Day 3", description: "Notice if your hands/feet are warmer, anxiety is lower, and energy is more stable." }
    ],
    dailyChecklist: ["All meals and drinks were warm/room temp", "Tracked digestion quality", "Noted mood and anxiety levels"],
    alternatives: ["If you prefer cold foods, warm only the protein portion of your meals"]
  },

  // MODULE SET 2 — Nutrition Experiments
  {
    id: "oj-before-coffee",
    title: "OJ Before Coffee",
    duration: 30,
    category: "Nutrition",
    why: "Coffee on an empty stomach spikes cortisol and adrenaline. Orange juice provides easily digestible sugar that supports liver glycogen, stabilizes blood sugar, and prevents the anxious, jittery response to caffeine. This is a Ray Peat fundamental.",
    how: [
      "Drink 4–8 oz orange juice 10-15 minutes before your coffee",
      "Add a small pinch of salt to the OJ for better absorption",
      "Have your coffee with cream or milk if desired",
      "Notice the difference in how caffeine affects you"
    ],
    when: "Every morning before your first coffee. Make this a consistent habit.",
    whatToExpect: [
      { day: "Days 1-7", description: "Reduced jitters and anxiety from coffee. Energy feels smoother." },
      { day: "Days 8-20", description: "Coffee becomes energizing without the crash. Heart rate stays stable. This becomes second nature." },
      { day: "Days 21-30", description: "You feel warmer throughout the morning. Less reliance on caffeine for energy. A new healthy habit is formed." }
    ],
    dailyChecklist: ["Drank OJ before coffee", "Added pinch of salt", "Tracked anxiety/jitters"],
    alternatives: ["Honey water (1 tbsp in warm water)", "Ripe fruit (banana, mango)", "Milk with a teaspoon of sugar"]
  },
  {
    id: "raw-carrot-salad",
    title: "Raw Carrot Salad Daily",
    duration: 30,
    category: "Nutrition",
    why: "Raw carrot fiber uniquely binds to excess estrogen and endotoxins in your gut, helping eliminate them through bowel movements. This can reduce bloating, improve skin clarity, ease PMS, and support hormonal balance. Ray Peat's most famous recommendation.",
    how: [
      "Shred one medium raw carrot (about 1 cup)",
      "Mix with 1 tablespoon coconut oil",
      "Add 1 tablespoon apple cider vinegar or lemon juice",
      "Season with salt to taste",
      "Eat once daily, ideally with a meal for best results"
    ],
    when: "Best consumed with lunch or dinner. The fibers work throughout your digestive tract for several hours.",
    whatToExpect: [
      { day: "Days 1-7", description: "Increased bowel movements as your body begins eliminating bound toxins - normal and healthy." },
      { day: "Days 8-20", description: "Reduced bloating after meals. Digestion feels lighter and more efficient. Skin starts clearing." },
      { day: "Days 21-30", description: "Clearer skin, more stable mood, reduced PMS symptoms. Hormonal balance improves significantly." }
    ],
    dailyChecklist: ["Ate raw carrot salad with oil and vinegar", "Tracked bloating, mood, digestion"],
    alternatives: ["If allergic to carrots: cooked bamboo shoots, cooked mushrooms, or activated charcoal 1-2x/week"]
  },
  {
    id: "low-pufa-week",
    title: "Low-PUFA Eating",
    duration: 30,
    category: "Nutrition",
    why: "Seed oils (PUFA - polyunsaturated fats) are highly inflammatory, suppress thyroid function, and promote estrogen dominance. Canola, soybean, corn, and sunflower oils are found in almost all processed foods. Eliminating them dramatically reduces inflammation.",
    how: [
      "Replace PUFA oils with butter, ghee, or coconut oil",
      "Avoid fried restaurant foods (usually cooked in seed oils)",
      "Read ingredient labels - avoid canola, soybean, corn, sunflower, safflower oils",
      "Cook at home with quality fats",
      "Focus on whole, unprocessed foods"
    ],
    when: "Commit to 30 full days of avoiding PUFA oils. Meal prep helps ensure success.",
    whatToExpect: [
      { day: "Days 1-7", description: "You may feel different as inflammation begins to reduce. Skin may look clearer." },
      { day: "Days 8-20", description: "Less puffiness, especially in face and hands. Energy feels more stable. Cravings reduce." },
      { day: "Days 21-30", description: "Warmer body temperature, better mood, reduced anxiety. Significant inflammation reduction. This becomes your new normal." }
    ],
    dailyChecklist: ["Avoided all seed oils", "Used only butter/coconut oil/ghee", "Tracked skin, energy, warmth"],
    alternatives: ["If you can't fully avoid PUFA, start by replacing just one meal per day with clean fats"]
  },
  {
    id: "dairy-support-test",
    title: "Dairy Support Test",
    duration: 3,
    category: "Nutrition",
    why: "Dairy provides a unique combination of calcium, sugar (lactose), and protein that supports thyroid function and reduces stress hormones. Many women avoid dairy unnecessarily. This test helps you determine if dairy is actually beneficial for YOUR metabolism.",
    how: [
      "Add dairy 2x per day for 3 days",
      "Best options: whole milk, yogurt, kefir, cheese, cottage cheese",
      "Pair with meals or as snacks",
      "Track how you feel, sleep, and your temperature"
    ],
    when: "Try this for 3 consecutive days. Choose high-quality, full-fat dairy when possible.",
    whatToExpect: [
      { day: "Day 1", description: "Notice if dairy makes you feel calm and satiated, or if it causes digestive discomfort." },
      { day: "Day 2", description: "Better sleep quality and reduced sugar cravings if dairy agrees with you." },
      { day: "Day 3", description: "Stable energy, less anxiety, and warmer body temperature if dairy is supportive." }
    ],
    dailyChecklist: ["Had dairy 2x today", "Tracked cravings, sleep, anxiety, warmth"],
    alternatives: ["If dairy intolerance: try filtered milk, goat milk, A2 milk, lattes with cream, cottage cheese, or ricotta", "If severely intolerant: calcium-rich bone broth or oyster shell calcium supplement"]
  },
  {
    id: "liver-weekly",
    title: "Liver Once a Week",
    duration: 21,
    category: "Nutrition",
    why: "Liver is the most nutrient-dense food on earth. It provides vitamin A, B vitamins, and copper that are nearly impossible to get in adequate amounts from other foods. These nutrients are essential for thyroid function, energy production, and hormonal balance.",
    how: [
      "Eat 1–2 oz cooked liver once per week",
      "Best preparation: sautéed with onions in butter, or pâté",
      "Start small (1 oz) and work up to 2 oz if tolerated",
      "Quality matters - choose grass-fed/pasture-raised when possible"
    ],
    when: "Once per week on the same day. Make it a weekly ritual.",
    whatToExpect: [
      { day: "Weeks 1-2", description: "Initial micronutrient boost. Energy may improve noticeably within days." },
      { day: "Week 2-3", description: "Warmer body temperature, better skin, stronger nails, less hair shedding." },
      { day: "Week 3+", description: "Reduced PMS, improved mood stability, sustained energy throughout the day." }
    ],
    dailyChecklist: ["Ate 1-2 oz liver this week", "Tracked energy, warmth, skin, PMS, hair"],
    alternatives: ["If you refuse liver: desiccated liver capsules, oysters (high copper/zinc), bone broth with gelatin, or high-quality eggs"]
  },
  {
    id: "shellfish-weekly",
    title: "Shellfish Weekly",
    duration: 21,
    category: "Nutrition",
    why: "Shellfish are extremely rich in zinc and copper, two minerals essential for thyroid conversion (T4 → T3). Most women are deficient in these. Oysters, shrimp, and mussels provide these in highly absorbable forms that support metabolism, skin, hair, and immune function.",
    how: [
      "Eat oysters, shrimp, mussels, or other shellfish once per week",
      "Fresh or canned both work - smoked oysters are easiest",
      "Aim for 3-4 oz serving",
      "Pair with lemon and butter for best absorption"
    ],
    when: "Once per week consistently. Can be the same day as liver or a different day.",
    whatToExpect: [
      { day: "Weeks 1-2", description: "Zinc and copper stores begin to replenish. Energy may improve." },
      { day: "Week 2-3", description: "Hair becomes shinier and stronger, nails grow faster and are less brittle." },
      { day: "Week 3+", description: "Improved body temperature, better immune function, skin looks healthier." }
    ],
    dailyChecklist: ["Ate shellfish this week", "Tracked hair texture, nail strength, temperature, energy"],
    alternatives: ["Smoked oysters (easiest - straight from the can)", "Zinc + copper supplement (if absolutely cannot eat shellfish)", "Beef (zinc) + liver (copper) combination"]
  },
  {
    id: "gelatin-before-bed",
    title: "Gelatin Before Bed",
    duration: 30,
    category: "Nutrition",
    why: "Gelatin is rich in glycine, an amino acid that lowers nighttime cortisol, supports detoxification, and promotes deep sleep. It balances out the methionine in muscle meats. Taking it before bed helps you sleep deeper and wake with better temperature and energy.",
    how: [
      "Take 1–2 tablespoons gelatin powder mixed in warm milk with honey",
      "Or eat gelatin gummies as an evening snack",
      "Take 30-60 minutes before bed",
      "Start with 1 tablespoon and increase if desired"
    ],
    when: "Every evening before bed. Consistency is important for lowering cortisol patterns.",
    whatToExpect: [
      { day: "Days 1-7", description: "Falling asleep more easily. Feeling more relaxed in the evening." },
      { day: "Days 8-20", description: "Fewer nighttime wakings (especially 3-4am wake-ups). Dreams may be more vivid. Sleep deepens." },
      { day: "Days 21-30", description: "Waking with warmer temperature and better energy. Deeper, more restorative sleep. Skin and joints may also improve." }
    ],
    dailyChecklist: ["Took gelatin before bed", "Tracked sleep quality, night waking, morning temperature"],
    alternatives: ["Collagen powder (though gelatin is superior for sleep)", "Bone broth before bed", "Glycine powder (3-5g)"]
  },

  // MODULE SET 3 — Stress & Nervous System Experiments
  {
    id: "warm-bath-before-bed",
    title: "Warm Bath Before Bed",
    duration: 30,
    category: "Stress & Nervous System",
    why: "Heat exposure before bed lowers stress hormones (cortisol and adrenaline), relaxes muscles, and signals to your body that it's safe to rest. This triggers deeper sleep and helps you wake with better temperature and energy.",
    how: [
      "Take a 10–15 minute warm bath or shower 1-2 hours before bed",
      "Water should be comfortably warm, not scalding",
      "Add Epsom salt for extra magnesium absorption if desired",
      "Follow with your regular bedtime routine"
    ],
    when: "Every evening, 1-2 hours before your target bedtime.",
    whatToExpect: [
      { day: "Days 1-7", description: "Feeling more relaxed and drowsy in the evening. Easier time winding down." },
      { day: "Days 8-20", description: "Falling asleep faster. Less rumination and racing thoughts at bedtime. This becomes a cherished ritual." },
      { day: "Days 21-30", description: "Waking with warmer body temperature. Better overall sleep quality and morning energy. Nervous system is calmer." }
    ],
    dailyChecklist: ["Took warm bath/shower before bed", "Tracked sleep latency, rumination, morning warmth"],
    alternatives: ["Heating pad on feet or abdomen", "Warm socks to bed", "Hot water bottle on feet"]
  },
  {
    id: "afternoon-sunlight",
    title: "Afternoon Sunlight",
    duration: 30,
    category: "Stress & Nervous System",
    why: "Afternoon sunlight (2-5pm) helps regulate your circadian rhythm by lowering melatonin during the day, which creates a stronger sleep response at night. It also provides red light that supports mitochondrial energy production and reduces inflammation.",
    how: [
      "Get 5–10 minutes of direct sunlight exposure between 2–5 PM",
      "Expose arms, face, or legs (no sunscreen for this brief period)",
      "Sit outside, take a short walk, or stand by a sunny window",
      "Do this daily for best results"
    ],
    when: "Daily between 2-5 PM. Even 5 minutes makes a difference.",
    whatToExpect: [
      { day: "Days 1-7", description: "More alert in the afternoon. Less brain fog and sluggishness." },
      { day: "Days 8-20", description: "Better sleep at night as your circadian rhythm strengthens. Mood stabilizes." },
      { day: "Days 21-30", description: "More stable mood, better energy, and improved sleep quality. This becomes a natural part of your day." }
    ],
    dailyChecklist: ["Got 5-10 min afternoon sunlight", "Tracked mood, brain fog, sleep quality"],
    alternatives: ["Sitting by a sunny window", "Red light therapy device (2-5 minutes)", "Incandescent bulb exposure"]
  },
  {
    id: "honey-salt-nighttime",
    title: "Honey + Salt for Nighttime Waking",
    duration: 30,
    category: "Stress & Nervous System",
    why: "When blood sugar drops overnight, cortisol spikes to raise it back up - this causes 3-4am wake-ups. Honey with salt before bed provides easily accessible glucose that stabilizes blood sugar, preventing cortisol spikes and nighttime waking.",
    how: [
      "Before bed, take 1 teaspoon raw honey with a small pinch of sea salt",
      "Let it dissolve in your mouth or mix with a small amount of water",
      "Can also take this if you wake in the night",
      "Use quality raw honey and sea salt"
    ],
    when: "Every night before bed. Keep honey and salt by your bedside for nighttime waking.",
    whatToExpect: [
      { day: "Days 1-7", description: "You may sleep through the night without waking, or fall back asleep faster if you do wake." },
      { day: "Days 8-20", description: "Fewer nighttime wake-ups, especially the 3-4am pattern. Dreams may be more vivid. Blood sugar stabilizes." },
      { day: "Days 21-30", description: "Consistent, uninterrupted sleep. Less anxiety and better quality sleep overall. This becomes a healthy habit." }
    ],
    dailyChecklist: ["Took honey + salt before bed", "Tracked night waking, dreams, anxiety"],
    alternatives: ["Small glass of milk before bed", "4 oz orange juice with pinch of salt", "Banana with salt"]
  },

  // MODULE SET 4 — Movement Experiments
  {
    id: "nasal-walking",
    title: "Slow, Nasal Walking",
    duration: 30,
    category: "Movement",
    why: "Breathing only through your nose during gentle walking keeps you in parasympathetic (rest & digest) mode rather than triggering stress hormones. This reduces the cortisol response from exercise, allowing movement to heal rather than stress your metabolism.",
    how: [
      "Walk for 20-30 minutes breathing only through your nose",
      "If you need to open your mouth, you're going too fast - slow down",
      "Walk at a conversational pace",
      "Focus on enjoying the movement, not burning calories"
    ],
    when: "Daily if possible. Morning or evening walks work well.",
    whatToExpect: [
      { day: "Days 1-7", description: "Learning to pace yourself. It may feel slow at first." },
      { day: "Days 8-20", description: "Feeling more energized after walks rather than depleted. Better warmth and mood. Endurance improves." },
      { day: "Days 21-30", description: "Improved sleep, stable hunger, better overall energy. Movement supports rather than stresses you. A new healthy habit." }
    ],
    dailyChecklist: ["Walked 20+ min breathing only through nose", "Tracked warmth, sleep, hunger, energy"],
    alternatives: ["Gentle cycling", "Easy yoga or stretching", "Slow dancing", "Swimming at easy pace"]
  },
  {
    id: "no-workout-reset",
    title: "3-Day No-Workout Reset",
    duration: 3,
    category: "Movement",
    why: "Many women run on cortisol from chronic overtraining but think it's discipline. Taking 3 days completely off from structured exercise reveals if you've been stressing your metabolism. If you feel better with rest, you were overtraining.",
    how: [
      "No workouts, runs, or intense exercise for 3 full days",
      "Walking and gentle stretching are allowed",
      "Eat normally (do not restrict food)",
      "Notice how your body responds to true rest"
    ],
    when: "Choose 3 consecutive days when you can fully commit to rest.",
    whatToExpect: [
      { day: "Day 1", description: "You may feel anxious or 'off' - this is revealing your dependence on exercise for cortisol." },
      { day: "Day 2", description: "Sleep improves. Digestion gets better. Energy feels more stable." },
      { day: "Day 3", description: "If you feel significantly better, you were overtraining. Reduce workout intensity moving forward." }
    ],
    dailyChecklist: ["No structured workouts", "Allowed only walking/stretching", "Tracked sleep, digestion, energy, hunger, mood"],
    alternatives: ["Replace intense workouts with light strength training + stretching for 3 days"]
  },

  // MODULE SET 5 — Hormones & Cycle Experiments
  {
    id: "calcium-boost-pms",
    title: "Calcium Boost for PMS",
    duration: 30,
    category: "Hormones & Cycle",
    why: "Calcium lowers PTH (parathyroid hormone), a stress hormone that rises when calcium is low. Adequate calcium is calming, reduces PMS symptoms (irritability, cramps, mood swings), and supports thyroid function. Many women are calcium deficient.",
    how: [
      "Increase dairy or calcium-rich foods daily",
      "Best sources: milk, cheese, yogurt, cottage cheese",
      "Aim for 3-4 servings daily",
      "Track PMS symptoms throughout the month"
    ],
    when: "Daily for 30 days to fully replenish calcium stores and see cycle improvements.",
    whatToExpect: [
      { day: "Days 1-7", description: "Mood begins to stabilize. Less irritability and emotional sensitivity." },
      { day: "Days 8-20", description: "Reduced breast tenderness and bloating. Fewer sugar cravings. Better sleep." },
      { day: "Days 21-30", description: "Significantly lighter PMS symptoms overall. Cramps may be reduced or absent. Full cycle improvement visible." }
    ],
    dailyChecklist: ["Had 3-4 servings calcium-rich foods", "Tracked mood, cramps, puffiness"],
    alternatives: ["Filtered milk if regular milk bothers you", "Cottage cheese or ricotta", "Calcium supplement (500mg 2x/day)"]
  },
  {
    id: "magnesium-night",
    title: "Magnesium at Night",
    duration: 30,
    category: "Hormones & Cycle",
    why: "Magnesium is essential for over 300 processes including muscle relaxation, nervous system regulation, and lowering adrenaline. Most women are deficient. Magnesium glycinate at night improves sleep, reduces cramps, and lowers anxiety.",
    how: [
      "Take 200–400 mg magnesium glycinate 30-60 minutes before bed",
      "Start with 200mg and increase if needed",
      "Take with food if you experience stomach sensitivity",
      "Use magnesium glycinate specifically (not oxide)"
    ],
    when: "Every evening for 30 days to fully build up magnesium stores.",
    whatToExpect: [
      { day: "Days 1-7", description: "More relaxed in evening. Muscles feel less tense. May notice softer bowel movements (normal)." },
      { day: "Days 8-20", description: "Falling asleep easier. Less nighttime anxiety and restless legs. Reduced muscle cramps." },
      { day: "Days 21-30", description: "Deeper sleep quality. Better stress resilience during day. Fewer headaches and muscle tension. Magnesium stores replenished." }
    ],
    dailyChecklist: ["Took magnesium glycinate (200-400mg)", "Tracked sleep, cramps, anxiety"],
    alternatives: ["Epsom salt bath (magnesium absorbed through skin)", "Topical magnesium spray or lotion"]
  },

  // MODULE SET 6 — Digestion Experiments
  {
    id: "coffee-with-sugar",
    title: "Coffee with Sugar vs Black Coffee",
    duration: 30,
    category: "Digestion",
    why: "Black coffee spikes adrenaline and cortisol, which can suppress digestion, increase anxiety, and stress your metabolism. Adding sugar and dairy provides glucose and calcium that buffer caffeine's stress response while still providing energy.",
    how: [
      "Add 1-2 teaspoons sugar and cream/milk to your coffee",
      "Never drink coffee black or on an empty stomach",
      "Have coffee with or after breakfast, not before",
      "Notice how your body responds"
    ],
    when: "Every morning for 30 days. Make this your default way to drink coffee.",
    whatToExpect: [
      { day: "Days 1-7", description: "Less anxiety and jitters from coffee. Energy feels smoother and more sustained." },
      { day: "Days 8-20", description: "Better digestion. No stomach upset or racing heart from caffeine. This becomes your new normal." },
      { day: "Days 21-30", description: "Stable energy and warmth throughout morning. Coffee enhances rather than stresses you. A healthier coffee habit is formed." }
    ],
    dailyChecklist: ["Drank coffee with sugar + dairy", "Had coffee after food", "Tracked anxiety, warmth, hunger"],
    alternatives: ["Half-caf coffee with sugar", "Decaf coffee with sugar and cream", "Coffee only after breakfast"]
  },
  {
    id: "no-raw-greens",
    title: "No Raw Greens for 3 Days",
    duration: 3,
    category: "Digestion",
    why: "Raw greens (salads, raw kale, raw spinach) are extremely hard to digest and high in anti-nutrients that block mineral absorption. They can cause bloating, gas, and rob you of energy. Cooked greens are much gentler and more nutritious.",
    how: [
      "Remove all raw salads and greens for 3 days",
      "If you eat vegetables, cook them thoroughly (spinach, zucchini, carrots)",
      "Focus on fruit as your main fiber source",
      "Notice how your digestion responds"
    ],
    when: "Try this for 3 consecutive days, especially if you struggle with bloating.",
    whatToExpect: [
      { day: "Day 1", description: "Less bloating after meals. Digestion feels easier and lighter." },
      { day: "Day 2", description: "More energy as your body isn't working as hard to digest fiber." },
      { day: "Day 3", description: "Improved bowel movements. Less constipation or digestive discomfort." }
    ],
    dailyChecklist: ["Avoided all raw greens", "Ate only cooked vegetables or fruit", "Tracked bloating, energy, constipation"],
    alternatives: ["Cooked greens (sautéed spinach, steamed zucchini)", "Fruit as main fiber source (oranges, melon, berries)"]
  },

  // MODULE SET 7 — Advanced Experiments
  {
    id: "red-light-therapy",
    title: "Red Light Therapy",
    duration: 30,
    category: "Advanced",
    why: "Red light (600-850nm wavelength) penetrates skin and directly boosts mitochondrial energy production. It supports thyroid function, reduces inflammation, improves skin, and enhances metabolism. It's like giving your cells a direct energy boost.",
    how: [
      "Use red light device for 2–5 minutes on thyroid (neck) or abdomen",
      "Sit 6-12 inches from the device",
      "Use daily or 5x per week",
      "Best time: morning to support circadian rhythm"
    ],
    when: "Daily for 30 days. Morning is ideal but any consistent time works.",
    whatToExpect: [
      { day: "Days 1-7", description: "Warmer body temperature after sessions. Improved mood and mental clarity." },
      { day: "Days 8-20", description: "Better energy throughout the day. Skin looks healthier and more radiant." },
      { day: "Days 21-30", description: "Pain or inflammation noticeably reduced. Metabolism feels stronger overall. Cumulative benefits become clear." }
    ],
    dailyChecklist: ["Used red light for 2-5 min", "Tracked warmth, mood, pain levels"],
    alternatives: ["Morning sunlight exposure (free red light)", "Incandescent light bulbs (some red spectrum)"]
  },
  {
    id: "meal-timing-test",
    title: "Meal Timing Test",
    duration: 30,
    category: "Advanced",
    why: "Eating too close to bed can disrupt sleep as digestion continues overnight. But eating too early can cause blood sugar crashes. This test helps you find your optimal dinner timing for best sleep and morning temperature.",
    how: [
      "Eat your last meal 3 hours before bed",
      "Make it a balanced meal with carbs, protein, and fat",
      "If you wake hungry, try honey + salt before bed",
      "Track sleep quality and morning temperature"
    ],
    when: "For 30 days, keep consistent timing. Adjust based on results.",
    whatToExpect: [
      { day: "Days 1-7", description: "Learning your optimal window. You may sleep better or feel too hungry initially." },
      { day: "Days 8-20", description: "Sleep quality improves if timing is right. Morning temperature may be higher. Fine-tune your timing." },
      { day: "Days 21-30", description: "More vivid dreams, better sleep, and warmer waking temperature. Your optimal meal timing is established." }
    ],
    dailyChecklist: ["Ate last meal 3 hours before bed", "Tracked sleep quality, morning temp, dreams"],
    alternatives: ["Small bedtime snack (honey + salt, milk, banana) if 3 hours feels too long"]
  }
];
