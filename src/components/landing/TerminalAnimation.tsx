import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

type TerminalLine = {
  text: string;
  delay: number;
  highlight?: boolean;
  success?: boolean;
  danger?: boolean;
};

const baseLines: TerminalLine[] = [
  { text: "Initializing EZBuild v2.0...", delay: 0 },
  { text: "Scanning component database...", delay: 1200 },
  { text: "Loading build protocols...", delay: 2400 },
  { text: "Build guide ready.", delay: 3600, success: true },
  { text: "> Step 1: Install CPU", delay: 4800, highlight: true },
  { text: "> Step 2: Install RAM modules", delay: 5600, highlight: true },
  { text: "> Step 3: Mount CPU Cooler", delay: 6400, highlight: true },
];

export type TerminalAnimationHandle = {
  addLine: (text: string, options?: { highlight?: boolean; success?: boolean; danger?: boolean }) => void;
};

const TYPE_SPEED = 35; // ms per character for typewriter effect

const TerminalAnimation = forwardRef<TerminalAnimationHandle>((_, ref) => {
  const [baseVisible, setBaseVisible] = useState<number>(0);
  const [extraLines, setExtraLines] = useState<TerminalLine[]>([]);
  const [typingLine, setTypingLine] = useState<TerminalLine | null>(null);
  const [typedText, setTypedText] = useState<string>("");

  useEffect(() => {
    const timers = baseLines.map((line, index) => {
      return setTimeout(() => {
        setBaseVisible(index + 1);
      }, line.delay);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    addLine: (text: string, options) => {
      const highlight = options?.highlight ?? false;
      const success = options?.success ?? false;
      const danger = options?.danger ?? false;

      // Prevent duplicates if the same line already exists or is currently typing
      const alreadyPresent =
        baseLines.some((line) => line.text === text) ||
        extraLines.some((line) => line.text === text) ||
        typingLine?.text === text;

      if (alreadyPresent) return;

      setTypingLine({ text, delay: 0, highlight, success, danger });
      setTypedText("");
    },
  }));

  useEffect(() => {
    if (!typingLine) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex += 1;
      setTypedText(typingLine.text.slice(0, currentIndex));

      if (currentIndex >= typingLine.text.length) {
        clearInterval(interval);

        setExtraLines((prev) => [
          ...prev,
          {
            text: typingLine.text,
            delay: 0,
            highlight: typingLine.highlight,
            success: typingLine.success,
            danger: typingLine.danger,
          },
        ]);

        setTypingLine(null);
      }
    }, TYPE_SPEED);

    return () => clearInterval(interval);
  }, [typingLine]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Terminal window */}
      <div className="border border-border rounded-lg overflow-hidden bg-card/80 backdrop-blur-sm border-glow">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/70" />
            <div className="w-3 h-3 rounded-full bg-warning/70" />
            <div className="w-3 h-3 rounded-full bg-success/70" />
          </div>
          <span className="text-xs font-mono text-muted-foreground ml-2">EZBuild.exe</span>
        </div>
        
        {/* Terminal content */}
        <div className="p-4 font-mono text-sm min-h-[200px]">
          {[...baseLines.slice(0, baseVisible), ...extraLines].map((line, index) => (
            <div
              key={`${line.text}-${index}`}
              className={`flex items-center gap-2 animate-fade-in ${
                line.danger
                  ? "text-destructive"
                  : line.highlight
                    ? "text-primary"
                    : line.success
                      ? "text-success"
                      : "text-muted-foreground"
              }`}
            >
              {!line.highlight && !line.success && !line.danger && (
                <span className="text-muted-foreground/50">[sys]</span>
              )}
              {line.danger && (
                <span className="text-destructive/50">[sys]</span>
              )}
              <span className={line.highlight ? "text-glow-primary" : ""}>
                {line.text}
              </span>
            </div>
          ))}

          {typingLine && (
            <div className={`flex items-center gap-2 animate-fade-in ${
              typingLine.danger ? "text-destructive" : "text-muted-foreground"
            }`}>
              <span className={typingLine.danger ? "text-destructive/50" : "text-muted-foreground/50"}>[sys]</span>
              <span>{typedText}</span>
            </div>
          )}
          
          {/* Cursor */}
          <div className="flex items-center gap-1 mt-1">
            <span className="text-primary">$</span>
            <span className="w-2 h-4 bg-primary animate-blink" />
          </div>
        </div>
      </div>
      
      {/* Glow effect behind terminal */}
      <div className="absolute inset-0 -z-10 bg-primary/5 blur-3xl rounded-full" />
    </div>
  );
});

TerminalAnimation.displayName = "TerminalAnimation";

export default TerminalAnimation;
