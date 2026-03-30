import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface UsageLimits {
  aiMessages: number;
  codeRuns: number;
}

const FREE_LIMITS: UsageLimits = { aiMessages: 3, codeRuns: 5 };

interface UsageContextType {
  usage: UsageLimits;
  canUseAi: boolean;
  canRunCode: boolean;
  trackAiMessage: () => boolean;
  trackCodeRun: () => boolean;
  aiRemaining: number;
  codeRunsRemaining: number;
}

const UsageContext = createContext<UsageContextType>({
  usage: { aiMessages: 0, codeRuns: 0 },
  canUseAi: true,
  canRunCode: true,
  trackAiMessage: () => true,
  trackCodeRun: () => true,
  aiRemaining: FREE_LIMITS.aiMessages,
  codeRunsRemaining: FREE_LIMITS.codeRuns,
});

export const useUsage = () => useContext(UsageContext);

const getTodayKey = () => new Date().toISOString().slice(0, 10);

const getStoredUsage = (): UsageLimits & { date: string } => {
  try {
    const raw = localStorage.getItem("codelingo_usage");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.date === getTodayKey()) return parsed;
    }
  } catch {}
  return { aiMessages: 0, codeRuns: 0, date: getTodayKey() };
};

const saveUsage = (usage: UsageLimits) => {
  localStorage.setItem("codelingo_usage", JSON.stringify({ ...usage, date: getTodayKey() }));
};

export const UsageProvider = ({ children, isPremium }: { children: ReactNode; isPremium: boolean }) => {
  const [usage, setUsage] = useState<UsageLimits>(() => {
    const stored = getStoredUsage();
    return { aiMessages: stored.aiMessages, codeRuns: stored.codeRuns };
  });

  const canUseAi = isPremium || usage.aiMessages < FREE_LIMITS.aiMessages;
  const canRunCode = isPremium || usage.codeRuns < FREE_LIMITS.codeRuns;
  const aiRemaining = isPremium ? Infinity : Math.max(0, FREE_LIMITS.aiMessages - usage.aiMessages);
  const codeRunsRemaining = isPremium ? Infinity : Math.max(0, FREE_LIMITS.codeRuns - usage.codeRuns);

  const trackAiMessage = useCallback(() => {
    if (isPremium) return true;
    if (usage.aiMessages >= FREE_LIMITS.aiMessages) return false;
    const next = { ...usage, aiMessages: usage.aiMessages + 1 };
    setUsage(next);
    saveUsage(next);
    return true;
  }, [isPremium, usage]);

  const trackCodeRun = useCallback(() => {
    if (isPremium) return true;
    if (usage.codeRuns >= FREE_LIMITS.codeRuns) return false;
    const next = { ...usage, codeRuns: usage.codeRuns + 1 };
    setUsage(next);
    saveUsage(next);
    return true;
  }, [isPremium, usage]);

  return (
    <UsageContext.Provider value={{ usage, canUseAi, canRunCode, trackAiMessage, trackCodeRun, aiRemaining, codeRunsRemaining }}>
      {children}
    </UsageContext.Provider>
  );
};
