import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star } from "lucide-react";
import { languages, getLessonsForLanguage, getQuizQuestions, Lesson } from "@/data/languages";
import LessonNode from "@/components/LessonNode";
import QuizView from "@/components/QuizView";

const LearnLanguage = () => {
  const { languageId } = useParams<{ languageId: string }>();
  const navigate = useNavigate();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const language = languages.find((l) => l.id === languageId);
  if (!language) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Language not found</p>
      </div>
    );
  }

  const lessons = getLessonsForLanguage(language.id);
  const progress = (language.completedLessons / language.totalLessons) * 100;

  if (activeLesson) {
    const questions = getQuizQuestions(language.id, activeLesson.id);
    return (
      <QuizView
        questions={questions}
        languageName={language.name}
        lessonTitle={activeLesson.title}
        xpReward={activeLesson.xpReward}
        onComplete={() => setActiveLesson(null)}
        onExit={() => setActiveLesson(null)}
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Header */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All Languages
      </button>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 rounded-2xl border-2 border-border bg-card p-6"
      >
        <div className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
            style={{ backgroundColor: `${language.color}20` }}
          >
            {language.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-foreground">{language.name}</h1>
            <p className="text-sm text-muted-foreground">{language.description}</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs font-bold text-primary">
                <Star className="h-3.5 w-3.5" /> Level {language.level}
              </div>
              <span className="text-xs text-muted-foreground">
                {language.completedLessons}/{language.totalLessons} lessons
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-gradient-hero"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Lesson path */}
      <div className="flex flex-col items-center gap-1 pb-16">
        {lessons.map((lesson, i) => (
          <LessonNode
            key={lesson.id}
            lesson={lesson}
            index={i}
            onStart={setActiveLesson}
          />
        ))}
      </div>
    </div>
  );
};

export default LearnLanguage;
