import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";

interface ComponentInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: LucideIcon;
}

const ComponentInput = ({ id, label, placeholder, value, onChange, icon: Icon }: ComponentInputProps) => {
  return (
    <div className="group relative">
      {/* Slot-style container */}
      <div className="relative p-4 rounded-lg bg-card/50 border border-border hover:border-primary/30 transition-all duration-300">
        {/* Glow on hover */}
        <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative z-10 flex items-center gap-4">
          {/* Icon slot */}
          {Icon && (
            <div className="flex-shrink-0 w-10 h-10 rounded bg-muted/50 border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors">
              <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          )}
          
          {/* Input area */}
          <div className="flex-1 min-w-0">
            <label 
              htmlFor={id} 
              className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1"
            >
              {label}
            </label>
            <Input
              id={id}
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="h-9 bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50 font-mono"
            />
          </div>
          
          {/* Status indicator */}
          <div className={`w-2 h-2 rounded-full transition-colors ${value ? 'bg-success' : 'bg-muted'}`} />
        </div>
      </div>
    </div>
  );
};

export default ComponentInput;
