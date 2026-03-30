import { useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Copy, Check, Loader2, Crown } from "lucide-react";
import { languages } from "@/data/languages";
import { usePremium } from "@/contexts/PremiumContext";
import { useUsage } from "@/contexts/UsageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RUN_CODE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/run-code`;

const starterCode: Record<string, string> = {
  javascript: `// Welcome to the JavaScript playground!\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("World"));`,
  typescript: `// Welcome to the TypeScript playground!\ninterface User {\n  name: string;\n  age: number;\n}\n\nfunction greet(user: User): string {\n  return \`Hello, \${user.name}! You are \${user.age}.\`;\n}\n\nconsole.log(greet({ name: "World", age: 25 }));`,
  java: `// Welcome to the Java playground!\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  csharp: `// Welcome to the C# playground!\nusing System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}`,
  cpp: `// Welcome to the C++ playground!\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
  go: `// Welcome to the Go playground!\npackage main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}`,
  rust: `// Welcome to the Rust playground!\nfn main() {\n    println!("Hello, World!");\n}`,
  swift: `// Welcome to the Swift playground!\nprint("Hello, World!")`,
  kotlin: `// Welcome to the Kotlin playground!\nfun main() {\n    println("Hello, World!")\n}`,
  php: `<?php\n// Welcome to the PHP playground!\necho "Hello, World!\\n";\n?>`,
  ruby: `# Welcome to the Ruby playground!\nputs "Hello, World!"`,
  python: `# Welcome to the Python playground!\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))`,
  html: `<!-- Welcome to the HTML playground! -->\n<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n</body>\n</html>`,
  css: `/* Welcome to the CSS playground! */\nbody {\n  font-family: sans-serif;\n  background: #f0f0f0;\n}\n\nh1 {\n  color: #333;\n  text-align: center;\n}`,
};

const CodeEditor = () => {
  const [selectedLang, setSelectedLang] = useState("javascript");
  const [code, setCode] = useState(starterCode.javascript);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const { isPremium } = usePremium();
  const navigate = useNavigate();

  const { canRunCode, trackCodeRun, codeRunsRemaining } = useUsage();

  const handleRun = async () => {
    if (!canRunCode) {
      toast.error("Daily free limit reached! Upgrade to Premium for unlimited runs.");
      return;
    }
    if (!trackCodeRun()) {
      toast.error("Daily free limit reached! Upgrade to Premium for unlimited runs.");
      return;
    }

    if (selectedLang === "javascript") {
      try {
        const logs: string[] = [];
        const mockConsole = { log: (...args: unknown[]) => logs.push(args.map(String).join(" ")) };
        const fn = new Function("console", code);
        fn(mockConsole);
        setOutput(logs.join("\n") || "// No output");
      } catch (e) {
        setOutput(`Error: ${e instanceof Error ? e.message : "Unknown error"}`);
      }
      return;
    }

    // Use AI to simulate execution for other languages
    setIsRunning(true);
    setOutput("⏳ Running...");
    try {
      const langName = languages.find((l) => l.id === selectedLang)?.name || selectedLang;
      const resp = await fetch(RUN_CODE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ code, language: langName }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Failed to run code");
      setOutput(data.output);
    } catch (e) {
      setOutput(`Error: ${e instanceof Error ? e.message : "Unknown error"}`);
      toast.error("Failed to run code");
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(starterCode[selectedLang] || `// Start coding in ${selectedLang}...`);
    setOutput("");
  };

  const handleLangChange = (lang: string) => {
    setSelectedLang(lang);
    setCode(starterCode[lang] || `// Start coding in ${lang}...`);
    setOutput("");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Usage banner for free users */}
      {!isPremium && (
        <div className="mb-4 flex items-center justify-between rounded-xl border-2 border-streak/30 bg-streak/5 px-4 py-2">
          <span className="text-xs font-bold text-muted-foreground">
            {codeRunsRemaining > 0 ? `${codeRunsRemaining} free run${codeRunsRemaining !== 1 ? "s" : ""} remaining today` : "Daily limit reached"}
          </span>
          <button onClick={() => navigate("/premium")} className="flex items-center gap-1 rounded-lg bg-gradient-streak px-3 py-1 text-xs font-bold text-streak-foreground">
            <Crown className="h-3 w-3" /> Unlimited
          </button>
        </div>
      )}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-black text-foreground">Code Editor 💻</h1>
        <p className="mt-1 text-muted-foreground">Write, test, and experiment with code in any language</p>
      </motion.div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <select
          value={selectedLang}
          onChange={(e) => handleLangChange(e.target.value)}
          className="rounded-xl border-2 border-border bg-card px-3 py-2 text-sm font-bold text-foreground"
        >
          {languages.map((l) => (
            <option key={l.id} value={l.id}>
              {l.icon} {l.name}
            </option>
          ))}
        </select>
        {selectedLang !== "javascript" && (
          <span className="rounded-lg bg-primary/10 px-2 py-1 text-xs font-bold text-primary">AI-Powered Execution</span>
        )}
        <div className="flex-1" />
        <button onClick={handleCopy} className="flex items-center gap-1.5 rounded-xl border-2 border-border px-3 py-2 text-sm font-bold text-muted-foreground hover:text-foreground">
          {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy"}
        </button>
        <button onClick={handleReset} className="flex items-center gap-1.5 rounded-xl border-2 border-border px-3 py-2 text-sm font-bold text-muted-foreground hover:text-foreground">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="flex items-center gap-1.5 rounded-2xl bg-gradient-hero px-5 py-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-50"
        >
          {isRunning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {isRunning ? "Running..." : "Run"}
        </button>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border-2 border-border bg-card">
          <div className="border-b border-border bg-muted px-4 py-2 text-xs font-bold text-muted-foreground">
            {languages.find((l) => l.id === selectedLang)?.icon} {languages.find((l) => l.id === selectedLang)?.name}
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="h-80 w-full resize-none bg-card p-4 font-mono text-sm text-foreground focus:outline-none"
            spellCheck={false}
          />
        </div>
        <div className="overflow-hidden rounded-2xl border-2 border-border bg-card">
          <div className="border-b border-border bg-muted px-4 py-2 text-xs font-bold text-muted-foreground">
            📤 Output
          </div>
          <pre className="h-80 overflow-auto p-4 font-mono text-sm text-foreground">
            {output || "// Click 'Run' to see output"}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
