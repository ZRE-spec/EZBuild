import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProgressIndicator from "@/components/build/ProgressIndicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Cpu, Zap, Box, Flame, Building2 } from "lucide-react";

type Platform = "amd" | "intel" | null;
type CoolingType = "air" | "liquid" | null;
type CaseType = "standard" | "compact" | null;

interface BuildConfiguration {
  platform: Platform;
  cooling: CoolingType;
  caseType: CaseType;
}

const BuildInput = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState<BuildConfiguration>({
    platform: null,
    cooling: null,
    caseType: null,
  });

  const handlePlatformSelect = (platform: Platform) => {
    setConfig((prev) => ({ ...prev, platform }));
  };

  const toggleCooling = (type: CoolingType) => {
    setConfig((prev) => ({ 
      ...prev, 
      cooling: prev.cooling === type ? null : type 
    }));
  };

  const toggleCaseType = (type: CaseType) => {
    setConfig((prev) => ({ 
      ...prev, 
      caseType: prev.caseType === type ? null : type 
    }));
  };

  const handleSubmit = () => {
    if (!config.platform || !config.cooling || !config.caseType) return;
    sessionStorage.setItem("buildConfig", JSON.stringify(config));
    navigate("/guide");
  };

  return (
    <Layout>
      <div className="py-8 sm:py-12 grain">
        <div className="container-tight relative">
          {/* Header */}
          <div className="mb-8">
            <ProgressIndicator currentStep={1} totalSteps={2} />
          </div>

          {/* Title Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="h-6 w-6 text-primary" />
              <h1 className="font-mono text-2xl sm:text-3xl font-bold text-foreground">
                Start Your PC Build
              </h1>
            </div>
            <p className="text-muted-foreground font-mono text-sm">
              <span className="text-primary">{">"}</span> Most PC builds follow the same steps. We only need a few details to personalize your guide.
            </p>
          </div>

          {/* Platform Selection Section */}
          <div className="mb-12">
            <h2 className="font-mono text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Platform Selection
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* AMD Card */}
              <button
                onClick={() => handlePlatformSelect("amd")}
                className={`relative p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer group ${
                  config.platform === "amd"
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/50"
                    : "border-muted-foreground/30 bg-card hover:border-primary/50"
                }`}
              >
                <div className="text-left">
                  <h3 className="font-mono font-bold text-foreground text-lg mb-2">
                    AMD Build
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    For Ryzen based systems. Affects CPU installation and cooler mounting steps.
                  </p>
                </div>
                {config.platform === "amd" && (
                  <div className="absolute top-3 right-3">
                    <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                  </div>
                )}
              </button>

              {/* Intel Card */}
              <button
                onClick={() => handlePlatformSelect("intel")}
                className={`relative p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer group ${
                  config.platform === "intel"
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/50"
                    : "border-muted-foreground/30 bg-card hover:border-primary/50"
                }`}
              >
                <div className="text-left">
                  <h3 className="font-mono font-bold text-foreground text-lg mb-2">
                    Intel Build
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    For Intel Core systems. Affects CPU socket handling and cooler installation steps.
                  </p>
                </div>
                {config.platform === "intel" && (
                  <div className="absolute top-3 right-3">
                    <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Optional Details Section */}
          <div className="mb-12">
            {/* Cooling Type */}
            <div className="mb-6">
              <p className="text-sm font-mono font-semibold text-foreground mb-3">Cooling Type</p>
              <div className="flex gap-3 flex-wrap">
                <Toggle
                  pressed={config.cooling === "air"}
                  onPressedChange={() => toggleCooling("air")}
                  className={`border transition-all ${
                    config.cooling === "air"
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-muted-foreground/30"
                  }`}
                >
                  <span className="font-mono text-sm">Air Cooler</span>
                </Toggle>

                <Toggle
                  pressed={config.cooling === "liquid"}
                  onPressedChange={() => toggleCooling("liquid")}
                  className={`border transition-all ${
                    config.cooling === "liquid"
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-muted-foreground/30"
                  }`}
                >
                  <span className="font-mono text-sm">Liquid Cooler (AIO)</span>
                </Toggle>
              </div>
            </div>

            {/* Case Type */}
            <div className="mb-6">
              <p className="text-sm font-mono font-semibold text-foreground mb-3">Case Type</p>
              <div className="flex gap-3 flex-wrap">
                <Toggle
                  pressed={config.caseType === "standard"}
                  onPressedChange={() => toggleCaseType("standard")}
                  className={`border transition-all ${
                    config.caseType === "standard"
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-muted-foreground/30"
                  }`}
                >
                  <span className="font-mono text-sm">Standard Case</span>
                </Toggle>

                <Toggle
                  pressed={config.caseType === "compact"}
                  onPressedChange={() => toggleCaseType("compact")}
                  className={`border transition-all ${
                    config.caseType === "compact"
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-muted-foreground/30"
                  }`}
                >
                  <span className="font-mono text-sm">Compact Case</span>
                </Toggle>
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="pt-4">
            <Button 
              onClick={handleSubmit}
              variant="hero" 
              size="lg" 
              className="w-full font-mono group"
              disabled={!config.platform || !config.cooling || !config.caseType}
            >
              <span>Generate My Build Guide</span>
            </Button>
            <p className="text-xs font-mono text-muted-foreground text-center mt-3">
              You will get a step by step guide tailored to your platform.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BuildInput;
