import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Language } from "@/data/languages";

interface LanguageCardProps {
  language: Language;
  index: number;
}

const LanguageCard = ({ language, index }: LanguageCardProps) => {
  const progress = language.totalLessons > 0
    ? (language.completedLessons / language.totalLessons) * 100
    : 0;

  const isStarted = language.completedLessons > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link
        to={`/learn/${language.id}`}
        className="group block rounded-2xl border-2 border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-[var(--shadow-card-hover)]"
        style={{ ["--card-accent" as string]: language.color }}
      >
        {/* Icon & Level */}
        <div className="mb-3 flex items-start justify-between">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
            style={{ backgroundColor: `${language.color}20` }}
          >
            {language.icon}
          </div>
          {isStarted && (
            <span className="rounded-lg bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
              Lv. {language.level}
            </span>
          )}
        </div>

        {/* Info */}
        <h3 className="text-lg font-extrabold text-foreground">{language.name}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{language.description}</p>

        {/* Progress */}
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs font-semibold">
            <span className="text-muted-foreground">
              {language.completedLessons}/{language.totalLessons} lessons
            </span>
            {isStarted && (
              <span className="text-primary">{Math.round(progress)}%</span>
            )}
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-gradient-hero"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ delay: index * 0.05 + 0.3, duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 text-center">
          <span
            className={`inline-block rounded-xl px-6 py-2 text-sm font-bold transition-transform group-hover:scale-105 ${
              isStarted
                ? "bg-gradient-hero text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {isStarted ? "Continue" : "Start Learning"}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default LanguageCard;
