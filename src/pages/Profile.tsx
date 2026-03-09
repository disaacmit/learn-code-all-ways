import { motion } from "framer-motion";
import { Flame, Zap, Heart, Trophy, BookOpen, Code2 } from "lucide-react";
import { userStats, languages } from "@/data/languages";

const Profile = () => {
  const startedLanguages = languages.filter((l) => l.completedLessons > 0);

  const stats = [
    { icon: Zap, label: "Total XP", value: userStats.totalXp.toLocaleString(), color: "text-xp" },
    { icon: Flame, label: "Current Streak", value: `${userStats.currentStreak} days`, color: "text-streak" },
    { icon: Flame, label: "Longest Streak", value: `${userStats.longestStreak} days`, color: "text-streak" },
    { icon: BookOpen, label: "Lessons Done", value: userStats.lessonsCompleted, color: "text-primary" },
    { icon: Code2, label: "Languages", value: userStats.languagesStarted, color: "text-accent" },
    { icon: Heart, label: "Hearts", value: userStats.hearts, color: "text-heart" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col items-center text-center"
      >
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-hero text-4xl font-black text-primary-foreground">
          CE
        </div>
        <h1 className="text-2xl font-black text-foreground">Code Explorer</h1>
        <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <Trophy className="h-4 w-4 text-streak" />
          {userStats.rank}
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border-2 border-border bg-card p-4 text-center"
          >
            <stat.icon className={`mx-auto mb-2 h-6 w-6 ${stat.color}`} />
            <p className="text-xl font-black text-foreground">{stat.value}</p>
            <p className="text-xs font-semibold text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Active languages */}
      <h2 className="mb-4 text-lg font-black text-foreground">Languages In Progress</h2>
      <div className="space-y-3">
        {startedLanguages.map((lang, i) => {
          const progress = (lang.completedLessons / lang.totalLessons) * 100;
          return (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-2xl border-2 border-border bg-card p-4"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-xl"
                style={{ backgroundColor: `${lang.color}20` }}
              >
                {lang.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-foreground">{lang.name}</p>
                  <span className="text-xs font-bold text-primary">Lv. {lang.level}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-hero"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {lang.completedLessons}/{lang.totalLessons} · {lang.xpEarned} XP
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
