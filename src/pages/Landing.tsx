import Layout from "@/components/layout/Layout";
import Hero from "@/components/landing/Hero";
import { Terminal } from "lucide-react";
import { useEffect, useRef } from "react";
import type { TerminalAnimationHandle } from "@/components/landing/TerminalAnimation";

const Landing = () => {
  const terminalRef = useRef<TerminalAnimationHandle>(null);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#about") {
        terminalRef.current?.addLine(
          "This tool generates a clear, step by step build guide tailored to your setup",
          { danger: true }
        );
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <Layout>
      <div className="grain flex-1">
        <Hero ref={terminalRef} />
      </div>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border/50 mt-auto">
        <div className="container-tight text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-mono">
            <Terminal className="h-4 w-4 text-primary" />
            <span>© 2026 EZBuild</span>
            <span className="text-primary">|</span>
            <span>Built for builders</span>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Landing;
