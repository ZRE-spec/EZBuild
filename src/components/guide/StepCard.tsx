import { AlertTriangle } from "lucide-react";
import { BuildStep } from "@/types/build";

interface StepCardProps {
  step: BuildStep;
  isHandsBusy?: boolean;
}

const StepCard = ({ step, isHandsBusy = false }: StepCardProps) => {
  if (isHandsBusy) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        {/* Large step number */}
        <div className="font-mono text-8xl font-bold text-primary text-glow-primary mb-6">
          {String(step.id).padStart(2, '0')}
        </div>
        
        <h2 className="font-mono text-2xl sm:text-3xl font-semibold text-foreground mb-4">
          {step.title}
        </h2>
        
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-md leading-relaxed">
          {step.instruction}
        </p>
        
        {step.warning && (
          <div className="mt-8 p-4 bg-warning-bg border border-warning/30 rounded-lg max-w-md">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-warning shrink-0 mt-0.5" />
              <p className="text-lg text-warning-foreground">
                {step.warning}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="group relative p-4 rounded-lg border border-border bg-card/30 hover:border-primary/30 transition-all duration-300 animate-fade-in">
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 flex gap-4">
        {/* Step number */}
        <div className="flex-shrink-0 w-10 h-10 rounded bg-muted/50 border border-border text-primary font-mono font-bold flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/10 transition-all">
          {String(step.id).padStart(2, '0')}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-mono font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {step.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {step.instruction}
          </p>
          
          {step.warning && (
            <div className="mt-3 p-3 bg-warning-bg border border-warning/30 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                <p className="text-sm text-warning-foreground">
                  {step.warning}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepCard;
