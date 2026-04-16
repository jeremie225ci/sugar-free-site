export type CheckoutPlanKey = "monthly" | "yearly"

export type QuizOption = {
  id: string
  label: string
  score: number
}

export type QuizQuestion = {
  id: string
  emoji: string
  title: string
  subtitle: string
  type?: "multiple" | "form"
  options?: QuizOption[]
}

export type SymptomItem = {
  id: string
  emoji: string
  label: string
  description: string
}

export type SymptomGroup = {
  id: string
  emoji: string
  title: string
  items: SymptomItem[]
}

export type NarrativeSlide = {
  id: string
  emoji: string
  title: string
  paragraphs: string[]
}

export type ExpertCard = {
  name: string
  title: string
  quote: string
  body: string
}

export type UserStory = {
  name: string
  age: string
  weight: string
  quote: string
}

export const analysisMessages = [
  "Analyzing your responses",
  "Learning relapse triggers",
  "Identifying sugar patterns",
  "Preparing your results",
]

export const quizQuestions: QuizQuestion[] = [
  {
    id: "face_puffier_morning",
    emoji: "😮‍💨",
    title: "Do you ever notice your face looking puffier in the morning?",
    subtitle: "Reveals hidden inflammation that slows your glow-up.",
    options: [
      { id: "never", label: "Never", score: 10 },
      { id: "sometimes", label: "Sometimes", score: 30 },
      { id: "often", label: "Often", score: 60 },
      { id: "almost_daily", label: "Almost every day", score: 85 },
    ],
  },
  {
    id: "face_changes_food",
    emoji: "🪞",
    title: "Does your face change depending on what you eat?",
    subtitle: "Connects food choices to facial bloating for the first time.",
    options: [
      { id: "not_at_all", label: "Not at all", score: 10 },
      { id: "slightly", label: "Slightly", score: 30 },
      { id: "yes_often", label: "Yes, often", score: 60 },
      { id: "always", label: "Always", score: 85 },
    ],
  },
  {
    id: "crave_sweet_during_day",
    emoji: "🍬",
    title: "How often do you crave something sweet during the day?",
    subtitle: "Shows how sugar controls your mood, appetite, and appearance.",
    options: [
      { id: "rarely", label: "Rarely", score: 15 },
      { id: "once_day", label: "Once a day", score: 35 },
      { id: "several_times", label: "Several times a day", score: 70 },
      { id: "constantly", label: "Constantly craving something sweet", score: 90 },
    ],
  },
  {
    id: "food_coma_after_meals",
    emoji: "😵",
    title: 'After meals, do you feel heavy, low-energy, or in a "food coma"?',
    subtitle: "Reveals sugar crashes that block fat-burning.",
    options: [
      { id: "never", label: "Never", score: 10 },
      { id: "sometimes", label: "Sometimes", score: 35 },
      { id: "often", label: "Often", score: 65 },
      { id: "almost_every_meal", label: "Almost every meal", score: 85 },
    ],
  },
  {
    id: "stay_focused_day",
    emoji: "🧠",
    title: "How easy is it for you to stay focused throughout the day?",
    subtitle: "Links sugar spikes to mental fatigue and brain fog.",
    options: [
      { id: "very_easy", label: "Very easy", score: 10 },
      { id: "sometimes_hard", label: "Sometimes hard", score: 35 },
      { id: "often_difficult", label: "Often difficult", score: 65 },
      { id: "need_snacks", label: "I lose focus without snacks", score: 90 },
    ],
  },
  {
    id: "tried_methods_nothing_worked",
    emoji: "🔁",
    title: "Have you tried other methods to slim your face or lose weight, but nothing really worked?",
    subtitle: "Makes the user realize the real problem was not the method. It was sugar.",
    options: [
      { id: "never_tried", label: "Never tried", score: 20 },
      { id: "yes_once", label: "Yes, once", score: 40 },
      { id: "few_times", label: "A few times", score: 65 },
      { id: "many_times", label: "Many times, nothing worked", score: 85 },
    ],
  },
  {
    id: "acid_reflux_night",
    emoji: "🔥",
    title: "Do you get acid reflux or stomach burn at night after eating?",
    subtitle: "Shows how sugar causes internal inflammation you do not notice.",
    options: [
      { id: "never", label: "Never", score: 10 },
      { id: "sometimes", label: "Sometimes", score: 35 },
      { id: "often", label: "Often", score: 65 },
      { id: "almost_every_night", label: "Almost every night", score: 85 },
    ],
  },
  {
    id: "bloated_stomach_immediate",
    emoji: "😣",
    title: "Do you get a bloated stomach immediately after eating?",
    subtitle: "Reveals digestive inflammation caused by sugar and processed foods.",
    options: [
      { id: "never", label: "Never", score: 10 },
      { id: "occasionally", label: "Occasionally", score: 35 },
      { id: "often", label: "Often", score: 65 },
      { id: "always", label: "Always", score: 85 },
    ],
  },
  {
    id: "face_sharper_cleaner",
    emoji: "✨",
    title: "Do you feel your face looks sharper when you eat cleaner, even for one day?",
    subtitle: "Makes the user visualize their glow-up potential instantly.",
    options: [
      { id: "not_really", label: "Not really", score: 20 },
      { id: "a_bit", label: "A bit", score: 40 },
      { id: "yes", label: "Yes", score: 65 },
      { id: "yes_clearly", label: "Yes, clearly", score: 85 },
    ],
  },
  {
    id: "quit_sugar_without_symptoms",
    emoji: "⏳",
    title: "How long could you quit sugar without feeling irritated, moody, or low?",
    subtitle: "Measures withdrawal symptoms created by hidden sugar dependency.",
    options: [
      { id: "more_than_three_days", label: "More than 3 days", score: 15 },
      { id: "one_two_days", label: "1-2 days", score: 45 },
      { id: "few_hours", label: "A few hours", score: 70 },
      { id: "need_daily", label: "I need sugar daily", score: 90 },
    ],
  },
  {
    id: "believe_glow_up_faster",
    emoji: "🌟",
    title: "Do you believe you could glow up faster if you finally broke your sugar habits?",
    subtitle: "The final psychological realization: breaking sugar unlocks your glow-up.",
    options: [
      { id: "no", label: "No", score: 20 },
      { id: "maybe", label: "Maybe", score: 40 },
      { id: "probably", label: "Probably", score: 60 },
      { id: "yes_definitely", label: "Yes, definitely", score: 80 },
    ],
  },
  {
    id: "gender_identity",
    emoji: "🧬",
    title: "What is your gender?",
    subtitle: "Choose the option that fits you best.",
    options: [
      { id: "male", label: "Male", score: 0 },
      { id: "female", label: "Female", score: 0 },
      { id: "non_binary", label: "Non-binary", score: 0 },
    ],
  },
  {
    id: "user_profile",
    emoji: "👋",
    title: "Finally, tell us your name and age.",
    subtitle: "This helps us personalize your Sukali experience.",
    type: "form",
  },
]

