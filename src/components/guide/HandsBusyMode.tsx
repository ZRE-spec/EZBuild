import { useState } from "react";
import { BuildStep } from "@/types/build";
import StepCard from "./StepCard";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HandsBusyModeProps {
  steps: BuildStep[];
  onExit: () => void;
}

const HandsBusyMode = ({ steps, onExit }: HandsBusyModeProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];

  const goNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleTap = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;
    goNext();
  };

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div 
      className="fixed inset-0 bg-background z-50 flex flex-col grain"
      onClick={handleTap}
    >
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute inset-0 scanlines opacity-20" />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">{String(currentStepIndex + 1).padStart(2, '0')}</span>
            <span className="text-border mx-1">/</span>
            <span>{String(steps.length).padStart(2, '0')}</span>
          </span>
          
          {/* Progress bar */}
          <div className="hidden sm:block w-32 h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <Button variant="ghost" size="sm" onClick={onExit} className="font-mono gap-2">
          <X className="h-4 w-4" />
          Exit
        </Button>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-auto relative z-10">
        <StepCard step={currentStep} isHandsBusy />
      </div>

      {/* Navigation */}
      <div className="relative z-10 p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={isFirstStep}
            className="gap-1 font-mono"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          
          <span className="text-xs font-mono text-muted-foreground">
            tap to continue
          </span>
          
          <Button
            variant={isLastStep ? "hero" : "default"}
            onClick={isLastStep ? onExit : goNext}
            className="gap-1 font-mono"
          >
            {isLastStep ? "Complete" : "Next"}
            {!isLastStep && <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HandsBusyMode;
