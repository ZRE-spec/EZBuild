import { useEffect, useState } from "react";

interface BuildLoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

const BUILD_TIPS = [
  "Install RAM before mounting the motherboard in small cases.",
  "Do not overtighten motherboard screws.",
  "Connect CPU power cable before installing large coolers.",
  "Ground yourself before handling components to avoid static discharge.",
  "Apply thermal paste in a small pea-sized dot at the center of the CPU.",
  "Ensure the motherboard standoffs match your case layout.",
  "Install the I/O shield before inserting the motherboard.",
  "Double-check RAM is fully seated until the side clips click.",
  "Cable management is easier before mounting all components.",
  "Test boot with minimal components before final assembly.",
];

const STATUS_MESSAGES = [
  "Scanning hardware configuration...",
  "Calibrating build steps...",
  "Loading installation procedures...",
  "Optimizing cable routing order...",
  "Finalizing assembly sequence...",
];

const BuildLoadingScreen: React.FC<BuildLoadingScreenProps> = ({
  isVisible,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [tip, setTip] = useState<string>("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Initialize tip on mount
  useEffect(() => {
    setTip(BUILD_TIPS[Math.floor(Math.random() * BUILD_TIPS.length)]);
  }, []);

  // Progress bar animation
  useEffect(() => {
    if (!isVisible || isComplete) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 70) {
          return prev + Math.random() * 8 + 2; // Quick increase to 70%
        } else if (prev < 95) {
          return prev + Math.random() * 1.5; // Slow increase from 70-95%
        } else {
          return Math.min(prev + 0.5, 99); // Very slow toward 100%
        }
      });
    }, 300);

    return () => clearInterval(progressInterval);
  }, [isVisible, isComplete]);

  // Status message rotation
  useEffect(() => {
    if (!isVisible || isComplete) return;

    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 2000);

    return () => clearInterval(statusInterval);
  }, [isVisible, isComplete]);

  // Elapsed time tracking
  useEffect(() => {
    if (!isVisible || isComplete) return;

    const timeInterval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [isVisible, isComplete]);

  // Check completion conditions
  useEffect(() => {
    if (!isVisible || elapsedTime < 5) return;

    // Both conditions met: minimum time elapsed and we're ready
    setProgress(100);
    setIsComplete(true);
    onComplete();
  }, [elapsedTime, isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background grain">
      <div className="w-full max-w-md px-6">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="font-mono text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Preparing Your Build Guide
          </h1>
          <div className="h-1 w-16 bg-primary mx-auto"></div>
        </div>

        {/* Status Message */}
        <div className="text-center mb-8 h-16 flex items-center justify-center">
          <p className="font-mono text-sm text-primary animate-pulse">
            <span className="text-primary">{">"}</span> {STATUS_MESSAGES[statusIndex]}
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="mb-8">
          <div className="bg-muted rounded-full h-2 overflow-hidden border border-primary/30">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="font-mono text-xs text-muted-foreground text-center mt-2">
            {Math.round(Math.min(progress, 100))}%
          </p>
        </div>

        {/* Build Tip */}
        <div className="bg-primary/5 border border-primary/30 rounded-lg p-4 mb-8">
          <p className="font-mono text-xs text-primary mb-2">💡 BUILD TIP</p>
          <p className="font-mono text-sm text-foreground leading-relaxed">
            {tip}
          </p>
        </div>

        {/* Footer text */}
        <p className="text-center font-mono text-xs text-muted-foreground">
          This may take a few moments...
        </p>
      </div>
    </div>
  );
};

export default BuildLoadingScreen;
