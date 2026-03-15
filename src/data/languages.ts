export interface Language {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  xpEarned: number;
  level: number;
  category: "web" | "systems" | "scripting" | "data" | "mobile";
}

export const languages: Language[] = [
  {
    id: "html",
    name: "HTML",
    icon: "🌐",
    color: "hsl(16 85% 55%)",
    description: "Structure of the web",
    totalLessons: 24,
    completedLessons: 18,
    xpEarned: 1240,
    level: 8,
    category: "web",
  },
  {
    id: "css",
    name: "CSS",
    icon: "🎨",
    color: "hsl(210 80% 55%)",
    description: "Style & design",
    totalLessons: 28,
    completedLessons: 12,
    xpEarned: 860,
    level: 5,
    category: "web",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "⚡",
    color: "hsl(50 95% 50%)",
    description: "Make it interactive",
    totalLessons: 36,
    completedLessons: 24,
    xpEarned: 2100,
    level: 12,
    category: "web",
  },
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    color: "hsl(210 60% 48%)",
    description: "Versatile & powerful",
    totalLessons: 32,
    completedLessons: 8,
    xpEarned: 520,
    level: 3,
    category: "data",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "🔷",
    color: "hsl(210 75% 50%)",
    description: "JavaScript with types",
    totalLessons: 30,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "web",
  },
  {
    id: "react",
    name: "React",
    icon: "⚛️",
    color: "hsl(193 95% 55%)",
    description: "Build modern UIs",
    totalLessons: 28,
    completedLessons: 4,
    xpEarned: 280,
    level: 2,
    category: "web",
  },
  {
    id: "java",
    name: "Java",
    icon: "☕",
    color: "hsl(15 70% 50%)",
    description: "Enterprise & Android",
    totalLessons: 34,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "systems",
  },
  {
    id: "cpp",
    name: "C++",
    icon: "⚙️",
    color: "hsl(210 50% 45%)",
    description: "High performance",
    totalLessons: 36,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "systems",
  },
  {
    id: "csharp",
    name: "C#",
    icon: "🎯",
    color: "hsl(270 60% 50%)",
    description: "Games & enterprise",
    totalLessons: 30,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "systems",
  },
  {
    id: "sql",
    name: "SQL",
    icon: "🗄️",
    color: "hsl(200 50% 50%)",
    description: "Master databases",
    totalLessons: 22,
    completedLessons: 6,
    xpEarned: 400,
    level: 3,
    category: "data",
  },
  {
    id: "go",
    name: "Go",
    icon: "🏃",
    color: "hsl(193 70% 48%)",
    description: "Simple & fast",
    totalLessons: 26,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "systems",
  },
  {
    id: "rust",
    name: "Rust",
    icon: "🦀",
    color: "hsl(16 70% 45%)",
    description: "Safe systems code",
    totalLessons: 30,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "systems",
  },
  {
    id: "swift",
    name: "Swift",
    icon: "🍎",
    color: "hsl(16 90% 55%)",
    description: "iOS & macOS apps",
    totalLessons: 28,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "mobile",
  },
  {
    id: "kotlin",
    name: "Kotlin",
    icon: "📱",
    color: "hsl(270 55% 55%)",
    description: "Modern Android",
    totalLessons: 26,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "mobile",
  },
  {
    id: "php",
    name: "PHP",
    icon: "🐘",
    color: "hsl(240 35% 55%)",
    description: "Server-side scripting",
    totalLessons: 24,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "scripting",
  },
  {
    id: "ruby",
    name: "Ruby",
    icon: "💎",
    color: "hsl(0 65% 50%)",
    description: "Elegant & productive",
    totalLessons: 24,
    completedLessons: 0,
    xpEarned: 0,
    level: 0,
    category: "scripting",
  },
];

export interface Lesson {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  status: "locked" | "current" | "completed";
  type: "learn" | "practice" | "challenge";
}

