import { useState } from "react";
import { motion } from "framer-motion";
import { Route, Sparkles, ArrowRight, BookOpen, Trophy, Target, Lock, Crown } from "lucide-react";
import { languages } from "@/data/languages";
import { useNavigate } from "react-router-dom";
import { usePremium } from "@/contexts/PremiumContext";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  languages: string[];
  level: "beginner" | "intermediate" | "advanced";
  lessons: number;
  color: string;
}

const learningPaths: LearningPath[] = [
  {
    id: "web-fundamentals",
    title: "Web Development Fundamentals",
    description: "Master HTML, CSS, and JavaScript to build beautiful websites from scratch",
    icon: "🌐",
    languages: ["html", "css", "javascript"],
    level: "beginner",
    lessons: 88,
    color: "hsl(16 85% 55%)",
  },
  {
    id: "frontend-pro",
    title: "Frontend Professional",
    description: "Level up with TypeScript and React to build modern web applications",
    icon: "⚛️",
    languages: ["typescript", "react"],
    level: "intermediate",
    lessons: 58,
    color: "hsl(193 95% 55%)",
  },
  {
    id: "backend-mastery",
    title: "Backend Mastery",
    description: "Learn server-side development with Python, SQL, and PHP",
    icon: "🗄️",
    languages: ["python", "sql", "php"],
    level: "intermediate",
    lessons: 78,
    color: "hsl(210 60% 48%)",
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    description: "Build native mobile apps with Swift for iOS and Kotlin for Android",
    icon: "📱",
    languages: ["swift", "kotlin"],
    level: "intermediate",
    lessons: 54,
    color: "hsl(270 55% 55%)",
  },
  {
    id: "systems-programming",
    title: "Systems Programming",
    description: "Deep dive into C++, Rust, and Go for high-performance systems",
    icon: "⚙️",
    languages: ["cpp", "rust", "go"],
    level: "advanced",
    lessons: 92,
    color: "hsl(210 50% 45%)",
  },
  {
    id: "full-stack",
    title: "Full-Stack Engineer",
    description: "Complete path from HTML to React + Python backend — become job-ready",
    icon: "🚀",
    languages: ["html", "css", "javascript", "typescript", "react", "python", "sql"],
    level: "beginner",
    lessons: 200,
    color: "hsl(145 63% 42%)",
  },
];

const levelColors = {
  beginner: "bg-success/10 text-success",
  intermediate: "bg-xp/10 text-xp",
  advanced: "bg-accent/10 text-accent",
};

const skillQuestions = [
  { question: "What's your programming experience?", options: ["Complete beginner", "Some experience", "Intermediate", "Advanced"] },
  { question: "What do you want to build?", options: ["Websites", "Mobile apps", "Backend/APIs", "Games & systems"] },
  { question: "How much time can you dedicate daily?", options: ["15 minutes", "30 minutes", "1 hour", "2+ hours"] },
];

const LearningPaths = () => {
  const navigate = useNavigate();
  const { isPremium } = usePremium();
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [recommended, setRecommended] = useState<string | null>(null);

  const handleAnswer = (answerIdx: number) => {
    const newAnswers = [...answers, answerIdx];
    setAnswers(newAnswers);

    if (assessmentStep < skillQuestions.length - 1) {
      setAssessmentStep((s) => s + 1);
    } else {
      // Simple recommendation logic
      const experience = newAnswers[0];
      const goal = newAnswers[1];

      let pathId = "web-fundamentals";
      if (goal === 1) pathId = "mobile-dev";
      else if (goal === 2) pathId = "backend-mastery";
      else if (goal === 3) pathId = "systems-programming";
      else if (experience >= 2) pathId = "frontend-pro";

      setRecommended(pathId);
    }
  };

  const resetAssessment = () => {
    setShowAssessment(false);
    setAssessmentStep(0);
    setAnswers([]);
    setRecommended(null);
  };

  if (showAssessment && !recommended) {
    const q = skillQuestions[assessmentStep];
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <motion.div key={assessmentStep} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-hero">
            <Target className="h-8 w-8 text-primary-foreground" />
          </div>
          <p className="text-sm font-bold text-muted-foreground">Question {assessmentStep + 1}/{skillQuestions.length}</p>
          <h2 className="mt-2 text-2xl font-black text-foreground">{q.question}</h2>
          <div className="mt-6 space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full rounded-2xl border-2 border-border bg-card px-6 py-4 text-left font-bold text-foreground transition-all hover:border-primary/40 hover:bg-primary/5"
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (recommended) {
    const path = learningPaths.find((p) => p.id === recommended)!;
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Sparkles className="mx-auto mb-4 h-16 w-16 text-streak" />
          <h2 className="text-3xl font-black text-foreground">Your Perfect Path</h2>
          <p className="mt-2 text-muted-foreground">Based on your goals, we recommend:</p>

          <div className="mt-6 rounded-2xl border-2 border-primary/30 bg-card p-6">
            <span className="text-4xl">{path.icon}</span>
            <h3 className="mt-2 text-xl font-black text-foreground">{path.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{path.description}</p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${levelColors[path.level]}`}>{path.level}</span>
              <span className="text-sm font-bold text-muted-foreground">{path.lessons} lessons</span>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {path.languages.map((lid) => {
                const lang = languages.find((l) => l.id === lid);
                return lang ? (
                  <span key={lid} className="rounded-lg bg-muted px-2 py-1 text-xs font-bold text-muted-foreground">
                    {lang.icon} {lang.name}
                  </span>
                ) : null;
              })}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <button onClick={resetAssessment} className="rounded-2xl border-2 border-border px-6 py-3 font-bold text-foreground hover:border-primary/40">
              Retake Quiz
            </button>
            <button onClick={() => navigate(`/learn/${path.languages[0]}`)} className="rounded-2xl bg-gradient-hero px-6 py-3 font-bold text-primary-foreground transition-transform hover:scale-105">
              Start Learning <ArrowRight className="ml-1 inline h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-foreground">Learning Paths 🛤️</h1>
          <p className="mt-1 text-muted-foreground">Structured courses to reach your goals</p>
        </div>
        <button
          onClick={() => setShowAssessment(true)}
          className="flex items-center gap-2 rounded-2xl bg-gradient-hero px-5 py-3 font-bold text-primary-foreground transition-transform hover:scale-105"
        >
          <Sparkles className="h-5 w-5" /> Find My Path
        </button>
      </motion.div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {learningPaths.map((path, i) => {
          const progress = path.languages.reduce((sum, lid) => {
            const lang = languages.find((l) => l.id === lid);
            return sum + (lang ? lang.completedLessons : 0);
          }, 0);
          const total = path.languages.reduce((sum, lid) => {
            const lang = languages.find((l) => l.id === lid);
            return sum + (lang ? lang.totalLessons : 0);
          }, 0);
          const pct = total ? Math.round((progress / total) * 100) : 0;

          return (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate(`/learn/${path.languages[0]}`)}
              className="cursor-pointer rounded-2xl border-2 border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{path.icon}</span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${levelColors[path.level]}`}>{path.level}</span>
              </div>
              <h3 className="mt-3 text-lg font-black text-foreground">{path.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{path.description}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {path.languages.map((lid) => {
                  const lang = languages.find((l) => l.id === lid);
                  return lang ? (
                    <span key={lid} className="rounded-md bg-muted px-2 py-0.5 text-xs font-bold text-muted-foreground">
                      {lang.icon} {lang.name}
                    </span>
                  ) : null;
                })}
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                  <span>{path.lessons} lessons</span>
                  <span>{pct}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-hero transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPaths;
