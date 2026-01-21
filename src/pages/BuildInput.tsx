import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ComponentInput from "@/components/build/ComponentInput";
import ProgressIndicator from "@/components/build/ProgressIndicator";
import { Button } from "@/components/ui/button";
import { BuildComponents } from "@/types/build";
import { Crosshair, Cpu, CircuitBoard, Fan, MemoryStick, MonitorUp, HardDrive, Plug, Box } from "lucide-react";

const componentFields: { key: keyof BuildComponents; label: string; placeholder: string; icon: typeof Cpu }[] = [
  { key: "cpu", label: "CPU", placeholder: "e.g., AMD Ryzen 7 7800X3D", icon: Cpu },
  { key: "motherboard", label: "Motherboard", placeholder: "e.g., ASUS ROG Strix B650E-F", icon: CircuitBoard },
  { key: "cpuCooler", label: "Cooling", placeholder: "e.g., Noctua NH-D15", icon: Fan },
  { key: "ram", label: "Memory", placeholder: "e.g., Corsair Vengeance 32GB DDR5", icon: MemoryStick },
  { key: "gpu", label: "Graphics Card", placeholder: "e.g., NVIDIA GeForce RTX 4070", icon: MonitorUp },
  { key: "storage", label: "Storage", placeholder: "e.g., Samsung 990 Pro 2TB NVMe", icon: HardDrive },
  { key: "psu", label: "Power Supply", placeholder: "e.g., Corsair RM850x", icon: Plug },
  { key: "case", label: "Case", placeholder: "e.g., Fractal Design North", icon: Box },
];

const BuildInput = () => {
  const navigate = useNavigate();
  const [components, setComponents] = useState<BuildComponents>({
    cpu: "",
    motherboard: "",
    cpuCooler: "",
    ram: "",
    gpu: "",
    storage: "",
    psu: "",
    case: "",
  });

  const updateComponent = (key: keyof BuildComponents, value: string) => {
    setComponents((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("buildComponents", JSON.stringify(components));
    navigate("/guide");
  };

  const filledCount = Object.values(components).filter(Boolean).length;

  return (
    <Layout>
      <div className="py-8 sm:py-12 grain">
        <div className="container-tight relative">
          {/* Header */}
          <div className="mb-8">
            <ProgressIndicator currentStep={1} totalSteps={2} />
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Crosshair className="h-6 w-6 text-primary" />
              <h1 className="font-mono text-2xl sm:text-3xl font-bold text-foreground">
                Loadout Setup
              </h1>
            </div>
            <p className="text-muted-foreground font-mono text-sm">
              <span className="text-primary">{">"}</span> Configure your build components
            </p>
          </div>

          {/* Component slots */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {componentFields.map((field, index) => (
              <div 
                key={field.key} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ComponentInput
                  id={field.key}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={components[field.key]}
                  onChange={(value) => updateComponent(field.key, value)}
                  icon={field.icon}
                />
              </div>
            ))}

            {/* Submit section */}
            <div className="pt-8">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full sm:w-auto group font-mono"
                >
                  <span>Generate Build Guide</span>
                  <Crosshair className="ml-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                </Button>
                
                {filledCount > 0 && (
                  <span className="text-sm font-mono text-muted-foreground">
                    <span className="text-success">{filledCount}</span>
                    <span className="text-border mx-1">/</span>
                    <span>{componentFields.length}</span>
                    <span className="ml-2 text-muted-foreground/70">slots configured</span>
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default BuildInput;
