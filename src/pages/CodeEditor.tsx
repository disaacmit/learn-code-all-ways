import { useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Copy, Check } from "lucide-react";
import { languages } from "@/data/languages";
import { toast } from "sonner";

const starterCode: Record<string, string> = {
  javascript: `// Welcome to the JavaScript playground!\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("World"));`,
  python: `# Welcome to the Python playground!\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))`,
  html: `<!-- Welcome to the HTML playground! -->\n<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n  <p>Start editing here...</p>\n</body>\n</html>`,
  css: `/* Welcome to the CSS playground! */\nbody {\n  font-family: sans-serif;\n  background: #f0f0f0;\n}\n\nh1 {\n  color: #333;\n  text-align: center;\n}`,
  typescript: `// Welcome to the TypeScript playground!\ninterface User {\n  name: string;\n  age: number;\n}\n\nfunction greet(user: User): string {\n  return \`Hello, \${user.name}! You are \${user.age}.\`;\n}\n\nconsole.log(greet({ name: "World", age: 25 }));`,
};

const CodeEditor = () => {
  const [selectedLang, setSelectedLang] = useState("javascript");
  const [code, setCode] = useState(starterCode.javascript);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
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
    } else {
      setOutput(`// ${languages.find((l) => l.id === selectedLang)?.name} output simulation\n// Code execution is available for JavaScript.\n// For other languages, use this as a scratchpad.`);
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
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-black text-foreground">Code Editor 💻</h1>
        <p className="mt-1 text-muted-foreground">Write, test, and experiment with code</p>
      </motion.div>

      {/* Toolbar */}
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
        <div className="flex-1" />
        <button onClick={handleCopy} className="flex items-center gap-1.5 rounded-xl border-2 border-border px-3 py-2 text-sm font-bold text-muted-foreground hover:text-foreground">
          {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy"}
        </button>
        <button onClick={handleReset} className="flex items-center gap-1.5 rounded-xl border-2 border-border px-3 py-2 text-sm font-bold text-muted-foreground hover:text-foreground">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
        <button onClick={handleRun} className="flex items-center gap-1.5 rounded-2xl bg-gradient-hero px-5 py-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-105">
          <Play className="h-4 w-4" /> Run
        </button>
      </div>

      {/* Editor + Output */}
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
