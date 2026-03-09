import { Flame, Zap, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { userStats } from "@/data/languages";

const TopBar = () => {
  const location = useLocation();

  const navItems = [
    { label: "Learn", path: "/" },
    { label: "Practice", path: "/practice" },
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
                className={`relative rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
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

        {/* Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm font-bold text-streak">
            <Flame className="h-5 w-5" />
            <span>{userStats.currentStreak}</span>
          </div>
          <div className="flex items-center gap-1 text-sm font-bold text-xp">
            <Zap className="h-5 w-5" />
            <span>{userStats.totalXp}</span>
          </div>
          <div className="flex items-center gap-1 text-sm font-bold text-heart">
            <Heart className="h-5 w-5 fill-current" />
            <span>{userStats.hearts}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
