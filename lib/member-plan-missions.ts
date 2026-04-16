export type MissionType = "first_week" | "fire_streak" | "full_month"

export type MissionTask = {
  id: string
  emoji: string
  label: string
  why: string
}

export type MissionDay = {
  day: number
  title: string
  subtitle: string
  tasks: MissionTask[]
}

export type MissionLevel = {
  type: MissionType
  title: string
  subtitle: string
  lockMessage: string
  days: MissionDay[]
}

const taskOverrides: Record<string, Pick<MissionTask, "label" | "why">> = {
  day1_task4: {
    label: "Baseline note: Write how you feel before your first sugar-free week",
    why: "📝 A written baseline gives you a reference point for your energy, cravings, and mood after the first week.",
  },
  day3_task2: {
    label: 'The "Why": Write down why you want to quit sugar now',
    why: "🎯 Reconnecting with your reason increases your chances of resisting cravings and staying consistent.",
  },
  day6_task3: {
    label: "Mirror check: Notice any reduction in puffiness or swelling",
    why: "👤 Noticing subtle physical changes reinforces motivation and makes progress feel real.",
  },
  day7_task1: {
    label: "Weekly comparison: Compare today with how you felt on Day 0",
    why: "📊 Comparing your first day to today turns invisible progress into something tangible and motivating.",
  },
  fire_streak_day8_task3: {
    label: "Ingredient check: Read the label of one product before buying it",
    why: "🔍 Checking labels protects you from hidden sugars and trains a skill you can keep for life.",
  },
  fire_streak_day12_task3: {
    label: "Progress checkpoint: Write one visible or mental change you notice",
    why: "📝 Naming your progress out loud reinforces the change and helps you keep going.",
  },
  full_month_day17_task3: {
    label: "Ingredient reflex: Check the ingredients on one product today",
    why: "🔍 Checking ingredients becomes a survival reflex in a food environment full of hidden sugar.",
  },
  full_month_day19_task3: {
    label: "Progress checkpoint: Write one change you noticed this week",
    why: "📝 Tracking progress keeps motivation high and helps you notice benefits beyond the scale.",
  },
  full_month_day22_task3: {
    label: "Label check: Inspect one snack or drink before buying it",
    why: "🔍 Constant vigilance rewires your brain to stop seeing junk food as harmless.",
  },
  full_month_day24_task3: {
    label: "Weekly reflection: Write one win from your recovery",
    why: "📝 Writing your wins strengthens your new identity and keeps the momentum alive.",
  },
  full_month_day27_task3: {
    label: "Ingredient audit: Check labels on a product you usually buy",
    why: "🔍 The food industry hides sugar under many names. Reading labels keeps you in control.",
  },
  full_month_day29_task3: {
    label: "Final checkpoint: List three changes you notice since you started",
    why: "📝 Seeing the difference clearly helps lock in long-term motivation before the finish line.",
  },
  full_month_day30_task3: {
    label: "Transformation summary: Write your final before/after reflection",
    why: "🏆 Your written transformation is proof that you changed your habits and can keep this identity.",
  },
}

function applyOverrides(days: MissionDay[]): MissionDay[] {
  return days.map((day) => ({
    ...day,
    tasks: day.tasks.map((task) => ({
      ...task,
      ...(taskOverrides[task.id] ?? {}),
    })),
  }))
}