export const symptomGroups: SymptomGroup[] = [
  {
    id: "physical",
    emoji: "⚡",
    title: "Physical Glowdown Symptoms",
    items: [
      {
        id: "morning_puffiness",
        emoji: "🥱",
        label: "Morning puffiness",
        description: "Your face looks swollen in the morning, especially around the eyes.",
      },
      {
        id: "sugar_crashes",
        emoji: "🍭",
        label: "Sugar crashes",
        description: "Feeling sleepy or out of energy 30-60 minutes after eating.",
      },
      {
        id: "brain_fog",
        emoji: "😵‍💫",
        label: "Brain fog",
        description: "Hard to focus, overwhelmed, slower thinking.",
      },
      {
        id: "bloating_after_meals",
        emoji: "😮‍💨",
        label: "Bloating after meals",
        description: 'Your stomach gets round or tight right after eating, even "healthy" meals.',
      },
      {
        id: "bad_sleep_after_sugar",
        emoji: "🌙",
        label: "Bad sleep after sugar",
        description: "Difficulty falling asleep or waking up tired after sugary foods.",
      },
    ],
  },
  {
    id: "emotional",
    emoji: "💔",
    title: "Emotional Symptoms (Glowdown psychology)",
    items: [
      {
        id: "mood_swings",
        emoji: "😣",
        label: "Mood swings",
        description: 'You get irritated easily or feel "off" for no reason.',
      },
      {
        id: "emotional_eating",
        emoji: "💭",
        label: "Emotional eating",
        description: "You use sweet foods to calm anxiety, boredom, or stress.",
      },
      {
        id: "guilt_after_eating",
        emoji: "😫",
        label: "Guilt after eating",
        description: "You regret eating sweets but repeat it the next day.",
      },
    ],
  },
  {
    id: "behavioral",
    emoji: "🔁",
    title: "Behavioral Symptoms (Hidden dependence)",
    items: [
      {
        id: "hidden_sugar",
        emoji: "🔎",
        label: "Hidden sugar",
        description: "Ignoring sugar labels even when you know they are bad.",
      },
      {
        id: "just_one_bite",
        emoji: "🍪",
        label: '"Just one bite" turns into more',
        description: "You lose control with snacks or desserts.",
      },
      {
        id: "constant_snacking",
        emoji: "⏰",
        label: "Constant snacking",
        description: "You cannot stay 2-3 hours without wanting something sweet.",
      },
      {
        id: "endless_loop",
        emoji: "🔄",
        label: "Endless loop",
        description: "Short pleasure, then bloating, guilt, and craving again.",
      },
    ],
  },
]

