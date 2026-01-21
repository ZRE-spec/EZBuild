import { useState, useEffect } from "react";

const terminalLines = [
  { text: "Initializing BuildGuide v2.0...", delay: 0 },
  { text: "Scanning component database...", delay: 800 },
  { text: "Loading build protocols...", delay: 1600 },
  { text: "> Step 1: Install CPU", delay: 2400, highlight: true },
  { text: "> Step 2: Mount CPU Cooler", delay: 3000, highlight: true },
  { text: "> Step 3: Install RAM modules", delay: 3600, highlight: true },
  { text: "Build guide ready.", delay: 4200, success: true },
];

const TerminalAnimation = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const timers = terminalLines.map((line, index) => {
      return setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
    });

    // Loop the animation
    const resetTimer = setTimeout(() => {
      setVisibleLines(0);
      // Restart after a brief pause
      setTimeout(() => {
        terminalLines.forEach((line, index) => {
          setTimeout(() => setVisibleLines(index + 1), line.delay);
        });
      }, 500);
    }, 6000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(resetTimer);
    };
  }, []);

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
          <span className="text-xs font-mono text-muted-foreground ml-2">buildguide.exe</span>
        </div>
        
        {/* Terminal content */}
        <div className="p-4 font-mono text-sm min-h-[200px]">
          {terminalLines.slice(0, visibleLines).map((line, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-2 animate-fade-in ${
                line.highlight 
                  ? "text-primary" 
                  : line.success 
                    ? "text-success" 
                    : "text-muted-foreground"
              }`}
            >
              {!line.highlight && !line.success && (
                <span className="text-muted-foreground/50">[sys]</span>
              )}
              <span className={line.highlight ? "text-glow-primary" : ""}>
                {line.text}
              </span>
            </div>
          ))}
          
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
};

export default TerminalAnimation;
