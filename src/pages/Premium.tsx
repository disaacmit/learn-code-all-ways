import { motion } from "framer-motion";
import { Crown, Check, Sparkles, BookOpen, Bot, Code2, Route } from "lucide-react";
import { usePremium } from "@/contexts/PremiumContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const features = [
  { icon: BookOpen, label: "All 24 lessons per language", desc: "Access advanced topics like design patterns, concurrency, and more" },
  { icon: Bot, label: "AI Tutor (unlimited)", desc: "Get instant help and explanations from your personal AI coding tutor" },
  { icon: Code2, label: "Interactive Code Editor", desc: "Write and test code directly in the browser" },
  { icon: Route, label: "Personalized Learning Paths", desc: "AI-powered course recommendations tailored to your goals" },
  { icon: Sparkles, label: "Advanced Courses", desc: "Deep-dive into frameworks, system design, and real-world projects" },
];

const Premium = () => {
  const { isPremium, setPremium } = usePremium();
  const navigate = useNavigate();

  const handleUpgrade = () => {
    setPremium(true);
    toast.success("🎉 Welcome to Premium! All features unlocked.");
    navigate("/");
  };

  if (isPremium) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Crown className="mx-auto mb-4 h-16 w-16 text-streak" />
          <h1 className="text-3xl font-black text-foreground">You're Premium! 🎉</h1>
          <p className="mt-2 text-muted-foreground">You have access to all features and content.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-streak">
          <Crown className="h-10 w-10 text-streak-foreground" />
        </div>
        <h1 className="text-3xl font-black text-foreground">Upgrade to Premium</h1>
        <p className="mt-2 text-muted-foreground">Unlock the full CodeLingo experience</p>
      </motion.div>

      <div className="mt-8 space-y-3">
        {features.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 rounded-2xl border-2 border-border bg-card p-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-streak/20">
              <f.icon className="h-6 w-6 text-streak" />
            </div>
            <div>
              <p className="font-bold text-foreground">{f.label}</p>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
            <Check className="ml-auto h-5 w-5 shrink-0 text-success" />
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 rounded-2xl border-2 border-streak/30 bg-gradient-to-br from-streak/5 to-streak/10 p-6 text-center">
        <p className="text-sm font-bold text-muted-foreground">Premium Plan</p>
        <p className="mt-1 text-4xl font-black text-foreground">
          $9.99<span className="text-lg font-bold text-muted-foreground">/month</span>
        </p>
        <button
          onClick={handleUpgrade}
          className="mt-4 w-full rounded-2xl bg-gradient-streak px-8 py-4 text-lg font-black text-streak-foreground transition-transform hover:scale-[1.02]"
        >
          Start Premium Now
        </button>
        <p className="mt-3 text-xs text-muted-foreground">Free trial • Cancel anytime</p>
      </motion.div>
    </div>
  );
};

export default Premium;
