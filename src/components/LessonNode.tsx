import { motion } from "framer-motion";
import { Check, Lock, Star, Zap, Crown } from "lucide-react";
import { Lesson } from "@/data/languages";
import { usePremium } from "@/contexts/PremiumContext";
import { useNavigate } from "react-router-dom";

interface LessonNodeProps {
  lesson: Lesson;
  index: number;
  onStart: (lesson: Lesson) => void;
}

const LessonNode = ({ lesson, index, onStart }: LessonNodeProps) => {
  const { isPremium } = usePremium();
  const navigate = useNavigate();
  const isPremiumLocked = !isPremium && index >= 12;
  const isEven = index % 2 === 0;
  const offset = isEven ? -30 : 30;

  const statusStyles = {
    completed: "bg-success border-success text-success-foreground shadow-md",
    current: "bg-lesson-current border-lesson-current text-primary-foreground animate-pulse-glow shadow-lg cursor-pointer",
    locked: "bg-muted border-border text-muted-foreground",
  };

  const iconMap = {
    completed: <Check className="h-6 w-6" />,
    current: lesson.type === "challenge" ? <Star className="h-6 w-6" /> : <Zap className="h-6 w-6" />,
    locked: <Lock className="h-5 w-5" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 200 }}
      className="flex flex-col items-center"
      style={{ transform: `translateX(${offset}px)` }}
    >
      {/* Connector line */}
      {index > 0 && (
        <div className="h-8 w-0.5 bg-border" />
      )}

      {/* Node */}
      <button
        onClick={() => {
          if (isPremiumLocked) { navigate("/premium"); return; }
          if (lesson.status !== "locked") onStart(lesson);
        }}
        disabled={lesson.status === "locked" && !isPremiumLocked}
        className={`relative flex h-16 w-16 items-center justify-center rounded-full border-4 transition-transform ${
          isPremiumLocked ? "bg-streak/10 border-streak/30 text-streak cursor-pointer hover:scale-105" : statusStyles[lesson.status]
        } ${!isPremiumLocked && lesson.status === "current" ? "hover:scale-110" : ""}`}
      >
        {isPremiumLocked ? <Crown className="h-5 w-5" /> : iconMap[lesson.status]}
      </button>

      {/* Label */}
      <div className="mt-2 max-w-[140px] text-center">
        <p className={`text-xs font-bold ${
          lesson.status === "locked" ? "text-muted-foreground" : "text-foreground"
        }`}>
          {lesson.title}
        </p>
        {lesson.status !== "locked" && (
          <p className="text-[10px] font-semibold text-xp">+{lesson.xpReward} XP</p>
        )}
      </div>
    </motion.div>
  );
};

export default LessonNode;
