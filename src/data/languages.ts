export interface Language {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  xpEarned: number;
  level: number;
  category: "web" | "systems" | "scripting" | "data" | "mobile";
}

export const languages: Language[] = [
  {
    id: "html",
    name: "HTML",
    icon: "🌐",
    color: "hsl(16 85% 55%)",
    description: "Structure of the web",
    totalLessons: 24,
    completedLessons: 18,
    xpEarned: 1240,
    level: 8,
    category: "web",
  },
  {
    id: "css",
    name: "CSS",
    icon: "🎨",
    color: "hsl(210 80% 55%)",
    description: "Style & design",
    totalLessons: 28,
    completedLessons: 12,
    xpEarned: 860,
    level: 5,
    category: "web",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "⚡",
    color: "hsl(50 95% 50%)",
    description: "Make it interactive",
    totalLessons: 36,
    completedLessons: 24,
    xpEarned: 2100,
    level: 12,
    category: "web",
  },
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    color: "hsl(210 60% 48%)",
    description: "Versatile & powerful",
    totalLessons: 32,
    completedLessons: 8,
    xpEarned: 520,
    level: 3,
    category: "data",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "🔷",
    color: "hsl(210 75% 50%)",
    description: "JavaScript with types",
    totalLessons: 30,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "web",
  },
  {
    id: "react",
    name: "React",
    icon: "⚛️",
    color: "hsl(193 95% 55%)",
    description: "Build modern UIs",
    totalLessons: 28,
    completedLessons: 4,
    xpEarned: 280,
    level: 2,
    category: "web",
  },
  {
    id: "java",
    name: "Java",
    icon: "☕",
    color: "hsl(15 70% 50%)",
    description: "Enterprise & Android",
    totalLessons: 34,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "systems",
  },
  {
    id: "cpp",
    name: "C++",
    icon: "⚙️",
    color: "hsl(210 50% 45%)",
    description: "High performance",
    totalLessons: 36,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "systems",
  },
  {
    id: "csharp",
    name: "C#",
    icon: "🎯",
    color: "hsl(270 60% 50%)",
    description: "Games & enterprise",
    totalLessons: 30,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "systems",
  },
  {
    id: "sql",
    name: "SQL",
    icon: "🗄️",
    color: "hsl(200 50% 50%)",
    description: "Master databases",
    totalLessons: 22,
    completedLessons: 6,
    xpEarned: 400,
    level: 3,
    category: "data",
  },
  {
    id: "go",
    name: "Go",
    icon: "🏃",
    color: "hsl(193 70% 48%)",
    description: "Simple & fast",
    totalLessons: 26,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "systems",
  },
  {
    id: "rust",
    name: "Rust",
    icon: "🦀",
    color: "hsl(16 70% 45%)",
    description: "Safe systems code",
    totalLessons: 30,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "systems",
  },
  {
    id: "swift",
    name: "Swift",
    icon: "🍎",
    color: "hsl(16 90% 55%)",
    description: "iOS & macOS apps",
    totalLessons: 28,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "mobile",
  },
  {
    id: "kotlin",
    name: "Kotlin",
    icon: "📱",
    color: "hsl(270 55% 55%)",
    description: "Modern Android",
    totalLessons: 26,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "mobile",
  },
  {
    id: "php",
    name: "PHP",
    icon: "🐘",
    color: "hsl(240 35% 55%)",
    description: "Server-side scripting",
    totalLessons: 24,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "scripting",
  },
  {
    id: "ruby",
    name: "Ruby",
    icon: "💎",
    color: "hsl(0 65% 50%)",
    description: "Elegant & productive",
    totalLessons: 24,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "scripting",
  },
];

export interface Lesson {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  status: "locked" | "current" | "completed";
  type: "learn" | "practice" | "challenge";
}

