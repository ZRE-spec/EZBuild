import Layout from "@/components/layout/Layout";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import About from "@/components/landing/About";
import { Terminal } from "lucide-react";

const Landing = () => {
  return (
    <Layout>
      <div className="grain">
        <Hero />
        <HowItWorks />
        <About />
        
        {/* Footer */}
        <footer className="py-8 border-t border-border/50">
          <div className="container-tight text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-mono">
              <Terminal className="h-4 w-4 text-primary" />
              <span>© 2026 BuildGuide</span>
              <span className="text-primary">|</span>
              <span>Built for builders</span>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default Landing;
