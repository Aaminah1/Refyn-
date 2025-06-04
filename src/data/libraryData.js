const libraryItems = [
  {
    id: 1,
    title: "Evening Skincare",
    category: "Skincare",
    duration: "20 mins",
    totalSteps: 7,
    averageEffort: "Medium",
    timePerTask: "~7 mins",
    description: "A full skincare routine to wind down your day, cleanse away impurities, and nourish your skin overnight.",
    tasks: [
      {
        id: "t1",
        title: "Remove Makeup",
        steps: [
          "Use micellar water on a cotton pad",
          "Gently wipe face, eyes, and lips to remove all makeup"
        ]
      },
      {
        id: "t2",
        title: "Cleanse Face",
        steps: [
          "Apply a gentle cleanser to damp skin",
          "Massage in circular motions for 30 seconds",
          "Rinse thoroughly with warm water and pat dry"
        ]
      },
      {
        id: "t3",
        title: "Apply Moisturizer",
        steps: [
          "Dispense a small amount of moisturizer",
          "Apply evenly across the face and neck using upward strokes"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Morning Haircare",
    category: "Haircare",
    duration: "15 mins",
    totalSteps: 4,
    averageEffort: "Low",
    timePerTask: "~7.5 mins",
    description: "Get your hair fresh and soft for the day by rehydrating and smoothing it in the morning.",
    tasks: [
      {
        id: "t4",
        title: "Scalp Massage",
        steps: [
          "Use fingertips to gently massage your scalp",
          "Massage for 2 minutes to stimulate circulation and reduce tension"
        ]
      },
      {
        id: "t5",
        title: "Apply Leave-in Conditioner",
        steps: [
          "Spray leave-in conditioner evenly through damp or dry hair",
          "Comb through with fingers or a wide-tooth comb"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Glow-Up Facial",
    category: "Skincare",
    duration: "30 mins",
    totalSteps: 6,
    averageEffort: "High",
    timePerTask: "~10 mins",
    description: "A luxurious once-a-week deep facial that detoxes, exfoliates, and hydrates for a radiant glow.",
    tasks: [
      {
        id: "t6",
        title: "Steam Face",
        steps: [
          "Boil water and pour into a bowl",
          "Hold your face above the steam, covering with a towel for 5 minutes"
        ]
      },
      {
        id: "t7",
        title: "Apply Clay Mask",
        steps: [
          "Spread a thin, even layer on clean skin",
          "Let it dry for 10 minutes",
          "Rinse off with lukewarm water"
        ]
      },
      {
        id: "t8",
        title: "Hydrating Serum",
        steps: [
          "Use a dropper to apply serum to cheeks and forehead",
          "Gently pat into the skin with fingertips until fully absorbed"
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Dental Hygiene",
    category: "Oral Care",
    duration: "10 mins",
    totalSteps: 6,
    averageEffort: "Medium",
    timePerTask: "~3 mins",
    description: "Simple but essential daily oral routine to maintain healthy teeth, gums, and fresh breath.",
    tasks: [
      {
        id: "t9",
        title: "Brush Teeth",
        steps: [
          "Brush for 2 minutes using fluoride toothpaste",
          "Cover all surfaces: front, back, chewing surfaces, and tongue"
        ]
      },
      {
        id: "t10",
        title: "Tongue Scraping",
        steps: [
          "Use a tongue scraper or back of your toothbrush",
          "Gently scrape from back to front, rinse between scrapes"
        ]
      },
      {
        id: "t11",
        title: "Mouthwash Rinse",
        steps: [
          "Swish mouthwash in your mouth for 30 seconds",
          "Spit out — do not rinse with water afterwards"
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Lash & Brow Care",
    category: "Grooming",
    duration: "5 mins",
    totalSteps: 4,
    averageEffort: "Low",
    timePerTask: "~2.5 mins",
    description: "Maintain your lashes and brows for a natural lift and healthy growth.",
    tasks: [
      {
        id: "t12",
        title: "Brush Brows",
        steps: [
          "Use a clean spoolie brush",
          "Brush brows upward and outward to shape"
        ]
      },
      {
        id: "t13",
        title: "Apply Castor Oil",
        steps: [
          "Dip a clean wand into castor oil",
          "Lightly apply to brows and lashes before bed"
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Neck & Jawline Toning",
    category: "Facial Structure",
    duration: "8 mins",
    totalSteps: 4,
    averageEffort: "Medium",
    timePerTask: "~4 mins",
    description: "Define and lift the lower face with consistent practice and targeted stretches.",
    tasks: [
      {
        id: "t14",
        title: "Mewing Practice",
        steps: [
          "Place tongue flat against the roof of your mouth",
          "Hold posture with closed lips and relaxed jaw"
        ]
      },
      {
        id: "t15",
        title: "Neck Stretches",
        steps: [
          "Tilt head back gently",
          "Stretch neck to each side for 10 seconds"
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Hand & Nail Health",
    category: "Grooming",
    duration: "10 mins",
    totalSteps: 4,
    averageEffort: "Low",
    timePerTask: "~5 mins",
    description: "Keep your hands smooth and nails tidy for a polished everyday look.",
    tasks: [
      {
        id: "t16",
        title: "Nail Clean & Trim",
        steps: [
          "Use a soft brush to clean under nails",
          "Trim nails and file them into shape"
        ]
      },
      {
        id: "t17",
        title: "Apply Hand Cream",
        steps: [
          "Apply a generous amount of hand cream",
          "Massage into palms, fingers, and cuticles"
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Foot Care Routine",
    category: "Body Care",
    duration: "20 mins",
    totalSteps: 6,
    averageEffort: "Medium",
    timePerTask: "~6.6 mins",
    description: "A once or twice weekly pampering session to soothe and refresh tired feet.",
    tasks: [
      {
        id: "t18",
        title: "Soak Feet",
        steps: [
          "Fill a basin with warm water and Epsom salt",
          "Soak feet for 10 minutes to soften skin"
        ]
      },
      {
        id: "t19",
        title: "Scrub Heels",
        steps: [
          "Use a pumice stone or foot file on heels",
          "Rinse thoroughly and pat feet dry"
        ]
      },
      {
        id: "t20",
        title: "Apply Foot Cream",
        steps: [
          "Massage foot cream into soles and heels",
          "Wear socks to lock in moisture overnight"
        ]
      }
    ]
  },
  {
  id: 9,
  title: "Morning Stretch & Wake Up",
  category: "Wellness",
  duration: "12 mins",
  totalSteps: 4,
  averageEffort: "Low",
  timePerTask: "~3 mins",
  description: "A gentle sequence to stretch your body and boost circulation after waking up.",
  tasks: [
    {
      id: "t21",
      title: "Neck Rolls",
      steps: [
        "Roll your head gently in a circular motion",
        "Repeat in both directions for 30 seconds"
      ]
    },
    {
      id: "t22",
      title: "Side Stretches",
      steps: [
        "Reach one arm overhead and bend sideways",
        "Hold each side for 20 seconds"
      ]
    }
  ]
},{
  id: 10,
  title: "Midday Refresh Routine",
  category: "Energy Boost",
  duration: "10 mins",
  totalSteps: 3,
  averageEffort: "Medium",
  timePerTask: "~3.3 mins",
  description: "A quick midday routine to re-energize your body and mind for the second half of the day.",
  tasks: [
    {
      id: "t23",
      title: "Splash Face",
      steps: [
        "Splash cold water on your face",
        "Pat dry with a clean towel"
      ]
    },
    {
      id: "t24",
      title: "Deep Breathing",
      steps: [
        "Inhale deeply for 4 seconds",
        "Hold for 4 seconds, exhale for 4 seconds",
        "Repeat 5 times"
      ]
    },
    {
      id: "t25",
      title: "Stretch & Move",
      steps: [
        "Stand up and stretch arms overhead",
        "Walk around for 1-2 minutes to get blood flowing"
      ]
    }
  ]
}


  
];

export default libraryItems;