const firstWeekDays: MissionDay[] = [
  {
    day: 1,
    title: "The Radical Action (The Purge)",
    subtitle: "Prepare your environment for success",
    tasks: [
      {
        id: "day1_task1",
        emoji: "🗑️",
        label: "The Purge: Throw away all sugary foods and drinks",
        why: "🧠 Your brain seeks the path of least resistance. Removing temptation from your environment is the #1 strategy recommended by neuroscientists for habit change.",
      },
      {
        id: "day1_task2",
        emoji: "💧",
        label: "Hydration: Drink 2L of water",
        why: "💧 Dehydration mimics hunger signals. Drinking enough water helps your body distinguish real hunger from false sugar cravings.",
      },
      {
        id: "day1_task3",
        emoji: "🔍",
        label: 'Read Labels: Find 3 "hidden" sugars',
        why: "🔍 80% of sugar consumed is hidden in products we think are healthy. Learning to spot it puts you in control.",
      },
      {
        id: "day1_task4",
        emoji: "📸",
        label: 'The "Day 0" Photo: Take your photo',
        why: "📸 Visualizing your starting point creates a powerful emotional anchor. In 7 days, you'll see the difference.",
      },
    ],
  },
  {
    day: 2,
    title: 'The "Sugar Flu" (The Fatigue)',
    subtitle: "Manage the drop in energy while your body adapts",
    tasks: [
      {
        id: "day2_task1",
        emoji: "🥩",
        label: "Protein Focus: Eat protein at every meal",
        why: "🥩 Proteins stabilize your blood sugar for hours. Without them, your energy goes on a rollercoaster that triggers sugar cravings.",
      },
      {
        id: "day2_task2",
        emoji: "😴",
        label: "Restorative Sleep: Go to bed 30 min earlier",
        why: "😴 Cortisol increases when you lack sleep, and cortisol triggers sugar cravings. More sleep means fewer cravings.",
      },
      {
        id: "day2_task3",
        emoji: "🍵",
        label: "Anti-craving herbal tea: Mint tea after dinner",
        why: "🌿 Peppermint naturally cuts sweet cravings. It is a simple nutritionist trick to stop nighttime cravings.",
      },
    ],
  },
  {
    day: 3,
    title: "The Craving Peak (The Mental)",
    subtitle: "Manage the psychological craving peak",
    tasks: [
      {
        id: "day3_task1",
        emoji: "🍓",
        label: 'The "Glow-Up" fruit: Eat red fruits',
        why: "🍓 Day 3 is often the craving peak. Berries give you natural sweetness plus fiber that stabilizes energy without blood sugar spikes.",
      },
      {
        id: "day3_task2",
        emoji: "🎯",
        label: 'The "Why": Re-watch your AI prediction',
        why: "🎯 Your deep reason is your anchor. Reconnecting with it when cravings hit increases your chances of resisting.",
      },
      {
        id: "day3_task3",
        emoji: "🚶",
        label: "Walk 15 min: Go out and get some fresh air",
        why: "🚶 Walking releases natural endorphins and reduces cortisol. Fifteen minutes can be enough to calm a strong craving.",
      },
    ],
  },
  {
    day: 4,
    title: "The Dopamine Hunt (The Sport)",
    subtitle: 'Replace the chemical "reward" of sugar',
    tasks: [
      {
        id: "day4_task1",
        emoji: "💪",
        label: "Dopamine boost: 20 min of sport",
        why: "💪 Sugar gave you dopamine. Exercise does too, but in a healthy way. This is how you start rewiring your reward system.",
      },
      {
        id: "day4_task2",
        emoji: "🍫",
        label: 'The "friend" chocolate: 1 square of 85% dark chocolate',
        why: "🍫 Very dark chocolate contains little sugar but compounds that soothe the brain. One square can feel rewarding without relapse.",
      },
      {
        id: "day4_task3",
        emoji: "📝",
        label: "Identify the trigger: Note when the craving arrives",
        why: "📝 Identifying your triggers helps you anticipate them. Awareness is the first step to control.",
      },
    ],
  },
  {
    day: 5,
    title: "The Change (Energy Returns)",
    subtitle: "Observe the first benefits",
    tasks: [
      {
        id: "day5_task1",
        emoji: "⚡",
        label: "Note the energy: Notice less fatigue",
        why: "⚡ Day 5 is often when energy finally stabilizes. Noticing it reinforces motivation and proves it is working.",
      },
      {
        id: "day5_task2",
        emoji: "🍽️",
        label: "Glow-up recipe: Try a Sukali recipe",
        why: "🍽️ Cooking replaces the association of pleasure with sugar by pleasure through creating. Your brain learns new rewards.",
      },
      {
        id: "day5_task3",
        emoji: "📅",
        label: "Plan the weekend: Plan healthy meals",
        why: "📅 Weekends are risky. Planning ahead cuts relapse risk sharply.",
      },
    ],
  },
  {
    day: 6,
    title: "The Social Challenge (Hold On)",
    subtitle: "Manage sugar outside the home",
    tasks: [
      {
        id: "day6_task1",
        emoji: "🥤",
        label: 'The "No" at the restaurant: Sparkling lemon water',
        why: "🥤 Saying no in social settings reinforces your identity as someone who does not eat sugar. Each no becomes easier.",
      },
      {
        id: "day6_task2",
        emoji: "🥜",
        label: "Emergency snack: Carry almonds with you",
        why: "🥜 Having almonds on you is an emergency solution. Healthy fats and protein cut hunger quickly.",
      },
      {
        id: "day6_task3",
        emoji: "👤",
        label: "Face auto-scan: Check for swelling reduction",
        why: "👤 Sugar causes inflammation and puffiness. Noticing de-puffing boosts motivation.",
      },
    ],
  },
  {
    day: 7,
    title: "The First Victory (The Balance Sheet)",
    subtitle: "Celebrate and lock in success",
    tasks: [
      {
        id: "day7_task1",
        emoji: "📊",
        label: "The comparison: Photo Day 7 vs Day 0",
        why: "📊 Comparing Day 0 with Day 7 makes your progress tangible and creates pride that anchors the change.",
      },
      {
        id: "day7_task2",
        emoji: "🎁",
        label: "Reward: Offer a non-food reward",
        why: "🎁 Rewarding yourself without sugar activates reward circuits in a healthier way.",
      },
      {
        id: "day7_task3",
        emoji: "🏆",
        label: "Validate the week: Unlock the badge",
        why: "🏆 Officially validating your week creates a sense of accomplishment. Your brain registers that you did it and can continue.",
      },
    ],
  },
]