export const getLessonsForLanguage = (languageId: string): Lesson[] => {
  const topics: Record<string, string[]> = {
    javascript: [
      "Variables & Data Types", "Operators", "Strings", "Numbers", "Booleans",
      "Arrays", "Objects", "Conditionals", "Loops", "Functions",
      "Arrow Functions", "Scope & Closures", "Array Methods", "DOM Basics",
      "Events", "Promises", "Async/Await", "Error Handling", "Classes",
      "Modules", "Destructuring", "Spread Operator", "Template Literals",
      "Map & Set", "Regular Expressions", "JSON", "Fetch API", "Local Storage",
      "Date & Time", "Math Methods", "String Methods", "Array Destructuring",
      "Object Destructuring", "Rest Parameters", "Default Parameters", "Final Challenge",
    ],
    python: [
      "Variables", "Data Types", "Strings", "Numbers", "Booleans",
      "Lists", "Tuples", "Dictionaries", "Sets", "Conditionals",
      "Loops", "Functions", "Lambda", "List Comprehension", "Classes",
      "Inheritance", "Modules", "File I/O", "Exception Handling", "Decorators",
      "Generators", "Regular Expressions", "JSON", "Virtual Environments",
      "pip & Packages", "Type Hints", "f-Strings", "Walrus Operator",
      "Dataclasses", "Pathlib", "Unit Testing", "Final Challenge",
    ],
    html: [
      "Introduction", "Elements", "Attributes", "Headings", "Paragraphs",
      "Links", "Images", "Lists", "Tables", "Forms",
      "Input Types", "Semantic HTML", "Div & Span", "Classes & IDs",
      "Head Element", "Meta Tags", "Audio & Video", "Canvas",
      "SVG Basics", "Accessibility", "Best Practices", "HTML5 APIs",
      "Responsive Meta", "Final Challenge",
    ],
    css: [
      "Selectors", "Colors", "Backgrounds", "Borders", "Margins",
      "Padding", "Box Model", "Text Styling", "Fonts", "Display",
      "Position", "Float", "Flexbox Basics", "Flexbox Advanced", "Grid Basics",
      "Grid Advanced", "Transitions", "Animations", "Transforms", "Media Queries",
      "Variables", "Pseudo-classes", "Pseudo-elements", "Responsive Design",
      "Specificity", "Shadows", "Gradients", "Final Challenge",
    ],
  };

  const langTopics = topics[languageId] || Array.from({ length: 24 }, (_, i) => `Lesson ${i + 1}`);
  const lang = languages.find(l => l.id === languageId);
  const completed = lang?.completedLessons ?? 0;

  return langTopics.map((title, i) => ({
    id: i + 1,
    title,
    description: `Master ${title.toLowerCase()} in ${lang?.name ?? languageId}`,
    xpReward: (i % 3 === 2) ? 30 : 15,
    status: i < completed ? "completed" : i === completed ? "current" : "locked",
    type: i % 5 === 4 ? "challenge" : i % 3 === 1 ? "practice" : "learn",
  }));
};

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const getQuizQuestions = (languageId: string, lessonId: number): QuizQuestion[] => {
  const quizzes: Record<string, QuizQuestion[]> = {
    html: [
      {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
        correctIndex: 0,
        explanation: "HTML stands for Hyper Text Markup Language, used to structure web content.",
      },
      {
        question: "Which tag is used for the largest heading?",
        options: ["<heading>", "<h6>", "<h1>", "<head>"],
        correctIndex: 2,
        explanation: "<h1> is the largest heading tag, <h6> is the smallest.",
      },
      {
        question: "Which attribute specifies the URL of a link?",
        options: ["src", "href", "link", "url"],
        correctIndex: 1,
        explanation: "The 'href' attribute in the <a> tag specifies the link destination.",
      },
      {
        question: "Which tag is used to display an image?",
        options: ["<image>", "<pic>", "<img>", "<photo>"],
        correctIndex: 2,
        explanation: "The <img> tag is used to embed images. It's a self-closing tag.",
      },
      {
        question: "Which element is used for an unordered list?",
        options: ["<ol>", "<li>", "<ul>", "<list>"],
        correctIndex: 2,
        explanation: "<ul> creates an unordered (bulleted) list, <ol> creates an ordered (numbered) list.",
      },
    ],
    css: [
      {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"],
        correctIndex: 1,
        explanation: "CSS stands for Cascading Style Sheets, used to style HTML elements.",
      },
      {
        question: "Which property changes the text color?",
        options: ["text-color", "font-color", "color", "foreground"],
        correctIndex: 2,
        explanation: "The 'color' property sets the text color of an element.",
      },
      {
        question: "How do you select an element with id 'main'?",
        options: [".main", "#main", "main", "*main"],
        correctIndex: 1,
        explanation: "The # symbol is used to select elements by their ID.",
      },
      {
        question: "Which property adds space inside an element's border?",
        options: ["margin", "padding", "spacing", "border-space"],
        correctIndex: 1,
        explanation: "Padding adds space between the content and the element's border.",
      },
      {
        question: "Which display value makes items sit side by side and wrap?",
        options: ["block", "inline", "flex", "none"],
        correctIndex: 2,
        explanation: "Flexbox (display: flex) makes it easy to align items in rows or columns.",
      },
    ],
    javascript: [
      {
        question: "Which keyword declares a variable that cannot be reassigned?",
        options: ["var", "let", "const", "static"],
        correctIndex: 2,
        explanation: "'const' declares a constant that cannot be reassigned after initialization.",
      },
      {
        question: "What does '===' check in JavaScript?",
        options: ["Value only", "Type only", "Value and type", "Reference"],
        correctIndex: 2,
        explanation: "'===' is the strict equality operator that checks both value and type.",
      },
      {
        question: "Which method adds an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctIndex: 0,
        explanation: "push() adds one or more elements to the end of an array.",
      },
      {
        question: "What is the output of typeof null?",
        options: ["'null'", "'undefined'", "'object'", "'boolean'"],
        correctIndex: 2,
        explanation: "This is a known JavaScript quirk — typeof null returns 'object'.",
      },
      {
        question: "Which function runs after a delay?",
        options: ["setInterval()", "setTimeout()", "setDelay()", "wait()"],
        correctIndex: 1,
        explanation: "setTimeout() executes a function after a specified delay in milliseconds.",
      },
    ],
    python: [
      {
        question: "How do you create a list in Python?",
        options: ["(1, 2, 3)", "[1, 2, 3]", "{1, 2, 3}", "<1, 2, 3>"],
        correctIndex: 1,
        explanation: "Square brackets [] are used to create lists in Python.",
      },
      {
        question: "What keyword defines a function in Python?",
        options: ["function", "func", "def", "fn"],
        correctIndex: 2,
        explanation: "'def' is used to define functions in Python.",
      },
      {
        question: "Which operator is used for floor division?",
        options: ["/", "//", "%", "**"],
        correctIndex: 1,
        explanation: "// performs floor division, rounding down to the nearest integer.",
      },
      {
        question: "What does len() return for a string?",
        options: ["Words count", "Character count", "Byte size", "Line count"],
        correctIndex: 1,
        explanation: "len() returns the number of characters in a string.",
      },
      {
        question: "How do you start a comment in Python?",
        options: ["//", "/*", "#", "--"],
        correctIndex: 2,
        explanation: "The # symbol is used for single-line comments in Python.",
      },
    ],
    typescript: [
      {
        question: "What does TypeScript add to JavaScript?",
        options: ["Performance", "Static types", "New syntax", "Compilation"],
        correctIndex: 1,
        explanation: "TypeScript's main feature is adding static type checking to JavaScript.",
      },
      {
        question: "How do you define a variable's type?",
        options: ["let x = number 5", "let x: number = 5", "let number x = 5", "let x(number) = 5"],
        correctIndex: 1,
        explanation: "TypeScript uses a colon after the variable name to annotate its type.",
      },
      {
        question: "What is an interface in TypeScript?",
        options: ["A class", "A shape for objects", "A function type", "A module"],
        correctIndex: 1,
        explanation: "Interfaces define the structure/shape that objects must follow.",
      },
      {
        question: "Which type allows any value?",
        options: ["unknown", "any", "void", "never"],
        correctIndex: 1,
        explanation: "'any' disables type checking and allows any value (use sparingly).",
      },
      {
        question: "What does the '?' after a property name mean?",
        options: ["Required", "Nullable", "Optional", "Read-only"],
        correctIndex: 2,
        explanation: "The '?' marks a property as optional — it doesn't need to be provided.",
      },
    ],
    react: [
      {
        question: "What is JSX?",
        options: ["A database", "JavaScript XML syntax", "A CSS framework", "A test runner"],
        correctIndex: 1,
        explanation: "JSX lets you write HTML-like syntax in JavaScript that React transforms into DOM elements.",
      },
      {
        question: "Which hook manages state in a function component?",
        options: ["useEffect", "useState", "useRef", "useMemo"],
        correctIndex: 1,
        explanation: "useState returns a state variable and a setter function.",
      },
      {
        question: "What does useEffect do?",
        options: ["Manages state", "Handles side effects", "Creates refs", "Memoizes values"],
        correctIndex: 1,
        explanation: "useEffect runs side effects like API calls, subscriptions, or DOM updates.",
      },
      {
        question: "How do you pass data to a child component?",
        options: ["State", "Props", "Context", "Refs"],
        correctIndex: 1,
        explanation: "Props (properties) are used to pass data from parent to child components.",
      },
      {
        question: "What triggers a re-render in React?",
        options: ["Variable change", "State or prop change", "Function call", "Console log"],
        correctIndex: 1,
        explanation: "React re-renders when state or props change, not regular variable changes.",
      },
    ],
    java: [
      {
        question: "What is the entry point of a Java program?",
        options: ["start()", "run()", "main()", "init()"],
        correctIndex: 2,
        explanation: "The main() method is where Java program execution begins.",
      },
      {
        question: "Which keyword creates a new object?",
        options: ["create", "new", "make", "init"],
        correctIndex: 1,
        explanation: "'new' allocates memory and creates a new instance of a class.",
      },
      {
        question: "What is Java's primary paradigm?",
        options: ["Functional", "Procedural", "Object-oriented", "Logic"],
        correctIndex: 2,
        explanation: "Java is primarily an object-oriented programming language.",
      },
      {
        question: "Which type stores text in Java?",
        options: ["char", "text", "String", "word"],
        correctIndex: 2,
        explanation: "String (capital S) is used to store text sequences in Java.",
      },
      {
        question: "What does 'void' mean in a method signature?",
        options: ["Returns null", "Returns nothing", "Returns 0", "Returns empty"],
        correctIndex: 1,
        explanation: "'void' means the method does not return any value.",
      },
    ],
    cpp: [
      {
        question: "Which header is used for input/output in C++?",
        options: ["<stdio.h>", "<iostream>", "<input>", "<console>"],
        correctIndex: 1,
        explanation: "<iostream> provides cin and cout for input/output in C++.",
      },
      {
        question: "What does '::' mean in C++?",
        options: ["Assignment", "Scope resolution", "Comparison", "Pointer"],
        correctIndex: 1,
        explanation: "The scope resolution operator :: accesses members of a namespace or class.",
      },
      {
        question: "Which keyword creates a pointer?",
        options: ["&", "*", "->", "ptr"],
        correctIndex: 1,
        explanation: "The * symbol declares a pointer variable that stores a memory address.",
      },
      {
        question: "What does 'cout' do?",
        options: ["Read input", "Print output", "Count items", "Clear screen"],
        correctIndex: 1,
        explanation: "'cout' (character output) prints data to the console.",
      },
      {
        question: "Which is NOT a C++ data type?",
        options: ["int", "float", "string", "decimal"],
        correctIndex: 3,
        explanation: "C++ doesn't have a built-in 'decimal' type; it uses float and double.",
      },
    ],
    csharp: [
      {
        question: "Which framework is C# primarily associated with?",
        options: ["Spring", ".NET", "Django", "Rails"],
        correctIndex: 1,
        explanation: "C# was created by Microsoft for the .NET framework.",
      },
      {
        question: "What keyword makes a class inheritable only once?",
        options: ["static", "sealed", "abstract", "final"],
        correctIndex: 1,
        explanation: "'sealed' prevents a class from being inherited by other classes.",
      },
      {
        question: "How do you write to the console in C#?",
        options: ["print()", "echo()", "Console.WriteLine()", "System.out.println()"],
        correctIndex: 2,
        explanation: "Console.WriteLine() outputs text to the console in C#.",
      },
      {
        question: "What is LINQ used for?",
        options: ["Styling", "Querying data", "Networking", "File I/O"],
        correctIndex: 1,
        explanation: "LINQ (Language Integrated Query) lets you query collections with SQL-like syntax.",
      },
      {
        question: "What does 'async' keyword do?",
        options: ["Runs synchronously", "Marks async methods", "Creates threads", "Pauses code"],
        correctIndex: 1,
        explanation: "'async' marks a method as asynchronous, allowing use of 'await'.",
      },
    ],
    sql: [
      {
        question: "Which command retrieves data from a table?",
        options: ["GET", "FETCH", "SELECT", "READ"],
        correctIndex: 2,
        explanation: "SELECT is used to query and retrieve data from database tables.",
      },
      {
        question: "Which clause filters results?",
        options: ["FILTER", "WHERE", "HAVING", "MATCH"],
        correctIndex: 1,
        explanation: "WHERE filters rows based on conditions before grouping.",
      },
      {
        question: "What does JOIN do?",
        options: ["Merges columns", "Combines rows from tables", "Creates a table", "Deletes duplicates"],
        correctIndex: 1,
        explanation: "JOIN combines rows from two or more tables based on related columns.",
      },
      {
        question: "Which command adds new data?",
        options: ["ADD", "INSERT", "CREATE", "PUSH"],
        correctIndex: 1,
        explanation: "INSERT INTO adds new rows to a table.",
      },
      {
        question: "What does GROUP BY do?",
        options: ["Sorts results", "Groups rows for aggregation", "Limits results", "Joins tables"],
        correctIndex: 1,
        explanation: "GROUP BY groups rows with the same values for aggregate functions like COUNT, SUM.",
      },
    ],
    go: [
      {
        question: "How do you declare a variable in Go?",
        options: ["var x int", "int x", "let x: int", "dim x as int"],
        correctIndex: 0,
        explanation: "Go uses 'var name type' syntax, or := for short declarations.",
      },
      {
        question: "What is a goroutine?",
        options: ["A loop", "A lightweight thread", "A data type", "A package"],
        correctIndex: 1,
        explanation: "Goroutines are lightweight concurrent functions managed by the Go runtime.",
      },
      {
        question: "Which keyword handles errors in Go?",
        options: ["try/catch", "if err != nil", "except", "rescue"],
        correctIndex: 1,
        explanation: "Go uses explicit error checking with 'if err != nil' instead of exceptions.",
      },
      {
        question: "What does 'defer' do?",
        options: ["Delays a function until surrounding function returns", "Creates a timer", "Skips code", "Async call"],
        correctIndex: 0,
        explanation: "'defer' schedules a function call to run when the enclosing function exits.",
      },
      {
        question: "What is Go's mascot called?",
        options: ["Gofer", "Gopher", "Goat", "Goblin"],
        correctIndex: 1,
        explanation: "The Go mascot is the Gopher, designed by Renée French.",
      },
    ],
    rust: [
      {
        question: "What makes Rust unique for memory safety?",
        options: ["Garbage collector", "Ownership system", "Manual malloc", "Reference counting"],
        correctIndex: 1,
        explanation: "Rust's ownership system ensures memory safety without a garbage collector.",
      },
      {
        question: "What does 'let mut' do?",
        options: ["Creates a constant", "Creates a mutable variable", "Creates a function", "Creates a type"],
        correctIndex: 1,
        explanation: "Variables are immutable by default; 'mut' makes them mutable.",
      },
      {
        question: "What is a 'borrow' in Rust?",
        options: ["Copying data", "Referencing without ownership", "Moving data", "Cloning data"],
        correctIndex: 1,
        explanation: "Borrowing lets you reference data without taking ownership of it.",
      },
      {
        question: "Which macro prints to the console?",
        options: ["print()", "console.log()", "println!()", "echo()"],
        correctIndex: 2,
        explanation: "println!() is a macro (note the !) that prints text with a newline.",
      },
      {
        question: "What does the Option type represent?",
        options: ["Error handling", "A value or nothing", "Multiple values", "Type casting"],
        correctIndex: 1,
        explanation: "Option<T> can be Some(value) or None, representing optional values.",
      },
    ],
    swift: [
      {
        question: "Which keyword declares a constant in Swift?",
        options: ["var", "let", "const", "val"],
        correctIndex: 1,
        explanation: "'let' declares an immutable constant in Swift.",
      },
      {
        question: "What are optionals in Swift?",
        options: ["Default values", "Values that can be nil", "Array types", "Functions"],
        correctIndex: 1,
        explanation: "Optionals represent a value that might be absent (nil).",
      },
      {
        question: "How do you safely unwrap an optional?",
        options: ["force unwrap !", "if let", "try/catch", "as!"],
        correctIndex: 1,
        explanation: "'if let' safely unwraps an optional — only executes if the value exists.",
      },
      {
        question: "What is a struct in Swift?",
        options: ["A reference type", "A value type", "A protocol", "A closure"],
        correctIndex: 1,
        explanation: "Structs are value types — they're copied when assigned or passed.",
      },
      {
        question: "Which framework builds iOS UIs declaratively?",
        options: ["UIKit", "SwiftUI", "AppKit", "Cocoa"],
        correctIndex: 1,
        explanation: "SwiftUI is Apple's declarative framework for building UIs across platforms.",
      },
    ],
    kotlin: [
      {
        question: "What platform is Kotlin primarily used for?",
        options: ["iOS", "Android", "Windows", "Linux"],
        correctIndex: 1,
        explanation: "Kotlin is Google's preferred language for Android development.",
      },
      {
        question: "How do you declare a read-only variable?",
        options: ["var", "val", "const", "let"],
        correctIndex: 1,
        explanation: "'val' declares an immutable (read-only) variable in Kotlin.",
      },
      {
        question: "What is Kotlin's null safety feature?",
        options: ["Try/catch", "? and !! operators", "Optional class", "Null checks"],
        correctIndex: 1,
        explanation: "Kotlin uses '?' for nullable types and '!!' for non-null assertions.",
      },
      {
        question: "What is a data class?",
        options: ["A database model", "A class with auto-generated utilities", "An abstract class", "A singleton"],
        correctIndex: 1,
        explanation: "Data classes auto-generate equals(), hashCode(), toString(), and copy().",
      },
      {
        question: "Which function replaces Java's main()?",
        options: ["fun start()", "fun main()", "fun run()", "fun init()"],
        correctIndex: 1,
        explanation: "fun main() is the entry point, but without needing a class wrapper.",
      },
    ],
    php: [
      {
        question: "How do you start a PHP block?",
        options: ["<php>", "<?php", "<script php>", "<%php"],
        correctIndex: 1,
        explanation: "<?php opens a PHP code block in a file.",
      },
      {
        question: "How do you declare a variable in PHP?",
        options: ["var x", "$x", "let x", "x:"],
        correctIndex: 1,
        explanation: "PHP variables start with a $ sign followed by the name.",
      },
      {
        question: "Which function outputs text in PHP?",
        options: ["print()", "echo", "write()", "console.log()"],
        correctIndex: 1,
        explanation: "'echo' outputs one or more strings to the browser.",
      },
      {
        question: "What does => do in PHP arrays?",
        options: ["Comparison", "Key-value mapping", "Arrow function", "Assignment"],
        correctIndex: 1,
        explanation: "=> associates a key with a value in associative arrays.",
      },
      {
        question: "Which superglobal holds form POST data?",
        options: ["$_GET", "$_POST", "$_REQUEST", "$_FORM"],
        correctIndex: 1,
        explanation: "$_POST contains data sent via HTTP POST method.",
      },
    ],
    ruby: [
      {
        question: "How do you define a method in Ruby?",
        options: ["function", "func", "def", "method"],
        correctIndex: 2,
        explanation: "'def' followed by the method name defines a method in Ruby.",
      },
      {
        question: "What does 'puts' do?",
        options: ["Reads input", "Prints with newline", "Creates variable", "Returns value"],
        correctIndex: 1,
        explanation: "'puts' prints a string followed by a newline to the console.",
      },
      {
        question: "Which symbol represents a Ruby symbol?",
        options: ["$name", "@name", ":name", "#name"],
        correctIndex: 2,
        explanation: "Symbols start with a colon and are immutable, reusable identifiers.",
      },
      {
        question: "What is a block in Ruby?",
        options: ["A class", "A chunk of code passed to a method", "A variable", "A loop"],
        correctIndex: 1,
        explanation: "Blocks are anonymous pieces of code enclosed in do..end or curly braces.",
      },
      {
        question: "What does 'nil' represent?",
        options: ["Zero", "Empty string", "Absence of value", "False"],
        correctIndex: 2,
        explanation: "'nil' represents the absence of any value — Ruby's version of null.",
      },
    ],
  };

  return quizzes[languageId] || quizzes.javascript || [];
};

export const userStats = {
  totalXp: 5400,
  currentStreak: 7,
  longestStreak: 14,
  lessonsCompleted: 72,
  languagesStarted: 6,
  rank: "Code Explorer",
  hearts: 5,
  dailyGoal: 30,
  dailyProgress: 20,
};
