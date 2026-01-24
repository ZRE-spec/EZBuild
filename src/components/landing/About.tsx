const About = () => {
  return (
    <section id="about" className="relative py-16 sm:py-24">
      <div className="container-tight text-center">
        <h2 className="font-mono text-2xl sm:text-3xl font-bold text-foreground mb-6">
          <span className="text-primary">{">"}</span> About
        </h2>
        
        <div className="relative">
          {/* Card with glow */}
          <div className="p-8 rounded-lg bg-background border border-border relative overflow-hidden">
            {/* Scanline effect */}
            <div className="absolute inset-0 scanlines opacity-30" />
            
            <div className="relative z-10 space-y-4 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Building a PC shouldn't require hunting for PDFs, scanning QR codes that lead to dead links, or piecing together instructions from five different sources.
              </p>
              <p className="leading-relaxed">
                <span className="text-foreground font-mono">EZBuild</span> generates a clear, ordered build guide based on your specific components - so you can focus on building, not searching.
              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
