import { Link, useLocation } from "react-router-dom";
import { Terminal } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  const navLinks = [
    { href: "/#how-it-works", label: "How it Works" },
    { href: "/#about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/90 backdrop-blur-md">
      <div className="container-wide flex h-14 items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-mono font-semibold text-foreground hover:text-primary transition-colors group"
        >
          <div className="relative">
            <Terminal className="h-5 w-5 text-primary group-hover:text-glow-primary transition-all" />
            <div className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="tracking-tight">
            <span className="text-primary">Build</span>Guide
          </span>
        </Link>
        
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors relative group"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
