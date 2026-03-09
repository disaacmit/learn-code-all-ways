import { useState } from "react";
import { motion } from "framer-motion";
import { languages } from "@/data/languages";
import LanguageCard from "@/components/LanguageCard";
import { userStats } from "@/data/languages";
import { Flame, Target } from "lucide-react";

const categories = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "systems", label: "Systems" },
  { id: "data", label: "Data" },
  { id: "scripting", label: "Scripting" },
  { id: "mobile", label: "Mobile" },
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredLanguages = activeCategory === "all"
    ? languages
    : languages.filter((l) => l.category === activeCategory);

  const dailyPercent = Math.round((userStats.dailyProgress / userStats.dailyGoal) * 100);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Welcome & Daily Goal */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black text-foreground sm:text-4xl"
          >
            Choose a language 🚀
          </motion.h1>
          <p className="mt-1 text-muted-foreground">
            {languages.filter(l => l.completedLessons > 0).length} languages in progress
          </p>
        </div>

        {/* Daily goal card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-4 rounded-2xl border-2 border-border bg-card px-5 py-3"
        >
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-streak" />
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Daily Goal</p>
              <p className="text-sm font-extrabold text-foreground">{userStats.dailyProgress}/{userStats.dailyGoal} XP</p>
            </div>
          </div>
          <div className="h-10 w-10">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" className="stroke-muted" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.5" fill="none"
                className="stroke-primary"
                strokeWidth="3"
                strokeDasharray={`${dailyPercent} ${100 - dailyPercent}`}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`relative rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
              activeCategory === cat.id
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground bg-muted"
            }`}
          >
            {activeCategory === cat.id && (
              <motion.div
                layoutId="cat-active"
                className="absolute inset-0 rounded-xl bg-gradient-hero"
                transition={{ type: "spring", duration: 0.4 }}
              />
            )}
            <span className="relative">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Languages Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredLanguages.map((lang, i) => (
          <LanguageCard key={lang.id} language={lang} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Index;
