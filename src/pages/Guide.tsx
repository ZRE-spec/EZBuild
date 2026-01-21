import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProgressIndicator from "@/components/build/ProgressIndicator";
import StepCard from "@/components/guide/StepCard";
import HandsBusyMode from "@/components/guide/HandsBusyMode";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BuildComponents, BuildStep } from "@/types/build";
import { generateMockSteps } from "@/data/mockGuide";
import { Hand, Save, FileDown, ArrowLeft, Target, Crosshair } from "lucide-react";

const Guide = () => {
  const navigate = useNavigate();
  const [components, setComponents] = useState<BuildComponents | null>(null);
  const [steps, setSteps] = useState<BuildStep[]>([]);
  const [handsBusyMode, setHandsBusyMode] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("buildComponents");
    if (stored) {
      setComponents(JSON.parse(stored));
    }
    setSteps(generateMockSteps());
  }, []);

  const handleBack = () => {
    navigate("/build");
  };

  if (handsBusyMode) {
    return <HandsBusyMode steps={steps} onExit={() => setHandsBusyMode(false)} />;
  }

  return (
    <Layout>
      <div className="py-8 sm:py-12 grain">
        <div className="container-tight relative">
          {/* Progress */}
          <div className="mb-6">
            <ProgressIndicator currentStep={2} totalSteps={2} />
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-6 w-6 text-primary" />
                <h1 className="font-mono text-2xl sm:text-3xl font-bold text-foreground">
                  Build Mission: Assembly
                </h1>
              </div>
              <p className="text-muted-foreground font-mono text-sm">
                <span className="text-primary">{">"}</span> {steps.length} objectives to complete
              </p>
            </div>

            {/* Hands-Busy Mode Toggle */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border hover:border-primary/30 transition-colors">
              <Hand className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor="hands-busy" className="text-sm font-mono cursor-pointer text-muted-foreground">
                Hands-Busy
              </Label>
              <Switch
                id="hands-busy"
                checked={handsBusyMode}
                onCheckedChange={setHandsBusyMode}
              />
            </div>
          </div>

          {/* Mission log / Steps list */}
          <div className="space-y-3 mb-12">
            {steps.map((step, index) => (
              <div key={step.id} style={{ animationDelay: `${index * 0.03}s` }}>
                <StepCard step={step} />
              </div>
            ))}
          </div>

          {/* Footer actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
            <Button variant="outline" onClick={handleBack} className="gap-2 font-mono">
              <ArrowLeft className="h-4 w-4" />
              Edit Loadout
            </Button>
            
            <div className="flex-1" />
            
            <Button variant="muted" disabled className="gap-2 font-mono">
              <Save className="h-4 w-4" />
              Save Build
            </Button>
            
            <Button variant="muted" disabled className="gap-2 font-mono">
              <FileDown className="h-4 w-4" />
              Export Guide
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Guide;