export const getLessonsForLanguage = (languageId: string): Lesson[] => {
  const topics: Record<string, string[]> = {
    javascript: [
      "Variables & Data Types", "Operators", "Strings", "Numbers", "Booleans",
      "Arrays", "Objects", "Conditionals", "Loops", "Functions",
      "Arrow Functions", "Scope & Closures", "Array Methods", "DOM Basics",
      "Events", "Promises", "Async/Await", "Error Handling", "Classes",
      "Modules", "Destructuring", "Spread Operator", "Template Literals",
      "Map & Set", "Regular Expressions", "JSON", "Fetch API", "Local Storage",
      "Date & Time", "Math Methods", "String Methods", "Array Destructuring",
      "Object Destructuring", "Rest Parameters", "Default Parameters", "Final Challenge",
    ],
    python: [
      "Variables", "Data Types", "Strings", "Numbers", "Booleans",
      "Lists", "Tuples", "Dictionaries", "Sets", "Conditionals",
      "Loops", "Functions", "Lambda", "List Comprehension", "Classes",
      "Inheritance", "Modules", "File I/O", "Exception Handling", "Decorators",
      "Generators", "Regular Expressions", "JSON", "Virtual Environments",
      "pip & Packages", "Type Hints", "f-Strings", "Walrus Operator",
      "Dataclasses", "Pathlib", "Unit Testing", "Final Challenge",
    ],
    html: [
      "Introduction", "Elements", "Attributes", "Headings", "Paragraphs",
      "Links", "Images", "Lists", "Tables", "Forms",
      "Input Types", "Semantic HTML", "Div & Span", "Classes & IDs",
      "Head Element", "Meta Tags", "Audio & Video", "Canvas",
      "SVG Basics", "Accessibility", "Best Practices", "HTML5 APIs",
      "Responsive Meta", "Final Challenge",
    ],
    css: [
      "Selectors", "Colors", "Backgrounds", "Borders", "Margins",
      "Padding", "Box Model", "Text Styling", "Fonts", "Display",
      "Position", "Float", "Flexbox Basics", "Flexbox Advanced", "Grid Basics",
      "Grid Advanced", "Transitions", "Animations", "Transforms", "Media Queries",
      "Variables", "Pseudo-classes", "Pseudo-elements", "Responsive Design",
      "Specificity", "Shadows", "Gradients", "Final Challenge",
    ],
  };

  const langTopics = topics[languageId] || Array.from({ length: 24 }, (_, i) => `Lesson ${i + 1}`);
  const lang = languages.find(l => l.id === languageId);
  const completed = lang?.completedLessons ?? 0;

  return langTopics.map((title, i) => ({
    id: i + 1,
    title,
    description: `Master ${title.toLowerCase()} in ${lang?.name ?? languageId}`,
    xpReward: (i % 3 === 2) ? 30 : 15,
    status: i < completed ? "completed" : i === completed ? "current" : "locked",
    type: i % 5 === 4 ? "challenge" : i % 3 === 1 ? "practice" : "learn",
  }));
};

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const getQuizQuestions = (languageId: string, lessonId: number): QuizQuestion[] => {
  const quizzes: Record<string, QuizQuestion[]> = {
    javascript: [
      {
        question: "Which keyword declares a variable that cannot be reassigned?",
        options: ["var", "let", "const", "static"],
        correctIndex: 2,
        explanation: "'const' declares a constant that cannot be reassigned after initialization.",
      },
      {
        question: "What does '===' check in JavaScript?",
        options: ["Value only", "Type only", "Value and type", "Reference"],
        correctIndex: 2,
        explanation: "'===' is the strict equality operator that checks both value and type.",
      },
      {
        question: "Which method adds an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctIndex: 0,
        explanation: "push() adds one or more elements to the end of an array.",
      },
      {
        question: "What is the output of typeof null?",
        options: ["'null'", "'undefined'", "'object'", "'boolean'"],
        correctIndex: 2,
        explanation: "This is a known JavaScript quirk — typeof null returns 'object'.",
      },
      {
        question: "Which function runs after a delay?",
        options: ["setInterval()", "setTimeout()", "setDelay()", "wait()"],
        correctIndex: 1,
        explanation: "setTimeout() executes a function after a specified delay in milliseconds.",
      },
    ],
    python: [
      {
        question: "How do you create a list in Python?",
        options: ["(1, 2, 3)", "[1, 2, 3]", "{1, 2, 3}", "<1, 2, 3>"],
        correctIndex: 1,
        explanation: "Square brackets [] are used to create lists in Python.",
      },
      {
        question: "What keyword defines a function in Python?",
        options: ["function", "func", "def", "fn"],
        correctIndex: 2,
        explanation: "'def' is used to define functions in Python.",
      },
      {
        question: "Which operator is used for floor division?",
        options: ["/", "//", "%", "**"],
        correctIndex: 1,
        explanation: "// performs floor division, rounding down to the nearest integer.",
      },
      {
        question: "What does len() return for a string?",
        options: ["Words count", "Character count", "Byte size", "Line count"],
        correctIndex: 1,
        explanation: "len() returns the number of characters in a string.",
      },
      {
        question: "How do you start a comment in Python?",
        options: ["//", "/*", "#", "--"],
        correctIndex: 2,
        explanation: "The # symbol is used for single-line comments in Python.",
      },
    ],
  };

  return quizzes[languageId] || quizzes.javascript || [];
};

export const userStats = {
  totalXp: 5400,
  currentStreak: 7,
  longestStreak: 14,
  lessonsCompleted: 72,
  languagesStarted: 6,
  rank: "Code Explorer",
  hearts: 5,
  dailyGoal: 30,
  dailyProgress: 20,
};
