import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, ArrowLeft, Trophy } from "lucide-react";
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
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [finished, setFinished] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const question = questions[currentQ];
  const selected = answers[currentQ];
  const isCorrect = selected !== null ? selected === question.correctIndex : null;
  const answeredCount = answers.filter((a) => a !== null).length;
  const progress = (answeredCount / questions.length) * 100;
  const score = answers.reduce((s, a, i) => s + (a === questions[i].correctIndex ? 1 : 0), 0);

  const handleSelect = (index: number) => {
    if (answers[currentQ] !== null) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = index;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setDirection(1);
      setCurrentQ((q) => q + 1);
    } else if (answeredCount === questions.length) {
      setFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setDirection(-1);
      setCurrentQ((q) => q - 1);
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
          initial={{ x: 50 * direction, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50 * direction, opacity: 0 }}
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
                  disabled={selected !== null}
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

      {/* Feedback */}
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={handlePrev}
          disabled={currentQ === 0}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-border px-6 py-3 text-base font-bold text-foreground transition-all hover:border-primary/40 disabled:opacity-30 disabled:hover:border-border"
        >
          <ArrowLeft className="h-5 w-5" />
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentQ === questions.length - 1 && answeredCount < questions.length}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-hero px-6 py-3 text-base font-bold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-30 disabled:hover:scale-100"
        >
          {currentQ < questions.length - 1 ? "Next" : "Finish"}
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default QuizView;
