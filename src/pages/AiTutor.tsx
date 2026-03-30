import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Loader2, Crown } from "lucide-react";
import { languages } from "@/data/languages";
import { usePremium } from "@/contexts/PremiumContext";
import { useUsage } from "@/contexts/UsageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-tutor`;

const suggestedPrompts = [
  "Explain closures in simple terms",
  "What's the difference between == and ===?",
  "Help me understand recursion",
  "Write a simple sorting algorithm",
];

const AiTutor = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("javascript");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isPremium } = usePremium();
  const navigate = useNavigate();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const { canUseAi, trackAiMessage, aiRemaining } = useUsage();

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    if (!canUseAi) {
      toast.error("Daily free limit reached! Upgrade to Premium for unlimited access.");
      return;
    }
    if (!trackAiMessage()) {
      toast.error("Daily free limit reached! Upgrade to Premium for unlimited access.");
      return;
    }

    const userMsg: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          language: languages.find((l) => l.id === selectedLang)?.name || selectedLang,
        }),
      });

      if (!resp.ok || !resp.body) {
        const err = await resp.json().catch(() => ({ error: "Failed" }));
        throw new Error(err.error || "Failed to get response");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Sorry, I encountered an error: ${e instanceof Error ? e.message : "Unknown error"}. Please try again.` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-3xl flex-col px-4 py-4">
      {/* Usage banner for free users */}
      {!isPremium && (
        <div className="mb-3 flex items-center justify-between rounded-xl border-2 border-streak/30 bg-streak/5 px-4 py-2">
          <span className="text-xs font-bold text-muted-foreground">
            {aiRemaining > 0 ? `${aiRemaining} free message${aiRemaining !== 1 ? "s" : ""} remaining today` : "Daily limit reached"}
          </span>
          <button onClick={() => navigate("/premium")} className="flex items-center gap-1 rounded-lg bg-gradient-streak px-3 py-1 text-xs font-bold text-streak-foreground">
            <Crown className="h-3 w-3" /> Unlimited
          </button>
        </div>
      )}
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-hero text-xl">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-black text-foreground">AI Tutor</h1>
            <p className="text-xs text-muted-foreground">Your personal coding assistant</p>
          </div>
        </div>
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="rounded-xl border-2 border-border bg-card px-3 py-2 text-sm font-bold text-foreground"
        >
          {languages.map((l) => (
            <option key={l.id} value={l.id}>
              {l.icon} {l.name}
            </option>
          ))}
        </select>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto rounded-2xl border-2 border-border bg-card p-4">
        {messages.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full flex-col items-center justify-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-hero">
              <Sparkles className="h-10 w-10 text-primary-foreground" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-black text-foreground">Ask me anything!</h2>
              <p className="mt-1 text-sm text-muted-foreground">I can explain concepts, debug code, and create practice problems.</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="rounded-xl border-2 border-border bg-background px-4 py-3 text-left text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-primary/5"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${msg.role === "user" ? "bg-gradient-xp" : "bg-gradient-hero"}`}>
                {msg.role === "user" ? <User className="h-4 w-4 text-primary-foreground" /> : <Bot className="h-4 w-4 text-primary-foreground" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                <pre className="whitespace-pre-wrap font-nunito text-sm">{msg.content}</pre>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-semibold">Thinking...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          placeholder="Ask me about coding..."
          className="flex-1 rounded-2xl border-2 border-border bg-card px-5 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        <button
          onClick={() => sendMessage()}
          disabled={isLoading || !input.trim()}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-hero text-primary-foreground transition-transform hover:scale-105 disabled:opacity-40"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default AiTutor;
