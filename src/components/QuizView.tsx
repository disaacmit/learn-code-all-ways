import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, Trophy } from "lucide-react";
import { QuizQuestion } from "@/data/languages";

interface QuizViewProps {
  questions: QuizQuestion[];
  languageName: string;
  lessonTitle: string;
  xpReward: number;
  onComplete: () => void;
  onExit: () => void;
}

const QuizView = ({ questions, languageName, lessonTitle, xpReward, onComplete, onExit }: QuizViewProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQ];
  const progress = ((currentQ + (isCorrect !== null ? 1 : 0)) / questions.length) * 100;

  const handleSelect = (index: number) => {
    if (isCorrect !== null) return;
    setSelected(index);
    const correct = index === question.correctIndex;
    setIsCorrect(correct);
    if (correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const xpEarned = Math.round((score / questions.length) * xpReward);
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex min-h-[60vh] flex-col items-center justify-center text-center"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ repeat: 2, duration: 0.4 }}
        >
          <Trophy className="mb-4 h-20 w-20 text-streak" />
        </motion.div>
        <h2 className="text-3xl font-black text-foreground">Lesson Complete!</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          {score}/{questions.length} correct
        </p>
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-gradient-xp px-6 py-3 text-xl font-black text-xp-foreground">
          +{xpEarned} XP
        </div>
        <button
          onClick={onComplete}
          className="mt-8 rounded-2xl bg-gradient-hero px-8 py-3 text-lg font-bold text-primary-foreground transition-transform hover:scale-105"
        >
          Continue
        </button>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <button
          onClick={onExit}
          className="text-sm font-bold text-muted-foreground hover:text-foreground"
        >
          ✕ Exit
        </button>
        <span className="text-sm font-bold text-muted-foreground">
          {currentQ + 1}/{questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-8 h-3 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-gradient-hero"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="mb-6 text-xl font-extrabold text-foreground sm:text-2xl">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, i) => {
              let style = "border-border bg-card hover:border-primary/40";
              if (selected !== null) {
                if (i === question.correctIndex) {
                  style = "border-success bg-success/10";
                } else if (i === selected && !isCorrect) {
                  style = "border-destructive bg-destructive/10";
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={isCorrect !== null}
                  className={`flex w-full items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left text-base font-semibold transition-all ${style}`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-bold text-muted-foreground">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-foreground">{option}</span>
                  {selected !== null && i === question.correctIndex && (
                    <Check className="ml-auto h-5 w-5 text-success" />
                  )}
                  {selected === i && !isCorrect && isCorrect !== null && (
                    <X className="ml-auto h-5 w-5 text-destructive" />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Feedback & Next */}
      <AnimatePresence>
        {isCorrect !== null && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-6"
          >
            <div
              className={`rounded-2xl p-4 ${
                isCorrect ? "bg-success/10" : "bg-destructive/10"
              }`}
            >
              <p className={`font-bold ${isCorrect ? "text-success" : "text-destructive"}`}>
                {isCorrect ? "🎉 Correct!" : "❌ Not quite"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{question.explanation}</p>
            </div>
            <button
              onClick={handleNext}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-hero px-6 py-3 text-base font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              {currentQ < questions.length - 1 ? "Next" : "Finish"}
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizView;