const fireStreakDays: MissionDay[] = [
  {
    day: 8,
    title: "Stay the course",
    subtitle: "Continue good habits",
    tasks: [
      {
        id: "fire_streak_day8_task1",
        emoji: "💧",
        label: "Daily hydration: 2L of water",
        why: "💧 Water helps flush out remaining sugar toxins and supports a steadier metabolism.",
      },
      {
        id: "fire_streak_day8_task2",
        emoji: "🏃",
        label: "Sport: 30 min of activity",
        why: "🏃 Physical activity improves insulin sensitivity and helps stabilize your energy for the day.",
      },
      {
        id: "fire_streak_day8_task3",
        emoji: "📱",
        label: "Scan a product at the supermarket",
        why: "🔍 Checking labels protects you from marketing traps and hidden sugars for life.",
      },
    ],
  },
  {
    day: 9,
    title: "Mind & Body Balance",
    subtitle: "Nurture your inner strength",
    tasks: [
      {
        id: "fire_streak_day9_task1",
        emoji: "🧘",
        label: "Meditation: 10 min mindfulness",
        why: "🧘 Reducing stress lowers cortisol, the main hormone that biologically triggers sugar cravings.",
      },
      {
        id: "fire_streak_day9_task2",
        emoji: "🥗",
        label: "Green meal: Fresh salad today",
        why: "🥗 Fiber slows carb absorption and helps prevent insulin spikes.",
      },
      {
        id: "fire_streak_day9_task3",
        emoji: "📖",
        label: "Read: 15 min of inspiration",
        why: "🧠 Stimulating your mind strengthens the part of the brain linked to willpower and better decisions.",
      },
    ],
  },
  {
    day: 10,
    title: "Morning Power",
    subtitle: "Start your day right",
    tasks: [
      {
        id: "fire_streak_day10_task1",
        emoji: "🌅",
        label: "Early rise: Wake up with the sun",
        why: "☀️ Natural morning light regulates your circadian rhythm, which directly affects hunger hormones.",
      },
      {
        id: "fire_streak_day10_task2",
        emoji: "🏋️",
        label: "Strength training: 30 min workout",
        why: "💪 The more muscle you have, the better your body handles sugar.",
      },
      {
        id: "fire_streak_day10_task3",
        emoji: "🍎",
        label: "Fresh fruit: Apple or berries",
        why: "🍎 Fruit sugar comes with fiber, which helps nourish your gut without the same spikes as processed sugar.",
      },
    ],
  },
  {
    day: 11,
    title: "Active Recovery",
    subtitle: "Move and nourish",
    tasks: [
      {
        id: "fire_streak_day11_task1",
        emoji: "🚴",
        label: "Cycling: 20 min bike ride",
        why: "🚴 Moderate cardio improves blood flow and oxygenation, which can reduce brain fog.",
      },
      {
        id: "fire_streak_day11_task2",
        emoji: "🥑",
        label: "Healthy fats: Avocado in your meal",
        why: "🥑 Healthy fats provide more stable long-lasting energy than sugar.",
      },
      {
        id: "fire_streak_day11_task3",
        emoji: "💤",
        label: "Quality sleep: 8 hours rest",
        why: "💤 Deep sleep is when your brain clears out metabolic waste accumulated during the day.",
      },
    ],
  },
  {
    day: 12,
    title: "Fire Streak Complete!",
    subtitle: "Celebrate your achievement",
    tasks: [
      {
        id: "fire_streak_day12_task1",
        emoji: "🔥",
        label: "You're on fire! Keep it up",
        why: "🔥 Consistency is the key to rewiring habits. Every sugar-free day strengthens the new pattern.",
      },
      {
        id: "fire_streak_day12_task2",
        emoji: "🎉",
        label: "Celebrate: Share your success",
        why: "🎉 Public commitment or sharing success often improves long-term follow-through.",
      },
      {
        id: "fire_streak_day12_task3",
        emoji: "📸",
        label: "Progress photo: Capture your glow",
        why: "📸 Objective self-monitoring is one of the strongest sources of lasting motivation.",
      },
    ],
  },
]

