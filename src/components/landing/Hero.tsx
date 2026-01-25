import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import TerminalAnimation, { type TerminalAnimationHandle } from "./TerminalAnimation";
import { forwardRef } from "react";

const Hero = forwardRef<TerminalAnimationHandle>((_, ref) => {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 w-full h-8 bg-gradient-to-b from-primary/5 to-transparent animate-scan" />
      </div>
      
      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            <h1 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight animate-fade-in">
              <span className="text-glow-primary text-primary">Build Your PC With Ease.
              
              </span>
              <br />
              <span className="text-muted-foreground">No Manuals</span>
              <br />
              <span className="text-muted-foreground">No QR Codes</span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 text-balance animate-fade-in" style={{ animationDelay: "0.1s" }}>
              A guided, step-by-step PC build experience made for ease.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Button asChild variant="hero" size="xl" className="group">
                <Link to="/build">
                  Start Your Build
                  <ArrowRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right side - Terminal */}
          <div>
            <TerminalAnimation ref={ref} />
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
