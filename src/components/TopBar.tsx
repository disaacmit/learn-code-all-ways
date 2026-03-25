import { Flame, Zap, Heart, LogOut, Crown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { userStats } from "@/data/languages";
import { useAuth } from "@/contexts/AuthContext";
import { usePremium } from "@/contexts/PremiumContext";
import { Button } from "@/components/ui/button";

const TopBar = () => {
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const { isPremium } = usePremium();

  const navItems = [
    { label: "Learn", path: "/" },
    { label: "Paths", path: "/learning-paths" },
    { label: "AI Tutor", path: "/ai-tutor" },
    { label: "Editor", path: "/code-editor" },
    { label: "Profile", path: "/profile" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-xl font-black text-primary-foreground">
            {"</>"}
          </div>
          <span className="hidden text-xl font-black tracking-tight text-foreground sm:block">
            CodeLingo
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative rounded-xl px-3 py-2 text-xs font-bold transition-colors sm:px-4 sm:text-sm ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-xl bg-primary/10"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Stats & User */}
        <div className="flex items-center gap-2 sm:gap-3">
          {!isPremium && (
            <Link to="/premium" className="flex items-center gap-1 rounded-lg bg-gradient-streak px-2 py-1 text-xs font-bold text-streak-foreground transition-transform hover:scale-105">
              <Crown className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Pro</span>
            </Link>
          )}
          {isPremium && (
            <div className="flex items-center gap-1 text-xs font-bold text-streak">
              <Crown className="h-4 w-4" />
            </div>
          )}
          <div className="flex items-center gap-1 text-sm font-bold text-streak">
            <Flame className="h-5 w-5" />
            <span>{userStats.currentStreak}</span>
          </div>
          <div className="flex items-center gap-1 text-sm font-bold text-xp">
            <Zap className="h-5 w-5" />
            <span>{userStats.totalXp}</span>
          </div>
          <div className="hidden items-center gap-1 text-sm font-bold text-heart sm:flex">
            <Heart className="h-5 w-5 fill-current" />
            <span>{userStats.hearts}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={signOut}
            className="ml-1 h-9 w-9 text-muted-foreground hover:text-destructive"
            title={`Signed in as ${profile?.display_name ?? "User"}`}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
