import { useState } from "react";
import { motion } from "framer-motion";
import { languages, getQuizQuestions } from "@/data/languages";
import QuizView from "@/components/QuizView";
import { Zap } from "lucide-react";

const Practice = () => {
  const [selectedLang, setSelectedLang] = useState<string | null>(null);

  const startedLanguages = languages.filter((l) => l.completedLessons > 0);

  if (selectedLang) {
    const lang = languages.find((l) => l.id === selectedLang)!;
    const questions = getQuizQuestions(selectedLang, 1);
    return (
      <div className="mx-auto max-w-2xl py-8">
        <QuizView
          questions={questions}
          languageName={lang.name}
          lessonTitle="Practice Round"
          xpReward={25}
          onComplete={() => setSelectedLang(null)}
          onExit={() => setSelectedLang(null)}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-black text-foreground">Practice Mode ⚔️</h1>
        <p className="mt-1 text-muted-foreground">Review what you've learned with quick quizzes</p>
      </motion.div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {startedLanguages.map((lang, i) => (
          <motion.button
            key={lang.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setSelectedLang(lang.id)}
            className="flex items-center gap-4 rounded-2xl border-2 border-border bg-card p-5 text-left transition-all hover:border-primary/30 hover:shadow-[var(--shadow-card-hover)]"
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
              style={{ backgroundColor: `${lang.color}20` }}
            >
              {lang.icon}
            </div>
            <div>
              <p className="text-lg font-extrabold text-foreground">{lang.name}</p>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <Zap className="h-3.5 w-3.5 text-xp" /> Quick review
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {startedLanguages.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground">Start learning a language first to unlock practice mode!</p>
        </div>
      )}
    </div>
  );
};

export default Practice;
