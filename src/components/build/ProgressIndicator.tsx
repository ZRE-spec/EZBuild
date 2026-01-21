interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  return (
    <div className="flex items-center gap-4">
      {/* Progress bar */}
      <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 glow-primary"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      
      {/* Text indicator */}
      <span className="text-sm font-mono text-muted-foreground whitespace-nowrap">
        <span className="text-primary">{currentStep}</span>
        <span className="text-border mx-1">/</span>
        <span>{totalSteps}</span>
      </span>
    </div>
  );
};

export default ProgressIndicator;
