import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import { CONFIG } from "@/lib/constants";

export const metadata = {
  title: `About | ${CONFIG.profile.name}`,
  description: `Discover the professional engineering philosophy, tech stack, and background milestones of ${CONFIG.profile.name}.`,
};

export default function AboutPage() {
  const { bio, socials } = CONFIG.about;

  return (
    <>
      {/* Dynamic Client Overlays */}
      <CustomCursor />
      <Navbar />

      {/* Main Structural Wrapper */}
      <main className="w-full min-h-screen bg-bg px-6 py-32 md:px-12 md:py-40 flex flex-col items-center">
        <div className="max-w-4xl w-full flex flex-col">
          
          {/* Headline block */}
          <div className="mb-16 md:mb-24 flex flex-col items-start border-b border-white/5 pb-12 select-none">
            <span className="font-mono text-[10px] tracking-widest text-muted uppercase">
              The Mind & Philosophy
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl italic text-highlight leading-none tracking-tight mt-4">
              About Me
            </h1>
          </div>

          {/* 2-Column Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            
            {/* Left Column: Premium Generative SVG Graphic Canvas */}
            <div className="col-span-1 md:col-span-5 flex justify-center w-full">
              <div className="w-full aspect-[4/5] max-w-sm rounded-2xl border border-white/5 bg-surface/20 relative overflow-hidden flex flex-col items-center justify-center group shadow-2xl">
                {/* Background lighting shifts */}
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-white/[0.03] rounded-full blur-[40px] group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.01] rounded-full blur-[30px] group-hover:scale-110 transition-transform duration-700" />
                
                {/* Tech Portrait Representation (High performance inline SVG) */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-40 h-40 opacity-60 group-hover:opacity-90 transition-all duration-700 relative z-10 scale-95 group-hover:scale-100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="100" cy="100" r="80" stroke="rgba(232, 232, 232, 0.06)" strokeWidth="1" />
                  <circle cx="100" cy="100" r="50" stroke="rgba(232, 232, 232, 0.1)" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M50 100 L150 100" stroke="rgba(232, 232, 232, 0.12)" strokeWidth="0.75" />
                  <path d="M100 50 L100 150" stroke="rgba(232, 232, 232, 0.12)" strokeWidth="0.75" />
                  {/* Floating abstract central coordinates */}
                  <circle cx="100" cy="100" r="6" fill="rgba(255, 255, 255, 0.95)" />
                  <circle cx="50" cy="100" r="2.5" fill="rgba(232, 232, 232, 0.4)" />
                  <circle cx="150" cy="100" r="2.5" fill="rgba(232, 232, 232, 0.4)" />
                  <circle cx="100" cy="50" r="2.5" fill="rgba(232, 232, 232, 0.4)" />
                  <circle cx="100" cy="150" r="2.5" fill="rgba(232, 232, 232, 0.4)" />
                </svg>

                {/* Floating glassmorphic meta tags */}
                <div className="absolute bottom-6 left-6 right-6 bg-surface/60 backdrop-blur-md border border-white/5 px-4 py-3 rounded-lg text-center shadow-lg select-none">
                  <span className="font-mono text-[9px] tracking-widest text-highlight uppercase font-semibold">
                    SYSTEM ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Bio Copy */}
            <div className="col-span-1 md:col-span-7 flex flex-col justify-start gap-8">
              {bio.map((paragraph, idx) => (
                <p 
                  key={idx} 
                  className="font-sans text-xs md:text-sm leading-relaxed text-accent/80 font-light hover:text-highlight transition-colors duration-300"
                >
                  {paragraph}
                </p>
              ))}
            </div>

          </div>

          {/* Social Let's Connect Section */}
          <div className="mt-24 md:mt-36 border-t border-white/5 pt-16 flex flex-col items-start w-full">
            <span className="font-mono text-[10px] tracking-widest text-muted uppercase">
              Connections & Channels
            </span>
            <h2 className="font-display text-4xl md:text-5xl italic text-highlight mt-4 mb-10 select-none">
              Let's connect
            </h2>

            {/* Social Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {socials.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col p-5 border border-white/5 hover:border-white/12 bg-surface/15 hover:bg-surface/35 rounded-xl transition-all duration-300 group shadow-md"
                >
                  <span className="font-mono text-[9px] tracking-widest text-muted uppercase group-hover:text-highlight transition-colors">
                    {link.name}
                  </span>
                  <span className="font-sans text-xs md:text-sm text-highlight font-semibold mt-2 group-hover:translate-x-1.5 transition-transform duration-300 inline-flex items-center gap-1.5">
                    {link.username}
                    <span className="text-[10px] opacity-60 group-hover:opacity-100 transition-opacity font-normal">&nearr;</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