export const alertSlides: NarrativeSlide[] = [
  {
    id: "swollen_face",
    emoji: "😵",
    title: "Sugar makes your face look swollen.",
    paragraphs: [
      "Sugar causes inflammation in your cheeks, jawline and under-eyes.",
      "That is why you wake up puffy even when you sleep enough.",
    ],
  },
  {
    id: "acne_oily",
    emoji: "🫠",
    title: "Sugar triggers acne and oily skin.",
    paragraphs: [
      "Industrial sugar spikes your hormones, creating breakouts, shine and redness.",
      "Remove it and your skin starts calming down almost instantly.",
    ],
  },
  {
    id: "aging_faster",
    emoji: "⏳",
    title: "Sugar ages you faster than you think.",
    paragraphs: [
      "It damages collagen, increases wrinkles and slows skin repair.",
      'It is one of the main reasons people look "tired" even with good sleep.',
    ],
  },
  {
    id: "steals_energy",
    emoji: "🔋",
    title: "Sugar steals your natural energy.",
    paragraphs: [
      "Every spike is followed by a crash: fatigue, irritability and brain fog.",
      'That is why you feel "empty" after eating sweet foods.',
    ],
  },
  {
    id: "rewires_brain",
    emoji: "🧠",
    title: "Sugar rewires your brain like a drug.",
    paragraphs: [
      "Sugar triggers dopamine spikes like addictive substances.",
      "Your brain gets used to it and demands more, making cravings stronger.",
    ],
  },
]

export const solutionSlides: NarrativeSlide[] = [
  {
    id: "hidden_sugar",
    emoji: "🔍",
    title: "Today, almost everything we eat contains hidden sugar.",
    paragraphs: [
      'Sugar is added everywhere, even in foods marketed as "healthy".',
      "Sukali helps you finally break free.",
    ],
  },
  {
    id: "body_function",
    emoji: "🌿",
    title: "Your body can function again without sugar.",
    paragraphs: [
      "Once the spikes stop, your skin clears, your energy stabilizes and digestion improves.",
      "Sukali guides your reset.",
    ],
  },
  {
    id: "real_food",
    emoji: "🍽️",
    title: "Real food = real glow.",
    paragraphs: [
      "Learn to eat without industrial sugar while still enjoying food.",
      "You will feel lighter, less bloated, and more alive.",
    ],
  },
  {
    id: "control_eat",
    emoji: "📊",
    title: "Control what you eat, control your transformation.",
    paragraphs: [
      "Track what affects your face, energy and cravings.",
      "What gets tracked gets improved.",
    ],
  },
  {
    id: "scan_food",
    emoji: "📱",
    title: "Scan your food and find the hidden sugar.",
    paragraphs: [
      "With one scan, Sukali exposes added and industrial sugars instantly.",
      "You will understand exactly what is sabotaging your glow.",
    ],
  },
]

export const expertCards: ExpertCard[] = [
  {
    name: "Dr. Laura Martinez",
    title: "Endocrinologist",
    quote: "Your body does not need added sugar. It only causes inflammation.",
    body: "Cutting industrial sugar reduces bloating, stabilizes hormones and visibly slims the face in just a few days.",
  },
  {
    name: "Dr. Ana Lopez",
    title: "Functional Nutritionist",
    quote: "Sugar is the new cigarette.",
    body: "We analyzed thousands of foods. More than 80% contain hidden sugar. Sukali helps you detect and replace them without guesswork.",
  },
  {
    name: "Carlos Mendez",
    title: "Wellbeing coach and Sukali collaborator",
    quote: "People do not realize how much energy sugar steals.",
    body: "Clients report clearer skin, less anxiety and a sharper mind after just one week without sugar.",
  },
]

export const userStories: UserStory[] = [
  {
    name: "Sophie L.",
    age: "32 years old",
    weight: "-8kg in 30 days",
    quote:
      "I thought I could not live without sugar in my coffee. By week 2 with Sukali I no longer need it. My skin is clearer and I have steady energy all day.",
  },
  {
    name: "Marc D.",
    age: "45 years old",
    weight: "-12kg in 30 days",
    quote:
      "Quitting sugar changed my mindset. No more post-meal crashes. With Sukali's day counter I feel motivated every morning.",
  },
  {
    name: "Lucia R.",
    age: "38 years old",
    weight: "-10kg in 30 days",
    quote:
      'For the first time I understood what I was eating. Sukali\'s AI scanner opened my eyes. I discovered sugar in foods I thought were "healthy".',
  },
]

export const ratingTestimonials = [
  {
    name: "Emily Johnson",
    handle: "@emilyj",
    text:
      "Sukali has been a lifesaver for me. The progress tracking and motivational notifications have kept me on track. I have not consumed sugar in 3 months and feel more in control of my life.",
  },
  {
    name: "Sarah Williams",
    handle: "@sarahw",
    text:
      "I was skeptical at first, but Sukali's AI scanner feature has helped me resist temptation. I discovered sugar in foods I thought were healthy.",
  },
]

export const checkoutPlanOptions: Array<{
  key: CheckoutPlanKey
  badge?: string
  title: string
  description: string
}> = [
  {
    key: "monthly",
    title: "Monthly access",
    description: "Flexible billing if you want to start with the shortest commitment.",
  },
  {
    key: "yearly",
    badge: "Best value",
    title: "Yearly access",
    description: "Longer commitment for users who already want the full reset and app access.",
  },
]

export const premiumBenefits = [
  "🍽️ Personalized meals and swaps",
  "🤖 Daily AI accountability",
  "📸 Smart recipes for every craving",
  "📱 Scan and analyze any food",
]