const fullMonthDays: MissionDay[] = [
  {
    day: 13,
    title: "The new routine",
    subtitle: "Transform into automatic habits",
    tasks: [
      {
        id: "full_month_day13_task1",
        emoji: "🧘",
        label: "Optimal hydration: 2L daily",
        why: "💧 Optimal hydration maintains the fluid environment your body needs for efficient metabolism.",
      },
      {
        id: "full_month_day13_task2",
        emoji: "🥗",
        label: "Movement = dopamine: 30 min sport",
        why: "🏃 Movement helps muscles absorb glucose more efficiently and stabilizes energy.",
      },
      {
        id: "full_month_day13_task3",
        emoji: "📚",
        label: "Proteins & glow: With every meal",
        why: "🥩 Protein increases satiety and helps stabilize blood sugar for hours.",
      },
    ],
  },
  {
    day: 14,
    title: "Mindful Movement",
    subtitle: "Connect body and mind",
    tasks: [
      {
        id: "full_month_day14_task1",
        emoji: "🌅",
        label: "Yoga session: 20 min practice",
        why: "🧘 Yoga lowers cortisol and reconnects you to real hunger signals.",
      },
      {
        id: "full_month_day14_task2",
        emoji: "🏃",
        label: "Fresh greens: Big salad bowl",
        why: "🥗 Fiber supports a healthier gut environment and steadier energy.",
      },
      {
        id: "full_month_day14_task3",
        emoji: "🍎",
        label: "Learning: Read 15 min daily",
        why: "🧠 Learning helps replace sugar reward circuits with healthier stimulation.",
      },
    ],
  },
  {
    day: 15,
    title: "Sunrise Energy",
    subtitle: "Harness morning power",
    tasks: [
      {
        id: "full_month_day15_task1",
        emoji: "🚴",
        label: "Early wake: Rise with sunrise",
        why: "☀️ Morning light helps synchronize your circadian rhythm for steadier energy.",
      },
      {
        id: "full_month_day15_task2",
        emoji: "🥑",
        label: "Cardio boost: 30 min run",
        why: "🏃 Cardio can help mobilize energy stores more effectively once sugar swings are calmer.",
      },
      {
        id: "full_month_day15_task3",
        emoji: "💤",
        label: "Fruit power: Fresh apple snack",
        why: "🍎 Apples bring fiber and polyphenols that support gut health and steadier appetite control.",
      },
    ],
  },
  {
    day: 16,
    title: "Strength & Focus",
    subtitle: "Build physical and mental power",
    tasks: [
      {
        id: "full_month_day16_task1",
        emoji: "🏋️",
        label: "Weight training: 30 min gym",
        why: "💪 Strength training improves insulin sensitivity for many hours after the workout.",
      },
      {
        id: "full_month_day16_task2",
        emoji: "🍓",
        label: "Berry boost: Fresh strawberries",
        why: "🍓 Berries give antioxidant support with a low sugar load.",
      },
      {
        id: "full_month_day16_task3",
        emoji: "📝",
        label: "Journal: Write your thoughts",
        why: "📝 Writing helps you process emotions instead of soothing them with sugar.",
      },
    ],
  },
  {
    day: 17,
    title: "Hydration & Awareness",
    subtitle: "Stay mindful and hydrated",
    tasks: [
      {
        id: "full_month_day17_task1",
        emoji: "🧘",
        label: "Meditation: 10 min calm",
        why: "🧘 Mindfulness reduces stress reactivity and helps stop emotional cravings at the source.",
      },
      {
        id: "full_month_day17_task2",
        emoji: "🥤",
        label: "Sugar-free drink: Natural options",
        why: "🥤 Avoiding liquid sugar prevents sneaky spikes that keep the addiction loop alive.",
      },
      {
        id: "full_month_day17_task3",
        emoji: "🔍",
        label: "Product scan: Check ingredients",
        why: "🔍 Checking ingredients becomes a survival reflex in a food environment full of hidden sugar.",
      },
    ],
  },
  {
    day: 18,
    title: "Morning Momentum",
    subtitle: "Start strong every day",
    tasks: [
      {
        id: "full_month_day18_task1",
        emoji: "🌅",
        label: "Sunrise ritual: Early morning start",
        why: "☀️ A solid morning routine anchors discipline for the rest of the day.",
      },
      {
        id: "full_month_day18_task2",
        emoji: "💪",
        label: "Muscle work: Strength training",
        why: "💪 Intense effort releases endorphins that feel more stable than the quick reward of sugar.",
      },
      {
        id: "full_month_day18_task3",
        emoji: "🍽️",
        label: "Balanced meal: Protein focus",
        why: "🥩 Protein requires more energy to digest and helps keep you satisfied longer.",
      },
    ],
  },
  {
    day: 19,
    title: "Active Exploration",
    subtitle: "Move and discover",
    tasks: [
      {
        id: "full_month_day19_task1",
        emoji: "🚴",
        label: "Bike adventure: 20 min cycling",
        why: "🚴 Varying activity keeps your body and metabolism engaged.",
      },
      {
        id: "full_month_day19_task2",
        emoji: "🥗",
        label: "Green meal: Healthy salad",
        why: "🥗 High-volume vegetables increase satiety and help protect against overeating.",
      },
      {
        id: "full_month_day19_task3",
        emoji: "📸",
        label: "Progress photo: Document journey",
        why: "📸 Visual self-monitoring can create strong positive reinforcement.",
      },
    ],
  },
  {
    day: 20,
    title: "Consistent Flow",
    subtitle: "Keep the rhythm going",
    tasks: [
      {
        id: "full_month_day20_task1",
        emoji: "🏃",
        label: "Running: 30 min jog",
        why: "🏃 Consistent cardio improves mitochondrial health and energy production.",
      },
      {
        id: "full_month_day20_task2",
        emoji: "🍎",
        label: "Apple snack: Natural energy",
        why: "🍎 The fiber in apples slows digestion and supports better satiety.",
      },
      {
        id: "full_month_day20_task3",
        emoji: "💤",
        label: "Rest well: 8 hours sleep",
        why: "💤 Poor sleep lowers satiety hormones and raises hunger, making relapse more likely.",
      },
    ],
  },
  {
    day: 21,
    title: "Inner Peace",
    subtitle: "Balance and tranquility",
    tasks: [
      {
        id: "full_month_day21_task1",
        emoji: "🧘",
        label: "Yoga flow: 20 min session",
        why: "🧘 Yoga activates the parasympathetic nervous system and supports recovery.",
      },
      {
        id: "full_month_day21_task2",
        emoji: "🥑",
        label: "Avocado meal: Healthy fats",
        why: "🥑 Healthy fats can provide more stable long-lasting energy than sugar.",
      },
      {
        id: "full_month_day21_task3",
        emoji: "📚",
        label: "Reading time: 15 min book",
        why: "🧠 Reading calms the mind and can reduce the anxiety that drives emotional snacking.",
      },
    ],
  },
  {
    day: 22,
    title: "Power Training",
    subtitle: "Build strength daily",
    tasks: [
      {
        id: "full_month_day22_task1",
        emoji: "🏋️",
        label: "Gym session: 30 min weights",
        why: "💪 Resistance training supports long-term metabolic health and physical resilience.",
      },
      {
        id: "full_month_day22_task2",
        emoji: "🍓",
        label: "Berry snack: Fresh fruits",
        why: "🍓 Berries are rich in compounds that may support cognitive function and recovery.",
      },
      {
        id: "full_month_day22_task3",
        emoji: "🔍",
        label: "Product check: Scan items",
        why: "🔍 Constant vigilance helps your brain stop seeing sugary products as harmless.",
      },
    ],
  },
  {
    day: 23,
    title: "Hydration Focus",
    subtitle: "Water is your best friend",
    tasks: [
      {
        id: "full_month_day23_task1",
        emoji: "🌅",
        label: "Sunrise start: Early morning",
        why: "☀️ Starting the day with intention reduces decision fatigue later on.",
      },
      {
        id: "full_month_day23_task2",
        emoji: "💧",
        label: "Water intake: 2L minimum",
        why: "💧 Even mild dehydration can reduce physical and cognitive performance.",
      },
      {
        id: "full_month_day23_task3",
        emoji: "📝",
        label: "Journal entry: Reflect today",
        why: "📝 Gratitude and reflection support serotonin and can stabilize mood without sugar.",
      },
    ],
  },
  {
    day: 24,
    title: "Active Recovery",
    subtitle: "Move with purpose",
    tasks: [
      {
        id: "full_month_day24_task1",
        emoji: "🚴",
        label: "Cycling: 20 min bike ride",
        why: "🚴 Outdoor movement combines exercise with sunlight and fresh air.",
      },
      {
        id: "full_month_day24_task2",
        emoji: "🥤",
        label: "Sugar-free drink: Natural choice",
        why: "🥤 Avoiding liquid calories is one of the simplest ways to protect weight and energy.",
      },
      {
        id: "full_month_day24_task3",
        emoji: "📸",
        label: "Progress shot: Photo update",
        why: "📸 Photos can be more reliable than the scale for noticing real progress.",
      },
    ],
  },
  {
    day: 25,
    title: "Steady Progress",
    subtitle: "Every step counts",
    tasks: [
      {
        id: "full_month_day25_task1",
        emoji: "🏃",
        label: "Running: 30 min steady pace",
        why: "🏃 Consistency beats intensity. Moderate but repeated effort changes metabolism deeply.",
      },
      {
        id: "full_month_day25_task2",
        emoji: "🍎",
        label: "Apple energy: Fresh fruit",
        why: "🍎 An apple before a meal can support fullness thanks to fiber.",
      },
      {
        id: "full_month_day25_task3",
        emoji: "💤",
        label: "Quality sleep: Full 8 hours",
        why: "💤 Muscle repair and memory consolidation both happen during sleep.",
      },
    ],
  },
  {
    day: 26,
    title: "Mindful Movement",
    subtitle: "Connect with yourself",
    tasks: [
      {
        id: "full_month_day26_task1",
        emoji: "🧘",
        label: "Meditation: 10 min peace",
        why: "🧘 Meditation strengthens the part of the brain responsible for willpower and calmer decisions.",
      },
      {
        id: "full_month_day26_task2",
        emoji: "🥑",
        label: "Avocado meal: Nutrient rich",
        why: "🥑 Healthy fats can improve satiety and reduce the urge to snack mindlessly.",
      },
      {
        id: "full_month_day26_task3",
        emoji: "📚",
        label: "Reading: 15 min inspiration",
        why: "🧠 Reading strengthens focus and replaces compulsive reward-seeking with curiosity.",
      },
    ],
  },
  {
    day: 27,
    title: "Strength Building",
    subtitle: "Grow stronger daily",
    tasks: [
      {
        id: "full_month_day27_task1",
        emoji: "🏋️",
        label: "Weight training: 30 min",
        why: "💪 Muscle acts like a metabolic ally and supports long-term insulin sensitivity.",
      },
      {
        id: "full_month_day27_task2",
        emoji: "🍓",
        label: "Strawberry snack: Antioxidants",
        why: "🍓 Strawberries have a very low glycemic effect and support an anti-inflammatory diet.",
      },
      {
        id: "full_month_day27_task3",
        emoji: "🔍",
        label: "Product scan: Check labels",
        why: "🔍 Hidden sugar goes by many names. Knowing how to spot it keeps you free.",
      },
    ],
  },
  {
    day: 28,
    title: "Final Push",
    subtitle: "Almost at the finish line",
    tasks: [
      {
        id: "full_month_day28_task1",
        emoji: "🌅",
        label: "Early rise: Morning power",
        why: "☀️ Morning discipline creates a positive domino effect across the whole day.",
      },
      {
        id: "full_month_day28_task2",
        emoji: "💪",
        label: "Strength work: Build muscle",
        why: "💪 Feeling physically stronger reinforces mental self-reliance.",
      },
      {
        id: "full_month_day28_task3",
        emoji: "📝",
        label: "Journal: Write achievements",
        why: "📝 Focusing on progress rewires the brain to look for wins instead of cravings.",
      },
    ],
  },
  {
    day: 29,
    title: "Last Sprint",
    subtitle: "One more day to go",
    tasks: [
      {
        id: "full_month_day29_task1",
        emoji: "🚴",
        label: "Bike ride: 20 min active",
        why: "🚴 Movement stimulates brain-supporting proteins that improve resilience and clarity.",
      },
      {
        id: "full_month_day29_task2",
        emoji: "🥤",
        label: "Natural drink: Sugar-free",
        why: "🥤 Pure water is still the one liquid your body biologically needs most.",
      },
      {
        id: "full_month_day29_task3",
        emoji: "📸",
        label: "Progress photo: Final check",
        why: "📸 Seeing your own progress clearly is a powerful form of motivation.",
      },
    ],
  },
  {
    day: 30,
    title: "Glow-Up Complete!",
    subtitle: "You did it! Celebrate!",
    tasks: [
      {
        id: "full_month_day30_task1",
        emoji: "🔥",
        label: "You're on fire! Full month achieved",
        why: "🔥 You have broken the addiction cycle. Your physiology is finally calmer and more stable.",
      },
      {
        id: "full_month_day30_task2",
        emoji: "🎉",
        label: "Celebrate: Share your victory",
        why: "🎉 Celebrating reinforces the reward circuit linked to achievement instead of consumption.",
      },
      {
        id: "full_month_day30_task3",
        emoji: "📸",
        label: "Final photo: Your transformation",
        why: "🏆 Your transformation is proof that you are the one in control now.",
      },
    ],
  },
]

export const missionBottomNote =
  "A new mission unlocks each day. Complete today's tasks and keep your sugar-free streak going to unlock the next day."

export const missionValidateLabel = "Validate"
export const missionFirstWeekValidatedMessage = "First week validated! Fire Streak unlocked!"

export const missionLevels: Record<MissionType, MissionLevel> = {
  first_week: {
    type: "first_week",
    title: "Mission: 7 Days for the Glow-Up",
    subtitle:
      "The first week is the hardest. Follow the steps each day and the next mission gets easier to carry.",
    lockMessage: "",
    days: applyOverrides(firstWeekDays),
  },
  fire_streak: {
    type: "fire_streak",
    title: "Mission: 12 Days for the Glow-Up",
    subtitle: "You're on fire. Keep going until the full month opens up.",
    lockMessage: "Complete 'First Week' to unlock this level.",
    days: applyOverrides(fireStreakDays),
  },
  full_month: {
    type: "full_month",
    title: "Mission: 30 Days for the Glow-Up",
    subtitle: "Level 2. You survived the hardest part. Now optimize the routine.",
    lockMessage: "Complete 'Fire Streak' to unlock this level.",
    days: applyOverrides(fullMonthDays),
  },
}
