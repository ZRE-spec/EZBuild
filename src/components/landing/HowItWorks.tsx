import { Gamepad2, Hand, Zap, Brain } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Gamepad2,
    title: "Built for Gamers",
    description: "No PDFs, no manufacturer fluff. Just clean, actionable build steps.",
  },
  {
    icon: Hand,
    title: "Hands-Busy Mode",
    description: "One step at a time, readable from a distance. Perfect during your build.",
  },
  {
    icon: Zap,
    title: "Instant Build Guide",
    description: "Generated specifically for your exact parts. No generic instructions.",
  },
  {
    icon: Brain,
    title: "Smart Warnings",
    description: "Avoid common beginner mistakes with intelligent callouts and tips.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-16 sm:py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container-wide relative">
        <div className="text-center mb-12">
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-foreground">
            <span className="text-primary">{">"}</span> Features
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Everything you need to build with confidence
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
